const { db, body, text, phone, databaseMessage, databaseDiagnostic } = require("../lib/api-lib");

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

  let { data, error } = await d
    .from("booking_orders")
    .insert(row)
    .select("id,order_no")
    .single();

  // 兼容尚未完整执行 V6.4 SQL 的旧订单表。只有字段缓存或状态约束
  // 不兼容时才降级重试，网络等不确定错误不会重复写入订单。
  const compatibilityError = (value) =>
    ["PGRST204", "23514", "42703"].includes(String(value?.code || "")) ||
    /could not find.*column|column.*does not exist|check constraint/i.test(
      String(value?.message || ""),
    );
  if (error && compatibilityError(error)) {
    const legacyRow = {
      order_no: row.order_no,
      customer_name: row.customer_name,
      contact: row.contact,
      hotel_name: row.hotel_name,
      room_type: row.room_type,
      checkin: row.checkin,
      checkout: row.checkout,
      rooms: row.rooms,
      guests: row.guests,
      price: row.price,
      currency: row.currency,
      note: row.note,
      status: "new",
    };
    ({ data, error } = await d
      .from("booking_orders")
      .insert(legacyRow)
      .select("id,order_no")
      .single());
  }
  if (error && compatibilityError(error)) {
    const noStatusRow = { ...row };
    [
      "country_region", "wechat", "telegram", "messenger", "whatsapp",
      "transfer_need", "stay_purpose", "source", "follow_up_note", "status",
    ].forEach((key) => delete noStatusRow[key]);
    ({ data, error } = await d
      .from("booking_orders")
      .insert(noStatusRow)
      .select("id,order_no")
      .single());
  }
  if (error) {
    const code = String(error.code || "DB_ERROR").slice(0, 30);
    const diagnostic = databaseDiagnostic(error);
    return res.status(500).json({
      ok: false,
      version: "V6.4-FIX3",
      message: `${databaseMessage(error, "订单提交失败")}（错误代码：${code}；${diagnostic.message}）`,
      diagnostic,
    });
  }
  res.status(201).json({
    ok: true,
    version: "V6.4-FIX3",
    data,
    message: `入住需求已提交，订单编号：${data.order_no}`,
  });
};
