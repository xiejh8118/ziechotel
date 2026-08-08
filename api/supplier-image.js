const crypto = require("crypto");
const {
  db,
  body,
  text,
  configuration,
  databaseMessage,
} = require("../lib/api-lib");

module.exports = async (req, res) => {
  const requestId = crypto.randomBytes(5).toString("hex");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-ZIEC-Request-Id", requestId);

  if (req.method !== "POST")
    return res.status(405).json({
      ok: false,
      code: "IMG_METHOD",
      requestId,
      message: "图片接口仅支持 POST 请求",
    });

  try {
    const config = configuration();
    const d = db();
    if (!d)
      return fail(res, 503, "IMG_CONFIG", requestId, config.error || "数据库尚未配置");

    const b = body(req);
    const match = String(b.data || "").match(
      /^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=\r\n]+)$/,
    );
    if (!match)
      return fail(
        res,
        400,
        "IMG_FORMAT",
        requestId,
        "图片格式仅支持 JPG、PNG 或 WebP",
      );

    const buffer = Buffer.from(match[2].replace(/\s/g, ""), "base64");
    if (!buffer.length)
      return fail(res, 400, "IMG_EMPTY", requestId, "读取图片失败，请重新选择图片");
    if (buffer.length > 2 * 1024 * 1024)
      return fail(
        res,
        413,
        "IMG_TOO_LARGE",
        requestId,
        "单张图片压缩后不能超过 2MB",
      );

    const ext = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
    }[match[1]];
    const isHotel = b.kind === "hotel";
    const bucket = isHotel ? "hotel-images" : "supplier-images";
    const path = `${isHotel ? "rooms" : "pending"}/${Date.now()}-${crypto.randomBytes(8).toString("hex")}.${ext}`;

    let sdkError = await uploadWithSdk(d, bucket, path, buffer, match[1]);
    if (sdkError && isMissingBucket(sdkError)) {
      const { error: createError } = await d.storage.createBucket(bucket, {
        public: true,
        fileSizeLimit: 5 * 1024 * 1024,
        allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
      });
      if (!createError || /already exists/i.test(errorText(createError))) {
        sdkError = await uploadWithSdk(d, bucket, path, buffer, match[1]);
      } else {
        sdkError = createError;
      }
    }

    let uploadError = sdkError;
    let route = "sdk";
    if (sdkError) {
      route = "rest-fallback";
      uploadError = await uploadWithRest(
        config,
        bucket,
        path,
        buffer,
        match[1],
      );
    }

    if (uploadError) {
      logFailure(requestId, "upload", uploadError, {
        route,
        bytes: buffer.length,
        mime: match[1],
      });
      return fail(
        res,
        statusFor(uploadError),
        codeFor(uploadError),
        requestId,
        friendlyMessage(uploadError),
        safeDetails(uploadError),
      );
    }

    const { data } = d.storage.from(bucket).getPublicUrl(path);
    if (!data?.publicUrl) {
      const error = new Error("Storage upload succeeded but public URL is empty");
      logFailure(requestId, "public-url", error, { route });
      return fail(
        res,
        500,
        "IMG_PUBLIC_URL",
        requestId,
        "图片已上传，但无法生成访问地址，请确认存储桶为 Public",
      );
    }

    console.info("[supplier-image]", {
      requestId,
      ok: true,
      route,
      bytes: buffer.length,
      mime: match[1],
    });
    return res.status(201).json({
      ok: true,
      code: "IMG_OK",
      requestId,
      url: text(data.publicUrl, 800),
    });
  } catch (error) {
    logFailure(requestId, "unhandled", error);
    return fail(
      res,
      500,
      "IMG_UNEXPECTED",
      requestId,
      databaseMessage(error, "图片接口发生未预期错误"),
      safeDetails(error),
    );
  }
};

async function uploadWithSdk(client, bucket, path, buffer, contentType) {
  try {
    const { error } = await client.storage
      .from(bucket)
      .upload(path, buffer, { contentType, cacheControl: "3600", upsert: false });
    return error || null;
  } catch (error) {
    return error;
  }
}

async function uploadWithRest(config, bucket, path, buffer, contentType) {
  try {
    const endpoint =
      `${config.url}/storage/v1/object/` +
      `${encodeURIComponent(bucket)}/${path.split("/").map(encodeURIComponent).join("/")}`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        apikey: config.serviceRoleKey,
        Authorization: `Bearer ${config.serviceRoleKey}`,
        "Content-Type": contentType,
        "x-upsert": "false",
      },
      body: buffer,
    });
    if (response.ok) return null;
    const raw = await response.text();
    let payload;
    try {
      payload = JSON.parse(raw);
    } catch {
      payload = { message: raw };
    }
    const error = new Error(
      payload.message || payload.error || `Storage HTTP ${response.status}`,
    );
    error.status = response.status;
    error.statusCode = response.status;
    error.storageCode = payload.statusCode || payload.error || payload.code;
    return error;
  } catch (error) {
    return error;
  }
}

function fail(res, status, code, requestId, message, details) {
  return res.status(status).json({
    ok: false,
    code,
    requestId,
    message: `${message}（错误编号：${code}，诊断号：${requestId}）`,
    ...(details ? { details } : {}),
  });
}

function errorText(error) {
  return String(error?.message || error?.error || error || "");
}

function isMissingBucket(error) {
  return /bucket.*not found|not found.*bucket/i.test(errorText(error));
}

function statusFor(error) {
  const status = Number(error?.statusCode || error?.status);
  if ([400, 401, 403, 404, 413, 429].includes(status)) return status;
  return 500;
}

function codeFor(error) {
  const message = errorText(error);
  const status = Number(error?.statusCode || error?.status);
  if (status === 401 || /invalid.*key|jwt|unauthorized/i.test(message))
    return "IMG_KEY_INVALID";
  if (status === 403 || /row-level security|policy|permission|forbidden/i.test(message))
    return "IMG_PERMISSION";
  if (status === 404 || isMissingBucket(error)) return "IMG_BUCKET_MISSING";
  if (status === 413 || /too large|payload|maximum allowed size/i.test(message))
    return "IMG_TOO_LARGE";
  if (status === 429) return "IMG_RATE_LIMIT";
  if (/fetch failed|network|ENOTFOUND|ECONN/i.test(message))
    return "IMG_STORAGE_NETWORK";
  return "IMG_STORAGE_ERROR";
}

function friendlyMessage(error) {
  switch (codeFor(error)) {
    case "IMG_KEY_INVALID":
      return "Supabase Secret key 无效，请检查 Vercel 的 SUPABASE_SERVICE_ROLE_KEY";
    case "IMG_PERMISSION":
      return "Supabase Storage 拒绝上传，请确认使用 Secret/service_role key";
    case "IMG_BUCKET_MISSING":
      return "未找到对应图片存储桶，请在 Supabase Storage 中创建 supplier-images 和 hotel-images";
    case "IMG_TOO_LARGE":
      return "图片超过 Storage 允许大小，请提高存储桶限制或更换图片";
    case "IMG_RATE_LIMIT":
      return "图片服务请求过于频繁，请稍后再试";
    case "IMG_STORAGE_NETWORK":
      return "Vercel 暂时无法连接 Supabase Storage";
    default:
      return "Supabase Storage 上传失败";
  }
}

function safeDetails(error) {
  return text(
    `${error?.storageCode ? `${error.storageCode}: ` : ""}${errorText(error)}`,
    300,
  ).replace(/sb_(?:secret|publishable)_[A-Za-z0-9_-]+/g, "[REDACTED]");
}

function logFailure(requestId, step, error, context = {}) {
  console.error("[supplier-image]", {
    requestId,
    ok: false,
    step,
    code: codeFor(error),
    status: Number(error?.statusCode || error?.status) || 500,
    error: safeDetails(error),
    ...context,
  });
}
