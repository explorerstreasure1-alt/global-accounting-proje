import type { SiteSettings } from "@/db/schema";
import { splitLines } from "@/lib/text";
import { Icon } from "./icons";
import { t, type Locale } from "@/lib/locales";

export function Hero({ settings, locale }: { settings: SiteSettings; locale: Locale }) {
  const dict = t(locale);
  const highlights = splitLines(settings.heroHighlights);
  const stats = [
    { value: settings.stat1Value, label: settings.stat1Label },
    { value: settings.stat2Value, label: settings.stat2Label },
    { value: settings.stat3Value, label: settings.stat3Label },
  ].filter((stat) => stat.value || stat.label);

  return (
    <section id="top" className="mx-auto max-w-6xl px-4 pt-4 sm:pt-6">
      <div className="hero-shell relative overflow-hidden rounded-[2rem] px-5 py-10 sm:px-10 sm:py-14 lg:px-14">
        <div className="grid-overlay pointer-events-none absolute inset-0" />
        <div
          className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full opacity-40 blur-3xl"
          style={{ backgroundColor: "var(--accent)" }}
        />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div>
            {settings.heroEyebrow ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[0.7rem] font-medium tracking-wide text-white/80 backdrop-blur">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: "var(--accent)" }}
                />
                {settings.heroEyebrow}
              </span>
            ) : null}

            <h1 className="mt-5 text-[2rem] font-semibold leading-[1.08] tracking-tight text-white sm:text-[2.7rem] lg:text-[3.15rem]">
              {settings.heroTitle}{" "}
              {settings.heroTitleAccent ? (
                <span className="accent-text-gradient">{settings.heroTitleAccent}</span>
              ) : null}
            </h1>

            {settings.heroDescription ? (
              <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-white/65 sm:text-base">
                {settings.heroDescription}
              </p>
            ) : null}

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={settings.appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-6 py-3.5 text-sm shadow-lg"
              >
                {settings.heroPrimaryCta || dict.openApp}
                <Icon name="arrow" className="h-4 w-4" />
              </a>
              <a href="#ozellikler" className="btn-ghost px-6 py-3.5 text-sm">
                {settings.heroSecondaryCta || dict.exploreFeatures}
              </a>
            </div>

            {highlights.length > 0 ? (
              <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
                {highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-[0.82rem] leading-snug text-white/70"
                  >
                    <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-white/10">
                      <Icon
                        name="check"
                        className="h-2.5 w-2.5"
                        style={{ color: "var(--accent)" }}
                      />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}

            {settings.heroNote ? (
              <p className="mt-6 max-w-md text-[0.72rem] leading-relaxed text-white/40">
                {settings.heroNote}
              </p>
            ) : null}
          </div>

          {settings.heroImageUrl ? (
            <div className="relative mx-auto w-full max-w-[22rem] lg:max-w-none">
              <div className="relative rounded-[1.9rem] border border-white/15 bg-white/[0.06] p-2 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] backdrop-blur">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={settings.heroImageUrl}
                  alt={`${settings.siteName} uygulaması`}
                  className="aspect-[4/5] w-full rounded-[1.5rem] object-cover"
                />
              </div>

              <div className="animate-float-slow absolute -left-2 top-8 hidden items-center gap-2.5 rounded-xl border border-white/15 bg-ink-900/85 px-3 py-2 text-white shadow-xl backdrop-blur sm:flex">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent-soft text-accent">
                  <Icon name="chart" className="h-4 w-4" />
                </span>
                <span className="text-[0.7rem] leading-tight">
                  <span className="block font-semibold">{dict.heroCard1Title}</span>
                  <span className="block text-white/50">{dict.heroCard1Sub}</span>
                </span>
              </div>

              <div className="animate-float-slower absolute -bottom-4 right-0 flex items-center gap-2.5 rounded-xl border border-white/15 bg-white px-3 py-2 text-ink shadow-xl">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#25d366]/15 text-[#128c48]">
                  <Icon name="message" className="h-4 w-4" />
                </span>
                <span className="text-[0.7rem] leading-tight">
                  <span className="block font-semibold">{dict.heroCard2Title}</span>
                  <span className="block text-ink/50">{dict.heroCard2Sub}</span>
                </span>
              </div>
            </div>
          ) : null}
        </div>

        {stats.length > 0 ? (
          <div className="relative mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:mt-12 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white/[0.04] px-5 py-4 backdrop-blur">
                <p className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-[0.72rem] text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
