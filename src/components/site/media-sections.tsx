"use client";

import { useCallback, useEffect, useState } from "react";
import type { GalleryItem, SiteSettings, Video } from "@/db/schema";
import { parseVideoUrl } from "@/lib/video";
import { Icon } from "./icons";
import { SectionHeading } from "./SectionHeading";
import { t, type Locale } from "@/lib/locales";

export function GallerySection({
  settings,
  items,
  locale,
}: {
  settings: SiteSettings;
  items: GalleryItem[];
  locale: Locale;
}) {
  const dict = t(locale);
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (direction: number) => {
      setActive((current) => {
        if (current === null || items.length === 0) return current;
        return (current + direction + items.length) % items.length;
      });
    },
    [items.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [active, close, step]);

  if (items.length === 0) return null;
  const current = active !== null ? items[active] : null;

  return (
    <section id="galeri" className="mx-auto max-w-6xl px-4 pb-16 sm:pb-20">
      <SectionHeading
        eyebrow={dict.eyebrow.gallery}
        title={settings.galleryTitle}
        subtitle={settings.gallerySubtitle}
      />

      <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(index)}
            className="group relative aspect-square overflow-hidden rounded-2xl border border-black/[0.06] bg-cream text-left"
            aria-label={item.title}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.imageUrl}
              alt={item.title || settings.galleryTitle}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
              loading="lazy"
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-90" />
            <span className="pointer-events-none absolute inset-x-3 bottom-3">
              <span className="block text-[0.8rem] font-semibold leading-tight text-white">
                {item.title}
              </span>
              {item.description ? (
                <span className="mt-0.5 line-clamp-2 block text-[0.68rem] leading-snug text-white/65">
                  {item.description}
                </span>
              ) : null}
            </span>
            <span className="absolute right-2.5 top-2.5 grid h-7 w-7 place-items-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
              <Icon name="external" className="h-3.5 w-3.5" />
            </span>
          </button>
        ))}
      </div>

      {current ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label={dict.close}
          >
            <Icon name="close" className="h-5 w-5" />
          </button>
          {items.length > 1 ? (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  step(-1);
                }}
                className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-6"
                aria-label={dict.prev}
              >
                <Icon name="left" className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  step(1);
                }}
                className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-6"
                aria-label={dict.next}
              >
                <Icon name="right" className="h-5 w-5" />
              </button>
            </>
          ) : null}
          <figure
            className="max-h-full w-full max-w-4xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.imageUrl}
              alt={current.title}
              className="mx-auto max-h-[72vh] w-auto rounded-2xl object-contain"
            />
            <figcaption className="mx-auto mt-4 max-w-xl text-center">
              <p className="text-sm font-semibold text-white">{current.title}</p>
              {current.description ? (
                <p className="mt-1 text-[0.8rem] text-white/60">{current.description}</p>
              ) : null}
            </figcaption>
          </figure>
        </div>
      ) : null}
    </section>
  );
}


export function VideoSection({
  settings,
  items,
  locale,
}: {
  settings: SiteSettings;
  items: Video[];
  locale: Locale;
}) {
  const dict = t(locale);
  const playable = items.filter((item) => item.videoUrl.trim().length > 0);
  const featuredIndex = Math.max(0, playable.findIndex((item) => item.isFeatured));
  const [activeIndex, setActiveIndex] = useState(featuredIndex);
  const [autoplay, setAutoplay] = useState(false);

  useEffect(() => {
    setActiveIndex(featuredIndex);
    setAutoplay(false);
  }, [featuredIndex, locale]);

  if (playable.length === 0) return null;
  const current = playable[Math.min(activeIndex, playable.length - 1)];
  const parsed = parseVideoUrl(current.videoUrl);

  const select = (index: number) => {
    setActiveIndex(index);
    setAutoplay(true);
  };

  return (
    <section id="videolar" className="mx-auto max-w-6xl px-4 pb-16 sm:pb-20">
      <SectionHeading
        eyebrow={dict.eyebrow.video}
        title={settings.videosTitle}
        subtitle={settings.videosSubtitle}
      />

      <div className="mt-10 grid gap-4 lg:grid-cols-[1.5fr_1fr] lg:items-start">
        <div className="overflow-hidden rounded-[1.5rem] border border-black/[0.06] bg-ink shadow-[0_30px_60px_-40px_rgba(7,30,22,0.7)]">
          <div className="aspect-video w-full bg-black">
            {parsed?.kind === "file" ? (
              <video
                key={current.id}
                src={parsed.url}
                poster={current.thumbnailUrl || undefined}
                controls
                autoPlay={autoplay}
                playsInline
                preload="metadata"
                className="h-full w-full"
              />
            ) : parsed ? (
              <iframe
                key={current.id}
                src={autoplay ? parsed.url : parsed.url.replace("autoplay=1", "autoplay=0")}
                title={current.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full border-0"
              />
            ) : null}
          </div>
          <div className="flex items-start gap-3 px-5 py-4">
            <span
              className="mt-0.5 inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-wider text-ink"
              style={{ backgroundColor: "var(--accent)" }}
            >
              <Icon name="play" className="h-2.5 w-2.5" />
              {current.chapter || `${dict.chapter} ${activeIndex + 1}`}
            </span>
            <div className="min-w-0">
              <p className="text-[0.95rem] font-semibold leading-snug text-white">{current.title}</p>
              {current.description ? (
                <p className="mt-1 text-[0.78rem] leading-relaxed text-white/55">{current.description}</p>
              ) : null}
            </div>
          </div>
        </div>

        <aside className="rounded-[1.5rem] border border-black/[0.06] bg-white p-3 shadow-sm">
          <div className="flex items-center justify-between px-2 pb-2 pt-1">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink/45">
              {dict.chapters}
            </p>
            <span className="rounded-full bg-cream px-2 py-0.5 text-[0.65rem] font-semibold text-ink/50">
              {playable.length}
            </span>
          </div>
          <ol className="no-scrollbar max-h-[30rem] space-y-1.5 overflow-y-auto">
            {playable.map((item, index) => {
              const active = index === activeIndex;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => select(index)}
                    aria-current={active ? "true" : undefined}
                    className={`group flex w-full items-start gap-3 rounded-2xl border p-2.5 text-left transition ${
                      active
                        ? "border-accent bg-accent-soft shadow-sm"
                        : "border-transparent hover:border-black/[0.06] hover:bg-cream"
                    }`}
                  >
                    <span className="relative aspect-video w-24 shrink-0 overflow-hidden rounded-xl bg-ink">
                      {item.thumbnailUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.thumbnailUrl}
                          alt={item.title}
                          className="h-full w-full object-cover opacity-90"
                        />
                      ) : (
                        <span className="hero-shell absolute inset-0" />
                      )}
                      <span className="absolute inset-0 grid place-items-center">
                        <span
                          className={`grid h-7 w-7 place-items-center rounded-full shadow ${
                            active ? "bg-white text-accent" : "bg-white/90 text-ink"
                          }`}
                        >
                          <Icon name="play" className="ml-0.5 h-3 w-3" />
                        </span>
                      </span>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span
                          className={`text-[0.6rem] font-semibold uppercase tracking-wider ${
                            active ? "text-accent" : "text-ink/40"
                          }`}
                        >
                          {item.chapter || `${dict.chapter} ${index + 1}`}
                        </span>
                        {active ? (
                          <span className="text-[0.58rem] font-medium text-accent">• {dict.nowPlaying}</span>
                        ) : null}
                      </span>
                      <span className="mt-0.5 block text-[0.82rem] font-semibold leading-snug text-ink">
                        {item.title}
                      </span>
                      {item.description ? (
                        <span className="mt-0.5 line-clamp-2 block text-[0.7rem] leading-snug text-ink/50">
                          {item.description}
                        </span>
                      ) : null}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
          <p className="mt-2 px-2 pb-1 text-[0.68rem] leading-relaxed text-ink/40">{dict.videosHint}</p>
        </aside>
      </div>
    </section>
  );
}
