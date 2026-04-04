"use client";

import { useState } from "react";
import { updateAdminCredentials } from "../../actions/auth";
import { useRouter } from "next/navigation";

interface AccountFormProps {
  currentUsername: string;
  userId: number;
}

export default function AccountForm({ currentUsername, userId }: AccountFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: currentUsername,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    // Validate passwords match
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match" });
      return;
    }

    // Validate current password is provided if changing password
    if (formData.newPassword && !formData.currentPassword) {
      setMessage({ type: "error", text: "Current password is required to set a new password" });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await updateAdminCredentials({
        username: formData.username,
        currentPassword: formData.currentPassword || undefined,
        newPassword: formData.newPassword || undefined,
      });

      if (result.success) {
        setMessage({ type: "success", text: "Account updated successfully!" });
        setFormData({
          ...formData,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        router.refresh();
      } else {
        setMessage({ type: "error", text: result.error || "Failed to update account" });
      }
    } catch (error) {
      console.error("Error updating account:", error);
      setMessage({ type: "error", text: "An unexpected error occurred" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          background: "#ffffff",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          padding: "32px",
        }}
      >
        {/* Message */}
        {message && (
          <div
            style={{
              padding: "12px 16px",
              borderRadius: "8px",
              marginBottom: "24px",
              background: message.type === "success" ? "#d1fae5" : "#fee2e2",
              color: message.type === "success" ? "#065f46" : "#991b1b",
              fontSize: "0.95rem",
            }}
          >
            {message.text}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Username */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "#374151",
                marginBottom: "8px",
              }}
            >
              Username
            </label>
            <input
              type="text"
              required
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "0.95rem",
                outline: "none",
                transition: "all 0.2s ease",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "var(--primary)";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(253, 139, 0, 0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#d1d5db";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>

          <hr style={{ border: "none", borderTop: "2px solid #f3f4f6" }} />

          {/* Change Password Section */}
          <div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#111827", marginBottom: "16px" }}>
              Change Password
            </h3>

            {/* Current Password */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: "8px",
                }}
              >
                Current Password
              </label>
              <input
                type="password"
                value={formData.currentPassword}
                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                placeholder="Enter current password"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "0.95rem",
                  outline: "none",
                  transition: "all 0.2s ease",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--primary)";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(253, 139, 0, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#d1d5db";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>

            {/* New Password */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: "8px",
                }}
              >
                New Password
              </label>
              <input
                type="password"
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                placeholder="Enter new password"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "0.95rem",
                  outline: "none",
                  transition: "all 0.2s ease",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--primary)";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(253, 139, 0, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#d1d5db";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: "8px",
                }}
              >
                Confirm New Password
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="Confirm new password"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "0.95rem",
                  outline: "none",
                  transition: "all 0.2s ease",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--primary)";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(253, 139, 0, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#d1d5db";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: "2px solid #f3f4f6" }}>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: "12px 32px",
              borderRadius: "8px",
              border: "none",
              background: isSubmitting ? "#d1d5db" : "var(--primary)",
              color: "#ffffff",
              fontSize: "0.95rem",
              fontWeight: 600,
              cursor: isSubmitting ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </form>
  );
}
