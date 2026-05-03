
import heroImg from "@/assets/hero-atletas.png";

export const Hero = () => {
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
          filter: "contrast(1.06) saturate(1.05)",
        }}
      />

      {/* Overlay esquerdo + vinheta + fade base inferior */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0) 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{
          height: "30%",
          background:
            "linear-gradient(180deg, rgba(5,5,5,0) 0%, rgba(5,5,5,0.85) 70%, rgba(5,5,5,1) 100%)",
        }}
      />

      {/* Bloco editorial: texto + CTA */}
      <div className="hero-editorial">
        <div className="eyebrow">Joias que representam</div>
        <h1 className="headline">
          <span className="white">Quem você</span>
          <br />
          <span className="gold">se tornou</span>
        </h1>
        <a
          href="#modalidades"
          className="luxury-cta"
          aria-label="Criar Peça Exclusiva"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("modalidades")
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        >
          Criar Peça Exclusiva
        </a>
      </div>
    </section>
  );
};

export default Hero;
