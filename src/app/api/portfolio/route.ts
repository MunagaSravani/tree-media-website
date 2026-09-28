import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { desc, eq, and } from "drizzle-orm";
import { getAdminSession } from "@/lib/auth";
import { projectSchema } from "@/lib/validations";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const all = searchParams.get("all") === "true";
    const statusParam = searchParams.get("status");

    const session = await getAdminSession();
    const isAdmin = Boolean(session);

    const conditions = [];
    if (!isAdmin && !all) {
      conditions.push(eq(projects.status, "published"));
    } else if (statusParam && statusParam !== "all") {
      conditions.push(eq(projects.status, statusParam));
    }

    if (category && category !== "All") {
      conditions.push(eq(projects.category, category));
    }

    if (featured === "true") {
      conditions.push(eq(projects.isFeatured, true));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;
    const items = await db.select().from(projects).where(whereClause).orderBy(desc(projects.createdAt));

    return NextResponse.json({ success: true, count: items.length, projects: items });
  } catch (err) {
    console.error("Projects GET error:", err);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const result = projectSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 });
    }

    const [created] = await db.insert(projects).values(result.data).returning();
    return NextResponse.json({ success: true, project: created }, { status: 201 });
  } catch (err: any) {
    console.error("Projects POST error:", err);
    if (err?.code === "23505") {
      return NextResponse.json({ error: "A project with this slug already exists" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
