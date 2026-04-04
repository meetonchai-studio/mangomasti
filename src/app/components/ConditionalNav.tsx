"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function ConditionalNav() {
  const pathname = usePathname();

  // Don't show public navigation on admin routes
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return <Navbar />;
}
