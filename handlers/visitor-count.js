const { db, databaseMessage, rateLimit } = require("../lib/api-lib");

const SETTING_KEY = "public_visitor_count";

function safeCount(value) {
  const count = Number(value?.count ?? value ?? 0);
  return Number.isSafeInteger(count) && count >= 0 ? count : 0;
}

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store, max-age=0");
  const d = db();
  if (!d) return res.status(503).json({ ok: false, message: "浏览量服务尚未配置" });

  if (req.method === "GET") {
    const { data, error } = await d
      .from("site_settings")
      .select("setting_value")
      .eq("setting_key", SETTING_KEY)
      .maybeSingle();
    if (error) return res.status(500).json({ ok: false, message: databaseMessage(error) });
    return res.json({ ok: true, count: safeCount(data?.setting_value) });
  }

  if (req.method !== "POST") return res.status(405).end();
  if (!rateLimit(req, res, "visitor-count", 20, 60 * 60 * 1000)) return;

  const { data, error } = await d
    .from("site_settings")
    .select("setting_value")
    .eq("setting_key", SETTING_KEY)
    .maybeSingle();
  if (error) return res.status(500).json({ ok: false, message: databaseMessage(error) });

  const count = safeCount(data?.setting_value) + 1;
  const { error: saveError } = await d.from("site_settings").upsert({
    setting_key: SETTING_KEY,
    setting_value: { count },
    updated_at: new Date().toISOString(),
  });
  if (saveError) return res.status(500).json({ ok: false, message: databaseMessage(saveError) });
  return res.json({ ok: true, count });
};
