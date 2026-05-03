import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, Loader2, Package } from "lucide-react";
import {
  storefrontApiRequest,
  STOREFRONT_QUERY,
  type ShopifyProduct,
} from "@/lib/shopify";
import { CartDrawer } from "@/components/CartDrawer";
import colecoesHero from "@/assets/colecoes-hero.jpg";

const CATEGORIAS_DEFAULT = ["Colares", "Pingentes", "Anéis", "Brincos"] as const;
const TODAS = "Todas";

const Colecao = () => {
  const [searchParams] = useSearchParams();
  const afterCustom = searchParams.get("after") === "1";
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>(TODAS);

  useEffect(() => {
    (async () => {
      try {
        const data = await storefrontApiRequest(STOREFRONT_QUERY, { first: 50 });
        setProducts(data?.data?.products?.edges ?? []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Categorias derivadas do Shopify (option "categoria"/"tipo") + defaults editoriais
  const categorias = useMemo(() => {
    const set = new Set<string>(CATEGORIAS_DEFAULT);
    products.forEach((p) => {
      const opt = p.node.options?.find((o) =>
        ["category", "categoria", "tipo", "type"].includes(o.name.toLowerCase())
      );
      opt?.values.forEach((v) => set.add(v));
    });
    return [TODAS, ...Array.from(set)];
  }, [products]);

  const produtosFiltrados = useMemo(() => {
    if (categoriaAtiva === TODAS) return products;
    return products.filter((p) =>
      p.node.options?.some(
        (o) =>
          ["category", "categoria", "tipo", "type"].includes(o.name.toLowerCase()) &&
          o.values.includes(categoriaAtiva)
      ) || p.node.title.toLowerCase().includes(categoriaAtiva.toLowerCase().replace(/s$/, ""))
    );
  }, [products, categoriaAtiva]);

  return (
    <div
      className="min-h-screen text-foreground relative"
      style={{
        backgroundColor: "#070707",
        ["--background" as any]: "0 0% 4%",
        ["--foreground" as any]: "43 55% 78%",
        ["--accent" as any]: "43 65% 55%",
        ["--accent-foreground" as any]: "0 0% 5%",
        ["--border" as any]: "43 35% 28%",
        ["--muted-foreground" as any]: "43 25% 60%",
      }}
    >
      {/* HEADER fixo minimalista */}
      <header className="absolute top-0 inset-x-0 z-30">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white/70 hover:text-[#d4af37] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Início
          </Link>
          <span
            className="hidden md:block font-serif italic text-sm tracking-[0.3em]"
            style={{ color: "#d4af37" }}
          >
            ATELIÊ 3R
          </span>
          <CartDrawer />
        </div>
      </header>

      {/* HERO 80vh */}
      <section className="relative w-full h-[80vh] min-h-[560px] overflow-hidden">
        <img
          src={colecoesHero}
          alt="Coleção Ateliê 3R — peça em ouro 18k"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay escuro + dourado sutil */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.85) 100%), radial-gradient(ellipse 40% 30% at 20% 20%, rgba(212,175,55,0.18) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <div className="flex items-center gap-3 mb-6">
            <span
              className="h-px w-16"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(212,175,55,0.7))",
              }}
            />
            <span
              className="text-[10px] uppercase tracking-[0.5em]"
              style={{ color: "#d4af37" }}
            >
              Coleções
            </span>
            <span
              className="h-px w-16"
              style={{
                background:
                  "linear-gradient(90deg, rgba(212,175,55,0.7), transparent)",
              }}
            />
          </div>
          <h1
            className="font-serif font-light text-4xl md:text-6xl lg:text-7xl leading-[1.1] max-w-4xl"
            style={{
              fontFamily:
                '"Cormorant Garamond","Playfair Display",Georgia,serif',
              color: "#f4ead0",
              textShadow: "0 2px 30px rgba(0,0,0,0.6)",
            }}
          >
            Peças que representam
            <br />
            <em
              style={{
                background:
                  "linear-gradient(180deg, #f4d77a 0%, #d4af37 50%, #b8860b 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              mais do que estética
            </em>
          </h1>
          <p className="mt-8 text-sm md:text-base text-white/70 max-w-xl italic">
            Cada criação carrega identidade, conquista e significado.
          </p>
        </div>
      </section>

      {/* CONCEITO */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p
            className="font-serif italic text-2xl md:text-3xl leading-relaxed"
            style={{
              fontFamily:
                '"Cormorant Garamond","Playfair Display",Georgia,serif',
              color: "#e9dcb1",
            }}
          >
            Algumas histórias são criadas.
            <br />
            <span style={{ color: "#d4af37" }}>Outras já nascem prontas.</span>
          </p>
          <div className="flex items-center justify-center gap-3 my-10">
            <span
              className="h-px w-20"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(212,175,55,0.5))",
              }}
            />
            <span
              className="block h-1.5 w-1.5 rotate-45"
              style={{ background: "#d4af37" }}
            />
            <span
              className="h-px w-20"
              style={{
                background:
                  "linear-gradient(90deg, rgba(212,175,55,0.5), transparent)",
              }}
            />
          </div>
          <p className="text-sm md:text-base text-white/60 leading-relaxed">
            Explore peças desenvolvidas para representar disciplina, força e
            evolução.
          </p>
        </div>
      </section>

      {/* NAVEGAÇÃO DE CATEGORIAS */}
      <nav className="px-6 mb-16">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {categorias.map((cat) => {
            const ativa = cat === categoriaAtiva;
            return (
              <button
                key={cat}
                onClick={() => setCategoriaAtiva(cat)}
                className="relative text-[11px] md:text-xs uppercase tracking-[0.4em] transition-all duration-500 pb-1.5"
                style={{
                  color: ativa ? "#d4af37" : "rgba(255,255,255,0.55)",
                  textShadow: ativa
                    ? "0 0 18px rgba(212,175,55,0.6)"
                    : "none",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget.style.textShadow =
                    "0 0 18px rgba(212,175,55,0.5)"),
                  (e.currentTarget.style.color = "#d4af37"))
                }
                onMouseLeave={(e) => {
                  if (!ativa) {
                    e.currentTarget.style.textShadow = "none";
                    e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                  }
                }}
              >
                {cat}
                <span
                  className="absolute left-1/2 -translate-x-1/2 bottom-0 h-px transition-all duration-500"
                  style={{
                    width: ativa ? "100%" : "0%",
                    background:
                      "linear-gradient(90deg, transparent, #d4af37, transparent)",
                  }}
                />
              </button>
            );
          })}
        </div>
      </nav>

      {/* GRID EDITORIAL */}
      <main className="px-6 pb-32">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex justify-center py-32">
              <Loader2
                className="h-8 w-8 animate-spin"
                style={{ color: "#d4af37" }}
              />
            </div>
          ) : produtosFiltrados.length === 0 ? (
            <div className="border border-dashed border-white/10 py-32 text-center">
              <Package
                className="h-12 w-12 text-white/30 mx-auto mb-4"
                strokeWidth={1}
              />
              <h3 className="font-serif italic text-2xl mb-2 text-white/80">
                Nenhuma peça nesta categoria
              </h3>
              <p className="text-white/50 max-w-md mx-auto text-sm">
                Volte em breve — novas criações estão sendo preparadas no
                ateliê.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
              {produtosFiltrados.map((p, idx) => {
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
                          "0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.06) inset",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.boxShadow =
                          "0 12px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.4) inset, 0 0 60px rgba(212,175,55,0.18)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.boxShadow =
                          "0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.06) inset")
                      }
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
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                      <div
                        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                        style={{
                          background:
                            "radial-gradient(ellipse 90% 60% at 50% 100%, rgba(212,175,55,0.28) 0%, transparent 70%)",
                        }}
                      />
                      <div
                        className="absolute top-3 left-3 text-[10px] tracking-[0.35em]"
                        style={{ color: "rgba(212,175,55,0.85)" }}
                      >
                        N° {String(idx + 1).padStart(2, "0")}
                      </div>
                    </div>

                    <div className="mt-6 text-center">
                      <h3
                        className="font-serif italic text-xl md:text-2xl tracking-wide mb-2"
                        style={{ color: "#e9dcb1" }}
                      >
                        {p.node.title}
                      </h3>
                      {p.node.description && (
                        <p className="text-[11px] uppercase tracking-[0.3em] text-white/45 mb-3 line-clamp-1">
                          {p.node.description.split("\n")[0]}
                        </p>
                      )}
                      <div className="flex items-center justify-center gap-3">
                        <span
                          className="h-px w-6"
                          style={{ background: "rgba(212,175,55,0.4)" }}
                        />
                        <p
                          className="text-[10px] uppercase tracking-[0.35em]"
                          style={{ color: "#d4af37" }}
                        >
                          A partir de {price.currencyCode}{" "}
                          {parseFloat(price.amount).toFixed(2)}
                        </p>
                        <span
                          className="h-px w-6"
                          style={{ background: "rgba(212,175,55,0.4)" }}
                        />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* CTA personalização */}
          <div className="text-center mt-32 pt-16 border-t border-white/10">
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/50 mb-5">
              Quer algo único?
            </p>
            <h2
              className="font-serif italic text-3xl md:text-5xl mb-8"
              style={{
                fontFamily:
                  '"Cormorant Garamond","Playfair Display",Georgia,serif',
                color: "#e9dcb1",
              }}
            >
              Crie sua{" "}
              <em style={{ color: "#d4af37" }}>própria peça</em>
            </h2>
            <Link
              to="/criar-minha-joia"
              className="inline-flex items-center gap-3 px-12 py-4 text-[10px] uppercase tracking-[0.45em] transition-all duration-500 hover:gap-5"
              style={{
                color: "#d4af37",
                border: "1px solid rgba(212,175,55,0.55)",
              }}
            >
              <span
                className="h-px w-6"
                style={{ background: "rgba(212,175,55,0.7)" }}
              />
              Personalizar agora
              <span
                className="h-px w-6"
                style={{ background: "rgba(212,175,55,0.7)" }}
              />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Colecao;
