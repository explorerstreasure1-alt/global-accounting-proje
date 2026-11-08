import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { getSiteData } from "@/lib/content";
import { resolveLocale } from "@/lib/locale-server";
import { localeInfo } from "@/lib/locales";
import { LanguageWelcome } from "@/components/site/LanguagePicker";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { GallerySection, VideoSection } from "@/components/site/media-sections";
import {
  About,
  Benefits,
  ContactQr,
  FaqSection,
  Features,
  Footer,
} from "@/components/site/sections";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await resolveLocale();
  const { settings } = await getSiteData(locale);
  const title = settings.seoTitle || `${settings.siteName} — ${settings.brandTagline}`;
  return {
    title,
    description: settings.seoDescription || settings.heroDescription,
    openGraph: {
      title,
      description: settings.seoDescription || settings.heroDescription,
      type: "website",
      images: settings.heroImageUrl ? [settings.heroImageUrl] : undefined,
    },
    alternates: { canonical: "/" },
  };
}

export default async function HomePage() {
  const { locale, chosen } = await resolveLocale();
  const { settings, features, benefits, gallery, videos, faqs } = await getSiteData(locale);
  const dir = localeInfo(locale).dir;

  return (
    <div
      lang={locale}
      dir={dir}
      style={{ "--accent": settings.accentColor } as CSSProperties}
      className="min-h-screen"
    >
      <LanguageWelcome current={locale} show={!chosen} />
      <Header settings={settings} locale={locale} />
      <main>
        <Hero settings={settings} locale={locale} />
        <About settings={settings} locale={locale} />
        <Features settings={settings} items={features} locale={locale} />
        <Benefits settings={settings} items={benefits} locale={locale} />
        <GallerySection settings={settings} items={gallery} locale={locale} />
        <VideoSection settings={settings} items={videos} locale={locale} />
        <FaqSection settings={settings} items={faqs} locale={locale} />
        <ContactQr settings={settings} locale={locale} />
      </main>
      <Footer settings={settings} locale={locale} />
    </div>
  );
}
