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
      className="relative w-full overflow-hidden bg-black -mt-20 md:-mt-32 z-10"
      style={{ backgroundColor: "#000" }}
    >
      {/* Fade superior: dissolve a seção anterior dentro do preto */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 md:-top-48 inset-x-0 h-32 md:h-48 z-20"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,1) 100%)",
        }}
      />

      {/* Imagem de fundo cobrindo toda a seção (com leve parallax via transform) */}
      <img
        src={atelieCtaBg}
        alt="Coleções 3R Fitness — peças em ouro"
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover object-top will-change-transform"
        style={{ transform: "translateZ(0) scale(1.04)" }}
      />

      {/* Fade interno no topo da imagem: cria sobreposição contínua com a seção anterior */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-48 md:h-64 z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,1) 100%)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
        }}
      />

      {/* Glow dourado sutil na linha de transição */}
      <div
        aria-hidden
        className="absolute inset-x-0 -top-px h-40 z-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 100% at 50% 0%, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0.06) 35%, transparent 70%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Overlay editorial geral + vinheta */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.15) 100%), radial-gradient(ellipse 60% 80% at 30% 50%, rgba(212,175,55,0.15) 0%, transparent 70%), radial-gradient(ellipse 100% 80% at 50% 100%, rgba(0,0,0,0.6) 0%, transparent 70%)",
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
