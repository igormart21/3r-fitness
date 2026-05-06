import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingBag, Minus, Plus, X, ArrowRight, Loader2 } from "lucide-react";
import { ShippingAnnouncementBar } from "@/components/ShippingAnnouncementBar";
import { useCartStore } from "@/stores/cartStore";
import { useCartUIStore } from "@/stores/cartUIStore";
import { buildContinuarPath } from "@/lib/continuar";

export const CartDrawer = ({ showTrigger = true }: { showTrigger?: boolean } = {}) => {
  const isOpen = useCartUIStore((s) => s.isOpen);
  const setIsOpen = useCartUIStore((s) => s.setOpen);
  const navigate = useNavigate();
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + parseFloat(item.price.amount) * item.quantity, 0);
  const currency = items[0]?.price.currencyCode || "BRL";

  useEffect(() => { if (isOpen) syncCart(); }, [isOpen, syncCart]);

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, "_blank");
      setIsOpen(false);
    }
  };

  const handleContinuarComprando = () => {
    setIsOpen(false);
    navigate(buildContinuarPath());
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {showTrigger && (
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="relative rounded-full text-foreground hover:bg-transparent hover:text-[hsl(43,65%,60%)] transition-colors">
            <ShoppingBag className="h-5 w-5" strokeWidth={1.25} />
            {totalItems > 0 && (
              <Badge className="absolute -top-0.5 -right-0.5 h-4 min-w-4 rounded-full p-0 px-1 flex items-center justify-center text-[9px] font-light bg-[hsl(43,65%,55%)] text-black border-0">
                {totalItems}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
      )}
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 flex flex-col h-full border-l border-[hsl(43,30%,20%)] bg-[hsl(0,0%,5%)] text-[hsl(43,40%,85%)] [&>button]:hidden"
      >
        {/* Header */}
        <SheetHeader className="flex-shrink-0 px-8 pt-8 pb-6 border-b border-[hsl(43,30%,15%)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-[hsl(43,65%,55%)] mb-1">Sacola</p>
              <SheetTitle className="font-display text-2xl font-light tracking-wide text-[hsl(43,40%,90%)]">
                {totalItems === 0 ? "Vazia" : `${totalItems} ${totalItems === 1 ? "peça" : "peças"}`}
              </SheetTitle>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="h-9 w-9 flex items-center justify-center rounded-full text-[hsl(43,30%,60%)] hover:text-[hsl(43,65%,60%)] transition-colors"
              aria-label="Fechar"
            >
              <X className="h-4 w-4" strokeWidth={1.25} />
            </button>
          </div>
        </SheetHeader>

        {/* Body */}
        <div className="flex flex-col flex-1 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center px-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-[hsl(43,30%,20%)] flex items-center justify-center">
                  <ShoppingBag className="h-5 w-5 text-[hsl(43,30%,50%)]" strokeWidth={1} />
                </div>
                <p className="text-sm text-[hsl(43,25%,55%)] font-light tracking-wide">Sua sacola está vazia.</p>
                <p className="text-xs text-[hsl(43,20%,40%)] mt-2 tracking-wider">Selecione uma peça para começar.</p>
              </div>
            </div>
          ) : (
            <>
              <ShippingAnnouncementBar />
              <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8">
                {items.map((item) => (
                  <div key={item.variantId} className="group">
                    <div className="flex gap-5">
                      {/* Imagem grande */}
                      <div className="w-28 h-36 bg-[hsl(0,0%,8%)] overflow-hidden flex-shrink-0 border border-[hsl(43,30%,12%)] flex items-center justify-center">
                        {item.product.node.images?.edges?.[0]?.node?.url ? (
                          <img
                            src={item.product.node.images.edges[0].node.url}
                            alt={item.product.node.images.edges[0].node.altText || item.product.node.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <span className="font-display text-[hsl(43,65%,55%)] text-xl tracking-[0.3em] font-light">
                            3R
                          </span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                        <div>
                          <h4 className="font-display text-base font-light tracking-wide text-[hsl(43,40%,90%)] leading-tight">
                            {item.product.node.title}
                          </h4>
                          {item.selectedOptions.length > 0 && item.variantTitle !== "Default Title" && (
                            <p className="text-[10px] uppercase tracking-[0.25em] text-[hsl(43,25%,55%)] mt-2">
                              {item.selectedOptions.map((o) => o.value).join(" · ")}
                            </p>
                          )}
                          <p className="text-sm font-light text-[hsl(43,65%,60%)] mt-3 tracking-wide">
                            {item.price.currencyCode} {parseFloat(item.price.amount).toFixed(2)}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                              className="h-7 w-7 flex items-center justify-center border border-[hsl(43,30%,18%)] text-[hsl(43,40%,75%)] hover:border-[hsl(43,65%,55%)] hover:text-[hsl(43,65%,60%)] transition-colors"
                            >
                              <Minus className="h-3 w-3" strokeWidth={1.25} />
                            </button>
                            <span className="text-sm font-light tabular-nums w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                              className="h-7 w-7 flex items-center justify-center border border-[hsl(43,30%,18%)] text-[hsl(43,40%,75%)] hover:border-[hsl(43,65%,55%)] hover:text-[hsl(43,65%,60%)] transition-colors"
                            >
                              <Plus className="h-3 w-3" strokeWidth={1.25} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.variantId)}
                            className="text-[10px] uppercase tracking-[0.25em] text-[hsl(43,20%,45%)] hover:text-[hsl(43,65%,60%)] transition-colors"
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex-shrink-0 px-8 py-6 border-t border-[hsl(43,30%,15%)] bg-[hsl(0,0%,4%)] space-y-5">
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] uppercase tracking-[0.35em] text-[hsl(43,25%,55%)]">Subtotal</span>
                  <span className="font-display text-2xl font-light text-[hsl(43,40%,92%)] tracking-wide">
                    {currency} {totalPrice.toFixed(2)}
                  </span>
                </div>
                <p className="text-[10px] tracking-wider text-[hsl(43,20%,45%)] uppercase">
                  Frete e impostos calculados na próxima etapa
                </p>

                {/* Mensagem artesanal premium */}
                <div className="pt-4 space-y-2 border-t border-[hsl(43,30%,12%)]">
                  <p className="text-[10px] uppercase tracking-[0.4em] text-[hsl(43,65%,55%)]">
                    Feito à mão · Sob medida
                  </p>
                  <p
                    className="font-light italic leading-relaxed text-[hsl(43,30%,70%)]"
                    style={{
                      fontFamily:
                        '"Fraunces","Cormorant Garamond",Georgia,serif',
                      fontSize: "13px",
                      letterSpacing: "0.01em",
                    }}
                  >
                    Cada peça é finalizada manualmente após o seu pedido.
                    Nosso prazo de 7 a 12 dias úteis garante o padrão de
                    qualidade e acabamento que define a experiência da marca.
                  </p>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={isLoading || isSyncing}
                  className="group relative w-full h-14 bg-transparent border border-[hsl(43,65%,55%)] text-[hsl(43,65%,60%)] text-[11px] uppercase tracking-[0.4em] font-light overflow-hidden transition-all duration-500 hover:text-black disabled:opacity-50"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[hsl(43,65%,55%)] to-[hsl(43,75%,65%)] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                  <span className="relative flex items-center justify-center gap-3">
                    {isLoading || isSyncing ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        Finalizar compra
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.25} />
                      </>
                    )}
                  </span>
                </button>
                <button
                  onClick={handleContinuarComprando}
                  className="w-full h-12 bg-transparent border border-[hsl(43,30%,18%)] text-[hsl(43,30%,70%)] text-[10px] uppercase tracking-[0.4em] font-light transition-colors duration-500 hover:border-[hsl(43,65%,55%)] hover:text-[hsl(43,65%,60%)]"
                >
                  Continuar comprando
                </button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
