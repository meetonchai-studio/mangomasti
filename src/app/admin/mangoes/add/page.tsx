import { getCurrentUser } from "../../../actions/auth";
import { redirect } from "next/navigation";
import MangoForm from "../../components/MangoForm";

export default async function AddMangoPage() {
  // Verify authentication
  const user = await getCurrentUser();
  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div style={{ maxWidth: "900px" }}>
      {/* Page header */}
      <div style={{ marginBottom: "32px" }}>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 800,
            color: "#111827",
            marginBottom: "8px",
            letterSpacing: "-0.02em",
          }}
        >
          Add New Mango
        </h1>
        <p style={{ fontSize: "1rem", color: "#6b7280" }}>
          Add a new mango variety to your inventory
        </p>
      </div>

      <MangoForm />
    </div>
  );
}
