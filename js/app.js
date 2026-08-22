/* SimGen asset library — grid, filters, viewer sheet, cart, i18n (EN default). */

// Store / checkout configuration. With provider: null, checkout produces a
// pre-filled quote request email. To take payments, set provider to
// "lemonsqueezy" and map each slug to its hosted checkout URL in products.
const STORE = {
  provider: null,
  quoteEmail: "fishcakewang11@gmail.com",
  products: {},
};

const I18N = {
  en: {
    nav_library: "Library", nav_about: "About", nav_cart: "Cart",
    hero_lede: "SimGen is a fast-growing library of simulation-ready assets — articulated structure, physical parameters, convex collision hulls — built for robot learning, from a single image to a simulatable URDF. Every asset is interactive in the browser: orbit, zoom, and drive the joints.",
    stat_articulated: "articulated assets", stat_categories: "categories", stat_curated: "curated online",
    lib_head: "Curated assets", lib_note: "Open any asset to view it interactively.",
    f_all: "All", f_featured: "Featured", f_articulated: "Articulated", f_rigid: "Rigid",
    search_ph: "search…", empty: "No matching assets",
    about_head: "About the library",
    about_p1: "Articulated assets come from the Sketch2Arti pipeline: part-level geometry reconstructed from a single reference image, recovered joint axes and motion ranges, baked PBR textures — delivered as URDF with per-link meshes and joint limits. Each asset ships with convex-hull collision and a physics report, ready to load into MuJoCo, Isaac and other simulators.",
    about_p2: "Rigid logistics assets cover the parcel-sorting domain — cartons, courier bags, conveyor segments, sort crates — each with mass, friction and other physical parameters. Everything on this page is a compressed glTF; the articulation animation is the URDF joint sweeping between its actual limits.",
    cart_head: "Cart", cart_checkout: "Request quote",
    cart_note: "Submit the list and we will reply with a quote and license terms. Once online payment is enabled, checkout will deliver the full asset package directly.",
    cart_empty: "Your cart is empty — add assets from their detail view.",
    kind_articulated: "ARTICULATED", kind_rigid: "RIGID", featured: "FEATURED",
    overview: "OVERVIEW", joints: "JOINTS", physics: "PHYSICS", files: "FILES",
    k_category: "Category", k_source: "Source", k_dof: "DOF", k_formats: "Formats",
    k_mass: "Mass", k_friction: "Friction", k_restitution: "Restitution",
    k_material: "Material", k_engine: "Engine",
    preview: "Preview GLB", add_cart: "Add to cart", in_cart: "In cart ✓",
    meta_note: "The full asset package (URDF, per-link meshes, collision hulls, physics report) ships via the cart.",
    hint_orbit: "DRAG TO ORBIT · SCROLL TO ZOOM", hint_video: "JOINT SWEEP RENDER",
    joint_label: "JOINT DRIVE", rigid_label: "rigid", dof_suffix: "DOF",
    mail_subject: (n) => `SimGen asset quote request — ${n} item(s)`,
    mail_body: (lines, url) => `Hello,\n\nI would like to purchase the full asset packages (URDF + per-link meshes + collision hulls + physics report) for:\n\n${lines}\n\nPlease reply with a quote and license terms.\n\n— sent from the SimGen asset library ${url}`,
  },
  zh: {
    nav_library: "资产库", nav_about: "关于", nav_cart: "选购清单",
    hero_lede: "SimGen 是一个快速增长的 sim-ready 资产库：铰接结构、物理参数、碰撞凸包——为机器人学习准备的资产，从单张图片到可仿真的 URDF。每一件资产都可以在浏览器里旋转、缩放，铰接资产可以拖动滑杆开合关节。",
    stat_articulated: "铰接资产", stat_categories: "品类", stat_curated: "在线精选",
    lib_head: "精选资产", lib_note: "点开任意一件即可交互查看。",
    f_all: "全部", f_featured: "精选", f_articulated: "铰接", f_rigid: "刚体",
    search_ph: "搜索…", empty: "没有匹配的资产",
    about_head: "关于这套资产",
    about_p1: "铰接资产由 Sketch2Arti 管线生成：从单张参考图重建部件级几何，恢复关节轴与运动范围，再烘焙 PBR 纹理，输出带关节限位的 URDF 与逐链接网格。每件资产附带凸包碰撞体与物理报告，可直接载入 MuJoCo、Isaac 等仿真器。",
    about_p2: "物流刚体资产覆盖包裹分拣场景——纸箱、快递袋、输送段、分拣筐——每件带质量、摩擦等物理参数。网页上的每一件资产都以压缩后的 glTF 呈现，铰接动画即 URDF 关节在真实限位之间的运动。",
    cart_head: "选购清单", cart_checkout: "提交询价",
    cart_note: "提交后我们会通过邮件发送报价与许可条款；在线支付开通后，此处将支持支付后直接下载完整资产包。",
    cart_empty: "清单是空的——在资产详情页点击「加入选购」。",
    kind_articulated: "铰接", kind_rigid: "刚体", featured: "精选",
    overview: "概览", joints: "关节", physics: "物理", files: "文件",
    k_category: "品类", k_source: "来源", k_dof: "自由度", k_formats: "格式",
    k_mass: "质量", k_friction: "摩擦", k_restitution: "恢复系数",
    k_material: "材质", k_engine: "引擎",
    preview: "预览 GLB", add_cart: "加入选购", in_cart: "已在清单 ✓",
    meta_note: "完整资产包（URDF + 逐链接网格 + 碰撞凸包 + 物理报告）通过选购清单获取。",
    hint_orbit: "拖动旋转 · 滚轮缩放", hint_video: "关节演示渲染",
    joint_label: "关节驱动", rigid_label: "刚体", dof_suffix: "DOF",
    mail_subject: (n) => `SimGen 资产询价 — ${n} 件`,
    mail_body: (lines, url) => `您好，\n\n我想购买以下 sim-ready 资产的完整资产包（URDF + 逐链接网格 + 碰撞凸包 + 物理报告）：\n\n${lines}\n\n请回复报价与许可条款。\n\n— 发自 SimGen 资产库 ${url}`,
  },
};

const state = {
  assets: [], filter: "all", query: "", sheetTimer: null, sheetAsset: null,
  lang: localStorage.getItem("simgen-lang") || "en",
};
const t = (key) => I18N[state.lang][key];

const cart = {
  items: JSON.parse(localStorage.getItem("simgen-cart") || "[]"),
  save() { localStorage.setItem("simgen-cart", JSON.stringify(this.items)); },
  has(slug) { return this.items.includes(slug); },
  add(slug) { if (!this.has(slug)) { this.items.push(slug); this.save(); renderCart(); } },
  remove(slug) { this.items = this.items.filter((s) => s !== slug); this.save(); renderCart(); },
};

const grid = document.getElementById("grid");
const empty = document.getElementById("empty");
const overlay = document.getElementById("overlay");
const sheetViewer = document.getElementById("sheet-viewer");
const sheetMeta = document.getElementById("sheet-meta");

init();

async function init() {
  applyLang();
  const res = await fetch("data/assets.json");
  const manifest = await res.json();
  state.assets = manifest.assets;
  document.getElementById("stat-curated").textContent = state.assets.length;
  render();
  renderCart();

  document.getElementById("chips").addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    document.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    state.filter = chip.dataset.filter;
    render();
  });

  document.getElementById("search").addEventListener("input", (e) => {
    state.query = e.target.value.trim().toLowerCase();
    render();
  });

  document.getElementById("lang-toggle").addEventListener("click", (e) => {
    e.preventDefault();
    state.lang = state.lang === "en" ? "zh" : "en";
    localStorage.setItem("simgen-lang", state.lang);
    applyLang();
    render();
    renderCart();
    if (!overlay.hidden && state.sheetAsset) openSheet(state.sheetAsset);
  });

  document.getElementById("sheet-close").addEventListener("click", closeSheet);
  document.getElementById("overlay-backdrop").addEventListener("click", closeSheet);

  const cartOverlay = document.getElementById("cart-overlay");
  document.getElementById("cart-link").addEventListener("click", (e) => {
    e.preventDefault();
    renderCart();
    cartOverlay.hidden = false;
  });
  document.getElementById("cart-close").addEventListener("click", () => { cartOverlay.hidden = true; });
  document.getElementById("cart-backdrop").addEventListener("click", () => { cartOverlay.hidden = true; });
  document.getElementById("cart-checkout").addEventListener("click", checkout);

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (!cartOverlay.hidden) cartOverlay.hidden = true;
    else if (!overlay.hidden) closeSheet();
  });
}

function applyLang() {
  document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const s = I18N[state.lang][el.dataset.i18n];
    if (typeof s === "string") el.textContent = s;
  });
  document.getElementById("search").placeholder = t("search_ph");
  document.getElementById("lang-toggle").textContent = state.lang === "en" ? "中文" : "EN";
}

const aName = (a) => (state.lang === "zh" ? a.name_cn : a.name_en);
const aNameAlt = (a) => (state.lang === "zh" ? a.name_en : a.name_cn);

function matches(a) {
  if (state.filter === "hero" && !a.hero) return false;
  if (state.filter === "articulated" && a.kind !== "articulated") return false;
  if (state.filter === "rigid" && a.kind !== "rigid") return false;
  if (state.query) {
    const hay = `${a.slug} ${a.name_cn} ${a.name_en} ${a.category} ${a.dataset}`.toLowerCase();
    if (!hay.includes(state.query)) return false;
  }
  return true;
}

function render() {
  const list = state.assets.filter(matches);
  empty.hidden = list.length > 0;
  grid.replaceChildren(...list.map(card));
}

function card(a) {
  const el = document.createElement("article");
  el.className = "card" + (a.hero ? " is-hero" : "");
  el.innerHTML = `
    <div class="card-media">
      <img loading="lazy" src="assets/${a.slug}/poster.jpg" alt="${a.name_en}">
      ${a.demo ? `<video muted loop playsinline preload="none" src="assets/${a.slug}/demo.mp4"></video>` : ""}
    </div>
    <div class="card-body">
      <div class="card-name">${aName(a)}</div>
      <div class="card-badges">
        <span class="badge dof">${a.dof ? `${a.dof} ${t("dof_suffix")}` : t("rigid_label")}</span>
        ${a.formats.map((f) => `<span class="badge">${f}</span>`).join("")}
      </div>
    </div>`;
  const video = el.querySelector("video");
  if (video) {
    el.addEventListener("mouseenter", () => {
      video.classList.add("ready");
      video.play().catch(() => {});
    });
    el.addEventListener("mouseleave", () => {
      video.pause();
      video.classList.remove("ready");
    });
  }
  el.addEventListener("click", () => openSheet(a));
  return el;
}

/* ------------------------------------------------------------- the sheet */

function openSheet(a) {
  if (state.sheetTimer) { clearInterval(state.sheetTimer); state.sheetTimer = null; }
  state.sheetAsset = a;
  sheetViewer.replaceChildren();
  sheetMeta.replaceChildren();

  if (a.model) {
    const mv = document.createElement("model-viewer");
    mv.src = `assets/${a.slug}/model.glb`;
    mv.setAttribute("camera-controls", "");
    mv.setAttribute("interaction-prompt", "none");
    mv.setAttribute("shadow-intensity", "0.9");
    mv.setAttribute("shadow-softness", "0.8");
    mv.setAttribute("exposure", "1.05");
    mv.setAttribute("poster", `assets/${a.slug}/poster.jpg`);
    if (a.kind === "articulated") mv.setAttribute("autoplay", "");
    sheetViewer.appendChild(mv);

    const hint = document.createElement("span");
    hint.className = "viewer-hint";
    hint.textContent = t("hint_orbit");
    sheetViewer.appendChild(hint);

    if (a.kind === "articulated") jointBar(mv);
  } else if (a.demo) {
    const video = document.createElement("video");
    video.className = "fallback";
    video.src = `assets/${a.slug}/demo.mp4`;
    video.muted = video.loop = video.autoplay = true;
    video.playsInline = true;
    video.controls = false;
    sheetViewer.appendChild(video);
    const hint = document.createElement("span");
    hint.className = "viewer-hint";
    hint.textContent = t("hint_video");
    sheetViewer.appendChild(hint);
  }

  sheetMeta.innerHTML = metaPanel(a);
  const addBtn = sheetMeta.querySelector(".add-cart");
  if (addBtn) {
    addBtn.classList.toggle("in-cart", cart.has(a.slug));
    addBtn.addEventListener("click", () => {
      cart.add(a.slug);
      addBtn.textContent = t("in_cart");
      addBtn.classList.add("in-cart");
    });
  }
  overlay.hidden = false;
  document.body.style.overflow = "hidden";
}

function jointBar(mv) {
  const bar = document.createElement("div");
  bar.className = "joint-bar";
  bar.innerHTML = `
    <button class="joint-play" title="play / pause">❚❚</button>
    <input class="joint-slider" type="range" min="0" max="1000" value="0">
    <span class="joint-label">${t("joint_label")}</span>`;
  sheetViewer.appendChild(bar);

  const play = bar.querySelector(".joint-play");
  const slider = bar.querySelector(".joint-slider");
  let scrubbing = false;

  mv.addEventListener("load", () => mv.play?.());

  play.addEventListener("click", () => {
    if (mv.paused) { mv.play(); play.textContent = "❚❚"; }
    else { mv.pause(); play.textContent = "▶"; }
  });

  slider.addEventListener("input", () => {
    scrubbing = true;
    mv.pause();
    play.textContent = "▶";
    const d = mv.duration || 0;
    // animation runs closed -> open -> closed; the slider drives the opening half
    mv.currentTime = (slider.value / 1000) * (d / 2);
    scrubbing = false;
  });

  state.sheetTimer = setInterval(() => {
    if (scrubbing || mv.paused || !mv.duration) return;
    const time = mv.currentTime % mv.duration;
    const half = mv.duration / 2;
    const frac = time <= half ? time / half : (mv.duration - time) / half;
    slider.value = Math.round(frac * 1000);
  }, 120);
}

function metaPanel(a) {
  const phys = a.physics || {};
  const kv = (k, v) => `<div class="meta-kv"><span class="k">${k}</span><span class="v">${v}</span></div>`;
  const joints = (a.joints || [])
    .map((j) => {
      const range = j.lower != null && j.upper != null && j.type !== "continuous"
        ? (j.type === "prismatic"
            ? `${(j.upper - j.lower).toFixed(2)} m`
            : `${Math.round((j.upper - j.lower) * 180 / Math.PI)}°`)
        : "∞";
      return `<div class="joint-row"><span class="jt">${j.type}</span><span>${range}</span></div>`;
    })
    .join("");

  return `
    <div class="meta-kind">${a.hero ? t("featured") + " · " : ""}${a.kind === "articulated" ? t("kind_articulated") : t("kind_rigid")}</div>
    <div class="meta-name">${aName(a)}</div>
    <div class="meta-name-en">${aNameAlt(a)}</div>

    <div class="meta-section">
      <h4>${t("overview")}</h4>
      ${kv(t("k_category"), a.category)}
      ${kv(t("k_source"), a.dataset)}
      ${kv(t("k_dof"), a.dof || t("rigid_label"))}
      ${kv(t("k_formats"), a.formats.join(" · "))}
    </div>

    ${joints ? `<div class="meta-section"><h4>${t("joints")}</h4>${joints}</div>` : ""}

    ${Object.keys(phys).length ? `<div class="meta-section"><h4>${t("physics")}</h4>
      ${phys.mass != null ? kv(t("k_mass"), `${Number(phys.mass).toFixed(2)} kg`) : ""}
      ${phys.friction != null ? kv(t("k_friction"), Number(phys.friction).toFixed(2)) : ""}
      ${phys.restitution != null ? kv(t("k_restitution"), Number(phys.restitution).toFixed(2)) : ""}
      ${phys.material ? kv(t("k_material"), String(phys.material).replace(/_/g, " ")) : ""}
      ${phys.engine ? kv(t("k_engine"), phys.engine) : ""}
    </div>` : ""}

    <div class="meta-section">
      <h4>${t("files")}</h4>
      ${a.model ? `<a class="dl" href="assets/${a.slug}/model.glb" download="${a.slug}.glb">${t("preview")}</a>` : ""}
      <button class="add-cart" data-slug="${a.slug}">${cart.has(a.slug) ? t("in_cart") : t("add_cart")}</button>
      <p class="meta-note">${t("meta_note")}</p>
    </div>`;
}

function closeSheet() {
  overlay.hidden = true;
  document.body.style.overflow = "";
  sheetViewer.replaceChildren();
  state.sheetAsset = null;
  if (state.sheetTimer) { clearInterval(state.sheetTimer); state.sheetTimer = null; }
}

/* ------------------------------------------------------------------ cart */

function renderCart() {
  document.getElementById("cart-count").textContent = cart.items.length;
  const box = document.getElementById("cart-items");
  if (!box) return;
  if (!cart.items.length) {
    box.innerHTML = `<p class="cart-empty">${t("cart_empty")}</p>`;
  } else {
    box.replaceChildren(...cart.items.map((slug) => {
      const a = state.assets.find((x) => x.slug === slug);
      const el = document.createElement("div");
      el.className = "cart-item";
      el.innerHTML = `
        <div>
          <div class="ci-name"><b>${a ? aName(a) : slug}</b><span>${a ? aNameAlt(a) : ""}</span></div>
          <div class="ci-meta">${slug}${a ? ` · ${a.dof ? a.dof + " " + t("dof_suffix") : t("rigid_label")} · ${a.formats.join("/")}` : ""}</div>
        </div>
        <button class="ci-remove" title="remove">×</button>`;
      el.querySelector(".ci-remove").addEventListener("click", () => cart.remove(slug));
      return el;
    }));
  }
  document.getElementById("cart-checkout").disabled = !cart.items.length;
}

function checkout() {
  if (!cart.items.length) return;
  if (STORE.provider === "lemonsqueezy") {
    const url = STORE.products[cart.items[0]];
    if (url) { window.open(url, "_blank"); return; }
  }
  const lines = cart.items.map((slug) => {
    const a = state.assets.find((x) => x.slug === slug);
    return `- ${a ? `${a.name_en} / ${a.name_cn}` : slug} (${slug})`;
  }).join("\n");
  const subject = encodeURIComponent(I18N[state.lang].mail_subject(cart.items.length));
  const body = encodeURIComponent(
    I18N[state.lang].mail_body(lines, `${location.origin}${location.pathname}`));
  location.href = `mailto:${STORE.quoteEmail}?subject=${subject}&body=${body}`;
}
