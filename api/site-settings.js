const { db, body, text, authed, databaseMessage } = require("../lib/api-lib");

const defaults = {
  video_enabled: false, video_title: "30秒了解 ZIEC HOTEL", video_description: "酒店实景、月租公寓、企业团房与本地服务。",
  video_url: "", video_cover: "./assets/hotel-exterior.jpg", wechat_channels_url: "", youtube_url: "",
  wechat: "", telegram: "", messenger: "", whatsapp: "855189958899"
};

module.exports = async (req, res) => {
  const d = db();
  if (!d) return res.status(503).json({ ok: false, message: "数据库尚未配置" });
  if (req.method === "GET") {
    const { data, error } = await d.from("site_settings").select("setting_value").eq("setting_key", "public_site").maybeSingle();
    if (error) return res.status(500).json({ ok: false, message: databaseMessage(error) });
    return res.json({ ok: true, data: { ...defaults, ...(data?.setting_value || {}) } });
  }
  if (req.method !== "PUT") return res.status(405).end();
  if (!authed(req)) return res.status(401).json({ ok: false, message: "请先登录" });
  const b = body(req), value = {};
  Object.keys(defaults).forEach((key) => value[key] = typeof defaults[key] === "boolean" ? Boolean(b[key]) : text(b[key], 500));
  const { error } = await d.from("site_settings").upsert({ setting_key: "public_site", setting_value: value, updated_at: new Date().toISOString() });
  if (error) return res.status(500).json({ ok: false, message: databaseMessage(error) });
  res.json({ ok: true, message: "视频与咨询设置已保存", data: value });
};
