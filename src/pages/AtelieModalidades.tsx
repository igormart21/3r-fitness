import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { MODALIDADES } from "@/data/atelie";
import { useIsMobile } from "@/hooks/use-mobile";
import heroBg from "@/assets/atelie-modalidades-hero-artisan.jpg";
import logo3R from "@/assets/logo-3r-fitness.png";

// Mobile-aware crop positioning to keep athlete + jewelry in frame
const FOCUS: Record<string, { desktop: string; mobile: string }> = {
  triathlon:     { desktop: "75% 18%", mobile: "70% 28%" },
  fisiculturismo:{ desktop: "center 22%", mobile: "center 30%" },
  musculacao:    { desktop: "center 22%", mobile: "center 32%" },
  corrida:       { desktop: "center 22%", mobile: "center 30%" },
  ciclismo:      { desktop: "center 22%", mobile: "center 32%" },
  crossfit:      { desktop: "center 22%", mobile: "center 30%" },
};

const ORDER = ["triathlon", "fisiculturismo", "musculacao", "corrida", "ciclismo", "crossfit"];

const ModalidadeSection = ({
  m,
  index,
  onNavigate,
}: {
  m: { slug: string; nome: string; img: string; subtitulo: string };
  index: number;
  onNavigate: (slug: string) => void;
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [visible, setVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.18 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Subtle parallax — desktop only, rAF-throttled
  useEffect(() => {
    if (isMobile) return;
    const el = ref.current;
    const img = imgRef.current;
    if (!el || !img) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // -1 (above) → 1 (below)
        const t = Math.max(-1, Math.min(1, (rect.top + rect.height / 2 - vh / 2) / vh));
        img.style.setProperty("--parallax", `${(-t * 24).toFixed(2)}px`);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isMobile]);

  const focus = FOCUS[m.slug] ?? { desktop: "center 22%", mobile: "center 30%" };
  const objectPosition = isMobile ? focus.mobile : focus.desktop;

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden group"
      style={{
        height: isMobile ? "92svh" : "100svh",
        minHeight: 600,
        marginTop: index === 0 ? 0 : "clamp(40px, 6vw, 96px)",
      }}
    >
      <img
        ref={imgRef}
        src={m.img}
        alt={m.nome}
        loading="lazy"
        decoding="async"
        fetchPriority={index === 0 ? "high" : "low"}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        style={{
          objectPosition,
          opacity: visible ? 1 : 0,
          transform: visible
            ? "translate3d(0, var(--parallax, 0px), 0) scale(1)"
            : "translate3d(0, 40px, 0) scale(1.08)",
          transition:
            "opacity 1100ms cubic-bezier(0.22,1,0.36,1) 150ms, transform 1600ms cubic-bezier(0.22,1,0.36,1) 150ms",
          filter: "contrast(1.04) saturate(1.02)",
          willChange: "opacity, transform",
        }}
      />
      {/* Unified cinematic overlay (per spec) */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.12), rgba(0,0,0,0.38))",
        }}
      />
      {/* Bottom legibility gradient (kept subtle for headline) */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 35%, rgba(0,0,0,0.55) 80%, rgba(0,0,0,0.92) 100%)",
        }}
      />
      {/* Cinematic vignette */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-90"
        style={{
          background:
            "radial-gradient(ellipse 110% 80% at 50% 45%, transparent 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      {/* Hover gold sheen */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-[1400ms] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 45%, rgba(212,175,55,0.16) 0%, transparent 70%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full container mx-auto px-6 sm:px-10 flex items-end pb-20 md:pb-32">
        <div className="max-w-2xl">
          <span
            className="block text-[10px] mb-6"
            style={{
              color: "#d4af37",
              letterSpacing: visible ? "0.5em" : "0.9em",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(10px)",
              transition:
                "opacity 600ms ease-out 500ms, transform 600ms ease-out 500ms, letter-spacing 700ms ease-out 500ms",
            }}
          >
            {String(index + 1).padStart(2, "0")} — MODALIDADE
          </span>
          <div
            className="h-px mb-8"
            style={{
              width: visible ? 64 : 0,
              background: "linear-gradient(90deg, #d4af37, transparent)",
              transition: "width 800ms ease-out 600ms",
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
                "opacity 800ms ease-out 500ms, transform 900ms ease-out 500ms, letter-spacing 1000ms ease-out 500ms",
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
              transition: "opacity 700ms ease-out 750ms, transform 700ms ease-out 750ms",
            }}
          >
            {m.subtitulo}
          </p>

          <button
            type="button"
            onClick={() => onNavigate(m.slug)}
            className="inline-flex items-center gap-4 mt-12 group/btn bg-transparent border-0 cursor-pointer p-0"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 500ms ease-out 1000ms, transform 500ms ease-out 1000ms",
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
              className="h-px transition-all duration-500 group-hover/btn:w-12"
              style={{ width: 24, background: "#d4af37" }}
            />
          </button>
        </div>
      </div>
    </section>
  );
};

const AtelieModalidades = () => {
  const navigate = useNavigate();
  const modalidades = ORDER
    .map((s) => MODALIDADES.find((m) => m.slug === s))
    .filter(Boolean) as typeof MODALIDADES;

  const [progress, setProgress] = useState(0); // 0 → 1 across first viewport
  const [isFading, setIsFading] = useState(false);

  const navigateWithFade = (slug: string) => {
    setIsFading(true);
    window.setTimeout(() => {
      navigate(`/atelie/modalidade/${slug}`);
    }, 650);
  };

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
    // Duração proporcional à distância — bem mais lento e cinematográfico
    const duration = Math.min(14000, Math.max(7000, Math.abs(distance) * 3));
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
        @keyframes ken-burns-a {
          0%   { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.12) translate(-1.5%, -1%); }
        }
        @keyframes ken-burns-b {
          0%   { transform: scale(1.05) translate(0.5%, 0.5%); }
          100% { transform: scale(1.15) translate(-1%, -1.5%); }
        }
        @keyframes ken-burns-tri {
          0%   { transform: scale(1) translate(0, 0); }
          50%  { transform: scale(1.08) translate(-1%, -0.8%); }
          100% { transform: scale(1.14) translate(-2%, -0.4%); }
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
        className="relative w-full flex items-center justify-center overflow-hidden h-screen-safe"
        style={{ minHeight: 580 }}
      >
        {/* Background image full screen */}
        <img
          src={heroBg}
          alt=""
          aria-hidden
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Cinematic overlay — top clean, center visible, base dark, sides discreetly darkened */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.10) 28%, rgba(0,0,0,0.06) 48%, rgba(0,0,0,0.55) 82%, rgba(0,0,0,0.95) 100%)",
          }}
        />
        {/* Side vignette — discreet lateral darkening, keeps depth on hands & pendant */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 90% at 50% 55%, transparent 55%, rgba(0,0,0,0.55) 100%)",
          }}
        />
        {/* Warm haze — almost imperceptible breathing glow on pendant */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 22% 18% at 50% 58%, rgba(244,215,122,0.10), transparent 70%)",
            animation: "ambient-breath 9s ease-in-out infinite",
            mixBlendMode: "screen",
          }}
        />
        {/* DOF breathing — extremely subtle */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 50% 55%, transparent 0%, rgba(0,0,0,0.18) 100%)",
            animation: "ambient-breath 11s ease-in-out infinite",
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
        <img
          src={logo3R}
          alt="3R Fitness"
          decoding="async"
          fetchPriority="high"
          style={{
            position: "absolute",
            top: "clamp(20px, 3vw, 36px)",
            right: "clamp(20px, 3vw, 40px)",
            height: "clamp(56px, 7vw, 96px)",
            width: "auto",
            zIndex: 20,
            filter:
              "brightness(0) saturate(100%) invert(78%) sepia(38%) saturate(540%) hue-rotate(7deg) brightness(95%) contrast(88%) drop-shadow(0 4px 18px rgba(212,175,55,0.28))",
            opacity: 0.95,
            animation: "logo-enter 1.2s ease-out both",
          }}
        />
        <style>{`
          @keyframes explorar-pulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(212,175,55,0.55), 0 0 22px rgba(212,175,55,0.18); }
            50% { box-shadow: 0 0 0 10px rgba(212,175,55,0), 0 0 36px rgba(212,175,55,0.30); }
          }
        `}</style>
        <div
          style={{
            position: "absolute",
            bottom: "clamp(28px, 4vw, 56px)",
            left: "clamp(20px, 3vw, 48px)",
            zIndex: 20,
          }}
        >
          <button
            onClick={goToEnduranceCollection}
            className="group"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px 44px",
              border: "1px solid rgba(212,175,55,0.7)",
              background: "#0a0a0a",
              color: "#d4af37",
              fontFamily: "Inter, sans-serif",
              fontSize: 11,
              letterSpacing: "0.45em",
              textTransform: "uppercase",
              transition: "all 500ms ease",
              animation: "fade-in 1.2s ease-out 0.6s both, explorar-pulse 2.6s ease-in-out infinite",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#000";
              e.currentTarget.style.color = "#f4d77a";
              e.currentTarget.style.borderColor = "rgba(244,215,122,0.95)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#0a0a0a";
              e.currentTarget.style.color = "#d4af37";
              e.currentTarget.style.borderColor = "rgba(212,175,55,0.7)";
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
          <ModalidadeSection key={m.slug} m={m} index={i} onNavigate={navigateWithFade} />
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

      {/* Cinematic fade-out overlay on navigation */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          background: "#050505",
          opacity: isFading ? 1 : 0,
          pointerEvents: isFading ? "auto" : "none",
          transition: "opacity 650ms ease-in-out",
          zIndex: 9999,
        }}
      />
    </div>
    </>
  );
};

export default AtelieModalidades;
