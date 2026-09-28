import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { profiles } from "@/db/schema";
import { desc, eq, and, ilike, or, sql } from "drizzle-orm";
import { getAdminSession } from "@/lib/auth";
import { profileSchema } from "@/lib/validations";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const gender = searchParams.get("gender") || "";
    const location = searchParams.get("location") || "";
    const featured = searchParams.get("featured");
    const statusParam = searchParams.get("status");
    const all = searchParams.get("all") === "true"; // admin requests all statuses

    const session = await getAdminSession();
    const isAdmin = Boolean(session);

    const conditions = [];

    // If not admin and not explicitly requesting a status, default to published
    if (!isAdmin && !all) {
      conditions.push(eq(profiles.status, "published"));
    } else if (statusParam && statusParam !== "all") {
      conditions.push(eq(profiles.status, statusParam));
    }

    if (category && category !== "All") {
      conditions.push(eq(profiles.category, category));
    }

    if (gender && gender !== "All") {
      conditions.push(eq(profiles.gender, gender));
    }

    if (location) {
      conditions.push(ilike(profiles.location, `%${location}%`));
    }

    if (featured === "true") {
      conditions.push(eq(profiles.isFeatured, true));
    }

    if (search.trim()) {
      const q = `%${search.trim()}%`;
      conditions.push(
        or(
          ilike(profiles.name, q),
          ilike(profiles.shortBio, q),
          ilike(profiles.location, q),
          ilike(profiles.category, q),
          sql`${profiles.skills}::text ILIKE ${q}`
        )
      );
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;
    const items = await db.select().from(profiles).where(whereClause).orderBy(desc(profiles.createdAt));

    return NextResponse.json({ success: true, count: items.length, profiles: items });
  } catch (err) {
    console.error("Profiles GET error:", err);
    return NextResponse.json({ error: "Failed to fetch profiles" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const result = profileSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 });
    }

    const [created] = await db.insert(profiles).values(result.data).returning();
    return NextResponse.json({ success: true, profile: created }, { status: 201 });
  } catch (err: any) {
    console.error("Profiles POST error:", err);
    if (err?.code === "23505") {
      return NextResponse.json({ error: "A profile with this slug already exists" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create profile" }, { status: 500 });
  }
}
