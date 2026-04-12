import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { imgLogo } from "./lib/images";
import ConditionalNav from "./components/ConditionalNav";
import ConditionalFooter from "./components/ConditionalFooter";
import NavigationProgress from "./components/NavigationProgress";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MangoMasti — Premium Farm-Fresh Mangoes Delivered to Your Door",
  description:
    "Order 15+ varieties of premium, chemical-free Indian mangoes directly from our family orchards. Alphonso, Kesar, Dasheri & more. Delivered fresh via WhatsApp ordering.",
  keywords: "mangoes, fresh mangoes, alphonso, kesar, farm fresh mangoes, buy mangoes online, indian mangoes",
  openGraph: {
    title: "MangoMasti — Premium Farm-Fresh Mangoes",
    description: "Experience the richest, freshest mangoes from our family orchards. 15+ varieties, zero chemicals, delivered to your doorstep.",
    type: "website",
    images: [{ url: imgLogo, width: 4000, height: 2250, alt: "MangoMasti" }],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={urbanist.variable} style={{ colorScheme: "light" }}>
      <head>
        <meta name="color-scheme" content="light" />
        <link rel="preload" as="image" href="/hero-1.webp" fetchPriority="high" />
      </head>
      <body>
        <NavigationProgress />
        <ConditionalNav />
        {children}
        <ConditionalFooter />
      </body>
    </html>
  );
}
