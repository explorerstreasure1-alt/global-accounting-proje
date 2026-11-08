import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { BrandMark, Icon } from "@/components/site/icons";
import { isAuthenticated } from "@/lib/auth";
import { getSiteData } from "@/lib/content";
import { loginAction } from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Yönetim Girişi",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAuthenticated()) {
    redirect("/admin/dashboard");
  }

  const { error } = await searchParams;
  const { settings } = await getSiteData("tr");

  return (
    <div
      className="hero-shell relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10"
      style={{ ["--accent" as string]: settings.accentColor }}
    >
      <div className="grid-overlay pointer-events-none absolute inset-0" />
      <div className="relative w-full max-w-md">
        <div className="rounded-[1.8rem] border border-white/12 bg-white/[0.06] p-2 shadow-2xl backdrop-blur">
          <div className="rounded-[1.5rem] bg-white p-7 sm:p-8">
            <div className="flex items-center gap-2.5">
              <BrandMark siteName={settings.siteName} logoUrl={settings.logoUrl} />
              <div>
                <p className="text-[0.92rem] font-semibold leading-tight text-ink">
                  {settings.siteName}
                </p>
                <p className="text-[0.7rem] leading-tight text-ink/45">{settings.brandTagline}</p>
              </div>
            </div>

            <div className="mt-7">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-line bg-accent-soft px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-accent">
                <Icon name="lock" className="h-3 w-3" />
                Gizli panel
              </span>
              <h1 className="mt-3 text-xl font-semibold tracking-tight text-ink">
                Yönetim girişi
              </h1>
              <p className="mt-1.5 text-[0.8rem] leading-relaxed text-ink/55">
                Devam etmek için işletme yönetim şifresini girin. Bu sayfa arama motorlarına
                kapalıdır ve site menüsünde görünmez.
              </p>
            </div>

            {error ? (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-[0.78rem] font-medium text-red-700">
                Şifre hatalı. Lütfen tekrar deneyin.
              </div>
            ) : null}

            <form action={loginAction} className="mt-5 space-y-3">
              <div>
                <label className="admin-label" htmlFor="password">
                  Yönetim şifresi
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoFocus
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="admin-input"
                />
              </div>
              <button type="submit" className="btn-primary w-full px-4 py-3 text-sm">
                Panele giriş yap
                <Icon name="arrow" className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-5 flex items-center justify-between border-t border-black/[0.06] pt-4">
              <a
                href="/"
                className="inline-flex items-center gap-1.5 text-[0.75rem] font-medium text-ink/50 transition hover:text-accent"
              >
                <Icon name="left" className="h-3.5 w-3.5" />
                Tanıtım sayfasına dön
              </a>
              <span className="inline-flex items-center gap-1 text-[0.68rem] text-ink/35">
                <Icon name="shield" className="h-3 w-3" />
                Güvenli oturum
              </span>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-[0.68rem] leading-relaxed text-white/40">
          Şifre sunucu tarafında <code className="text-white/60">ADMIN_PASSWORD</code> ortam
          değişkeniyle belirlenir.
        </p>
      </div>
    </div>
  );
}
