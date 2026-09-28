import { db } from "./index";
import { services } from "./schema";

async function main() {
  try {
    const list = await db.select().from(services);
    console.log("Current services count:", list.length);
    for (const s of list) {
      console.log(`- ${s.title} (${s.slug})`);
    }
    process.exit(0);
  } catch (err) {
    console.error("DB error:", err);
    process.exit(1);
  }
}

main();
