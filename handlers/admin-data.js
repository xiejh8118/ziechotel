const { db, body, text, authed, databaseMessage } = require("../lib/api-lib");
module.exports = async (req, res) => {
  if (!authed(req)) return res.status(401).json({ ok: false });
  const d = db();
  if (!d) return res.status(503).json({ ok: false, message: "数据库尚未配置" });
  if (req.method === "PATCH") {
    if (req.query.type !== "bookings")
      return res.status(400).json({ ok: false, message: "暂不支持此类资料更新" });
    const id = text(req.query.id, 80);
    const b = body(req);
    const allowed = ["pending_contact", "contacted", "quoted", "confirmed", "checked_in", "cancelled"];
    const update = {};
    if (allowed.includes(b.status)) update.status = b.status;
    if (Object.prototype.hasOwnProperty.call(b, "follow_up_note")) update.follow_up_note = text(b.follow_up_note, 1000);
    const editableText = {
      customer_name: 80, contact: 80, country_region: 80, hotel_name: 120,
      room_type: 80, checkin: 30, checkout: 30, rooms: 30, guests: 30,
      transfer_need: 120, stay_purpose: 80, source: 200, note: 500,
      wechat: 100, telegram: 160, messenger: 200, whatsapp: 80,
    };
    Object.entries(editableText).forEach(([key, max]) => {
      if (Object.prototype.hasOwnProperty.call(b, key)) update[key] = text(b[key], max);
    });
    if (Object.prototype.hasOwnProperty.call(b, "price")) update.price = Math.max(0, Number(b.price) || 0);
    if (b.mark_printed === true) {
      update.printed_at = new Date().toISOString();
      update.print_count = Math.max(1, Number(b.print_count) || 1);
    }
    update.updated_at = new Date().toISOString();
    if (!id || Object.keys(update).length === 1)
      return res.status(400).json({ ok: false, message: "没有可保存的内容" });
    let { error } = await d.from("booking_orders").update(update).eq("id", id);
    // 未执行V6.8数据库升级时，仍允许编辑订单；仅跳过打印标记字段。
    if (error && /printed_at|print_count|column.*does not exist|schema cache/i.test(String(error.message || ""))) {
      delete update.printed_at;
      delete update.print_count;
      ({ error } = await d.from("booking_orders").update(update).eq("id", id));
    }
    if (error) return res.status(500).json({ ok: false, message: databaseMessage(error) });
    return res.json({ ok: true, message: "客户线索已更新" });
  }
  if (req.method !== "GET") return res.status(405).end();
  const tables = {
    suppliers: "suppliers",
    inquiries: "purchase_inquiries",
    hotels: "hotels",
    bookings: "booking_orders",
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
