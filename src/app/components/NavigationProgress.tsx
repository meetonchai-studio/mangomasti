"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function NavigationProgress() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    bar.style.transition = "none";
    bar.style.width = "0%";
    bar.style.opacity = "1";
    // Force reflow
    bar.getBoundingClientRect();
    bar.style.transition = "width 300ms ease";
    bar.style.width = "85%";
    const t = setTimeout(() => {
      bar.style.transition = "width 200ms ease, opacity 300ms ease";
      bar.style.width = "100%";
      setTimeout(() => { bar.style.opacity = "0"; }, 200);
    }, 300);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999, height: "3px", pointerEvents: "none" }}>
      <div
        ref={barRef}
        style={{
          height: "100%",
          width: "0%",
          background: "var(--primary-container)",
          borderRadius: "0 2px 2px 0",
          opacity: 0,
        }}
      />
    </div>
  );
}
