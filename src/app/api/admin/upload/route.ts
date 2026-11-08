import { db } from "@/db";
import { media } from "@/db/schema";
import { isAuthenticated } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_IMAGE_BYTES = 12 * 1024 * 1024;
const MAX_VIDEO_BYTES = 45 * 1024 * 1024;

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "Yetkisiz istek." }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return Response.json({ error: "Dosya okunamadı." }, { status: 400 });
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return Response.json({ error: "Dosya bulunamadı." }, { status: 400 });
  }

  const mimeType = file.type || "application/octet-stream";
  const isImage = mimeType.startsWith("image/");
  const isVideo = mimeType.startsWith("video/");

  if (!isImage && !isVideo) {
    return Response.json(
      { error: "Yalnızca görsel veya video dosyaları yüklenebilir." },
      { status: 400 },
    );
  }

  const limit = isVideo ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES;
  if (file.size > limit) {
    return Response.json(
      {
        error: `Dosya çok büyük. En fazla ${Math.round(limit / (1024 * 1024))} MB yükleyebilirsiniz.`,
      },
      { status: 413 },
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const [row] = await db
    .insert(media)
    .values({
      filename: file.name || "dosya",
      mimeType,
      size: buffer.byteLength,
      data: buffer.toString("base64"),
    })
    .returning({ id: media.id });

  return Response.json({
    url: `/api/media/${row.id}`,
    filename: file.name,
    size: buffer.byteLength,
  });
}
