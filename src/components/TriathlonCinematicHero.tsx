import { useNavigate } from "react-router-dom";
import triathlonImg from "@/assets/triathlon-cinematic.jpg";

export const TriathlonCinematicHero = () => {
  const navigate = useNavigate();

  const scrollToLinhas = () => {
    const el = document.getElementById("modalidade-linhas");
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const startY = window.scrollY;
    const targetCenter = rect.top + startY + rect.height / 2;
    const endY = Math.max(0, targetCenter - window.innerHeight / 2);
    const distance = endY - startY;
    const duration = 1600;
    let startTime: number | null = null;
    const easeInOut = (t: number) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    const step = (ts: number) => {
      if (startTime === null) startTime = ts;
      const elapsed = ts - startTime;
      const p = Math.min(elapsed / duration, 1);
      window.scrollTo(0, startY + distance * easeInOut(p));
      if (elapsed < duration) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  return (
    <section
      className="relative w-screen overflow-hidden"
      style={{ height: "min(100vh, 920px)", minHeight: "640px", backgroundColor: "#050505" }}
      aria-label="Triathlon — Cinematic Hero"
    >
      {/* Imagem original com zoom lento + motion blur ultra sutil */}
      <img
        src={triathlonImg}
        alt="Atletas de triathlon ao pôr do sol"
        className="absolute inset-0 w-full h-full object-cover triathlon-cine-zoom"
        style={{
          objectPosition: "center 38%",
          filter: "contrast(1.06) saturate(0.92) brightness(0.96)",
        }}
      />

      {/* Overlay preto sofisticado ~40% */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: "rgba(0,0,0,0.40)" }}
      />

      {/* Gradient laterais escuro suave */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.10) 28%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.10) 72%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Glow dourado extremamente sutil sobre o sol (esquerda) */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none triathlon-cine-glow"
        style={{
          background:
            "radial-gradient(circle at 8% 48%, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0.06) 14%, rgba(212,175,55,0) 32%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Haze cinematográfico leve */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none triathlon-cine-haze"
        style={{
          background:
            "radial-gradient(ellipse at 30% 60%, rgba(255,225,180,0.06) 0%, rgba(255,225,180,0) 55%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Vinheta suave nas bordas */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      {/* Fade superior + inferior para integrar com a página */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{
          height: "20%",
          background:
            "linear-gradient(180deg, rgba(5,5,5,0.85) 0%, rgba(5,5,5,0) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{
          height: "32%",
          background:
            "linear-gradient(180deg, rgba(5,5,5,0) 0%, rgba(5,5,5,0.85) 70%, rgba(5,5,5,1) 100%)",
        }}
      />

      {/* Conteúdo editorial */}
      <div className="relative z-10 h-full container mx-auto px-6 lg:px-12 flex items-end pb-24 md:pb-32">
        <div className="max-w-3xl">
          <p
            className="triathlon-cine-eyebrow text-[10px] md:text-[11px] uppercase mb-7"
            style={{
              letterSpacing: "0.62em",
              color: "rgba(212,175,55,0.85)",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Triathlon · Edição Cinematográfica
          </p>

          <h2
            className="triathlon-cine-title font-display font-light leading-[1.05]"
            style={{
              fontSize: "clamp(34px, 4.4vw, 64px)",
              letterSpacing: "0.02em",
              color: "#f4ead0",
              textShadow: "0 2px 30px rgba(0,0,0,0.55)",
            }}
          >
            Criado para atletas que transformam
            <br className="hidden md:block" /> disciplina em legado.
          </h2>

          <p
            className="triathlon-cine-sub mt-7 italic font-light max-w-xl"
            style={{
              fontFamily: '"Fraunces", serif',
              color: "rgba(255,255,255,0.78)",
              fontSize: "clamp(15px, 1.25vw, 18px)",
              letterSpacing: "0.025em",
            }}
          >
            Joias artesanais inspiradas na alta performance.
          </p>

          <div className="triathlon-cine-ctas mt-10 flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={scrollToLinhas}
              className="inline-flex items-center gap-3 px-10 py-4 transition-all duration-700"
              style={{
                color: "#0a0a0a",
                background: "#d4af37",
                border: "1px solid #d4af37",
                fontFamily: "Inter, sans-serif",
                fontSize: "11px",
                letterSpacing: "0.42em",
                textTransform: "uppercase",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 40px rgba(212,175,55,0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Explorar Coleção
            </button>

            <button
              type="button"
              onClick={() => navigate("/atelie")}
              className="inline-flex items-center gap-3 px-10 py-4 transition-all duration-700"
              style={{
                color: "#f4ead0",
                background: "transparent",
                border: "1px solid rgba(244,234,208,0.35)",
                fontFamily: "Inter, sans-serif",
                fontSize: "11px",
                letterSpacing: "0.42em",
                textTransform: "uppercase",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(212,175,55,0.85)";
                e.currentTarget.style.color = "#d4af37";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(244,234,208,0.35)";
                e.currentTarget.style.color = "#f4ead0";
              }}
            >
              Entrar no Ateliê
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes triathlon-cine-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.06); }
        }
        .triathlon-cine-zoom {
          animation: triathlon-cine-zoom 18s ease-in-out infinite alternate;
          will-change: transform;
        }
        @keyframes triathlon-cine-glow {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }
        .triathlon-cine-glow {
          animation: triathlon-cine-glow 9s ease-in-out infinite;
        }
        @keyframes triathlon-cine-haze {
          0% { transform: translate3d(0,0,0); opacity: 0.85; }
          50% { transform: translate3d(1.2%, -0.6%, 0); opacity: 1; }
          100% { transform: translate3d(0,0,0); opacity: 0.85; }
        }
        .triathlon-cine-haze {
          animation: triathlon-cine-haze 14s ease-in-out infinite;
        }
        @keyframes triathlon-cine-fade {
          0% { opacity: 0; transform: translateY(14px); filter: blur(4px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .triathlon-cine-eyebrow { animation: triathlon-cine-fade 1.4s cubic-bezier(0.22,1,0.36,1) 0.15s both; }
        .triathlon-cine-title   { animation: triathlon-cine-fade 1.6s cubic-bezier(0.22,1,0.36,1) 0.45s both; }
        .triathlon-cine-sub     { animation: triathlon-cine-fade 1.6s cubic-bezier(0.22,1,0.36,1) 0.85s both; }
        .triathlon-cine-ctas    { animation: triathlon-cine-fade 1.6s cubic-bezier(0.22,1,0.36,1) 1.15s both; }

        @media (prefers-reduced-motion: reduce) {
          .triathlon-cine-zoom,
          .triathlon-cine-glow,
          .triathlon-cine-haze,
          .triathlon-cine-eyebrow,
          .triathlon-cine-title,
          .triathlon-cine-sub,
          .triathlon-cine-ctas { animation: none !important; }
        }
      `}</style>
    </section>
  );
};

export default TriathlonCinematicHero;
