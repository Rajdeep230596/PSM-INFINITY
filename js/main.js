const headerHTML = `
  <div class="nav-wrap">
    <a class="logo" href="index.html" aria-label="PSM Infinity home">
      <svg class="logo-mark" viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="30" fill="#2c1c14"/>
        <circle cx="32" cy="32" r="24" fill="none" stroke="#e6d5bc" stroke-width="1.4"/>
        <path d="M18 32c0-5.5 4.5-10 10-10 3.8 0 6.6 1.8 10 5.2C41.4 23.8 44.2 22 48 22c5.5 0 10 4.5 10 10s-4.5 10-10 10c-3.8 0-6.6-1.8-10-5.2C34.6 40.2 31.8 42 28 42c-5.5 0-10-4.5-10-10z" fill="#a66b45"/>
      </svg>
      <span class="logo-text">
        <strong>PSM</strong>
        <span>Infinity</span>
      </span>
    </a>
    <nav>
      <ul class="nav-links" id="navLinks">
        <li><a href="index.html">Home</a></li>
        <li><a href="services.html">Services</a></li>
        <li><a href="locations.html">Locations</a></li>
        <li><a href="about.html">Our Story</a></li>
        <li><a href="partner.html">Partner</a></li>
      </ul>
    </nav>
    <a class="btn btn-primary nav-cta" href="locations.html">Get in touch</a>
    <button class="menu-toggle" id="menuToggle" aria-label="Open menu">
      <span></span><span></span><span></span>
    </button>
  </div>
`;

const footerHTML = `
  <div class="container">
    <div class="footer-grid">
      <div>
        <h3>PSM Infinity</h3>
        <p>A Kolkata studio for personalised branding, corporate identity, technology, textile, and logistics — composed as one visual experience.</p>
      </div>
      <div>
        <h4>Visit</h4>
        <ul>
          <li><a href="services.html">Services</a></li>
          <li><a href="locations.html">Locations</a></li>
          <li><a href="about.html">Our story</a></li>
        </ul>
      </div>
      <div>
        <h4>Partner</h4>
        <ul>
          <li><a href="partner.html">Work with the studio</a></li>
          <li><a href="partner.html#enquire">Enquire</a></li>
        </ul>
      </div>
      <div>
        <h4>Hours</h4>
        <p>Mon–Sat<br>10:00 am – 8:00 pm</p>
        <p><a href="tel:+919007331000">090073 31000</a><br>hello@psminfinity.com</p>
      </div>
    </div>
    <div class="copyright">
      <span>© ${new Date().getFullYear()} PSM Infinity. All rights reserved.</span>
      <span>Branding · Technology · Textile · Logistics</span>
    </div>
  </div>
`;

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");
  if (header) {
    header.classList.add("site-header");
    header.innerHTML = headerHTML;
  }
  if (footer) {
    footer.classList.add("site-footer");
    footer.innerHTML = footerHTML;
  }

  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((link) => {
    if (link.getAttribute("href") === page) link.classList.add("active");
  });

  const toggle = document.getElementById("menuToggle");
  const links = document.getElementById("navLinks");
  toggle?.addEventListener("click", () => links?.classList.toggle("open"));

  let headerScrollQueued = false;
  window.addEventListener("scroll", () => {
    if (headerScrollQueued) return;
    headerScrollQueued = true;
    requestAnimationFrame(() => {
      headerScrollQueued = false;
      header?.classList.toggle("scrolled", window.scrollY > 12);
    });
  }, { passive: true });

  const filterButtons = document.querySelectorAll("[data-filter]");
  const menuItems = document.querySelectorAll("[data-category]");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const value = btn.dataset.filter;
      menuItems.forEach((item) => {
        item.classList.toggle("hidden", value !== "all" && item.dataset.category !== value);
      });
    });
  });

  const search = document.getElementById("locationSearch");
  const cards = document.querySelectorAll(".location-card");
  search?.addEventListener("input", () => {
    const q = search.value.toLowerCase().trim();
    cards.forEach((card) => {
      const hay = card.textContent.toLowerCase();
      card.classList.toggle("hidden", Boolean(q) && !hay.includes(q));
    });
  });

  const form = document.getElementById("franchiseForm");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const note = document.getElementById("formNote");
    if (note) {
      note.style.display = "block";
      note.textContent = "Thank you. The studio will reach out within two business days.";
    }
    form.reset();
  });

  initHeroScrolly();
  initBackdropScrolly();
  initPizzaOrbit();
});

function initHeroScrolly() {
  const section = document.getElementById("heroScrolly");
  const video = document.getElementById("heroVideo");
  const lines = [...document.querySelectorAll(".hero-line")];
  if (!section || !video) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.defaultPlaybackRate = 1;
  video.playbackRate = 1;
  video.loop = false;
  video.preload = "auto";
  video.disablePictureInPicture = true;

  if (reduceMotion) {
    lines.forEach((line) => line.classList.add("is-in"));
    video.play().catch(() => {});
    return;
  }

  let duration = 0;
  let targetTime = 0;
  let seeking = false;
  let queued = false;
  let inView = true;
  let lastProgress = -1;
  let lastLineMask = -1;
  const lineAt = lines.map((line) => Number(line.dataset.at || 0));
  const frameStep = 1 / 24;

  const endTime = () => Math.max(0, duration - frameStep);

  const unlockSeek = () => {
    const play = video.play();
    if (play && typeof play.then === "function") {
      play.then(() => {
        video.pause();
        schedule();
      }).catch(() => {});
    } else {
      video.pause();
    }
  };

  const progressFromScroll = () => {
    const rect = section.getBoundingClientRect();
    const scrollable = Math.max(1, section.offsetHeight - window.innerHeight);
    return Math.min(1, Math.max(0, -rect.top / scrollable));
  };

  let seekWatch = 0;

  const seekToTarget = () => {
    if (seeking || duration <= 0 || !inView) return;
    if (Math.abs(video.currentTime - targetTime) < frameStep) return;
    seeking = true;
    video.pause();
    try {
      if (typeof video.fastSeek === "function") video.fastSeek(targetTime);
      else video.currentTime = targetTime;
    } catch {
      video.currentTime = targetTime;
    }
    window.clearTimeout(seekWatch);
    seekWatch = window.setTimeout(() => {
      seeking = false;
    }, 140);
  };

  const render = () => {
    queued = false;
    if (!inView) return;

    const progress = progressFromScroll();
    if (Math.abs(progress - lastProgress) < 0.0008) {
      seekToTarget();
      return;
    }
    lastProgress = progress;

    section.style.setProperty("--hero-scale", (1.08 - progress * 0.08).toFixed(4));
    const scrolled = progress > 0.04;
    if (section.classList.contains("is-scrolled") !== scrolled) {
      section.classList.toggle("is-scrolled", scrolled);
    }

    let mask = 0;
    for (let i = 0; i < lineAt.length; i += 1) {
      if (progress >= lineAt[i]) mask |= 1 << i;
    }
    if (mask !== lastLineMask) {
      lastLineMask = mask;
      lines.forEach((line, i) => {
        line.classList.toggle("is-in", Boolean(mask & (1 << i)));
      });
    }

    if (duration > 0) {
      targetTime = progress >= 0.995 ? endTime() : progress * endTime();
      seekToTarget();
    }
  };

  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(render);
  };

  video.addEventListener("loadedmetadata", () => {
    duration = video.duration || 0;
    schedule();
  });
  if (video.readyState >= 1) duration = video.duration || 0;

  video.addEventListener("loadeddata", unlockSeek, { once: true });
  document.addEventListener("touchstart", unlockSeek, { once: true, passive: true });
  document.addEventListener("click", unlockSeek, { once: true });

  video.addEventListener("seeked", () => {
    window.clearTimeout(seekWatch);
    seeking = false;
    if (Math.abs(video.currentTime - targetTime) >= frameStep) seekToTarget();
  });

  const observer = new IntersectionObserver(
    (entries) => {
      inView = entries.some((entry) => entry.isIntersecting);
      if (inView) schedule();
    },
    { threshold: 0 }
  );
  observer.observe(section);

  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  schedule();
}

function mountPageBackdrop() {
  if (document.getElementById("backdropVideo")) return;
  const wrap = document.createElement("div");
  wrap.className = "page-backdrop";
  wrap.id = "pageBackdrop";
  wrap.setAttribute("aria-hidden", "true");
  wrap.innerHTML = `
    <img src="assets/backdrop-poster.jpg" alt="">
    <video id="backdropVideo" muted playsinline preload="auto" poster="assets/backdrop-poster.jpg">
      <source src="assets/backdrop.mp4" type="video/mp4">
    </video>
    <div class="page-backdrop-wash"></div>
  `;
  document.body.prepend(wrap);
}

function initBackdropScrolly() {
  mountPageBackdrop();
  const video = document.getElementById("backdropVideo");
  const hero = document.getElementById("heroScrolly");
  if (!video) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.loop = false;
  video.preload = "auto";
  video.disablePictureInPicture = true;

  if (reduceMotion) {
    video.pause();
    return;
  }

  let duration = 0;
  let targetTime = 0;
  let seeking = false;
  let queued = false;
  const frameStep = 1 / 24;
  const endTime = () => Math.max(0, duration - frameStep);

  const unlockSeek = () => {
    const play = video.play();
    if (play && typeof play.then === "function") {
      play.then(() => {
        video.pause();
        schedule();
      }).catch(() => {});
    } else {
      video.pause();
    }
  };

  const progressFromScroll = () => {
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const start = hero ? Math.max(0, hero.offsetHeight - window.innerHeight) : 0;
    const range = Math.max(1, maxScroll - start);
    return Math.min(1, Math.max(0, (window.scrollY - start) / range));
  };

  let seekWatch = 0;

  const seekToTarget = () => {
    if (seeking || duration <= 0) return;
    if (Math.abs(video.currentTime - targetTime) < frameStep) return;
    seeking = true;
    video.pause();
    try {
      if (typeof video.fastSeek === "function") video.fastSeek(targetTime);
      else video.currentTime = targetTime;
    } catch {
      video.currentTime = targetTime;
    }
    window.clearTimeout(seekWatch);
    seekWatch = window.setTimeout(() => {
      seeking = false;
    }, 140);
  };

  const render = () => {
    queued = false;
    const progress = progressFromScroll();
    if (duration > 0) {
      targetTime = progress >= 0.995 ? endTime() : progress * endTime();
      seekToTarget();
    }
  };

  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(render);
  };

  video.addEventListener("loadedmetadata", () => {
    duration = video.duration || 0;
    schedule();
  });
  if (video.readyState >= 1) duration = video.duration || 0;

  video.addEventListener("loadeddata", unlockSeek, { once: true });
  document.addEventListener("touchstart", unlockSeek, { once: true, passive: true });
  document.addEventListener("click", unlockSeek, { once: true });

  video.addEventListener("seeked", () => {
    window.clearTimeout(seekWatch);
    seeking = false;
    if (Math.abs(video.currentTime - targetTime) >= frameStep) seekToTarget();
  });

  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  schedule();
}

function initPizzaOrbit() {
  const root = document.getElementById("pizzaOrbit");
  if (!root) return;

  const ring = root.querySelector(".orbit-ring");
  const items = [...root.querySelectorAll(".orbit-pizza")];
  const nameEl = root.querySelector("[data-orbit-name]");
  const tagEl = root.querySelector("[data-orbit-tag]");
  const metaEl = root.querySelector("[data-orbit-meta]");
  const descEl = root.querySelector("[data-orbit-desc]");
  const count = items.length;
  let index = 0;
  let rotation = 0;
  let busy = false;
  let timer;

  const apply = () => {
    ring.style.setProperty("--rot", `${rotation}deg`);
    items.forEach((item, i) => {
      const angle = ((i * 90 + rotation) % 360 + 360) % 360;
      item.classList.toggle("is-active", angle === 0);
    });
    const active = items[index];
    if (nameEl) nameEl.textContent = active.dataset.name || "";
    if (tagEl) tagEl.textContent = active.dataset.tag || "";
    if (metaEl) metaEl.textContent = active.dataset.price || "";
    if (descEl) descEl.textContent = active.dataset.desc || "";
  };

  const goTo = (nextIndex) => {
    if (busy || nextIndex === index) return;
    const forward = (nextIndex - index + count) % count;
    const backward = (index - nextIndex + count) % count;
    rotation += forward <= backward ? forward * -90 : backward * 90;
    index = nextIndex;
    busy = true;
    apply();
    window.setTimeout(() => {
      busy = false;
    }, 900);
  };

  const step = (dir) => goTo((index + dir + count) % count);

  root.querySelector("[data-orbit-prev]")?.addEventListener("click", () => step(-1));
  root.querySelector("[data-orbit-next]")?.addEventListener("click", () => step(1));
  items.forEach((item, i) => item.addEventListener("click", () => goTo(i)));

  const startAuto = () => {
    stopAuto();
    timer = window.setInterval(() => step(1), 4800);
  };
  const stopAuto = () => {
    if (timer) window.clearInterval(timer);
    timer = null;
  };

  root.addEventListener("mouseenter", stopAuto);
  root.addEventListener("mouseleave", startAuto);
  root.addEventListener("focusin", stopAuto);
  root.addEventListener("focusout", startAuto);

  apply();
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) startAuto();
}

function initPizzaCustomizer() {
  const board = document.getElementById("customizerBoard");
  const pizza = document.getElementById("customPizza");
  const layers = document.getElementById("customLayers");
  if (!board || !pizza || !layers) return;

  const chips = [...board.querySelectorAll(".topping-chip")];
  const priceEl = document.getElementById("customPrice");
  const nameEl = document.getElementById("customName");
  const listEl = document.getElementById("customList");
  const selected = new Set();
  const section = board.closest(".customizer") || board;

  const layoutArcs = () => {
    const sectionBox = section.getBoundingClientRect();
    const pizzaBox = pizza.getBoundingClientRect();
    const chipSize = chips[0]?.offsetWidth || 56;
    const pizzaR = pizzaBox.width / 2;
    const pad = Math.max(18, chipSize * 0.6);
    let innerR = pizzaR + chipSize * 0.55 + 12;
    let outerR = innerR + chipSize + 22;

    const minX = chipSize + 88;
    const maxRadius = Math.max(pizzaR + chipSize * 0.45, sectionBox.width - minX);
    if (outerR > maxRadius) {
      outerR = maxRadius;
      innerR = Math.max(pizzaR + chipSize * 0.45, outerR - chipSize - 16);
    }

    const maxY = sectionBox.height / 2 - pad;
    const spreadFor = (radius) => {
      const ratio = Math.min(0.85, Math.max(0.12, maxY / radius));
      return Math.asin(ratio) * (180 / Math.PI);
    };

    const innerSpread = Math.min(20, spreadFor(innerR) * 0.7);
    const outerSpread = Math.min(30, spreadFor(outerR) * 0.86);
    const inner = chips.filter((chip) => chip.dataset.arc === "inner");
    const outer = chips.filter((chip) => chip.dataset.arc === "outer");
    const s = Math.max(innerSpread, outerSpread * 0.92);

    const zipper = [
      { chip: outer[0], radius: outerR, angle: 180 - s },
      { chip: inner[0], radius: innerR, angle: 180 - s * 0.6 },
      { chip: outer[1], radius: outerR, angle: 180 - s * 0.2 },
      { chip: inner[1], radius: innerR, angle: 180 + s * 0.2 },
      { chip: outer[2], radius: outerR, angle: 180 + s * 0.6 },
      { chip: inner[2], radius: innerR, angle: 180 + s },
    ];

    zipper.forEach((item) => {
      if (!item.chip) return;
      item.chip.style.setProperty("--radius", `${item.radius}px`);
      item.chip.style.setProperty("--angle", `${item.angle}deg`);
    });
  };

  const updateMeta = () => {
    const names = [];
    chips.forEach((chip) => {
      if (!selected.has(chip.dataset.id)) return;
      names.push(chip.dataset.name);
    });
    if (priceEl) priceEl.textContent = names.length ? `${names.length} module${names.length === 1 ? "" : "s"}` : "Open brief";
    if (nameEl) nameEl.textContent = names.length ? names.join(" · ") : "Your brief";
    if (listEl) {
      listEl.innerHTML = names.length
        ? names.map((name) => `<li>+ ${name}</li>`).join("")
        : "<li>Studio conversation</li>";
    }
  };

  const placePieces = (chip) => {
    const count = 5;
    for (let i = 0; i < count; i += 1) {
      const piece = document.createElement("img");
      piece.src = chip.dataset.img;
      piece.alt = "";
      piece.className = "topping-piece";
      piece.dataset.id = chip.dataset.id;
      const angle = Math.PI * 0.55 + (Math.PI * 0.9 * i) / count + Math.random() * 0.2;
      const radius = 18 + Math.random() * 22;
      piece.style.left = `${50 + Math.cos(angle) * radius}%`;
      piece.style.top = `${50 + Math.sin(angle) * radius}%`;
      piece.style.setProperty("--spin", `${-20 + Math.random() * 40}deg`);
      piece.style.animationDelay = `${i * 55}ms`;
      layers.appendChild(piece);
    }
  };

  const flyFromChip = (chip) => {
    const thumb = chip.querySelector("img");
    const pizzaBox = pizza.getBoundingClientRect();
    const start = thumb.getBoundingClientRect();
    const cx = pizzaBox.left + pizzaBox.width * 0.25;
    const cy = pizzaBox.top + pizzaBox.height / 2;

    for (let i = 0; i < 4; i += 1) {
      const fly = thumb.cloneNode(true);
      fly.className = "topping-fly";
      fly.style.left = `${start.left}px`;
      fly.style.top = `${start.top}px`;
      fly.style.width = `${start.width}px`;
      fly.style.height = `${start.height}px`;
      document.body.appendChild(fly);

      const angle = Math.random() * Math.PI * 2;
      const radius = pizzaBox.width * (0.1 + Math.random() * 0.26);
      const destX = cx + Math.cos(angle) * radius - start.width / 2;
      const destY = cy + Math.sin(angle) * radius - start.height / 2;

      requestAnimationFrame(() => {
        fly.style.transform = `translate(${destX - start.left}px, ${destY - start.top}px) scale(0.45)`;
        fly.style.opacity = "0.15";
      });

      window.setTimeout(() => fly.remove(), 520);
    }

    window.setTimeout(() => placePieces(chip), 280);
  };

  const removePieces = (id) => {
    layers.querySelectorAll(`[data-id="${id}"]`).forEach((piece) => {
      piece.classList.add("is-out");
      window.setTimeout(() => piece.remove(), 360);
    });
  };

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const id = chip.dataset.id;
      if (selected.has(id)) {
        selected.delete(id);
        chip.classList.remove("is-on");
        removePieces(id);
      } else {
        selected.add(id);
        chip.classList.add("is-on");
        flyFromChip(chip);
      }
      updateMeta();
    });
  });

  layoutArcs();
  window.addEventListener("resize", layoutArcs);
  if (typeof ResizeObserver !== "undefined") {
    new ResizeObserver(layoutArcs).observe(section);
  }

  updateMeta();
}
