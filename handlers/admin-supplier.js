const { db, body, authed, text } = require("../lib/api-lib");
module.exports = async (req, res) => {
  if (!authed(req)) return res.status(401).json({ ok: false });
  const d = db(),
    b = body(req),
    id = req.query.id;
  if (!d || !id) return res.status(400).json({ ok: false });
  if (req.method === "PATCH") {
    const update = {};
    if (["pending", "approved", "rejected", "paused"].includes(b.status))
      update.status = b.status;
    if (typeof b.featured === "boolean") update.featured = b.featured;
    if (Array.isArray(b.image_urls)) {
      const urls = [...new Set(b.image_urls.map((url) => text(url, 800)).filter((url) => /^https:\/\//i.test(url)))].slice(0, 10);
      if (urls.length && urls.length < 4) return res.status(400).json({ ok: false, message: "已发布供应商至少保留4张图片" });
      update.image_urls = urls;
    }
    const { error } = await d.from("suppliers").update(update).eq("id", id);
    if (error) return res.status(500).json({ ok: false, message: error.message });
    return res.json({ ok: true, message: "供应商状态已更新" });
  }
  if (req.method === "DELETE") {
    const { error } = await d.from("suppliers").delete().eq("id", id);
    if (error) return res.status(500).json({ ok: false, message: error.message });
    return res.json({ ok: true, message: "供应商已删除" });
  }
  res.status(405).end();
};
