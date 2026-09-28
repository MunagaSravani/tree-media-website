import { db } from "../src/db";
import { projects } from "../src/db/schema";
import { eq } from "drizzle-orm";

async function main() {
  console.log("Updating portfolio projects in database...");

  // Update Midnight Echoes
  const r1 = await db.update(projects).set({
    images: [
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=800&auto=format&fit=crop"
    ]
  }).where(eq(projects.slug, "midnight-echoes-indie-short")).returning();
  console.log("Midnight Echoes updated:", r1.length > 0 ? "SUCCESS" : "NOT FOUND");

  // Update Horizon of Silence
  const r2 = await db.update(projects).set({
    images: [
      "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop"
    ]
  }).where(eq(projects.slug, "horizon-of-silence-nordic-thriller")).returning();
  console.log("Horizon of Silence updated:", r2.length > 0 ? "SUCCESS" : "NOT FOUND");

  process.exit(0);
}

main().catch(err => {
  console.error("Migration error:", err);
  process.exit(1);
});
