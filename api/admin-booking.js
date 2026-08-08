const { db, body, text, authed, databaseMessage } = require("../lib/api-lib");

module.exports = async (req, res) => {
  if (!authed(req)) return res.status(401).json({ ok: false, message: "请先登录" });
  if (req.method !== "PATCH") return res.status(405).end();
  const d = db();
  if (!d) return res.status(503).json({ ok: false, message: "数据库尚未配置" });
  const id = text(req.query.id, 80);
  const b = body(req);
  const allowed = ["pending_contact", "contacted", "quoted", "confirmed", "checked_in", "cancelled"];
  const update = {};
  if (allowed.includes(b.status)) update.status = b.status;
  if (Object.prototype.hasOwnProperty.call(b, "follow_up_note")) update.follow_up_note = text(b.follow_up_note, 1000);
  update.updated_at = new Date().toISOString();
  if (!id || Object.keys(update).length === 1) return res.status(400).json({ ok: false, message: "没有可保存的内容" });
  const { error } = await d.from("booking_orders").update(update).eq("id", id);
  if (error) return res.status(500).json({ ok: false, message: databaseMessage(error) });
  res.json({ ok: true, message: "客户线索已更新" });
};
