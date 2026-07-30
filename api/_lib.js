const { createClient } = require("@supabase/supabase-js");
const crypto = require("crypto");
function db() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY)
    return null;
  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } },
  );
}
function body(req) {
  return typeof req.body === "string"
    ? JSON.parse(req.body || "{}")
    : req.body || {};
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
module.exports = { db, body, text, phone, token, authed };
