import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { MODALIDADES } from "@/data/atelie";
import heroBg from "@/assets/atelie-modalidades-hero.jpg";
import logo3R from "@/assets/logo-3r-fitness.png";

const ORDER = ["triathlon", "fisiculturismo", "musculacao", "corrida", "ciclismo", "crossfit"];

const ModalidadeSection = ({
  m,
  index,
}: {
  m: { slug: string; nome: string; img: string; subtitulo: string };
  index: number;
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden group"
      style={{ height: "92vh", minHeight: 620 }}
    >
      <img
        src={m.img}
        alt={m.nome}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform ease-out"
        style={{
          objectPosition: "center 18%",
          transform: visible ? "scale(1.03)" : "scale(1.12)",
          transitionDuration: "2200ms",
          filter: "contrast(1.05) saturate(1.03)",
        }}
      />
      {/* Base readability overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.85) 100%)",
        }}
      />
      {/* Hover gold sheen */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 45%, rgba(212,175,55,0.18) 0%, transparent 70%)",
          mixBlendMode: "screen",
        }}
      />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: "rgba(0,0,0,0.10)" }}
      />

      {/* Content */}
      <div className="relative z-10 h-full container mx-auto px-6 flex items-end pb-20 md:pb-28">
        <div
          className="max-w-2xl"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 1200ms ease-out, transform 1200ms ease-out",
          }}
        >
          <span
            className="block text-[10px] tracking-[0.5em] mb-6"
            style={{ color: "#d4af37" }}
          >
            {String(index + 1).padStart(2, "0")} — MODALIDADE
          </span>
          <div
            className="h-px mb-8"
            style={{
              width: 64,
              background:
                "linear-gradient(90deg, #d4af37, transparent)",
            }}
          />
          <h2
            className="font-display font-light text-white"
            style={{
              fontFamily: '"Fraunces", "Cormorant Garamond", serif',
              fontSize: "clamp(44px, 6.5vw, 96px)",
              lineHeight: 0.95,
              letterSpacing: "0.02em",
              textShadow: "0 4px 24px rgba(0,0,0,0.6)",
            }}
          >
            {m.nome}
          </h2>
          <p
            className="mt-6 italic font-light"
            style={{
              fontFamily: '"Fraunces", serif',
              fontSize: "clamp(18px, 1.6vw, 24px)",
              color: "rgba(244,234,208,0.92)",
              letterSpacing: "0.03em",
              maxWidth: "32ch",
            }}
          >
            {m.subtitulo}
          </p>

          <Link
            to={`/atelie/modalidade/${m.slug}`}
            className="inline-flex items-center gap-4 mt-12 group/btn"
          >
            <span
              className="inline-block transition-all duration-500 group-hover/btn:tracking-[0.5em]"
              style={{
                fontSize: 11,
                letterSpacing: "0.4em",
                color: "#f4ead0",
                borderBottom: "1px solid rgba(212,175,55,0.6)",
                paddingBottom: 6,
              }}
            >
              EXPLORAR MODALIDADE
            </span>
            <span
              className="h-px transition-all duration-500"
              style={{
                width: 24,
                background: "#d4af37",
              }}
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

const AtelieModalidades = () => {
  const modalidades = ORDER
    .map((s) => MODALIDADES.find((m) => m.slug === s))
    .filter(Boolean) as typeof MODALIDADES;

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Sempre iniciar pelo topo (hero) ao entrar na página
    window.scrollTo(0, 0);
  }, []);

  const scrollToModalidades = () => {
    document.getElementById("modalidades")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @keyframes logo-enter {
          0% { opacity: 0; transform: scale(0.98); }
          100% { opacity: 0.92; transform: scale(1); }
        }
        @keyframes ambient-breath {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.04); }
        }
      `}</style>
    <div
      className="min-h-screen w-full text-white"
      style={{ backgroundColor: "#050505" }}
    >
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <Link
            to="/atelie"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white/70 hover:text-[#d4af37] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Ateliê
          </Link>
          <span
            className="hidden md:block font-display italic text-sm tracking-[0.3em]"
            style={{ color: "#d4af37" }}
          >
            MODALIDADES
          </span>
          <span className="w-16" />
        </div>
      </header>

      {/* HERO */}
      <section
        className="relative w-full flex items-center justify-center overflow-hidden"
        style={{ height: "100vh", minHeight: 640 }}
      >
        {/* Background image full screen */}
        <img
          src={heroBg}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 35%, rgba(212,175,55,0.10), transparent 70%), linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0.85) 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(212,175,55,0.12), transparent 70%)",
            animation: "ambient-breath 7s ease-in-out infinite",
            mixBlendMode: "screen",
          }}
        />

        <div
          className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto"
        >
          <img
            src={logo3R}
            alt="3R Fitness"
            style={{
              height: "60vh",
              width: "auto",
              filter:
                "brightness(0) saturate(100%) invert(92%) sepia(4%) saturate(180%) hue-rotate(180deg) brightness(102%) contrast(88%) drop-shadow(0 4px 24px rgba(220,220,230,0.25))",
              opacity: 0.92,
              animation: "logo-enter 1.2s ease-out both",
            }}
          />

          <p
            style={{
              marginTop: "1.5rem",
              fontFamily: '"Fraunces","Cormorant Garamond",serif',
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: "clamp(16px, 1.5vw, 22px)",
              letterSpacing: "0.04em",
              color: "rgba(255,255,255,0.78)",
              animation: "fade-in 1.4s ease-out 0.4s both",
            }}
          >
            Cada disciplina inspira{" "}
            <span style={{ color: "rgba(212,175,55,0.85)" }}>
              sua própria linha.
            </span>
          </p>

          <button
            onClick={scrollToModalidades}
            className="group"
            style={{
              marginTop: "2.5rem",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px 44px",
              border: "1px solid rgba(212,175,55,0.6)",
              background: "transparent",
              color: "#d4af37",
              fontFamily: "Inter, sans-serif",
              fontSize: 11,
              letterSpacing: "0.45em",
              textTransform: "uppercase",
              transition: "all 500ms ease",
              animation: "fade-in 1.2s ease-out 1.5s both",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#d4af37";
              e.currentTarget.style.color = "#0a0a0a";
              e.currentTarget.style.boxShadow = "0 0 40px rgba(212,175,55,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#d4af37";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            EXPLORAR MODALIDADES
          </button>
        </div>

        {/* Scroll cue */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.5em] text-white/40"
          style={{ animation: "fade-in 2s ease-out both" }}
        >
          ↓ ROLAR
        </div>
      </section>

      {/* MODALIDADES — full-screen sections */}
      <main id="modalidades">
        {modalidades.map((m, i) => (
          <ModalidadeSection key={m.slug} m={m} index={i} />
        ))}
      </main>

      {/* Footer mark */}
      <footer className="py-16 text-center">
        <div
          className="mx-auto mb-6 h-px"
          style={{
            width: 80,
            background:
              "linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)",
          }}
        />
        <span
          className="font-display italic text-sm tracking-[0.3em]"
          style={{ color: "#d4af37" }}
        >
          ATELIÊ
        </span>
      </footer>
    </div>
    </>
  );
};

export default AtelieModalidades;
