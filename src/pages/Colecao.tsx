import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Loader2, Package, Sparkles, ShoppingBag, Plus } from "lucide-react";
import {
  storefrontApiRequest,
  STOREFRONT_QUERY,
  type ShopifyProduct,
} from "@/lib/shopify";
import { CartDrawer } from "@/components/CartDrawer";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

const CATEGORIA_TODAS = "Todas";

const Colecao = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>(CATEGORIA_TODAS);
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);

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

  const categorias = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      const opt = p.node.options?.find((o) =>
        ["category", "categoria", "tipo", "type"].includes(o.name.toLowerCase())
      );
      opt?.values.forEach((v) => set.add(v));
    });
    return [CATEGORIA_TODAS, ...Array.from(set)];
  }, [products]);

  const produtosFiltrados = useMemo(() => {
    if (categoriaAtiva === CATEGORIA_TODAS) return products;
    return products.filter((p) =>
      p.node.options?.some(
        (o) =>
          ["category", "categoria", "tipo", "type"].includes(o.name.toLowerCase()) &&
          o.values.includes(categoriaAtiva)
      )
    );
  }, [products, categoriaAtiva]);

  const handleAdd = async (e: React.MouseEvent, p: ShopifyProduct) => {
    e.preventDefault();
    e.stopPropagation();
    const variant = p.node.variants.edges[0]?.node;
    if (!variant) return;
    await addItem({
      product: p,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Adicionado à sacola", { description: p.node.title });
  };

  return (
    <div
      className="min-h-screen text-foreground relative"
      style={{
        ["--background" as any]: "0 0% 5%",
        ["--foreground" as any]: "43 55% 78%",
        ["--card" as any]: "0 0% 8%",
        ["--card-foreground" as any]: "43 55% 78%",
        ["--primary" as any]: "43 65% 55%",
        ["--primary-foreground" as any]: "0 0% 5%",
        ["--secondary" as any]: "0 0% 11%",
        ["--secondary-foreground" as any]: "43 55% 78%",
        ["--muted" as any]: "0 0% 11%",
        ["--muted-foreground" as any]: "43 25% 60%",
        ["--accent" as any]: "43 65% 55%",
        ["--accent-foreground" as any]: "0 0% 5%",
        ["--border" as any]: "43 35% 28%",
        ["--input" as any]: "43 35% 28%",
        ["--ring" as any]: "43 65% 55%",
        background:
          "radial-gradient(1200px 600px at 50% -10%, hsl(43 55% 18% / 0.35), transparent 60%), radial-gradient(800px 500px at 100% 100%, hsl(43 55% 14% / 0.25), transparent 60%), hsl(0 0% 5%)",
      }}
    >
      {/* ornamento dourado decorativo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(43 65% 55% / 0.6), transparent)",
        }}
      />

      {/* HEADER */}
      <header className="border-b border-border/40 backdrop-blur sticky top-0 z-20 bg-background/80">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <Link
            to="/criar-minha-joia"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-accent transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Voltar
          </Link>
          <div className="flex items-center gap-2 text-accent">
            <span className="h-px w-6 bg-accent/60" />
            <Sparkles className="h-3.5 w-3.5" />
            <span className="font-display text-lg tracking-wide">Coleção</span>
            <Sparkles className="h-3.5 w-3.5" />
            <span className="h-px w-6 bg-accent/60" />
          </div>
          <CartDrawer />
        </div>
      </header>

      {/* HERO EDITORIAL */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-6 pt-20 pb-16 max-w-6xl text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-16 bg-accent/50" />
            <span className="text-[10px] uppercase tracking-[0.5em] text-accent">
              Edição Atelier
            </span>
            <span className="h-px w-16 bg-accent/50" />
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-light tracking-tight leading-[1.05]">
            Joias prontas
            <br />
            <em className="font-medium italic text-accent">para acompanhar</em>
            <br />
            sua história
          </h1>
          <p className="mt-8 text-sm md:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Peças exclusivas, feitas à mão em pequenas quantidades. Combine com a sua joia
            personalizada e finalize tudo em uma única sacola.
          </p>

          {/* divisor ornamental */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <span className="h-px w-20 bg-gradient-to-r from-transparent to-accent/60" />
            <span className="text-accent text-xs">✦</span>
            <span className="h-px w-20 bg-gradient-to-l from-transparent to-accent/60" />
          </div>
        </div>
      </section>

      <main className="container mx-auto px-6 pb-24 max-w-7xl">
        {/* Filtros por categoria */}
        {categorias.length > 1 && (
          <div className="flex flex-wrap gap-2 justify-center mb-16">
            {categorias.map((cat) => {
              const ativa = cat === categoriaAtiva;
              return (
                <button
                  key={cat}
                  onClick={() => setCategoriaAtiva(cat)}
                  className={`px-5 py-2.5 text-[10px] uppercase tracking-[0.3em] border transition-all duration-300 ${
                    ativa
                      ? "border-accent text-accent-foreground bg-accent"
                      : "border-border/50 text-foreground/70 hover:border-accent hover:text-accent"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-32">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        ) : produtosFiltrados.length === 0 ? (
          <div className="border border-dashed border-border/60 py-32 text-center">
            <Package
              className="h-12 w-12 text-muted-foreground mx-auto mb-4"
              strokeWidth={1}
            />
            <h3 className="font-display text-2xl mb-2">Nenhuma joia disponível</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Volte em breve — novas peças estão sendo preparadas.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {produtosFiltrados.map((p, idx) => {
              const variant = p.node.variants.edges[0]?.node;
              const image = p.node.images?.edges?.[0]?.node;
              return (
                <Link
                  key={p.node.id}
                  to={`/product/${p.node.handle}`}
                  className="group block"
                >
                  <div className="relative">
                    {/* moldura dourada */}
                    <div className="relative aspect-[4/5] overflow-hidden bg-card border border-border/40 group-hover:border-accent/60 transition-all duration-500">
                      {image ? (
                        <img
                          src={image.url}
                          alt={image.altText || p.node.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-secondary">
                          <Package
                            className="h-12 w-12 text-muted-foreground"
                            strokeWidth={1}
                          />
                        </div>
                      )}

                      {/* numeração editorial */}
                      <div className="absolute top-3 left-3 text-[10px] tracking-[0.3em] text-accent/80 font-display">
                        N° {String(idx + 1).padStart(2, "0")}
                      </div>

                      {/* gradient inferior */}
                      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/90 to-transparent" />

                      {/* botão adicionar */}
                      <button
                        onClick={(e) => handleAdd(e, p)}
                        disabled={isLoading || !variant?.availableForSale}
                        className="absolute bottom-4 right-4 h-11 w-11 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-elegant opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 hover:scale-110 disabled:opacity-50"
                        aria-label="Adicionar à sacola"
                      >
                        {isLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Plus className="h-5 w-5" strokeWidth={1.5} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* info */}
                  <div className="mt-5 text-center">
                    <h3 className="font-display text-lg tracking-wide mb-1 group-hover:text-accent transition-colors">
                      {p.node.title}
                    </h3>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <span className="h-px w-6 bg-accent/40" />
                      <p className="text-xs uppercase tracking-[0.25em] text-accent/90">
                        {p.node.priceRange.minVariantPrice.currencyCode}{" "}
                        {parseFloat(p.node.priceRange.minVariantPrice.amount).toFixed(2)}
                      </p>
                      <span className="h-px w-6 bg-accent/40" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* CTA final */}
        <div className="text-center mt-24 pt-12 border-t border-border/30">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground mb-4">
            Quer algo único?
          </p>
          <h2 className="font-display text-3xl md:text-4xl mb-6">
            Crie sua <em className="italic text-accent">própria joia</em>
          </h2>
          <Link to="/criar-minha-joia">
            <Button
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground rounded-none px-10 py-6 text-[10px] uppercase tracking-[0.4em] bg-transparent"
            >
              <ShoppingBag className="h-3.5 w-3.5 mr-2" />
              Personalizar agora
            </Button>
          </Link>
        </div>
      </main>

      {/* rodapé ornamental */}
      <div
        aria-hidden
        className="h-[1px] w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(43 65% 55% / 0.4), transparent)",
        }}
      />
    </div>
  );
};

export default Colecao;
