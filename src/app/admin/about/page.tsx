import { getCurrentUser } from "../../actions/auth";
import { redirect } from "next/navigation";
import { getAboutContent } from "../../actions/about";
import AboutContentForm from "../components/AboutContentForm";

export default async function AdminAboutPage() {
  // Verify authentication
  const user = await getCurrentUser();
  if (!user) {
    redirect("/admin/login");
  }

  const content = await getAboutContent();

  return (
    <div>
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
          About Page Content
        </h1>
        <p style={{ fontSize: "1rem", color: "#6b7280" }}>
          Manage the content displayed on the About Us page
        </p>
      </div>

      <AboutContentForm initialContent={content} />
    </div>
  );
}
