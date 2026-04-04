"use client";

import Link from "next/link";
import { useState } from "react";

interface SidebarNavProps {
  href: string;
  label: string;
  icon: string;
  isActive: boolean;
}

export default function SidebarNav({ href, label, icon, isActive }: SidebarNavProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px 16px",
        borderRadius: "8px",
        background: isActive ? "var(--primary)" : isHovered ? "#f3f4f6" : "transparent",
        color: isActive ? "#ffffff" : "#374151",
        textDecoration: "none",
        fontSize: "0.95rem",
        fontWeight: isActive ? 600 : 500,
        transition: "all 0.2s ease",
        marginBottom: "4px",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span style={{ fontSize: "1.2rem" }}>{icon}</span>
      <span>{label}</span>
    </Link>
  );
}
