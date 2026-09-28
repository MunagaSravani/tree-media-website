import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { galleryMedia } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getAdminSession } from "@/lib/auth";
import { gallerySchema } from "@/lib/validations";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const [item] = await db.select().from(galleryMedia).where(eq(galleryMedia.id, id));
    if (!item) {
      return NextResponse.json({ error: "Media not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, media: item });
  } catch (err) {
    console.error("Gallery item GET error:", err);
    return NextResponse.json({ error: "Failed to fetch media" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const result = gallerySchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 });
    }

    const [updated] = await db.update(galleryMedia).set(result.data).where(eq(galleryMedia.id, id)).returning();
    if (!updated) {
      return NextResponse.json({ error: "Media not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, media: updated });
  } catch (err) {
    console.error("Gallery item PUT error:", err);
    return NextResponse.json({ error: "Failed to update media" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const [deleted] = await db.delete(galleryMedia).where(eq(galleryMedia.id, id)).returning();
    if (!deleted) {
      return NextResponse.json({ error: "Media not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Media deleted successfully" });
  } catch (err) {
    console.error("Gallery item DELETE error:", err);
    return NextResponse.json({ error: "Failed to delete media" }, { status: 500 });
  }
}
