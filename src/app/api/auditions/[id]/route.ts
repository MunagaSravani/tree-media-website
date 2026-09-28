import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { auditions } from "@/db/schema";
import { eq, or } from "drizzle-orm";
import { getAdminSession } from "@/lib/auth";
import { auditionSchema } from "@/lib/validations";
import { isUUID } from "@/lib/utils";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getAdminSession();
    const isAdmin = Boolean(session);

    const condition = isUUID(id)
      ? or(eq(auditions.id, id), eq(auditions.slug, id))
      : eq(auditions.slug, id);

    const [item] = await db.select().from(auditions).where(condition);

    if (!item) {
      return NextResponse.json({ error: "Audition not found" }, { status: 404 });
    }

    if (!isAdmin && item.status !== "published") {
      return NextResponse.json({ error: "Audition not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, audition: item });
  } catch (err) {
    console.error("Audition GET error:", err);
    return NextResponse.json({ error: "Failed to fetch audition" }, { status: 500 });
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
    const result = auditionSchema.partial().safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 });
    }

    const condition = isUUID(id) ? eq(auditions.id, id) : eq(auditions.slug, id);

    const [updated] = await db
      .update(auditions)
      .set({ ...result.data, updatedAt: new Date() })
      .where(condition)
      .returning();

    if (!updated) {
      return NextResponse.json({ error: "Audition not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, audition: updated });
  } catch (err: any) {
    console.error("Audition PUT error:", err);
    return NextResponse.json({ error: "Failed to update audition" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const condition = isUUID(id) ? eq(auditions.id, id) : eq(auditions.slug, id);

    const [deleted] = await db.delete(auditions).where(condition).returning();

    if (!deleted) {
      return NextResponse.json({ error: "Audition not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Audition deleted successfully" });
  } catch (err) {
    console.error("Audition DELETE error:", err);
    return NextResponse.json({ error: "Failed to delete audition" }, { status: 500 });
  }
}
