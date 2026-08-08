const { db, body, text, phone, databaseMessage } = require("../lib/api-lib");
module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();
  const d = db();
  if (!d) return res.status(503).json({ ok: false, message: "数据库尚未配置" });
  const b = body(req);
  if (
    !text(b.customer_name) ||
    !text(b.category) ||
    !text(b.requirements) ||
    (!phone(b.phone) && !phone(b.whatsapp))
  )
    return res
      .status(400)
      .json({ ok: false, message: "请填写姓名、分类、采购内容及联系方式" });
  const row = {
    customer_name: text(b.customer_name, 80),
    company_name: text(b.company_name, 120),
    phone: phone(b.phone),
    whatsapp: phone(b.whatsapp),
    category: text(b.category, 60),
    budget: text(b.budget, 80),
    requirements: text(b.requirements, 1500),
    delivery_time: text(b.delivery_time, 100),
    status: "new",
  };
  const { error } = await d.from("purchase_inquiries").insert(row);
  if (error)
    return res
      .status(500)
      .json({ ok: false, message: databaseMessage(error, "询价提交失败") });
  res
    .status(201)
    .json({ ok: true, message: "采购询价已提交，平台将尽快联系您。" });
};
