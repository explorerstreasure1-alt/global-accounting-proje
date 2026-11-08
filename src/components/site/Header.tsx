import type { SiteSettings } from "@/db/schema";
import { BrandMark, Icon } from "./icons";
import { LanguageSwitcher } from "./LanguagePicker";
import { t, type Locale } from "@/lib/locales";

export function Header({ settings, locale }: { settings: SiteSettings; locale: Locale }) {
  const dict = t(locale);
  const NAV_LINKS = [
    { href: "#hakkinda", label: dict.nav.about },
    { href: "#ozellikler", label: dict.nav.features },
    { href: "#neden", label: dict.nav.why },
    { href: "#galeri", label: dict.nav.gallery },
    { href: "#videolar", label: dict.nav.videos },
    { href: "#sss", label: dict.nav.faq },
  ];
  return (
    <header className="sticky top-0 z-40 w-full px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-2xl border border-black/[0.06] bg-white/85 px-3 py-2.5 shadow-[0_18px_40px_-32px_rgba(7,30,22,0.55)] backdrop-blur-xl sm:px-4">
        <a href="#top" className="flex min-w-0 items-center gap-2.5">
          <BrandMark siteName={settings.siteName} logoUrl={settings.logoUrl} />
          <span className="min-w-0">
            <span className="block truncate text-[0.95rem] font-semibold leading-tight tracking-tight text-ink">
              {settings.siteName}
            </span>
            <span className="block truncate text-[0.7rem] leading-tight text-ink/50">
              {settings.brandTagline}
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-[0.82rem] font-medium text-ink/65 transition hover:bg-black/[0.04] hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher current={locale} compact />
          <a
            href={settings.appUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hidden px-4 py-2.5 text-[0.82rem] sm:inline-flex"
          >
            {settings.heroPrimaryCta || dict.openApp}
            <Icon name="external" className="h-3.5 w-3.5" />
          </a>

          <details className="group relative lg:hidden">
            <summary className="grid h-10 w-10 cursor-pointer place-items-center rounded-xl border border-black/[0.08] bg-white text-ink transition hover:bg-black/[0.03]">
              <Icon name="menu" className="h-5 w-5" />
            </summary>
            <div className="absolute right-0 top-full z-50 mt-2 w-60 origin-top-right rounded-2xl border border-black/[0.07] bg-white p-2 shadow-2xl">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block rounded-xl px-3 py-2.5 text-sm font-medium text-ink/75 transition hover:bg-cream hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={settings.appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-1 w-full px-3 py-2.5 text-sm"
              >
                {settings.heroPrimaryCta || dict.openApp}
                <Icon name="external" className="h-4 w-4" />
              </a>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
