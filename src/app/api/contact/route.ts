import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { contactInformation } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const [info] = await db.select().from(contactInformation);
    return NextResponse.json({ success: true, contact: info });
  } catch (err) {
    console.error("Contact GET error:", err);
    return NextResponse.json({ error: "Failed to fetch contact info" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const [existing] = await db.select().from(contactInformation);

    let updated;
    if (existing) {
      [updated] = await db
        .update(contactInformation)
        .set({ ...body, updatedAt: new Date() })
        .where(eq(contactInformation.id, existing.id))
        .returning();
    } else {
      [updated] = await db.insert(contactInformation).values(body).returning();
    }

    return NextResponse.json({ success: true, contact: updated });
  } catch (err) {
    console.error("Contact PUT error:", err);
    return NextResponse.json({ error: "Failed to update contact info" }, { status: 500 });
  }
}
