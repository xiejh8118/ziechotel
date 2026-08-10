const { db, text } = require("../lib/api-lib");

module.exports = async (req, res) => {
  const id = text(req.query.id, 100);
  const d = db();
  if (!d || !id) return res.status(404).send("Supplier not found");
  const { data } = await d.from("suppliers").select("id,company_name,products,description,city,image_urls,status").eq("id", id).eq("status", "approved").maybeSingle();
  if (!data) return res.status(404).send("Supplier not found");
  const title = `${data.company_name}｜ZIEC HOTEL供应链平台`;
  const description = text(data.products || data.description || `${data.city || "柬埔寨"}优质供应商`, 180);
  const image = Array.isArray(data.image_urls) && data.image_urls.find((url) => /^https:\/\//i.test(url)) || "https://www.ziechotel.top/assets/ziec-cover-v66.png";
  const target = `https://www.ziechotel.top/suppliers?supplier=${encodeURIComponent(id)}`;
  const esc = (value) => String(value || "").replace(/[&<>\"]/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=300");
  return res.send(`<!doctype html><html lang="zh"><head><meta charset="utf-8"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><meta property="og:type" content="website"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:image" content="${esc(image)}"><meta property="og:url" content="${esc(target)}"><meta name="twitter:card" content="summary_large_image"><script>location.replace(${JSON.stringify(target)})<\/script></head><body><a href="${esc(target)}">${esc(title)}</a></body></html>`);
};
