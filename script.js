const toast = document.querySelector(".toast");
function showToast(msg) {
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
}
async function sharePage(button) {
  const url = button.dataset.url || location.href;
  const title = button.dataset.title || document.title;
  const text = button.dataset.text || title;
  try {
    if (navigator.share) {
      await navigator.share({ title, text, url });
    } else {
      await navigator.clipboard.writeText(url);
      showToast("链接已复制");
    }
  } catch (e) {
    if (e.name !== "AbortError") showToast("分享未完成");
  }
}
async function copyLink(button) {
  const url = button.dataset.url || location.href;
  try {
    await navigator.clipboard.writeText(url);
    showToast("链接已复制");
  } catch (e) {
    showToast("复制失败，请手动复制");
  }
}
document
  .querySelectorAll("[data-share]")
  .forEach((b) => b.addEventListener("click", () => sharePage(b)));
document
  .querySelectorAll("[data-copy]")
  .forEach((b) => b.addEventListener("click", () => copyLink(b)));
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }),
  );
}

// ZIEC Supply Chain V5.5
const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
async function jsonFetch(url, options = {}) {
  const r = await fetch(url, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) {
    const diagnostic = j.requestId
      ? `（错误代码：${j.code || "UNKNOWN"}；诊断号：${j.requestId}）`
      : j.code
        ? `（错误代码：${j.code}）`
        : "";
    throw new Error(`${j.message || "操作失败"}${diagnostic}`);
  }
  return j;
}
async function loadSuppliers() {
  const grid = document.querySelector("#supplierGrid");
  if (!grid) return;
  const status = document.querySelector("#supplierStatus");
  try {
    const j = await jsonFetch("/api/suppliers");
    window.__suppliers = j.data || [];
    renderSuppliers(window.__suppliers);
    status.textContent = `共 ${window.__suppliers.length} 家已审核供应商`;
  } catch (e) {
    status.textContent = e.message;
    grid.innerHTML = "";
  }
}

async function loadHomeRecommendations() {
  const hotelGrid = document.querySelector("#homeHotelGrid");
  const supplierGrid = document.querySelector("#homeSupplierGrid");
  if (hotelGrid) {
    try {
      const j = await jsonFetch("/api/hotels?limit=10");
      hotelGrid.innerHTML = (j.data || []).slice(0, 10).map((h) => {
        const image = Array.isArray(h.image_urls) && h.image_urls[0];
        return `<article class="recommend-card">${image ? `<img src="${esc(image)}" alt="${esc(h.room_type)}" loading="lazy">` : '<div class="recommend-placeholder">ZIEC HOTEL</div>'}<div><small>${h.featured ? "推荐酒店" : "酒店住宿"}</small><h3>${esc(h.name || "中鼎国际酒店")} · ${esc(h.room_type)}</h3><p>US$ ${esc(h.price)} / ${esc(h.price_unit || "晚")}</p><a href="./hotels.html">查看与预订 →</a></div></article>`;
      }).join("") || '<p class="muted">酒店推荐即将上线。</p>';
    } catch (e) { hotelGrid.innerHTML = `<p class="muted">${esc(e.message)}</p>`; }
  }
  if (supplierGrid) {
    try {
      const j = await jsonFetch("/api/suppliers?limit=20");
      supplierGrid.innerHTML = (j.data || []).slice(0, 20).map((s) => {
        const image = Array.isArray(s.image_urls) && s.image_urls[0];
        return `<article class="recommend-card supplier-recommend">${image ? `<img src="${esc(image)}" alt="${esc(s.company_name)}" loading="lazy">` : '<div class="recommend-placeholder">ZIEC SUPPLY</div>'}<div><small>${esc(s.category || "供应商")}</small><h3>${esc(s.company_name)}</h3><p>${esc(s.city || "柬埔寨")}</p><a href="./suppliers.html">查看供应商 →</a></div></article>`;
      }).join("") || '<p class="muted">供应商推荐即将上线。</p>';
    } catch (e) { supplierGrid.innerHTML = `<p class="muted">${esc(e.message)}</p>`; }
  }
}
loadHomeRecommendations();
function renderSuppliers(list) {
  const grid = document.querySelector("#supplierGrid");
  grid.innerHTML =
    list
      .map((s) => {
        const wa = (s.whatsapp || s.phone || "").replace(/\D/g, "");
        const initials = esc((s.company_name || "Z").slice(0, 1));
        const images = Array.isArray(s.image_urls)
          ? s.image_urls.slice(0, 4)
          : [];
        const media = images.length
          ? `<div class="supplier-gallery">${images.map((url, i) => `<div class="${i === 3 && s.image_urls.length > 4 ? "gallery-more" : ""}" ${i === 3 && s.image_urls.length > 4 ? `data-more="+${s.image_urls.length - 4}"` : ""}><img src="${esc(url)}" alt="${esc(s.company_name)} 企业图片 ${i + 1}" loading="lazy"></div>`).join("")}</div>`
          : `<div class="supplier-brand">${s.logo_url ? `<img src="${esc(s.logo_url)}" alt="${esc(s.company_name)} Logo" onerror="this.remove()">` : `<span>${initials}</span>`}</div>`;
        return `<article class="card supplier-card">${media}${s.featured ? '<div class="card-label">推荐供应商</div>' : ""}<div class="card-body"><div class="card-label">${esc(s.category)}</div><h3>${esc(s.company_name)}</h3>${s.slogan ? `<p class="supplier-slogan">${esc(s.slogan)}</p>` : ""}<div class="supplier-meta">${esc(s.city || "柬埔寨")} · 联系人：${esc(s.contact_name)}</div><p class="muted">${esc(s.products || s.description || "")}</p><div class="supplier-actions">${wa ? `<a class="btn btn-primary" target="_blank" rel="noopener" href="https://wa.me/${wa}">WhatsApp</a>` : ""}<button class="share-btn" onclick='shareSupplier(${JSON.stringify(JSON.stringify(s))})'>分享</button><button class="share-btn" onclick='createSupplierPoster(${JSON.stringify(JSON.stringify(s))})'>生成海报</button><a class="btn btn-dark" href="./inquiry.html">采购询价</a></div></div></article>`;
      })
      .join("") || '<div class="muted">暂无符合条件的供应商。</div>';
}
document.querySelector("#supplierSearch")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const k = document.querySelector("#supplierKeyword").value.toLowerCase(),
    c = document.querySelector("#supplierCategory").value;
  renderSuppliers(
    (window.__suppliers || []).filter(
      (s) =>
        (!c || s.category === c) &&
        (!k ||
          `${s.company_name} ${s.products} ${s.description}`
            .toLowerCase()
            .includes(k)),
    ),
  );
});
async function submitDataForm(form, url, msg) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    msg.textContent = "正在提交……";
    msg.className = "form-message full";
    try {
      const data = Object.fromEntries(new FormData(form).entries());
      const j = await jsonFetch(url, {
        method: "POST",
        body: JSON.stringify(data),
      });
      msg.textContent = j.message;
      msg.className = "form-message full ok";
      form.reset();
    } catch (err) {
      msg.textContent = err.message;
      msg.className = "form-message full bad";
    }
  });
}
const jf = document.querySelector("#supplierJoinForm");
const imageInput = document.querySelector("#supplierImages");
const imagePreview = document.querySelector("#supplierImagePreview");
imageInput?.addEventListener("change", () => {
  const files = [...imageInput.files].slice(0, 10);
  if (imageInput.files.length > 10) {
    imageInput.value = "";
    imagePreview.innerHTML =
      '<span class="form-message bad">最多上传10张图片</span>';
    return;
  }
  imagePreview.innerHTML = files
    .map(
      (file, i) =>
        `<figure><img src="${URL.createObjectURL(file)}" alt="预览 ${i + 1}"><span>${i + 1}</span></figure>`,
    )
    .join("");
});
async function compressImage(file) {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1280 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  let quality = 0.78;
  let data = canvas.toDataURL("image/jpeg", quality);
  while (data.length > 2.4 * 1024 * 1024 && quality > 0.5) {
    quality -= 0.08;
    data = canvas.toDataURL("image/jpeg", quality);
  }
  return data;
}
if (jf) {
  jf.addEventListener("submit", async (e) => {
    e.preventDefault();
    const msg = document.querySelector("#joinMessage"),
      files = [...imageInput.files];
    if (files.length < 4 || files.length > 10) {
      msg.textContent = "请选择4–10张企业或产品图片";
      msg.className = "form-message full bad";
      return;
    }
    const progress = jf.querySelector(".upload-progress"),
      bar = progress.querySelector("i");
    progress.hidden = false;
    msg.textContent = "正在压缩并上传图片……";
    msg.className = "form-message full";
    try {
      const image_urls = [];
      for (let i = 0; i < files.length; i++) {
        msg.textContent = `正在处理第 ${i + 1}/${files.length} 张图片……`;
        const data = await compressImage(files[i]);
        const uploaded = await jsonFetch("/api/supplier-image", {
          method: "POST",
          body: JSON.stringify({ data }),
        });
        image_urls.push(uploaded.url);
        bar.style.width = `${Math.round(((i + 1) / files.length) * 100)}%`;
      }
      const data = Object.fromEntries(new FormData(jf).entries());
      delete data.supplier_images;
      data.image_urls = image_urls;
      const j = await jsonFetch("/api/suppliers", {
        method: "POST",
        body: JSON.stringify(data),
      });
      msg.textContent = j.message;
      msg.className = "form-message full ok";
      jf.reset();
      imagePreview.innerHTML = "";
    } catch (err) {
      msg.textContent = `上传未完成：${err.message}`;
      msg.className = "form-message full bad";
    } finally {
      progress.hidden = true;
      bar.style.width = "0";
    }
  });
}
const inf = document.querySelector("#inquiryForm");
if (inf)
  submitDataForm(
    inf,
    "/api/inquiries",
    document.querySelector("#inquiryMessage"),
  );
const login = document.querySelector("#adminLogin"),
  dash = document.querySelector("#adminDashboard"),
  content = document.querySelector("#adminContent");
let adminTab = "suppliers";
let adminRows = [];
const statusName = { pending: "待审核", approved: "已通过", rejected: "已驳回", paused: "已暂停", draft: "草稿", published: "已发布", new: "新询价" };
function renderSupplierAdmin(rows) {
  const counts = ["all", "pending", "approved", "rejected", "paused"].map((s) => `<button class="admin-filter ${s === "all" ? "active" : ""}" data-supplier-filter="${s}">${s === "all" ? "全部" : statusName[s]} (${s === "all" ? rows.length : rows.filter((x) => x.status === s).length})</button>`).join("");
  content.innerHTML = `<div class="admin-summary">${counts}</div><div id="supplierAdminRows"></div>`;
  const draw = (filter = "all") => {
    const list = filter === "all" ? rows : rows.filter((x) => x.status === filter);
    document.querySelector("#supplierAdminRows").innerHTML = list.map((x) => `<article class="admin-item"><div><div class="admin-title-row"><b>${esc(x.company_name)}</b><span class="status-badge status-${esc(x.status)}">${statusName[x.status] || esc(x.status)}</span>${x.featured ? '<span class="status-badge featured">推荐</span>' : ""}</div><p>${esc(x.category)} · ${esc(x.city)}</p><p>${esc(x.contact_name)} · ${esc(x.phone || x.whatsapp)}</p><p>${esc(x.products)}</p><div class="admin-gallery">${(x.image_urls || []).map((url, i) => `<img src="${esc(url)}" alt="企业图片${i + 1}">`).join("")}</div></div><div class="admin-item-actions"><button class="approve" onclick="supplierAct('${x.id}','approved')">通过</button><button onclick="supplierAct('${x.id}','pending')">待审</button><button class="reject" onclick="supplierAct('${x.id}','rejected')">驳回</button><button onclick="supplierAct('${x.id}','paused')">暂停</button><button onclick="supplierFeature('${x.id}',${!x.featured})">${x.featured ? "取消推荐" : "设为推荐"}</button><button class="reject" onclick="supplierDelete('${x.id}')">删除</button></div></article>`).join("") || '<div class="muted admin-empty">当前分类暂无供应商</div>';
  };
  document.querySelectorAll("[data-supplier-filter]").forEach((b) => b.addEventListener("click", () => { document.querySelectorAll("[data-supplier-filter]").forEach((x) => x.classList.toggle("active", x === b)); draw(b.dataset.supplierFilter); }));
  draw();
}
function hotelForm(h = {}) {
  return `<form class="hotel-admin-form" id="hotelAdminForm"><input type="hidden" name="id" value="${esc(h.id || "")}"><h3>${h.id ? "编辑酒店房型" : "新增酒店房型"}</h3><label>酒店/产品名称<input name="name" required value="${esc(h.name || "中鼎国际酒店")}"></label><label>房型名称<input name="room_type" required value="${esc(h.room_type || "")}" placeholder="标准双床房"></label><label>价格（美元）<input name="price" type="number" min="0" step="0.01" value="${esc(h.price || "")}"></label><label>计价单位<select name="price_unit"><option value="晚">每晚</option><option value="月">每月</option></select></label><label>可售房数<input name="rooms_available" type="number" min="0" value="${esc(h.rooms_available ?? 0)}"></label><label>状态<select name="status"><option value="draft">草稿</option><option value="published">发布</option><option value="paused">暂停</option></select></label><label class="full">设施（逗号分隔）<input name="facilities" value="${esc((h.facilities || []).join("，"))}" placeholder="WiFi，早餐，停车场"></label><label class="full">图片网址（每行一个，最多10张）<textarea name="image_urls">${esc((h.image_urls || []).join("\n"))}</textarea></label><label class="full">房型介绍<textarea name="description">${esc(h.description || "")}</textarea></label><label class="check"><input name="featured" type="checkbox" ${h.featured ? "checked" : ""}> 首页推荐</label><div class="full hotel-form-actions"><button class="btn btn-primary">${h.id ? "保存修改" : "新增房型"}</button>${h.id ? '<button type="button" class="btn btn-dark" onclick="hotelCancelEdit()">取消编辑</button>' : ""}</div><div id="hotelFormMessage" class="form-message full"></div></form>`;
}
function renderHotels(rows) {
  content.innerHTML = hotelForm() + `<div class="admin-list hotel-list">${rows.map((h) => `<article class="admin-item"><div><div class="admin-title-row"><b>${esc(h.name)} · ${esc(h.room_type)}</b><span class="status-badge status-${esc(h.status)}">${statusName[h.status] || esc(h.status)}</span>${h.featured ? '<span class="status-badge featured">推荐</span>' : ""}</div><p>US$ ${esc(h.price)} / ${esc(h.price_unit)} · 可售 ${esc(h.rooms_available)} 间</p><p>${esc(h.description || "暂无介绍")}</p><div class="admin-gallery">${(h.image_urls || []).map((url, i) => `<img src="${esc(url)}" alt="酒店图片${i + 1}">`).join("")}</div></div><div class="admin-item-actions"><button class="approve" onclick="hotelEdit('${h.id}')">编辑</button><button class="reject" onclick="hotelDelete('${h.id}')">删除</button></div></article>`).join("") || '<div class="muted admin-empty">暂无酒店房型，请在上方新增</div>'}</div>`;
  document.querySelector("#hotelAdminForm").addEventListener("submit", saveHotel);
}
async function loadAdmin() {
  try {
    if (adminTab === "ai-settings") {
      const j = await jsonFetch("/api/admin-ai-settings");
      login.hidden = true;
      dash.hidden = false;
      const s = j.data;
      content.innerHTML = `<form class="ai-settings-form" id="aiSettingsForm"><label>启用 AI 客服<select name="enabled"><option value="true" ${s.enabled ? "selected" : ""}>启用</option><option value="false" ${!s.enabled ? "selected" : ""}>停用（自动使用FAQ）</option></select></label><label>接口类型<select name="provider"><option value="openai" selected>OpenAI / 兼容接口</option></select></label><label class="full">API 接口地址<input name="base_url" type="url" required value="${esc(s.base_url)}" placeholder="https://api.openai.com/v1"></label><label>模型名称<input name="model" required value="${esc(s.model)}" placeholder="gpt-5-mini"></label><label>API Key<input name="api_key" type="password" placeholder="${s.has_api_key ? "已安全保存，留空不修改" : "请输入 API Key"}"></label><label class="full">客服指令<textarea name="system_prompt" placeholder="设置客服身份、酒店价格、服务范围和回答规则">${esc(s.system_prompt)}</textarea></label><div class="full settings-note">API Key 仅加密保存在服务器，不会返回浏览器。建议先保存，再点击测试连接。</div><div class="full ai-setting-actions"><button class="btn btn-primary">保存设置</button><button class="btn btn-dark" type="button" id="testAIConnection">测试连接</button></div><div id="aiSettingsMessage" class="form-message full"></div></form>`;
      document
        .querySelector("#aiSettingsForm")
        .addEventListener("submit", saveAISettings);
      document.querySelector("#testAIConnection").addEventListener("click", testAIConnection);
      return;
    }
    const j = await jsonFetch("/api/admin-data?type=" + adminTab);
    login.hidden = true;
    dash.hidden = false;
    adminRows = j.data || [];
    if (adminTab === "suppliers") return renderSupplierAdmin(adminRows);
    if (adminTab === "hotels") return renderHotels(adminRows);
    content.innerHTML = adminRows
        .map((x) =>
          `<article class="admin-item"><div><b>${esc(x.customer_name)} · ${esc(x.company_name)}</b><p>${esc(x.category)} · 预算 ${esc(x.budget)}</p><p>${esc(x.phone || x.whatsapp)}</p><p>${esc(x.requirements)}</p><p>${esc(x.delivery_time)}</p></div></article>`,
        )
        .join("") || '<div class="muted">暂无数据</div>';
  } catch (e) {
    login.hidden = false;
    dash.hidden = true;
  }
}
async function testAIConnection() {
  const form = document.querySelector("#aiSettingsForm"), msg = document.querySelector("#aiSettingsMessage"), data = Object.fromEntries(new FormData(form).entries());
  msg.textContent = "正在测试接口……";
  try { const j = await jsonFetch("/api/admin-ai-settings", { method: "POST", body: JSON.stringify(data) }); msg.textContent = j.message; msg.className = "form-message full ok"; }
  catch (err) { msg.textContent = err.message; msg.className = "form-message full bad"; }
}
async function saveHotel(e) {
  e.preventDefault();
  const form = e.currentTarget, data = Object.fromEntries(new FormData(form).entries()), id = data.id;
  data.featured = form.featured.checked; delete data.id;
  try { await jsonFetch("/api/admin-hotel" + (id ? `?id=${id}` : ""), { method: id ? "PATCH" : "POST", body: JSON.stringify(data) }); await loadAdmin(); }
  catch (err) { const msg = document.querySelector("#hotelFormMessage"); msg.textContent = err.message; msg.className = "form-message full bad"; }
}
window.hotelEdit = (id) => { const h = adminRows.find((x) => x.id === id); if (!h) return; const old = document.querySelector("#hotelAdminForm"); old.outerHTML = hotelForm(h); const form = document.querySelector("#hotelAdminForm"); form.status.value = h.status; form.price_unit.value = h.price_unit; form.addEventListener("submit", saveHotel); scrollTo({ top: form.offsetTop - 90, behavior: "smooth" }); };
window.hotelCancelEdit = () => loadAdmin();
window.hotelDelete = async (id) => { if (!confirm("确定删除该酒店房型吗？此操作不能恢复。")) return; await jsonFetch(`/api/admin-hotel?id=${id}`, { method: "DELETE" }); loadAdmin(); };
async function saveAISettings(e) {
  e.preventDefault();
  const form = e.currentTarget,
    msg = document.querySelector("#aiSettingsMessage"),
    data = Object.fromEntries(new FormData(form).entries());
  data.enabled = data.enabled === "true";
  msg.textContent = "正在保存……";
  try {
    const j = await jsonFetch("/api/admin-ai-settings", {
      method: "PUT",
      body: JSON.stringify(data),
    });
    msg.textContent = j.message;
    msg.className = "form-message full ok";
    form.api_key.value = "";
  } catch (err) {
    msg.textContent = err.message;
    msg.className = "form-message full bad";
  }
}
login?.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    await jsonFetch("/api/admin-login", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(new FormData(login).entries())),
    });
    loadAdmin();
  } catch (err) {
    document.querySelector("#adminLoginMessage").textContent = err.message;
  }
});
document.querySelectorAll("[data-tab]").forEach((b) =>
  b.addEventListener("click", () => {
    adminTab = b.dataset.tab;
    document
      .querySelectorAll("[data-tab]")
      .forEach((x) => x.classList.toggle("active", x === b));
    loadAdmin();
  }),
);
document.querySelector("#adminLogout")?.addEventListener("click", async () => {
  await jsonFetch("/api/admin-logout", { method: "POST" });
  location.reload();
});
window.supplierAct = async (id, status) => {
  const j = await jsonFetch("/api/admin-supplier?id=" + id, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
  showToast(j.message || "操作成功");
  loadAdmin();
};
window.supplierFeature = async (id, featured) => {
  const j = await jsonFetch("/api/admin-supplier?id=" + id, {
    method: "PATCH",
    body: JSON.stringify({ featured }),
  });
  showToast(j.message || "操作成功");
  loadAdmin();
};
window.supplierDelete = async (id) => {
  if (confirm("确定删除该供应商吗？")) {
    await jsonFetch("/api/admin-supplier?id=" + id, { method: "DELETE" });
    loadAdmin();
  }
};
if (login) loadAdmin();
loadSuppliers();

// V6.0 supplier share and poster
window.shareSupplier = async (raw) => {
  const s = JSON.parse(raw);
  const url =
    location.origin +
    location.pathname +
    "?supplier=" +
    encodeURIComponent(s.id || "");
  const text = `${s.company_name}\n分类：${s.category}\n主营：${s.products || s.description || ""}\n来自中鼎供应链平台`;
  try {
    if (navigator.share)
      await navigator.share({ title: s.company_name, text, url });
    else {
      await navigator.clipboard.writeText(text + "\n" + url);
      showToast("供应商资料已复制");
    }
  } catch (e) {
    if (e.name !== "AbortError") showToast("分享未完成");
  }
};
window.createSupplierPoster = (raw) => {
  const s = JSON.parse(raw);
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1440;
  const c = canvas.getContext("2d");
  const g = c.createLinearGradient(0, 0, 1080, 1440);
  g.addColorStop(0, "#081a31");
  g.addColorStop(1, "#173f68");
  c.fillStyle = g;
  c.fillRect(0, 0, 1080, 1440);
  c.fillStyle = "#caa45e";
  c.fillRect(70, 70, 940, 12);
  c.font = "bold 34px Arial";
  c.fillText("ZIEC SUPPLY CHAIN", 80, 145);
  c.fillStyle = "#fff";
  c.font = "bold 66px Arial";
  wrapCanvas(c, s.company_name, 80, 280, 900, 82);
  c.fillStyle = "#e5c98d";
  c.font = "bold 36px Arial";
  c.fillText(s.category || "企业供应商", 80, 470);
  c.fillStyle = "#fff";
  c.font = "32px Arial";
  wrapCanvas(
    c,
    s.slogan ||
      s.products ||
      s.description ||
      "链接柬埔寨优质供应链，服务企业真实需求",
    80,
    570,
    900,
    52,
  );
  c.fillStyle = "rgba(255,255,255,.12)";
  c.fillRect(70, 900, 940, 280);
  c.fillStyle = "#fff";
  c.font = "30px Arial";
  c.fillText(`城市：${s.city || "柬埔寨"}`, 110, 980);
  c.fillText(`联系人：${s.contact_name || ""}`, 110, 1040);
  c.fillText(`电话：${s.phone || s.whatsapp || ""}`, 110, 1100);
  c.fillStyle = "#caa45e";
  c.font = "bold 30px Arial";
  c.fillText("www.ziechotel.top", 80, 1315);
  c.fillStyle = "#fff";
  c.font = "24px Arial";
  c.fillText("中鼎供应链平台 · 企业资料以平台审核信息为准", 80, 1360);
  const a = document.createElement("a");
  a.download = `${s.company_name || "供应商"}-中鼎供应链海报.png`;
  a.href = canvas.toDataURL("image/png");
  a.click();
  showToast("供应商海报已生成");
};
function wrapCanvas(c, text, x, y, max, line) {
  let row = "",
    yy = y;
  for (const ch of String(text || "")) {
    const test = row + ch;
    if (c.measureText(test).width > max && row) {
      c.fillText(row, x, yy);
      row = ch;
      yy += line;
    } else row = test;
  }
  if (row) c.fillText(row, x, yy);
}

// V6.0 AI customer service
const aiPanel = document.querySelector("#aiPanel"),
  aiMessages = document.querySelector("#aiMessages"),
  aiForm = document.querySelector("#aiForm"),
  aiInput = document.querySelector("#aiInput");
function openAI() {
  if (!aiPanel) return;
  aiPanel.classList.add("open");
  aiPanel.setAttribute("aria-hidden", "false");
  setTimeout(() => aiInput?.focus(), 100);
}
function closeAI() {
  aiPanel?.classList.remove("open");
  aiPanel?.setAttribute("aria-hidden", "true");
}
function aiMessage(text, kind = "bot") {
  const d = document.createElement("div");
  d.className = "ai-message " + kind;
  d.textContent = text;
  aiMessages?.appendChild(d);
  if (aiMessages) aiMessages.scrollTop = aiMessages.scrollHeight;
  return d;
}
document
  .querySelectorAll("[data-ai-open]")
  .forEach((b) => b.addEventListener("click", openAI));
document
  .querySelectorAll("[data-ai-close]")
  .forEach((b) => b.addEventListener("click", closeAI));
document.querySelectorAll("[data-ai-question]").forEach((b) =>
  b.addEventListener("click", () => {
    openAI();
    askAI(b.dataset.aiQuestion);
  }),
);
async function askAI(q) {
  if (!q) return;
  aiMessage(q, "user");
  const wait = aiMessage("正在为您查询…", "bot waiting");
  try {
    const j = await jsonFetch("/api/ai-chat", {
      method: "POST",
      body: JSON.stringify({ message: q }),
    });
    wait.textContent = j.answer || "暂时无法回答，请联系人工客服。";
    wait.classList.remove("waiting");
  } catch (e) {
    wait.textContent = "AI客服暂时繁忙，请联系 WhatsApp：+855 018 995 8899";
    wait.classList.remove("waiting");
  }
}
aiForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const q = aiInput.value.trim();
  if (!q) return;
  aiInput.value = "";
  askAI(q);
});
