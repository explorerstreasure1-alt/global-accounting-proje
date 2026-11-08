import QRCode from "qrcode";
import { getSiteData } from "@/lib/content";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
  const { settings } = await getSiteData("tr");
  const url = request.url;
  const target =
    settings.appUrl?.trim() || "https://global-accounting-omega.vercel.app";

  const requestedSize = Number(new URL(url).searchParams.get("size"));
  const size =
    Number.isFinite(requestedSize) && requestedSize >= 120
      ? Math.min(Math.trunc(requestedSize), 1600)
      : 720;

  const buffer = await QRCode.toBuffer(target, {
    type: "png",
    width: size,
    margin: 1,
    errorCorrectionLevel: "M",
    color: {
      dark: "#08231a",
      light: "#ffffff",
    },
  });

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
