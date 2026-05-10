import { useNavigate } from "react-router-dom";
import { Loader2, X } from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { startShopifyCheckout, type VariantId } from "@/lib/shopifyVariants";
import { useState } from "react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  variantId: VariantId;
  linhaNome: string;
  modalidadeNome?: string;
  modalidadeSlug?: string;
  material: "ouro" | "prata";
  imagem?: string;
};

export const SelecaoPanel = ({
  open,
  onOpenChange,
  variantId,
  linhaNome,
  modalidadeNome,
  modalidadeSlug,
  material,
  imagem,
}: Props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const disponivel = !!variantId;

  const handleFinalizar = async () => {
    if (!disponivel || loading) return;
    await startShopifyCheckout(variantId, {
      quantity: 1,
      onLoadingChange: setLoading,
    });
  };

  const handleContinuar = () => {
    onOpenChange(false);
    const slug = modalidadeSlug ?? "geral";
    navigate(`/continuar/${slug}`);
  };

  const materialLabel = material === "ouro" ? "Ouro 18K" : "Prata 925";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 border-0 text-white [&>button]:hidden"
        style={{
          background:
            "radial-gradient(ellipse at 70% 0%, rgba(212,175,55,0.10) 0%, transparent 55%), linear-gradient(180deg, #050505 0%, #0a0a0a 100%)",
          borderLeft: "1px solid rgba(212,175,55,0.25)",
          boxShadow: "-30px 0 80px rgba(0,0,0,0.7)",
        }}
      >
        <div className="relative flex h-full flex-col">
          <button
            onClick={() => onOpenChange(false)}
            aria-label="Fechar"
            className="absolute right-5 top-5 h-9 w-9 inline-flex items-center justify-center text-white/55 hover:text-[#d4af37] transition-colors z-10"
          >
            <X className="h-4 w-4" strokeWidth={1.25} />
          </button>

          <div className="px-8 pt-12 pb-6">
            <p
              className="text-[10px] uppercase tracking-[0.5em] mb-5"
              style={{ color: "rgba(212,175,55,0.85)" }}
            >
              Ateliê · Sua peça
            </p>
            <SheetTitle asChild>
              <h2
                className="font-display font-light leading-tight"
                style={{
                  fontSize: "clamp(26px, 3vw, 32px)",
                  letterSpacing: "0.04em",
                  color: "#f4ead0",
                }}
              >
                Sua peça foi selecionada.
              </h2>
            </SheetTitle>
            <p
              className="mt-3 italic font-light"
              style={{
                fontFamily: '"Fraunces",serif',
                color: "rgba(255,255,255,0.65)",
                fontSize: "14px",
              }}
            >
              Escolha como deseja continuar sua experiência no Ateliê.
            </p>
          </div>

          <div className="mx-8 my-2 flex items-center gap-5 p-4"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.4) 100%)",
              border: "1px solid rgba(212,175,55,0.22)",
            }}
          >
            {imagem && (
              <div
                className="h-20 w-20 shrink-0 overflow-hidden"
                style={{
                  background: "#0a0a0a",
                  border: "1px solid rgba(212,175,55,0.18)",
                }}
              >
                <img
                  src={imagem}
                  alt={linhaNome}
                  className="h-full w-full object-contain"
                />
              </div>
            )}
            <div className="min-w-0">
              <p
                className="font-display text-base tracking-[0.18em] uppercase truncate"
                style={{ color: "#f4ead0" }}
              >
                {linhaNome}
              </p>
              {modalidadeNome && (
                <p
                  className="text-[10px] uppercase tracking-[0.4em] mt-1"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  {modalidadeNome}
                </p>
              )}
              <p
                className="text-[10px] uppercase tracking-[0.4em] mt-2"
                style={{ color: "rgba(212,175,55,0.85)" }}
              >
                {materialLabel}
              </p>
            </div>
          </div>

          <p
            className="px-8 mt-3 text-[10px] uppercase tracking-[0.42em]"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Valor confirmado no checkout
          </p>

          <div className="mt-auto px-8 pb-10 pt-8 space-y-4">
            <button
              type="button"
              onClick={handleFinalizar}
              disabled={!disponivel || loading}
              className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                color: "#0a0a0a",
                background: "#d4af37",
                border: "1px solid #d4af37",
                fontFamily: "Inter, sans-serif",
                fontSize: "11px",
                letterSpacing: "0.42em",
                textTransform: "uppercase",
                boxShadow: "0 0 30px rgba(212,175,55,0.25)",
              }}
              onMouseEnter={(e) => {
                if (!disponivel || loading) return;
                e.currentTarget.style.background = "#f4d77a";
                e.currentTarget.style.borderColor = "#f4d77a";
              }}
              onMouseLeave={(e) => {
                if (!disponivel || loading) return;
                e.currentTarget.style.background = "#d4af37";
                e.currentTarget.style.borderColor = "#d4af37";
              }}
            >
              {loading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Iniciando checkout
                </>
              ) : disponivel ? (
                "Finalizar compra"
              ) : (
                "Em breve"
              )}
            </button>

            <button
              type="button"
              onClick={handleContinuar}
              className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 transition-all duration-500"
              style={{
                color: "#d4af37",
                background: "transparent",
                border: "1px solid rgba(212,175,55,0.45)",
                fontFamily: "Inter, sans-serif",
                fontSize: "11px",
                letterSpacing: "0.42em",
                textTransform: "uppercase",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(212,175,55,0.85)";
                e.currentTarget.style.color = "#f4d77a";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(212,175,55,0.45)";
                e.currentTarget.style.color = "#d4af37";
              }}
            >
              Continuar comprando
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SelecaoPanel;
