const crypto = require("crypto");
const { db, configuration, text } = require("../lib/api-lib");

module.exports = async function handler(req, res) {
  const requestId = crypto.randomBytes(5).toString("hex");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-ZIEC-Request-Id", requestId);

  if (req.method !== "GET")
    return res.status(405).json({
      ok: false,
      code: "STORAGE_METHOD",
      requestId,
      message: "Storage 诊断接口仅支持 GET 请求",
    });

  const config = configuration();
  const result = {
    ok: false,
    version: "6.0.2-diagnostic",
    service: "ZIEC HOTEL Storage Diagnostics",
    time: new Date().toISOString(),
    requestId,
    configuration: {
      supabaseUrl: Boolean(config.url),
      serviceRoleKey: Boolean(config.serviceRoleKey),
      keyType: keyType(config.serviceRoleKey),
    },
    storage: {
      connected: false,
      bucket: "supplier-images",
      exists: false,
      public: false,
    },
  };

  if (config.error) {
    result.code = "STORAGE_CONFIG";
    result.message = config.error;
    return res.status(503).json(result);
  }

  try {
    const client = db();
    const { data, error } = await client.storage.listBuckets();
    if (error) {
      result.code = diagnoseCode(error);
      result.message = friendly(error);
      result.storage.error = safe(error);
      console.error("[storage-health]", {
        requestId,
        code: result.code,
        error: result.storage.error,
      });
      return res.status(statusFor(error)).json(result);
    }

    result.storage.connected = true;
    const bucket = (data || []).find((item) => item.name === result.storage.bucket);
    result.storage.exists = Boolean(bucket);
    result.storage.public = Boolean(bucket?.public);
    result.storage.fileSizeLimit = bucket?.file_size_limit ?? null;
    result.storage.allowedMimeTypes = bucket?.allowed_mime_types ?? null;

    if (!bucket) {
      result.code = "STORAGE_BUCKET_MISSING";
      result.message = "Storage 已连接，但未找到 supplier-images 存储桶。";
      return res.status(404).json(result);
    }

    result.ok = true;
    result.code = result.storage.public
      ? "STORAGE_OK"
      : "STORAGE_OK_PRIVATE";
    result.message = result.storage.public
      ? "Supabase Storage、密钥和 supplier-images 存储桶均正常。"
      : "Storage 可连接，但 supplier-images 不是 Public；上传可用，公开图片地址不可用。";
    return res.status(200).json(result);
  } catch (error) {
    result.code = diagnoseCode(error);
    result.message = friendly(error);
    result.storage.error = safe(error);
    console.error("[storage-health]", {
      requestId,
      code: result.code,
      error: result.storage.error,
    });
    return res.status(statusFor(error)).json(result);
  }
};

function keyType(key) {
  if (!key) return "missing";
  if (key.startsWith("sb_secret_")) return "secret";
  if (key.startsWith("sb_publishable_")) return "publishable-invalid";
  if (key.split(".").length === 3) return "legacy-jwt";
  return "unknown";
}

function diagnoseCode(error) {
  const message = String(error?.message || error || "");
  const status = Number(error?.statusCode || error?.status);
  if (status === 401 || /invalid.*key|jwt|unauthorized/i.test(message))
    return "STORAGE_KEY_INVALID";
  if (status === 403 || /permission|forbidden|policy/i.test(message))
    return "STORAGE_PERMISSION";
  if (/fetch failed|network|ENOTFOUND|ECONN/i.test(message))
    return "STORAGE_NETWORK";
  return "STORAGE_ERROR";
}

function friendly(error) {
  switch (diagnoseCode(error)) {
    case "STORAGE_KEY_INVALID":
      return "Supabase Secret key 无效，请检查 SUPABASE_SERVICE_ROLE_KEY。";
    case "STORAGE_PERMISSION":
      return "当前密钥没有 Storage 管理权限，请使用 Secret/service_role key。";
    case "STORAGE_NETWORK":
      return "Vercel 暂时无法连接 Supabase Storage。";
    default:
      return "Storage 诊断失败，请根据错误编号检查运行日志。";
  }
}

function statusFor(error) {
  const status = Number(error?.statusCode || error?.status);
  return [400, 401, 403, 404, 429].includes(status) ? status : 503;
}

function safe(error) {
  return text(error?.message || error, 300).replace(
    /sb_(?:secret|publishable)_[A-Za-z0-9_-]+/g,
    "[REDACTED]",
  );
}
