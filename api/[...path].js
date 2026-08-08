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
  const queryRoute = Array.isArray(raw) ? raw[0] : String(raw || "").split("/")[0];
  const requestUrl = String(req.url || req.originalUrl || "");
  const urlRoute = requestUrl
    .replace(/^https?:\/\/[^/]+/i, "")
    .replace(/^\/api\//, "")
    .split(/[/?#]/)[0];
  const route = queryRoute || urlRoute;
  const handler = routes[route];

  if (!handler) {
    return res.status(404).json({
      ok: false,
      message: "接口不存在",
      code: "V6.5-ROUTE-FIX1",
      route: route || "(empty)",
    });
  }

  return handler(req, res);
};
