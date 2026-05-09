import { Link } from "react-router-dom";
import bg from "@/assets/atelie-cta-bg.png";

export const CinematicTransition = () => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: "78vh", backgroundColor: "#0a0908" }}
      aria-label="Explorar coleções"
    >
      <img
        src={bg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center 15%", transform: "scale(1.05)", filter: "contrast(1.02) saturate(1.02) brightness(1.06)" }}
      />
      {/* Fade topo + base + vinheta atmosférica — luz cinematográfica natural */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, #0a0908 0%, rgba(10,9,8,0.28) 18%, rgba(0,0,0,0.04) 45%, rgba(10,9,8,0.30) 82%, #0a0908 100%), radial-gradient(ellipse 75% 65% at 55% 45%, rgba(244,215,122,0.11) 0%, transparent 70%), radial-gradient(ellipse 40% 30% at 20% 80%, rgba(244,215,122,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="absolute bottom-2 left-6 sm:bottom-4 sm:left-12 z-10">
        <Link
          to="/atelie/modalidades"
          aria-label="Entrar no Ateliê"
          style={{
            display: "inline-block",
            padding: "14px 32px",
            fontFamily: "Inter, sans-serif",
            fontSize: "12px",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "#e6c977",
            border: "1px solid rgba(217,189,114,0.7)",
            background: "rgba(0,0,0,0.18)",
            backdropFilter: "blur(2px)",
            textDecoration: "none",
            transition: "background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#d9bd72";
            e.currentTarget.style.color = "#0a0a0a";
            e.currentTarget.style.borderColor = "#d9bd72";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(0,0,0,0.18)";
            e.currentTarget.style.color = "#e6c977";
            e.currentTarget.style.borderColor = "rgba(217,189,114,0.7)";
          }}
        >
          Entrar no Ateliê
        </Link>
      </div>
    </section>
  );
};

export default CinematicTransition;
