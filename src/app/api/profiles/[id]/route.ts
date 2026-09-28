import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { profiles } from "@/db/schema";
import { eq, or } from "drizzle-orm";
import { getAdminSession } from "@/lib/auth";
import { profileSchema } from "@/lib/validations";
import { isUUID } from "@/lib/utils";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getAdminSession();
    const isAdmin = Boolean(session);

    // Look up by ID or by slug
    const condition = isUUID(id)
      ? or(eq(profiles.id, id), eq(profiles.slug, id))
      : eq(profiles.slug, id);

    const [item] = await db
      .select()
      .from(profiles)
      .where(condition);

    if (!item) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    if (!isAdmin && item.status !== "published") {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, profile: item });
  } catch (err) {
    console.error("Profile GET error:", err);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
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
    const result = profileSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 });
    }

    const [updated] = await db
      .update(profiles)
      .set({ ...result.data, updatedAt: new Date() })
      .where(eq(profiles.id, id))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, profile: updated });
  } catch (err: any) {
    console.error("Profile PUT error:", err);
    if (err?.code === "23505") {
      return NextResponse.json({ error: "A profile with this slug already exists" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const [deleted] = await db.delete(profiles).where(eq(profiles.id, id)).returning();
    if (!deleted) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Profile deleted successfully" });
  } catch (err) {
    console.error("Profile DELETE error:", err);
    return NextResponse.json({ error: "Failed to delete profile" }, { status: 500 });
  }
}
