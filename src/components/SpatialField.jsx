import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion, useIsCoarsePointer } from '../lib/useEnvironment.js';

// The page's environment: a deep-space canvas of "nodes" (stars) that a
// soft purple light source drifts through. On desktop the light follows
// the cursor; nearby nodes brighten and draw faint mesh connections to
// each other, like a service mesh lighting up as traffic passes through
// it. On touch devices the light drifts on its own, slowly. With
// prefers-reduced-motion, everything is static.
export default function SpatialField() {
  const canvasRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const coarsePointer = useIsCoarsePointer();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let stars = [];
    let rafId = null;
    let startTime = performance.now();

    const light = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    let hasPointer = false;

    const REACT_RADIUS = 190;
    const MESH_DISTANCE = 130;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = 16000; // px^2 per star
      const count = Math.min(170, Math.floor((width * height) / density));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.1 + 0.5,
        baseAlpha: Math.random() * 0.35 + 0.25,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.6 + 0.3,
      }));

      target.x = width / 2;
      target.y = height / 2;
      light.x = target.x;
      light.y = target.y;
    }

    function onPointerMove(e) {
      hasPointer = true;
      target.x = e.clientX;
      target.y = e.clientY;
    }

    function drawStatic() {
      // No animation at all: draw the field once and stop.
      ctx.clearRect(0, 0, width, height);
      for (const s of stars) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(226, 232, 245, ${s.baseAlpha})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function drawGlow(x, y, intensity) {
      ctx.save();
      ctx.filter = 'blur(34px)';
      ctx.globalCompositeOperation = 'lighter';
      const grad = ctx.createRadialGradient(x, y, 0, x, y, 240);
      grad.addColorStop(0, `rgba(147, 112, 255, ${0.16 * intensity})`);
      grad.addColorStop(0.5, `rgba(124, 92, 255, ${0.07 * intensity})`);
      grad.addColorStop(1, 'rgba(124, 92, 255, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(x - 260, y - 260, 520, 520);
      ctx.restore();
    }

    function frame(now) {
      const t = (now - startTime) / 1000;

      // Ease the light toward its target — this is what makes the
      // motion feel like a physical object drifting, not a cursor lock.
      light.x += (target.x - light.x) * 0.07;
      light.y += (target.y - light.y) * 0.07;

      if (coarsePointer && !hasPointer) {
        // Autonomous slow drift for touch devices — gentle, never idle-dead.
        target.x = width / 2 + Math.cos(t * 0.12) * width * 0.22;
        target.y = height / 2 + Math.sin(t * 0.09) * height * 0.18;
      }

      ctx.clearRect(0, 0, width, height);

      // Parallax: the whole field drifts a couple of px opposite the
      // light's offset from center, like depth in a shallow scene.
      const px = ((light.x - width / 2) / width) * -6;
      const py = ((light.y - height / 2) / height) * -6;

      const nearby = [];

      for (const s of stars) {
        const sx = s.x + px * (s.r + 0.3);
        const sy = s.y + py * (s.r + 0.3);
        const dx = sx - light.x;
        const dy = sy - light.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const proximity = Math.max(0, 1 - dist / REACT_RADIUS);

        const twinkle = Math.sin(t * s.speed + s.phase) * 0.15;
        const alpha = Math.min(1, s.baseAlpha + twinkle + proximity * 0.55);
        const radius = s.r + proximity * 1.4;

        ctx.beginPath();
        ctx.fillStyle = `rgba(226, 232, 245, ${alpha})`;
        ctx.arc(sx, sy, radius, 0, Math.PI * 2);
        ctx.fill();

        if (proximity > 0) nearby.push({ x: sx, y: sy, proximity });
      }

      // Faint mesh lines between nodes currently lit by the light —
      // the "reveal a hidden network" moment.
      for (let i = 0; i < nearby.length; i++) {
        for (let j = i + 1; j < nearby.length; j++) {
          const a = nearby[i];
          const b = nearby[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MESH_DISTANCE) {
            const strength = (1 - dist / MESH_DISTANCE) * Math.min(a.proximity, b.proximity);
            if (strength <= 0) continue;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(167, 139, 250, ${strength * 0.5})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      drawGlow(light.x, light.y, 1);

      rafId = requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener('resize', resize);

    if (reducedMotion) {
      drawStatic();
    } else {
      if (!coarsePointer) {
        window.addEventListener('pointermove', onPointerMove, { passive: true });
      }
      rafId = requestAnimationFrame(frame);
    }

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [reducedMotion, coarsePointer]);

  return <canvas ref={canvasRef} className="spatial-field" aria-hidden="true" />;
}
