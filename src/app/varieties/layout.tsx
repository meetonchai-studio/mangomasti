import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mango Varieties | MangoMasti — Premium Indian Mangoes",
  description: "Explore 15+ premium Indian mango varieties including Alphonso, Kesar, Dasheri, Imam Pasand & more. Order fresh, chemical-free mangoes directly on WhatsApp.",
};

export default function VarietiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
