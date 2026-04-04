"use client";

import { useState } from "react";
import { updateAboutContent, type AboutContent } from "../../actions/about";
import { useRouter } from "next/navigation";

interface AboutContentFormProps {
  initialContent: AboutContent;
}

export default function AboutContentForm({ initialContent }: AboutContentFormProps) {
  const router = useRouter();
  const [content, setContent] = useState<AboutContent>(initialContent);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsSubmitting(true);

    try {
      const result = await updateAboutContent(content);

      if (result.success) {
        setMessage({ type: "success", text: "Content updated successfully!" });
        router.refresh();
      } else {
        setMessage({ type: "error", text: result.error || "Failed to update content" });
      }
    } catch (error) {
      console.error("Error updating content:", error);
      setMessage({ type: "error", text: "An unexpected error occurred" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePillarChange = (index: number, field: keyof AboutContent["pillars"][0], value: string) => {
    const newPillars = [...content.pillars];
    newPillars[index] = { ...newPillars[index], [field]: value };
    setContent({ ...content, pillars: newPillars });
  };

  const addPillar = () => {
    setContent({
      ...content,
      pillars: [
        ...content.pillars,
        {
          icon: "⭐",
          bg: "rgba(200, 200, 200, 0.2)",
          title: "New Pillar",
          desc: "Description for the new pillar",
        },
      ],
    });
  };

  const removePillar = (index: number) => {
    setContent({
      ...content,
      pillars: content.pillars.filter((_, i) => i !== index),
    });
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "0.95rem",
    outline: "none",
    transition: "all 0.2s ease",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.875rem",
    fontWeight: 600,
    color: "#374151",
    marginBottom: "8px",
  };

  const sectionStyle = {
    background: "#ffffff",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    padding: "32px",
    marginBottom: "24px",
  };

  return (
    <form onSubmit={handleSubmit}>
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

      {/* Hero Section */}
      <div style={sectionStyle}>
        <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "24px", color: "#111827" }}>
          Hero Section
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label style={labelStyle}>Badge Text</label>
            <input
              type="text"
              required
              value={content.heroBadge}
              onChange={(e) => setContent({ ...content, heroBadge: e.target.value })}
              style={inputStyle}
              placeholder="Est. 2016 — 8 Years of Excellence"
            />
          </div>
          <div>
            <label style={labelStyle}>Main Heading</label>
            <input
              type="text"
              required
              value={content.heroHeading}
              onChange={(e) => setContent({ ...content, heroHeading: e.target.value })}
              style={inputStyle}
              placeholder="The Soul of India's Golden Orchards."
            />
          </div>
          <div>
            <label style={labelStyle}>Description</label>
            <textarea
              required
              value={content.heroDescription}
              onChange={(e) => setContent({ ...content, heroDescription: e.target.value })}
              style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }}
              placeholder="We aren't just selling fruit..."
            />
          </div>
        </div>
      </div>

      {/* Who We Are Section */}
      <div style={sectionStyle}>
        <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "24px", color: "#111827" }}>
          Who We Are Section
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label style={labelStyle}>Heading</label>
            <input
              type="text"
              required
              value={content.whoHeading}
              onChange={(e) => setContent({ ...content, whoHeading: e.target.value })}
              style={inputStyle}
              placeholder="Who We Are"
            />
          </div>
          <div>
            <label style={labelStyle}>Description</label>
            <textarea
              required
              value={content.whoDescription}
              onChange={(e) => setContent({ ...content, whoDescription: e.target.value })}
              style={{ ...inputStyle, minHeight: "150px", resize: "vertical" }}
              placeholder="Mango Masti was born from a singular obsession..."
            />
          </div>
        </div>
      </div>

      {/* Pillars Section */}
      <div style={sectionStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#111827", margin: 0 }}>
            Pillars of Masti
          </h2>
          <button
            type="button"
            onClick={addPillar}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "1px solid var(--primary)",
              background: "transparent",
              color: "var(--primary)",
              fontSize: "0.9rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            + Add Pillar
          </button>
        </div>

        {content.pillars.map((pillar, index) => (
          <div
            key={index}
            style={{
              background: "#f9fafb",
              borderRadius: "8px",
              padding: "20px",
              marginBottom: "16px",
              position: "relative",
            }}
          >
            <button
              type="button"
              onClick={() => removePillar(index)}
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                padding: "4px 12px",
                borderRadius: "6px",
                border: "1px solid #fecaca",
                background: "#fef2f2",
                color: "#ef4444",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Remove
            </button>

            <div style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: "16px", marginBottom: "16px" }}>
              <div>
                <label style={labelStyle}>Icon</label>
                <input
                  type="text"
                  required
                  value={pillar.icon}
                  onChange={(e) => handlePillarChange(index, "icon", e.target.value)}
                  style={inputStyle}
                  placeholder="🏆"
                />
              </div>
              <div>
                <label style={labelStyle}>Background Color (rgba)</label>
                <input
                  type="text"
                  required
                  value={pillar.bg}
                  onChange={(e) => handlePillarChange(index, "bg", e.target.value)}
                  style={inputStyle}
                  placeholder="rgba(255, 190, 0, 0.22)"
                />
              </div>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={labelStyle}>Title</label>
              <input
                type="text"
                required
                value={pillar.title}
                onChange={(e) => handlePillarChange(index, "title", e.target.value)}
                style={inputStyle}
                placeholder="Quality"
              />
            </div>

            <div>
              <label style={labelStyle}>Description</label>
              <textarea
                required
                value={pillar.desc}
                onChange={(e) => handlePillarChange(index, "desc", e.target.value)}
                style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
                placeholder="Hand-inspected for blemishes..."
              />
            </div>
          </div>
        ))}

        {content.pillars.length === 0 && (
          <div
            style={{
              padding: "40px",
              textAlign: "center",
              color: "#6b7280",
              background: "#f9fafb",
              borderRadius: "8px",
            }}
          >
            No pillars added yet. Click "Add Pillar" to create one.
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div style={sectionStyle}>
        <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "24px", color: "#111827" }}>
          Call-to-Action Section
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label style={labelStyle}>Heading</label>
            <input
              type="text"
              required
              value={content.ctaHeading}
              onChange={(e) => setContent({ ...content, ctaHeading: e.target.value })}
              style={inputStyle}
              placeholder="Have questions? Chat with us."
            />
          </div>
          <div>
            <label style={labelStyle}>Description</label>
            <textarea
              required
              value={content.ctaDescription}
              onChange={(e) => setContent({ ...content, ctaDescription: e.target.value })}
              style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
              placeholder="Whether it's about bulk orders..."
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div style={{ marginTop: "32px" }}>
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: "14px 40px",
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
    </form>
  );
}
