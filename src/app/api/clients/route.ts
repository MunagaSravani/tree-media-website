import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { clients } from "@/db/schema";
import { asc, eq, and } from "drizzle-orm";
import { getAdminSession } from "@/lib/auth";
import { clientSchema } from "@/lib/validations";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const all = searchParams.get("all") === "true";
    const statusParam = searchParams.get("status");

    const session = await getAdminSession();
    const isAdmin = Boolean(session);

    const conditions = [];
    if (!isAdmin && !all) {
      conditions.push(eq(clients.status, "published"));
    } else if (statusParam && statusParam !== "all") {
      conditions.push(eq(clients.status, statusParam));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;
    const items = await db.select().from(clients).where(whereClause).orderBy(asc(clients.displayOrder));

    return NextResponse.json({ success: true, count: items.length, clients: items });
  } catch (err) {
    console.error("Clients GET error:", err);
    return NextResponse.json({ error: "Failed to fetch clients" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const result = clientSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 });
    }

    const [created] = await db.insert(clients).values(result.data).returning();
    return NextResponse.json({ success: true, client: created }, { status: 201 });
  } catch (err) {
    console.error("Clients POST error:", err);
    return NextResponse.json({ error: "Failed to create client" }, { status: 500 });
  }
}
