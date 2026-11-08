import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

/**
 * Single-row table (id = 1) that holds every editable text on the promo site.
 */
export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  locale: text("locale").notNull().unique().default("tr"),

  // Brand
  siteName: text("site_name").notNull().default(""),
  brandTagline: text("brand_tagline").notNull().default(""),
  logoUrl: text("logo_url").notNull().default(""),
  appUrl: text("app_url")
    .notNull()
    .default("https://global-accounting-omega.vercel.app"),
  accentColor: text("accent_color").notNull().default("#0f9d76"),

  // Hero
  heroEyebrow: text("hero_eyebrow").notNull().default(""),
  heroTitle: text("hero_title").notNull().default(""),
  heroTitleAccent: text("hero_title_accent").notNull().default(""),
  heroDescription: text("hero_description").notNull().default(""),
  heroPrimaryCta: text("hero_primary_cta").notNull().default(""),
  heroSecondaryCta: text("hero_secondary_cta").notNull().default(""),
  heroImageUrl: text("hero_image_url").notNull().default(""),
  heroHighlights: text("hero_highlights").notNull().default(""),
  heroNote: text("hero_note").notNull().default(""),
  stat1Value: text("stat1_value").notNull().default(""),
  stat1Label: text("stat1_label").notNull().default(""),
  stat2Value: text("stat2_value").notNull().default(""),
  stat2Label: text("stat2_label").notNull().default(""),
  stat3Value: text("stat3_value").notNull().default(""),
  stat3Label: text("stat3_label").notNull().default(""),

  // About / bio
  aboutEyebrow: text("about_eyebrow").notNull().default(""),
  aboutTitle: text("about_title").notNull().default(""),
  aboutText: text("about_text").notNull().default(""),
  aboutImageUrl: text("about_image_url").notNull().default(""),
  aboutVideoUrl: text("about_video_url").notNull().default(""),
  aboutBullets: text("about_bullets").notNull().default(""),

  // Section headings
  featuresTitle: text("features_title").notNull().default(""),
  featuresSubtitle: text("features_subtitle").notNull().default(""),
  benefitsTitle: text("benefits_title").notNull().default(""),
  benefitsSubtitle: text("benefits_subtitle").notNull().default(""),
  galleryTitle: text("gallery_title").notNull().default(""),
  gallerySubtitle: text("gallery_subtitle").notNull().default(""),
  videosTitle: text("videos_title").notNull().default(""),
  videosSubtitle: text("videos_subtitle").notNull().default(""),
  faqTitle: text("faq_title").notNull().default(""),
  faqSubtitle: text("faq_subtitle").notNull().default(""),

  // Contact + QR
  contactTitle: text("contact_title").notNull().default(""),
  contactDescription: text("contact_description").notNull().default(""),
  qrTitle: text("qr_title").notNull().default(""),
  qrDescription: text("qr_description").notNull().default(""),
  qrNote: text("qr_note").notNull().default(""),
  contactWhatsapp: text("contact_whatsapp").notNull().default(""),
  contactEmail: text("contact_email").notNull().default(""),
  contactPhone: text("contact_phone").notNull().default(""),
  contactAddress: text("contact_address").notNull().default(""),
  contactHours: text("contact_hours").notNull().default(""),

  // Global
  footerNote: text("footer_note").notNull().default(""),
  seoTitle: text("seo_title").notNull().default(""),
  seoDescription: text("seo_description").notNull().default(""),

  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const features = pgTable("features", {
  id: serial("id").primaryKey(),
  locale: text("locale").notNull().default("tr"),
  title: text("title").notNull(),
  description: text("description").notNull().default(""),
  icon: text("icon").notNull().default("sparkles"),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const benefits = pgTable("benefits", {
  id: serial("id").primaryKey(),
  locale: text("locale").notNull().default("tr"),
  title: text("title").notNull(),
  description: text("description").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const galleryItems = pgTable("gallery_items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull().default(""),
  description: text("description").notNull().default(""),
  imageUrl: text("image_url").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const videos = pgTable("videos", {
  id: serial("id").primaryKey(),
  locale: text("locale").notNull().default("tr"),
  title: text("title").notNull(),
  description: text("description").notNull().default(""),
  chapter: text("chapter").notNull().default(""),
  videoUrl: text("video_url").notNull().default(""),
  thumbnailUrl: text("thumbnail_url").notNull().default(""),
  isFeatured: boolean("is_featured").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),
  locale: text("locale").notNull().default("tr"),
  question: text("question").notNull(),
  answer: text("answer").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

/**
 * Binary uploads (images / small videos) stored in the database and served
 * through /api/media/[id]. Base64 keeps the drizzle setup portable.
 */
export const media = pgTable("media", {
  id: serial("id").primaryKey(),
  filename: text("filename").notNull(),
  mimeType: text("mime_type").notNull(),
  size: integer("size").notNull().default(0),
  data: text("data").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type SiteSettings = typeof siteSettings.$inferSelect;
export type Feature = typeof features.$inferSelect;
export type Benefit = typeof benefits.$inferSelect;
export type GalleryItem = typeof galleryItems.$inferSelect;
export type Video = typeof videos.$inferSelect;
export type Faq = typeof faqs.$inferSelect;
