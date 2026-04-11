import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { reviews } from "../src/app/db/schema";
import * as dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: resolve(__dirname, "../.env") });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

const db = drizzle(pool);

const seedReviews = [
  {
    name: "Priya Sharma",
    address: "Pune, Maharashtra",
    variety: "Alphonso",
    rating: 5,
    title: "Best mangoes I've ever had!",
    body: "Ordered Alphonso for the first time from MangoMasti and I'm completely blown away. The sweetness, the aroma — it's unlike anything you get at the market. Delivery was quick and the packaging was excellent. Will definitely order again!",
    approved: true,
  },
  {
    name: "Ravi Kumar",
    address: "Hyderabad, Telangana",
    variety: "Banganapalli",
    rating: 5,
    title: "Fresh and juicy, worth every rupee",
    body: "Got a 5kg box of Banganapalli. Every single mango was perfectly ripe, no bruising, no overripe ones. The taste is so much better than what we get locally. My kids finished them in two days!",
    approved: true,
  },
  {
    name: "Meena Iyer",
    address: "Chennai, Tamil Nadu",
    variety: "Kesar",
    rating: 4,
    title: "Really good quality, fast delivery",
    body: "The Kesar mangoes were lovely — rich saffron colour and very sweet. Slight delay in delivery but the quality made up for it. Would recommend to anyone looking for authentic Gujarat Kesar.",
    approved: true,
  },
  {
    name: "Ankit Joshi",
    address: "Ahmedabad, Gujarat",
    variety: "Dasheri",
    rating: 5,
    title: "Reminded me of my childhood!",
    body: "Growing up in UP, Dasheri was always special. MangoMasti's Dasheri took me right back. Perfectly aromatic, fiberless and incredibly sweet. Ordered for the whole family and everyone loved it.",
    approved: true,
  },
  {
    name: "Sunita Reddy",
    address: "Bengaluru, Karnataka",
    variety: "Sindhura",
    rating: 5,
    title: "Gorgeous red mangoes, amazing taste",
    body: "Never tried Sindhura before but saw it on MangoMasti and gave it a shot. So happy I did! The red skin is beautiful and the pulp is smooth and mildly sweet. Great for the whole family.",
    approved: true,
  },
  {
    name: "Deepak Verma",
    address: "Delhi, NCR",
    variety: "Mallika",
    rating: 4,
    title: "Great hybrid, strong aroma",
    body: "Mallika is a great variety for those who want something different. Strong aroma, low fiber and a rich sweet taste. Packaging was solid and everything arrived fresh. Will try Alphonso next time.",
    approved: true,
  },
];

async function main() {
  console.log("Inserting reviews...\n");

  for (const review of seedReviews) {
    const [inserted] = await db.insert(reviews).values(review).returning({ id: reviews.id, name: reviews.name });
    console.log(`✓ Inserted review #${inserted.id} — "${review.title}" by ${inserted.name}`);
  }

  console.log("\nAll 6 reviews inserted successfully.");
  await pool.end();
}

main().catch((err) => {
  console.error("Error inserting reviews:", err);
  pool.end();
  process.exit(1);
});
