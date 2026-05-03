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
      style={{ backgroundColor: "#050505", marginTop: "-40px", paddingTop: "80px" }}
    >
      {/* Fade superior — dissolve a seção anterior dentro do preto (#050505) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[2]"
        style={{
          height: "180px",
          background:
            "linear-gradient(to bottom, rgba(5,5,5,1) 0%, rgba(5,5,5,0.75) 35%, rgba(5,5,5,0.25) 70%, rgba(5,5,5,0) 100%)",
        }}
      />

      {/* Imagem de fundo cobrindo toda a seção */}
      <img
        src={atelieCtaBg}
        alt="Coleções 3R Fitness — peças em ouro"
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover object-top will-change-transform"
        style={{ transform: "translateZ(0) scale(1.04)" }}
      />

      {/* Vinheta premium na imagem */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(circle at 65% 45%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.22) 45%, rgba(0,0,0,0.85) 100%), linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 45%, rgba(0,0,0,0.9) 100%)",
        }}
      />

      {/* Glow dourado sutil na linha de transição */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-40 z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 100% at 50% 0%, rgba(212,175,55,0.16) 0%, rgba(212,175,55,0.05) 35%, transparent 70%)",
          mixBlendMode: "screen",
        }}
      />

      <div className="relative z-10 container mx-auto max-w-7xl px-4 py-32 md:py-56 min-h-[100vh] flex items-end justify-center pb-20 md:pb-32">
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
    </section>
  );
};

export default ColecaoDestaque;
