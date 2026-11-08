import type { SettingsFieldKey } from "./defaults";

export type SettingField = {
  key: SettingsFieldKey;
  label: string;
  type?: "text" | "textarea" | "color" | "image" | "url";
  rows?: number;
  help?: string;
  placeholder?: string;
  full?: boolean;
};

export type SettingsGroup = {
  id: string;
  tabLabel: string;
  title: string;
  description: string;
  fields: SettingField[];
};

export const SETTINGS_GROUPS: SettingsGroup[] = [
  {
    id: "genel",
    tabLabel: "Marka & Hero",
    title: "Marka ve giriş bölümü",
    description:
      "Site adı, logo, uygulama bağlantısı ve ziyaretçinin ilk gördüğü alan. Karekod da buradaki uygulama bağlantısını kullanır.",
    fields: [
      { key: "siteName", label: "Site / işletme adı" },
      { key: "brandTagline", label: "Slogan" },
      { key: "appUrl", label: "Uygulama adresi (karekod hedefi)", type: "url", full: true },
      { key: "logoUrl", label: "Logo", type: "image", help: "Boş bırakılırsa baş harf logosu gösterilir." },
      { key: "accentColor", label: "Ana renk", type: "color" },
      { key: "heroEyebrow", label: "Üst etiket", full: true },
      { key: "heroTitle", label: "Başlık (ilk kısım)" },
      { key: "heroTitleAccent", label: "Başlık (vurgulu kısım)" },
      { key: "heroDescription", label: "Açıklama", type: "textarea", rows: 4, full: true },
      { key: "heroPrimaryCta", label: "Birincil buton yazısı" },
      { key: "heroSecondaryCta", label: "İkincil buton yazısı" },
      { key: "heroImageUrl", label: "Hero görseli", type: "image" },
      {
        key: "heroHighlights",
        label: "Hero avantaj maddeleri",
        type: "textarea",
        rows: 4,
        help: "Her satır bir madde olarak gösterilir.",
      },
      { key: "heroNote", label: "Hero alt notu", type: "textarea", rows: 2, full: true },
      { key: "stat1Value", label: "1. istatistik değeri" },
      { key: "stat1Label", label: "1. istatistik açıklaması" },
      { key: "stat2Value", label: "2. istatistik değeri" },
      { key: "stat2Label", label: "2. istatistik açıklaması" },
      { key: "stat3Value", label: "3. istatistik değeri" },
      { key: "stat3Label", label: "3. istatistik açıklaması" },
    ],
  },
  {
    id: "hakkinda",
    tabLabel: "Hakkında",
    title: "Uygulama biyografisi",
    description:
      "Uygulamanın ne olduğunu anlatan uzun metin, madde listesi, görsel ve video.",
    fields: [
      { key: "aboutEyebrow", label: "Üst etiket" },
      { key: "aboutTitle", label: "Bölüm başlığı" },
      { key: "aboutText", label: "Biyografi metni", type: "textarea", rows: 10, full: true, help: "Paragrafları boş satırla ayırın." },
      { key: "aboutImageUrl", label: "Hakkında görseli", type: "image" },
      {
        key: "aboutVideoUrl",
        label: "Hakkında videosu (YouTube / MP4)",
        type: "text",
        help: "Doldurulursa görselin yerine video oynatıcı gösterilir.",
      },
      {
        key: "aboutBullets",
        label: "Öne çıkan maddeler",
        type: "textarea",
        rows: 6,
        full: true,
        help: "Her satır bir madde.",
      },
    ],
  },
  {
    id: "bolumler",
    tabLabel: "Bölüm Başlıkları",
    title: "Bölüm başlıkları",
    description: "Ana sayfadaki bölümlerin başlık ve alt başlıkları.",
    fields: [
      { key: "featuresTitle", label: "Özellikler başlığı" },
      { key: "featuresSubtitle", label: "Özellikler alt başlığı", type: "textarea", rows: 2 },
      { key: "benefitsTitle", label: "Neden kullanmalı başlığı" },
      { key: "benefitsSubtitle", label: "Neden kullanmalı alt başlığı", type: "textarea", rows: 2 },
      { key: "galleryTitle", label: "Galeri başlığı" },
      { key: "gallerySubtitle", label: "Galeri alt başlığı", type: "textarea", rows: 2 },
      { key: "videosTitle", label: "Video bölümü başlığı" },
      { key: "videosSubtitle", label: "Video bölümü alt başlığı", type: "textarea", rows: 2 },
      { key: "faqTitle", label: "SSS başlığı" },
      { key: "faqSubtitle", label: "SSS alt başlığı", type: "textarea", rows: 2 },
    ],
  },
  {
    id: "iletisim",
    tabLabel: "İletişim & Karekod",
    title: "İletişim ve karekod",
    description:
      "Sayfanın en altındaki karekod bölümü ve işletme iletişim bilgileri. Karekod uygulama adresine yönlendirir.",
    fields: [
      { key: "contactTitle", label: "İletişim başlığı" },
      { key: "contactDescription", label: "İletişim açıklaması", type: "textarea", rows: 3 },
      { key: "qrTitle", label: "Karekod başlığı" },
      { key: "qrDescription", label: "Karekod açıklaması", type: "textarea", rows: 3 },
      { key: "qrNote", label: "Karekod alt notu", type: "textarea", rows: 2, full: true },
      { key: "contactWhatsapp", label: "WhatsApp numarası (yalnızca rakam)", placeholder: "905550000000" },
      { key: "contactPhone", label: "Telefon" },
      { key: "contactEmail", label: "E-posta" },
      { key: "contactAddress", label: "Adres", full: true },
      { key: "contactHours", label: "Çalışma saatleri", full: true },
    ],
  },
  {
    id: "seo",
    tabLabel: "SEO & Alt Bilgi",
    title: "Arama motoru ve alt bilgi",
    description: "Paylaşım başlığı, açıklaması ve sayfa altı metni.",
    fields: [
      { key: "seoTitle", label: "Sayfa başlığı (SEO)" },
      { key: "seoDescription", label: "Meta açıklama", type: "textarea", rows: 3, full: true },
      { key: "footerNote", label: "Alt bilgi metni", type: "textarea", rows: 2, full: true },
    ],
  },
];

export const ADMIN_TABS = [
  { id: "genel", label: "Marka & Hero" },
  { id: "hakkinda", label: "Hakkında" },
  { id: "bolumler", label: "Bölüm Başlıkları" },
  { id: "ozellikler", label: "Özellikler" },
  { id: "neden", label: "Neden Biz" },
  { id: "galeri", label: "Galeri" },
  { id: "videolar", label: "Videolar" },
  { id: "sss", label: "SSS" },
  { id: "iletisim", label: "İletişim & Karekod" },
  { id: "seo", label: "SEO & Alt Bilgi" },
] as const;

export type AdminTabId = (typeof ADMIN_TABS)[number]["id"];
