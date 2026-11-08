import { and, asc, eq } from "drizzle-orm";
import { db } from "@/db";
import {
  benefits,
  faqs,
  features,
  galleryItems,
  siteSettings,
  videos,
  type Benefit,
  type Faq,
  type Feature,
  type GalleryItem,
  type SiteSettings,
  type Video,
} from "@/db/schema";
import {
  DEFAULT_GALLERY,
  defaultBenefitsFor,
  defaultFaqsFor,
  defaultFeaturesFor,
  defaultSettingsFor,
  defaultVideosFor,
} from "./defaults";
import { LOCALES, type Locale } from "./locales";

export type SiteData = {
  locale: Locale;
  settings: SiteSettings;
  features: Feature[];
  benefits: Benefit[];
  gallery: GalleryItem[];
  videos: Video[];
  faqs: Faq[];
};

let seedPromise: Promise<void> | null = null;

async function seedLocale(locale: Locale) {
  await db
    .insert(siteSettings)
    .values({ locale, ...defaultSettingsFor(locale) })
    .onConflictDoNothing({ target: siteSettings.locale });

  const [f] = await db.select({ id: features.id }).from(features).where(eq(features.locale, locale)).limit(1);
  if (!f) await db.insert(features).values(defaultFeaturesFor(locale));

  const [b] = await db.select({ id: benefits.id }).from(benefits).where(eq(benefits.locale, locale)).limit(1);
  if (!b) await db.insert(benefits).values(defaultBenefitsFor(locale));

  const [q] = await db.select({ id: faqs.id }).from(faqs).where(eq(faqs.locale, locale)).limit(1);
  if (!q) await db.insert(faqs).values(defaultFaqsFor(locale));

  const sampleVideos = defaultVideosFor(locale);
  if (sampleVideos.length > 0) {
    const [v] = await db.select({ id: videos.id }).from(videos).where(eq(videos.locale, locale)).limit(1);
    if (!v) await db.insert(videos).values(sampleVideos);
  }
}

async function seed() {
  for (const { code } of LOCALES) {
    await seedLocale(code);
  }
  const [g] = await db.select({ id: galleryItems.id }).from(galleryItems).limit(1);
  if (!g) await db.insert(galleryItems).values(DEFAULT_GALLERY);
}

export async function ensureSeed() {
  if (!seedPromise) {
    seedPromise = seed().catch((error) => {
      seedPromise = null;
      throw error;
    });
  }
  await seedPromise;
}

function fallbackData(locale: Locale): SiteData {
  const now = new Date();
  const stamp = <T>(rows: T[]) =>
    rows.map((row, index) => ({ ...row, id: index + 1, isActive: true, createdAt: now }));
  return {
    locale,
    settings: { id: 1, locale, ...defaultSettingsFor(locale), updatedAt: now } as SiteSettings,
    features: stamp(defaultFeaturesFor(locale)) as Feature[],
    benefits: stamp(defaultBenefitsFor(locale)) as Benefit[],
    gallery: stamp(DEFAULT_GALLERY) as GalleryItem[],
    videos: stamp(defaultVideosFor(locale)) as Video[],
    faqs: stamp(defaultFaqsFor(locale)) as Faq[],
  };
}

export async function getSiteData(locale: Locale, includeInactive = false): Promise<SiteData> {
  try {
    await ensureSeed();

    const [settingsRows, featureRows, benefitRows, galleryRows, videoRows, faqRows] =
      await Promise.all([
        db.select().from(siteSettings).where(eq(siteSettings.locale, locale)).limit(1),
        db.select().from(features).where(eq(features.locale, locale)).orderBy(asc(features.sortOrder), asc(features.id)),
        db.select().from(benefits).where(eq(benefits.locale, locale)).orderBy(asc(benefits.sortOrder), asc(benefits.id)),
        db.select().from(galleryItems).orderBy(asc(galleryItems.sortOrder), asc(galleryItems.id)),
        db.select().from(videos).where(eq(videos.locale, locale)).orderBy(asc(videos.sortOrder), asc(videos.id)),
        db.select().from(faqs).where(eq(faqs.locale, locale)).orderBy(asc(faqs.sortOrder), asc(faqs.id)),
      ]);

    const keep = <T extends { isActive: boolean }>(rows: T[]) =>
      includeInactive ? rows : rows.filter((row) => row.isActive);

    const settings =
      settingsRows[0] ??
      ({ id: 0, locale, ...defaultSettingsFor(locale), updatedAt: new Date() } as SiteSettings);

    return {
      locale,
      settings,
      features: keep(featureRows),
      benefits: keep(benefitRows),
      gallery: keep(galleryRows),
      videos: keep(videoRows),
      faqs: keep(faqRows),
    };
  } catch (error) {
    console.error("getSiteData failed, using defaults", error);
    return fallbackData(locale);
  }
}

/** Shared (language-independent) values are mirrored to every locale row on save. */
export const SHARED_SETTING_KEYS = [
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
  "contactPhone",
  "contactEmail",
  "contactAddress",
  "contactHours",
  "footerNote",
  "seoTitle",
  "seoDescription",
] as const;

export { and };
