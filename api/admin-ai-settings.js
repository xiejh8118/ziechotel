const { db, body, text, authed, encrypt, decrypt } = require("../lib/api-lib");
const KEY = "ai_customer_service";
module.exports = async (req, res) => {
  if (!authed(req))
    return res.status(401).json({ ok: false, message: "请先登录" });
  const d = db();
  if (!d) return res.status(503).json({ ok: false, message: "数据库尚未配置" });
  if (req.method === "GET") {
    const { data, error } = await d
      .from("site_settings")
      .select("setting_value,updated_at")
      .eq("setting_key", KEY)
      .maybeSingle();
    if (error)
      return res
        .status(500)
        .json({ ok: false, message: "请先执行 V6.0.2 数据库升级脚本" });
    const v = data?.setting_value || {};
    return res.json({
      ok: true,
      data: {
        enabled: v.enabled !== false,
        provider: v.provider || "openai",
        base_url: v.base_url || "https://api.openai.com/v1",
        model: v.model || "gpt-5-mini",
        system_prompt: v.system_prompt || "",
        has_api_key: Boolean(decrypt(v.api_key)),
        updated_at: data?.updated_at || null,
      },
    });
  }
  if (req.method === "PUT") {
    const b = body(req),
      existing = await d
        .from("site_settings")
        .select("setting_value")
        .eq("setting_key", KEY)
        .maybeSingle();
    if (existing.error)
      return res
        .status(500)
        .json({ ok: false, message: "请先执行 V6.0.2 数据库升级脚本" });
    const old = existing.data?.setting_value || {},
      apiKey = text(b.api_key, 500);
    const value = {
      enabled: b.enabled !== false,
      provider: text(b.provider, 30) || "openai",
      base_url:
        text(b.base_url, 300).replace(/\/+$/, "") ||
        "https://api.openai.com/v1",
      model: text(b.model, 100) || "gpt-5-mini",
      system_prompt: text(b.system_prompt, 3000),
      api_key: apiKey ? encrypt(apiKey) : old.api_key || "",
    };
    const { error } = await d
      .from("site_settings")
      .upsert({
        setting_key: KEY,
        setting_value: value,
        updated_at: new Date().toISOString(),
      });
    if (error)
      return res.status(500).json({ ok: false, message: "AI配置保存失败" });
    return res.json({ ok: true, message: "AI 客服接口配置已安全保存" });
  }
  res.status(405).end();
};
