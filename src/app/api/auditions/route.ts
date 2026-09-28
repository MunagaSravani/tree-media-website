import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { auditions } from "@/db/schema";
import { desc, eq, and, or, ilike, sql } from "drizzle-orm";
import { getAdminSession } from "@/lib/auth";
import { auditionSchema } from "@/lib/validations";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const location = searchParams.get("location");
    const urgentParam = searchParams.get("urgent");
    const featuredParam = searchParams.get("featured");
    const search = searchParams.get("search");
    const statusParam = searchParams.get("status");
    const limitParam = searchParams.get("limit");

    const session = await getAdminSession();
    const isAdmin = Boolean(session);

    const conditions = [];

    // Filter by status (default published for visitors)
    if (!isAdmin) {
      conditions.push(eq(auditions.status, "published"));
    } else if (statusParam && statusParam !== "all") {
      conditions.push(eq(auditions.status, statusParam));
    }

    // Filter by category
    if (category && category !== "All Categories" && category !== "all") {
      conditions.push(eq(auditions.category, category));
    }

    // Filter by location
    if (location && location !== "All Locations" && location !== "all") {
      conditions.push(eq(auditions.location, location));
    }

    // Filter by urgent
    if (urgentParam === "true") {
      conditions.push(eq(auditions.isUrgent, true));
    }

    // Filter by featured
    if (featuredParam === "true") {
      conditions.push(eq(auditions.isFeatured, true));
    }

    // Text search
    if (search && search.trim()) {
      const q = `%${search.trim().toLowerCase()}%`;
      conditions.push(
        or(
          ilike(auditions.title, q),
          ilike(auditions.shortDescription, q),
          ilike(auditions.fullDescription, q),
          ilike(auditions.productionHouse, q),
          ilike(auditions.rolesAvailable, q)
        )
      );
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    let query = db
      .select()
      .from(auditions)
      .where(whereClause)
      .orderBy(desc(auditions.isFeatured), desc(auditions.createdAt));

    if (limitParam && !isNaN(Number(limitParam))) {
      query = query.limit(Number(limitParam)) as typeof query;
    }

    const items = await query;

    return NextResponse.json({
      success: true,
      count: items.length,
      auditions: items,
    });
  } catch (err) {
    console.error("Auditions GET error:", err);
    return NextResponse.json({ error: "Failed to fetch auditions" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const result = auditionSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 });
    }

    const [created] = await db.insert(auditions).values(result.data).returning();
    return NextResponse.json({ success: true, audition: created }, { status: 201 });
  } catch (err: any) {
    console.error("Auditions POST error:", err);
    return NextResponse.json({ error: "Failed to create audition" }, { status: 500 });
  }
}
