const { db, authed } = require("../lib/api-lib");
module.exports = async (req, res) => {
  if (!authed(req)) return res.status(401).json({ ok: false });
  const d = db();
  if (!d) return res.status(503).json({ ok: false, message: "数据库尚未配置" });
  const tables = {
    suppliers: "suppliers",
    inquiries: "purchase_inquiries",
    hotels: "hotels",
  };
  const type = tables[req.query.type] || "suppliers";
  const { data, error } = await d
    .from(type)
    .select("*")
    .order("created_at", { ascending: false });
  if (error)
    return res.status(500).json({ ok: false, message: error.message });
  res.json({ ok: true, data });
};
