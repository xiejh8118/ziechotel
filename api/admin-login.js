const { body, text, token } = require("../lib/api-lib");
module.exports = (req, res) => {
  if (req.method !== "POST") return res.status(405).end();
  if (req.query.action === "logout") {
    res.setHeader(
      "Set-Cookie",
      "ziec_admin=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0",
    );
    return res.json({ ok: true });
  }
  if (text(body(req).password, 200) !== (process.env.ADMIN_PASSWORD || ""))
    return res.status(401).json({ ok: false, message: "密码错误" });
  res.setHeader(
    "Set-Cookie",
    `ziec_admin=${token()}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=28800`,
  );
  res.json({ ok: true });
};
