const routes = {
  "admin-ai-settings": require("../handlers/admin-ai-settings"),
  "admin-data": require("../handlers/admin-data"),
  "admin-hotel": require("../handlers/admin-hotel"),
  "admin-login": require("../handlers/admin-login"),
  "admin-supplier": require("../handlers/admin-supplier"),
  "ai-chat": require("../handlers/ai-chat"),
  bookings: require("../handlers/bookings"),
  hotels: require("../handlers/hotels"),
  inquiries: require("../handlers/inquiries"),
  "site-settings": require("../handlers/site-settings"),
  "supplier-image": require("../handlers/supplier-image"),
  suppliers: require("../handlers/suppliers"),
};

module.exports = async (req, res) => {
  const raw = req.query?.path;
  const route = Array.isArray(raw) ? raw[0] : String(raw || "").split("/")[0];
  const handler = routes[route];

  if (!handler) {
    return res.status(404).json({ ok: false, message: "接口不存在" });
  }

  return handler(req, res);
};
