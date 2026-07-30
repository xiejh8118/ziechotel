const crypto = require("crypto");
const { db, body, text, databaseMessage } = require("../lib/api-lib");

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();
  const d = db();
  if (!d) return res.status(503).json({ ok: false, message: "数据库尚未配置" });
  const b = body(req),
    match = String(b.data || "").match(
      /^data:(image\/(?:jpeg|png|webp));base64,(.+)$/,
    );
  if (!match)
    return res
      .status(400)
      .json({ ok: false, message: "图片格式仅支持 JPG、PNG 或 WebP" });
  const buffer = Buffer.from(match[2], "base64");
  if (!buffer.length || buffer.length > 2 * 1024 * 1024)
    return res
      .status(400)
      .json({ ok: false, message: "单张图片压缩后不能超过 2MB" });
  const ext = {
    ["image/jpeg"]: "jpg",
    ["image/png"]: "png",
    ["image/webp"]: "webp",
  }[match[1]];
  const path = `pending/${Date.now()}-${crypto.randomBytes(8).toString("hex")}.${ext}`;
  const bucket = "supplier-images";
  let { error } = await d.storage
    .from(bucket)
    .upload(path, buffer, { contentType: match[1], upsert: false });
  if (error && /bucket.*not found|not found/i.test(String(error.message || error))) {
    const { error: createError } = await d.storage.createBucket(bucket, {
      public: true,
      fileSizeLimit: 2 * 1024 * 1024,
      allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
    });
    if (!createError || /already exists/i.test(String(createError.message || createError))) {
      ({ error } = await d.storage
        .from(bucket)
        .upload(path, buffer, { contentType: match[1], upsert: false }));
    } else {
      error = createError;
    }
  }
  if (error)
    return res
      .status(500)
      .json({
        ok: false,
        message: databaseMessage(error, "图片上传失败，请稍后重试"),
      });
  const { data } = d.storage.from(bucket).getPublicUrl(path);
  return res.status(201).json({ ok: true, url: text(data.publicUrl, 800) });
};
