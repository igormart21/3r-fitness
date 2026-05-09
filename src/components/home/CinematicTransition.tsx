import { Link } from "react-router-dom";
import bg from "@/assets/atelie-cta-bg.png";

export const CinematicTransition = () => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: "78vh", backgroundColor: "#050505" }}
      aria-label="Explorar coleções"
    >
      <img
        src={bg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center 15%", transform: "scale(1.05)" }}
      />
      {/* Fade topo + base + vinheta atmosférica — mais luz e profundidade */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, #050505 0%, rgba(8,8,8,0.40) 18%, rgba(0,0,0,0.08) 45%, rgba(8,8,8,0.40) 82%, #050505 100%), radial-gradient(ellipse 75% 65% at 55% 45%, rgba(244,215,122,0.13) 0%, transparent 70%), radial-gradient(ellipse 40% 30% at 20% 80%, rgba(244,215,122,0.06) 0%, transparent 70%)",
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
          Entrar no Ateliê
        </Link>
      </div>
    </section>
  );
};

export default CinematicTransition;
