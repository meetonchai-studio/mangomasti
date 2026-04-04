import { getAllReviews } from "../../actions/reviews";
import { getCurrentUser } from "../../actions/auth";
import { redirect } from "next/navigation";
import ReviewTable from "../components/ReviewTable";

export default async function ReviewsPage() {
  // Verify authentication
  const user = await getCurrentUser();
  if (!user) {
    redirect("/admin/login");
  }

  // Fetch all reviews (including unapproved)
  const reviews = await getAllReviews();

  const approvedCount = reviews.filter((r) => r.approved).length;
  const pendingCount = reviews.filter((r) => !r.approved).length;

  return (
    <div style={{ maxWidth: "1400px" }}>
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
          Manage Reviews
        </h1>
        <p style={{ fontSize: "1rem", color: "#6b7280" }}>
          Approve or reject customer reviews. Only approved reviews appear on the public site.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "32px" }}>
        <div
          style={{
            background: "#ffffff",
            borderRadius: "12px",
            padding: "20px",
            border: "1px solid #e5e7eb",
          }}
        >
          <div style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "8px", fontWeight: 500 }}>
            Total Reviews
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 800, color: "#111827" }}>{reviews.length}</div>
        </div>
        <div
          style={{
            background: "#ffffff",
            borderRadius: "12px",
            padding: "20px",
            border: "1px solid #e5e7eb",
          }}
        >
          <div style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "8px", fontWeight: 500 }}>
            Approved
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 800, color: "#10b981" }}>{approvedCount}</div>
        </div>
        <div
          style={{
            background: "#ffffff",
            borderRadius: "12px",
            padding: "20px",
            border: "1px solid #e5e7eb",
          }}
        >
          <div style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "8px", fontWeight: 500 }}>
            Pending Approval
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 800, color: "#f59e0b" }}>{pendingCount}</div>
        </div>
      </div>

      <ReviewTable reviews={reviews} />
    </div>
  );
}
