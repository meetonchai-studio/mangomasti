"use client";

import { usePathname } from "next/navigation";
import { logout } from "../actions/auth";
import { useRouter } from "next/navigation";
import SidebarNav from "./components/SidebarNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Don't show layout on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await logout();
    router.push("/admin/login");
    router.refresh();
  };

  const navLinks = [
    { href: "/admin", label: "Dashboard", icon: "📊" },
    { href: "/admin/mangoes", label: "Mangoes", icon: "🥭" },
    { href: "/admin/reviews", label: "Reviews", icon: "💬" },
    { href: "/admin/about", label: "About Page", icon: "📄" },
    { href: "/admin/account", label: "Account", icon: "👤" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8f9fa" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "260px",
          background: "#ffffff",
          borderRight: "1px solid #e5e7eb",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          height: "100vh",
          left: 0,
          top: 0,
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: "24px 20px",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <h1
            style={{
              fontSize: "1.4rem",
              fontWeight: 800,
              color: "var(--primary)",
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            🥭 MangoMasti
          </h1>
          <p
            style={{
              fontSize: "0.75rem",
              color: "#6b7280",
              margin: "4px 0 0 0",
              fontWeight: 500,
            }}
          >
            Admin Dashboard
          </p>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: "20px 12px" }}>
          {navLinks.map((link) => (
            <SidebarNav
              key={link.href}
              href={link.href}
              label={link.label}
              icon={link.icon}
              isActive={pathname === link.href}
            />
          ))}
        </nav>

        {/* Logout button */}
        <div style={{ padding: "20px 12px", borderTop: "1px solid #e5e7eb" }}>
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              background: "transparent",
              color: "#ef4444",
              fontSize: "0.9rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "#fef2f2";
              e.currentTarget.style.borderColor = "#fecaca";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "#e5e7eb";
            }}
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main
        style={{
          marginLeft: "260px",
          flex: 1,
          padding: "32px",
          minHeight: "100vh",
        }}
      >
        {children}
      </main>
    </div>
  );
}
