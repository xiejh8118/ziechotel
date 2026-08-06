const { db, body, text, phone, databaseMessage } = require("../lib/api-lib");

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();
  const d = db();
  if (!d) return res.status(503).json({ ok: false, message: "数据库尚未配置" });

  const b = body(req);
  const contact = phone(b.contact);
  if (!text(b.customer_name, 80) || !contact)
    return res
      .status(400)
      .json({ ok: false, message: "请填写联系人和电话 / WhatsApp" });

  const orderNo =
    text(b.order_no, 40) ||
    `ZIEC-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}`;
  const row = {
    order_no: orderNo,
    customer_name: text(b.customer_name, 80),
    contact,
    hotel_name: text(b.hotel_name, 120) || "中鼎国际酒店",
    room_type: text(b.room_type, 80) || "酒店住宿需求",
    checkin: text(b.checkin, 30),
    checkout: text(b.checkout, 30),
    rooms: text(b.rooms, 30),
    guests: text(b.guests, 30),
    price: Number(b.price) || 0,
    currency: text(b.currency, 10) || "USD",
    note: text(b.note, 500),
    status: "new",
  };

  const { data, error } = await d
    .from("booking_orders")
    .insert(row)
    .select("id,order_no")
    .single();
  if (error)
    return res
      .status(500)
      .json({ ok: false, message: databaseMessage(error, "订单提交失败") });
  res.status(201).json({
    ok: true,
    data,
    message: "预订需求已提交，请继续通过 WhatsApp 核对订单与付款信息。",
  });
};
