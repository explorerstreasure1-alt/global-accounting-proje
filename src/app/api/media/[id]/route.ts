import { eq } from "drizzle-orm";
import { db } from "@/db";
import { media } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isFinite(numericId) || numericId <= 0) {
    return new Response("Not found", { status: 404 });
  }

  const [row] = await db.select().from(media).where(eq(media.id, numericId)).limit(1);
  if (!row) {
    return new Response("Not found", { status: 404 });
  }

  const buffer = Buffer.from(row.data, "base64");
  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": row.mimeType,
      "Content-Length": String(buffer.byteLength),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
