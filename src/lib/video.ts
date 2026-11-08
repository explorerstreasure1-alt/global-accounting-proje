export type ParsedVideo =
  | { kind: "file"; url: string }
  | { kind: "iframe"; url: string };

function youtubeId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.slice(1) || null;
    }
    if (parsed.hostname.includes("youtube.com")) {
      if (parsed.searchParams.get("v")) return parsed.searchParams.get("v");
      const parts = parsed.pathname.split("/").filter(Boolean);
      if (parts[0] === "embed" || parts[0] === "shorts") return parts[1] ?? null;
    }
  } catch {
    return null;
  }
  return null;
}

function vimeoId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.includes("vimeo.com")) return null;
    const parts = parsed.pathname.split("/").filter(Boolean);
    return parts.find((part) => /^\d+$/.test(part)) ?? null;
  } catch {
    return null;
  }
}

export function parseVideoUrl(raw: string | undefined | null): ParsedVideo | null {
  const url = raw?.trim();
  if (!url) return null;

  const yt = youtubeId(url);
  if (yt) {
    return {
      kind: "iframe",
      url: `https://www.youtube-nocookie.com/embed/${yt}?autoplay=1&rel=0`,
    };
  }

  const vimeo = vimeoId(url);
  if (vimeo) {
    return {
      kind: "iframe",
      url: `https://player.vimeo.com/video/${vimeo}?autoplay=1`,
    };
  }

  if (/\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(url) || url.startsWith("/api/media/")) {
    return { kind: "file", url };
  }

  return { kind: "iframe", url };
}
