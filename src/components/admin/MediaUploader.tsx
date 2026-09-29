"use client";

import { useState, useRef } from "react";
import { Upload, Check, AlertCircle, Loader2, Image as ImageIcon, Link as LinkIcon } from "lucide-react";

interface MediaUploaderProps {
  label: string;
  value?: string;
  onChange: (url: string) => void;
  accept?: string;
  helperText?: string;
}

export default function MediaUploader({
  label,
  value,
  onChange,
  accept = "image/*,video/*",
  helperText,
}: MediaUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [manualUrl, setManualUrl] = useState(value || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      onChange(data.url);
      setManualUrl(data.url);
    } catch (err: any) {
      setError(err.message || "Failed to upload file");
    } finally {
      setUploading(false);
    }
  }

  function handleManualUrlSubmit() {
    if (manualUrl.trim()) {
      onChange(manualUrl.trim());
      setShowUrlInput(false);
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-700">{label}</label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[11px] text-[#DC8B20] hover:text-[#DC8B20] flex items-center gap-1 cursor-pointer font-medium"
        >
          <LinkIcon className="w-3 h-3" />
          <span>{showUrlInput ? "Upload File" : "Paste URL"}</span>
        </button>
      </div>

      {showUrlInput ? (
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="https://images.unsplash.com/... or /uploads/..."
            value={manualUrl}
            onChange={(e) => setManualUrl(e.target.value)}
            className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#DC8B20] focus:outline-none"
          />
          <button
            type="button"
            onClick={handleManualUrlSubmit}
            className="px-3 py-2 rounded-xl bg-[#DC8B20] hover:bg-[#DC8B20] text-white text-xs font-semibold cursor-pointer"
          >
            Apply
          </button>
        </div>
      ) : (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer border-2 border-dashed border-slate-300 hover:border-[#DC8B20]/300 rounded-xl p-4 text-center bg-slate-50 hover:bg-[#DC8B20]/10 transition-colors"
          >
            {uploading ? (
              <div className="flex flex-col items-center justify-center py-2 space-y-2">
                <Loader2 className="w-6 h-6 text-[#DC8B20] animate-spin" />
                <span className="text-xs text-slate-500">Uploading media asset...</span>
              </div>
            ) : value ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 truncate">
                  <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                    {value.includes(".mp4") || value.includes(".webm") ? (
                      <span className="text-[10px] font-bold text-cyan-600">VIDEO</span>
                    ) : (
                      <img src={value} alt="Preview" className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="text-left truncate">
                    <span className="text-xs text-[#DC8B20] font-medium block truncate max-w-[200px]">
                      {value}
                    </span>
                    <span className="text-[10px] text-slate-400">Click to replace file</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-[#DC8B20]/10 text-[#DC8B20] border border-[#DC8B20]/30 text-[11px] font-medium shrink-0">
                  Replace
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-3 space-y-1.5">
                <Upload className="w-6 h-6 text-slate-400" />
                <p className="text-xs text-slate-600">
                  <span className="text-[#DC8B20] font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-[10px] text-slate-400">PNG, JPG, WebP, MP4 up to 50MB</p>
              </div>
            )}
          </div>
        </div>
      )}

      {error && (
        <p className="text-[11px] text-red-600 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          <span>{error}</span>
        </p>
      )}

      {helperText && <p className="text-[10px] text-slate-400">{helperText}</p>}
    </div>
  );
}
