import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import {
  BenefitPanel,
  FaqPanel,
  FeaturePanel,
  GalleryPanel,
  VideoPanel,
} from "@/components/admin/ItemPanels";
import { SettingsPanel } from "@/components/admin/SettingsPanel";
import { isAuthenticated } from "@/lib/auth";
import { ADMIN_TABS } from "@/lib/admin-fields";
import { getSiteData } from "@/lib/content";
import { DEFAULT_LOCALE, isLocale } from "@/lib/locales";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Yönetim Paneli",
  robots: { index: false, follow: false },
};

const SETTINGS_TABS = new Set<string>(["genel", "hakkinda", "bolumler", "iletisim", "seo"]);

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; ok?: string; lang?: string }>;
}) {
  if (!(await isAuthenticated())) {
    redirect("/admin");
  }

  const { tab, ok, lang } = await searchParams;
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const data = await getSiteData(locale, true);
  const activeTab = ADMIN_TABS.find((item) => item.id === tab)?.id ?? "genel";

  return (
    <AdminShell settings={data.settings} activeTab={activeTab} message={ok} locale={locale}>
      {SETTINGS_TABS.has(activeTab) ? (
        <SettingsPanel groupId={activeTab} settings={data.settings} locale={locale} />
      ) : null}
      {activeTab === "ozellikler" ? <FeaturePanel items={data.features} locale={locale} /> : null}
      {activeTab === "neden" ? <BenefitPanel items={data.benefits} locale={locale} /> : null}
      {activeTab === "galeri" ? <GalleryPanel items={data.gallery} locale={locale} /> : null}
      {activeTab === "videolar" ? <VideoPanel items={data.videos} locale={locale} /> : null}
      {activeTab === "sss" ? <FaqPanel items={data.faqs} locale={locale} /> : null}
    </AdminShell>
  );
}
