const { db } = require("../lib/api-lib");
module.exports = async (req, res) => {
  if (req.method !== "GET") return res.status(405).end();
  const d = db();
  if (!d) return res.status(503).json({ ok: false, message: "数据库尚未配置" });
  const { data, error } = await d.from("hotels").select("*").eq("status", "published").order("featured", { ascending: false }).order("created_at", { ascending: false });
  if (error) return res.status(500).json({ ok: false, message: error.message });
  res.json({ ok: true, data: data || [] });
};
