const { body, text, db, decrypt } = require("../lib/api-lib");
const FAQ = [
  {
    keys: ["客房", "房价", "住宿", "双床", "vip"],
    answer:
      "中鼎国际酒店提供标准双床房、VIP房和月租公寓。标准双床房参考价 US$35/晚，VIP房参考价 US$70/晚，月租公寓 US$260/月起。最终价格请通过 WhatsApp 与酒店确认。",
  },
  {
    keys: ["月租", "公寓", "长住"],
    answer:
      "月租公寓适合商务人士、企业员工和长期驻柬客户，US$260/月起，可咨询企业长租方案。",
  },
  {
    keys: ["供应商", "入驻", "新增"],
    answer:
      "请进入“供应商入驻”页面填写企业名称、分类、联系人、主营产品等资料。提交后进入待审核状态，审核通过后在供应链平台公开展示。",
  },
  {
    keys: ["询价", "采购", "需求"],
    answer:
      "请进入“发布采购询价”页面，填写采购分类、需求内容、预算和联系方式，平台将协助对接供应商。",
  },
  {
    keys: ["联系", "电话", "whatsapp"],
    answer:
      "中文服务与 WhatsApp：+855 018 995 8899；柬文电话：+855 018 318 0888。",
  },
  {
    keys: ["地址", "位置", "地图"],
    answer:
      "酒店位于柬埔寨金边。具体定位请通过网站联系我们或 WhatsApp 获取地图导航。",
  },
];
function fallback(q) {
  const low = q.toLowerCase();
  const found = FAQ.find((x) => x.keys.some((k) => low.includes(k)));
  return found
    ? found.answer
    : "我可以协助您咨询酒店住宿、月租公寓、企业协议住宿、供应商入驻和采购询价。需要人工协助时，请联系 WhatsApp：+855 018 995 8899。";
}
module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();
  const q = text(body(req).message, 500);
  if (!q) return res.status(400).json({ ok: false, message: "请输入问题" });
  let cfg = {
    enabled: true,
    base_url: "https://api.openai.com/v1",
    model: process.env.OPENAI_MODEL || "gpt-5-mini",
    api_key: process.env.OPENAI_API_KEY || "",
    system_prompt: "",
  };
  const d = db();
  if (d) {
    const { data } = await d
      .from("site_settings")
      .select("setting_value")
      .eq("setting_key", "ai_customer_service")
      .maybeSingle();
    const v = data?.setting_value;
    if (v) cfg = { ...cfg, ...v, api_key: decrypt(v.api_key) || cfg.api_key };
  }
  if (cfg.enabled === false || !cfg.api_key)
    return res.json({ ok: true, answer: fallback(q), mode: "faq" });
  try {
    const r = await fetch(`${cfg.base_url}/responses`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cfg.api_key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: cfg.model,
        instructions:
          cfg.system_prompt ||
          "你是中鼎国际酒店和中鼎供应链平台的中文客服。回答简洁、准确，不虚构价格或服务。酒店参考信息：标准双床房US$35/晚，VIP房US$70/晚，月租公寓US$260/月起；WhatsApp +855 018 995 8899。供应商入驻需审核，采购方可发布询价。无法确认时引导联系人工。",
        input: q,
        max_output_tokens: 300,
      }),
    });
    const j = await r.json();
    if (!r.ok) throw new Error(j.error?.message || "AI服务异常");
    let answer = j.output_text || "";
    if (!answer && Array.isArray(j.output))
      answer = j.output
        .flatMap((o) => o.content || [])
        .map((c) => c.text || "")
        .join("");
    res.json({ ok: true, answer: answer || fallback(q), mode: "ai" });
  } catch (e) {
    console.error("AI chat error", e);
    res.json({ ok: true, answer: fallback(q), mode: "faq" });
  }
};
