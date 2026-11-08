import type { ReactNode } from "react";
import { logoutAction } from "@/app/admin/actions";
import { BrandMark, Icon } from "@/components/site/icons";
import type { SiteSettings } from "@/db/schema";
import { ADMIN_TABS } from "@/lib/admin-fields";
import { LOCALES, type Locale } from "@/lib/locales";

export function AdminShell({
  settings,
  activeTab,
  message,
  locale,
  children,
}: {
  settings: SiteSettings;
  activeTab: string;
  message?: string;
  locale: Locale;
  children: ReactNode;
}) {
  const localeIndependent = activeTab === "galeri";
  return (
    <div
      className="min-h-screen bg-[#f2f5f0]"
      style={{ ["--accent" as string]: settings.accentColor }}
    >
      <header className="sticky top-0 z-30 border-b border-black/[0.06] bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <BrandMark siteName={settings.siteName} logoUrl={settings.logoUrl} />
            <div>
              <p className="text-[0.9rem] font-semibold leading-tight text-ink">
                {settings.siteName}
              </p>
              <p className="text-[0.68rem] leading-tight text-ink/45">
                İçerik yönetim paneli
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-2 text-[0.75rem] font-semibold text-ink/70 transition hover:border-accent hover:text-accent"
            >
              <Icon name="external" className="h-3.5 w-3.5" />
              Siteyi gör
            </a>
            <form action={logoutAction}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-2 text-[0.75rem] font-semibold text-ink/60 transition hover:border-red-300 hover:text-red-600"
              >
                <Icon name="lock" className="h-3.5 w-3.5" />
                Çıkış
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl gap-5 px-4 py-5 lg:grid lg:grid-cols-[15.5rem_1fr]">
        <aside className="mb-4 lg:mb-0">
          <div className="rounded-2xl border border-black/[0.06] bg-ink p-3 shadow-lg lg:sticky lg:top-[5.2rem]">
            <p className="px-2 pb-2 pt-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/35">
              Bölümler
            </p>
            <nav className="no-scrollbar flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
              {ADMIN_TABS.map((tab) => {
                const active = tab.id === activeTab;
                return (
                  <a
                    key={tab.id}
                    href={`/admin/dashboard?tab=${tab.id}&lang=${locale}`}
                    className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-[0.78rem] font-medium transition ${
                      active
                        ? "bg-white text-ink shadow-sm"
                        : "text-white/60 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        active ? "" : "bg-white/20"
                      }`}
                      style={active ? { backgroundColor: "var(--accent)" } : undefined}
                    />
                    {tab.label}
                  </a>
                );
              })}
            </nav>

            <div className="mt-3 hidden rounded-xl border border-white/10 bg-white/[0.04] p-3 lg:block">
              <div className="flex items-center gap-2">
                <Icon name="qr" className="h-4 w-4 text-white/60" />
                <p className="text-[0.7rem] font-semibold text-white/70">Karekod hedefi</p>
              </div>
              <p className="mt-1.5 break-all text-[0.66rem] leading-relaxed text-white/40">
                {settings.appUrl.replace(/^https?:\/\//, "")}
              </p>
              <a
                href={`/admin/dashboard?tab=iletisim&lang=${locale}`}
                className="mt-2 inline-flex items-center gap-1 text-[0.68rem] font-semibold"
                style={{ color: "var(--accent)" }}
              >
                Düzenle
                <Icon name="arrow" className="h-3 w-3" />
              </a>
            </div>
          </div>
        </aside>

        <main className="min-w-0 space-y-4">
          <div className="rounded-2xl border border-black/[0.07] bg-white p-3 shadow-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink/45">
                İçerik dili
              </span>
              <div className="no-scrollbar flex flex-1 gap-1.5 overflow-x-auto">
                {LOCALES.map((item) => {
                  const active = item.code === locale;
                  return (
                    <a
                      key={item.code}
                      href={`/admin/dashboard?tab=${activeTab}&lang=${item.code}`}
                      className={`flex shrink-0 items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-[0.75rem] font-medium transition ${
                        active
                          ? "border-accent bg-accent-soft text-ink"
                          : "border-black/[0.08] text-ink/60 hover:border-accent-line hover:text-ink"
                      }`}
                    >
                      <span className="rounded-md bg-black/[0.06] px-1.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide text-ink/60">{item.code}</span>
                      {item.label}
                    </a>
                  );
                })}
              </div>
            </div>
            <p className="mt-2 px-1 text-[0.7rem] leading-relaxed text-ink/45">
              {localeIndependent
                ? "Galeri görselleri tüm dillerde ortaktır."
                : "Bu sekmedeki metin ve videolar yalnızca seçili dilde yayınlanır. Ziyaretçi dilini seçtiğinde o dilin içeriği ve videoları gösterilir. Logo, uygulama adresi, renk ve iletişim bilgileri tüm dillere otomatik yansır."}
            </p>
          </div>
          {message ? (
            <div
              className={`flex items-start gap-2 rounded-2xl border px-4 py-3 text-[0.8rem] ${
                message.startsWith("Hata")
                  ? "border-amber-300 bg-amber-50 text-amber-800"
                  : "border-accent-line bg-white text-ink/70"
              }`}
            >
              <Icon
                name={message.startsWith("Hata") ? "spark" : "check"}
                className="mt-0.5 h-4 w-4 shrink-0"
                style={{ color: message.startsWith("Hata") ? undefined : "var(--accent)" }}
              />
              {message}
            </div>
          ) : null}
          {children}
        </main>
      </div>
    </div>
  );
}
