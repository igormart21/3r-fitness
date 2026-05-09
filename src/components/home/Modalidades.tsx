import { Link } from "react-router-dom";
import sportFisiculturismo from "@/assets/sport-fisiculturismo.jpg";
import sportMusculacao from "@/assets/sport-musculacao.jpg";
import sportTriathlon from "@/assets/sport-triathlon.jpg";
import sportCiclismo from "@/assets/sport-ciclismo.jpg";
import sportCrossfit from "@/assets/sport-crossfit.jpg";
import sportCorrida from "@/assets/sport-corrida.jpg";

const modalidades = [
  { id: 1, nome: "Fisiculturismo", img: sportFisiculturismo, frase: "A escultura do próprio corpo", featured: true },
  { id: 2, nome: "Musculação", img: sportMusculacao, frase: "Forjado em disciplina" },
  { id: 6, nome: "Corrida", img: sportCorrida, frase: "O ritmo de uma vida" },
  { id: 4, nome: "Ciclismo", img: sportCiclismo, frase: "Horizontes conquistados" },
  { id: 5, nome: "Crossfit", img: sportCrossfit, frase: "A intensidade como arte" },
  { id: 3, nome: "Triatlo", img: sportTriathlon, frase: "A travessia dos limites" },
];

export const Modalidades = () => {
  return (
    <section
      id="modalidades"
      className="relative w-full scroll-mt-0 flex flex-col justify-center"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(244,215,122,0.055) 0%, transparent 65%), radial-gradient(ellipse 70% 50% at 50% 100%, rgba(244,215,122,0.04) 0%, transparent 65%), linear-gradient(180deg, #050505 0%, #0c0a08 35%, #0c0a08 65%, #050505 100%)",
        minHeight: "100vh",
        paddingTop: "clamp(80px, 9vw, 140px)",
        paddingBottom: "clamp(80px, 9vw, 140px)",
      }}
    >
      <div className="container mx-auto max-w-7xl px-6 text-center mb-6 sm:mb-8">
        <span
          className="text-[10px] sm:text-[11px] uppercase tracking-[0.5em] font-light"
          style={{ color: "rgba(244,215,122,0.7)" }}
        >
          Modalidades
        </span>
        <h2
          className="font-display font-light text-3xl sm:text-4xl md:text-5xl mt-6 max-w-3xl mx-auto leading-[1.15]"
          style={{
            background: "linear-gradient(180deg, #f4f4f4 0%, #d9d9d9 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Sua essência se revela na{" "}
          <em className="italic" style={{ color: "#d4af37", WebkitTextFillColor: "#d4af37" }}>
            forma como você treina
          </em>
        </h2>
      </div>

      <div className="container mx-auto max-w-7xl px-6 grid grid-cols-2 md:grid-cols-3 auto-rows-[clamp(160px,22vh,240px)] md:auto-rows-[clamp(180px,26vh,260px)] gap-4 sm:gap-5 md:gap-6">
        {modalidades.map(({ id, nome, img, frase, featured }) => (
          <Link
            key={id}
            to={`/modalidade/${id}`}
            className={`group relative overflow-hidden block transition-all duration-700 hover:-translate-y-1.5 hover:scale-[1.015] ${
              featured ? "col-span-2 row-span-2 md:col-span-2 md:row-span-2" : ""
            }`}
            style={{
              border: "1px solid rgba(212,175,55,0.18)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 30px 70px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.55), 0 0 40px rgba(212,175,55,0.25)";
              e.currentTarget.style.borderColor = "rgba(212,175,55,0.55)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,0,0,0.5)";
              e.currentTarget.style.borderColor = "rgba(212,175,55,0.18)";
            }}
          >
            <img
              src={img}
              alt={nome}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
              style={{
                objectPosition: "center 30%",
                filter: "contrast(1.03) saturate(1.01)",
                willChange: "transform",
              }}
            />
            {/* Overlay editorial premium */}
            <div
              className="absolute inset-0 transition-opacity duration-700"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.30) 55%, rgba(0,0,0,0.88) 100%)",
              }}
            />
            {/* Vinheta cinematográfica sutil */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none opacity-90"
              style={{
                background:
                  "radial-gradient(ellipse 100% 80% at 50% 40%, transparent 55%, rgba(0,0,0,0.45) 100%)",
              }}
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(244,215,122,0.20) 0%, transparent 65%)",
                mixBlendMode: "screen",
              }}
            />
            <div className={`absolute inset-x-0 bottom-0 z-10 ${featured ? "p-8 sm:p-10" : "p-5 sm:p-7"}`}>
              <h3
                className={`font-display text-white font-light tracking-wide ${
                  featured
                    ? "text-2xl sm:text-3xl md:text-4xl"
                    : "text-lg sm:text-xl md:text-2xl"
                }`}
                style={{ textShadow: "0 2px 12px rgba(0,0,0,0.65)", letterSpacing: featured ? "0.04em" : "0.02em" }}
              >
                {nome}
              </h3>
              <p
                className={`mt-3 italic font-light ${featured ? "text-sm sm:text-base" : "text-xs sm:text-sm"}`}
                style={{ color: "rgba(244,215,122,0.82)", letterSpacing: "0.04em" }}
              >
                {frase}
              </p>
              <div
                className="mt-5 h-px w-0 group-hover:w-20 transition-all duration-700"
                style={{ background: "linear-gradient(90deg, #d4af37, transparent)" }}
              />
            </div>
          </Link>
        ))}
      </div>

      {/* Cinematic transition cue → Ateliê */}
      <style>{`
        @keyframes atelie-pulse-line {
          0%, 100% { transform: scaleY(0.4); opacity: 0.35; }
          50% { transform: scaleY(1); opacity: 1; }
        }
        @keyframes atelie-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        @keyframes atelie-shimmer-text {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
      <div className="relative z-10 mt-10 sm:mt-12 flex flex-col items-center gap-4">
        <span
          className="text-[9px] sm:text-[10px] uppercase font-light"
          style={{
            letterSpacing: "0.7em",
            paddingLeft: "0.7em",
            color: "rgba(244,215,122,0.55)",
          }}
        >
          Continua
        </span>

        <p
          className="italic font-light text-center px-6"
          style={{
            fontFamily: '"Fraunces","Cormorant Garamond",serif',
            fontSize: "clamp(15px, 1.3vw, 18px)",
            letterSpacing: "0.04em",
            background:
              "linear-gradient(90deg, rgba(244,215,122,0.35) 0%, rgba(244,215,122,0.95) 50%, rgba(244,215,122,0.35) 100%)",
            backgroundSize: "200% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "atelie-shimmer-text 6s ease-in-out infinite",
          }}
        >
          Descubra o Ateliê 3R
        </p>

        <button
          type="button"
          aria-label="Descer para a seção do Ateliê"
          onClick={() => {
            const start = window.scrollY;
            const end = start + window.innerHeight * 0.95;
            const duration = 1400;
            let t0: number | null = null;
            const ease = (t: number) =>
              t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
            const step = (ts: number) => {
              if (t0 === null) t0 = ts;
              const p = Math.min((ts - t0) / duration, 1);
              window.scrollTo(0, start + (end - start) * ease(p));
              if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          }}
          className="group flex flex-col items-center gap-3 cursor-pointer"
          style={{ background: "transparent", border: "none" }}
        >
          <span
            aria-hidden
            style={{
              display: "block",
              width: "1px",
              height: "56px",
              background:
                "linear-gradient(180deg, transparent 0%, rgba(244,215,122,0.85) 50%, transparent 100%)",
              transformOrigin: "center",
              animation: "atelie-pulse-line 2.4s ease-in-out infinite",
            }}
          />
          <span
            aria-hidden
            style={{
              display: "inline-block",
              animation: "atelie-float 2.4s ease-in-out infinite",
              color: "rgba(244,215,122,0.85)",
              fontSize: "14px",
              lineHeight: 1,
              transition: "color 0.4s ease",
            }}
            className="group-hover:!text-[#f4d77a]"
          >
            ▾
          </span>
        </button>
      </div>
    </section>
  );
};

export default Modalidades;
