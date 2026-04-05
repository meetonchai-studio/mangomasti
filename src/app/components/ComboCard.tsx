"use client";

import { useState } from "react";
import type { Mango } from "../db/schema";

interface ComboCardProps {
  allMangoes: Mango[];
}

interface MangoSelection {
  mangoId: number;
  mangoName: string;
}

const COMBO_SIZES = [
  { value: 1, label: "1 kg Combo", price: "Best for trying" },
  { value: 2, label: "2 kg Combo", price: "Popular choice" },
  { value: 5, label: "5 kg Combo", price: "Best value" },
];

export default function ComboCard({ allMangoes }: ComboCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedComboSize, setSelectedComboSize] = useState<number | null>(null);
  const [selectedMangoes, setSelectedMangoes] = useState<MangoSelection[]>([]);

  const toggleMangoSelection = (mango: Mango) => {
    const isSelected = selectedMangoes.some((m) => m.mangoId === mango.id);

    if (isSelected) {
      setSelectedMangoes(selectedMangoes.filter((m) => m.mangoId !== mango.id));
    } else {
      setSelectedMangoes([...selectedMangoes, { mangoId: mango.id, mangoName: mango.name }]);
    }
  };

  const isMangoSelected = (mangoId: number) => {
    return selectedMangoes.some((m) => m.mangoId === mangoId);
  };

  const handleOrderCombo = () => {
    if (!selectedComboSize) {
      alert("Please select a combo size");
      return;
    }

    if (selectedMangoes.length === 0) {
      alert("Please select at least one mango variety");
      return;
    }

    const varietyList = selectedMangoes.map((m) => `• ${m.mangoName}`).join("\n");
    const message = `Hi! I'd like to order a *${selectedComboSize}kg Mango Combo*:\n\n${varietyList}\n\n*Total: ${selectedComboSize}kg* (mixed varieties)`;

    window.open(
      `https://wa.me/917977740596?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const resetModal = () => {
    setSelectedComboSize(null);
    setSelectedMangoes([]);
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Combo Card */}
      <article
        onClick={() => setIsModalOpen(true)}
        style={{
          cursor: "pointer",
          background: "linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)",
          borderRadius: "2rem",
          overflow: "hidden",
          boxShadow: "0 8px 24px rgba(255, 107, 53, 0.3)",
          position: "relative",
          transition: "all 0.3s ease",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow = "0 12px 32px rgba(255, 107, 53, 0.4)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 8px 24px rgba(255, 107, 53, 0.3)";
        }}
      >
        {/* Decorative pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "200px",
            height: "200px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "50%",
            transform: "translate(50%, -50%)",
          }}
        />

        <div style={{ padding: "32px 24px", position: "relative", zIndex: 1 }}>
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(255, 255, 255, 0.25)",
              backdropFilter: "blur(10px)",
              color: "#ffffff",
              borderRadius: "9999px",
              padding: "6px 14px",
              fontSize: "0.7rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "16px",
            }}
          >
            ✨ SPECIAL OFFER
          </div>

          {/* Icon */}
          <div style={{ fontSize: "4rem", marginBottom: "12px", lineHeight: 1 }}>
            🥭🎁
          </div>

          {/* Title */}
          <h3
            style={{
              fontSize: "1.8rem",
              fontWeight: 900,
              color: "#ffffff",
              marginBottom: "8px",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            Create Your Combo
          </h3>

          {/* Description */}
          <p
            style={{
              fontSize: "0.95rem",
              color: "rgba(255, 255, 255, 0.95)",
              lineHeight: 1.6,
              marginBottom: "24px",
            }}
          >
            Mix and match your favorite mango varieties! Choose multiple types and customize the quantity of each.
          </p>

          {/* Features */}
          <div style={{ marginBottom: "24px" }}>
            {[
              "Choose any combination",
              "Customize quantities",
              "Best value for variety lovers",
            ].map((feature, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#ffffff",
                  fontSize: "0.85rem",
                  marginBottom: "6px",
                }}
              >
                <span style={{ fontSize: "1rem" }}>✓</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#ffffff",
              color: "#FF6B35",
              borderRadius: "12px",
              padding: "14px 24px",
              fontSize: "1rem",
              fontWeight: 700,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            }}
          >
            <span>Build Your Combo</span>
            <span style={{ fontSize: "1.3rem" }}>→</span>
          </div>
        </div>
      </article>

      {/* Combo Modal */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
          onClick={resetModal}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "24px",
              maxWidth: "700px",
              width: "100%",
              maxHeight: "90vh",
              overflow: "auto",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                background: "linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)",
                padding: "32px 28px",
                color: "#ffffff",
                position: "relative",
              }}
            >
              <button
                onClick={resetModal}
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.2)",
                  border: "none",
                  color: "#ffffff",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 300,
                }}
              >
                ×
              </button>
              <div style={{ fontSize: "3rem", marginBottom: "12px" }}>🥭🎁</div>
              <h2
                style={{
                  fontSize: "2rem",
                  fontWeight: 900,
                  marginBottom: "8px",
                  letterSpacing: "-0.02em",
                }}
              >
                Create Your Mango Combo
              </h2>
              <p style={{ fontSize: "1rem", opacity: 0.95 }}>
                Select your favorite varieties and quantities
              </p>
            </div>

            {/* Modal Content */}
            <div style={{ padding: "28px" }}>
              {/* Step 1: Combo Size Selection */}
              <div style={{ marginBottom: "32px" }}>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#111827",
                    marginBottom: "16px",
                  }}
                >
                  Step 1: Choose Combo Size
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                    gap: "12px",
                  }}
                >
                  {COMBO_SIZES.map((combo) => (
                    <button
                      key={combo.value}
                      onClick={() => setSelectedComboSize(combo.value)}
                      style={{
                        padding: "20px 16px",
                        borderRadius: "12px",
                        border: selectedComboSize === combo.value ? "2px solid #FF6B35" : "1px solid #e5e7eb",
                        background: selectedComboSize === combo.value ? "#fff7ed" : "#ffffff",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "1.5rem",
                          fontWeight: 800,
                          color: selectedComboSize === combo.value ? "#FF6B35" : "#111827",
                          marginBottom: "4px",
                        }}
                      >
                        {combo.value} kg
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280", fontWeight: 600 }}>
                        {combo.price}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Mango Variety Selection */}
              <div style={{ marginBottom: "24px", opacity: selectedComboSize ? 1 : 0.5 }}>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#111827",
                    marginBottom: "16px",
                  }}
                >
                  Step 2: Select Mango Varieties
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {allMangoes.map((mango) => {
                    const isSelected = isMangoSelected(mango.id);
                    return (
                      <button
                        key={mango.id}
                        onClick={() => selectedComboSize && toggleMangoSelection(mango)}
                        disabled={!selectedComboSize}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "14px 16px",
                          background: isSelected ? "#fff7ed" : "#f9fafb",
                          borderRadius: "12px",
                          border: isSelected ? "2px solid #FF6B35" : "1px solid #e5e7eb",
                          cursor: selectedComboSize ? "pointer" : "not-allowed",
                          transition: "all 0.2s ease",
                          textAlign: "left",
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              fontSize: "0.95rem",
                              fontWeight: 700,
                              color: "#111827",
                              marginBottom: "2px",
                            }}
                          >
                            {mango.name}
                          </div>
                          <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>
                            ₹{(mango.discountedPrice / 100).toFixed(2)}/kg
                          </div>
                        </div>
                        <div
                          style={{
                            width: "24px",
                            height: "24px",
                            borderRadius: "50%",
                            border: isSelected ? "2px solid #FF6B35" : "2px solid #d1d5db",
                            background: isSelected ? "#FF6B35" : "#ffffff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#ffffff",
                            fontSize: "0.9rem",
                            fontWeight: 700,
                          }}
                        >
                          {isSelected && "✓"}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Summary */}
              {selectedComboSize && selectedMangoes.length > 0 && (
                <div
                  style={{
                    background: "#f9fafb",
                    borderRadius: "12px",
                    padding: "20px",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "#6b7280",
                      marginBottom: "12px",
                    }}
                  >
                    YOUR COMBO
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "1.1rem",
                      fontWeight: 800,
                      color: "#111827",
                      marginBottom: "12px",
                    }}
                  >
                    <span>Size</span>
                    <span>{selectedComboSize} kg</span>
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#374151" }}>
                    <div style={{ fontWeight: 600, marginBottom: "6px" }}>Selected Varieties:</div>
                    {selectedMangoes.map((m, idx) => (
                      <div key={m.mangoId} style={{ marginBottom: "4px" }}>
                        {idx + 1}. {m.mangoName}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Order Button */}
              <button
                onClick={handleOrderCombo}
                disabled={!selectedComboSize || selectedMangoes.length === 0}
                style={{
                  width: "100%",
                  padding: "16px",
                  borderRadius: "12px",
                  border: "none",
                  background:
                    !selectedComboSize || selectedMangoes.length === 0 ? "#d1d5db" : "var(--primary)",
                  color: "#ffffff",
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  cursor: !selectedComboSize || selectedMangoes.length === 0 ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "all 0.2s ease",
                }}
                onMouseOver={(e) => {
                  if (selectedComboSize && selectedMangoes.length > 0) {
                    e.currentTarget.style.background = "#E07C00";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }
                }}
                onMouseOut={(e) => {
                  if (selectedComboSize && selectedMangoes.length > 0) {
                    e.currentTarget.style.background = "var(--primary)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }
                }}
              >
                <span style={{ fontSize: "1.3rem" }}>💬</span>
                <span>Order Combo on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
