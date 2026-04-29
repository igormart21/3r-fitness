import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Loader2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PRODUCT_BY_HANDLE_QUERY, storefrontApiRequest } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

const ProductDetail = () => {
  const { handle } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const addItem = useCartStore(s => s.addItem);
  const isLoading = useCartStore(s => s.isLoading);

  useEffect(() => {
    (async () => {
      try {
        const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
        const p = data?.data?.product;
        setProduct(p);
        setSelectedVariantId(p?.variants?.edges?.[0]?.node?.id ?? null);
      } finally {
        setLoading(false);
      }
    })();
  }, [handle]);

  const variant = product?.variants.edges.find((e: any) => e.node.id === selectedVariantId)?.node
    ?? product?.variants.edges[0]?.node;

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
    toast.success("Adicionado à sacola", { description: product.title });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {loading ? (
          <div className="flex justify-center py-32"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
        ) : !product ? (
          <div className="container py-32 text-center">
            <h1 className="font-display text-4xl mb-4">Produto não encontrado</h1>
            <Link to="/" className="text-accent underline">Voltar para a loja</Link>
          </div>
        ) : (
          <div className="container py-12">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-smooth mb-8">
              <ArrowLeft className="h-4 w-4" /> Continuar comprando
            </Link>
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <div className="aspect-[4/5] overflow-hidden bg-muted rounded-sm mb-4">
                  {product.images.edges[activeImage]?.node && (
                    <img src={product.images.edges[activeImage].node.url} alt={product.title} className="w-full h-full object-cover" />
                  )}
                </div>
                {product.images.edges.length > 1 && (
                  <div className="grid grid-cols-5 gap-2">
                    {product.images.edges.map((img: any, i: number) => (
                      <button key={i} onClick={() => setActiveImage(i)}
                        className={`aspect-square overflow-hidden rounded-sm border-2 transition-smooth ${activeImage === i ? 'border-accent' : 'border-transparent'}`}>
                        <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="md:pt-8">
                <h1 className="font-display text-4xl md:text-5xl font-medium mb-4">{product.title}</h1>
                <p className="font-display text-2xl font-semibold mb-8">
                  {variant.price.currencyCode} {parseFloat(variant.price.amount).toFixed(2)}
                </p>
                {product.description && (
                  <p className="text-muted-foreground leading-relaxed mb-8 whitespace-pre-line">{product.description}</p>
                )}
                {product.variants.edges.length > 1 && (
                  <div className="mb-8">
                    <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Variante</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.edges.map((v: any) => (
                        <button key={v.node.id}
                          onClick={() => setSelectedVariantId(v.node.id)}
                          disabled={!v.node.availableForSale}
                          className={`px-4 py-2 text-sm border rounded-sm transition-smooth disabled:opacity-40 disabled:line-through ${selectedVariantId === v.node.id ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary'}`}>
                          {v.node.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <Button onClick={handleAdd} disabled={isLoading || !variant?.availableForSale}
                  size="lg" className="w-full h-14 rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 text-base">
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                    <><ShoppingBag className="h-5 w-5 mr-2" /> {variant?.availableForSale ? 'Adicionar à sacola' : 'Esgotado'}</>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
