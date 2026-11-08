"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "./icons";
import { LOCALES, LOCALE_COOKIE, WELCOME_EN, t, type Locale } from "@/lib/locales";

function persist(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
}

export function LocaleBadge({ code, active = false }: { code: string; active?: boolean }) {
  return (
    <span
      className={`grid h-7 w-8 shrink-0 place-items-center rounded-md text-[0.62rem] font-bold uppercase tracking-wide ${
        active ? "text-white" : "bg-black/[0.05] text-ink/55"
      }`}
      style={active ? { backgroundColor: "var(--accent)" } : undefined}
      aria-hidden="true"
    >
      {code}
    </span>
  );
}

/**
 * Gentle first-visit prompt. The question itself is always asked in English
 * ("What is your native language?"); the button also echoes the chosen language.
 */
export function LanguageWelcome({ current, show }: { current: Locale; show: boolean }) {
  const [open, setOpen] = useState(show);
  const [selected, setSelected] = useState<Locale>(current);
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const nativeContinue = t(selected).langContinue;

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  const confirm = () => {
    persist(selected);
    setOpen(false);
    startTransition(() => router.refresh());
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/60 p-3 backdrop-blur-sm sm:items-center sm:p-6"
      dir="ltr"
      lang="en"
    >
      <div className="w-full max-w-lg overflow-hidden rounded-[1.6rem] border border-white/20 bg-white shadow-2xl">
        <div className="hero-shell relative px-6 py-5 text-white">
          <div className="grid-overlay pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/15 text-xl">🌍</span>
            <div>
              <p className="text-base font-semibold leading-tight">{WELCOME_EN.title}</p>
              <p className="mt-0.5 text-[0.72rem] text-white/60">{WELCOME_EN.note}</p>
            </div>
          </div>
        </div>

        <div className="p-5">
          <p className="text-[0.82rem] leading-relaxed text-ink/60">{WELCOME_EN.text}</p>

          <div className="mt-4 grid grid-cols-2 gap-2">
            {LOCALES.map((item) => {
              const active = item.code === selected;
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => setSelected(item.code)}
                  className={`flex items-center gap-2.5 rounded-xl border px-2.5 py-2 text-left transition ${
                    active
                      ? "border-accent bg-accent-soft text-ink shadow-sm"
                      : "border-black/[0.08] bg-white text-ink/70 hover:border-accent-line hover:bg-cream"
                  }`}
                  aria-pressed={active}
                  lang={item.code}
                  dir={item.dir}
                >
                  <LocaleBadge code={item.code} active={active} />
                  <span className="flex-1 text-[0.9rem] font-medium">{item.label}</span>
                  {active ? <Icon name="check" className="h-4 w-4 text-accent" /> : null}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={confirm}
            disabled={pending}
            className="btn-primary mt-4 w-full px-4 py-3 text-sm disabled:opacity-70"
          >
            {WELCOME_EN.continue}
            {selected !== "en" ? (
              <span className="font-medium opacity-70">· {nativeContinue}</span>
            ) : null}
            <Icon name="arrow" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/** Compact language switcher used in the header. */
export function LanguageSwitcher({ current, compact = false }: { current: Locale; compact?: boolean }) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const info = LOCALES.find((l) => l.code === current) ?? LOCALES[0];

  const change = (locale: Locale) => {
    persist(locale);
    startTransition(() => router.refresh());
  };

  return (
    <details className="group relative">
      <summary
        className={`flex cursor-pointer items-center gap-1.5 rounded-xl border border-black/[0.08] bg-white text-[0.78rem] font-medium text-ink/75 transition hover:bg-black/[0.03] ${
          compact ? "h-10 px-2" : "h-10 px-3"
        }`}
        aria-label={t(current).language}
      >
        <LocaleBadge code={info.code} active />
        <span className="hidden sm:inline">{info.label}</span>
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-ink/40 transition group-open:rotate-180" fill="none">
          <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>
      <div className="absolute end-0 top-full z-50 mt-2 w-48 rounded-2xl border border-black/[0.07] bg-white p-1.5 shadow-2xl">
        {LOCALES.map((item) => (
          <button
            key={item.code}
            type="button"
            onClick={() => change(item.code)}
            lang={item.code}
            dir={item.dir}
            className={`flex w-full items-center gap-2 rounded-xl px-2 py-1.5 text-left text-[0.8rem] transition hover:bg-cream ${
              item.code === current ? "font-semibold text-ink" : "text-ink/70"
            }`}
          >
            <LocaleBadge code={item.code} active={item.code === current} />
            <span className="flex-1">{item.label}</span>
            {item.code === current ? <Icon name="check" className="h-3.5 w-3.5 text-accent" /> : null}
          </button>
        ))}
      </div>
    </details>
  );
}
