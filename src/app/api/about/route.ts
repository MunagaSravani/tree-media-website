import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { aboutPageContent } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    const [content] = await db.select().from(aboutPageContent);
    return NextResponse.json({ success: true, content });
  } catch (err) {
    console.error("About GET error:", err);
    return NextResponse.json({ error: "Failed to fetch about content" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const [existing] = await db.select().from(aboutPageContent);

    let updated;
    if (existing) {
      [updated] = await db
        .update(aboutPageContent)
        .set({ ...body, updatedAt: new Date() })
        .where(eq(aboutPageContent.id, existing.id))
        .returning();
    } else {
      [updated] = await db.insert(aboutPageContent).values(body).returning();
    }

    return NextResponse.json({ success: true, content: updated });
  } catch (err) {
    console.error("About PUT error:", err);
    return NextResponse.json({ error: "Failed to update about content" }, { status: 500 });
  }
}
