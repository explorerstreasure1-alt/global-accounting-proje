"use client";

import { useRef, useState } from "react";
import { Icon } from "@/components/site/icons";

type MediaFieldProps = {
  name: string;
  label: string;
  defaultValue?: string;
  kind?: "image" | "video" | "any";
  help?: string;
};

export function MediaField({
  name,
  label,
  defaultValue = "",
  kind = "image",
  help,
}: MediaFieldProps) {
  const [value, setValue] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const accept =
    kind === "image" ? "image/*" : kind === "video" ? "video/*" : "image/*,video/*";

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const body = new FormData();
      body.append("file", file);
      const response = await fetch("/api/admin/upload", { method: "POST", body });
      const json = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !json.url) {
        setError(json.error ?? "Yükleme başarısız oldu.");
        return;
      }
      setValue(json.url);
    } catch {
      setError("Yükleme sırasında bir hata oluştu.");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  const looksLikeVideo = /\.(mp4|webm|ogg|mov|m4v)(\?|$)/i.test(value);

  return (
    <div>
      <label className="admin-label" htmlFor={`${name}-url`}>
        {label}
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id={`${name}-url`}
          name={name}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="admin-input"
          placeholder="https://... veya /images/dosya.jpg"
        />
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={busy}
            className="inline-flex items-center gap-1.5 rounded-xl border border-black/10 bg-white px-3 py-2 text-[0.75rem] font-semibold text-ink/70 transition hover:border-accent hover:text-accent disabled:opacity-60"
          >
            <Icon name={busy ? "clock" : "spark"} className="h-3.5 w-3.5" />
            {busy ? "Yükleniyor" : "Dosya seç"}
          </button>
          {value ? (
            <button
              type="button"
              onClick={() => setValue("")}
              className="inline-flex items-center rounded-xl border border-black/10 bg-white px-2.5 py-2 text-[0.75rem] font-medium text-red-600 transition hover:border-red-300"
            >
              Kaldır
            </button>
          ) : null}
        </div>
      </div>
      <input
        ref={fileRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(event) => void handleFile(event.target.files?.[0])}
      />

      {error ? <p className="mt-1.5 text-[0.72rem] text-red-600">{error}</p> : null}
      {help ? <p className="mt-1.5 text-[0.7rem] leading-relaxed text-ink/45">{help}</p> : null}

      {value ? (
        <div className="mt-2 flex items-center gap-3 rounded-xl border border-black/[0.07] bg-cream/60 p-2">
          {looksLikeVideo ? (
            <video src={value} muted className="h-14 w-20 rounded-lg bg-ink object-cover" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={value}
              alt="Önizleme"
              className="h-14 w-20 rounded-lg border border-black/[0.06] bg-white object-cover"
            />
          )}
          <p className="min-w-0 flex-1 truncate text-[0.7rem] text-ink/50">{value}</p>
        </div>
      ) : null}
    </div>
  );
}
