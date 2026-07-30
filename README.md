# ZIEC HOTEL V6.0.2

## 2026-07-30 数据库连接修复

- 修复 Vercel Node.js 20 与新版 Supabase SDK 不兼容导致的
  `WebSocket is not defined`。
- Vercel 运行环境升级为 Node.js 22，并锁定 Supabase SDK 版本，避免以后自动升级失效。
- `/api/health` 统一使用网站数据库客户端，不再重复创建不同配置的连接。
- 增加 `SUPABASE_URL` 格式检查。正确格式必须是：
  `https://项目编号.supabase.co`，不能使用 `postgresql://...` 数据库连接串。
- 供应商入驻、图片上传及采购询价返回明确的数据库错误说明。

重新部署后先访问 `/api/health`。若核心表尚未创建，再到 Supabase SQL Editor
执行一次 `supabase/schema.sql`。

## V6.0.2（2026-07-30）

- 数据库健康检查只将当前实际使用的核心表设为必需，避免误报连接失败。
- Supabase 客户端复用并标准化连接配置。
- 供应商入驻必须上传 4–10 张企业/产品实景图，浏览器自动压缩，Supabase Storage 保存。
- 供应商列表和管理后台增加图片画廊。
- 后台增加 AI 客服接口设置：启停、接口地址、模型、API Key 和客服指令。
- API Key 使用 AES-256-GCM 加密保存，不向浏览器回传。
- 首页和房型详情替换掉带网页截屏感的房型图片，改用干净实景图。

部署前需在 Supabase SQL Editor 执行 `supabase/schema.sql`，用于增加 `image_urls`、`site_settings` 和 `supplier-images` 存储桶。

## V5.6 首页修改（第一版）

本版基于 V5.5 酒店供应链融合版，仅调整首页宣传内容，其他功能和数据库结构保持不变。

## 本次修改

1. 删除首页 `ABOUT ZIEC / 品牌成长` 整个模块。
2. 删除导航中的“关于 ZIEC”。
3. 供应链主标题修改为：

   **链接柬埔寨优质供应链，服务企业真实需求**

4. 供应链说明修改为：

   **依托中鼎在柬埔寨长期积累的企业资源与本地服务能力，为工程项目、企业客户和供应商提供可靠、高效的合作对接。**

5. 社交分享说明中删除“真实酒店”，修改为：

   **商务住宿 · 企业接待 · 月租公寓 · 长期住宿**

## 部署

将本目录内所有文件覆盖到同一个 GitHub 仓库根目录，提交后由 Vercel 自动部署。

本次不需要修改 Supabase 数据库。

## V6.0.1 数据库健康检查

新增接口：

```text
/api/health
```

检查内容：

- Supabase 环境变量是否存在
- Supabase 是否可连接
- suppliers
- supplier_categories
- purchase_inquiries
- booking_inquiries
- hotels
- room_types
- site_settings

注意：健康接口只返回配置状态，不会显示任何密钥内容。
