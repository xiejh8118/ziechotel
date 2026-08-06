ZIEC HOTEL V6.2 — SEO + GEO 智能搜索优化版
发布日期：2026-08-06

本更新包基于 GitHub 仓库当前 V6.0.9 增量制作，不修改数据库，不新增 Vercel API。

一、更新内容
1. robots.txt：允许主流搜索引擎及 AI 搜索机器人读取公开内容，屏蔽后台与 API。
2. sitemap.xml：提交首页、酒店、公寓、供应链、付款、GEO 与 FAQ 页面。
3. llms.txt：向 AI 搜索说明平台身份、服务范围、联系方式和重要规则。
4. geo.html：柬埔寨中文酒店、月租、企业住宿、接送包车与供应链知识页。
5. faq.html：常见问题页，并加入 FAQPage 结构化数据。
6. site.webmanifest：网站品牌与移动端基础信息。
7. vercel.json：保留 cleanUrls，并增加搜索文件类型与缓存、安全响应头。

二、上传方法
把 V6.2-update 文件夹里面的全部文件上传到 GitHub 仓库根目录。
出现“同名文件”时，选择覆盖 vercel.json；其他文件为新增文件。
Vercel 会自动部署，不需要执行 Supabase SQL。

三、部署后检查
https://www.ziechotel.top/robots.txt
https://www.ziechotel.top/sitemap.xml
https://www.ziechotel.top/llms.txt
https://www.ziechotel.top/geo
https://www.ziechotel.top/faq

四、搜索平台提交
1. Google Search Console 添加站点并提交 sitemap.xml。
2. Bing Webmaster Tools 导入站点并提交 sitemap.xml。
3. 页面上线后保持酒店价格、地址、图片和服务范围真实更新。

说明：SEO/GEO 不会在上传当天立即产生排名，一般需等待搜索引擎抓取和评估。

