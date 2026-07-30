const { db, configuration, databaseMessage } = require("../lib/api-lib");

const REQUIRED_TABLES = ["suppliers", "purchase_inquiries"];
const FEATURE_TABLES = ["site_settings"];

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ ok: false, message: "Method Not Allowed" });
  }

  res.setHeader("Cache-Control", "no-store, max-age=0");

  const config = configuration();
  const urlConfigured = Boolean(config.url);
  const keyConfigured = Boolean(config.serviceRoleKey);

  const result = {
    ok: false,
    version: "6.0.2",
    service: "ZIEC HOTEL Supply Platform",
    time: new Date().toISOString(),
    environment: process.env.VERCEL_ENV || process.env.NODE_ENV || "unknown",
    configuration: {
      supabaseUrl: urlConfigured,
      serviceRoleKey: keyConfigured,
    },
    database: {
      connected: false,
      tables: {},
    },
  };

  if (config.error) {
    result.message = config.error + "。";
    return res.status(503).json(result);
  }

  try {
    const supabase = db();

    for (const table of [...REQUIRED_TABLES, ...FEATURE_TABLES]) {
      const { error } = await supabase
        .from(table)
        .select("*", { count: "exact", head: true });
      result.database.tables[table] = {
        exists: !error,
        error: error ? error.message : null,
      };
    }

    const coreStatuses = REQUIRED_TABLES.map(
      (table) => result.database.tables[table],
    );
    result.database.connected = coreStatuses.some((item) => item.exists);
    const allTablesReady = coreStatuses.every((item) => item.exists);
    result.ok = result.database.connected && allTablesReady;
    result.message = result.ok
      ? "网站、数据库及所需数据表均正常。"
      : result.database.connected
        ? "Supabase 已连接，但核心数据表尚未完整创建。"
        : "无法连接 Supabase，请检查环境变量或项目状态。";

    return res.status(result.ok ? 200 : 503).json(result);
  } catch (error) {
    result.message = databaseMessage(error, "数据库健康检查执行失败。");
    result.database.error =
      error instanceof Error ? error.message : String(error);
    return res.status(503).json(result);
  }
};
