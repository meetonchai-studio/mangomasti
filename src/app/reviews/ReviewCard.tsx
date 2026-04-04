"use client";

interface ReviewCardProps {
  review: {
    id: number | string;
    name: string;
    address: string | null;
    rating: number;
    title: string;
    body: string;
  };
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const initial = review.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <article
      style={{
        background: "var(--surface-container-lowest)",
        borderRadius: "1.5rem",
        padding: "24px",
        boxShadow: "0 2px 12px rgba(26,28,28,0.04)",
        transition: "all 0.3s ease",
        display: "flex",
        flexDirection: "column",
        height: "fit-content",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(26, 28, 28, 0.08)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(26,28,28,0.04)";
      }}
    >
      {/* Stars */}
      <div
        style={{
          marginBottom: "12px",
        }}
      >
        <div
          className="stars"
          aria-label={`${review.rating} out of 5 stars`}
          style={{
            color: "var(--primary)",
            fontSize: "1.1rem",
            letterSpacing: "2px",
          }}
        >
          {"★".repeat(review.rating)}
          {"☆".repeat(Math.max(0, 5 - review.rating))}
        </div>
      </div>

      {/* Review title */}
      <h3
        style={{
          fontSize: "1.05rem",
          fontWeight: 700,
          marginBottom: "12px",
          color: "var(--on-surface)",
          letterSpacing: "-0.02em",
          fontFamily: "var(--font-jakarta, 'Plus Jakarta Sans'), sans-serif",
          lineHeight: 1.3,
        }}
      >
        {review.title}
      </h3>

      {/* Review body */}
      <p
        style={{
          fontSize: "0.88rem",
          color: "var(--on-surface-variant)",
          lineHeight: 1.7,
          marginBottom: "auto",
          fontFamily: "var(--font-vietnam, 'Be Vietnam Pro'), sans-serif",
        }}
      >
        &ldquo;{review.body}&rdquo;
      </p>

      {/* Author row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          paddingTop: "16px",
          marginTop: "16px",
          borderTop: "1px solid var(--surface-container)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Avatar */}
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "var(--primary-container)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.95rem",
              fontWeight: 800,
              color: "var(--on-primary-container)",
              flexShrink: 0,
              fontFamily: "var(--font-jakarta, 'Plus Jakarta Sans'), sans-serif",
            }}
            aria-hidden="true"
          >
            {initial}
          </div>
          <div>
            <div
              style={{
                fontWeight: 700,
                fontSize: "0.88rem",
                fontFamily: "var(--font-jakarta, 'Plus Jakarta Sans'), sans-serif",
                color: "var(--on-surface)",
              }}
            >
              {review.name}
            </div>
            {review.address && (
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "var(--on-surface-variant)",
                  fontFamily: "var(--font-vietnam, 'Be Vietnam Pro'), sans-serif",
                }}
              >
                {review.address}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
