import bg from "@/assets/atelie-cta-bg.png";

export const CinematicTransition = () => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: "75vh", backgroundColor: "#000" }}
      aria-hidden="true"
    >
      <img
        src={bg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center 35%", transform: "scale(1.05)" }}
      />
      {/* Fade topo + base + vinheta — dissolve sem cortes */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, #000 0%, rgba(0,0,0,0.55) 18%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0.55) 80%, #000 100%), radial-gradient(ellipse 70% 60% at 55% 45%, rgba(244,215,122,0.10) 0%, transparent 65%)",
        }}
      />
    </section>
  );
};

export default CinematicTransition;
