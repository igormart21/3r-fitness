import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { MODALIDADES } from "@/data/atelie";

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

  const autoScrollRef = useRef<{ raf: number | null; cancelled: boolean }>({
    raf: null,
    cancelled: false,
  });

  const smoothScrollTo = (targetY: number, duration: number) => {
    const startY = window.scrollY;
    const diff = targetY - startY;
    const startTime = performance.now();
    const ease = (t: number) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; // ease-in-out

    const step = (now: number) => {
      if (autoScrollRef.current.cancelled) return;
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      window.scrollTo(0, startY + diff * ease(t));
      if (t < 1) {
        autoScrollRef.current.raf = requestAnimationFrame(step);
      }
    };
    autoScrollRef.current.raf = requestAnimationFrame(step);
  };

  const cancelAuto = () => {
    autoScrollRef.current.cancelled = true;
    if (autoScrollRef.current.raf) cancelAnimationFrame(autoScrollRef.current.raf);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Sempre iniciar pelo topo (hero) ao entrar na página
    window.scrollTo(0, 0);

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const delay = isMobile ? 3500 : 3000;

    let started = false;

    const onUserInteract = () => {
      if (!started) {
        clearTimeout(timer);
      }
      cancelAuto();
      removeListeners();
    };

    const removeListeners = () => {
      window.removeEventListener("wheel", onUserInteract, { capture: true } as any);
      window.removeEventListener("touchstart", onUserInteract, { capture: true } as any);
      window.removeEventListener("keydown", onUserInteract, { capture: true } as any);
      window.removeEventListener("mousedown", onUserInteract, { capture: true } as any);
    };

    window.addEventListener("wheel", onUserInteract, { passive: true, capture: true });
    window.addEventListener("touchstart", onUserInteract, { passive: true, capture: true });
    window.addEventListener("keydown", onUserInteract, { capture: true });
    window.addEventListener("mousedown", onUserInteract, { capture: true });

    const timer = window.setTimeout(() => {
      started = true;
      const target = document.getElementById("modalidades");
      if (!target) return;
      const targetY = target.getBoundingClientRect().top + window.scrollY;
      smoothScrollTo(targetY, 1400);
    }, delay);

    return () => {
      clearTimeout(timer);
      cancelAuto();
      removeListeners();
    };
  }, []);

  const scrollToModalidades = () => {
    cancelAuto();
    document.getElementById("modalidades")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
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
        {/* Subtle background texture */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, #0c0c0c 0%, #050505 60%, #000 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(212,175,55,0.5) 0 1px, transparent 1px 14px)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(212,175,55,0.10), transparent 70%)",
          }}
        />

        <div
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
          style={{ animation: "fade-in 1.4s ease-out both" }}
        >
          <span
            className="block text-[10px] tracking-[0.6em] mb-10"
            style={{ color: "rgba(212,175,55,0.85)" }}
          >
            ATELIÊ — MODALIDADES
          </span>
          <h1
            className="font-display font-light"
            style={{
              fontFamily: '"Fraunces", "Cormorant Garamond", serif',
              fontSize: "clamp(36px, 5.2vw, 76px)",
              lineHeight: 1.1,
              letterSpacing: "0.015em",
              color: "#f4ead0",
            }}
          >
            Cada disciplina inspira
            <br />
            <em
              className="italic"
              style={{ color: "#d4af37", fontWeight: 400 }}
            >
              sua própria linha autoral.
            </em>
          </h1>

          <div
            className="mx-auto mt-12 h-px"
            style={{
              width: 120,
              background:
                "linear-gradient(90deg, transparent, #d4af37, transparent)",
            }}
          />

          <button
            onClick={scrollToModalidades}
            className="mt-14 inline-flex items-center gap-4 group"
          >
            <span
              className="inline-block transition-all duration-500 group-hover:tracking-[0.55em]"
              style={{
                fontSize: 11,
                letterSpacing: "0.45em",
                color: "#f4ead0",
                borderBottom: "1px solid rgba(212,175,55,0.6)",
                paddingBottom: 6,
              }}
            >
              EXPLORAR MODALIDADES
            </span>
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
  );
};

export default AtelieModalidades;
