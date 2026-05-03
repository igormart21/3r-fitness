import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Loader2, Sparkles } from "lucide-react";
import { CartDrawer } from "@/components/CartDrawer";
import { ColecaoDestaque } from "@/components/ColecaoDestaque";
import { PRODUCT_BY_HANDLE_QUERY, storefrontApiRequest } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

const ProductDetail = () => {
  const { handle } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    null
  );
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);

  useEffect(() => {
    (async () => {
      try {
        const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, {
          handle,
        });
        const p = data?.data?.product;
        setProduct(p);
        setSelectedVariantId(p?.variants?.edges?.[0]?.node?.id ?? null);
      } finally {
        setLoading(false);
      }
    })();
  }, [handle]);

  const variant =
    product?.variants.edges.find((e: any) => e.node.id === selectedVariantId)
      ?.node ?? product?.variants.edges[0]?.node;

  const handleAdd = async () => {
    if (!variant || !product) return;
    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Peça adicionada à sua coleção", {
      description: product.title,
    });
  };

  return (
    <div
      className="min-h-screen text-foreground relative"
      style={{
        backgroundColor: "#030303",
        backgroundImage:
          "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(212,175,55,0.06) 0%, transparent 70%)",
        ["--background" as any]: "0 0% 2%",
        ["--foreground" as any]: "43 55% 78%",
        ["--accent" as any]: "43 65% 55%",
        ["--border" as any]: "43 35% 28%",
        ["--muted-foreground" as any]: "43 25% 60%",
      }}
    >
      {/* HEADER */}
      <header className="absolute top-0 inset-x-0 z-30">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <Link
            to="/colecao"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white/70 hover:text-[#d4af37] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Coleções
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

      <main className="pt-24">
        {loading ? (
          <div className="flex justify-center py-40">
            <Loader2
              className="h-8 w-8 animate-spin"
              style={{ color: "#d4af37" }}
            />
          </div>
        ) : !product ? (
          <div className="container py-32 text-center">
            <h1 className="font-serif italic text-4xl mb-4 text-white/80">
              Peça não encontrada
            </h1>
            <Link
              to="/colecao"
              className="text-[#d4af37] underline text-sm tracking-[0.3em] uppercase"
            >
              Voltar às coleções
            </Link>
          </div>
        ) : (
          <>
            {/* HERO da peça */}
            <section className="relative w-full px-6 py-12 md:py-20">
              <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Imagem dramática com spotlight */}
                <div className="relative">
                  {/* Spotlight ambient glow behind frame */}
                  <div
                    aria-hidden
                    className="absolute -inset-10 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse 60% 55% at 50% 45%, rgba(244,215,122,0.18) 0%, rgba(212,175,55,0.06) 35%, transparent 70%)",
                      filter: "blur(20px)",
                    }}
                  />
                  <div
                    className="relative aspect-square overflow-hidden transition-all duration-700"
                    style={{
                      backgroundColor: "#000",
                      backgroundImage:
                        "radial-gradient(ellipse 65% 55% at 50% 35%, rgba(212,175,55,0.22) 0%, transparent 70%)",
                      border: "1px solid rgba(212,175,55,0.30)",
                      boxShadow:
                        "0 40px 100px rgba(0,0,0,0.7), 0 0 80px rgba(212,175,55,0.15), inset 0 0 60px rgba(0,0,0,0.4)",
                    }}
                  >
                    {/* Top spotlight cone */}
                    <div
                      aria-hidden
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(ellipse 50% 40% at 50% 0%, rgba(255,240,200,0.18) 0%, transparent 60%)",
                        mixBlendMode: "screen",
                      }}
                    />
                    {product.images.edges[activeImage]?.node && (
                      <img
                        key={activeImage}
                        src={product.images.edges[activeImage].node.url}
                        alt={product.title}
                        className="w-full h-full object-cover animate-[fade-in_0.9s_ease-out_both]"
                        style={{ filter: "contrast(1.05) saturate(1.05) drop-shadow(0 0 30px rgba(212,175,55,0.15))" }}
                      />
                    )}
                    {/* Floor reflection / vignette */}
                    <div
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.55) 100%)",
                      }}
                    />
                    {/* Cantos dourados */}
                    <span className="absolute top-3 left-3 h-4 w-4 border-t border-l" style={{ borderColor: "#d4af37" }} />
                    <span className="absolute top-3 right-3 h-4 w-4 border-t border-r" style={{ borderColor: "#d4af37" }} />
                    <span className="absolute bottom-3 left-3 h-4 w-4 border-b border-l" style={{ borderColor: "#d4af37" }} />
                    <span className="absolute bottom-3 right-3 h-4 w-4 border-b border-r" style={{ borderColor: "#d4af37" }} />
                  </div>

                  {product.images.edges.length > 1 && (
                    <div className="grid grid-cols-5 gap-3 mt-6">
                      {product.images.edges.map((img: any, i: number) => (
                        <button
                          key={i}
                          onClick={() => setActiveImage(i)}
                          className="aspect-square overflow-hidden transition-all duration-500 hover:opacity-90"
                          style={{
                            border:
                              activeImage === i
                                ? "1px solid #d4af37"
                                : "1px solid rgba(212,175,55,0.15)",
                            opacity: activeImage === i ? 1 : 0.55,
                            boxShadow:
                              activeImage === i
                                ? "0 0 24px rgba(212,175,55,0.35), 0 0 0 1px rgba(212,175,55,0.4)"
                                : "none",
                            transform: activeImage === i ? "translateY(-2px)" : "none",
                          }}
                        >
                          <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Conteúdo */}
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className="h-px w-12"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(212,175,55,0.7))",
                      }}
                    />
                    <span
                      className="text-[10px] uppercase tracking-[0.5em]"
                      style={{ color: "#d4af37" }}
                    >
                      Peça do Ateliê
                    </span>
                  </div>

                  <h1
                    className="font-serif italic font-light text-4xl md:text-6xl leading-tight mb-6"
                    style={{
                      fontFamily:
                        '"Cormorant Garamond","Playfair Display",Georgia,serif',
                      color: "#f4ead0",
                    }}
                  >
                    {product.title}
                  </h1>

                  {product.description && (
                    <p
                      className="font-serif italic text-base md:text-lg leading-relaxed mb-10 whitespace-pre-line"
                      style={{ color: "rgba(244,234,208,0.75)" }}
                    >
                      {product.description}
                    </p>
                  )}

                  {/* Variações elegantes */}
                  {product.variants.edges.length > 1 && (
                    <div className="mb-10">
                      <h3
                        className="text-[10px] uppercase tracking-[0.4em] mb-5"
                        style={{ color: "rgba(212,175,55,0.7)" }}
                      >
                        Variações
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {product.variants.edges.map((v: any) => {
                          const sel = selectedVariantId === v.node.id;
                          return (
                            <button
                              key={v.node.id}
                              onClick={() => setSelectedVariantId(v.node.id)}
                              disabled={!v.node.availableForSale}
                              className="relative px-7 py-3.5 text-[10px] uppercase tracking-[0.4em] transition-all duration-700 ease-out disabled:opacity-30 disabled:line-through hover:-translate-y-0.5"
                              style={{
                                border: sel
                                  ? "1px solid #d4af37"
                                  : "1px solid rgba(212,175,55,0.22)",
                                color: sel ? "#070707" : "#e9dcb1",
                                background: sel
                                  ? "linear-gradient(135deg, #f4d77a 0%, #d4af37 50%, #b8860b 100%)"
                                  : "transparent",
                                boxShadow: sel
                                  ? "0 0 0 1px rgba(212,175,55,0.5), 0 0 30px rgba(212,175,55,0.35), 0 10px 30px rgba(0,0,0,0.4)"
                                  : "none",
                                transform: sel ? "translateY(-1px)" : "none",
                              }}
                            >
                              {v.node.title}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Preço discreto */}
                  <div className="mb-8">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-white/45 mb-2">
                      Investimento da peça
                    </p>
                    <p
                      className="font-serif text-2xl md:text-3xl"
                      style={{ color: "#d4af37" }}
                    >
                      A partir de {variant.price.currencyCode}{" "}
                      {parseFloat(variant.price.amount).toFixed(2)}
                    </p>
                  </div>

                  {/* CTA principal */}
                  <button
                    onClick={handleAdd}
                    disabled={isLoading || !variant?.availableForSale}
                    className="w-full py-5 text-[11px] uppercase tracking-[0.45em] transition-all duration-500 disabled:opacity-50"
                    style={{
                      color: "#070707",
                      background:
                        "linear-gradient(135deg, #f4d77a 0%, #d4af37 50%, #b8860b 100%)",
                      boxShadow: "0 10px 40px rgba(212,175,55,0.25)",
                    }}
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                    ) : variant?.availableForSale ? (
                      "Adicionar à sua coleção"
                    ) : (
                      "Indisponível"
                    )}
                  </button>
                </div>
              </div>
            </section>

            {/* BLOCO PERSONALIZAÇÃO */}
            <section
              className="relative py-24 md:py-32 px-6 mt-12"
              style={{
                background:
                  "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(212,175,55,0.10) 0%, transparent 70%), #050505",
                borderTop: "1px solid rgba(212,175,55,0.15)",
                borderBottom: "1px solid rgba(212,175,55,0.15)",
              }}
            >
              <div className="max-w-3xl mx-auto text-center">
                <Sparkles
                  className="h-6 w-6 mx-auto mb-6"
                  style={{ color: "#d4af37" }}
                />
                <h2
                  className="font-serif italic font-light text-3xl md:text-5xl mb-6"
                  style={{
                    fontFamily:
                      '"Cormorant Garamond","Playfair Display",Georgia,serif',
                    color: "#f4ead0",
                  }}
                >
                  Torne essa peça{" "}
                  <em style={{ color: "#d4af37" }}>única</em>
                </h2>
                <p
                  className="text-base md:text-lg mb-10 italic"
                  style={{ color: "rgba(244,234,208,0.7)" }}
                >
                  Transforme essa criação em um símbolo exclusivo seu.
                </p>
                <Link
                  to="/catalogo"
                  className="inline-flex items-center gap-3 px-12 py-4 text-[11px] uppercase tracking-[0.45em] transition-all duration-500 hover:gap-5"
                  style={{
                    color: "#d4af37",
                    border: "1px solid rgba(212,175,55,0.55)",
                  }}
                >
                  <span
                    className="h-px w-6"
                    style={{ background: "rgba(212,175,55,0.7)" }}
                  />
                  Criar versão personalizada
                  <span
                    className="h-px w-6"
                    style={{ background: "rgba(212,175,55,0.7)" }}
                  />
                </Link>
              </div>
            </section>

            {/* Outras peças */}
            <ColecaoDestaque
              title="Outras peças do ateliê"
              subtitle="Criações que conversam com a sua escolha"
              limit={3}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default ProductDetail;
