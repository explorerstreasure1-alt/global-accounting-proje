"use client";

import type { ReactNode } from "react";
import {
  deleteBenefit,
  deleteFaq,
  deleteFeature,
  deleteGalleryItem,
  deleteVideo,
  saveBenefit,
  saveFaq,
  saveFeature,
  saveGalleryItem,
  saveVideo,
} from "@/app/admin/actions";
import { Icon } from "@/components/site/icons";
import type { Benefit, Faq, Feature, GalleryItem, Video } from "@/db/schema";
import { FEATURE_ICONS, chapterSuggestionsFor } from "@/lib/defaults";
import { localeInfo, type Locale } from "@/lib/locales";
import { MediaField } from "./MediaField";

type Action = (formData: FormData) => Promise<never>;

function PanelHeader({ title, description, locale }: { title: string; description: string; locale?: Locale }) {
  return (
    <div className="rounded-2xl border border-black/[0.07] bg-white p-5 shadow-sm">
      <h2 className="text-base font-semibold tracking-tight text-ink">
        {title}
        {locale ? (
          <span className="ml-2 rounded-full bg-accent-soft px-2 py-0.5 text-[0.65rem] font-semibold text-accent">
            {localeInfo(locale).code.toUpperCase()} · {localeInfo(locale).label}
          </span>
        ) : null}
      </h2>
      <p className="mt-1 max-w-2xl text-[0.8rem] leading-relaxed text-ink/55">{description}</p>
    </div>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <span className="admin-label">{label}</span>
      {children}
    </div>
  );
}

function ActiveCheck({ checked }: { checked: boolean }) {
  return (
    <label className="inline-flex items-center gap-2 text-[0.72rem] font-medium text-ink/65">
      <input
        type="checkbox"
        name="isActive"
        defaultChecked={checked}
        className="h-4 w-4 rounded border-black/20 accent-[var(--accent)]"
      />
      Yayında
    </label>
  );
}

function SaveButton({ label = "Kaydet" }: { label?: string }) {
  return (
    <button type="submit" className="btn-primary px-4 py-2 text-[0.75rem]">
      <Icon name="check" className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}

function DeleteForm({ action, id, label, locale }: { action: Action; id: number; label: string; locale: Locale }) {
  return (
    <form
      action={action}
      className="mt-2 border-t border-black/[0.05] pt-2 text-right"
      onSubmit={(event) => {
        if (!window.confirm(`${label} işlemini onaylıyor musunuz?`)) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="locale" value={locale} />
      <button
        type="submit"
        className="text-[0.7rem] font-medium text-red-600/80 transition hover:text-red-700 hover:underline"
      >
        {label}
      </button>
    </form>
  );
}

function ItemCard({
  title,
  isActive,
  children,
  imageUrl,
}: {
  title: string;
  isActive: boolean;
  children: ReactNode;
  imageUrl?: string;
}) {
  return (
    <div className="rounded-2xl border border-black/[0.07] bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <p className="line-clamp-2 text-[0.85rem] font-semibold leading-snug text-ink">
          {title || "Başlıksız kayıt"}
        </p>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide ${
            isActive ? "bg-accent-soft text-accent" : "bg-black/5 text-ink/40"
          }`}
        >
          {isActive ? "Yayında" : "Gizli"}
        </span>
      </div>
      {imageUrl ? (
        <div className="mt-3 rounded-xl border border-black/[0.06] bg-white overflow-hidden">
          <img
            src={imageUrl}
            alt="Önizleme"
            className="w-full h-32 object-cover"
          />
        </div>
      ) : null}
      {children}
    </div>
  );
}

function NewItem({ label, children }: { label: string; children: ReactNode }) {
  return (
    <details className="group rounded-2xl border border-dashed border-black/15 bg-white/60 p-4">
      <summary className="flex cursor-pointer items-center gap-2 text-[0.8rem] font-semibold text-ink/70 transition hover:text-accent">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-accent-soft text-accent">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </span>
        {label}
      </summary>
      <div className="mt-4">{children}</div>
    </details>
  );
}

export function FeaturePanel({ items, locale }: { items: Feature[]; locale: Locale }) {
  const nextOrder = items.reduce((max, item) => Math.max(max, item.sortOrder), 0) + 1;
  return (
    <div className="space-y-4">
      <PanelHeader
        title="Uygulama özellikleri"
        locale={locale}
        description="Ana sayfadaki özellik kartları. İkon seçin, sıralamayı değiştirin, istemediğiniz kartı gizleyin veya silin."
      />
      <div className="grid gap-3 xl:grid-cols-2">
        {items.length > 0 ? (
          items.map((item) => (
            <ItemCard key={item.id} title={item.title} isActive={item.isActive}>
              <form action={saveFeature} className="mt-3 space-y-3">
                <input type="hidden" name="tab" value="ozellikler" />
                <input type="hidden" name="locale" value={locale} />
                <input type="hidden" name="id" value={item.id} />
                <Field label="Başlık">
                  <input name="title" defaultValue={item.title} className="admin-input" required />
                </Field>
                <Field label="Açıklama">
                  <textarea
                    name="description"
                    defaultValue={item.description}
                    rows={3}
                    className="admin-input resize-y"
                  />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="İkon">
                    <select name="icon" defaultValue={item.icon} className="admin-input">
                      {FEATURE_ICONS.map((icon) => (
                        <option key={icon.value} value={icon.value}>
                          {icon.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Sıra">
                    <input
                      type="number"
                      name="sortOrder"
                      defaultValue={item.sortOrder}
                      className="admin-input"
                    />
                  </Field>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <ActiveCheck checked={item.isActive} />
                  <SaveButton />
                </div>
              </form>
              <DeleteForm
                action={deleteFeature}
                id={item.id}
                label="Bu özelliği sil"
                locale={locale}
              />
            </ItemCard>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-black/15 bg-white/70 p-8 text-center text-[0.8rem] leading-relaxed text-ink/55">
            Henüz özellik yok. Aşağıdan yeni özellik ekleyin.
          </div>
        )}
      </div>
      <NewItem label="Yeni özellik ekle">
        <form action={saveFeature} className="grid gap-3 rounded-xl bg-white p-4 sm:grid-cols-2">
          <input type="hidden" name="tab" value="ozellikler" />
              <input type="hidden" name="locale" value={locale} />
          <Field label="Başlık" className="sm:col-span-2">
            <input name="title" className="admin-input" required placeholder="Örn. Bluetooth termal baskı" />
          </Field>
          <Field label="Açıklama" className="sm:col-span-2">
            <textarea name="description" rows={3} className="admin-input resize-y" />
          </Field>
          <Field label="İkon">
            <select name="icon" defaultValue="sparkles" className="admin-input">
              {FEATURE_ICONS.map((icon) => (
                <option key={icon.value} value={icon.value}>
                  {icon.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Sıra">
            <input type="number" name="sortOrder" defaultValue={nextOrder} className="admin-input" />
          </Field>
          <div className="flex items-center justify-between gap-2 sm:col-span-2">
            <ActiveCheck checked />
            <SaveButton label="Özellik ekle" />
          </div>
        </form>
      </NewItem>
    </div>
  );
}

export function BenefitPanel({ items, locale }: { items: Benefit[]; locale: Locale }) {
  const nextOrder = items.reduce((max, item) => Math.max(max, item.sortOrder), 0) + 1;
  return (
    <div className="space-y-4">
      <PanelHeader
        title="Neden kullanmalı maddeleri"
        locale={locale}
        description="Sayfadaki numaralı madde listesi. Her madde bir başlık ve kısa açıklamadan oluşur."
      />
      <div className="grid gap-3 xl:grid-cols-2">
        {items.length > 0 ? (
          items.map((item) => (
            <ItemCard key={item.id} title={item.title} isActive={item.isActive}>
              <form action={saveBenefit} className="mt-3 space-y-3">
                <input type="hidden" name="tab" value="neden" />
                <input type="hidden" name="locale" value={locale} />
                <input type="hidden" name="id" value={item.id} />
                <Field label="Başlık">
                  <input name="title" defaultValue={item.title} className="admin-input" required />
                </Field>
                <Field label="Açıklama">
                  <textarea
                    name="description"
                    defaultValue={item.description}
                    rows={2}
                    className="admin-input resize-y"
                  />
                </Field>
                <div className="grid grid-cols-2 items-end gap-3">
                  <Field label="Sıra">
                    <input
                      type="number"
                      name="sortOrder"
                      defaultValue={item.sortOrder}
                      className="admin-input"
                    />
                  </Field>
                  <div className="flex items-center justify-end gap-2">
                    <ActiveCheck checked={item.isActive} />
                    <SaveButton />
                  </div>
                </div>
              </form>
              <DeleteForm
                action={deleteBenefit}
                id={item.id}
                label="Bu maddeyi sil"
                locale={locale}
              />
            </ItemCard>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-black/15 bg-white/70 p-8 text-center text-[0.8rem] leading-relaxed text-ink/55">
            Henüz madde yok. Aşağıdan yeni madde ekleyin.
          </div>
        )}
      </div>
      <NewItem label="Yeni madde ekle">
        <form action={saveBenefit} className="grid gap-3 rounded-xl bg-white p-4">
          <input type="hidden" name="tab" value="neden" />
              <input type="hidden" name="locale" value={locale} />
          <Field label="Başlık">
            <input name="title" className="admin-input" required />
          </Field>
          <Field label="Açıklama">
            <textarea name="description" rows={2} className="admin-input resize-y" />
          </Field>
          <div className="grid grid-cols-2 items-end gap-3">
            <Field label="Sıra">
              <input type="number" name="sortOrder" defaultValue={nextOrder} className="admin-input" />
            </Field>
            <div className="flex items-center justify-end gap-2">
              <ActiveCheck checked />
              <SaveButton label="Madde ekle" />
            </div>
          </div>
        </form>
      </NewItem>
    </div>
  );
}

export function GalleryPanel({ items, locale }: { items: GalleryItem[]; locale: Locale }) {
  const nextOrder = items.reduce((max, item) => Math.max(max, item.sortOrder), 0) + 1;
  return (
    <div className="space-y-4">
      <PanelHeader
        title="Galeri görselleri"
        description="Bilgisayarınızdan görsel yükleyin veya hazır bir görsel adresi girin. Görseller ana sayfada kare kartlar halinde listelenir."
      />
      <div className="grid gap-3 xl:grid-cols-2">
        {items.length > 0 ? (
          items.map((item) => (
            <ItemCard
              key={item.id}
              title={item.title || "Görsel"}
              isActive={item.isActive}
              imageUrl={item.imageUrl || undefined}
            >
              <form action={saveGalleryItem} className="mt-3 space-y-3">
                <input type="hidden" name="tab" value="galeri" />
                <input type="hidden" name="locale" value={locale} />
                <input type="hidden" name="id" value={item.id} />
                <MediaField
                  name="imageUrl"
                  label="Görsel"
                  defaultValue={item.imageUrl}
                  help="JPG/PNG/WebP, en fazla 12 MB."
                />
                <Field label="Başlık">
                  <input name="title" defaultValue={item.title} className="admin-input" />
                </Field>
                <Field label="Açıklama">
                  <textarea
                    name="description"
                    defaultValue={item.description}
                    rows={2}
                    className="admin-input resize-y"
                  />
                </Field>
                <div className="grid grid-cols-2 items-end gap-3">
                  <Field label="Sıra">
                    <input
                      type="number"
                      name="sortOrder"
                      defaultValue={item.sortOrder}
                      className="admin-input"
                    />
                  </Field>
                  <div className="flex items-center justify-end gap-2">
                    <ActiveCheck checked={item.isActive} />
                    <SaveButton />
                  </div>
                </div>
              </form>
              <DeleteForm
                action={deleteGalleryItem}
                id={item.id}
                label="Bu görseli sil"
                locale={locale}
              />
            </ItemCard>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-black/15 bg-white/70 p-8 text-center text-[0.8rem] leading-relaxed text-ink/55">
            Henüz galeri görseli yok. Aşağıdan yeni görsel ekleyin.
          </div>
        )}
      </div>
      <NewItem label="Galeriye yeni görsel ekle">
        <form action={saveGalleryItem} className="grid gap-3 rounded-xl bg-white p-4">
          <input type="hidden" name="tab" value="galeri" />
              <input type="hidden" name="locale" value={locale} />
          <MediaField name="imageUrl" label="Görsel yükle" />
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Başlık">
              <input name="title" className="admin-input" />
            </Field>
            <Field label="Sıra">
              <input type="number" name="sortOrder" defaultValue={nextOrder} className="admin-input" />
            </Field>
          </div>
          <Field label="Açıklama">
            <textarea name="description" rows={2} className="admin-input resize-y" />
          </Field>
          <div className="flex items-center justify-between gap-2">
            <ActiveCheck checked />
            <SaveButton label="Görsel ekle" />
          </div>
        </form>
      </NewItem>
    </div>
  );
}

export function VideoPanel({ items, locale }: { items: Video[]; locale: Locale }) {
  const nextOrder = items.reduce((max, item) => Math.max(max, item.sortOrder), 0) + 1;
  const suggestions = chapterSuggestionsFor(locale);
  return (
    <div className="space-y-4">
      <PanelHeader
        title="Videolar"
        locale={locale}
        description="Her dil için ayrı tanıtım videoları yükleyin. Videolar sitede sol tarafta oynatıcı, sağ tarafta bölüm listesi (ör. Müşteri takibi, Etiket) olarak alt alta sıralanır. Sıra numarası listedeki yerini, öne çıkan işareti ilk açılan videoyu belirler."
      />
      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-black/15 bg-white/70 p-5 text-[0.8rem] leading-relaxed text-ink/55">
          Bu dil için henüz video yok. Aşağıdan ekleyin; önerilen bölümler:{" "}
          {suggestions.map((item) => `${item.chapter} – ${item.title}`).join(" · ")}
        </div>
      ) : null}
      <div className="grid gap-3 xl:grid-cols-2">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            title={item.title}
            isActive={item.isActive}
            imageUrl={item.thumbnailUrl || undefined}
          >
            <form action={saveVideo} className="mt-3 space-y-3">
              <input type="hidden" name="tab" value="videolar" />
              <input type="hidden" name="locale" value={locale} />
              <input type="hidden" name="id" value={item.id} />
              <div className="grid grid-cols-[7rem_1fr] gap-3">
                <Field label="Bölüm etiketi">
                  <input name="chapter" defaultValue={item.chapter} className="admin-input" placeholder={suggestions[0]?.chapter} />
                </Field>
                <Field label="Video başlığı (ör. Müşteri takibi)">
                  <input name="title" defaultValue={item.title} className="admin-input" required />
                </Field>
              </div>
              <MediaField
                name="videoUrl"
                label="Video (bağlantı veya dosya)"
                defaultValue={item.videoUrl}
                kind="video"
                help="YouTube/Vimeo adresi ya da MP4 dosyası. Yükleme sınırı 45 MB."
              />
              <MediaField
                name="thumbnailUrl"
                label="Kapak görseli"
                defaultValue={item.thumbnailUrl}
                help="Boş bırakılırsa video oynatıcı varsayılan kapak kullanır."
              />
              <Field label="Açıklama">
                <textarea
                  name="description"
                  defaultValue={item.description}
                  rows={2}
                  className="admin-input resize-y"
                />
              </Field>
              <div className="flex flex-wrap items-center gap-4">
                <label className="inline-flex items-center gap-2 text-[0.72rem] font-medium text-ink/65">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    defaultChecked={item.isFeatured}
                    className="h-4 w-4 rounded border-black/20 accent-[var(--accent)]"
                  />
                  Öne çıkan
                </label>
                <ActiveCheck checked={item.isActive} />
                <Field label="Sıra" className="w-24">
                  <input
                    type="number"
                    name="sortOrder"
                    defaultValue={item.sortOrder}
                    className="admin-input"
                  />
                </Field>
                <div className="ml-auto">
                  <SaveButton />
                </div>
              </div>
            </form>
            <DeleteForm action={deleteVideo} id={item.id} label="Bu videoyu sil" locale={locale} />
          </ItemCard>
        ))}
      </div>
      <NewItem label="Yeni video ekle">
        <form action={saveVideo} className="grid gap-3 rounded-xl bg-white p-4">
          <input type="hidden" name="tab" value="videolar" />
              <input type="hidden" name="locale" value={locale} />
          <div className="grid grid-cols-[7rem_1fr] gap-3">
            <Field label="Bölüm etiketi">
              <input name="chapter" className="admin-input" defaultValue={suggestions[nextOrder - 1]?.chapter ?? ""} placeholder="Bölüm 1" />
            </Field>
            <Field label="Video başlığı (ör. Müşteri takibi)">
              <input name="title" className="admin-input" required placeholder={suggestions[nextOrder - 1]?.title ?? ""} />
            </Field>
          </div>
          <MediaField name="videoUrl" label="Video (bağlantı veya dosya)" kind="video" />
          <MediaField name="thumbnailUrl" label="Kapak görseli" />
          <Field label="Açıklama">
            <textarea name="description" rows={2} className="admin-input resize-y" />
          </Field>
          <div className="flex flex-wrap items-center gap-4">
            <label className="inline-flex items-center gap-2 text-[0.72rem] font-medium text-ink/65">
              <input
                type="checkbox"
                name="isFeatured"
                className="h-4 w-4 rounded border-black/20 accent-[var(--accent)]"
              />
              Öne çıkan
            </label>
            <ActiveCheck checked />
            <Field label="Sıra" className="w-24">
              <input type="number" name="sortOrder" defaultValue={nextOrder} className="admin-input" />
            </Field>
            <div className="ml-auto">
              <SaveButton label="Video ekle" />
            </div>
          </div>
        </form>
      </NewItem>
    </div>
  );
}

export function FaqPanel({ items, locale }: { items: Faq[]; locale: Locale }) {
  const nextOrder = items.reduce((max, item) => Math.max(max, item.sortOrder), 0) + 1;
  return (
    <div className="space-y-4">
      <PanelHeader
        title="Sık sorulan sorular"
        locale={locale}
        description="Ziyaretçilerin en çok merak ettiği konular. Sorular ana sayfada açılır-kapanır liste olarak gösterilir."
      />
      <div className="grid gap-3 xl:grid-cols-2">
        {items.length > 0 ? (
          items.map((item) => (
            <ItemCard key={item.id} title={item.question} isActive={item.isActive}>
              <form action={saveFaq} className="mt-3 space-y-3">
                <input type="hidden" name="tab" value="sss" />
                <input type="hidden" name="locale" value={locale} />
                <input type="hidden" name="id" value={item.id} />
                <Field label="Soru">
                  <input name="question" defaultValue={item.question} className="admin-input" required />
                </Field>
                <Field label="Cevap">
                  <textarea
                    name="answer"
                    defaultValue={item.answer}
                    rows={3}
                    className="admin-input resize-y"
                  />
                </Field>
                <div className="grid grid-cols-2 items-end gap-3">
                  <Field label="Sıra">
                    <input
                      type="number"
                      name="sortOrder"
                      defaultValue={item.sortOrder}
                      className="admin-input"
                    />
                  </Field>
                  <div className="flex items-center justify-end gap-2">
                    <ActiveCheck checked={item.isActive} />
                    <SaveButton />
                  </div>
                </div>
              </form>
              <DeleteForm
                action={deleteFaq}
                id={item.id}
                label="Bu soruyu sil"
                locale={locale}
              />
            </ItemCard>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-black/15 bg-white/70 p-8 text-center text-[0.8rem] leading-relaxed text-ink/55">
            Henüz soru yok. Aşağıdan yeni soru ekleyin.
          </div>
        )}
      </div>
      <NewItem label="Yeni soru ekle">
        <form action={saveFaq} className="grid gap-3 rounded-xl bg-white p-4">
          <input type="hidden" name="tab" value="sss" />
              <input type="hidden" name="locale" value={locale} />
          <Field label="Soru">
            <input name="question" className="admin-input" required />
          </Field>
          <Field label="Cevap">
            <textarea name="answer" rows={3} className="admin-input resize-y" />
          </Field>
          <div className="grid grid-cols-2 items-end gap-3">
            <Field label="Sıra">
              <input type="number" name="sortOrder" defaultValue={nextOrder} className="admin-input" />
            </Field>
            <div className="flex items-center justify-end gap-2">
              <ActiveCheck checked />
              <SaveButton label="Soru ekle" />
            </div>
          </div>
        </form>
      </NewItem>
    </div>
  );
}
