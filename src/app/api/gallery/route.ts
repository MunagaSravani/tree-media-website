import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { galleryMedia } from "@/db/schema";
import { asc, eq, and } from "drizzle-orm";
import { getAdminSession } from "@/lib/auth";
import { gallerySchema } from "@/lib/validations";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type"); // 'image' | 'video'
    const all = searchParams.get("all") === "true";
    const statusParam = searchParams.get("status");

    const session = await getAdminSession();
    const isAdmin = Boolean(session);

    const conditions = [];
    if (!isAdmin && !all) {
      conditions.push(eq(galleryMedia.status, "published"));
    } else if (statusParam && statusParam !== "all") {
      conditions.push(eq(galleryMedia.status, statusParam));
    }

    if (type && type !== "all") {
      conditions.push(eq(galleryMedia.mediaType, type));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;
    const items = await db.select().from(galleryMedia).where(whereClause).orderBy(asc(galleryMedia.displayOrder));

    return NextResponse.json({ success: true, count: items.length, media: items });
  } catch (err) {
    console.error("Gallery GET error:", err);
    return NextResponse.json({ error: "Failed to fetch gallery media" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const result = gallerySchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 });
    }

    const [created] = await db.insert(galleryMedia).values(result.data).returning();
    return NextResponse.json({ success: true, media: created }, { status: 201 });
  } catch (err) {
    console.error("Gallery POST error:", err);
    return NextResponse.json({ error: "Failed to create gallery media" }, { status: 500 });
  }
}
