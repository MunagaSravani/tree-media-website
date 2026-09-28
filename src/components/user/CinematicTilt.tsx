"use client";

import React, { useRef, useState, useCallback } from "react";

interface CinematicTiltProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // default: 4 degrees
  glare?: boolean;
}

export default function CinematicTilt({
  children,
  className = "",
  maxTilt = 4.5,
  glare = true,
}: CinematicTiltProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
  });
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({
    opacity: 0,
    transform: "translate(-50%, -50%)",
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      const xRatio = clientX / rect.width;
      const yRatio = clientY / rect.height;

      const rotateY = (xRatio - 0.5) * (maxTilt * 2);
      const rotateX = (0.5 - yRatio) * (maxTilt * 2);

      setTiltStyle({
        transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.018, 1.018, 1.018)`,
        transition: "transform 0.1s ease-out",
      });

      if (glare) {
        setGlareStyle({
          opacity: 0.14,
          left: `${(xRatio * 100).toFixed(1)}%`,
          top: `${(yRatio * 100).toFixed(1)}%`,
          transition: "opacity 0.2s ease-out",
        });
      }
    },
    [maxTilt, glare]
  );

  const handleMouseLeave = useCallback(() => {
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
    });

    if (glare) {
      setGlareStyle((prev) => ({
        ...prev,
        opacity: 0,
        transition: "opacity 0.4s ease-out",
      }));
    }
  }, [glare]);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      className={`relative will-change-transform ${className}`}
    >
      {children}

      {/* Dynamic Specular Sheen (Catches cursor light) */}
      {glare && (
        <div
          aria-hidden="true"
          style={glareStyle}
          className="pointer-events-none absolute w-[220%] h-[220%] rounded-full -translate-x-1/2 -translate-y-1/2 bg-radial from-white/25 via-emerald-400/10 to-transparent mix-blend-overlay z-20"
        />
      )}
    </div>
  );
}
