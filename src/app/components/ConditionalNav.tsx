"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

const BANNER_TEXT = "🥭 20% OFF on All Mangoes  |  Fresh, Sweet & Cheaper Than Market  |  Order Now!";

export default function ConditionalNav() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  // Repeat text enough to fill a seamless loop
  const repeated = Array(6).fill(BANNER_TEXT).join("   \u00a0\u00a0\u00a0   ");

  return (
    <>
      {/* Marquee banner */}
      <div
        style={{
          background: "var(--primary-container)",
          color: "var(--on-primary-container)",
          overflow: "hidden",
          whiteSpace: "nowrap",
          height: "36px",
          display: "flex",
          alignItems: "center",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1001,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            animation: "marquee 28s linear infinite",
            willChange: "transform",
          }}
        >
          <span style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.02em", paddingRight: "4rem" }}>
            {repeated}
          </span>
          <span style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.02em", paddingRight: "4rem" }}>
            {repeated}
          </span>
        </div>
      </div>
      <Navbar />
    </>
  );
}
