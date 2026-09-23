# ZIEC HOTEL V7.8

ZIEC HOTEL（中鼎国际酒店）官方网站，部署于 Vercel，数据服务使用 Supabase。

## 主要页面

- `/`：网站首页
- `/rooms`：房型与看房
- `/booking`：网上订单
- `/monthly`：月租公寓
- `/corporate`：企业服务
- `/suppliers`：供应链平台
- `/contact`：联系方式与导航
- `/admin`：管理后台

## 网站功能

- 中、英、高棉三语切换
- 客房、月租公寓和企业住宿展示
- 网上订单与后台跟进
- Telegram、Facebook、WhatsApp 和电话咨询
- 供应商资料、分享与海报
- 全站累计浏览量

## 官方联系方式

- 电话：+855 018 318 0888
- 邮箱：ziechotel@163.com
- 官网：https://www.ziechotel.com
- Telegram：https://t.me/+IfLq7houMC5lZjU1
- Facebook：https://web.facebook.com/ziechotel

## 部署

1. 将代码提交至 GitHub 仓库 `xiejh8118/ziechotel`。
2. Vercel 自动部署主分支。
3. 保持 Vercel 中现有 Supabase 和后台环境变量不变。
4. 数据库已有 V6.4 完整结构时，V7.8 不需要执行新 SQL。

## 项目结构

- `assets/`：网站图片与房型素材
- `api/`：Vercel 统一 API 入口
- `handlers/`：订单、酒店、供应商及设置接口
- `lib/`：服务端公共方法
- `supabase/`：数据库完整结构
- 根目录 HTML、`script.js`、`styles.css`：前台和后台页面

请勿把视频剪辑工具、公众号排版工具、税务资料或其他独立项目复制到本仓库。
