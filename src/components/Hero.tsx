import heroImg from "@/assets/hero-atletas.png";

export const Hero = () => {
  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("modalidades");
    if (!target) return;

    const startY = window.scrollY;
    const endY = target.getBoundingClientRect().top + startY;
    const distance = endY - startY;
    const duration = 1200;
    let startTime: number | null = null;

    const easeInOut = (t: number) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, startY + distance * easeInOut(progress));
      if (elapsed < duration) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100vh", backgroundColor: "#000" }}
      aria-label="Hero"
    >
      <img
        src={heroImg}
        alt="Atletas 3R Fitness"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          objectPosition: "center 30%",
          transform: "scale(1.04)",
          filter: "contrast(1.04) saturate(1.02)",
        }}
      />

      {/* Soft dark gradient on the left for text readability */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.55) 25%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0) 75%)",
        }}
      />

      {/* Subtle vignette */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      {/* Subtle glow accent on pendants area (center) */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 52% 58%, rgba(212,175,55,0.10) 0%, rgba(212,175,55,0) 22%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Bottom fade */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{
          height: "28%",
          background:
            "linear-gradient(180deg, rgba(5,5,5,0) 0%, rgba(5,5,5,0.85) 70%, rgba(5,5,5,1) 100%)",
        }}
      />

      {/* Editorial block */}
      <div className="hero-editorial">
        <div className="eyebrow">Joias que representam</div>
        <h1 className="headline">
          Quem você
          <br />
          se tornou
        </h1>
        <a
          href="#modalidades"
          className="luxury-cta"
          aria-label="Iniciar Criação"
          onClick={handleCtaClick}
        >
          Iniciar Criação
        </a>
      </div>
    </section>
  );
};

export default Hero;
