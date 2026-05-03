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
  { id: 3, nome: "Triathlon", img: sportTriathlon, frase: "A travessia dos limites" },
];

export const Modalidades = () => {
  return (
    <section
      id="modalidades"
      className="relative w-full scroll-mt-0"
      style={{
        background:
          "linear-gradient(180deg, #000 0%, #050505 30%, #050505 70%, #000 100%)",
        paddingTop: "140px",
        paddingBottom: "180px",
      }}
    >
      <div className="container mx-auto max-w-7xl px-6 text-center mb-20 sm:mb-28">
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

      <div className="container mx-auto max-w-7xl px-6 grid grid-cols-2 md:grid-cols-3 auto-rows-[300px] sm:auto-rows-[360px] md:auto-rows-[300px] gap-6 sm:gap-8 md:gap-10">
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
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-110"
              style={{ filter: "contrast(1.04) saturate(1.02)" }}
            />
            <div
              className="absolute inset-0 transition-opacity duration-700"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.40) 55%, rgba(0,0,0,0.92) 100%)",
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
    </section>
  );
};

export default Modalidades;
