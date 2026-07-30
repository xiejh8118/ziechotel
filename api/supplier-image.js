const crypto = require("crypto");
const { db, body, text } = require("../lib/api-lib");

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
  const { error } = await d.storage
    .from("supplier-images")
    .upload(path, buffer, { contentType: match[1], upsert: false });
  if (error)
    return res
      .status(500)
      .json({
        ok: false,
        message: error.message.includes("Bucket")
          ? "请先执行 V6.0.2 数据库升级脚本"
          : "图片上传失败",
      });
  const { data } = d.storage.from("supplier-images").getPublicUrl(path);
  return res.status(201).json({ ok: true, url: text(data.publicUrl, 800) });
};
