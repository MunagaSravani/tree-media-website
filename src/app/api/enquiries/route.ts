import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { enquiries, profiles, services } from "@/db/schema";
import { desc, eq, and } from "drizzle-orm";
import { getAdminSession } from "@/lib/auth";
import { enquirySchema } from "@/lib/validations";

export async function GET(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const statusParam = searchParams.get("status");

    const conditions = [];
    if (statusParam && statusParam !== "all") {
      conditions.push(eq(enquiries.status, statusParam));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;
    const items = await db
      .select({
        id: enquiries.id,
        name: enquiries.name,
        email: enquiries.email,
        phone: enquiries.phone,
        subject: enquiries.subject,
        message: enquiries.message,
        status: enquiries.status,
        adminNotes: enquiries.adminNotes,
        createdAt: enquiries.createdAt,
        updatedAt: enquiries.updatedAt,
        serviceId: enquiries.serviceId,
        serviceTitle: services.title,
        profileId: enquiries.profileId,
        profileName: profiles.name,
      })
      .from(enquiries)
      .leftJoin(services, eq(enquiries.serviceId, services.id))
      .leftJoin(profiles, eq(enquiries.profileId, profiles.id))
      .where(whereClause)
      .orderBy(desc(enquiries.createdAt));

    return NextResponse.json({ success: true, count: items.length, enquiries: items });
  } catch (err) {
    console.error("Enquiries GET error:", err);
    return NextResponse.json({ error: "Failed to fetch enquiries" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = enquirySchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 });
    }

    const [created] = await db.insert(enquiries).values({
      name: result.data.name,
      email: result.data.email,
      phone: result.data.phone || null,
      subject: result.data.subject,
      message: result.data.message,
      serviceId: result.data.serviceId || null,
      profileId: result.data.profileId || null,
      status: "new",
    }).returning();

    return NextResponse.json({
      success: true,
      message: "Form Submitted Successfully",
      enquiryId: created.id
    }, { status: 201 });
  } catch (err) {
    console.error("Enquiry POST error:", err);
    return NextResponse.json({ error: "Failed to submit enquiry" }, { status: 500 });
  }
}
