import type { Benefit, Faq, Feature, SiteSettings } from "@/db/schema";
import { splitLines, splitParagraphs } from "@/lib/text";
import { parseVideoUrl } from "@/lib/video";
import { BrandMark, Icon } from "./icons";
import { SectionHeading } from "./SectionHeading";
import { t, type Locale } from "@/lib/locales";

export function About({ settings, locale }: { settings: SiteSettings; locale: Locale }) {
  const dict = t(locale);
  const paragraphs = splitParagraphs(settings.aboutText);
  const bullets = splitLines(settings.aboutBullets);
  const video = settings.aboutVideoUrl ? parseVideoUrl(settings.aboutVideoUrl) : null;

  return (
    <section id="hakkinda" className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
        <div>
          <SectionHeading
            eyebrow={settings.aboutEyebrow || dict.eyebrow.about}
            title={settings.aboutTitle}
            align="left"
          />

          <div className="rich-text mt-6 space-y-4 text-[0.9rem] leading-relaxed text-ink/65 sm:text-[0.95rem]">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {bullets.length > 0 ? (
            <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
              {bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-2.5 rounded-xl border border-black/[0.05] bg-white px-3 py-2.5 text-[0.82rem] leading-snug text-ink/70"
                >
                  <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                    <Icon name="check" className="h-2.5 w-2.5" />
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="relative">
          <div className="absolute -inset-3 -z-10 rounded-[2.2rem] bg-accent-soft" />
          <div className="overflow-hidden rounded-[1.75rem] border border-black/[0.06] bg-white p-2 shadow-[0_36px_70px_-45px_rgba(7,30,22,0.6)]">
            {video ? (
              video.kind === "file" ? (
                <video
                  src={video.url}
                  controls
                  playsInline
                  className="aspect-[4/3] w-full rounded-[1.35rem] bg-ink object-cover"
                />
              ) : (
                <iframe
                  src={video.url.replace("autoplay=1", "autoplay=0")}
                  title={settings.aboutTitle}
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="aspect-[4/3] w-full rounded-[1.35rem] border-0"
                />
              )
            ) : settings.aboutImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={settings.aboutImageUrl}
                alt={settings.aboutTitle}
                className="aspect-[4/3] w-full rounded-[1.35rem] object-cover"
              />
            ) : null}
          </div>

          <div className="absolute -bottom-5 left-4 flex items-center gap-2.5 rounded-xl border border-black/[0.06] bg-white px-3.5 py-2.5 shadow-xl">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-white">
              <Icon name="devices" className="h-4 w-4" />
            </span>
            <span className="text-[0.72rem] leading-tight">
              <span className="block font-semibold text-ink">{dict.aboutCardTitle}</span>
              <span className="block text-ink/50">{dict.aboutCardSub}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Features({
  settings,
  items,
  locale,
}: {
  settings: SiteSettings;
  items: Feature[];
  locale: Locale;
}) {
  const dict = t(locale);
  if (items.length === 0) return null;
  return (
    <section id="ozellikler" className="mx-auto max-w-6xl px-4 pb-16 sm:pb-20">
      <SectionHeading
        eyebrow={dict.eyebrow.features}
        title={settings.featuresTitle}
        subtitle={settings.featuresSubtitle}
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <article
            key={item.id}
            className="card-hover group relative overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-6"
          >
            <div className="flex items-start justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-accent-line bg-accent-soft text-accent">
                <Icon name={item.icon} className="h-5 w-5" />
              </span>
              <span className="text-xs font-semibold tracking-widest text-ink/20">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-5 text-[1.02rem] font-semibold leading-snug tracking-tight text-ink">
              {item.title}
            </h3>
            <p className="mt-2 text-[0.85rem] leading-relaxed text-ink/60">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Benefits({
  settings,
  items,
  locale,
}: {
  settings: SiteSettings;
  items: Benefit[];
  locale: Locale;
}) {
  const dict = t(locale);
  if (items.length === 0) return null;
  return (
    <section id="neden" className="mx-auto max-w-6xl px-4 pb-16 sm:pb-20">
      <div className="relative overflow-hidden rounded-[2rem] bg-ink px-5 py-12 sm:px-10 sm:py-14">
        <div className="grid-overlay pointer-events-none absolute inset-0 opacity-60" />
        <div
          className="pointer-events-none absolute -left-20 top-1/3 h-64 w-64 rounded-full opacity-25 blur-3xl"
          style={{ backgroundColor: "var(--accent)" }}
        />
        <div className="relative">
          <SectionHeading
            eyebrow={dict.eyebrow.why}
            title={settings.benefitsTitle}
            subtitle={settings.benefitsSubtitle}
            tone="dark"
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {items.map((item, index) => (
              <article
                key={item.id}
                className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-sm transition hover:border-white/20 hover:bg-white/[0.07]"
              >
                <span
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-semibold text-ink"
                  style={{ backgroundColor: "var(--accent)" }}
                >
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-[0.98rem] font-semibold leading-snug text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[0.83rem] leading-relaxed text-white/55">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function FaqSection({
  settings,
  items,
  locale,
}: {
  settings: SiteSettings;
  items: Faq[];
  locale: Locale;
}) {
  const dict = t(locale);
  if (items.length === 0) return null;
  return (
    <section id="sss" className="mx-auto max-w-6xl px-4 pb-16 sm:pb-20">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <div>
          <SectionHeading
            eyebrow={dict.eyebrow.faq}
            title={settings.faqTitle}
            subtitle={settings.faqSubtitle}
            align="left"
          />
          <div className="mt-6 rounded-2xl border border-accent-line bg-accent-soft p-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-ink">
              <Icon name="qr" className="h-4 w-4 text-accent" />
              {dict.faqCtaTitle}
            </p>
            <p className="mt-1.5 text-[0.82rem] leading-relaxed text-ink/60">
              {dict.faqCtaText}
            </p>
            <a
              href={settings.appUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-4 px-4 py-2.5 text-[0.8rem]"
            >
              {dict.openApp}
              <Icon name="external" className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <div className="space-y-2.5">
          {items.map((item) => (
            <details
              key={item.id}
              className="group rounded-2xl border border-black/[0.07] bg-white px-5 py-4 transition open:shadow-[0_20px_45px_-35px_rgba(7,30,22,0.6)]"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-[0.9rem] font-medium text-ink">
                {item.question}
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-black/10 text-ink/50 transition group-open:rotate-45 group-open:border-accent group-open:bg-accent-soft group-open:text-accent">
                  <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 pr-8 text-[0.85rem] leading-relaxed text-ink/60">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactQr({ settings, locale }: { settings: SiteSettings; locale: Locale }) {
  const dict = t(locale);
  const contactRows = [
    settings.contactWhatsapp
      ? {
          icon: "message",
          label: dict.contact.whatsapp,
          value: settings.contactWhatsapp,
          href: `https://wa.me/${settings.contactWhatsapp.replace(/[^0-9]/g, "")}`,
        }
      : null,
    settings.contactPhone
      ? {
          icon: "phone",
          label: dict.contact.phone,
          value: settings.contactPhone,
          href: `tel:${settings.contactPhone.replace(/[^0-9+]/g, "")}`,
        }
      : null,
    settings.contactEmail
      ? {
          icon: "mail",
          label: dict.contact.email,
          value: settings.contactEmail,
          href: `mailto:${settings.contactEmail}`,
        }
      : null,
    settings.contactAddress
      ? { icon: "pin", label: dict.contact.address, value: settings.contactAddress, href: null }
      : null,
    settings.contactHours
      ? { icon: "clock", label: dict.contact.hours, value: settings.contactHours, href: null }
      : null,
  ].filter((row): row is NonNullable<typeof row> => Boolean(row));

  return (
    <section id="iletisim" className="mx-auto max-w-6xl px-4 pb-12 sm:pb-16">
      <div className="hero-shell relative overflow-hidden rounded-[2rem] px-5 py-12 sm:px-10 sm:py-14">
        <div className="grid-overlay pointer-events-none absolute inset-0 opacity-70" />
        <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/70">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: "var(--accent)" }}
              />
              {dict.eyebrow.qr}
            </span>
            <h2 className="mt-4 text-[1.7rem] font-semibold leading-tight tracking-tight text-white sm:text-[2.2rem]">
              {settings.contactTitle}
            </h2>
            <p className="mt-3 max-w-lg text-[0.9rem] leading-relaxed text-white/60">
              {settings.contactDescription}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={settings.appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-5 py-3 text-sm"
              >
                {dict.openApp}
                <Icon name="external" className="h-4 w-4" />
              </a>
              {settings.contactWhatsapp ? (
                <a
                  href={`https://wa.me/${settings.contactWhatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost px-5 py-3 text-sm"
                >
                  <Icon name="message" className="h-4 w-4" />
                  {dict.writeWhatsapp}
                </a>
              ) : null}
            </div>

            {contactRows.length > 0 ? (
              <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
                {contactRows.map((row) => (
                  <li
                    key={row.label}
                    className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2.5"
                  >
                    <Icon
                      name={row.icon}
                      className="mt-0.5 h-4 w-4 shrink-0"
                      style={{ color: "var(--accent)" }}
                    />
                    <span className="text-[0.78rem] leading-snug">
                      <span className="block text-white/40">{row.label}</span>
                      {row.href ? (
                        <a
                          href={row.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block font-medium text-white/85 hover:underline"
                        >
                          {row.value}
                        </a>
                      ) : (
                        <span className="block font-medium text-white/85">{row.value}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="mx-auto w-full max-w-sm">
            <div className="relative rounded-[1.75rem] border border-white/15 bg-white p-5 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]">
              <div className="flex items-center justify-between">
                <p className="text-[0.95rem] font-semibold leading-tight text-ink">
                  {settings.qrTitle}
                </p>
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-soft text-accent">
                  <Icon name="qr" className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-1.5 text-[0.72rem] leading-relaxed text-ink/55">
                {settings.qrDescription}
              </p>

              <div className="relative mt-4 rounded-2xl border border-black/[0.08] bg-white p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/api/qr?size=900"
                  alt={`${settings.siteName} uygulama karekodu`}
                  width={900}
                  height={900}
                  className="mx-auto aspect-square w-full max-w-[15rem]"
                />
                <span className="pointer-events-none absolute left-2 top-2 h-4 w-4 rounded-tl-md border-l-2 border-t-2 border-accent" />
                <span className="pointer-events-none absolute right-2 top-2 h-4 w-4 rounded-tr-md border-r-2 border-t-2 border-accent" />
                <span className="pointer-events-none absolute bottom-2 left-2 h-4 w-4 rounded-bl-md border-b-2 border-l-2 border-accent" />
                <span className="pointer-events-none absolute bottom-2 right-2 h-4 w-4 rounded-br-md border-b-2 border-r-2 border-accent" />
              </div>

              <a
                href={settings.appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-3 w-full px-4 py-2.5 text-[0.8rem]"
              >
                {dict.openLink}
                <Icon name="external" className="h-3.5 w-3.5" />
              </a>
              {settings.qrNote ? (
                <p className="mt-2.5 text-center text-[0.65rem] leading-relaxed text-ink/45">
                  {settings.qrNote}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer({ settings, locale }: { settings: SiteSettings; locale: Locale }) {
  const dict = t(locale);
  const links = [
    ["#hakkinda", dict.nav.about],
    ["#ozellikler", dict.nav.features],
    ["#neden", dict.nav.why],
    ["#galeri", dict.nav.gallery],
    ["#sss", dict.nav.faq],
    ["#iletisim", dict.nav.qr],
  ];
  return (
    <footer className="mt-4 border-t border-black/[0.06] bg-white/60">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <BrandMark siteName={settings.siteName} logoUrl={settings.logoUrl} />
            <div>
              <p className="text-sm font-semibold text-ink">{settings.siteName}</p>
              <p className="text-[0.78rem] text-ink/50">{settings.brandTagline}</p>
              <a
                href={settings.appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-[0.75rem] font-medium text-accent hover:underline"
              >
                {settings.appUrl.replace(/^https?:\/\//, "")}
                <Icon name="external" className="h-3 w-3" />
              </a>
            </div>
          </div>

          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {links.map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  className="text-[0.8rem] font-medium text-ink/55 transition hover:text-ink"
                >
                  {label}
                </a>
              ))}
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-black/[0.06] pt-5 text-[0.72rem] text-ink/45 sm:flex-row sm:items-center sm:justify-between">
          <p>{settings.footerNote}</p>
          <a
            href="/admin"
            className="inline-flex items-center gap-1.5 self-start rounded-full border border-black/[0.08] px-2.5 py-1 text-[0.68rem] font-medium text-ink/40 transition hover:border-accent hover:text-accent sm:self-auto"
          >
            <Icon name="lock" className="h-3 w-3" />
            {dict.admin}
          </a>
        </div>
      </div>
    </footer>
  );
}
