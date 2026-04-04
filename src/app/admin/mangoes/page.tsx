import { getMangoes } from "../../actions/mangoes";
import { getCurrentUser } from "../../actions/auth";
import { redirect } from "next/navigation";
import MangoTable from "../components/MangoTable";

export default async function MangoesPage() {
  // Verify authentication
  const user = await getCurrentUser();
  if (!user) {
    redirect("/admin/login");
  }

  // Fetch all mangoes
  const mangoes = await getMangoes();

  return (
    <div style={{ maxWidth: "1400px" }}>
      {/* Page header */}
      <div style={{ marginBottom: "32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: 800,
              color: "#111827",
              marginBottom: "8px",
              letterSpacing: "-0.02em",
            }}
          >
            Manage Mangoes
          </h1>
          <p style={{ fontSize: "1rem", color: "#6b7280" }}>
            Add, edit, or remove mango varieties from your inventory
          </p>
        </div>
      </div>

      <MangoTable mangoes={mangoes} />
    </div>
  );
}
