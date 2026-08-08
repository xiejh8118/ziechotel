const { db } = require("../lib/api-lib");
module.exports = async (req, res) => {
  if (req.method !== "GET") return res.status(405).end();
  const d = db();
  if (!d) return res.status(503).json({ ok: false, message: "数据库尚未配置" });
  const requestedLimit = Number.parseInt(req.query?.limit, 10);
  const limit = Number.isFinite(requestedLimit) ? Math.min(Math.max(requestedLimit, 1), 50) : 50;
  let query = d.from("hotels").select("*").eq("status", "published");
  if (req.query?.recommended === "1") query = query.eq("featured", true);
  const { data, error } = await query
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) return res.status(500).json({ ok: false, message: error.message });
  res.json({ ok: true, data: data || [] });
};
