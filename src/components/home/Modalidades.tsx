import { Link } from "react-router-dom";
import sportFisiculturismo from "@/assets/sport-fisiculturismo.jpg";
import sportMusculacao from "@/assets/sport-musculacao.jpg";
import sportTriathlon from "@/assets/sport-triathlon.jpg";
import sportCiclismo from "@/assets/sport-ciclismo.jpg";
import sportCrossfit from "@/assets/sport-crossfit.jpg";
import sportCorrida from "@/assets/sport-corrida.jpg";

const modalidades = [
  { id: 1, nome: "Fisiculturismo", img: sportFisiculturismo, frase: "O corpo é a sua obra" },
  { id: 2, nome: "Musculação", img: sportMusculacao, frase: "Força construída em silêncio" },
  { id: 6, nome: "Corrida", img: sportCorrida, frase: "Cada passo, uma escolha" },
  { id: 4, nome: "Ciclismo", img: sportCiclismo, frase: "Mais longe do que ontem" },
  { id: 5, nome: "Crossfit", img: sportCrossfit, frase: "Intensidade define você" },
  { id: 3, nome: "Triathlon", img: sportTriathlon, frase: "Resistência sem limites" },
];

export const Modalidades = () => {
  return (
    <section
      id="modalidades"
      className="relative w-full scroll-mt-0"
      style={{
        background:
          "linear-gradient(180deg, #000 0%, #050505 30%, #050505 70%, #000 100%)",
        paddingTop: "120px",
        paddingBottom: "160px",
      }}
    >
      <div className="container mx-auto max-w-7xl px-6 text-center mb-16 sm:mb-20">
        <span
          className="text-[10px] sm:text-[11px] uppercase tracking-[0.4em] font-medium"
          style={{ color: "rgba(244,215,122,0.75)" }}
        >
          Modalidades
        </span>
        <h2
          className="font-display font-light text-3xl sm:text-4xl md:text-5xl mt-4 max-w-3xl mx-auto leading-[1.2]"
          style={{
            background: "linear-gradient(180deg, #f4f4f4 0%, #d9d9d9 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Sua essência se revela na <em className="italic" style={{ color: "#d4af37", WebkitTextFillColor: "#d4af37" }}>forma como você treina</em>
        </h2>
      </div>

      <div className="container mx-auto max-w-7xl px-6 grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {modalidades.map(({ id, nome, img, frase }) => (
          <Link
            key={id}
            to={`/modalidade/${id}`}
            className="group relative overflow-hidden aspect-[3/4] block transition-transform duration-700 hover:-translate-y-1"
            style={{
              border: "1px solid rgba(212,175,55,0.25)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
            }}
          >
            <img
              src={img}
              alt={nome}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-110"
            />
            <div
              className="absolute inset-0 transition-opacity duration-700"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.92) 100%)",
              }}
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(244,215,122,0.18) 0%, transparent 65%)",
              }}
            />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 z-10">
              <h3
                className="font-display text-lg sm:text-xl md:text-2xl text-white font-light tracking-wide"
                style={{ textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}
              >
                {nome}
              </h3>
              <p
                className="mt-2 text-xs sm:text-sm italic font-light"
                style={{ color: "rgba(244,215,122,0.85)" }}
              >
                {frase}
              </p>
              <div
                className="mt-4 h-px w-0 group-hover:w-16 transition-all duration-700"
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
