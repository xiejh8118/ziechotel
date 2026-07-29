const { createClient } = require('@supabase/supabase-js');

const REQUIRED_TABLES = [
  'suppliers',
  'supplier_categories',
  'purchase_inquiries',
  'booking_inquiries',
  'hotels',
  'room_types',
  'site_settings'
];

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ ok: false, message: 'Method Not Allowed' });
  }

  res.setHeader('Cache-Control', 'no-store, max-age=0');

  const urlConfigured = Boolean(process.env.SUPABASE_URL);
  const keyConfigured = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);

  const result = {
    ok: false,
    version: '6.0.1',
    service: 'ZIEC HOTEL Supply Platform',
    time: new Date().toISOString(),
    environment: process.env.VERCEL_ENV || process.env.NODE_ENV || 'unknown',
    configuration: {
      supabaseUrl: urlConfigured,
      serviceRoleKey: keyConfigured
    },
    database: {
      connected: false,
      tables: {}
    }
  };

  if (!urlConfigured || !keyConfigured) {
    result.message = 'Supabase 环境变量尚未完整配置。';
    return res.status(503).json(result);
  }

  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { persistSession: false, autoRefreshToken: false } }
    );

    for (const table of REQUIRED_TABLES) {
      const { error } = await supabase.from(table).select('*', { count: 'exact', head: true });
      result.database.tables[table] = {
        exists: !error,
        error: error ? error.message : null
      };
    }

    const tableStatuses = Object.values(result.database.tables);
    result.database.connected = tableStatuses.some((item) => item.exists);
    const allTablesReady = tableStatuses.every((item) => item.exists);
    result.ok = result.database.connected && allTablesReady;
    result.message = result.ok
      ? '网站、数据库及所需数据表均正常。'
      : result.database.connected
        ? 'Supabase 已连接，但部分数据表尚未创建。'
        : '无法连接 Supabase，请检查环境变量或项目状态。';

    return res.status(result.ok ? 200 : 503).json(result);
  } catch (error) {
    result.message = '数据库健康检查执行失败。';
    result.database.error = error instanceof Error ? error.message : String(error);
    return res.status(503).json(result);
  }
};
