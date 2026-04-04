import { getCurrentUser } from "../../../../actions/auth";
import { getMangoById } from "../../../../actions/mangoes";
import { redirect } from "next/navigation";
import MangoForm from "../../../components/MangoForm";

export default async function EditMangoPage({ params }: { params: Promise<{ id: string }> }) {
  // Verify authentication
  const user = await getCurrentUser();
  if (!user) {
    redirect("/admin/login");
  }

  // Await params (Next.js 15+ requirement)
  const { id } = await params;

  // Fetch mango data
  const mango = await getMangoById(parseInt(id));
  if (!mango) {
    redirect("/admin/mangoes");
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
          Edit Mango: {mango.name}
        </h1>
        <p style={{ fontSize: "1rem", color: "#6b7280" }}>
          Update the details and images for this mango variety
        </p>
      </div>

      <MangoForm mango={mango} />
    </div>
  );
}
