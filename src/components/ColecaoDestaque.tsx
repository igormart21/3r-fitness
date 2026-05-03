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
      className="relative w-full overflow-hidden z-[1]"
      style={{ backgroundColor: "#050505", marginTop: "-220px", paddingTop: 0 }}
    >
      {/* Hero coleções */}
      <div className="relative overflow-hidden" style={{ minHeight: "78vh" }}>
        {/* Imagem de fundo */}
        <img
          src={atelieCtaBg}
          alt="Coleções 3R Fitness — peças em ouro"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          style={{ objectPosition: "center top", transform: "translateZ(0) scale(1.04)" }}
        />

        {/* Fade superior suave para fundir com a seção anterior (sem faixa escura) */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 pointer-events-none z-[3]"
          style={{
            height: "240px",
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0.85) 0%, rgba(5,5,5,0.45) 40%, rgba(5,5,5,0.15) 75%, rgba(5,5,5,0) 100%)",
          }}
        />

        {/* Vinheta sutil + fade inferior na imagem */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none z-[2]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0) 30%, rgba(5,5,5,0.05) 50%, rgba(5,5,5,0.7) 100%), radial-gradient(circle at 65% 45%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.75) 100%)",
          }}
        />

        {/* Glow dourado sutil na linha de transição */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-40 z-[3] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 100% at 50% 0%, rgba(212,175,55,0.14) 0%, rgba(212,175,55,0.04) 35%, transparent 70%)",
            mixBlendMode: "screen",
          }}
        />

        {/* Conteúdo */}
        <div className="relative z-[4] container mx-auto max-w-7xl px-4 min-h-[78vh] flex items-end justify-center pb-20 md:pb-32 pt-32">
          {loading ? (
            <Loader2 className="h-8 w-8 animate-spin" style={{ color: "#d4af37" }} />
          ) : (
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
              <span className="h-px w-6" style={{ background: "rgba(212,175,55,0.7)" }} />
              {ctaLabel}
              <span className="h-px w-6" style={{ background: "rgba(212,175,55,0.7)" }} />
            </Link>
          )}
        </div>
      </div>

    </section>
  );
};

export default ColecaoDestaque;
