import { Metadata } from "next";
import { db } from "@/db";
import { clients } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import ClientsClientView from "./ClientsClientView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Clients & Studio Ecosystem | Tree Media Talent & Casting Agency",
  description:
    "Explore the premier theatrical studios, global streaming networks, luxury fashion houses, and advertising agencies collaborating across Tree Media's talent ecosystem.",
};

export default async function ClientsPage() {
  let brandPartners: any[] = [];
  try {
    brandPartners = await db
      .select()
      .from(clients)
      .where(eq(clients.status, "published"))
      .orderBy(asc(clients.displayOrder));
  } catch (err) {
    console.error("Error fetching clients from DB:", err);
  }

  return <ClientsClientView dbClients={brandPartners} />;
}
