const { db, body, text, authed } = require("../lib/api-lib");

const clean = (b) => ({
  name: text(b.name, 120),
  room_type: text(b.room_type, 80),
  price: Number(b.price) || 0,
  price_unit: text(b.price_unit, 30) || "晚",
  rooms_available: Math.max(0, parseInt(b.rooms_available, 10) || 0),
  description: text(b.description, 2000),
  facilities: Array.isArray(b.facilities)
    ? b.facilities.map((x) => text(x, 60)).filter(Boolean).slice(0, 30)
    : text(b.facilities, 1000).split(/[，,\n]/).map((x) => x.trim()).filter(Boolean).slice(0, 30),
  image_urls: Array.isArray(b.image_urls)
    ? b.image_urls.map((x) => text(x, 500)).filter(Boolean).slice(0, 10)
    : text(b.image_urls, 5000).split(/[\n,]/).map((x) => x.trim()).filter(Boolean).slice(0, 10),
  status: ["draft", "published", "paused"].includes(b.status) ? b.status : "draft",
  featured: b.featured === true,
});

module.exports = async (req, res) => {
  if (!authed(req)) return res.status(401).json({ ok: false, message: "请先登录" });
  const d = db(), b = body(req), id = req.query.id;
  if (!d) return res.status(503).json({ ok: false, message: "数据库尚未配置" });
  if (req.method === "POST") {
    const row = clean(b);
    if (!row.name || !row.room_type)
      return res.status(400).json({ ok: false, message: "请填写酒店/房型名称" });
    const { data, error } = await d.from("hotels").insert(row).select().single();
    if (error) return res.status(500).json({ ok: false, message: error.message });
    return res.json({ ok: true, data, message: "酒店房型已新增" });
  }
  if (req.method === "PATCH" && id) {
    const { data, error } = await d.from("hotels").update(clean(b)).eq("id", id).select().single();
    if (error) return res.status(500).json({ ok: false, message: error.message });
    return res.json({ ok: true, data, message: "酒店资料已更新" });
  }
  if (req.method === "DELETE" && id) {
    const { error } = await d.from("hotels").delete().eq("id", id);
    if (error) return res.status(500).json({ ok: false, message: error.message });
    return res.json({ ok: true, message: "酒店房型已删除" });
  }
  return res.status(405).end();
};
