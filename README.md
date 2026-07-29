# ZIEC HOTEL & SUPPLY CHAIN V6.0

## V6.0 核心升级

1. 顶部导航将客房、月租公寓、酒店设施统一归入“酒店住宿”。
2. 新增 AI 客服：酒店、月租、企业服务、供应商入驻与采购询价问答。
3. 未配置 OPENAI_API_KEY 时自动使用内置 FAQ，不影响网站运行。
4. 供应链平台支持新增供应商、后台审核、一键分享、供应商推广海报生成。
5. 供应商入驻新增 Logo 图片网址和企业宣传语。

## 数据库升级

在现有 Supabase SQL Editor 再次运行 `supabase/schema.sql`。V6.0 仅增加：

- suppliers.logo_url
- suppliers.slogan

使用 `add column if not exists`，不会删除原数据。

## Vercel 环境变量

必需：
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY
- ADMIN_PASSWORD
- ADMIN_SESSION_SECRET

AI 客服可选：
- OPENAI_API_KEY
- OPENAI_MODEL（默认 gpt-5-mini）

不配置 OpenAI Key 时，AI 客服仍能回答常见问题。

## 部署

将本目录全部文件覆盖到同一个 GitHub 仓库根目录，提交后由同一个 Vercel 项目自动部署。
