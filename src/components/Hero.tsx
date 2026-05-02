import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import heroBloco1 from "@/assets/hero-bloco1.png";

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
        /* Texto shimmer dourado contínuo */
        @keyframes essencia-shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        /* Glow pulsante */
        @keyframes essencia-glow {
          0%, 100% {
            text-shadow: 0 0 20px rgba(212,175,55,0.25), 0 0 40px rgba(212,175,55,0.10);
            filter: brightness(1);
          }
          50% {
            text-shadow: 0 0 35px rgba(244,215,122,0.55), 0 0 70px rgba(212,175,55,0.30);
            filter: brightness(1.15);
          }
        }
        /* Reflexo: entra pela borda esquerda, atravessa as letras, sai pela direita */
        @keyframes essencia-sheen {
          0% { left: -40%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        /* Letra revelando: sobe + fade + brilho */
        @keyframes essencia-letter {
          0% {
            opacity: 0;
            transform: translateY(18px);
            filter: blur(6px) brightness(2);
          }
          60% {
            filter: blur(0) brightness(1.4);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0) brightness(1);
          }
        }
      `}</style>

      {/* Dois blocos empilhados na vertical: 1 em cima, 2 embaixo */}
      <div className="relative w-full flex flex-col items-stretch">
        {/* Bloco 1 - topo */}
        <div className="relative w-full overflow-hidden flex items-center justify-center" style={{ maxHeight: "calc(100vh - 220px)", backgroundColor: "#000" }}>
          <img
            src={heroBloco1}
            alt="3R Fitness - Joias que representam quem você se tornou"
            className="w-full h-auto max-w-full object-contain block"
            style={{ maxHeight: "calc(100vh - 220px)" }}
          />
        </div>

        {/* Divisor dourado horizontal */}
        <div
          className="relative w-full flex flex-col items-center justify-center py-3 md:py-5 overflow-hidden"
          style={{
            backgroundImage: [
              "radial-gradient(ellipse 70% 100% at 50% 50%, rgba(212,175,55,0.10) 0%, transparent 70%)",
              "linear-gradient(180deg, #050505 0%, #0a0a0a 50%, #050505 100%)",
            ].join(", "),
          }}
        >
          {/* Reflexo de luz: percorre o divisor inteiro, da borda esquerda da página até a direita, passando por cima das letras */}
          <span
            aria-hidden
            className="pointer-events-none absolute top-0 bottom-0 z-20"
            style={{
              width: "22%",
              background:
                "linear-gradient(100deg, transparent 0%, rgba(255,247,214,0.25) 30%, rgba(255,255,240,0.85) 50%, rgba(255,247,214,0.25) 70%, transparent 100%)",
              transform: "skewX(-20deg)",
              animation: "essencia-sheen 5s ease-in-out infinite",
              mixBlendMode: "screen",
            }}
          />
          {/* Linha dourada superior */}
          <div className="container flex items-center justify-center gap-4 mb-3 md:mb-4">
            <div
              className="h-px flex-1 max-w-xs"
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
              className="h-px flex-1 max-w-xs"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(184,134,11,0.3) 30%, rgba(244,215,122,0.9) 50%, rgba(184,134,11,0.3) 70%, transparent 100%)",
              }}
            />
          </div>

          {/* Frase tópico - "Sua Essência" */}
          <h2
            className="relative text-center font-serif italic font-light text-2xl sm:text-3xl md:text-4xl tracking-[0.15em] md:tracking-[0.2em] uppercase"
            style={{
              fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
              background:
                "linear-gradient(180deg, #f4d77a 0%, #d4af37 45%, #b8860b 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 0 25px rgba(212,175,55,0.25)",
            }}
          >
            Sua Essência
          </h2>

          {/* Linha dourada inferior */}
          <div className="container flex items-center justify-center gap-4 mt-3 md:mt-4">
            <div
              className="h-px flex-1 max-w-xs"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(184,134,11,0.3) 30%, rgba(244,215,122,0.9) 50%, rgba(184,134,11,0.3) 70%, transparent 100%)",
              }}
            />
            <span
              className="block h-1.5 w-1.5 rotate-45"
              style={{
                background:
                  "linear-gradient(135deg, #d4af37 0%, #f4d77a 50%, #b8860b 100%)",
                boxShadow: "0 0 10px rgba(212,175,55,0.5)",
              }}
            />
            <div
              className="h-px flex-1 max-w-xs"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(184,134,11,0.3) 30%, rgba(244,215,122,0.9) 50%, rgba(184,134,11,0.3) 70%, transparent 100%)",
              }}
            />
          </div>
        </div>

        {/* Bloco 2 - embaixo - fundo preto fosco com luzes douradas */}
        <div
          className="relative w-full flex items-center justify-center min-h-[45vh] md:min-h-[55vh] py-10 md:py-16 px-4 md:px-8 overflow-hidden"
          style={{
            backgroundColor: "#0a0a0a",
            backgroundImage: [
              "radial-gradient(ellipse 60% 45% at 18% 25%, rgba(212,175,55,0.22) 0%, rgba(212,175,55,0.08) 35%, transparent 70%)",
              "radial-gradient(ellipse 55% 40% at 82% 75%, rgba(244,215,122,0.18) 0%, rgba(184,134,11,0.06) 40%, transparent 75%)",
              "radial-gradient(ellipse 40% 30% at 50% 50%, rgba(212,175,55,0.10) 0%, transparent 70%)",
              "linear-gradient(180deg, #0a0a0a 0%, #050505 100%)",
            ].join(", "),
          }}
        >
          {/* Brilho sutil de partículas/luzes */}
          <div
            className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 60%, rgba(244,215,122,0.15) 0%, transparent 8%), radial-gradient(circle at 70% 30%, rgba(212,175,55,0.12) 0%, transparent 6%), radial-gradient(circle at 85% 80%, rgba(244,215,122,0.10) 0%, transparent 5%)",
            }}
          />

          {/* Grid de 6 cards com contorno dourado */}
          <div className="relative w-full max-w-6xl mx-auto grid grid-cols-6 gap-1.5 sm:gap-2 md:gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Link
                key={i}
                to={`/modalidade/${i + 1}`}
                aria-label={`Escolher Modalidade ${i + 1}`}
                className="group relative aspect-[3/4] overflow-hidden bg-black/60 transition-all duration-500 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
                style={{
                  border: "1px solid rgba(212,175,55,0.55)",
                  boxShadow:
                    "0 0 0 1px rgba(212,175,55,0.15) inset, 0 8px 24px rgba(0,0,0,0.45), 0 0 18px rgba(212,175,55,0.12)",
                }}
              >
                {/* Brilho dourado interno sutil */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,175,55,0.18) 0%, transparent 60%)",
                  }}
                />
                {/* Placeholder para imagem futura */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-1 text-center">
                  <span className="font-display text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-[#d4af37]/50">
                    Imagem
                  </span>
                  <span className="font-display text-[9px] sm:text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#f4d77a]/80">
                    Modalidade {i + 1}
                  </span>
                </div>
              </Link>
            ))}
          </div>
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
