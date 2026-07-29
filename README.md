# ZIEC HOTEL + 供应链平台 V5.5

本版本以原 `www.ziechotel.top` 酒店正式版为主框架，融合供应链平台。已删除上传仓库中的 OpenCut、Pilipili、公众号设计 Skill、税务资料等全部无关代码。

## 保留
- 原酒店首页、房型详情、月租公寓、真实酒店图片、原视觉样式

## 新增
- 首页供应链平台入口
- 供应商列表、供应商入驻、采购询价
- 管理后台 `/admin.html`
- Supabase 数据库和 Vercel API

## 部署
1. 将本目录内容上传到原酒店仓库根目录。
2. Supabase SQL Editor 运行 `supabase/schema.sql`。
3. Vercel 添加 `SUPABASE_URL`、`SUPABASE_SERVICE_ROLE_KEY`、`ADMIN_PASSWORD`、`ADMIN_SESSION_SECRET`。
4. 重新部署。

后台地址：`/admin.html`。
