import { db } from "../src/app/db";
import { mangoes } from "../src/app/db/schema";
import { eq } from "drizzle-orm";

// Prices in paise (₹ × 100)
const priceMap: Record<string, { originalPrice: number; discountedPrice: number }> = {
  "banganapalli": { originalPrice: 19000, discountedPrice: 15000 },
  "alphonso":     { originalPrice: 25000, discountedPrice: 20000 },
  "himayath":     { originalPrice: 40000, discountedPrice: 32000 },
  "kesar":        { originalPrice: 25000, discountedPrice: 20000 },
  "dasheri":      { originalPrice: 19000, discountedPrice: 15000 },
  "sindhura":     { originalPrice: 19000, discountedPrice: 15000 },
  "chinna-rasalu":  { originalPrice: 19000, discountedPrice: 15000 },
  "cheruku-rasam":  { originalPrice: 22500, discountedPrice: 18000 },
  "pedda-rasalu":   { originalPrice: 19000, discountedPrice: 15000 },
  "mallika":      { originalPrice: 19000, discountedPrice: 15000 },
};

async function updatePrices() {
  console.log("Updating mango prices...\n");

  for (const [slug, prices] of Object.entries(priceMap)) {
    const result = await db
      .update(mangoes)
      .set({
        originalPrice: prices.originalPrice,
        discountedPrice: prices.discountedPrice,
        updatedAt: new Date(),
      })
      .where(eq(mangoes.slug, slug))
      .returning({ id: mangoes.id, name: mangoes.name });

    if (result.length > 0) {
      const disc = (prices.discountedPrice / 100).toFixed(0);
      const orig = (prices.originalPrice / 100).toFixed(0);
      const pct = Math.round((1 - prices.discountedPrice / prices.originalPrice) * 100);
      console.log(`✓ ${result[0].name}: ₹${orig} → ₹${disc} (${pct}% OFF)`);
    } else {
      console.log(`⚠ No mango found for slug: ${slug}`);
    }
  }

  console.log("\nDone.");
  process.exit(0);
}

updatePrices().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
