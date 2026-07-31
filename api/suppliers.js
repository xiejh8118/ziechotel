const crypto = require("crypto");
const {
  db,
  body,
  text,
  phone,
  databaseMessage,
  databaseDiagnostic,
} = require("../lib/api-lib");
module.exports = async (req, res) => {
  const d = db();
  if (!d) return res.status(503).json({ ok: false, message: "数据库尚未配置" });
  if (req.method === "GET") {
    let q = d
      .from("suppliers")
      .select("*")
      .eq("status", "approved")
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });
    const { data, error } = await q;
    if (error)
      return res
        .status(500)
        .json({ ok: false, message: databaseMessage(error, "供应商读取失败") });
    return res.json({ ok: true, data });
  }
  if (req.method === "POST") {
    const b = body(req);
    if (
      !text(b.company_name) ||
      !text(b.category) ||
      !text(b.contact_name) ||
      (!phone(b.phone) && !phone(b.whatsapp))
    )
      return res
        .status(400)
        .json({
          ok: false,
          message: "请完整填写企业名称、分类、联系人及联系方式",
        });
    const images = Array.isArray(b.image_urls)
      ? b.image_urls
          .map((x) => text(x, 800))
          .filter((x) => /^https:\/\//.test(x))
          .slice(0, 10)
      : [];
    if (images.length < 4)
      return res
        .status(400)
        .json({ ok: false, message: "请上传至少4张企业或产品图片" });
    const row = {
      company_name: text(b.company_name, 120),
      category: text(b.category, 60),
      city: text(b.city, 60),
      contact_name: text(b.contact_name, 80),
      phone: phone(b.phone),
      whatsapp: phone(b.whatsapp),
      address: text(b.address, 180),
      products: text(b.products, 600),
      description: text(b.description, 1200),
      logo_url: text(b.logo_url, 500),
      slogan: text(b.slogan, 120),
      image_urls: images,
      status: "pending",
      featured: false,
    };
    const { error } = await d.from("suppliers").insert(row);
    if (error) {
      const requestId = crypto.randomBytes(5).toString("hex");
      const diagnostic = databaseDiagnostic(error);
      console.error("[supplier-submit]", {
        requestId,
        code: diagnostic.code,
        message: diagnostic.message,
        details: diagnostic.details,
        hint: diagnostic.hint,
      });
      return res
        .status(500)
        .json({
          ok: false,
          message: databaseMessage(error, "入驻申请提交失败，请稍后重试"),
          code: diagnostic.code,
          requestId,
          diagnostic,
        });
    }
    return res
      .status(201)
      .json({ ok: true, message: "入驻申请已提交，等待平台审核。" });
  }
  res.status(405).end();
};
