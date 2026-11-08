"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import {
  benefits,
  faqs,
  features,
  galleryItems,
  siteSettings,
  videos,
} from "@/db/schema";
import {
  SESSION_COOKIE_NAME,
  createSessionToken,
  isAuthenticated,
  sessionCookieOptions,
  verifyPassword,
} from "@/lib/auth";
import { SETTINGS_FIELDS, defaultSettingsFor } from "@/lib/defaults";
import { SHARED_SETTING_KEYS } from "@/lib/content";
import { DEFAULT_LOCALE, LOCALES, isLocale, type Locale } from "@/lib/locales";

function localeOf(formData: FormData): Locale {
  const value = text(formData, "locale");
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

function text(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function number(formData: FormData, key: string): number {
  const value = Number(text(formData, key));
  return Number.isFinite(value) ? Math.trunc(value) : 0;
}

function checked(formData: FormData, key: string): boolean {
  const value = formData.get(key);
  return value === "on" || value === "true" || value === "1";
}

function idOf(formData: FormData): number {
  return Number(text(formData, "id")) || 0;
}

async function guard(): Promise<void> {
  if (!(await isAuthenticated())) {
    redirect("/admin");
  }
}

function finish(tab: string, message: string, locale: Locale = DEFAULT_LOCALE): never {
  revalidatePath("/", "layout");
  redirect(
    `/admin/dashboard?tab=${encodeURIComponent(tab)}&lang=${locale}&ok=${encodeURIComponent(message)}`,
  );
}

export async function loginAction(formData: FormData): Promise<never> {
  const password = text(formData, "password");
  if (!verifyPassword(password)) {
    redirect("/admin?error=1");
  }
  const store = await cookies();
  store.set(SESSION_COOKIE_NAME, createSessionToken(), sessionCookieOptions);
  redirect("/admin/dashboard");
}

export async function logoutAction(): Promise<never> {
  const store = await cookies();
  store.delete(SESSION_COOKIE_NAME);
  redirect("/admin");
}

export async function saveSettings(formData: FormData): Promise<never> {
  await guard();
  const tab = text(formData, "tab") || "genel";
  const locale = localeOf(formData);

  const patch: Record<string, string> = {};
  for (const field of SETTINGS_FIELDS) {
    if (formData.has(field)) {
      patch[field] = text(formData, field);
    }
  }

  if ("accentColor" in patch && !/^#[0-9a-fA-F]{6}$/.test(patch.accentColor)) {
    patch.accentColor = "#0f9d76";
  }
  if ("appUrl" in patch) {
    const raw = patch.appUrl.replace(/\s+/g, "");
    patch.appUrl = raw
      ? /^https?:\/\//i.test(raw)
        ? raw
        : `https://${raw}`
      : defaultSettingsFor(locale).appUrl;
  }

  if (Object.keys(patch).length > 0) {
    const insertValues = {
      locale,
      ...defaultSettingsFor(locale),
      ...patch,
    } as unknown as typeof siteSettings.$inferInsert;
    const updateValues = {
      ...patch,
      updatedAt: new Date(),
    } as unknown as Partial<typeof siteSettings.$inferInsert>;

    await db
      .insert(siteSettings)
      .values(insertValues)
      .onConflictDoUpdate({ target: siteSettings.locale, set: updateValues });

    // Mirror language-independent values (logo, link, colour, contact…) to every language.
    const shared: Record<string, string> = {};
    for (const key of SHARED_SETTING_KEYS) {
      if (key in patch) shared[key] = patch[key];
    }
    if (Object.keys(shared).length > 0) {
      const others = LOCALES.map((l) => l.code).filter((code) => code !== locale);
      await db
        .update(siteSettings)
        .set({ ...shared, updatedAt: new Date() } as Partial<typeof siteSettings.$inferInsert>)
        .where(inArray(siteSettings.locale, others));
    }
  }

  finish(tab, "Kaydedildi. Site içeriği güncellendi.", locale);
}

export async function saveFeature(formData: FormData): Promise<never> {
  await guard();
  const tab = "ozellikler";
  const locale = localeOf(formData);
  const title = text(formData, "title");
  if (!title) finish(tab, "Hata: Özellik başlığı zorunlu.", locale);

  const values = {
    locale,
    title,
    description: text(formData, "description"),
    icon: text(formData, "icon") || "sparkles",
    sortOrder: number(formData, "sortOrder"),
    isActive: checked(formData, "isActive"),
  };
  const id = idOf(formData);

  if (id) {
    await db.update(features).set(values).where(eq(features.id, id));
  } else {
    await db.insert(features).values(values);
  }
  finish(tab, id ? "Özellik güncellendi." : "Yeni özellik eklendi.", locale);
}

export async function deleteFeature(formData: FormData): Promise<never> {
  await guard();
  const id = idOf(formData);
  if (id) await db.delete(features).where(eq(features.id, id));
  finish("ozellikler", "Özellik silindi.", localeOf(formData));
}

export async function saveBenefit(formData: FormData): Promise<never> {
  await guard();
  const tab = "neden";
  const locale = localeOf(formData);
  const title = text(formData, "title");
  if (!title) finish(tab, "Hata: Madde başlığı zorunlu.", locale);

  const values = {
    locale,
    title,
    description: text(formData, "description"),
    sortOrder: number(formData, "sortOrder"),
    isActive: checked(formData, "isActive"),
  };
  const id = idOf(formData);

  if (id) {
    await db.update(benefits).set(values).where(eq(benefits.id, id));
  } else {
    await db.insert(benefits).values(values);
  }
  finish(tab, id ? "Madde güncellendi." : "Yeni madde eklendi.", locale);
}

export async function deleteBenefit(formData: FormData): Promise<never> {
  await guard();
  const id = idOf(formData);
  if (id) await db.delete(benefits).where(eq(benefits.id, id));
  finish("neden", "Madde silindi.", localeOf(formData));
}

export async function saveGalleryItem(formData: FormData): Promise<never> {
  await guard();
  const tab = "galeri";
  const locale = localeOf(formData);
  const imageUrl = text(formData, "imageUrl");
  if (!imageUrl) finish(tab, "Hata: Galeri görseli ekleyin veya bir adres girin.", locale);

  const values = {
    title: text(formData, "title"),
    description: text(formData, "description"),
    imageUrl,
    sortOrder: number(formData, "sortOrder"),
    isActive: checked(formData, "isActive"),
  };
  const id = idOf(formData);

  if (id) {
    await db.update(galleryItems).set(values).where(eq(galleryItems.id, id));
  } else {
    await db.insert(galleryItems).values(values);
  }
  finish(tab, id ? "Görsel güncellendi." : "Görsel galeriye eklendi.", locale);
}

export async function deleteGalleryItem(formData: FormData): Promise<never> {
  await guard();
  const id = idOf(formData);
  if (id) await db.delete(galleryItems).where(eq(galleryItems.id, id));
  finish("galeri", "Görsel silindi.", localeOf(formData));
}

export async function saveVideo(formData: FormData): Promise<never> {
  await guard();
  const tab = "videolar";
  const locale = localeOf(formData);
  const title = text(formData, "title");
  if (!title) finish(tab, "Hata: Video başlığı zorunlu.", locale);

  const values = {
    locale,
    title,
    description: text(formData, "description"),
    chapter: text(formData, "chapter"),
    videoUrl: text(formData, "videoUrl"),
    thumbnailUrl: text(formData, "thumbnailUrl"),
    isFeatured: checked(formData, "isFeatured"),
    sortOrder: number(formData, "sortOrder"),
    isActive: checked(formData, "isActive"),
  };
  const id = idOf(formData);

  if (id) {
    await db.update(videos).set(values).where(eq(videos.id, id));
  } else {
    await db.insert(videos).values(values);
  }
  finish(tab, id ? "Video güncellendi." : "Yeni video eklendi.", locale);
}

export async function deleteVideo(formData: FormData): Promise<never> {
  await guard();
  const id = idOf(formData);
  if (id) await db.delete(videos).where(eq(videos.id, id));
  finish("videolar", "Video silindi.", localeOf(formData));
}

export async function saveFaq(formData: FormData): Promise<never> {
  await guard();
  const tab = "sss";
  const locale = localeOf(formData);
  const question = text(formData, "question");
  if (!question) finish(tab, "Hata: Soru metni zorunlu.", locale);

  const values = {
    locale,
    question,
    answer: text(formData, "answer"),
    sortOrder: number(formData, "sortOrder"),
    isActive: checked(formData, "isActive"),
  };
  const id = idOf(formData);

  if (id) {
    await db.update(faqs).set(values).where(eq(faqs.id, id));
  } else {
    await db.insert(faqs).values(values);
  }
  finish(tab, id ? "Soru güncellendi." : "Yeni soru eklendi.", locale);
}

export async function deleteFaq(formData: FormData): Promise<never> {
  await guard();
  const id = idOf(formData);
  if (id) await db.delete(faqs).where(eq(faqs.id, id));
  finish("sss", "Soru silindi.", localeOf(formData));
}
