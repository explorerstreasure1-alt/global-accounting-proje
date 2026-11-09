import type { Locale } from "./locales";
import { LOCALE_CONTENT } from "./translations";

export const SETTINGS_FIELDS = [
  "siteName",
  "brandTagline",
  "logoUrl",
  "appUrl",
  "accentColor",
  "heroEyebrow",
  "heroTitle",
  "heroTitleAccent",
  "heroDescription",
  "heroPrimaryCta",
  "heroSecondaryCta",
  "heroImageUrl",
  "heroHighlights",
  "heroNote",
  "stat1Value",
  "stat1Label",
  "stat2Value",
  "stat2Label",
  "stat3Value",
  "stat3Label",
  "aboutEyebrow",
  "aboutTitle",
  "aboutText",
  "aboutImageUrl",
  "aboutVideoUrl",
  "aboutBullets",
  "featuresTitle",
  "featuresSubtitle",
  "benefitsTitle",
  "benefitsSubtitle",
  "galleryTitle",
  "gallerySubtitle",
  "videosTitle",
  "videosSubtitle",
  "faqTitle",
  "faqSubtitle",
  "contactTitle",
  "contactDescription",
  "qrTitle",
  "qrDescription",
  "qrNote",
  "contactWhatsapp",
  "contactEmail",
  "contactPhone",
  "contactAddress",
  "contactHours",
  "footerNote",
  "seoTitle",
  "seoDescription",
] as const;

export type SettingsFieldKey = (typeof SETTINGS_FIELDS)[number];

export const APP_URL = "https://global-accounting-omega.vercel.app";

/** Language-independent base values shared by every locale. */
const BASE: Record<SettingsFieldKey, string> = Object.fromEntries(
  SETTINGS_FIELDS.map((key) => [key, ""]),
) as Record<SettingsFieldKey, string>;
Object.assign(BASE, {
  siteName: "Global Accounting",
  logoUrl: "/images/logo.png",
  appUrl: APP_URL,
  accentColor: "#0f9d76",
  heroImageUrl: "/images/hero-app.jpg",
  aboutImageUrl: "/images/about-image.jpg",
  aboutVideoUrl: "",
  contactWhatsapp: "",
  contactEmail: "",
  contactPhone: "",
  contactAddress: "",
  contactHours: "",
});

export function defaultSettingsFor(locale: Locale): Record<SettingsFieldKey, string> {
  const content = LOCALE_CONTENT[locale] ?? LOCALE_CONTENT.en;
  return { ...BASE, ...(content.settings as Partial<Record<SettingsFieldKey, string>>) } as Record<
    SettingsFieldKey,
    string
  >;
}

export const DEFAULT_SETTINGS = defaultSettingsFor("tr");

export function defaultFeaturesFor(locale: Locale) {
  return (LOCALE_CONTENT[locale] ?? LOCALE_CONTENT.en).features.map((f, i) => ({
    locale,
    ...f,
    sortOrder: i + 1,
  }));
}

export function defaultBenefitsFor(locale: Locale) {
  return (LOCALE_CONTENT[locale] ?? LOCALE_CONTENT.en).benefits.map((b, i) => ({
    locale,
    ...b,
    sortOrder: i + 1,
  }));
}

export function defaultFaqsFor(locale: Locale) {
  return (LOCALE_CONTENT[locale] ?? LOCALE_CONTENT.en).faqs.map((f, i) => ({
    locale,
    ...f,
    sortOrder: i + 1,
  }));
}

const VIDEO_FILES_BY_LOCALE: Record<Locale, { videoUrl: string; thumbnailUrl: string } | null> = {
  tr: null,
  en: {
    videoUrl: "https://youtu.be/DuHFgkHezWo",
    thumbnailUrl: "/images/gallery-dashboard.jpg",
  },
  de: {
    videoUrl: "https://youtu.be/Bt3HbtIyGKY",
    thumbnailUrl: "/images/gallery-dashboard.jpg",
  },
  ru: null,
  fr: null,
  es: null,
  ar: null,
  fa: null,
  he: null,
  ku: null,
};

/** Dil bazlı örnek videolar — her dil kendi videosunu gösterir; diğer diller boş başlar. */
export function defaultVideosFor(locale: Locale) {
  const file = VIDEO_FILES_BY_LOCALE[locale];
  if (!file) return [];
  const chapters = (LOCALE_CONTENT[locale] ?? LOCALE_CONTENT.en).videoChapters.slice(0, 2);
  return chapters.map((chapter, i) => ({
    locale,
    ...chapter,
    ...file,
    isFeatured: i === 0,
    sortOrder: i + 1,
  }));
}

export function chapterSuggestionsFor(locale: Locale) {
  return (LOCALE_CONTENT[locale] ?? LOCALE_CONTENT.en).videoChapters;
}

export const DEFAULT_GALLERY = [
  {
    title: "Günlük finans ekranı",
    description: "Ciro, gider ve Z raporu aynı panelde.",
    imageUrl: "/images/gallery-dashboard.jpg",
    sortOrder: 1,
  },
  {
    title: "Termal fiş ve etiket",
    description: "Phomemo yazıcı ile hızlı fiş ve ürün etiketi.",
    imageUrl: "/images/gallery-printer.jpg",
    sortOrder: 2,
  },
  {
    title: "Otomatik WhatsApp bildirimi",
    description: "Sipariş hazır olduğunda müşteriye anında mesaj.",
    imageUrl: "/images/gallery-whatsapp.jpg",
    sortOrder: 3,
  },
  {
    title: "Cebinizdeki işletme defteri",
    description: "Telefon, tablet veya bilgisayardan aynı kayıtlar.",
    imageUrl: "/images/gallery-extra.jpg",
    sortOrder: 4,
  },
];

export const FEATURE_ICONS = [
  { value: "wallet", label: "Cüzdan / muhasebe" },
  { value: "users", label: "Müşteriler" },
  { value: "printer", label: "Yazıcı / fiş" },
  { value: "message", label: "WhatsApp / mesaj" },
  { value: "devices", label: "Cihazlar" },
  { value: "chart", label: "Grafik / rapor" },
  { value: "clock", label: "Zaman / hız" },
  { value: "shield", label: "Güvenlik" },
  { value: "tag", label: "Etiket" },
  { value: "sparkles", label: "Vurgu" },
] as const;
