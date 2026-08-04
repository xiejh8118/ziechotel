const crypto = require("crypto");
const { db, body, text, configuration, databaseMessage } = require("../lib/api-lib");

module.exports = async (req, res) => {
  const requestId = crypto.randomBytes(5).toString("hex");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-ZIEC-Request-Id", requestId);
  if (req.method !== "POST")
    return res.status(405).json({ ok: false, code: "IMG_METHOD", requestId, message: "图片接口仅支持 POST 请求" });

  try {
    const config = configuration();
    const d = db();
    if (!d) return fail(res, 503, "IMG_CONFIG", requestId, config.error || "数据库尚未配置");
    const b = body(req);
    const match = String(b.data || "").match(/^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=\r\n]+)$/);
    if (!match) return fail(res, 400, "IMG_FORMAT", requestId, "图片格式仅支持 JPG、PNG 或 WebP");
    const buffer = Buffer.from(match[2].replace(/\s/g, ""), "base64");
    if (!buffer.length) return fail(res, 400, "IMG_EMPTY", requestId, "读取图片失败，请重新选择图片");
    if (buffer.length > 2 * 1024 * 1024) return fail(res, 413, "IMG_TOO_LARGE", requestId, "单张图片压缩后不能超过 2MB");
    const ext = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" }[match[1]];
    const bucket = "hotel-images";
    const path = `rooms/${Date.now()}-${crypto.randomBytes(8).toString("hex")}.${ext}`;

    let error = await uploadWithSdk(d, bucket, path, buffer, match[1]);
    if (error && /bucket.*not found|not found.*bucket/i.test(String(error.message || error))) {
      const created = await d.storage.createBucket(bucket, {
        public: true,
        fileSizeLimit: 5 * 1024 * 1024,
        allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
      });
      if (!created.error || /already exists/i.test(String(created.error.message || "")))
        error = await uploadWithSdk(d, bucket, path, buffer, match[1]);
      else error = created.error;
    }
    if (error) return fail(res, 500, "IMG_STORAGE_ERROR", requestId, databaseMessage(error, "房型图片上传失败"));
    const { data } = d.storage.from(bucket).getPublicUrl(path);
    if (!data?.publicUrl) return fail(res, 500, "IMG_PUBLIC_URL", requestId, "图片已上传，但无法生成访问地址");
    res.status(201).json({ ok: true, code: "IMG_OK", requestId, url: text(data.publicUrl, 800) });
  } catch (error) {
    return fail(res, 500, "IMG_UNEXPECTED", requestId, databaseMessage(error, "房型图片接口发生未预期错误"));
  }
};

async function uploadWithSdk(client, bucket, path, buffer, contentType) {
  try {
    const { error } = await client.storage.from(bucket).upload(path, buffer, {
      contentType,
      cacheControl: "3600",
      upsert: false,
    });
    return error || null;
  } catch (error) {
    return error;
  }
}

function fail(res, status, code, requestId, message) {
  return res.status(status).json({ ok: false, code, requestId, message: `${message}（错误编号：${code}，诊断号：${requestId}）` });
}
