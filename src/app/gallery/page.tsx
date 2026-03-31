import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  imgGalleryPremiumMangoes,
  imgAlphonso1,
  imgKesar1,
  imgGalleryFreshOrchard,
  imgImamPasand1,
  imgDasheri1,
  imgGalleryHarvest,
  imgBanganapalli1,
  imgSindhura1,
  imgGalleryGoldenSelection,
  imgMalgova1,
  imgNeelam1,
} from "../lib/images";

export const metadata: Metadata = {
  title: "Gallery | MangoMasti — A Visual Journey Through Our Orchards",
  description:
    "Explore our gallery of premium Indian mangoes — Alphonso, Kesar, Imam Pasand, Dasheri, and more. Freshness you can see, quality you can trust.",
};

const galleryItems = [
  { id: 1,  name: "Premium Mangoes",            src: imgGalleryPremiumMangoes,  alt: "Premium mangoes from MangoMasti" },
  { id: 2,  name: "Premium Alphonso",            src: imgAlphonso1,              alt: "Premium Alphonso mangoes from Ratnagiri" },
  { id: 3,  name: "Kesar from Junagadh",         src: imgKesar1,                 alt: "Kesar mangoes from Junagadh, Gujarat" },
  { id: 4,  name: "Fresh from the Orchard",      src: imgGalleryFreshOrchard,    alt: "Fresh mangoes from the orchard" },
  { id: 5,  name: "Imam Pasand — Royal Variety", src: imgImamPasand1,            alt: "Imam Pasand mangoes — the royal variety" },
  { id: 6,  name: "Dasheri from Lucknow",        src: imgDasheri1,               alt: "Dasheri mangoes from Lucknow, Uttar Pradesh" },
  { id: 7,  name: "Mango Harvest",               src: imgGalleryHarvest,         alt: "Mango harvest season" },
  { id: 8,  name: "Banganapalli from Andhra",    src: imgBanganapalli1,          alt: "Banganapalli mangoes from Andhra Pradesh" },
  { id: 9,  name: "Sindhura — The Red Mango",    src: imgSindhura1,              alt: "Sindhura red mangoes from Andhra Pradesh" },
  { id: 10, name: "Golden Selection",            src: imgGalleryGoldenSelection, alt: "Golden selection of premium mangoes" },
  { id: 11, name: "Malgova — South Indian King", src: imgMalgova1,               alt: "Malgova mangoes — King of South Indian mangoes" },
  { id: 12, name: "Neelam — Late Season",        src: imgNeelam1,                alt: "Neelam mangoes — late season variety" },
];

const FILTER_TABS = ["All", "Our Mangoes", "Packing & Delivery", "Market", "Happy Customers"];

export default function GalleryPage() {
  return (
    <main style={{ paddingTop: "72px" }}>

      {/* ===== HERO SECTION ===== */}
      <section
        style={{
          background: "var(--surface-container-low)",
          padding: "80px 0 64px",
          textAlign: "center",
        }}
      >
        <div className="container">
          <h1
            style={{
              fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
              fontWeight: 800,
              color: "var(--on-surface)",
              letterSpacing: "-0.04em",
              lineHeight: 1.08,
              marginBottom: "20px",
            }}
          >
            Our Gallery
          </h1>
          <p
            style={{
              fontSize: "1.05rem",
              color: "var(--on-surface-variant)",
              lineHeight: 1.8,
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            Freshness you can see, quality you can trust. Journey through our
            sun-drenched orchards and the hands that pick perfection.
          </p>
        </div>
      </section>

      {/* ===== FILTER BAR ===== */}
      <section
        style={{
          background: "var(--surface-container-low)",
          padding: "20px 0",
        }}
      >
        <div className="container">
          <div className="tabs-scroll">
            {FILTER_TABS.map((tab, i) => (
              <button
                key={tab}
                className={`filter-tab${i === 0 ? " active" : ""}`}
                style={{ cursor: i === 0 ? "default" : "pointer" }}
                disabled={i !== 0}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EDITORIAL GALLERY GRID ===== */}
      <section
        style={{
          background: "var(--surface-container-low)",
          padding: "32px 0 0",
        }}
      >
        <div className="container">
          {/* Row 1: Large left + 2 stacked right */}
          <div className="gallery-row-1" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "16px", marginBottom: "16px" }}>
            {/* Large image */}
            <div
              style={{
                position: "relative",
                height: "560px",
                borderRadius: "1.5rem",
                overflow: "hidden",
                background: "var(--surface-container-low)",
              }}
              className="gallery-item"
            >
              <Image
                src={galleryItems[0].src}
                alt={galleryItems[0].alt}
                fill
                style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
                sizes="(max-width: 768px) 100vw, 66vw"
                priority
              />
            </div>

            {/* 2 stacked images */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {galleryItems.slice(1, 3).map((item) => (
                <div
                  key={item.id}
                  style={{
                    position: "relative",
                    height: "272px",
                    borderRadius: "1.5rem",
                    overflow: "hidden",
                    background: "var(--surface-container-low)",
                  }}
                  className="gallery-item"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: 3 equal */}
          <div className="grid-3" style={{ marginBottom: "16px" }}>
            {galleryItems.slice(3, 6).map((item) => (
              <div
                key={item.id}
                style={{
                  position: "relative",
                  height: "300px",
                  borderRadius: "1.5rem",
                  overflow: "hidden",
                  background: "var(--surface-container-low)",
                }}
                className="gallery-item"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>

          {/* Row 3: items 6–8 */}
          <div className="grid-3" style={{ marginBottom: "16px" }}>
            {galleryItems.slice(6, 9).map((item) => (
              <div
                key={item.id}
                style={{
                  position: "relative",
                  height: "300px",
                  borderRadius: "1.5rem",
                  overflow: "hidden",
                  background: "var(--surface-container-low)",
                }}
                className="gallery-item"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>

          {/* Row 4: items 9–11 */}
          <div className="grid-3" style={{ marginBottom: "0" }}>
            {galleryItems.slice(9).map((item) => (
              <div
                key={item.id}
                style={{
                  position: "relative",
                  height: "300px",
                  borderRadius: "1.5rem",
                  overflow: "hidden",
                  background: "var(--surface-container-low)",
                }}
                className="gallery-item"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>

        <style>{`
          .gallery-item:hover img {
            transform: scale(1.04);
          }
          @media (max-width: 768px) {
            .gallery-row-1 {
              grid-template-columns: 1fr !important;
            }
            .gallery-row-1 > div:first-child {
              height: 320px !important;
            }
          }
        `}</style>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section style={{ background: "var(--surface-container-low)", padding: "48px 0 80px" }}>
        <div className="container">
          <div
            style={{
              background: "var(--primary-container)",
              borderRadius: "3rem",
              padding: "72px 48px",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 800,
                color: "var(--on-surface)",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                marginBottom: "16px",
              }}
            >
              Want these delivered to your door?
            </h2>
            <p
              style={{
                fontSize: "1rem",
                color: "var(--on-surface-variant)",
                maxWidth: "420px",
                margin: "0 auto 36px",
                lineHeight: 1.75,
              }}
            >
              Experience the editorial quality of our hand-picked selection.
              Freshly harvested and delivered within 48 hours.
            </p>
            <Link
              href="/varieties"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "var(--inverse-surface)",
                color: "#ffffff",
                borderRadius: "9999px",
                padding: "14px 32px",
                fontSize: "0.95rem",
                fontWeight: 700,
                textDecoration: "none",
                letterSpacing: "0.01em",
              }}
            >
              Shop the Harvest
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
