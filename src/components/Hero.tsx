import { useIsMobile } from "@/hooks/use-mobile";
import heroCapa from "@/assets/hero-capa-3r.png";

export const Hero = () => {
  const isMobile = useIsMobile();

  const handleScrollToModalidades = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const target = document.getElementById("modalidades");
    if (!target) return;

    const start = window.scrollY;
    const rect = target.getBoundingClientRect();
    const end = Math.max(0, start + rect.top);
    const distance = end - start;
    if (Math.abs(distance) < 4) return;
    const duration = Math.min(2600, Math.max(1600, Math.abs(distance) * 1.4));
    const ease = (t: number) =>
      t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
    let t0: number | null = null;
    const step = (ts: number) => {
      if (t0 === null) t0 = ts;
      const p = Math.min(1, (ts - t0) / duration);
      window.scrollTo(0, start + distance * ease(p));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  return (
    <section
      className="relative isolate w-full overflow-hidden h-screen-safe"
      style={{ minHeight: 620, backgroundColor: "#000" }}
      aria-label="Campanha principal 3R Fitness"
    >
      <div className="absolute inset-0">
        <img
          src={heroCapa}
          alt="Campanha 3R Fitness — joias para alta performance"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover hero-capa-image"
          style={{
            objectPosition: isMobile ? "55% center" : "center center",
            filter:
              "contrast(1.08) saturate(1.10) brightness(1.02)",
            animation: "heroCapaKenBurns 24s ease-in-out infinite alternate",
          }}
        />
      </div>

      {/* Overlays cinematográficos — atmosfera de campanha de luxo */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.18) 28%, rgba(0,0,0,0.20) 60%, rgba(0,0,0,0.78) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 55%, transparent 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 50% 48%, rgba(244,215,122,0.18) 0%, transparent 70%)",
        }}
      />
      {/* Grão sutil de campanha editorial */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
        }}
      />

      <div className="hero-main-content">
        <div className="hero-copy-wrap">
          <h1 className="hero-title">
            Joias criadas para quem vive em <span className="hero-title__accent">alta performance</span>.
          </h1>
          <p className="hero-subtitle">
            Peças premium desenvolvidas para atletas que transformam disciplina em identidade.
          </p>
        </div>
      </div>

      <div className="hero-actions">
        <button
          type="button"
          onClick={handleScrollToModalidades}
          className="hero-luxury-button"
          aria-label="Explorar Modalidades"
        >
          <span className="hero-luxury-button__shine" aria-hidden />
          <span className="hero-luxury-button__label">Explorar Modalidades</span>
        </button>
      </div>

      <style>{`
        @keyframes heroCapaKenBurns {
          0% { transform: scale(1.04) translate3d(0,0,0); }
          100% { transform: scale(1.10) translate3d(-1%, -0.6%, 0); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
