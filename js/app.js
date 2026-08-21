/* SimGen asset library — grid, filters, and the interactive viewer sheet. */

const state = { assets: [], filter: "all", query: "", sheetTimer: null };

const grid = document.getElementById("grid");
const empty = document.getElementById("empty");
const overlay = document.getElementById("overlay");
const sheetViewer = document.getElementById("sheet-viewer");
const sheetMeta = document.getElementById("sheet-meta");

init();

async function init() {
  const res = await fetch("data/assets.json");
  const manifest = await res.json();
  state.assets = manifest.assets;
  document.getElementById("stat-curated").textContent = state.assets.length;
  render();

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

  document.getElementById("sheet-close").addEventListener("click", closeSheet);
  document.getElementById("overlay-backdrop").addEventListener("click", closeSheet);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !overlay.hidden) closeSheet();
  });
}

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
  el.className = "card";
  el.innerHTML = `
    <div class="card-media">
      <img loading="lazy" src="assets/${a.slug}/poster.jpg" alt="${a.name_en}">
      ${a.demo ? `<video muted loop playsinline preload="none" src="assets/${a.slug}/demo.mp4"></video>` : ""}
      <span class="card-tag ${a.hero ? "is-hero" : ""}">${a.hero ? "FEATURED" : a.kind === "articulated" ? "ARTICULATED" : "RIGID"}</span>
    </div>
    <div class="card-body">
      <div class="card-name">${a.name_cn}</div>
      <div class="card-name-en">${a.name_en}</div>
      <div class="card-badges">
        ${a.dof ? `<span class="badge dof">${a.dof} DOF</span>` : ""}
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
    hint.textContent = "DRAG TO ORBIT · SCROLL TO ZOOM";
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
    hint.textContent = "JOINT SWEEP RENDER";
    sheetViewer.appendChild(hint);
  }

  sheetMeta.innerHTML = metaPanel(a);
  overlay.hidden = false;
  document.body.style.overflow = "hidden";
}

function jointBar(mv) {
  const bar = document.createElement("div");
  bar.className = "joint-bar";
  bar.innerHTML = `
    <button class="joint-play" title="play / pause">❚❚</button>
    <input class="joint-slider" type="range" min="0" max="1000" value="0">
    <span class="joint-label">关节 JOINT DRIVE</span>`;
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
    const t = mv.currentTime % mv.duration;
    const half = mv.duration / 2;
    const frac = t <= half ? t / half : (mv.duration - t) / half;
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
    <div class="meta-kind">${a.hero ? "FEATURED · " : ""}${a.kind.toUpperCase()}</div>
    <div class="meta-name">${a.name_cn}</div>
    <div class="meta-name-en">${a.name_en}</div>

    <div class="meta-section">
      <h4>OVERVIEW</h4>
      ${kv("品类 Category", a.category)}
      ${kv("来源 Source", a.dataset)}
      ${kv("自由度 DOF", a.dof || "rigid")}
      ${kv("格式 Formats", a.formats.join(" · "))}
    </div>

    ${joints ? `<div class="meta-section"><h4>JOINTS</h4>${joints}</div>` : ""}

    ${Object.keys(phys).length ? `<div class="meta-section"><h4>PHYSICS</h4>
      ${phys.mass != null ? kv("质量 Mass", `${Number(phys.mass).toFixed(2)} kg`) : ""}
      ${phys.friction != null ? kv("摩擦 Friction", Number(phys.friction).toFixed(2)) : ""}
      ${phys.restitution != null ? kv("恢复系数 Restitution", Number(phys.restitution).toFixed(2)) : ""}
      ${phys.material ? kv("材质 Material", String(phys.material).replace(/_/g, " ")) : ""}
      ${phys.engine ? kv("引擎 Engine", phys.engine) : ""}
    </div>` : ""}

    <div class="meta-section">
      <h4>FILES</h4>
      ${a.model ? `<a class="dl" href="assets/${a.slug}/model.glb" download="${a.slug}.glb">下载 GLB · Download</a>` : ""}
      <p class="meta-note">URDF 与逐链接网格、碰撞凸包、物理报告随完整资产包交付。<br>
      URDF, per-link meshes, collision hulls and physics reports ship with the full asset package.</p>
    </div>`;
}

function closeSheet() {
  overlay.hidden = true;
  document.body.style.overflow = "";
  sheetViewer.replaceChildren();
  if (state.sheetTimer) { clearInterval(state.sheetTimer); state.sheetTimer = null; }
}
