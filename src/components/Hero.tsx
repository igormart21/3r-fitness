import { useEffect, useMemo, useState } from "react";
// Link removed — hero CTA now scrolls in-page
import { useIsMobile } from "@/hooks/use-mobile";
import heroFisiculturismo from "@/assets/hero-fisiculturismo.png";
import heroMusculacao from "@/assets/hero-musculacao.png";
import heroCorrida from "@/assets/hero-corrida.png";
import heroCiclismo from "@/assets/hero-ciclismo.png";
import heroTriatlo from "@/assets/hero-triatlo.png";
import heroCrossfit from "@/assets/hero-crossfit.png";

type HeroSlide = {
  id: string;
  title: string;
  label: string;
  image: string;
  desktopPosition: string;
  mobilePosition: string;
};

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "fisiculturismo",
    title: "Força esculpida em legado",
    label: "Fisiculturismo",
    image: heroFisiculturismo,
    desktopPosition: "center 38%",
    mobilePosition: "center 42%",
  },
  {
    id: "musculacao",
    title: "Disciplina em forma de joia",
    label: "Musculação",
    image: heroMusculacao,
    desktopPosition: "center 34%",
    mobilePosition: "70% 38%",
  },
  {
    id: "corrida",
    title: "Velocidade com assinatura própria",
    label: "Corrida",
    image: heroCorrida,
    desktopPosition: "center 28%",
    mobilePosition: "46% 24%",
  },
  {
    id: "ciclismo",
    title: "Horizontes conquistados em silêncio",
    label: "Ciclismo",
    image: heroCiclismo,
    desktopPosition: "center 34%",
    mobilePosition: "67% 30%",
  },
  {
    id: "triatlo",
    title: "Travessia elevada ao extraordinário",
    label: "Triatlo",
    image: heroTriatlo,
    desktopPosition: "center 34%",
    mobilePosition: "54% 32%",
  },
  {
    id: "crossfit",
    title: "Intensidade tratada como arte",
    label: "Crossfit",
    image: heroCrossfit,
    desktopPosition: "center 40%",
    mobilePosition: "center 34%",
  },
];

const DISPLAY_MS = 5200;
const TRANSITION_MS = 1800;

export const Hero = () => {
  const [index, setIndex] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    HERO_SLIDES.forEach(({ image }) => {
      const img = new Image();
      img.src = image;
    });
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % HERO_SLIDES.length);
    }, DISPLAY_MS);

    return () => window.clearInterval(id);
  }, []);

  const activeSlide = HERO_SLIDES[index];
  const safeIndex = ((index - 1 + HERO_SLIDES.length) % HERO_SLIDES.length) + 1;

  const handleScrollToModalidades = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const target = document.getElementById("modalidades");
    if (!target) return;

    const start = window.scrollY;
    const rect = target.getBoundingClientRect();
    const end = Math.max(0, start + rect.top);
    const distance = end - start;
    if (Math.abs(distance) < 4) return;
    // Cinematic, slow, luxury easing — proportional to distance
    const duration = Math.min(2600, Math.max(1600, Math.abs(distance) * 1.4));
    // easeInOutQuart
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

  const imageLayers = useMemo(
    () =>
      HERO_SLIDES.map((slide, i) => {
        const isActive = i === index;
        return {
          ...slide,
          isActive,
          objectPosition: isMobile ? slide.mobilePosition : slide.desktopPosition,
        };
      }),
    [index, isMobile],
  );

  return (
    <section
      className="relative isolate w-full overflow-hidden h-screen-safe"
      style={{ minHeight: 620, backgroundColor: "#000" }}
      aria-label="Campanha principal 3R Fitness"
    >
      <div className="absolute inset-0">
        {imageLayers.map((slide, i) => (
          <img
            key={slide.id}
            src={slide.image}
            alt={`Campanha ${slide.label} 3R Fitness`}
            aria-hidden={!slide.isActive}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={i === 0 ? "high" : "low"}
            className={`absolute inset-0 h-full w-full object-cover hero-campaign-image ${slide.isActive ? "is-active" : ""}`}
            style={{
              objectPosition: slide.objectPosition,
              transition: `opacity ${TRANSITION_MS}ms cubic-bezier(0.22,1,0.36,1), transform ${DISPLAY_MS + TRANSITION_MS}ms cubic-bezier(0.22,1,0.36,1), filter ${TRANSITION_MS}ms ease`,
            }}
          />
        ))}
      </div>

      <div className="hero-light-sweep" aria-hidden />
      <div className="hero-particles" aria-hidden />
      <div className="hero-overlay-base" aria-hidden />
      <div className="hero-overlay-legibility" aria-hidden />
      <div className="hero-overlay-vignette" aria-hidden />
      <div className="hero-overlay-bottom" aria-hidden />

      <div className="hero-main-content">
        <div className="hero-kicker-row animate-fade-in">
          <span className="hero-kicker-line" aria-hidden />
          <p className="hero-kicker">Ateliê 3R Fitness</p>
        </div>

        <div className="hero-copy-wrap">
          <span key={`${activeSlide.id}-label`} className="hero-slide-label animate-fade-in">
            {activeSlide.label}
          </span>
          <h1 className="hero-title">
            Alta performance transformada em símbolo.
          </h1>
          <p className="hero-subtitle">
            Joias premium desenvolvidas para atletas que transformam disciplina em identidade.
          </p>
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
      </div>

      <div className="hero-status-rail" aria-hidden>
        <span className="hero-status-index">0{safeIndex}</span>
        <div className="hero-status-track">
          {HERO_SLIDES.map((slide, i) => (
            <span
              key={slide.id}
              className={`hero-status-dot ${i === index ? "is-active" : ""}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
