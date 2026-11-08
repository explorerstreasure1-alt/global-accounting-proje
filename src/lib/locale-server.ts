import { cookies, headers } from "next/headers";
import { LOCALE_COOKIE, SITE_FALLBACK_LOCALE, isLocale, type Locale } from "./locales";

/** Resolves the visitor's locale: explicit cookie first, then browser language, then default. */
export async function resolveLocale(): Promise<{ locale: Locale; chosen: boolean }> {
  const store = await cookies();
  const cookieValue = store.get(LOCALE_COOKIE)?.value;
  if (isLocale(cookieValue)) return { locale: cookieValue, chosen: true };

  const accept = (await headers()).get("accept-language") ?? "";
  for (const part of accept.split(",")) {
    let code = part.trim().slice(0, 2).toLowerCase();
    if (code === "iw") code = "he"; // legacy Hebrew tag
    if (isLocale(code)) return { locale: code, chosen: false };
  }
  return { locale: SITE_FALLBACK_LOCALE, chosen: false };
}
