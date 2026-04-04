import { getCurrentUser } from "../../actions/auth";
import { redirect } from "next/navigation";
import AccountForm from "../components/AccountForm";

export default async function AccountPage() {
  // Verify authentication
  const user = await getCurrentUser();
  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div style={{ maxWidth: "600px" }}>
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
          Account Settings
        </h1>
        <p style={{ fontSize: "1rem", color: "#6b7280" }}>
          Update your username and password
        </p>
      </div>

      <AccountForm currentUsername={user.username} userId={user.id} />
    </div>
  );
}
