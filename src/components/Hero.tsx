import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative bg-background">
      <style>{`
        @keyframes hero-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes hero-shine {
          0% { transform: translateX(-150%) skewX(-20deg); }
          60%, 100% { transform: translateX(250%) skewX(-20deg); }
        }
      `}</style>

      {/* Dois blocos empilhados na vertical: 1 em cima, 2 embaixo */}
      <div className="relative w-full flex flex-col items-stretch">
        {/* Bloco 1 - topo */}
        <div className="relative w-full flex items-center justify-center bg-background min-h-[45vh] md:min-h-[55vh] p-8">
          <p className="font-display text-xs tracking-[0.4em] uppercase text-muted-foreground/40">
            Bloco 1
          </p>
        </div>

        {/* Divisor dourado horizontal */}
        <div className="relative w-full flex items-center justify-center py-6 md:py-10 bg-background">
          <div className="container flex items-center justify-center gap-4">
            <div
              className="h-px flex-1 max-w-md"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(184,134,11,0.3) 30%, rgba(244,215,122,0.9) 50%, rgba(184,134,11,0.3) 70%, transparent 100%)",
              }}
            />
            <span
              className="block h-2 w-2 rotate-45"
              style={{
                background:
                  "linear-gradient(135deg, #d4af37 0%, #f4d77a 50%, #b8860b 100%)",
                boxShadow: "0 0 12px rgba(212,175,55,0.6)",
              }}
            />
            <div
              className="h-px flex-1 max-w-md"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(184,134,11,0.3) 30%, rgba(244,215,122,0.9) 50%, rgba(184,134,11,0.3) 70%, transparent 100%)",
              }}
            />
          </div>
        </div>

        {/* Bloco 2 - embaixo */}
        <div className="relative w-full flex items-center justify-center bg-background min-h-[45vh] md:min-h-[55vh] p-8">
          <p className="font-display text-xs tracking-[0.4em] uppercase text-muted-foreground/40">
            Bloco 2
          </p>
        </div>
      </div>

      {/* CTA centralizado abaixo dos blocos */}
      <div className="w-full flex items-center justify-center py-10 md:py-14 bg-background">
        <Link
          to="/criar-minha-joia"
          aria-label="Criar minha joia"
          translate="no"
          className="group notranslate relative inline-flex items-center gap-1.5 sm:gap-2 md:gap-3 px-3 sm:px-6 md:px-12 py-2 sm:py-3 md:py-5 overflow-hidden border border-black transition-all duration-500 hover:-translate-y-0.5 max-w-[88%] whitespace-nowrap"
          style={{
            background:
              "linear-gradient(110deg, rgba(184,134,11,0.55) 0%, rgba(212,175,55,0.55) 25%, rgba(244,215,122,0.55) 50%, rgba(212,175,55,0.55) 75%, rgba(184,134,11,0.55) 100%)",
            backgroundSize: "300% 100%",
            animation: "hero-shimmer 4s linear infinite",
          }}
        >
          <span
            className="pointer-events-none absolute top-0 left-0 h-full w-1/3"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.85) 50%, transparent 100%)",
              animation: "hero-shine 3.5s ease-in-out infinite",
              mixBlendMode: "screen",
            }}
          />
          <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-black relative z-10 shrink-0" strokeWidth={1.5} />
          <span
            translate="no"
            lang="pt-BR"
            className="notranslate relative z-10 font-display text-[9px] sm:text-xs md:text-sm tracking-[0.25em] sm:tracking-[0.35em] md:tracking-[0.4em] uppercase text-black"
          >
            Criar minha joia
          </span>
          <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
        </Link>
      </div>
    </section>
  );
};
