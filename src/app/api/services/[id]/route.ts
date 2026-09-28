import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { services } from "@/db/schema";
import { eq, or } from "drizzle-orm";
import { getAdminSession } from "@/lib/auth";
import { serviceSchema } from "@/lib/validations";
import { isUUID } from "@/lib/utils";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getAdminSession();
    const isAdmin = Boolean(session);

    const condition = isUUID(id)
      ? or(eq(services.id, id), eq(services.slug, id))
      : eq(services.slug, id);

    const [item] = await db
      .select()
      .from(services)
      .where(condition);

    if (!item) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    if (!isAdmin && item.status !== "published") {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, service: item });
  } catch (err) {
    console.error("Service GET error:", err);
    return NextResponse.json({ error: "Failed to fetch service" }, { status: 500 });
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
    const result = serviceSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 });
    }

    const [updated] = await db
      .update(services)
      .set({ ...result.data, updatedAt: new Date() })
      .where(eq(services.id, id))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, service: updated });
  } catch (err: any) {
    console.error("Service PUT error:", err);
    if (err?.code === "23505") {
      return NextResponse.json({ error: "A service with this slug already exists" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const [deleted] = await db.delete(services).where(eq(services.id, id)).returning();
    if (!deleted) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Service deleted successfully" });
  } catch (err) {
    console.error("Service DELETE error:", err);
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
  }
}
