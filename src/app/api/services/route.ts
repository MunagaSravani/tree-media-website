import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { services } from "@/db/schema";
import { asc, eq, and } from "drizzle-orm";
import { getAdminSession } from "@/lib/auth";
import { serviceSchema } from "@/lib/validations";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const all = searchParams.get("all") === "true";
    const statusParam = searchParams.get("status");

    const session = await getAdminSession();
    const isAdmin = Boolean(session);

    const conditions = [];
    if (!isAdmin && !all) {
      conditions.push(eq(services.status, "published"));
    } else if (statusParam && statusParam !== "all") {
      conditions.push(eq(services.status, statusParam));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;
    const items = await db.select().from(services).where(whereClause).orderBy(asc(services.displayOrder));

    return NextResponse.json({ success: true, count: items.length, services: items });
  } catch (err) {
    console.error("Services GET error:", err);
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const result = serviceSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 });
    }

    const [created] = await db.insert(services).values(result.data).returning();
    return NextResponse.json({ success: true, service: created }, { status: 201 });
  } catch (err: any) {
    console.error("Services POST error:", err);
    if (err?.code === "23505") {
      return NextResponse.json({ error: "A service with this slug already exists" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}
