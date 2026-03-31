import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mango Products | MangoMasti — Artisanal Mango Delicacies",
  description:
    "Discover our curated collection of mango-based products: pickles, jams, squash, and more. All made from premium Indian mangoes.",
};

const WHATSAPP_NUMBER = "919347325653";

function buildProductWhatsAppUrl(productName: string): string {
  const msg = encodeURIComponent(
    `Hello! 🥭 I'm interested in ordering *${productName}* from MangoMasti.\n\nCould you please share the current availability and pricing details? Thank you!`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

type Product = {
  id: number;
  subtitle: string;
  name: string;
  desc: string;
  image: string;
  tagColor: string;
  tagTextColor: string;
};

const products: Product[] = [
  {
    id: 1,
    subtitle: "Great with chapati",
    name: "Mango Pickle",
    desc: "Traditional spiced mangoes in oil, cured for weeks to reach the perfect pungent tang.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCYd0eYft471Zosjynkk8cyoDAkhgq1U3bBx_e0CH6q-ePJvHHG3rTVdazfjQ-u07bY21-DmwjqE3Anm3lkjNDE1ssg06NXnHqidR03PLnvoHs7ZWBs79ZpExXdU2RMtcfLqhXXBUhXjYIgF6-gVaUqGKgsu6N1C-3MxRBzcKAt5CVIwVwV5tcK8LvqYUBFs9St1NHehYcj2kExfHVFJCdn415FkztQqVeFH9qDpb72pdqXZR-Pduds3EJyzKbpy5Hvf9_f4y8LYQ",
    tagColor: "#BCF0AE",
    tagTextColor: "#1a4d2e",
  },
  {
    id: 2,
    subtitle: "Sweet & Tangy",
    name: "Mango Murabba",
    desc: "Sweet and tangy preserved mango slices that melt in your mouth with every bite.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDPT2heDSTxTTghqayV1Qw85spUFn2lQsB6Oz9DSX9u9mncZvEQKIo1mjeGQkmAeLIUXb0uwNMkHLklhx862VpPx5deUDF7TdYkt8QAj87rkxulv155-eJS6EsapVDZiNm8SuX-U8AK8fwhxiy5ypbLW3pF4mpHeHXdNuyXdEfh5lBDdOnwkwtOTwgIY8RFVueQ0Cpshm2x7AuuawOvrT3Eo_o5AuTHKlh7oZUdA3tZaVX0jycFSn8SdF_IB4gklzsBk1CC89oaog",
    tagColor: "#FFDCC3",
    tagTextColor: "#7a2a0a",
  },
  {
    id: 3,
    subtitle: "Kitchen Essential",
    name: "Dry Mango Powder",
    desc: "Sun-dried ground green mangoes, providing a sharp citrus punch to your savory dishes.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDbDYMFAngfbt4XmdH9mEJ9aTRlk0Mr8JaCB35eiDkPAQIiw-rkQZpRhdxX8HLxZdlMc8NjoQIeMO415CStd2lknWVTiAIaeb9kJt0iJarxUZxslMNDArTEd3uUEJFIAxFtMILQQouMMzHvIi-vzCIP9LuLA7Kp_cgCBQLPWiwhzZvaukEJwnLyp1kRZ1eAB_SQ8CA99bZAHKfQc2mW1jdWHRNycTtMUpOvyDJIW2Sl15FHD1guS7fv-kFYPulPz79_HthKGepoUA",
    tagColor: "#E9E8E7",
    tagTextColor: "#3c3b3a",
  },
  {
    id: 4,
    subtitle: "Summer Favourite",
    name: "Mango Jam",
    desc: "Lush spread made from real mango pulp, capturing the peak of harvest season in a jar.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD5BlzVwzHmWju8f00PPSCtI0irVD71rP9YTC2ceZ7xi-x5HTE58Kjn49hxnloNQLzGBKkRQf_-1i4eRKR6DnRUBU3y5BD7rTN8drooT8oIjx2jUjvgb1tQf8-1pO9KR7Mo0gmjoblUq5GB8KrtJPTUjrvvEEAl-wVg2XxRakW00cel-LNKj_-qDZ4lArU8TlPcM-DAedwqbOQyghX9s7we-dDAGszfIIXTOAZsvEU_uEHiwrZZDhDkWBcBCK7_8BTyjGFtBPgv0Q",
    tagColor: "#BCF0AE",
    tagTextColor: "#1a4d2e",
  },
  {
    id: 5,
    subtitle: "Summer Drink",
    name: "Mango Squash",
    desc: "Refreshingly sweet mango drink concentrate, perfect for long warm afternoons.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDg2l1bAdxBcoxJVbLTWNUth5t0p_MmfcvGKZtY4N7UvB-nB8fSDrVDeUfGqvuWleZKWitrjMdW5vSGpWi-NkA6T7VC8b_qHuMMAlpzPqUzA_teCtYBUt5NDo6xfhbi3jIYZDpsK9oglQB5Mbf1zaRgTBHIvuWSsnukjpoP_8LXW_CxPsh8Vr8xaMx5EYImGN68K09bEg2vd0COB8Wc8OAgjMaRTZVNdCJNPTUItvQYdgv8YhVzIH48qwBq4gXU59wYYPH-4rHP5w",
    tagColor: "#FFDCC3",
    tagTextColor: "#7a2a0a",
  },
  {
    id: 6,
    subtitle: "Spicy-Sweet",
    name: "Mango Chutney",
    desc: "A perfectly balanced spicy-sweet condiment, adding depth to any meal or snack.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAFHKcxSV7CikRxy_wrIvCbqUYcVmTcCsLaSSoweQ7oBXAo-cfLWFokcdsLVLepjczsP2Ram_pqHkROyUmloF0Q2iSCQ5fejxip8SChpVDk-Yux5uXlmTMM2Lj0bx8L6n6Ih-UPk8sJ8upOaJ6d9bjh7wczZ9P1uW7NS1AvlvfHjtOAY0lDzbT6_UAi-QiYov9ILvXd-Bu_ggeXeRDDGLnIX-9HvyTr_7oXvJa0f_N9G3tg",
    tagColor: "#FFDEA1",
    tagTextColor: "#7a5900",
  },
  {
    id: 7,
    subtitle: "Classic Snack",
    name: "Aam Papad",
    desc: "Classic dried mango fruit leather, a nostalgic trip to childhood summers.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBtDAzITyTSYJodP4YQOpM65PKefOEVy7jyrHK55_0GoVc2kynw2qNmT3Ct7AFnyZfclIoceZFcExnSKX5Lp8cafVP9UTcTml29Fg0WghrbQWEphToYnraVY1HO1Lz-ukDbpouc6DZb-o3I246ngRkgxb5oiMXbVMozYJYI01ip1BHU2xzFCL8HSMo0ZsQBFTXo2tW1GGw8pFfSXDG3safqzZ1jevjmB1-vEbVvJ1P6sFhFuGnP1HZQANFgCC8WOWcMvD9IjHyagw",
    tagColor: "#BCF0AE",
    tagTextColor: "#1a4d2e",
  },
];

function WhatsAppIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.49" />
    </svg>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      {/* Image */}
      <div className="product-card-image">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="product-img"
        />
      </div>

      {/* Content */}
      <div className="product-card-content">
        {/* Subtitle tag */}
        <span
          className="product-tag"
          style={{ background: product.tagColor, color: product.tagTextColor }}
        >
          {product.subtitle}
        </span>

        {/* Name */}
        <h3 className="product-name">{product.name}</h3>

        {/* Description */}
        <p className="product-desc">{product.desc}</p>

        {/* WhatsApp CTA */}
        <a
          href={buildProductWhatsAppUrl(product.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="product-cta"
        >
          <WhatsAppIcon />
          Order on WhatsApp
        </a>
      </div>
    </article>
  );
}

export default function RelatedProductsPage() {
  return (
    <main style={{ paddingTop: "72px", background: "var(--surface-container-low)" }}>

      {/* ===== HERO SECTION ===== */}
      <section style={{ padding: "72px 0 40px" }}>
        <div className="container">
          <p
            style={{
              color: "var(--tertiary)",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "20px",
            }}
          >
            MangoMasti Originals
          </p>
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
            Mango Related Products
          </h1>
          <p
            style={{
              fontSize: "1.05rem",
              color: "var(--on-surface-variant)",
              lineHeight: 1.8,
              maxWidth: "540px",
            }}
          >
            Curating the finest mango-based products sourced by our connoisseurs.
            Everything mango, beyond the fruit.
          </p>
        </div>
      </section>

      {/* ===== GOLDEN BANNER ===== */}
      <section style={{ padding: "80px 0 56px" }}>
        <div className="container">
          <div className="products-banner-wrap">
            {/* Decorative circle — desktop only */}
            <div className="banner-circle" aria-hidden="true" />

            <div className="products-banner">
              <div className="banner-left">
                <span className="banner-badge">Handcrafted Goodness</span>
                <h2 className="banner-heading">Beyond The Fruit</h2>
                <p className="banner-text">
                  From tangy pickles to sweet jams — every product made with mangoes at their peak.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRODUCTS GRID ===== */}
      <section style={{ padding: "0 0 96px" }}>
        <div className="container">
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <style>{`
        /* ── Banner ───────────────────────────────────────────────────── */
        .products-banner-wrap {
          position: relative;
        }
        .banner-circle {
          position: absolute;
          right: 0;
          top: -80px;
          width: 220px;
          height: 220px;
          background: var(--primary-container);
          border-radius: 50%;
          box-shadow: 0 30px 60px rgba(18, 13, 5, 0.14);
          pointer-events: none;
          z-index: 0;
        }
        .products-banner {
          position: relative;
          z-index: 1;
          background: var(--primary-container);
          border-radius: 3rem;
          padding: 48px 56px;
          min-height: 180px;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .banner-left { max-width: 640px; }
        .banner-badge {
          display: inline-block;
          background: rgba(59, 105, 52, 0.18);
          color: var(--tertiary);
          border-radius: 9999px;
          padding: 4px 14px;
          font-size: 0.72rem;
          font-weight: 700;
          letterSpacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 14px;
        }
        .banner-heading {
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          font-weight: 800;
          color: var(--on-surface);
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin-bottom: 10px;
        }
        .banner-text {
          font-size: 0.97rem;
          color: var(--on-surface-variant);
          line-height: 1.75;
        }

        /* ── Products Grid ────────────────────────────────────────────── */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }

        /* ── Product Card ─────────────────────────────────────────────── */
        .product-card {
          background: #ffffff;
          border-radius: 2rem;
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(18, 13, 5, 0.08), 0 4px 12px rgba(18, 13, 5, 0.05);
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .product-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 40px 80px rgba(18, 13, 5, 0.14), 0 8px 20px rgba(18, 13, 5, 0.08);
        }
        .product-card-image {
          flex-shrink: 0;
          overflow: hidden;
        }
        .product-img {
          width: 100%;
          height: 260px;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }
        .product-card:hover .product-img {
          transform: scale(1.04);
        }
        .product-card-content {
          padding: 32px;
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 0;
        }
        .product-tag {
          display: inline-block;
          border-radius: 12px;
          padding: 3px 12px;
          font-size: 0.78rem;
          font-weight: 700;
          margin-bottom: 14px;
          align-self: flex-start;
        }
        .product-name {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--on-surface);
          letter-spacing: -0.03em;
          line-height: 1.15;
          margin-bottom: 12px;
        }
        .product-desc {
          font-size: 0.9rem;
          color: var(--on-surface-variant);
          line-height: 1.75;
          margin-bottom: 24px;
          flex: 1;
        }
        .product-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: var(--primary);
          color: #ffffff;
          border-radius: 28px;
          height: 56px;
          padding: 0 24px;
          font-size: 0.92rem;
          font-weight: 700;
          text-decoration: none;
          width: 100%;
          letter-spacing: 0.01em;
          transition: opacity 0.2s;
        }
        .product-cta:hover { opacity: 0.88; }

        /* ── Responsive ───────────────────────────────────────────────── */
        @media (max-width: 1024px) {
          .products-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
          .product-img { height: 320px; }
        }
        @media (max-width: 640px) {
          .products-grid { grid-template-columns: 1fr; gap: 20px; }
          .product-img { height: 256px; }
          .banner-circle { display: none; }
          .products-banner {
            border-radius: 2rem;
            padding: 32px 28px;
            min-height: 136px;
          }
          .product-card-content { padding: 24px; }
          .product-name { font-size: 1.25rem; }
        }
      `}</style>
    </main>
  );
}
