import {
  imgAlphonso1, imgAlphonso2,
  imgBanganapalli1,
  imgCherukuRasam1, imgCherukuRasam2,
  imgChinnaRasalu1,
  imgDasheri1, imgDasheri2,
  imgImamPasand1, imgImamPasand2, imgImamPasand3,
  imgKalepad1, imgKalepad2,
  imgKesar1,
  imgMalgova1, imgMalgova2,
  imgMallika1, imgMallika2,
  imgNeelam1, imgNeelam2,
  imgPanduri1, imgPanduri2,
  imgPeddaRasalu1, imgPeddaRasalu2,
  imgSindhura1, imgSindhura2,
  imgSuwarnaRekha1, imgSuwarnaRekha2,
} from "./images";

export interface Mango {
  id: number;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  images: string[];
  season: string;
  origin: string;
  taste: string;
  tags: string[];
  featured?: boolean;
}

export const mangoes: Mango[] = [
  {
    id: 1,
    name: "Alphonso",
    slug: "alphonso",
    description: "Known as the king of mangoes, Alphonso is rich, creamy, and highly aromatic with a sweet taste.",
    longDescription: "Alphonso, the undisputed King of Mangoes, is celebrated worldwide for its rich, creamy texture and intoxicatingly sweet aroma. Grown predominantly in the Ratnagiri and Sindhudurg districts of Maharashtra, each Alphonso carries a GI tag certifying its heritage. The deep saffron-colored pulp is fiberless, non-stringy, and melts in your mouth with an extraordinary sweetness that lingers. Season: April to June.",
    images: [imgAlphonso1, imgAlphonso2],
    season: "April – June",
    origin: "Maharashtra, India",
    taste: "Sweet, Rich & Creamy",
    tags: ["Premium", "King of Mangoes", "GI Tagged"],
    featured: true,
  },
  {
    id: 2,
    name: "Banganapalli",
    slug: "banganapalli",
    description: "Large, sweet mango with smooth texture and minimal fiber, popular for fresh consumption.",
    longDescription: "Banganapalli, also known as 'Benishan', is one of the most popular mango varieties in South India. Named after the town of Banganapalle in Andhra Pradesh, this GI-tagged mango is large, oblong-shaped with thin skin and bright yellow pulp. It has a smooth, fiberless texture with a mild sweetness that makes it perfect for fresh eating, juices, and desserts.",
    images: [imgBanganapalli1],
    season: "March – June",
    origin: "Andhra Pradesh, India",
    taste: "Mild Sweet & Fiberless",
    tags: ["GI Tagged", "South Indian", "Popular"],
    featured: true,
  },
  {
    id: 3,
    name: "Cheruku Rasam",
    slug: "cheruku-rasam",
    description: "Extremely juicy and sweet mango, often used for juices and traditional drinks.",
    longDescription: "Cheruku Rasam means 'sugarcane juice' in Telugu, a testament to its extraordinary juiciness and sweetness. This traditional Andhra variety is prized for making fresh mango juice and traditional drinks during summer festivals. The pulp is intensely sweet with a distinct aroma that evokes nostalgia and is a seasonal favorite in Andhra Pradesh.",
    images: [imgCherukuRasam1, imgCherukuRasam2],
    season: "May – July",
    origin: "Andhra Pradesh, India",
    taste: "Extremely Juicy & Sweet",
    tags: ["Juice Mango", "Traditional", "Summer Special"],
  },
  {
    id: 4,
    name: "Chinna Rasalu",
    slug: "chinna-rasalu",
    description: "Small-sized mango with intense sweetness and high juice content.",
    longDescription: "Chinna Rasalu (meaning 'small juice mango') is a beloved small-sized variety from Andhra Pradesh. Despite its compact size, it packs an intense burst of sweetness and is loaded with juice. Traditional households in Andhra treat this mango as a seasonal delicacy, often sucking the sweet pulp right from the skin. It's perfect for making fresh juices and summer coolers.",
    images: [imgChinnaRasalu1],
    season: "May – June",
    origin: "Andhra Pradesh, India",
    taste: "Intensely Sweet & Juicy",
    tags: ["Small Variety", "High Juice", "Traditional"],
  },
  {
    id: 5,
    name: "Dasheri",
    slug: "dasheri",
    description: "Famous North Indian mango with a strong aroma, fiberless pulp, and rich sweetness.",
    longDescription: "Dasheri is the pride of North India, originating from the village of Dasheri near Lucknow in Uttar Pradesh. With its distinctive elongated shape and thin skin, Dasheri boasts a fiberless, rich orange pulp with an intoxicating aroma that can fill an entire room. It's one of the first mangoes to arrive in the season and is prized for its perfect balance of sweetness and tang.",
    images: [imgDasheri1, imgDasheri2],
    season: "June – August",
    origin: "Uttar Pradesh, India",
    taste: "Rich, Aromatic & Sweet",
    tags: ["North Indian", "Fiberless", "Popular"],
    featured: true,
  },
  {
    id: 6,
    name: "Imam Pasand",
    slug: "imam-pasand",
    description: "Delicate, sweet mango with a unique flavor and soft flesh, highly prized.",
    longDescription: "Imam Pasand, which translates to 'Imam's favorite', lives up to its royal name with its delicately sweet flavor and velvety soft flesh. This premium variety from the Nellore district of Andhra Pradesh is known for its large size, thin skin, and extraordinarily smooth, fiberless pulp. Its subtle sweetness and fragrance make it one of the most prized mangoes in South India.",
    images: [imgImamPasand1, imgImamPasand2, imgImamPasand3],
    season: "May – July",
    origin: "Andhra Pradesh, India",
    taste: "Delicate, Sweet & Velvety",
    tags: ["Premium", "Royal Variety", "Fiberless"],
  },
  {
    id: 7,
    name: "Kalepad",
    slug: "kalepad",
    description: "Traditional variety known for its balanced sweetness and regional popularity.",
    longDescription: "Kalepad is a traditional mango variety cherished in local communities for generations. Its name reflects its distinctive appearance and it offers a beautifully balanced flavor profile — not too sweet, not too tangy. The pulp is soft and smooth with a pleasant aroma. It's a variety that connects people to their roots and the authentic taste of regional mangoes.",
    images: [imgKalepad1, imgKalepad2],
    season: "May – June",
    origin: "South India",
    taste: "Balanced Sweet & Tangy",
    tags: ["Traditional", "Regional", "Heritage"],
  },
  {
    id: 8,
    name: "Kesar",
    slug: "kesar",
    description: "Bright orange pulp with a saffron-like aroma, very sweet and flavorful.",
    longDescription: "Kesar, aptly named after the golden spice saffron, is the 'Queen of Mangoes' from Gujarat. Primarily grown in the Gir region — famous for its lions — Kesar is celebrated for its distinctive bright orange pulp that resembles the precious saffron. The aroma is intoxicatingly floral, and the taste is exceptionally sweet with no fiber, making it a prized GI-tagged variety.",
    images: [imgKesar1],
    season: "May – July",
    origin: "Gujarat, India",
    taste: "Saffron-like Aroma & Sweet",
    tags: ["GI Tagged", "Queen of Mangoes", "Gujarat"],
    featured: true,
  },
  {
    id: 9,
    name: "Malgova",
    slug: "malgova",
    description: "Round, large mango with thick skin and juicy, mildly sweet pulp.",
    longDescription: "Malgova is known as the 'King of South Indian Mangoes'. This large, round mango has a distinctive thick skin with a deep golden-yellow flesh that is juicy and mildly sweet. Grown primarily in Tamil Nadu and Karnataka, Malgova is popular for its impressive size (often weighing 500g or more) and its refreshing mildness that makes it perfect for eating fresh or making milkshakes.",
    images: [imgMalgova1, imgMalgova2],
    season: "May – July",
    origin: "Tamil Nadu, India",
    taste: "Mildly Sweet & Juicy",
    tags: ["Large Variety", "South Indian", "Popular"],
  },
  {
    id: 10,
    name: "Mallika",
    slug: "mallika",
    description: "Hybrid mango with strong aroma, low fiber, and rich sweetness.",
    longDescription: "Mallika is a prized hybrid variety developed by crossing the Neelum and Dasheri varieties at IARI, New Delhi. The result is a mango that combines the best of both parents — the intense sweetness and low fiber of Dasheri with the strong aroma and extended shelf life of Neelum. Mallika has a rich, complex flavor profile and is increasingly popular among mango connoisseurs.",
    images: [imgMallika1, imgMallika2],
    season: "June – August",
    origin: "Pan-India",
    taste: "Rich, Sweet & Aromatic",
    tags: ["Hybrid", "High Quality", "Low Fiber"],
  },
  {
    id: 11,
    name: "Neelam",
    slug: "neelam",
    description: "Small, aromatic mango that ripens late in the season with a sweet taste.",
    longDescription: "Neelam is the late-season sweetheart of mango lovers. While most varieties bow out by July, Neelam extends the mango season right through August, bringing relief to those who can't get enough. Named for its blue-green hue before ripening, the fully ripe Neelam turns a beautiful golden yellow with a distinctive intense aroma and rich sweetness that is uniquely its own.",
    images: [imgNeelam1, imgNeelam2],
    season: "July – September",
    origin: "South India",
    taste: "Sweet & Intensely Aromatic",
    tags: ["Late Season", "Aromatic", "Popular"],
  },
  {
    id: 12,
    name: "Panduri",
    slug: "panduri",
    description: "Popular regional mango known for its distinct flavor and juicy texture.",
    longDescription: "Panduri is a beloved regional mango variety that holds a special place in the hearts of locals. Known for its distinctive flavor that sets it apart from commercial varieties, Panduri offers a perfect balance of sweetness and acidity with a wonderfully juicy texture. It's a testament to India's incredible biodiversity of mango cultivars and a favorite among those who seek authentic, traditional tastes.",
    images: [imgPanduri1, imgPanduri2],
    season: "May – June",
    origin: "South India",
    taste: "Distinct & Juicy",
    tags: ["Regional", "Traditional", "Flavorful"],
  },
  {
    id: 13,
    name: "Pedda Rasalu",
    slug: "pedda-rasalu",
    description: "Larger version of Rasalu mango, extremely juicy and ideal for pulp extraction.",
    longDescription: "Pedda Rasalu (meaning 'Big Juice Mango') is the larger, more robust cousin of Chinna Rasalu. This Andhra Pradesh specialty is prized for its extraordinary juice content — one mango can yield an impressive amount of sweet, golden nectar. The pulp is smooth, fiberless, and intensely flavored, making it ideal for fresh juices, aamras (mango pulp dessert), and traditional summer preparations.",
    images: [imgPeddaRasalu1, imgPeddaRasalu2],
    season: "May – July",
    origin: "Andhra Pradesh, India",
    taste: "Sweet, Juicy & Rich",
    tags: ["Juice Mango", "Traditional", "Andhra"],
  },
  {
    id: 14,
    name: "Sindhura",
    slug: "sindhura",
    description: "Bright red-skinned mango with mildly sweet pulp and attractive appearance.",
    longDescription: "Sindhura is one of India's most visually striking mangoes, named after the vermillion-red (sindoor) color of its skin. One of the few Indian mango varieties with a naturally red blush, Sindhura stands out at any market stall. Despite its dramatic exterior, the pulp is a gentle orange-yellow with a mild, pleasant sweetness and smooth texture free of fiber. It's as beautiful to look at as it is delicious to eat.",
    images: [imgSindhura1, imgSindhura2],
    season: "May – July",
    origin: "Andhra Pradesh, India",
    taste: "Mildly Sweet & Attractive",
    tags: ["Red Mango", "Unique Variety", "Visual"],
  },
  {
    id: 15,
    name: "Suwarna Rekha",
    slug: "suwarna-rekha",
    description: "Golden-yellow mango with red streaks, known for its sweet and tangy flavor.",
    longDescription: "Suwarna Rekha, meaning 'golden line' in Sanskrit, is named for the distinctive red or golden lines that streak across its beautiful yellow skin. This traditional variety from Andhra Pradesh and Odisha offers a complex flavor profile — a perfect harmony of sweetness and mild tanginess that makes it uniquely memorable. The pulp is firm yet juicy with a pleasant floral aroma.",
    images: [imgSuwarnaRekha1, imgSuwarnaRekha2],
    season: "June – July",
    origin: "Andhra Pradesh, India",
    taste: "Sweet & Tangy Balance",
    tags: ["Heritage Variety", "Golden", "Traditional"],
  },
];

export const WHATSAPP_NUMBER = "919347325653"; // Format: country code + number without +

export function buildWhatsAppUrl(mango: Mango): string {
  const msg = encodeURIComponent(
    `Hello, I am interested in ordering *${mango.name}* mangoes from Mango Masti.\n\n` +
    `Variety: ${mango.name}\n` +
    `Origin: ${mango.origin}\n` +
    `Season: ${mango.season}\n\n` +
    `Could you please share the current availability and pricing? Thank you.`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

export function buildGenericWhatsAppUrl(): string {
  const msg = encodeURIComponent(
    `Hello, I would like to know more about the fresh mango varieties available at Mango Masti. Could you please share the current stock and pricing details? Thank you.`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}
