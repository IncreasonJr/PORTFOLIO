"use client";

import React, { useEffect, useRef, useState } from "react";

interface Point {
  x: number;
  y: number;
  px: number;
  py: number;
  w: number;
}

export default function LampPullCord() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cvRef = useRef<HTMLCanvasElement>(null);
  const hitRef = useRef<HTMLButtonElement>(null);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const wrap = wrapRef.current;
    const cv = cvRef.current;
    const hit = hitRef.current;
    if (!wrap || !cv || !hit) return;

    const ctx = cv.getContext("2d");
    if (!ctx) return;

    // Check initial theme
    const checkDark = () => document.documentElement.classList.contains("dark");
    setIsDark(checkDark());

    const N = 26; // number of rope segments
    const G = 4600; // gravity in px/s^2
    const STEP = 1 / 120;
    const ITER = 16;
    let dpr = 1;
    let W = 300;
    let H = 500;
    let L = 220;
    let EXT_MAX = 46;
    let HIDDEN = 70;
    let seg = 10;
    let ax = 200;
    let thick = 3.2;
    let knobS = 1;

    const pts: Point[] = [];
    let ext = 0;
    let extV = 0;
    let armed = true;
    let grab = -1;
    let grabOff = { x: 0, y: 0 };
    let target: { x: number; y: number } | null = null;
    let ptr: { x: number; y: number } | null = null;
    let ptrPrev: { x: number; y: number } | null = null;
    let downAt = 0;
    let downPos = { x: 0, y: 0 };
    let moved = 0;
    let acc = 0;
    let lastT = 0;
    let t = 0;
    let dropped = false;
    let live = false;
    let animId = 0;
    let sleeping = false;
    let still = 0;
    let touchedAt = 0;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function toggleMode() {
      const currentDark = document.documentElement.classList.contains("dark");
      const nextDark = !currentDark;

      const applyTheme = () => {
        if (nextDark) {
          document.documentElement.classList.add("dark");
          localStorage.setItem("theme", "dark");
        } else {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("theme", "light");
        }
        setIsDark(nextDark);
      };

      if (!reduced && (document as unknown as { startViewTransition?: (cb: () => void) => void }).startViewTransition) {
        (document as unknown as { startViewTransition: (cb: () => void) => void }).startViewTransition(applyTheme);
      } else {
        applyTheme();
      }
    }

    function layout() {
      if (!wrap || !cv) return;
      const rem = 16;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      let offset: number;

      if (vw >= 1024) {
        offset = 4.8 * rem;
        L = Math.min(260, Math.max(180, vh * 0.28));
        EXT_MAX = 70;
        thick = 3.6;
        knobS = 1.25;
      } else if (vw >= 640) {
        offset = 4.2 * rem;
        L = Math.min(210, Math.max(150, vh * 0.2));
        EXT_MAX = 60;
        thick = 3.3;
        knobS = 1.15;
      } else {
        offset = 3.4 * rem;
        L = 80;
        EXT_MAX = 45;
        thick = 3.0;
        knobS = 1.05;
      }

      HIDDEN = EXT_MAX + 18;
      W = Math.min(vw, 340);
      H = Math.round(L + EXT_MAX + 170);
      wrap.style.height = `${H}px`;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);

      const newAx = W - offset;
      const total = L + HIDDEN;
      seg = total / N;

      if (!pts.length) {
        for (let i = 0; i <= N; i++) {
          const x = newAx;
          const y = -HIDDEN + i * seg;
          pts.push({ x, y, px: x, py: y, w: i === 0 ? 0 : i === N ? 0.28 : 1 });
        }
      } else {
        const dx = newAx - ax;
        for (const p of pts) {
          p.x += dx;
          p.px += dx;
        }
      }
      ax = newAx;
    }

    function step(dt: number) {
      if (!dropped) return;
      t += dt;

      // Switch spring travel
      if (grab < 0) {
        const K = 760;
        const C = 21;
        extV += (-K * ext - C * extV) * dt;
        ext += extV * dt;
      }

      if (ext > EXT_MAX * 0.8 && armed && live) {
        armed = false;
        toggleMode();
        try {
          navigator.vibrate?.(12);
        } catch {}
      }
      if (ext < EXT_MAX * 0.22) {
        armed = true;
      }

      const a = pts[0];
      if (a) {
        a.x = a.px = ax;
        a.y = a.py = -HIDDEN + ext;
      }

      const wind = reduced ? 0 : Math.sin(t * 0.63) * 16 + Math.sin(t * 1.71 + 1.3) * 7;
      const damp = grab >= 0 ? 0.992 : 0.9875;

      for (let i = 1; i <= N; i++) {
        if (i === grab) continue;
        const p = pts[i];
        if (!p) continue;
        const vx = (p.x - p.px) * damp;
        const vy = (p.y - p.py) * damp;
        p.px = p.x;
        p.py = p.y;
        p.x += vx + wind * dt * dt * (i / N);
        p.y += vy + G * dt * dt;
      }

      if (grab >= 0 && target) {
        const g = pts[grab];
        if (g) {
          g.px = g.x;
          g.py = g.y;
          g.x = target.x;
          g.y = target.y;
        }
      }

      for (let k = 0; k < ITER; k++) {
        for (let i = 0; i < N; i++) {
          const p1 = pts[i];
          const p2 = pts[i + 1];
          if (!p1 || !p2) continue;
          const w1 = i === grab ? 0 : p1.w;
          const w2 = i + 1 === grab ? 0 : p2.w;
          const sw = w1 + w2;
          if (!sw) continue;
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const d = Math.hypot(dx, dy) || 1e-6;
          const diff = (d - seg) / d / sw;
          p1.x += dx * diff * w1;
          p1.y += dy * diff * w1;
          p2.x -= dx * diff * w2;
          p2.y -= dy * diff * w2;
        }
      }

      // Keep knob within drawing bounds
      for (let i = 1; i <= N; i++) {
        const p = pts[i];
        if (!p) continue;
        if (p.x < 14) p.x = 14;
        else if (p.x > W - 14) p.x = W - 14;
        if (p.y > H - 46) p.y = H - 46;
      }
    }

    function updateDrag() {
      if (grab < 0 || !ptr) return;
      let tx = ptr.x - grabOff.x;
      let ty = ptr.y - grabOff.y;
      const bx = ax;
      const by = -HIDDEN;
      const reach = grab * seg;
      const dx = tx - bx;
      const dy = ty - by;
      const d = Math.hypot(dx, dy) || 1e-6;
      let need = d - reach;
      if (need > EXT_MAX) {
        const over = need - EXT_MAX;
        const allowed = reach + EXT_MAX + (over * 0.14) / (1 + over / 160);
        tx = bx + (dx / d) * allowed;
        ty = by + (dy / d) * allowed;
        need = EXT_MAX;
      }
      const targetExt = Math.max(0, need);
      const prevExt = ext;
      ext += (targetExt - ext) * 0.55;
      extV = (ext - prevExt) * 60;
      target = { x: Math.max(14, Math.min(W - 14, tx)), y: Math.min(H - 46, ty) };
    }

    const localPos = (e: MouseEvent | PointerEvent) => {
      if (!wrap) return { x: 0, y: 0 };
      const r = wrap.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    function wake() {
      still = 0;
      touchedAt = performance.now();
      if (!sleeping) return;
      sleeping = false;
      lastT = 0;
      acc = 0;
      animId = requestAnimationFrame(loop);
    }

    function tug() {
      wake();
      extV = EXT_MAX * 44;
      if (pts[N]) {
        pts[N].px = pts[N].x + 1.5;
      }
    }

    function startDrag(e: PointerEvent, idx: number) {
      wake();
      grab = idx;
      const p = localPos(e);
      const g = pts[idx];
      if (!g) return;
      grabOff = { x: p.x - g.x, y: p.y - g.y };
      ptr = ptrPrev = p;
      target = { x: g.x, y: g.y };
      downAt = performance.now();
      downPos = p;
      moved = 0;
      wrap?.classList.add("dragging");
      window.addEventListener("pointermove", onMove, { passive: false });
      window.addEventListener("pointerup", endDrag);
      window.addEventListener("pointercancel", endDrag);
    }

    function onMove(e: PointerEvent) {
      if (grab < 0) return;
      e.preventDefault();
      ptrPrev = ptr;
      ptr = localPos(e);
      moved = Math.max(moved, Math.hypot(ptr.x - downPos.x, ptr.y - downPos.y));
    }

    function endDrag() {
      if (grab < 0) return;
      const g = pts[grab];
      if (g && ptr && ptrPrev) {
        const vx = ptr.x - ptrPrev.x;
        const vy = ptr.y - ptrPrev.y;
        g.px = g.x - vx * 0.5;
        g.py = g.y - vy * 0.5;
      }
      const tap = moved < 6 && performance.now() - downAt < 300;
      grab = -1;
      target = null;
      ptr = ptrPrev = null;
      wrap?.classList.remove("dragging");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
      if (tap) tug();
    }

    hit.addEventListener("pointerdown", (e) => {
      if (!dropped) return;
      e.preventDefault();
      try {
        hit.setPointerCapture(e.pointerId);
      } catch {}
      startDrag(e, N);
    });

    hit.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        tug();
      }
    });

    hit.addEventListener("click", (e) => e.preventDefault());

    // Allow dragging anywhere along rope on desktop
    const handleDocPointerDown = (e: PointerEvent) => {
      if (!dropped || e.pointerType !== "mouse" || e.button !== 0 || grab >= 0 || e.target === hit) return;
      const p = localPos(e);
      if (p.x < 0 || p.y < 0 || p.x > W || p.y > H) return;
      let best = -1;
      let bd = 11;
      for (let i = 2; i <= N; i++) {
        if (!pts[i] || pts[i].y < 0) continue;
        const d = Math.hypot(pts[i].x - p.x, pts[i].y - p.y);
        if (d < bd) {
          bd = d;
          best = i;
        }
      }
      if (best > 0) {
        e.preventDefault();
        startDrag(e, best);
      }
    };
    document.addEventListener("pointerdown", handleDocPointerDown);

    // Brushing mouse past rope gives gentle nudge
    let brushLast: { x: number; y: number } | null = null;
    const handlePointerMoveSway = (e: PointerEvent) => {
      if (grab >= 0 || e.pointerType !== "mouse") return;
      const p = localPos(e);
      if (p.x < -20 || p.y < -20 || p.x > W + 20 || p.y > H + 20) {
        brushLast = null;
        return;
      }
      if (brushLast) {
        wake();
        const vx = p.x - brushLast.x;
        const vy = p.y - brushLast.y;
        for (let i = 2; i <= N; i++) {
          const q = pts[i];
          if (!q) continue;
          const d = Math.hypot(q.x - p.x, q.y - p.y);
          if (d < 16) {
            const f = (1 - d / 16) * 0.35;
            q.x += vx * f;
            q.y += vy * f * 0.5;
          }
        }
      }
      brushLast = p;
    };
    window.addEventListener("pointermove", handlePointerMoveSway, { passive: true });

    function pathThrough(c: CanvasRenderingContext2D, ps: Point[]) {
      if (ps.length < 2) return;
      c.beginPath();
      c.moveTo(ps[0].x, ps[0].y);
      for (let i = 1; i < ps.length - 1; i++) {
        const mx = (ps[i].x + ps[i + 1].x) / 2;
        const my = (ps[i].y + ps[i + 1].y) / 2;
        c.quadraticCurveTo(ps[i].x, ps[i].y, mx, my);
      }
      const l = ps[ps.length - 1];
      c.lineTo(l.x, l.y);
    }

    function samples(ps: Point[], spacing: number) {
      const out: { x: number; y: number; tx: number; ty: number }[] = [];
      let carry = 0;
      for (let i = 0; i < ps.length - 1; i++) {
        const a = ps[i];
        const b = ps[i + 1];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const len = Math.hypot(dx, dy) || 1e-6;
        let s = carry;
        while (s < len) {
          out.push({ x: a.x + (dx * s) / len, y: a.y + (dy * s) / len, tx: dx / len, ty: dy / len });
          s += spacing;
        }
        carry = s - len;
      }
      return out;
    }

    function knobPath(c: CanvasRenderingContext2D) {
      c.beginPath();
      c.moveTo(-3.1, 6.2);
      c.bezierCurveTo(-3.6, 10.5, -9.6, 13.5, -9.6, 22.5);
      c.bezierCurveTo(-9.6, 30.5, -5.4, 35, 0, 35);
      c.bezierCurveTo(5.4, 35, 9.6, 30.5, 9.6, 22.5);
      c.bezierCurveTo(9.6, 13.5, 3.6, 10.5, 3.1, 6.2);
      c.closePath();
    }

    function drawKnob(c: CanvasRenderingContext2D, x: number, y: number, ang: number, shadowOnly: boolean) {
      c.save();
      c.translate(x, y);
      c.rotate(ang - Math.PI / 2);
      c.scale(knobS, knobS);
      if (shadowOnly) {
        knobPath(c);
        c.fill();
        c.fillRect(-3.4, -0.5, 6.8, 7.5);
        c.restore();
        return;
      }

      // Brass ferrule crimp
      const fg = c.createLinearGradient(-3.6, 0, 3.6, 0);
      fg.addColorStop(0, "#5b4a2c");
      fg.addColorStop(0.3, "#e8d59e");
      fg.addColorStop(0.55, "#b0924f");
      fg.addColorStop(1, "#4a3a1f");
      c.fillStyle = fg;
      c.beginPath();
      if (typeof c.roundRect === "function") {
        c.roundRect(-3.5, -0.6, 7, 7.6, 1.2);
      } else {
        c.rect(-3.5, -0.6, 7, 7.6);
      }
      c.fill();
      c.fillStyle = "rgba(0,0,0,0.25)";
      c.fillRect(-3.5, 2.6, 7, 0.7);
      c.fillRect(-3.5, 4.4, 7, 0.6);

      // Turned walnut body
      knobPath(c);
      const bg = c.createLinearGradient(-9.6, 0, 9.6, 0);
      bg.addColorStop(0, "#24150c");
      bg.addColorStop(0.22, "#6b3f22");
      bg.addColorStop(0.4, "#a8693d");
      bg.addColorStop(0.58, "#7c4828");
      bg.addColorStop(0.85, "#3b2213");
      bg.addColorStop(1, "#1d110a");
      c.fillStyle = bg;
      c.fill();

      c.save();
      knobPath(c);
      c.clip();

      // Wood grain lines
      c.strokeStyle = "rgba(30,14,6,0.28)";
      c.lineWidth = 0.55;
      for (let k = -3; k <= 3; k++) {
        c.beginPath();
        c.moveTo(k * 2.4 - 0.6, 8);
        c.bezierCurveTo(k * 2.9 + 1, 16, k * 2.2 - 1, 26, k * 1.6, 35);
        c.stroke();
      }

      // Soft light highlight
      const hl = c.createRadialGradient(-3.6, 17, 0.5, -3.6, 17, 9);
      hl.addColorStop(0, "rgba(255,226,190,0.42)");
      hl.addColorStop(1, "rgba(255,226,190,0)");
      c.fillStyle = hl;
      c.fillRect(-10, 6, 20, 30);

      const bo = c.createLinearGradient(0, 24, 0, 35.5);
      bo.addColorStop(0, "rgba(0,0,0,0)");
      bo.addColorStop(1, "rgba(0,0,0,0.35)");
      c.fillStyle = bo;
      c.fillRect(-10, 6, 20, 30);
      c.restore();

      // Specular highlight streak
      c.fillStyle = "rgba(255,240,220,0.38)";
      c.beginPath();
      c.ellipse(-4.4, 20.5, 1.1, 5.2, -0.08, 0, Math.PI * 2);
      c.fill();
      c.restore();
    }

    function draw() {
      if (!ctx || pts.length < N + 1) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const ps = pts;
      const last = ps[N];
      const prev = ps[N - 1];
      if (!last || !prev) return;
      const ang = Math.atan2(last.y - prev.y, last.x - prev.x);

      // Cast shadow
      const sa = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--cord-shadow")) || 0.25;
      ctx.save();
      ctx.translate(7, 11);
      ctx.strokeStyle = `rgba(0,0,0,${sa * 0.8})`;
      ctx.lineWidth = thick + 1;
      ctx.lineCap = "round";
      pathThrough(ctx, ps);
      ctx.stroke();
      ctx.fillStyle = `rgba(0,0,0,${sa})`;
      drawKnob(ctx, last.x, last.y, ang, true);
      ctx.restore();

      // Braided cotton cord
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      pathThrough(ctx, ps);
      ctx.strokeStyle = "#6f6455";
      ctx.lineWidth = thick + 1.3;
      ctx.stroke();
      ctx.strokeStyle = "#d6ccba";
      ctx.lineWidth = thick;
      ctx.stroke();

      const sm = samples(ps, thick * 1.05);
      ctx.lineWidth = Math.max(0.6, thick * 0.24);
      ctx.strokeStyle = "rgba(96,82,64,0.55)";
      ctx.beginPath();
      for (const q of sm) {
        if (q.y < -2) continue;
        const nx = -q.ty;
        const ny = q.tx;
        const h = thick * 0.5;
        ctx.moveTo(q.x - nx * h - q.tx * h * 0.7, q.y - ny * h - q.ty * h * 0.7);
        ctx.lineTo(q.x + nx * h + q.tx * h * 0.7, q.y + ny * h + q.ty * h * 0.7);
      }
      ctx.stroke();

      // Lit side highlight
      ctx.save();
      ctx.translate(-thick * 0.2, -thick * 0.05);
      pathThrough(ctx, ps);
      ctx.strokeStyle = "rgba(255,252,244,0.55)";
      ctx.lineWidth = thick * 0.28;
      ctx.stroke();
      ctx.restore();

      drawKnob(ctx, last.x, last.y, ang, false);

      // Update hit target position
      const kx = last.x + Math.cos(ang) * 20 * knobS;
      const ky = last.y + Math.sin(ang) * 20 * knobS;
      if (hit) {
        hit.style.transform = `translate(${kx}px, ${ky}px)`;
      }
    }

    function loop(now: number) {
      if (!lastT) lastT = now;
      const dt = Math.min((now - lastT) / 1000, 1 / 20);
      lastT = now;
      updateDrag();
      acc += dt;
      while (acc >= STEP) {
        step(STEP);
        acc -= STEP;
      }

      if (dropped && live && grab < 0 && now - touchedAt > 2500) {
        for (const q of pts) {
          q.px += (q.x - q.px) * 0.06;
          q.py += (q.y - q.py) * 0.06;
        }
      }

      draw();

      let motion = Math.abs(extV) + Math.abs(ext);
      for (const q of pts) {
        motion = Math.max(motion, Math.abs(q.x - q.px) + Math.abs(q.y - q.py));
      }

      if (dropped && live && grab < 0 && motion < 0.06) {
        if (++still > 30) {
          for (const q of pts) {
            q.px = q.x;
            q.py = q.y;
          }
          sleeping = true;
          return;
        }
      } else {
        still = 0;
      }

      animId = requestAnimationFrame(loop);
    }

    layout();

    // Start pulled up and smoothly drop in
    pts.forEach((p, i) => {
      p.y = p.py = -HIDDEN - i * seg * 0.98;
      p.x = p.px = ax + Math.sin(i * 0.5) * 1.5;
    });

    const dropTimer = setTimeout(() => {
      dropped = true;
      for (const p of pts) {
        p.px = p.x - 0.45;
      }
      setTimeout(() => {
        live = true;
      }, 800);
    }, 200);

    const handleResize = () => {
      wake();
      layout();
    };
    window.addEventListener("resize", handleResize);

    const observer = new MutationObserver(() => {
      setIsDark(checkDark());
      wake();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    animId = requestAnimationFrame(loop);

    return () => {
      clearTimeout(dropTimer);
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMoveSway);
      document.removeEventListener("pointerdown", handleDocPointerDown);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={wrapRef} className="cord" id="cord" title="Light / Dark Switch (Pull the cord)">
      <canvas ref={cvRef} className="cord__cv" aria-hidden="true" />
      <button
        ref={hitRef}
        className="cord__hit"
        id="cordHit"
        role="switch"
        aria-checked={isDark}
        aria-label="Toggle theme (pull the cord)"
      />
    </div>
  );
}
