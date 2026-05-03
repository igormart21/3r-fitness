import { GoldCTA } from "@/components/home/GoldCTA";

export const Hero = () => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100vh", backgroundColor: "#000" }}
      aria-label="Hero"
    >
      {/* Imagem será adicionada aqui */}

      {/* Vinheta sutil */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, rgba(5,5,5,1) 100%)",
        }}
      />

      {/* Conteúdo - apenas CTA */}
      <div className="relative z-10 container mx-auto max-w-4xl px-6 min-h-screen flex flex-col items-center justify-end pb-24">
        <GoldCTA size="lg" />
      </div>
    </section>
  );
};

export default Hero;
