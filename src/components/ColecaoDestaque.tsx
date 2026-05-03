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
      style={{ backgroundColor: "#050505", marginTop: "-320px", paddingTop: 0 }}
    >
      {/* Hero coleções */}
      <div className="relative overflow-hidden" style={{ minHeight: "92vh" }}>
        {/* Imagem de fundo */}
        <img
          src={atelieCtaBg}
          alt="Coleções 3R Fitness — peças em ouro"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          style={{ objectPosition: "center 28%", transform: "translateZ(0) scale(1.04)" }}
        />

        {/* Fade longo no topo da imagem — dissolve sem criar faixa retangular */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 pointer-events-none z-[2]"
          style={{
            height: "55%",
            background:
              "linear-gradient(to bottom, rgba(5,5,5,1) 0%, rgba(5,5,5,0.92) 12%, rgba(5,5,5,0.7) 28%, rgba(5,5,5,0.4) 50%, rgba(5,5,5,0.15) 75%, rgba(5,5,5,0) 100%)",
          }}
        />

        {/* Vinheta + fade inferior sutis */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none z-[2]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0) 55%, rgba(5,5,5,0.05) 75%, rgba(5,5,5,0.85) 100%), radial-gradient(circle at 62% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.7) 100%)",
          }}
        />

        {loading && (
          <div className="relative z-[4] container mx-auto max-w-7xl px-4 min-h-[92vh] flex items-end justify-center pb-20 md:pb-32 pt-32">
            <Loader2 className="h-8 w-8 animate-spin" style={{ color: "#d4af37" }} />
          </div>
        )}
      </div>

    </section>
  );
};

export default ColecaoDestaque;
