"use client";

import { useEffect } from "react";
import { X, Play } from "lucide-react";

interface MediaLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  mediaUrl: string;
  mediaType: "image" | "video";
  title?: string;
  description?: string;
}

export default function MediaLightbox({
  isOpen,
  onClose,
  mediaUrl,
  mediaType,
  title,
  description,
}: MediaLightboxProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !mediaUrl) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center">
        {mediaType === "video" ? (
          <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10">
            <video
              src={mediaUrl}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          </div>
        ) : (
          <div className="max-h-[80vh] overflow-hidden rounded-2xl bg-black/50 shadow-2xl border border-white/10">
            <img
              src={mediaUrl}
              alt={title || "Media Preview"}
              className="max-h-[80vh] w-auto object-contain"
            />
          </div>
        )}

        {(title || description) && (
          <div className="mt-4 text-center max-w-2xl px-4">
            {title && <h3 className="text-lg font-bold text-white">{title}</h3>}
            {description && <p className="text-sm text-gray-400 mt-1">{description}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
