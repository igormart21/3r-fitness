import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import {
  storefrontApiRequest,
  STOREFRONT_QUERY,
  type ShopifyProduct,
} from "@/lib/shopify";

type Props = {
  title?: string;
  subtitle?: string;
  limit?: number;
};

export const ColecaoDestaque = ({
  title = "Peças do ateliê",
  subtitle = "Cada criação carrega uma história singular",
  limit = 4,
}: Props) => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await storefrontApiRequest(STOREFRONT_QUERY, { first: limit });
        setProducts(data?.data?.products?.edges ?? []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [limit]);

  return (
    <section
      className="relative w-full"
      style={{
        background: "linear-gradient(180deg, #000 0%, #050505 50%, #000 100%)",
        paddingTop: "160px",
        paddingBottom: "180px",
      }}
    >
      <div className="container mx-auto max-w-7xl px-6 text-center mb-20 sm:mb-28">
        <span
          className="text-[10px] sm:text-[11px] uppercase tracking-[0.55em] font-light"
          style={{ color: "rgba(244,215,122,0.7)" }}
        >
          Ateliê
        </span>
        <div
          className="mx-auto mt-6 h-px w-12"
          style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.7), transparent)" }}
        />
        <h2
          className="font-display font-light text-3xl sm:text-4xl md:text-5xl mt-8 leading-[1.15] tracking-[0.01em]"
          style={{
            background: "linear-gradient(180deg, #f4f4f4 0%, #d9d9d9 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {title}
        </h2>
        <p
          className="mt-6 italic font-light text-base sm:text-lg max-w-xl mx-auto"
          style={{ color: "rgba(255,255,255,0.55)", letterSpacing: "0.02em" }}
        >
          {subtitle}
        </p>
      </div>

      <div className="container mx-auto max-w-6xl px-6">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin" style={{ color: "#d4af37" }} />
          </div>
        ) : (
          <div className={`grid gap-10 sm:gap-14 md:gap-16 ${products.length >= 4 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2 md:grid-cols-3"}`}>
            {products.slice(0, limit).map(({ node }) => {
              const img = node.images.edges[0]?.node;
              return (
                <Link
                  key={node.id}
                  to={`/product/${node.handle}`}
                  className="group block transition-transform duration-700 hover:-translate-y-1"
                >
                  <div
                    className="relative aspect-[4/5] overflow-hidden"
                    style={{
                      background: "#0a0a0a",
                      border: "1px solid rgba(212,175,55,0.15)",
                      boxShadow: "0 18px 50px rgba(0,0,0,0.55)",
                    }}
                  >
                    {img && (
                      <img
                        src={img.url}
                        alt={img.altText || node.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                      />
                    )}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(244,215,122,0.18) 0%, transparent 70%)",
                        mixBlendMode: "screen",
                      }}
                    />
                  </div>
                  <h3
                    className="mt-6 text-center font-display text-base sm:text-lg font-light text-white/85"
                    style={{ letterSpacing: "0.08em" }}
                  >
                    {node.title}
                  </h3>
                  <div
                    className="mx-auto mt-3 h-px w-0 group-hover:w-14 transition-all duration-700"
                    style={{ background: "linear-gradient(90deg, transparent, #d4af37, transparent)" }}
                  />
                </Link>
              );
            })}
          </div>
        )}

        {/* CTA sutil */}
        <div className="mt-24 sm:mt-28 flex justify-center">
          <Link
            to="/colecao"
            className="group relative inline-flex items-center gap-5 px-10 py-4 transition-all duration-700 hover:gap-7"
            style={{
              border: "1px solid rgba(212,175,55,0.45)",
              color: "#d4af37",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#d4af37";
              e.currentTarget.style.boxShadow = "0 0 30px rgba(212,175,55,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(212,175,55,0.45)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <span className="h-px w-6" style={{ background: "rgba(212,175,55,0.7)" }} />
            <span className="text-[11px] uppercase tracking-[0.5em] font-light">
              Explorar o ateliê
            </span>
            <span className="h-px w-6" style={{ background: "rgba(212,175,55,0.7)" }} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ColecaoDestaque;
