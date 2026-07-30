const { createClient } = require("@supabase/supabase-js");
const crypto = require("crypto");
let client;
function db() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY)
    return null;
  if (!client)
    client = createClient(
      process.env.SUPABASE_URL.replace(/\/+$/, ""),
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: { persistSession: false, autoRefreshToken: false },
        global: { headers: { "X-Client-Info": "ziec-hotel-v6.0.2" } },
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
module.exports = { db, body, text, phone, token, authed, encrypt, decrypt };
