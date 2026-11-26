/* Esküvői meghívó – interakciók (natív JS, nincs függőség) */
(() => {
  "use strict";

  const root = document.documentElement;
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ---------------- Boríték-intró ---------------- */
  function finishIntro() {
    if (root.classList.contains("intro-done")) return;
    root.classList.add("intro-done");
    try { sessionStorage.setItem("intro-seen", "1"); } catch { /* privát mód */ }
    const intro = $("#intro");
    setTimeout(() => intro?.remove(), 1000);
  }

  function setupIntro() {
    const intro = $("#intro");
    if (!root.classList.contains("show-intro") || !intro) {
      intro?.remove();
      return;
    }
    const seal = $("#open-envelope");
    const skip = $("#skip-intro");
    intro.removeAttribute("aria-hidden");
    intro.setAttribute("role", "dialog");
    intro.setAttribute("aria-label", "Meghívó boríték");
    seal.tabIndex = 0;
    skip.tabIndex = 0;
    seal.focus({ preventScroll: true });

    const open = () => {
      if (intro.classList.contains("is-opening")) return;
      intro.classList.add("is-opening");
      setTimeout(finishIntro, 1700);
    };
    intro.addEventListener("click", (e) => { if (e.target !== skip) open(); });
    seal.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
    skip.addEventListener("click", finishIntro);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") finishIntro(); }, { once: true });
  }

  /* ---------------- Visszaszámláló ---------------- */
  function setupCountdown() {
    const box = $("#countdown");
    if (!box) return;
    const target = new Date(box.dataset.target).getTime();
    const els = Object.fromEntries($$("[data-unit]", box).map((el) => [el.dataset.unit, el]));
    const pad = (n) => String(n).padStart(2, "0");
    let timer;

    const render = () => {
      let diff = Math.max(0, target - Date.now());
      const values = {
        days: Math.floor(diff / 864e5),
        hours: Math.floor((diff % 864e5) / 36e5),
        minutes: Math.floor((diff % 36e5) / 6e4),
        seconds: Math.floor((diff % 6e4) / 1e3),
      };
      for (const [unit, el] of Object.entries(els)) {
        const next = unit === "days" ? String(values[unit]) : pad(values[unit]);
        if (el.textContent !== next) {
          el.textContent = next;
          if (!reducedMotion) {
            el.classList.remove("tick");
            void el.offsetWidth; // animáció újraindítása
            el.classList.add("tick");
          }
        }
      }
      if (diff === 0) {
        clearInterval(timer);
        $("#countdown-done").hidden = false;
      }
    };
    render();
    timer = setInterval(render, 1000);
  }

  /* ---------------- Görgetésre megjelenés ---------------- */
  function setupReveal() {
    const items = $$(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    // testvérek kis késleltetéssel jönnek egymás után
    items.forEach((el) => {
      const siblings = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
      el.style.setProperty("--rd", `${Math.min(siblings.indexOf(el), 5) * 110}ms`);
    });
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      }
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.12 });
    items.forEach((el) => io.observe(el));
  }

  /* ---------------- Felső sáv ---------------- */
  function setupTopbar() {
    const bar = $("#topbar");
    if (!bar) return;
    let lastY = scrollY;
    const onScroll = () => {
      const y = scrollY;
      bar.classList.toggle("is-scrolled", y > 30);
      bar.classList.toggle("is-hidden", y > 400 && y > lastY + 4);
      if (y < lastY - 4 || y < 400) bar.classList.remove("is-hidden");
      lastY = y;
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // aktív menüpont
    const links = $$(".topbar__nav a[href^='#']");
    const sections = links.map((a) => $(a.getAttribute("href"))).filter(Boolean);
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${entry.target.id}`));
        }
      }
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => io.observe(s));
  }

  /* ---------------- 3D döntés a kártyákon ---------------- */
  function setupTilt() {
    if (!finePointer || reducedMotion) return;
    for (const card of $$(".tilt")) {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        card.style.setProperty("--ry", `${(x - 0.5) * 10}deg`);
        card.style.setProperty("--rx", `${(0.5 - y) * 8}deg`);
        card.style.setProperty("--mx", `${x * 100}%`);
        card.style.setProperty("--my", `${y * 100}%`);
      });
      card.addEventListener("pointerleave", () => {
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
      });
    }
  }

  /* ---------------- Cím másolása ---------------- */
  function toast(msg) {
    const t = $("#toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("is-shown");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => t.classList.remove("is-shown"), 2200);
  }

  function setupCopy() {
    for (const btn of $$(".copy")) {
      btn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(btn.dataset.copy);
          toast("Cím a vágólapon ✓");
        } catch {
          toast(btn.dataset.copy);
        }
      });
    }
  }

  /* ---------------- Aranypor / hó ---------------- */
  function setupSnow() {
    const canvas = $("#snow");
    if (!canvas || reducedMotion) return;
    const ctx = canvas.getContext("2d");
    const colors = ["179,139,89", "217,188,143", "236,211,198", "255,255,255"];
    let w, h, dpr, flakes = [], raf, running = true;

    const make = (initial) => ({
      x: Math.random() * w,
      y: initial ? Math.random() * h : -10,
      r: Math.random() * 2.4 + 0.8,
      vy: Math.random() * 0.45 + 0.25,
      vx: Math.random() * 0.3 - 0.15,
      phase: Math.random() * Math.PI * 2,
      a: Math.random() * 0.45 + 0.25,
      c: colors[(Math.random() * colors.length) | 0],
      star: Math.random() < 0.18,
    });

    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = innerWidth; h = innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(70, (w * h) / 22000));
      flakes = Array.from({ length: count }, () => make(true));
    };

    const drawStar = (f) => {
      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(f.phase);
      ctx.strokeStyle = `rgba(${f.c},${f.a})`;
      ctx.lineWidth = 0.9;
      ctx.beginPath();
      for (let i = 0; i < 3; i++) {
        ctx.rotate(Math.PI / 3);
        ctx.moveTo(-f.r * 2.4, 0);
        ctx.lineTo(f.r * 2.4, 0);
      }
      ctx.stroke();
      ctx.restore();
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const f of flakes) {
        f.phase += 0.01;
        f.y += f.vy;
        f.x += f.vx + Math.sin(f.phase) * 0.3;
        if (f.y > h + 10 || f.x < -20 || f.x > w + 20) Object.assign(f, make(false));
        if (f.star) drawStar(f);
        else {
          ctx.beginPath();
          ctx.fillStyle = `rgba(${f.c},${f.a})`;
          ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      if (running) raf = requestAnimationFrame(tick);
    };

    resize();
    addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", () => {
      running = !document.hidden;
      cancelAnimationFrame(raf);
      if (running) raf = requestAnimationFrame(tick);
    });
    raf = requestAnimationFrame(tick);
  }

  /* ---------------- Indítás ---------------- */
  setupIntro();
  setupCountdown();
  setupReveal();
  setupTopbar();
  setupTilt();
  setupCopy();
  setupSnow();
})();
