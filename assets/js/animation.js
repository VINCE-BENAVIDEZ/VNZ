
/* =========================================================
   ANIMATION — Sapsappy following only orbit-a and orbit-b
   Standalone file
   ========================================================= */
(function sapsappyOrbit() {
  const FISH_SRC = "assets/img/sapsappy.png";
  const FISH_WIDTH = 92;
  const LAP_MS = 9000;
  const BLEND = 0.16;

  const heroArt = document.querySelector(".hero-art");

  // Only use these two orbits. Ignore all others.
  const rings = [
    heroArt?.querySelector(".orbit-a"),
    heroArt?.querySelector(".orbit-b")
  ].filter(Boolean);

  if (!heroArt || rings.length !== 2) return;

  const style = document.createElement("style");
  style.textContent = `
    .hero-art .orbit {
      z-index: 0;
    }

    .hero-art .orb-one {
      position: absolute;
      z-index: 2;
      background:
        radial-gradient(circle at 40% 35%,
          rgba(139, 156, 255, 0.22),
          rgba(90, 101, 190, 0.06) 42%,
          transparent 70%),
        #0a0d16;
    }

    .hero-art .core {
      position: relative;
      z-index: 3;
      background: radial-gradient(circle at 35% 30%,
        #232d52 0%,
        #121830 55%,
        #0a0d14 100%);
    }

    .orbit-fish {
      position: absolute;
      left: 50%;
      top: 50%;
      width: ${FISH_WIDTH}px;
      height: auto;
      margin: calc(${FISH_WIDTH}px * -0.333) 0 0 calc(${FISH_WIDTH}px / -2);
      pointer-events: none;
      user-select: none;
      will-change: transform;
      filter: drop-shadow(0 6px 14px rgba(0,0,0,.45));
    }
  `;

  document.head.appendChild(style);

  const fish = document.createElement("img");
  fish.className = "orbit-fish";
  fish.src = FISH_SRC;
  fish.alt = "";
  fish.setAttribute("aria-hidden", "true");
  fish.draggable = false;
  heroArt.appendChild(fish);

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  function ringData() {
    return rings.map(ring => {
      const cs = getComputedStyle(ring);
      const m = new DOMMatrix(
        cs.transform === "none" ? undefined : cs.transform
      );

      return {
        a: ring.offsetWidth / 2,
        b: ring.offsetHeight / 2,
        angle: Math.atan2(m.b, m.a)
      };
    });
  }

  const smooth = x => x * x * (3 - 2 * x);

  let data = ringData();

  window.addEventListener("resize", () => {
    data = ringData();
  });

  function frame(now) {
    // Alternate ONLY between orbit-a and orbit-b.
    const lap = Math.floor(now / LAP_MS);
    const progress = (now % LAP_MS) / LAP_MS;
    const t = progress * Math.PI * 2;

    const currentIndex = lap % 2;
    const previousIndex = (currentIndex + 1) % 2;

    const cur = data[currentIndex];
    const prev = data[previousIndex];

    // Smoothly transition between the two selected orbits.
    const k = progress < BLEND
      ? smooth(progress / BLEND)
      : 1;

    const a = prev.a + (cur.a - prev.a) * k;
    const b = prev.b + (cur.b - prev.b) * k;

    const angle = prev.angle + (cur.angle - prev.angle) * k;

    const x = a * Math.cos(t);
    const y = b * Math.sin(t);

    const dx = -a * Math.sin(t);
    const dy = b * Math.cos(t);

    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    const X = x * cos - y * sin;
    const Y = x * sin + y * cos;

    const heading = Math.atan2(
      dx * sin + dy * cos,
      dx * cos - dy * sin
    ) * 180 / Math.PI;

    const goingLeft = Math.cos(heading * Math.PI / 180) < 0;

    const rotation = goingLeft ? heading + 180 : heading;
    const flip = goingLeft ? " scaleX(-1)" : "";

    const depth = (Math.sin(t) + 1) / 2;
    const scale = 0.82 + depth * 0.26;

    fish.style.zIndex = Math.sin(t) > 0 ? 4 : 1;
    fish.style.opacity = 0.7 + depth * 0.3;

    fish.style.transform =
      `translate(${X.toFixed(2)}px, ${Y.toFixed(2)}px) ` +
      `rotate(${rotation.toFixed(2)}deg)` +
      `${flip} scale(${scale.toFixed(3)})`;

    if (!reducedMotion) {
      requestAnimationFrame(frame);
    }
  }

  requestAnimationFrame(frame);
})();
