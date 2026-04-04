"use client";

import { useState } from "react";
import { approveReview, unapproveReview, deleteReview } from "../../actions/reviews";
import { useRouter } from "next/navigation";

interface Review {
  id: number;
  name: string;
  address: string | null;
  variety: string | null;
  rating: number;
  title: string;
  body: string;
  approved: boolean;
  createdAt: Date;
}

interface ReviewTableProps {
  reviews: Review[];
}

export default function ReviewTable({ reviews }: ReviewTableProps) {
  const router = useRouter();
  const [processingId, setProcessingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "approved" | "pending">("all");

  const filteredReviews = reviews.filter((review) => {
    if (filter === "approved") return review.approved;
    if (filter === "pending") return !review.approved;
    return true;
  });

  const handleApprove = async (id: number) => {
    setProcessingId(id);
    try {
      await approveReview(id);
      router.refresh();
    } catch (error) {
      console.error("Error approving review:", error);
      alert("Failed to approve review. Please try again.");
    } finally {
      setProcessingId(null);
    }
  };

  const handleUnapprove = async (id: number) => {
    setProcessingId(id);
    try {
      await unapproveReview(id);
      router.refresh();
    } catch (error) {
      console.error("Error unapproving review:", error);
      alert("Failed to unapprove review. Please try again.");
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this review? This action cannot be undone.")) {
      return;
    }

    setDeletingId(id);
    try {
      await deleteReview(id);
      router.refresh();
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("Failed to delete review. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const renderStars = (rating: number) => {
    return "⭐".repeat(rating);
  };

  return (
    <>
      {/* Filter tabs */}
      <div style={{ marginBottom: "24px", display: "flex", gap: "8px" }}>
        <button
          onClick={() => setFilter("all")}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            background: filter === "all" ? "var(--primary)" : "#ffffff",
            color: filter === "all" ? "#ffffff" : "#374151",
            fontSize: "0.875rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          All ({reviews.length})
        </button>
        <button
          onClick={() => setFilter("approved")}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            background: filter === "approved" ? "var(--primary)" : "#ffffff",
            color: filter === "approved" ? "#ffffff" : "#374151",
            fontSize: "0.875rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          Approved ({reviews.filter((r) => r.approved).length})
        </button>
        <button
          onClick={() => setFilter("pending")}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            background: filter === "pending" ? "var(--primary)" : "#ffffff",
            color: filter === "pending" ? "#ffffff" : "#374151",
            fontSize: "0.875rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          Pending ({reviews.filter((r) => !r.approved).length})
        </button>
      </div>

      {/* Reviews list */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          overflow: "hidden",
        }}
      >
        {filteredReviews.length === 0 ? (
          <div
            style={{
              padding: "60px 20px",
              textAlign: "center",
              color: "#6b7280",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "16px" }}>💬</div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "8px", color: "#374151" }}>
              No reviews found
            </h3>
            <p style={{ fontSize: "0.95rem" }}>
              {filter === "pending" && "No reviews waiting for approval"}
              {filter === "approved" && "No approved reviews yet"}
              {filter === "all" && "No reviews submitted yet"}
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "#f3f4f6" }}>
            {filteredReviews.map((review) => (
              <div
                key={review.id}
                style={{
                  padding: "24px",
                  background: "#ffffff",
                }}
              >
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "16px" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                      <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#111827", margin: 0 }}>
                        {review.title}
                      </h3>
                      {review.approved ? (
                        <span
                          style={{
                            padding: "4px 12px",
                            borderRadius: "12px",
                            background: "#d1fae5",
                            color: "#065f46",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                          }}
                        >
                          ✓ Approved
                        </span>
                      ) : (
                        <span
                          style={{
                            padding: "4px 12px",
                            borderRadius: "12px",
                            background: "#fef3c7",
                            color: "#92400e",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                          }}
                        >
                          ⏱ Pending
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: "1.2rem", marginBottom: "8px" }}>{renderStars(review.rating)}</div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                      <span style={{ fontWeight: 600, color: "#374151" }}>{review.name}</span>
                      {review.address && ` • ${review.address}`}
                      {review.variety && ` • ${review.variety}`}
                      {" • "}
                      {new Date(review.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: "8px" }}>
                    {!review.approved ? (
                      <button
                        onClick={() => handleApprove(review.id)}
                        disabled={processingId === review.id}
                        style={{
                          padding: "8px 16px",
                          borderRadius: "6px",
                          border: "1px solid #10b981",
                          background: "#ffffff",
                          color: "#10b981",
                          fontSize: "0.875rem",
                          fontWeight: 600,
                          cursor: processingId === review.id ? "not-allowed" : "pointer",
                          opacity: processingId === review.id ? 0.5 : 1,
                          transition: "all 0.2s ease",
                        }}
                        onMouseOver={(e) => {
                          if (processingId !== review.id) {
                            e.currentTarget.style.background = "#ecfdf5";
                          }
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.background = "#ffffff";
                        }}
                      >
                        {processingId === review.id ? "Approving..." : "Approve"}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUnapprove(review.id)}
                        disabled={processingId === review.id}
                        style={{
                          padding: "8px 16px",
                          borderRadius: "6px",
                          border: "1px solid #f59e0b",
                          background: "#ffffff",
                          color: "#f59e0b",
                          fontSize: "0.875rem",
                          fontWeight: 600,
                          cursor: processingId === review.id ? "not-allowed" : "pointer",
                          opacity: processingId === review.id ? 0.5 : 1,
                          transition: "all 0.2s ease",
                        }}
                        onMouseOver={(e) => {
                          if (processingId !== review.id) {
                            e.currentTarget.style.background = "#fffbeb";
                          }
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.background = "#ffffff";
                        }}
                      >
                        {processingId === review.id ? "Unapproving..." : "Unapprove"}
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(review.id)}
                      disabled={deletingId === review.id}
                      style={{
                        padding: "8px 16px",
                        borderRadius: "6px",
                        border: "1px solid #fecaca",
                        background: "#ffffff",
                        color: "#ef4444",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        cursor: deletingId === review.id ? "not-allowed" : "pointer",
                        opacity: deletingId === review.id ? 0.5 : 1,
                        transition: "all 0.2s ease",
                      }}
                      onMouseOver={(e) => {
                        if (deletingId !== review.id) {
                          e.currentTarget.style.background = "#fef2f2";
                        }
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = "#ffffff";
                      }}
                    >
                      {deletingId === review.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>

                {/* Body */}
                <p style={{ fontSize: "0.95rem", color: "#374151", lineHeight: "1.6", margin: 0 }}>
                  {review.body}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
