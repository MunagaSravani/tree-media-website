"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  z: number; // 0.1 (distant) to 1.0 (foreground)
  radius: number;
  vx: number;
  vy: number;
  baseAlpha: number;
  currentAlpha: number;
  pulseSpeed: number;
  pulsePhase: number;
  colorType: "gold" | "emerald" | "silver" | "teal";
}

export default function CinematicBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates for smooth parallax
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetCamX = 0;
    let targetCamY = 0;
    let camX = 0;
    let camY = 0;

    // Scroll tracker for subtle inertia
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    // Generate balanced cinema dust particles
    const particleCount = Math.min(Math.floor((width * height) / 18000), 75);
    const particles: Particle[] = [];

    const COLOR_PALETTES = {
      gold: { r: 220, g: 139, b: 32 },     // Cinematic warm #DC8B20
      emerald: { r: 220, g: 139, b: 32 },  // Tree Media signature #DC8B20
      silver: { r: 203, g: 213, b: 225 },   // Projector dust / 35mm silver
      teal: { r: 245, g: 158, b: 11 },      // Warm ambient amber
    };

    for (let i = 0; i < particleCount; i++) {
      const z = 0.15 + Math.random() * 0.85;
      const types: ("gold" | "emerald" | "silver" | "teal")[] = [
        "gold",
        "gold",
        "emerald",
        "silver",
        "silver",
        "teal",
      ];
      const colorType = types[Math.floor(Math.random() * types.length)];

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z,
        radius: (0.8 + Math.random() * 1.8) * z,
        vx: (Math.random() - 0.5) * 0.25 * z,
        vy: (-0.15 - Math.random() * 0.35) * z,
        baseAlpha: 0.15 + Math.random() * 0.45 * z,
        currentAlpha: 0.1,
        pulseSpeed: 0.008 + Math.random() * 0.015,
        pulsePhase: Math.random() * Math.PI * 2,
        colorType,
      });
    }

    // Handle mouse movement for subtle camera tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      targetCamX = (mouseX / width - 0.5) * 40; // Max 20px camera shift
      targetCamY = (mouseY / height - 0.5) * 30; // Max 15px camera shift
    };

    // Handle scroll inertia
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity = (currentScrollY - lastScrollY) * 0.15;
      lastScrollY = currentScrollY;
    };

    // Handle resize with resolution scaling
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    let lastTime = performance.now();
    let anamorphicPhase = 0;

    // Main render loop
    const render = (time: number) => {
      if (!isVisible) return;

      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Smooth camera interpolation (lerp)
      camX += (targetCamX - camX) * 0.04;
      camY += (targetCamY - camY) * 0.04;

      // Decay scroll velocity
      scrollVelocity *= 0.92;

      ctx.clearRect(0, 0, width, height);

      // 1. Subtle Anamorphic Lens Streak (YRF / Red Chillies cinema flare)
      anamorphicPhase += delta * 0.35;
      const flareGlow = 0.035 + Math.sin(anamorphicPhase) * 0.015;
      const flareY = height * 0.28 + camY * 0.5;

      const anamorphicGradient = ctx.createRadialGradient(
        width / 2 + camX * 0.8,
        flareY,
        0,
        width / 2 + camX * 0.8,
        flareY,
        width * 0.65
      );
      anamorphicGradient.addColorStop(
        0,
        `rgba(220, 139, 32, ${flareGlow * 1.5})`
      );
      anamorphicGradient.addColorStop(
        0.3,
        `rgba(217, 140, 25, ${flareGlow * 0.8})`
      );
      anamorphicGradient.addColorStop(
        0.7,
        `rgba(8, 145, 178, ${flareGlow * 0.3})`
      );
      anamorphicGradient.addColorStop(1, "rgba(248, 250, 252, 0)");

      ctx.fillStyle = anamorphicGradient;
      ctx.fillRect(0, 0, width, height);

      // 2. Render Floating 3D Cinema Dust Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          // Physics step
          p.x += p.vx + camX * 0.015 * p.z;
          p.y += p.vy - scrollVelocity * p.z * 0.05;

          // Pulse opacity for authentic cinema sparkle
          p.pulsePhase += p.pulseSpeed;
          const pulse = (Math.sin(p.pulsePhase) + 1) / 2;
          p.currentAlpha = p.baseAlpha * (0.6 + pulse * 0.4);

          // Wrap around edges seamlessly
          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
          if (p.y < -20) p.y = height + 20;
          if (p.y > height + 20) p.y = -20;
        }

        // Project particle coordinate with depth parallax
        const screenX = p.x + camX * p.z;
        const screenY = p.y + camY * p.z;

        const rgb = COLOR_PALETTES[p.colorType];

        // Draw soft bokeh halo for larger particles
        if (p.radius > 1.4) {
          const haloGrad = ctx.createRadialGradient(
            screenX,
            screenY,
            0,
            screenX,
            screenY,
            p.radius * 3.5
          );
          haloGrad.addColorStop(
            0,
            `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${p.currentAlpha * 0.6})`
          );
          haloGrad.addColorStop(
            1,
            `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`
          );
          ctx.fillStyle = haloGrad;
          ctx.beginPath();
          ctx.arc(screenX, screenY, p.radius * 3.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw core particle
        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${p.currentAlpha})`;
        ctx.beginPath();
        ctx.arc(screenX, screenY, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-85 transition-opacity duration-1000"
      />
      {/* Soundstage Vignette Overlay */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />
    </div>
  );
}
