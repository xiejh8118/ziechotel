const { createClient } = require("@supabase/supabase-js");
const crypto = require("crypto");
let client;
function configuration() {
  const rawUrl = String(process.env.SUPABASE_URL || "").trim();
  const serviceRoleKey = String(
    process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  ).trim();
  const url = rawUrl.replace(/\/+$/, "");
  let error = "";

  if (!url || !serviceRoleKey) {
    error = "Supabase 环境变量尚未完整配置";
  } else {
    try {
      const parsed = new URL(url);
      if (parsed.protocol !== "https:") {
        error =
          "SUPABASE_URL 必须填写 https://项目编号.supabase.co，不能填写 PostgreSQL 连接串";
      }
    } catch {
      error = "SUPABASE_URL 格式不正确";
    }
  }

  return { url, serviceRoleKey, error };
}
function db() {
  const config = configuration();
  if (config.error) return null;
  if (!client)
    client = createClient(
      config.url,
      config.serviceRoleKey,
      {
        auth: { persistSession: false, autoRefreshToken: false },
        global: { headers: { "X-Client-Info": "ziec-hotel-v6.4" } },
      },
    );
  return client;
}
function body(req) {
  try {
    return typeof req.body === "string"
      ? JSON.parse(req.body || "{}")
      : req.body || {};
  } catch {
    return {};
  }
}
function text(v, n = 500) {
  return String(v || "")
    .trim()
    .slice(0, n);
}
function phone(v) {
  return text(v, 40).replace(/[^\d+\-\s()]/g, "");
}
function token() {
  return crypto
    .createHash("sha256")
    .update(
      (process.env.ADMIN_SESSION_SECRET || "dev") +
        ":" +
        (process.env.ADMIN_PASSWORD || "change"),
    )
    .digest("hex");
}
function authed(req) {
  const c = req.headers.cookie || "";
  return c.split(";").some((x) => x.trim() === "ziec_admin=" + token());
}
function databaseMessage(error, fallback = "数据库操作失败") {
  const message = String(error?.message || error || "");
  if (/relation .* does not exist/i.test(message))
    return "数据库表尚未创建，请执行 supabase/schema.sql";
  if (/could not find .*column|column .* does not exist/i.test(message))
    return "数据库字段尚未同步，请在 Supabase 执行字段升级 SQL 后刷新 Schema Cache";
  if (/schema cache/i.test(message))
    return "Supabase 数据结构缓存尚未刷新，请执行 notify pgrst, 'reload schema';";
  if (/fetch failed|network|websocket/i.test(message))
    return "无法连接 Supabase，请检查 SUPABASE_URL 并重新部署";
  if (/invalid api key|jwt|unauthorized/i.test(message))
    return "Supabase Service Role Key 无效，请检查 Vercel 环境变量";
  if (/image_urls/i.test(message))
    return "数据库字段尚未升级，请执行 supabase/schema.sql";
  if (/bucket.*not found|not found.*bucket/i.test(message))
    return "图片存储初始化失败，请确认 SUPABASE_SERVICE_ROLE_KEY 配置正确";
  if (/row-level security|policy/i.test(message))
    return "图片存储权限不足，请确认使用的是 Supabase Service Role Key";
  if (/payload|request entity too large|body.*large/i.test(message))
    return "图片文件过大，请换用较小的图片后重试";
  return fallback;
}
function databaseDiagnostic(error) {
  const source = error && typeof error === "object" ? error : {};
  return {
    code: String(source.code || "DATABASE_ERROR").slice(0, 80),
    message: String(source.message || error || "Unknown database error").slice(
      0,
      500,
    ),
    details: String(source.details || "").slice(0, 500),
    hint: String(source.hint || "").slice(0, 500),
  };
}
function encryptionKey() {
  return crypto
    .createHash("sha256")
    .update(
      process.env.ADMIN_SESSION_SECRET ||
        process.env.ADMIN_PASSWORD ||
        "change-me",
    )
    .digest();
}
function encrypt(value) {
  if (!value) return "";
  const iv = crypto.randomBytes(12),
    cipher = crypto.createCipheriv("aes-256-gcm", encryptionKey(), iv);
  const encrypted = Buffer.concat([
    cipher.update(String(value), "utf8"),
    cipher.final(),
  ]);
  return [
    iv.toString("base64"),
    cipher.getAuthTag().toString("base64"),
    encrypted.toString("base64"),
  ].join(".");
}
function decrypt(value) {
  if (!value) return "";
  try {
    const [iv, tag, data] = String(value)
      .split(".")
      .map((x) => Buffer.from(x, "base64"));
    const decipher = crypto.createDecipheriv(
      "aes-256-gcm",
      encryptionKey(),
      iv,
    );
    decipher.setAuthTag(tag);
    return Buffer.concat([decipher.update(data), decipher.final()]).toString(
      "utf8",
    );
  } catch {
    return "";
  }
}
module.exports = {
  db,
  configuration,
  databaseMessage,
  databaseDiagnostic,
  body,
  text,
  phone,
  token,
  authed,
  encrypt,
  decrypt,
};
