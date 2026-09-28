import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { homepageSettings, agencyStatistics } from "@/db/schema";
import { asc, eq } from "drizzle-orm";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    const [settings] = await db.select().from(homepageSettings);
    const stats = await db.select().from(agencyStatistics).where(eq(agencyStatistics.isActive, true)).orderBy(asc(agencyStatistics.displayOrder));

    return NextResponse.json({ success: true, settings, stats });
  } catch (err) {
    console.error("Homepage GET error:", err);
    return NextResponse.json({ error: "Failed to fetch homepage content" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { settings, stats } = body;

    let updatedSettings = null;
    if (settings) {
      const [existing] = await db.select().from(homepageSettings);
      if (existing) {
        [updatedSettings] = await db
          .update(homepageSettings)
          .set({ ...settings, updatedAt: new Date() })
          .where(eq(homepageSettings.id, existing.id))
          .returning();
      } else {
        [updatedSettings] = await db.insert(homepageSettings).values(settings).returning();
      }
    }

    if (Array.isArray(stats)) {
      for (const stat of stats) {
        if (stat.id) {
          await db
            .update(agencyStatistics)
            .set({
              label: stat.label,
              value: stat.value,
              displayOrder: stat.displayOrder,
              isActive: stat.isActive ?? true,
            })
            .where(eq(agencyStatistics.id, stat.id));
        } else {
          await db.insert(agencyStatistics).values({
            label: stat.label,
            value: stat.value,
            displayOrder: stat.displayOrder ?? 0,
            isActive: stat.isActive ?? true,
          });
        }
      }
    }

    const currentStats = await db.select().from(agencyStatistics).orderBy(asc(agencyStatistics.displayOrder));

    return NextResponse.json({ success: true, settings: updatedSettings, stats: currentStats });
  } catch (err) {
    console.error("Homepage PUT error:", err);
    return NextResponse.json({ error: "Failed to update homepage content" }, { status: 500 });
  }
}
