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
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          objectPosition: "center 18%",
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1) translateY(0)" : "scale(1.08) translateY(40px)",
          transition:
            "opacity 800ms ease-out 200ms, transform 800ms cubic-bezier(0.22,1,0.36,1) 200ms",
          filter: "contrast(1.05) saturate(1.03)",
          willChange: "opacity, transform",
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
        <div className="max-w-2xl">
          <span
            className="block text-[10px] mb-6"
            style={{
              color: "#d4af37",
              letterSpacing: visible ? "0.5em" : "0.9em",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(10px)",
              transition:
                "opacity 500ms ease-out 500ms, transform 500ms ease-out 500ms, letter-spacing 600ms ease-out 500ms",
            }}
          >
            {String(index + 1).padStart(2, "0")} — MODALIDADE
          </span>
          <div
            className="h-px mb-8"
            style={{
              width: visible ? 64 : 0,
              background: "linear-gradient(90deg, #d4af37, transparent)",
              transition: "width 700ms ease-out 600ms",
            }}
          />
          <h2
            className="font-display font-light text-white"
            style={{
              fontFamily: '"Fraunces", "Cormorant Garamond", serif',
              fontSize: "clamp(44px, 6.5vw, 96px)",
              lineHeight: 0.95,
              letterSpacing: visible ? "0.02em" : "0.18em",
              textShadow: "0 4px 24px rgba(0,0,0,0.6)",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition:
                "opacity 700ms ease-out 500ms, transform 700ms ease-out 500ms, letter-spacing 900ms ease-out 500ms",
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
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(15px)",
              transition: "opacity 600ms ease-out 700ms, transform 600ms ease-out 700ms",
            }}
          >
            {m.subtitulo}
          </p>

          <Link
            to={`/atelie/modalidade/${m.slug}`}
            className="inline-flex items-center gap-4 mt-12 group/btn"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 400ms ease-out 1000ms, transform 400ms ease-out 1000ms",
            }}
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
              style={{ width: 24, background: "#d4af37" }}
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

  const [progress, setProgress] = useState(0); // 0 → 1 across first viewport

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.scrollTo(0, 0);
    const onScroll = () => {
      const p = Math.min(1, Math.max(0, window.scrollY / Math.max(1, window.innerHeight)));
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // CTA principal: scroll lento e suave (como rolar o mouse aos poucos) até o meio das modalidades
  const goToEnduranceCollection = () => {
    const el = document.getElementById("modalidades");
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const start = window.scrollY;
    const end = Math.max(
      0,
      start + rect.top + rect.height / 2 - window.innerHeight / 2
    );
    const distance = end - start;
    if (Math.abs(distance) < 4) return;
    // Duração proporcional à distância — ~1.2s por 1000px, mín 2.8s, máx 6s
    const duration = Math.min(6000, Math.max(2800, Math.abs(distance) * 1.2));
    const ease = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    let t0: number | null = null;
    const step = (ts: number) => {
      if (t0 === null) t0 = ts;
      const p = Math.min(1, (ts - t0) / duration);
      window.scrollTo(0, start + distance * ease(p));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  // Eased progress for cinematic feel
  const ease = (t: number) => t * t * (3 - 2 * t);
  const ep = ease(progress);
  const logoOpacity = 0.92 * (1 - Math.min(1, ep / 0.5));
  const logoScale = 1 + 0.05 * Math.min(1, ep / 0.5);
  const glowScale = 1 + 0.6 * ep;
  const glowOpacity = 0.22 + 0.35 * Math.sin(Math.min(1, ep / 0.6) * Math.PI);
  const overlayOpacity = 0.2 * Math.min(1, ep / 0.4);
  const blurPx = 6 * Math.min(1, ep / 0.5);

  return (
    <>
      <style>{`
        @keyframes logo-enter {
          0% { opacity: 0; transform: scale(0.98); }
          100% { opacity: 0.92; transform: scale(1); }
        }
        @keyframes ambient-breath {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.06); }
        }
        @keyframes scroll-line {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          50.01% { transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
        @keyframes particle-float {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: var(--p-opacity, 0.5); }
          90% { opacity: var(--p-opacity, 0.5); }
          100% { transform: translateY(-120vh) translateX(var(--p-drift, 20px)); opacity: 0; }
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
              "radial-gradient(ellipse 38% 30% at 50% 45%, rgba(230,232,240,0.18), transparent 60%), linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.9) 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle 32% at 50% 50%, rgba(230,232,240,0.22), transparent 55%)",
            animation: "ambient-breath 7s ease-in-out infinite",
            mixBlendMode: "screen",
          }}
        />

        {/* Cinematic transition glow (scroll-driven) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle 40% at 50% 50%, rgba(244,215,122,0.55), transparent 65%)",
            opacity: glowOpacity,
            transform: `scale(${glowScale})`,
            transition: "opacity 600ms ease-out, transform 600ms ease-out",
            mixBlendMode: "screen",
            willChange: "opacity, transform",
          }}
        />

        {/* Cinematic transition overlay (scroll-driven) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "rgba(0,0,0,1)",
            opacity: overlayOpacity,
            backdropFilter: blurPx > 0.1 ? `blur(${blurPx}px)` : undefined,
            WebkitBackdropFilter: blurPx > 0.1 ? `blur(${blurPx}px)` : undefined,
            transition: "opacity 300ms ease-out, backdrop-filter 300ms ease-out",
            willChange: "opacity",
          }}
        />

        {/* Particles douradas */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 14 }).map((_, i) => {
            const left = (i * 53) % 100;
            const size = 1 + ((i * 7) % 3);
            const duration = 18 + ((i * 3) % 14);
            const delay = (i * 1.7) % 12;
            const drift = ((i % 2 === 0 ? 1 : -1) * (10 + (i * 5) % 30)) + "px";
            const opacity = 0.18 + ((i % 4) * 0.06);
            return (
              <span
                key={i}
                style={{
                  position: "absolute",
                  bottom: "-10px",
                  left: `${left}%`,
                  width: size,
                  height: size,
                  borderRadius: "9999px",
                  background: "rgba(212,175,55,0.9)",
                  boxShadow: "0 0 6px rgba(212,175,55,0.6)",
                  animation: `particle-float ${duration}s linear ${delay}s infinite`,
                  ["--p-drift" as any]: drift,
                  ["--p-opacity" as any]: opacity,
                } as React.CSSProperties}
              />
            );
          })}
        </div>
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
                "brightness(0) saturate(100%) invert(78%) sepia(38%) saturate(540%) hue-rotate(7deg) brightness(95%) contrast(88%) drop-shadow(0 4px 24px rgba(212,175,55,0.25))",
              opacity: logoOpacity,
              transform: `scale(${logoScale})`,
              transition: "opacity 400ms ease-out, transform 400ms ease-out",
              animation: "logo-enter 1.2s ease-out both",
              willChange: "opacity, transform",
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
              color: "rgba(248,248,250,0.92)",
              animation: "fade-in 1.4s ease-out 0.3s both",
            }}
          >
            Cada disciplina inspira{" "}
            <span
              style={{
                color: "#d4af37",
                fontWeight: 400,
                textShadow: "0 0 24px rgba(212,175,55,0.35)",
              }}
            >
              sua própria linha.
            </span>
          </p>

          <button
            onClick={goToEnduranceCollection}
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
              animation: "fade-in 1.2s ease-out 0.6s both",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, rgba(244,215,122,0.92) 0%, rgba(212,175,55,0.92) 100%)";
              e.currentTarget.style.color = "#0a0a0a";
              e.currentTarget.style.borderColor = "rgba(244,215,122,0.85)";
              e.currentTarget.style.boxShadow =
                "0 0 24px rgba(212,175,55,0.28), 0 0 60px rgba(212,175,55,0.18)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#d4af37";
              e.currentTarget.style.borderColor = "rgba(212,175,55,0.6)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            EXPLORAR MODALIDADES
          </button>
        </div>

        {/* Scroll cue — traço dourado animado */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          style={{ animation: "fade-in 2s ease-out 1.2s both" }}
        >
          <span
            style={{
              display: "block",
              width: 1,
              height: 48,
              background: "linear-gradient(180deg, rgba(212,175,55,0.9), rgba(212,175,55,0))",
              animation: "scroll-line 2.4s ease-in-out infinite",
            }}
          />
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
