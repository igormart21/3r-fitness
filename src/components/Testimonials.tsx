import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import modelLeft from "@/assets/model-left-new.png";
import modelRight from "@/assets/model-original.jpg";
import model3r from "@/assets/model-3r.png";
import heroAtletas from "@/assets/hero-atletas.png";

const testimonials = [
  {
    quote: "Não tiro mais. Faz parte de quem eu sou.",
    name: "Elizandra Fernandes",
    location: "Florianópolis — SC",
    discipline: "RUN",
    image: modelLeft,
  },
  {
    quote: "Primeira prova com ela. Dois troféus.",
    name: "Carin Marchinhacki",
    location: "São Paulo — SP",
    discipline: "RUN",
    image: modelRight,
  },
  {
    quote: "Transformaram um momento em eternidade.",
    name: "Júlia Mendes",
    location: "Belo Horizonte — MG",
    discipline: "70.3",
    image: model3r,
  },
  {
    quote: "Carrego minha liberdade no peito.",
    name: "Catiucia Bertuol",
    location: "Rio de Janeiro — RJ",
    discipline: "RUN",
    image: heroAtletas,
  },
];

export const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 5500);
    return () => clearInterval(id);
  }, [paused]);

  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIndex((i) => (i + 1) % testimonials.length);

  const current = testimonials[index];

  return (
    <section
      id="depoimentos"
      className="relative overflow-hidden py-32 sm:py-40 md:py-48"
      style={{
        background:
          "radial-gradient(ellipse 80% 55% at 50% 0%, hsl(40 65% 50% / 0.10) 0%, transparent 65%), radial-gradient(ellipse 65% 45% at 50% 100%, hsl(40 55% 45% / 0.08) 0%, transparent 70%), linear-gradient(180deg, hsl(30 18% 11%) 0%, hsl(20 16% 8%) 50%, hsl(0 0% 6%) 100%)",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Textura sutil */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-40"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.05 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Botões sociais — canto inferior direito */}
      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-20 flex flex-row gap-3">
        <a
          href="https://instagram.com/3rfitnessjr"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram @3rfitnessjr"
          className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-110"
          style={{
            background:
              "linear-gradient(135deg, #feda75 0%, #fa7e1e 25%, #d62976 50%, #962fbf 75%, #4f5bd5 100%)",
          }}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </a>
        <a
          href="https://wa.me/5548991486304"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-110"
          style={{ background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)" }}
        >
          <svg viewBox="0 0 32 32" className="h-5 w-5" fill="currentColor" aria-hidden="true">
            <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.715.315-.41.442-1.117 1.11-1.117 2.532 0 .457.072.93.187 1.376.315 1.232.962 2.41 1.733 3.412 1.118 1.448 2.62 2.66 4.32 3.317.434.157 2.32.792 2.736.792.817 0 1.59-.4 1.962-1.103.215-.4.357-.85.4-1.288 0-.073 0-.158-.043-.215-.115-.187-.43-.287-.6-.387z" />
            <path d="M16.013 2.667C8.65 2.667 2.68 8.638 2.68 16c0 2.348.617 4.65 1.79 6.668L2.667 29.333l6.838-1.794a13.292 13.292 0 0 0 6.508 1.683C23.376 29.222 29.347 23.252 29.347 15.89c0-3.546-1.388-6.881-3.91-9.391-2.51-2.51-5.84-3.832-9.424-3.832zm0 24.402c-2.061 0-4.077-.555-5.84-1.604l-.418-.247-4.328 1.135 1.155-4.222-.272-.434c-1.155-1.832-1.766-3.96-1.766-6.144 0-6.397 5.21-11.605 11.482-11.605 3.103 0 6.013 1.21 8.198 3.405a11.512 11.512 0 0 1 3.396 8.21c0 6.396-5.077 11.605-11.474 11.605z" />
          </svg>
        </a>
      </div>

      <div className="container relative max-w-3xl px-6 text-center">
        {/* Micro assinatura */}
        <span
          className="block text-[10px] sm:text-[11px] uppercase tracking-[0.5em] font-light"
          style={{ color: "hsl(42 75% 65%)" }}
        >
          Atletas 3R
        </span>

        {/* Linha dourada */}
        <div
          className="mx-auto mt-6 mb-8 h-px w-16"
          style={{ background: "linear-gradient(90deg, transparent, hsl(42 80% 60%), transparent)" }}
        />

        {/* Título */}
        <h2
          className="font-display text-3xl sm:text-4xl md:text-5xl font-light tracking-wide"
          style={{ color: "hsl(42 80% 72%)" }}
        >
          Histórias que nos acompanham
        </h2>

        {/* Linha dourada inferior */}
        <div
          className="mx-auto mt-8 mb-16 sm:mb-20 h-px w-24"
          style={{ background: "linear-gradient(90deg, transparent, hsl(42 70% 55%), transparent)" }}
        />

        {/* Carrossel */}
        <div className="relative min-h-[420px] sm:min-h-[460px]">
          <div key={index} className="animate-fade-in flex flex-col items-center">
            {/* Imagem do cliente — circular, refinada */}
            <div
              className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-full overflow-hidden mb-10 sm:mb-12"
              style={{
                boxShadow:
                  "0 0 0 1px hsl(42 60% 45% / 0.5), 0 0 0 6px hsl(350 45% 8%), 0 0 0 7px hsl(42 60% 45% / 0.3), 0 20px 40px hsl(0 0% 0% / 0.6)",
              }}
            >
              <img
                src={current.image}
                alt={current.name}
                className="h-full w-full object-cover"
                style={{
                  objectPosition: "center 20%",
                  filter: "contrast(1.05) brightness(1.02) saturate(0.95)",
                }}
                loading="lazy"
              />
            </div>

            {/* Frase principal */}
            <blockquote
              className="font-display text-2xl sm:text-3xl md:text-4xl leading-[1.4] font-light italic max-w-2xl px-4"
              style={{ color: "hsl(36 30% 96%)" }}
            >
              “{current.quote}”
            </blockquote>

            {/* Nome + identificação */}
            <div className="mt-10 sm:mt-12 flex flex-col items-center gap-3">
              <div
                className="h-px w-8"
                style={{ background: "hsl(42 70% 55%)" }}
              />
              <p
                className="text-sm sm:text-base font-light tracking-[0.15em]"
                style={{ color: "hsl(42 75% 70%)" }}
              >
                {current.name}
              </p>
              <p
                className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] font-light"
                style={{ color: "hsl(36 12% 65%)" }}
              >
                {current.location} · <span style={{ color: "hsl(42 70% 60%)" }}>{current.discipline}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Navegação discreta */}
        <div className="mt-12 sm:mt-16 flex items-center justify-center gap-6">
          <button
            onClick={prev}
            aria-label="Depoimento anterior"
            className="opacity-60 hover:opacity-100 transition-opacity"
            style={{ color: "hsl(42 70% 70%)" }}
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={1.25} />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Ir para depoimento ${i + 1}`}
                className="h-1 rounded-full transition-all duration-500"
                style={{
                  width: i === index ? "24px" : "6px",
                  background: i === index ? "hsl(42 80% 60%)" : "hsl(350 25% 22%)",
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Próximo depoimento"
            className="opacity-60 hover:opacity-100 transition-opacity"
            style={{ color: "hsl(42 70% 70%)" }}
          >
            <ChevronRight className="h-4 w-4" strokeWidth={1.25} />
          </button>
        </div>

        {/* Botão minimalista */}
        <div className="mt-16 sm:mt-20">
          <a
            href="https://instagram.com/3rfitnessjr"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 text-[11px] sm:text-xs uppercase tracking-[0.4em] font-light pb-1.5 border-b transition-all duration-500 hover:gap-5"
            style={{
              color: "hsl(42 75% 70%)",
              borderColor: "hsl(42 60% 45% / 0.5)",
            }}
          >
            Ver mais histórias
            <span
              className="inline-block transition-transform duration-500 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};
