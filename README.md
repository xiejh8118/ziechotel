# 中鼎生活 MVP 首页

域名：`ziechotel.top`

这是一个零依赖的静态网站第一版，可直接部署到 Vercel、Netlify、GitHub Pages 或传统虚拟主机。

## 文件
- `index.html`：首页结构和文案
- `styles.css`：响应式视觉样式
- `script.js`：手机导航与演示表单
- `vercel.json`：Vercel 静态部署配置

## 本地查看
双击 `index.html` 即可浏览。

## Vercel 部署
1. 新建 GitHub 仓库，例如 `zhongding-life`
2. 上传本目录全部文件
3. 登录 Vercel，导入该 GitHub 仓库
4. Framework Preset 选择 `Other`
5. 点击 Deploy
6. 在 Vercel 项目 Settings → Domains 添加 `ziechotel.top`
7. 按 Vercel 提示去域名服务商修改 DNS

## 下一步建议
1. 替换酒店主图、Logo 与企业图片
2. 填写真实酒店介绍、地址、房型和价格
3. 接入 WhatsApp 点击咨询
4. 建立酒店、企业、供应商独立详情页
5. 第二阶段再增加后台和数据库
