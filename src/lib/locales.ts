export const LOCALES = [
  { code: "en", label: "English", dir: "ltr" },
  { code: "tr", label: "Türkçe", dir: "ltr" },
  { code: "ru", label: "Русский", dir: "ltr" },
  { code: "de", label: "Deutsch", dir: "ltr" },
  { code: "fr", label: "Français", dir: "ltr" },
  { code: "es", label: "Español", dir: "ltr" },
  { code: "ar", label: "العربية", dir: "rtl" },
  { code: "fa", label: "فارسی", dir: "rtl" },
  { code: "he", label: "עברית", dir: "rtl" },
  { code: "ku", label: "Kurdî", dir: "ltr" },
] as const;

export type Locale = (typeof LOCALES)[number]["code"];
/** Admin panel default content language. */
export const DEFAULT_LOCALE: Locale = "tr";
/** Visitor fallback when the browser language is not one of ours. */
export const SITE_FALLBACK_LOCALE: Locale = "en";

/** The first-visit question is always asked in English, as requested. */
export const WELCOME_EN = {
  title: "What is your native language?",
  text: "Pick your language and we'll show the site and the video guide in it. You can change it anytime from the top menu.",
  note: "No account or sign-up needed.",
  continue: "Continue",
};
export const LOCALE_COOKIE = "ga_locale";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && LOCALES.some((l) => l.code === value);
}

export function localeInfo(code: Locale) {
  return LOCALES.find((l) => l.code === code) ?? LOCALES[0];
}

type Dict = {
  nav: { about: string; features: string; why: string; gallery: string; videos: string; faq: string; qr: string };
  openApp: string;
  openLink: string;
  exploreFeatures: string;
  eyebrow: { about: string; features: string; why: string; gallery: string; video: string; faq: string; qr: string };
  heroCard1Title: string; heroCard1Sub: string;
  heroCard2Title: string; heroCard2Sub: string;
  aboutCardTitle: string; aboutCardSub: string;
  faqCtaTitle: string; faqCtaText: string;
  playVideo: string; chapters: string; chapter: string; nowPlaying: string; videosHint: string;
  writeWhatsapp: string;
  contact: { whatsapp: string; phone: string; email: string; address: string; hours: string };
  admin: string;
  close: string; prev: string; next: string;
  langTitle: string; langText: string; langContinue: string; langNote: string; language: string;
};

const en: Dict = {
  nav: { about: "About", features: "Features", why: "Why us", gallery: "Gallery", videos: "Videos", faq: "FAQ", qr: "QR code" },
  openApp: "Open the app", openLink: "Open link", exploreFeatures: "Explore features",
  eyebrow: { about: "About", features: "Features", why: "Why use it", gallery: "Gallery", video: "Video guide", faq: "FAQ", qr: "Access via QR code" },
  heroCard1Title: "Z-report ready", heroCard1Sub: "Daily turnover • 14:32",
  heroCard2Title: "WhatsApp notification", heroCard2Sub: "Your order is ready ✓",
  aboutCardTitle: "One account, three devices", aboutCardSub: "Phone • Tablet • Computer",
  faqCtaTitle: "Didn't find your answer?", faqCtaText: "Open the app and explore how it fits your business.",
  playVideo: "Play video", chapters: "Chapters", chapter: "Chapter", nowPlaying: "Now playing", videosHint: "Select a chapter on the right to watch.",
  writeWhatsapp: "Message on WhatsApp",
  contact: { whatsapp: "WhatsApp", phone: "Phone", email: "Email", address: "Address", hours: "Opening hours" },
  admin: "Admin", close: "Close", prev: "Previous", next: "Next",
  langTitle: "Choose your language", langText: "We'll show the site and the video guide in the language you prefer. You can change it anytime from the top menu.", langContinue: "Continue", langNote: "No account or sign-up needed.", language: "Language",
};

const tr: Dict = {
  nav: { about: "Hakkında", features: "Özellikler", why: "Neden Biz", gallery: "Galeri", videos: "Videolar", faq: "SSS", qr: "Karekod" },
  openApp: "Uygulamayı Aç", openLink: "Bağlantıyı Aç", exploreFeatures: "Özellikleri Keşfet",
  eyebrow: { about: "Hakkında", features: "Özellikler", why: "Neden kullanmalı", gallery: "Galeri", video: "Videolu anlatım", faq: "SSS", qr: "Karekod ile erişim" },
  heroCard1Title: "Z raporu hazır", heroCard1Sub: "Günlük ciro • 14:32",
  heroCard2Title: "WhatsApp bildirimi", heroCard2Sub: "Siparişiniz hazır ✓",
  aboutCardTitle: "Tek hesap, üç cihaz", aboutCardSub: "Telefon • Tablet • Bilgisayar",
  faqCtaTitle: "Cevabını bulamadınız mı?", faqCtaText: "Uygulamayı açıp işletmenize uygun kullanımı yerinde keşfedebilirsiniz.",
  playVideo: "Videoyu oynat", chapters: "Bölümler", chapter: "Bölüm", nowPlaying: "Şimdi oynatılıyor", videosHint: "İzlemek için sağdaki bölümlerden birini seçin.",
  writeWhatsapp: "WhatsApp ile yaz",
  contact: { whatsapp: "WhatsApp", phone: "Telefon", email: "E-posta", address: "Adres", hours: "Çalışma saatleri" },
  admin: "Yönetim", close: "Kapat", prev: "Önceki", next: "Sonraki",
  langTitle: "Ana dilinizi seçin", langText: "Siteyi ve videolu anlatımı tercih ettiğiniz dilde gösterelim. Dili istediğiniz zaman üst menüden değiştirebilirsiniz.", langContinue: "Devam et", langNote: "Hesap ya da kayıt gerekmez.", language: "Dil",
};

const de: Dict = {
  nav: { about: "Über uns", features: "Funktionen", why: "Warum wir", gallery: "Galerie", videos: "Videos", faq: "FAQ", qr: "QR-Code" },
  openApp: "App öffnen", openLink: "Link öffnen", exploreFeatures: "Funktionen entdecken",
  eyebrow: { about: "Über die App", features: "Funktionen", why: "Warum nutzen", gallery: "Galerie", video: "Video-Anleitung", faq: "FAQ", qr: "Zugang per QR-Code" },
  heroCard1Title: "Z-Bericht fertig", heroCard1Sub: "Tagesumsatz • 14:32",
  heroCard2Title: "WhatsApp-Benachrichtigung", heroCard2Sub: "Ihre Bestellung ist fertig ✓",
  aboutCardTitle: "Ein Konto, drei Geräte", aboutCardSub: "Handy • Tablet • Computer",
  faqCtaTitle: "Keine Antwort gefunden?", faqCtaText: "Öffnen Sie die App und entdecken Sie, wie sie zu Ihrem Geschäft passt.",
  playVideo: "Video abspielen", chapters: "Kapitel", chapter: "Kapitel", nowPlaying: "Läuft gerade", videosHint: "Wählen Sie rechts ein Kapitel zum Ansehen.",
  writeWhatsapp: "Per WhatsApp schreiben",
  contact: { whatsapp: "WhatsApp", phone: "Telefon", email: "E-Mail", address: "Adresse", hours: "Öffnungszeiten" },
  admin: "Verwaltung", close: "Schließen", prev: "Zurück", next: "Weiter",
  langTitle: "Wählen Sie Ihre Sprache", langText: "Wir zeigen die Seite und die Video-Anleitung in Ihrer bevorzugten Sprache. Sie können sie jederzeit oben im Menü ändern.", langContinue: "Weiter", langNote: "Kein Konto oder Registrierung nötig.", language: "Sprache",
};

const ru: Dict = {
  nav: { about: "О приложении", features: "Функции", why: "Почему мы", gallery: "Галерея", videos: "Видео", faq: "Вопросы", qr: "QR-код" },
  openApp: "Открыть приложение", openLink: "Открыть ссылку", exploreFeatures: "Смотреть функции",
  eyebrow: { about: "О приложении", features: "Функции", why: "Зачем использовать", gallery: "Галерея", video: "Видеоинструкция", faq: "Вопросы и ответы", qr: "Доступ по QR-коду" },
  heroCard1Title: "Z-отчёт готов", heroCard1Sub: "Выручка за день • 14:32",
  heroCard2Title: "Уведомление WhatsApp", heroCard2Sub: "Ваш заказ готов ✓",
  aboutCardTitle: "Один аккаунт, три устройства", aboutCardSub: "Телефон • Планшет • Компьютер",
  faqCtaTitle: "Не нашли ответ?", faqCtaText: "Откройте приложение и посмотрите, как оно подходит вашему бизнесу.",
  playVideo: "Смотреть видео", chapters: "Разделы", chapter: "Раздел", nowPlaying: "Сейчас играет", videosHint: "Выберите раздел справа, чтобы посмотреть.",
  writeWhatsapp: "Написать в WhatsApp",
  contact: { whatsapp: "WhatsApp", phone: "Телефон", email: "Эл. почта", address: "Адрес", hours: "Часы работы" },
  admin: "Админ", close: "Закрыть", prev: "Назад", next: "Далее",
  langTitle: "Выберите язык", langText: "Мы покажем сайт и видеоинструкцию на удобном вам языке. Изменить язык можно в любой момент в верхнем меню.", langContinue: "Продолжить", langNote: "Аккаунт и регистрация не нужны.", language: "Язык",
};

const fr: Dict = {
  nav: { about: "À propos", features: "Fonctionnalités", why: "Pourquoi nous", gallery: "Galerie", videos: "Vidéos", faq: "FAQ", qr: "QR code" },
  openApp: "Ouvrir l'application", openLink: "Ouvrir le lien", exploreFeatures: "Découvrir les fonctionnalités",
  eyebrow: { about: "À propos", features: "Fonctionnalités", why: "Pourquoi l'utiliser", gallery: "Galerie", video: "Guide vidéo", faq: "FAQ", qr: "Accès par QR code" },
  heroCard1Title: "Rapport Z prêt", heroCard1Sub: "Chiffre du jour • 14:32",
  heroCard2Title: "Notification WhatsApp", heroCard2Sub: "Votre commande est prête ✓",
  aboutCardTitle: "Un compte, trois appareils", aboutCardSub: "Téléphone • Tablette • Ordinateur",
  faqCtaTitle: "Vous n'avez pas trouvé la réponse ?", faqCtaText: "Ouvrez l'application et découvrez comment elle s'adapte à votre activité.",
  playVideo: "Lire la vidéo", chapters: "Chapitres", chapter: "Chapitre", nowPlaying: "En cours", videosHint: "Choisissez un chapitre à droite pour le regarder.",
  writeWhatsapp: "Écrire sur WhatsApp",
  contact: { whatsapp: "WhatsApp", phone: "Téléphone", email: "E-mail", address: "Adresse", hours: "Horaires" },
  admin: "Admin", close: "Fermer", prev: "Précédent", next: "Suivant",
  langTitle: "Choisissez votre langue", langText: "Nous afficherons le site et le guide vidéo dans la langue de votre choix. Vous pourrez la changer à tout moment depuis le menu.", langContinue: "Continuer", langNote: "Aucun compte ni inscription requis.", language: "Langue",
};

const es: Dict = {
  nav: { about: "Acerca de", features: "Funciones", why: "Por qué", gallery: "Galería", videos: "Vídeos", faq: "Preguntas", qr: "Código QR" },
  openApp: "Abrir la app", openLink: "Abrir enlace", exploreFeatures: "Ver funciones",
  eyebrow: { about: "Acerca de", features: "Funciones", why: "Por qué usarla", gallery: "Galería", video: "Guía en vídeo", faq: "Preguntas frecuentes", qr: "Acceso por código QR" },
  heroCard1Title: "Informe Z listo", heroCard1Sub: "Caja del día • 14:32",
  heroCard2Title: "Notificación de WhatsApp", heroCard2Sub: "Su pedido está listo ✓",
  aboutCardTitle: "Una cuenta, tres dispositivos", aboutCardSub: "Móvil • Tableta • Ordenador",
  faqCtaTitle: "¿No encontró la respuesta?", faqCtaText: "Abra la app y descubra cómo se adapta a su negocio.",
  playVideo: "Reproducir vídeo", chapters: "Capítulos", chapter: "Capítulo", nowPlaying: "Reproduciendo", videosHint: "Elija un capítulo a la derecha para verlo.",
  writeWhatsapp: "Escribir por WhatsApp",
  contact: { whatsapp: "WhatsApp", phone: "Teléfono", email: "Correo", address: "Dirección", hours: "Horario" },
  admin: "Admin", close: "Cerrar", prev: "Anterior", next: "Siguiente",
  langTitle: "Elija su idioma", langText: "Mostraremos el sitio y la guía en vídeo en el idioma que prefiera. Puede cambiarlo en cualquier momento desde el menú superior.", langContinue: "Continuar", langNote: "No se necesita cuenta ni registro.", language: "Idioma",
};

const ar: Dict = {
  nav: { about: "حول التطبيق", features: "المميزات", why: "لماذا نحن", gallery: "المعرض", videos: "الفيديوهات", faq: "الأسئلة الشائعة", qr: "رمز QR" },
  openApp: "افتح التطبيق", openLink: "افتح الرابط", exploreFeatures: "استكشف المميزات",
  eyebrow: { about: "حول التطبيق", features: "المميزات", why: "لماذا تستخدمه", gallery: "المعرض", video: "شرح بالفيديو", faq: "الأسئلة الشائعة", qr: "الوصول عبر رمز QR" },
  heroCard1Title: "تقرير Z جاهز", heroCard1Sub: "إيراد اليوم • 14:32",
  heroCard2Title: "إشعار واتساب", heroCard2Sub: "طلبك جاهز ✓",
  aboutCardTitle: "حساب واحد، ثلاثة أجهزة", aboutCardSub: "هاتف • جهاز لوحي • حاسوب",
  faqCtaTitle: "لم تجد إجابتك؟", faqCtaText: "افتح التطبيق واكتشف كيف يناسب عملك.",
  playVideo: "تشغيل الفيديو", chapters: "الأقسام", chapter: "القسم", nowPlaying: "قيد التشغيل", videosHint: "اختر قسماً من القائمة للمشاهدة.",
  writeWhatsapp: "راسلنا عبر واتساب",
  contact: { whatsapp: "واتساب", phone: "الهاتف", email: "البريد الإلكتروني", address: "العنوان", hours: "ساعات العمل" },
  admin: "الإدارة", close: "إغلاق", prev: "السابق", next: "التالي",
  langTitle: "اختر لغتك", langText: "سنعرض الموقع والشرح بالفيديو باللغة التي تفضلها. يمكنك تغييرها في أي وقت من القائمة العلوية.", langContinue: "متابعة", langNote: "لا حاجة لحساب أو تسجيل.", language: "اللغة",
};

const fa: Dict = {
  nav: { about: "درباره", features: "امکانات", why: "چرا ما", gallery: "گالری", videos: "ویدیوها", faq: "سوالات متداول", qr: "کد QR" },
  openApp: "باز کردن برنامه", openLink: "باز کردن لینک", exploreFeatures: "مشاهده امکانات",
  eyebrow: { about: "درباره برنامه", features: "امکانات", why: "چرا استفاده کنیم", gallery: "گالری", video: "آموزش ویدیویی", faq: "سوالات متداول", qr: "دسترسی با کد QR" },
  heroCard1Title: "گزارش Z آماده است", heroCard1Sub: "فروش روزانه • ۱۴:۳۲",
  heroCard2Title: "اعلان واتساپ", heroCard2Sub: "سفارش شما آماده است ✓",
  aboutCardTitle: "یک حساب، سه دستگاه", aboutCardSub: "موبایل • تبلت • رایانه",
  faqCtaTitle: "پاسخ خود را پیدا نکردید؟", faqCtaText: "برنامه را باز کنید و ببینید چگونه با کسب‌وکار شما سازگار است.",
  playVideo: "پخش ویدیو", chapters: "بخش‌ها", chapter: "بخش", nowPlaying: "در حال پخش", videosHint: "برای تماشا یکی از بخش‌ها را انتخاب کنید.",
  writeWhatsapp: "پیام در واتساپ",
  contact: { whatsapp: "واتساپ", phone: "تلفن", email: "ایمیل", address: "آدرس", hours: "ساعات کاری" },
  admin: "مدیریت", close: "بستن", prev: "قبلی", next: "بعدی",
  langTitle: "زبان خود را انتخاب کنید", langText: "سایت و آموزش ویدیویی را به زبان دلخواه شما نمایش می‌دهیم. هر زمان می‌توانید آن را از منوی بالا تغییر دهید.", langContinue: "ادامه", langNote: "نیازی به حساب یا ثبت‌نام نیست.", language: "زبان",
};

const he: Dict = {
  nav: { about: "אודות", features: "תכונות", why: "למה אנחנו", gallery: "גלריה", videos: "סרטונים", faq: "שאלות נפוצות", qr: "קוד QR" },
  openApp: "פתיחת האפליקציה", openLink: "פתיחת הקישור", exploreFeatures: "לגלות את התכונות",
  eyebrow: { about: "אודות האפליקציה", features: "תכונות", why: "למה להשתמש", gallery: "גלריה", video: "מדריך וידאו", faq: "שאלות נפוצות", qr: "גישה באמצעות קוד QR" },
  heroCard1Title: "דוח Z מוכן", heroCard1Sub: "פדיון יומי • 14:32",
  heroCard2Title: "התראת וואטסאפ", heroCard2Sub: "ההזמנה שלך מוכנה ✓",
  aboutCardTitle: "חשבון אחד, שלושה מכשירים", aboutCardSub: "טלפון • טאבלט • מחשב",
  faqCtaTitle: "לא מצאתם תשובה?", faqCtaText: "פתחו את האפליקציה וגלו איך היא מתאימה לעסק שלכם.",
  playVideo: "הפעלת הסרטון", chapters: "פרקים", chapter: "פרק", nowPlaying: "מתנגן כעת", videosHint: "בחרו פרק מהרשימה כדי לצפות.",
  writeWhatsapp: "כתבו לנו בוואטסאפ",
  contact: { whatsapp: "וואטסאפ", phone: "טלפון", email: "אימייל", address: "כתובת", hours: "שעות פעילות" },
  admin: "ניהול", close: "סגירה", prev: "הקודם", next: "הבא",
  langTitle: "בחרו את השפה שלכם", langText: "נציג את האתר ואת מדריך הווידאו בשפה שתבחרו. אפשר לשנות אותה בכל עת מהתפריט העליון.", langContinue: "המשך", langNote: "אין צורך בחשבון או בהרשמה.", language: "שפה",
};

const ku: Dict = {
  nav: { about: "Derbarê", features: "Taybetmendî", why: "Çima em", gallery: "Galerî", videos: "Vîdyo", faq: "Pirs û bersiv", qr: "Koda QR" },
  openApp: "Sepanê veke", openLink: "Girêdanê veke", exploreFeatures: "Taybetmendiyan bibîne",
  eyebrow: { about: "Derbarê sepanê", features: "Taybetmendî", why: "Çima bi kar bînin", gallery: "Galerî", video: "Rêbera vîdyoyî", faq: "Pirs û bersiv", qr: "Gihîştin bi koda QR" },
  heroCard1Title: "Rapora Z amade ye", heroCard1Sub: "Dahata rojane • 14:32",
  heroCard2Title: "Agahdariya WhatsAppê", heroCard2Sub: "Fermana we amade ye ✓",
  aboutCardTitle: "Hesabek, sê amûr", aboutCardSub: "Telefon • Tablet • Komputer",
  faqCtaTitle: "Bersiva xwe nedît?", faqCtaText: "Sepanê veke û bibîne ka çawa li karsaziya te tê.",
  playVideo: "Vîdyoyê lêde", chapters: "Beş", chapter: "Beş", nowPlaying: "Niha tê lêdan", videosHint: "Ji bo temaşekirinê beşek ji lîsteyê hilbijêre.",
  writeWhatsapp: "Bi WhatsAppê binivîse",
  contact: { whatsapp: "WhatsApp", phone: "Telefon", email: "E-name", address: "Navnîşan", hours: "Demên xebatê" },
  admin: "Rêveberî", close: "Bigire", prev: "Paşve", next: "Pêşve",
  langTitle: "Zimanê xwe hilbijêre", langText: "Em ê malperê û rêbera vîdyoyî bi zimanê ku tu dixwazî nîşan bidin. Tu dikarî her dem ji menuya jorîn biguherînî.", langContinue: "Bidomîne", langNote: "Ne hewceyî hesab an tomarkirinê ye.", language: "Ziman",
};

const DICTS: Record<Locale, Dict> = { tr, en, de, ru, fr, es, ar, fa, he, ku };

export function t(locale: Locale): Dict {
  return DICTS[locale] ?? DICTS.en;
}
