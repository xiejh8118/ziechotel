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

  const orderNo = text(b.order_no, 40) ||
    `ZIEC-${Date.now().toString(36).toUpperCase()}`;
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
    country_region: text(b.country_region, 80),
    wechat: text(b.wechat, 100),
    telegram: text(b.telegram, 160),
    messenger: text(b.messenger, 200),
    whatsapp: phone(b.whatsapp),
    transfer_need: text(b.transfer_need, 120),
    stay_purpose: text(b.stay_purpose, 80),
    source: text(b.source, 80) || text(req.headers.referer, 200) || "website",
    follow_up_note: "",
    status: "pending_contact",
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
    message: `入住需求已提交，订单编号：${data.order_no}`,
  });
};
