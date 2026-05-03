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
    <section className="relative w-full overflow-hidden">
      {/* Imagem de fundo cobrindo toda a seção */}
      <img
        src={atelieCtaBg}
        alt="Coleções 3R Fitness — peças em ouro"
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.15) 100%), radial-gradient(ellipse 60% 80% at 30% 50%, rgba(212,175,55,0.15) 0%, transparent 70%)",
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
