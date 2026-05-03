import { Link } from "react-router-dom";
import bg from "@/assets/atelie-cta-bg.png";

export const CinematicTransition = () => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: "75vh", backgroundColor: "#000" }}
      aria-label="Explorar coleções"
    >
      <img
        src={bg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center 35%", transform: "scale(1.05)" }}
      />
      {/* Fade topo + base + vinheta — dissolve sem cortes */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, #000 0%, rgba(0,0,0,0.55) 18%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0.55) 80%, #000 100%), radial-gradient(ellipse 70% 60% at 55% 45%, rgba(244,215,122,0.10) 0%, transparent 65%)",
        }}
      />

      <div className="absolute bottom-8 left-6 sm:bottom-12 sm:left-12 z-10">
        <Link
          to="/colecao"
          aria-label="Explorar coleções"
          style={{
            display: "inline-block",
            padding: "14px 32px",
            fontFamily: "Inter, sans-serif",
            fontSize: "12px",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "#d4af37",
            border: "1px solid #d4af37",
            background: "rgba(0,0,0,0.25)",
            backdropFilter: "blur(2px)",
            textDecoration: "none",
            transition: "background-color 0.5s ease, color 0.5s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#d4af37";
            e.currentTarget.style.color = "#000";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(0,0,0,0.25)";
            e.currentTarget.style.color = "#d4af37";
          }}
        >
          Explorar coleções
        </Link>
      </div>
    </section>
  );
};

export default CinematicTransition;
