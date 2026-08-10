const { body, text, token, rateLimit } = require("../lib/api-lib");
module.exports = (req, res) => {
  if (req.method !== "POST") return res.status(405).end();
  if (req.query.action === "logout") {
    res.setHeader(
      "Set-Cookie",
      "ziec_admin=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0",
    );
    return res.json({ ok: true });
  }
  if (!rateLimit(req, res, "admin-login", 6, 15 * 60_000)) return;
  const password = String(process.env.ADMIN_PASSWORD || "").trim();
  const secret = String(process.env.ADMIN_SESSION_SECRET || "").trim();
  if (!password || password.length < 12 || !secret || secret.length < 32)
    return res.status(503).json({ ok: false, message: "后台安全配置未完成，请联系管理员" });
  if (text(body(req).password, 200) !== password)
    return res.status(401).json({ ok: false, message: "密码错误" });
  res.setHeader(
    "Set-Cookie",
    `ziec_admin=${token()}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=28800`,
  );
  res.json({ ok: true });
};
