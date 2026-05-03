import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, Package } from "lucide-react";
import {
  storefrontApiRequest,
  STOREFRONT_QUERY,
  type ShopifyProduct,
} from "@/lib/shopify";
import atelieCtaBg from "@/assets/atelie-cta-bg.png";

type Props = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  limit?: number;
  cols?: 3 | 4;
};

/**
 * Bloco editorial usado na Home e no fluxo pós-personalização para
 * apresentar peças prontas (coleções) sem aparência de e-commerce.
 */
export const ColecaoDestaque = ({
  eyebrow = "Ateliê 3R",
  title = "Peças já criadas",
  subtitle = "Algumas histórias já nasceram prontas",
  ctaLabel = "Explorar coleções",
  limit = 4,
  cols = 4,
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
      className="relative w-full py-20 md:py-28 px-4"
      style={{
        backgroundColor: "#070707",
        backgroundImage:
          "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,175,55,0.10) 0%, transparent 70%)",
      }}
    >
      <div className="container mx-auto max-w-7xl">
        {/* Cabeçalho removido — fundo limpo */}

        {/* Grid editorial */}
        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2
              className="h-8 w-8 animate-spin"
              style={{ color: "#d4af37" }}
            />
          </div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center">
            <Package
              className="h-10 w-10 text-white/30 mx-auto mb-3"
              strokeWidth={1}
            />
            <p className="text-white/50 text-sm mb-8">
              Novas peças em breve.
            </p>
            <Link
              to="/colecao"
              className="inline-flex items-center gap-3 px-10 py-4 text-[10px] uppercase tracking-[0.45em] transition-all duration-500 hover:gap-5"
              style={{
                color: "#d4af37",
                border: "1px solid rgba(212,175,55,0.55)",
                background:
                  "linear-gradient(135deg, rgba(212,175,55,0.04), transparent)",
              }}
            >
              <span className="h-px w-6" style={{ background: "rgba(212,175,55,0.7)" }} />
              {ctaLabel}
              <span className="h-px w-6" style={{ background: "rgba(212,175,55,0.7)" }} />
            </Link>
          </div>
        ) : (
          <div
            className={`grid gap-x-6 gap-y-12 grid-cols-1 sm:grid-cols-2 ${
              cols === 4
                ? "lg:grid-cols-3 xl:grid-cols-4"
                : "lg:grid-cols-3"
            }`}
          >
            {products.slice(0, limit).map((p, idx) => {
              const image = p.node.images?.edges?.[0]?.node;
              const price = p.node.priceRange.minVariantPrice;
              return (
                <Link
                  key={p.node.id}
                  to={`/product/${p.node.handle}`}
                  className="group block"
                >
                  <div
                    className="relative aspect-[4/5] overflow-hidden bg-black/60 transition-all duration-700"
                    style={{
                      border: "1px solid rgba(212,175,55,0.25)",
                      boxShadow:
                        "0 8px 30px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.06) inset",
                    }}
                  >
                    {image ? (
                      <img
                        src={image.url}
                        alt={image.altText || p.node.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.06]"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package
                          className="h-12 w-12 text-white/20"
                          strokeWidth={1}
                        />
                      </div>
                    )}
                    {/* Vinheta */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                    {/* Glow dourado no hover */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      style={{
                        background:
                          "radial-gradient(ellipse 90% 60% at 50% 100%, rgba(212,175,55,0.25) 0%, transparent 70%)",
                      }}
                    />
                    {/* Numeração editorial */}
                    <div
                      className="absolute top-3 left-3 text-[10px] tracking-[0.35em]"
                      style={{ color: "rgba(212,175,55,0.85)" }}
                    >
                      N° {String(idx + 1).padStart(2, "0")}
                    </div>
                  </div>

                  <div className="mt-5 text-center">
                    <h3
                      className="font-serif italic text-lg md:text-xl tracking-wide transition-colors"
                      style={{ color: "#e9dcb1" }}
                    >
                      {p.node.title}
                    </h3>
                    <p className="mt-1.5 text-[10px] uppercase tracking-[0.3em] text-white/50">
                      A partir de {price.currencyCode}{" "}
                      {parseFloat(price.amount).toFixed(2)}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* CTA editorial com fundo cinematográfico */}
        <div className="relative mt-20 md:mt-28 overflow-hidden rounded-sm">
          <img
            src={atelieCtaBg}
            alt="Coleções 3R Fitness — peças em ouro"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.25) 100%), radial-gradient(ellipse 60% 80% at 30% 50%, rgba(212,175,55,0.18) 0%, transparent 70%)",
            }}
          />
          <div className="relative z-10 px-6 md:px-16 py-24 md:py-36 text-center">
            <Link
              to="/colecao"
              className="inline-flex items-center gap-3 px-10 py-4 text-[10px] uppercase tracking-[0.45em] transition-all duration-500 hover:gap-5 backdrop-blur-sm"
              style={{
                color: "#d4af37",
                border: "1px solid rgba(212,175,55,0.55)",
                background:
                  "linear-gradient(135deg, rgba(0,0,0,0.45), rgba(0,0,0,0.2))",
              }}
            >
              <span
                className="h-px w-6"
                style={{ background: "rgba(212,175,55,0.7)" }}
              />
              {ctaLabel}
              <span
                className="h-px w-6"
                style={{ background: "rgba(212,175,55,0.7)" }}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ColecaoDestaque;
