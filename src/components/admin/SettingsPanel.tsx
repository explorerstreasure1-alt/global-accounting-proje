import { saveSettings } from "@/app/admin/actions";
import { Icon } from "@/components/site/icons";
import type { SiteSettings } from "@/db/schema";
import { SETTINGS_GROUPS } from "@/lib/admin-fields";
import { MediaField } from "./MediaField";
import { localeInfo, type Locale } from "@/lib/locales";

function SaveButton({ label = "Kaydet" }: { label?: string }) {
  return (
    <button type="submit" className="btn-primary px-5 py-2.5 text-[0.8rem]">
      <Icon name="check" className="h-4 w-4" />
      {label}
    </button>
  );
}

export function SettingsPanel({
  groupId,
  settings,
  locale,
}: {
  groupId: string;
  settings: SiteSettings;
  locale: Locale;
}) {
  const group = SETTINGS_GROUPS.find((item) => item.id === groupId);
  if (!group) return null;

  return (
    <form action={saveSettings} className="space-y-4">
      <input type="hidden" name="tab" value={group.id} />
      <input type="hidden" name="locale" value={locale} />

      <div className="rounded-2xl border border-black/[0.07] bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold tracking-tight text-ink">
              {group.title}
              <span className="ml-2 rounded-full bg-accent-soft px-2 py-0.5 text-[0.65rem] font-semibold text-accent">
                {localeInfo(locale).code.toUpperCase()} · {localeInfo(locale).label}
              </span>
            </h2>
            <p className="mt-1 max-w-xl text-[0.8rem] leading-relaxed text-ink/55">
              {group.description}
            </p>
          </div>
          <SaveButton />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {group.fields.map((field) => {
            const value = settings[field.key] ?? "";
            const wide = field.full || field.type === "textarea" || field.type === "image";

            if (field.type === "image") {
              return (
                <div key={field.key} className={wide ? "sm:col-span-2" : ""}>
                  <MediaField
                    name={field.key}
                    label={field.label}
                    defaultValue={value}
                    help={field.help}
                  />
                </div>
              );
            }

            return (
              <div key={field.key} className={wide ? "sm:col-span-2" : ""}>
                <label className="admin-label" htmlFor={field.key}>
                  {field.label}
                </label>

                {field.type === "textarea" ? (
                  <textarea
                    id={field.key}
                    name={field.key}
                    defaultValue={value}
                    rows={field.rows ?? 3}
                    placeholder={field.placeholder}
                    className="admin-input resize-y leading-relaxed"
                  />
                ) : field.type === "color" ? (
                  <div className="flex items-center gap-3">
                    <input
                      id={field.key}
                      name={field.key}
                      type="color"
                      defaultValue={/^#[0-9a-fA-F]{6}$/.test(value) ? value : "#0f9d76"}
                      className="h-11 w-16 cursor-pointer rounded-xl border border-black/10 bg-white p-1"
                    />
                    <span className="rounded-lg bg-cream px-2.5 py-1.5 font-mono text-[0.72rem] text-ink/60">
                      {value || "#0f9d76"}
                    </span>
                    <span className="text-[0.7rem] leading-snug text-ink/45">
                      Sitedeki buton, vurgu ve ikon renklerini belirler.
                    </span>
                  </div>
                ) : (
                  <input
                    id={field.key}
                    name={field.key}
                    type={field.type === "url" ? "url" : "text"}
                    defaultValue={value}
                    placeholder={field.placeholder}
                    className="admin-input"
                  />
                )}

                {field.help ? (
                  <p className="mt-1.5 text-[0.7rem] leading-relaxed text-ink/45">
                    {field.help}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-between gap-3 border-t border-black/[0.06] pt-4">
          <p className="text-[0.72rem] text-ink/45">
            Değişiklikler kaydedildiği anda sitede görünür.
          </p>
          <SaveButton label="Değişiklikleri kaydet" />
        </div>
      </div>
    </form>
  );
}
