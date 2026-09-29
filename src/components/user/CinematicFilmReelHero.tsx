"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";

interface ControlPoint {
  x: number;
  y: number;
}

interface SplineSample {
  x: number;
  y: number;
  tx: number; // Unit tangent x
  ty: number; // Unit tangent y
  nx: number; // Unit normal x
  ny: number; // Unit normal y
  width: number;
  arcLen: number;
}

// 11 Control Points defining a graceful, symmetrical double S-curve across a 1600x440 viewBox.
// Crest 1 at x=370, y=85 (top-left of heading).
// Valley at x=800, y=265 (weaving down behind subtitle).
// Crest 2 at x=1230, y=85 (top-right of heading).
// Extends smoothly off-screen on both sides to prevent any edge clipping.
const CONTROL_POINTS: ControlPoint[] = [
  { x: -340, y: 440 }, // P0 virtual handle
  { x: -160, y: 360 }, // P1 entrance bottom-left
  { x: 100, y: 235 },  // P2 rising
  { x: 370, y: 85 },   // P3 crest 1 (top-left of heading)
  { x: 610, y: 165 },  // P4 descending behind heading left
  { x: 800, y: 265 },  // P5 central valley (behind subtitle)
  { x: 990, y: 165 },  // P6 rising behind heading right
  { x: 1230, y: 85 },  // P7 crest 2 (top-right of heading)
  { x: 1500, y: 235 }, // P8 descending
  { x: 1760, y: 360 }, // P9 exit bottom-right
  { x: 1940, y: 440 }, // P10 virtual handle
];

// Width calculation providing natural 3D perspective foreshortening
function computePerspectiveWidth(y: number): number {
  // At crests (y = 85), the film faces the viewer and expands to 76px.
  // In the central valley (y = 265), it turns slightly away and tapers to 64px.
  const t = Math.max(0, Math.min(1, (265 - y) / 180));
  return 64 + 12 * t;
}

// Catmull-Rom spline sampling and arc-length parameterization
function buildSplineSamples(): { samples: SplineSample[]; totalLen: number } {
  const raw: { x: number; y: number; tx: number; ty: number; nx: number; ny: number; width: number }[] = [];

  for (let i = 1; i < CONTROL_POINTS.length - 2; i++) {
    const p0 = CONTROL_POINTS[i - 1];
    const p1 = CONTROL_POINTS[i];
    const p2 = CONTROL_POINTS[i + 1];
    const p3 = CONTROL_POINTS[i + 2];
    const steps = 140;

    for (let s = 0; s < steps; s++) {
      const t = s / steps;
      const t2 = t * t;
      const t3 = t2 * t;

      const x = 0.5 * (
        (2 * p1.x) +
        (-p0.x + p2.x) * t +
        (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
        (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3
      );
      const y = 0.5 * (
        (2 * p1.y) +
        (-p0.y + p2.y) * t +
        (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
        (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3
      );
      const dx = 0.5 * (
        (-p0.x + p2.x) +
        2 * (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t +
        3 * (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t2
      );
      const dy = 0.5 * (
        (-p0.y + p2.y) +
        2 * (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t +
        3 * (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t2
      );

      const len = Math.hypot(dx, dy) || 1;
      const tx = dx / len;
      const ty = dy / len;
      const nx = -ty;
      const ny = tx;
      const width = computePerspectiveWidth(y);

      raw.push({ x, y, tx, ty, nx, ny, width });
    }
  }

  let totalLen = 0;
  const samples: SplineSample[] = [{ ...raw[0], arcLen: 0 }];
  for (let i = 1; i < raw.length; i++) {
    const d = Math.hypot(raw[i].x - raw[i - 1].x, raw[i].y - raw[i - 1].y);
    totalLen += d;
    samples.push({ ...raw[i], arcLen: totalLen });
  }

  return { samples, totalLen };
}

// O(log N) arc-length point lookup with linear interpolation
function sampleAtArcLen(samples: SplineSample[], totalLen: number, s: number): SplineSample {
  if (s <= 0) return samples[0];
  if (s >= totalLen) return samples[samples.length - 1];

  let low = 0;
  let high = samples.length - 1;
  while (low <= high) {
    const mid = (low + high) >> 1;
    if (samples[mid].arcLen < s) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  const i1 = Math.max(0, high);
  const i2 = Math.min(samples.length - 1, low);
  if (i1 === i2) return samples[i1];

  const s1 = samples[i1];
  const s2 = samples[i2];
  const fraction = (s - s1.arcLen) / (s2.arcLen - s1.arcLen || 1);

  return {
    x: s1.x + (s2.x - s1.x) * fraction,
    y: s1.y + (s2.y - s1.y) * fraction,
    tx: s1.tx + (s2.tx - s1.tx) * fraction,
    ty: s1.ty + (s2.ty - s1.ty) * fraction,
    nx: s1.nx + (s2.nx - s1.nx) * fraction,
    ny: s1.ny + (s2.ny - s1.ny) * fraction,
    width: s1.width + (s2.width - s1.width) * fraction,
    arcLen: s,
  };
}

// Cinema archival edge-code typography that flows along the film margins
const CINEMA_EDGE_CODES = [
  "TREE MEDIA 35MM",
  "▶ 24.00 FPS",
  "SAFETY FILM",
  "KODAK 5219",
  "TM • CASTING REEL",
  "GOLD 500T",
  "FRAME # 04",
  "TREE MEDIA GLOBAL",
  "2.39:1 CINEMASCOPE",
  "SOUNDSTAGE 01",
];

const FRAME_PITCH = 96;       // Length of one 35mm frame (divider to divider)
const SPROCKET_PITCH = 24;    // Standard 4 perforations per frame (96 / 4 = 24)

export default function CinematicFilmReelHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Direct SVG path refs for zero-overhead, 60fps DOM updates
  const topSprocketsRef = useRef<SVGPathElement>(null);
  const botSprocketsRef = useRef<SVGPathElement>(null);
  const topSprocketsCutoutRef = useRef<SVGPathElement>(null);
  const botSprocketsCutoutRef = useRef<SVGPathElement>(null);
  const frameDividersRef = useRef<SVGPathElement>(null);
  const frameDividersLineRef = useRef<SVGPathElement>(null);
  const frameWindowsRef = useRef<SVGPathElement>(null);
  const edgeTextGroupRef = useRef<SVGGElement>(null);

  // Parallax tracking refs
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const animFrameId = useRef<number | null>(null);

  // Continuous animation clock
  const animClockRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);

  // Pre-sample the continuous S-curve spline once
  const { samples, totalLen } = useMemo(() => buildSplineSamples(), []);

  // Pre-calculate static guide paths (Ribbon body, top/bottom rails, inner lines)
  const staticPaths = useMemo(() => {
    let bodyD = "";
    let topRailD = "";
    let botRailD = "";
    let topSprocketTrackD = "";
    let botSprocketTrackD = "";
    let topInnerRailD = "";
    let botInnerRailD = "";

    const n = samples.length;
    // 1. Top rail points
    for (let i = 0; i < n; i++) {
      const s = samples[i];
      const hw = s.width / 2;
      const x = s.x + s.nx * hw;
      const y = s.y + s.ny * hw;
      topRailD += `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)} `;

      // Sprocket center track (6.5px in from outer rail)
      const spX = s.x + s.nx * (hw - 6.5);
      const spY = s.y + s.ny * (hw - 6.5);
      topSprocketTrackD += `${i === 0 ? "M" : "L"} ${spX.toFixed(1)} ${spY.toFixed(1)} `;

      // Inner boundary rail (13.5px in from outer rail)
      const inX = s.x + s.nx * (hw - 13.5);
      const inY = s.y + s.ny * (hw - 13.5);
      topInnerRailD += `${i === 0 ? "M" : "L"} ${inX.toFixed(1)} ${inY.toFixed(1)} `;
    }

    // 2. Bottom rail points
    for (let i = 0; i < n; i++) {
      const s = samples[i];
      const hw = s.width / 2;
      const x = s.x - s.nx * hw;
      const y = s.y - s.ny * hw;
      botRailD += `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)} `;

      const spX = s.x - s.nx * (hw - 6.5);
      const spY = s.y - s.ny * (hw - 6.5);
      botSprocketTrackD += `${i === 0 ? "M" : "L"} ${spX.toFixed(1)} ${spY.toFixed(1)} `;

      const inX = s.x - s.nx * (hw - 13.5);
      const inY = s.y - s.ny * (hw - 13.5);
      botInnerRailD += `${i === 0 ? "M" : "L"} ${inX.toFixed(1)} ${inY.toFixed(1)} `;
    }

    // 3. Closed Celluloid Ribbon Body (Top rail forward, then bottom rail backward, then Z)
    bodyD = topRailD;
    for (let i = n - 1; i >= 0; i--) {
      const s = samples[i];
      const hw = s.width / 2;
      const x = s.x - s.nx * hw;
      const y = s.y - s.ny * hw;
      bodyD += `L ${x.toFixed(1)} ${y.toFixed(1)} `;
    }
    bodyD += "Z";

    return {
      bodyD,
      topRailD,
      botRailD,
      topSprocketTrackD,
      botSprocketTrackD,
      topInnerRailD,
      botInnerRailD,
    };
  }, [samples]);

  // Frame generator function: updates SVG paths synchronously with zero React re-render
  const renderFilmStripFrame = (offset: number) => {
    // 1. Advance sprocket tracks via GPU-accelerated strokeDashoffset
    const dashOffsetStr = `${-offset}px`;
    if (topSprocketsRef.current) topSprocketsRef.current.style.strokeDashoffset = dashOffsetStr;
    if (botSprocketsRef.current) botSprocketsRef.current.style.strokeDashoffset = dashOffsetStr;
    if (topSprocketsCutoutRef.current) topSprocketsCutoutRef.current.style.strokeDashoffset = dashOffsetStr;
    if (botSprocketsCutoutRef.current) botSprocketsCutoutRef.current.style.strokeDashoffset = dashOffsetStr;

    // 2. Generate frame divider bars and frame aperture windows
    const numFrames = Math.ceil(totalLen / FRAME_PITCH) + 2;
    let dividersD = "";
    let windowsD = "";

    const topInnerMargin = 13.5;
    const botInnerMargin = 13.5;

    for (let k = -1; k <= numFrames; k++) {
      const sDivider = k * FRAME_PITCH - offset;

      // Frame divider line
      if (sDivider >= -20 && sDivider <= totalLen + 20) {
        const pt = sampleAtArcLen(samples, totalLen, sDivider);
        const topX = pt.x + pt.nx * (pt.width / 2);
        const topY = pt.y + pt.ny * (pt.width / 2);
        const botX = pt.x - pt.nx * (pt.width / 2);
        const botY = pt.y - pt.ny * (pt.width / 2);
        dividersD += `M ${topX.toFixed(1)} ${topY.toFixed(1)} L ${botX.toFixed(1)} ${botY.toFixed(1)} `;
      }

      // Frame window aperture (between this divider and next divider)
      const sStart = k * FRAME_PITCH - offset + 6.5;
      const sEnd = (k + 1) * FRAME_PITCH - offset - 6.5;
      if (sEnd >= -20 && sStart <= totalLen + 20) {
        const pt1 = sampleAtArcLen(samples, totalLen, Math.max(0, sStart));
        const pt2 = sampleAtArcLen(samples, totalLen, Math.min(totalLen, sEnd));

        const p1x = pt1.x + pt1.nx * (pt1.width / 2 - topInnerMargin);
        const p1y = pt1.y + pt1.ny * (pt1.width / 2 - topInnerMargin);

        const p2x = pt2.x + pt2.nx * (pt2.width / 2 - topInnerMargin);
        const p2y = pt2.y + pt2.ny * (pt2.width / 2 - topInnerMargin);

        const p3x = pt2.x - pt2.nx * (pt2.width / 2 - botInnerMargin);
        const p3y = pt2.y - pt2.ny * (pt2.width / 2 - botInnerMargin);

        const p4x = pt1.x - pt1.nx * (pt1.width / 2 - botInnerMargin);
        const p4y = pt1.y - pt1.ny * (pt1.width / 2 - botInnerMargin);

        windowsD += `M ${p1x.toFixed(1)} ${p1y.toFixed(1)} L ${p2x.toFixed(1)} ${p2y.toFixed(1)} L ${p3x.toFixed(1)} ${p3y.toFixed(1)} L ${p4x.toFixed(1)} ${p4y.toFixed(1)} Z `;
      }
    }

    if (frameDividersRef.current) frameDividersRef.current.setAttribute("d", dividersD);
    if (frameDividersLineRef.current) frameDividersLineRef.current.setAttribute("d", dividersD);
    if (frameWindowsRef.current) frameWindowsRef.current.setAttribute("d", windowsD);

    // 3. Update flowing edge-code typography transforms
    if (edgeTextGroupRef.current) {
      const textNodes = edgeTextGroupRef.current.children;
      for (let i = 0; i < textNodes.length; i++) {
        const textNode = textNodes[i] as SVGTextElement;
        const sMid = (i * FRAME_PITCH * 2) - offset + (FRAME_PITCH * 0.5);
        if (sMid >= -40 && sMid <= totalLen + 40) {
          const pt = sampleAtArcLen(samples, totalLen, Math.max(0, Math.min(totalLen, sMid)));
          // Place slightly above the top inner line
          const tx = pt.x + pt.nx * (pt.width / 2 - 10.5);
          const ty = pt.y + pt.ny * (pt.width / 2 - 10.5);
          const angle = (Math.atan2(pt.ty, pt.tx) * 180) / Math.PI;
          textNode.setAttribute("transform", `translate(${tx.toFixed(1)}, ${ty.toFixed(1)}) rotate(${angle.toFixed(1)})`);
          textNode.style.display = "block";
        } else {
          textNode.style.display = "none";
        }
      }
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleMotionChange);

    // Render initial static frame
    renderFilmStripFrame(0);

    const SPEED = 20; // 20 pixels per second - slow, smooth, majestic cinematic advance

    const animateLoop = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const deltaTime = (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;

      // 1. Advance continuous film strip offset (modulo FRAME_PITCH for seamless infinite cycle)
      if (!mediaQuery.matches) {
        animClockRef.current = (animClockRef.current + SPEED * Math.min(deltaTime, 0.1)) % FRAME_PITCH;
        renderFilmStripFrame(animClockRef.current);

        // 2. Smooth parallax lerp tracking
        currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.05;
        currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.05;

        setMousePos({
          x: parseFloat(currentPos.current.x.toFixed(3)),
          y: parseFloat(currentPos.current.y.toFixed(3)),
        });
      }

      animFrameId.current = requestAnimationFrame(animateLoop);
    };

    animFrameId.current = requestAnimationFrame(animateLoop);

    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [samples, totalLen]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    targetPos.current = { x, y };
  };

  const handleMouseLeave = () => {
    targetPos.current = { x: 0, y: 0 };
  };

  // Subtle 3D tilt and floating parallax translation
  const stripRotateY = mousePos.x * 3.5;
  const stripRotateX = -mousePos.y * 2.5;
  const stripTranslateX = mousePos.x * 8;
  const stripTranslateY = mousePos.y * 5;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-hidden="true"
      className="absolute -inset-x-4 -inset-y-12 sm:-inset-x-8 sm:-inset-y-16 pointer-events-none select-none overflow-hidden z-0"
    >
      {/* 1. Volumetric Cinema Backlight Cone (Soft ambient emerald/warm glow behind the film strip) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] max-w-[95vw] h-[360px] opacity-25 lg:opacity-35 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 50% at 50% 45%, rgba(220, 139, 32, 0.13) 0%, rgba(220, 139, 32, 0.04) 45%, transparent 75%)",
          filter: "blur(48px)",
        }}
      />

      {/* 2. Soft Optical Legibility Diffuser directly behind the Heading & Subtitle */}
      {/* Ensures the foreground typography "Connect With Tree Media Agency" is always 100% crisp and readable */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[980px] max-w-[92vw] h-[260px] rounded-full opacity-90 sm:opacity-85 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 50% 50%, rgba(248, 250, 252, 0.96) 0%, rgba(248, 250, 252, 0.8) 55%, transparent 88%)",
          filter: "blur(22px)",
        }}
      />

      {/* 3. The One Long Continuous SVG Cinematic Film Strip Ribbon */}
      <div
        className="absolute inset-0 w-full h-full animate-film-strip-breathe"
        style={{
          perspective: "1200px",
          transform: `perspective(1200px) rotateX(${stripRotateX}deg) rotateY(${stripRotateY}deg) translate3d(${stripTranslateX}px, ${stripTranslateY}px, 0)`,
          transition: "transform 0.18s ease-out",
          transformStyle: "preserve-3d",
        }}
      >
        <svg
          viewBox="0 0 1600 440"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full"
          style={{
            filter: "drop-shadow(0 14px 28px rgba(15, 23, 42, 0.22)) drop-shadow(0 0 16px rgba(220, 139, 32, 0.12))",
          }}
        >
          <defs>
            {/* Film Body Rich Dark Charcoal Celluloid Gradient */}
            <linearGradient id="celluloidStripGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#090d16" stopOpacity="0.88" />
              <stop offset="22%" stopColor="#111827" stopOpacity="0.92" />
              <stop offset="42%" stopColor="#2e1d06" stopOpacity="0.85" /> {/* Subtle Tree Media #DC8B20 accent */}
              <stop offset="50%" stopColor="#0f172a" stopOpacity="0.75" /> {/* Softened directly behind center heading */}
              <stop offset="58%" stopColor="#2e1d06" stopOpacity="0.85" />
              <stop offset="78%" stopColor="#111827" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#090d16" stopOpacity="0.88" />
            </linearGradient>

            {/* Specular Spine & Edge Glint with Tree Media #DC8B20 Accent */}
            <linearGradient id="stripSpecularGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#475569" stopOpacity="0.25" />
              <stop offset="25%" stopColor="#ffffff" stopOpacity="0.45" />
              <stop offset="38%" stopColor="#DC8B20" stopOpacity="0.65" />
              <stop offset="50%" stopColor="#64748b" stopOpacity="0.30" />
              <stop offset="72%" stopColor="#DC8B20" stopOpacity="0.65" />
              <stop offset="85%" stopColor="#ffffff" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#475569" stopOpacity="0.25" />
            </linearGradient>

            {/* Translucent Frame Aperture Emulsion Shader */}
            <linearGradient id="frameApertureGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" stopOpacity="0.45" />
              <stop offset="48%" stopColor="#2e1b05" stopOpacity="0.35" /> {/* Very subtle #DC8B20 glow in aperture */}
              <stop offset="100%" stopColor="#020617" stopOpacity="0.55" />
            </linearGradient>

            {/* Frame Divider Bar Gradient */}
            <linearGradient id="dividerBarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0a0f1d" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#1e293b" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#0a0f1d" stopOpacity="0.95" />
            </linearGradient>

            {/* Outer Rail Stroke Gradient */}
            <linearGradient id="outerRailGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#334155" stopOpacity="0.6" />
              <stop offset="35%" stopColor="#DC8B20" stopOpacity="0.75" />
              <stop offset="50%" stopColor="#475569" stopOpacity="0.45" />
              <stop offset="65%" stopColor="#DC8B20" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#334155" stopOpacity="0.6" />
            </linearGradient>

            {/* Mask to ensure text legibility where the strip passes behind the center content */}
            <mask id="filmStripLegibilityMask">
              {/* White background: reveals entire strip */}
              <rect x="-200" y="-100" width="2000" height="700" fill="#ffffff" />
              {/* Soft radial feathered reduction behind the heading to ensure flawless contrast */}
              <ellipse
                cx="800"
                cy="220"
                rx="340"
                ry="130"
                fill="#b8b8b8"
                style={{ filter: "blur(24px)" }}
              />
            </mask>
          </defs>

          {/* Group masked for guaranteed heading readability */}
          <g mask="url(#filmStripLegibilityMask)">
            {/* 1. Continuous Celluloid Film Body Ribbon */}
            <path
              d={staticPaths.bodyD}
              fill="url(#celluloidStripGrad)"
            />

            {/* 2. Flowing Frame Windows (Semi-transparent 35mm film apertures) */}
            <path
              ref={frameWindowsRef}
              fill="url(#frameApertureGrad)"
              stroke="rgba(220, 139, 32, 0.22)"
              strokeWidth="0.8"
            />

            {/* 3. Subtle Frame Specular Sheen (Diagonal glossy reflection across celluloid) */}
            <path
              d={staticPaths.bodyD}
              fill="none"
              stroke="url(#stripSpecularGrad)"
              strokeWidth="0.8"
              strokeOpacity="0.4"
            />

            {/* 4. Frame Divider Separator Bars */}
            <path
              ref={frameDividersRef}
              fill="none"
              stroke="url(#dividerBarGrad)"
              strokeWidth="9"
              strokeLinecap="butt"
            />
            {/* Fine divider hairline on top */}
            <path
              ref={frameDividersLineRef}
              fill="none"
              stroke="rgba(100, 116, 139, 0.45)"
              strokeWidth="1.2"
              strokeLinecap="butt"
            />

            {/* 5. Inner Guide Rails (Separates sprocket tracks from frame aperture) */}
            <path
              d={staticPaths.topInnerRailD}
              fill="none"
              stroke="#334155"
              strokeWidth="0.9"
              strokeOpacity="0.45"
            />
            <path
              d={staticPaths.botInnerRailD}
              fill="none"
              stroke="#334155"
              strokeWidth="0.9"
              strokeOpacity="0.45"
            />

            {/* 6. Sprocket Hole Tracks (Base dark track behind perforations) */}
            <path
              d={staticPaths.topSprocketTrackD}
              fill="none"
              stroke="#030712"
              strokeWidth="6"
              strokeOpacity="0.6"
            />
            <path
              d={staticPaths.botSprocketTrackD}
              fill="none"
              stroke="#030712"
              strokeWidth="6"
              strokeOpacity="0.6"
            />

            {/* 7. Realistic Sprocket Perforations (Cutouts revealing light page background) */}
            {/* Upper Sprocket Track - 24px pitch (4 perforations per 96px frame) */}
            <path
              ref={topSprocketsCutoutRef}
              d={staticPaths.topSprocketTrackD}
              fill="none"
              stroke="rgba(248, 250, 252, 0.92)"
              strokeWidth="4.2"
              strokeLinecap="round"
              strokeDasharray="6.5 17.5"
            />
            {/* Dark inner rim for authentic hole depth */}
            <path
              ref={topSprocketsRef}
              d={staticPaths.topSprocketTrackD}
              fill="none"
              stroke="#090d16"
              strokeWidth="4.6"
              strokeLinecap="round"
              strokeDasharray="1.5 22.5"
              strokeOpacity="0.75"
            />

            {/* Lower Sprocket Track */}
            <path
              ref={botSprocketsCutoutRef}
              d={staticPaths.botSprocketTrackD}
              fill="none"
              stroke="rgba(248, 250, 252, 0.92)"
              strokeWidth="4.2"
              strokeLinecap="round"
              strokeDasharray="6.5 17.5"
            />
            <path
              ref={botSprocketsRef}
              d={staticPaths.botSprocketTrackD}
              fill="none"
              stroke="#090d16"
              strokeWidth="4.6"
              strokeLinecap="round"
              strokeDasharray="1.5 22.5"
              strokeOpacity="0.75"
            />

            {/* 8. Outer Rail Borders (Top and Bottom) */}
            <path
              d={staticPaths.topRailD}
              fill="none"
              stroke="url(#outerRailGrad)"
              strokeWidth="1.5"
            />
            <path
              d={staticPaths.botRailD}
              fill="none"
              stroke="url(#outerRailGrad)"
              strokeWidth="1.5"
            />

            {/* 9. High-End 35mm Celluloid Archival Edge-Code Micro Typography */}
            <g
              ref={edgeTextGroupRef}
              fill="#64748b"
              fillOpacity="0.55"
              fontSize="6.5"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.8px"
              fontWeight="bold"
            >
              {CINEMA_EDGE_CODES.map((code, idx) => (
                <text key={idx} textAnchor="middle" dominantBaseline="middle">
                  {code}
                </text>
              ))}
            </g>
          </g>
        </svg>
      </div>

      {/* 4. Ambient Floating Silver-Halide Light Motes */}
      <div className="absolute top-[20%] right-[22%] w-2 h-2 rounded-full bg-[#DC8B20]/20 blur-[1px] animate-float-drift" />
      <div
        className="absolute top-[65%] right-[16%] w-2.5 h-2.5 rounded-full bg-slate-400/20 blur-[1.5px] animate-float-drift"
        style={{ animationDelay: "3s", animationDuration: "15s" }}
      />
      <div
        className="absolute top-[32%] left-[24%] w-1.5 h-1.5 rounded-full bg-[#DC8B20]/20 blur-[0.8px] animate-float-drift"
        style={{ animationDelay: "6s", animationDuration: "18s" }}
      />
    </div>
  );
}

