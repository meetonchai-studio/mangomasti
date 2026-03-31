import Image from "next/image";
import { mangoes, buildWhatsAppUrl, type Mango } from "../lib/mangoes";

export default function VarietiesPage() {
  return (
    <main style={{ paddingTop: "72px" }}>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "var(--surface-container-low)",
          padding: "72px 0 56px",
        }}
      >
        <div className="container">
          {/* Green badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              background: "var(--tertiary)",
              color: "#fff",
              borderRadius: "9999px",
              padding: "5px 16px",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "20px",
            }}
          >
            SEASONAL SELECTION 2024
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: "clamp(2.6rem, 6vw, 4.5rem)",
              fontWeight: 800,
              color: "var(--on-surface)",
              marginBottom: "20px",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            Our{" "}
            <span style={{ color: "var(--secondary-container)" }}>
              Mango
            </span>{" "}
            Collection
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "1rem",
              color: "var(--on-surface-variant)",
              maxWidth: "480px",
              lineHeight: 1.75,
            }}
          >
            From the sun-kissed orchards of Ratnagiri to the fertile plains of Uttar
            Pradesh, we bring you India&apos;s finest gold. Hand-selected at peak
            ripeness, our catalog celebrates the soul of the summer.
          </p>
        </div>
      </section>

      {/* ── Grid ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "48px 0 96px",
          background: "var(--surface-container-low)",
        }}
      >
        <div className="container">
          <div className="grid-3">
            {mangoes.map((mango) => (
              <MangoCard key={mango.id} mango={mango} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function MangoCard({ mango }: { mango: Mango }) {
  const tasteTags = mango.taste
    .split(/[,/]/)
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <article className="mango-card">
      {/* Image */}
      <div
        style={{
          position: "relative",
          height: "220px",
          overflow: "hidden",
          borderRadius: "2rem 2rem 0 0",
          background: "var(--surface-container)",
        }}
      >
        <Image
          src={mango.images[0]}
          alt={mango.name}
          fill
          style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {mango.featured && (
          <div
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              background: "rgba(18, 13, 5, 0.72)",
              backdropFilter: "blur(6px)",
              color: "#fff",
              borderRadius: "9999px",
              padding: "4px 12px",
              fontSize: "0.68rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            ⭐ Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "22px 20px 24px" }}>
        {/* Name */}
        <h3
          style={{
            fontSize: "1.35rem",
            fontWeight: 800,
            color: "var(--on-surface)",
            marginBottom: "6px",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
          }}
        >
          {mango.name}
        </h3>

        {/* Location */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            marginBottom: "12px",
            color: "var(--on-surface-variant)",
            fontSize: "0.82rem",
          }}
        >
          <span>📍</span>
          <span>{mango.origin}</span>
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: "0.88rem",
            color: "var(--on-surface-variant)",
            lineHeight: 1.7,
            marginBottom: "14px",
          }}
        >
          {mango.description}
        </p>

        {/* Taste tags */}
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "20px" }}>
          {tasteTags.map((tag) => (
            <span
              key={tag}
              style={{
                border: "1.5px solid var(--tertiary)",
                color: "var(--tertiary)",
                borderRadius: "9999px",
                padding: "3px 10px",
                fontSize: "0.68rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                background: "transparent",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <a
          href={buildWhatsAppUrl(mango)}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            background: "var(--inverse-surface)",
            color: "#ffffff",
            borderRadius: "9999px",
            padding: "11px 16px",
            fontSize: "0.88rem",
            fontWeight: 700,
            textDecoration: "none",
            width: "100%",
            letterSpacing: "0.01em",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.49" />
          </svg>
          Order on WhatsApp
        </a>
      </div>
    </article>
  );
}
