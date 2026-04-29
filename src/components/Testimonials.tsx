import { useEffect, useState } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "Comprei o pingente da minha primeira maratona e nunca mais tirei do pescoço. É como carregar a história daquele dia comigo todos os dias.",
    name: "Mariana Costa",
    role: "Maratonista — São Paulo",
    distance: "42K",
  },
  {
    quote:
      "Acabamento impecável. Você sente a diferença assim que abre a caixa. Vale cada centavo, é uma joia de verdade.",
    name: "Rafael Almeida",
    role: "Corredor de rua — Rio de Janeiro",
    distance: "21K",
  },
  {
    quote:
      "Presenteei meu pai depois da primeira meia maratona dele aos 60 anos. Ele chorou. Vocês transformaram um momento em eternidade.",
    name: "Júlia Mendes",
    role: "Triatleta — Belo Horizonte",
    distance: "70.3",
  },
  {
    quote:
      "Já tive vários colares esportivos, mas a 3R é outro nível. Discreto o suficiente pro dia a dia, marcante o suficiente pra contar uma história.",
    name: "Pedro Henrique Lima",
    role: "Ultramaratonista — Curitiba",
    distance: "100K",
  },
];

export const Testimonials = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIndex((i) => (i + 1) % testimonials.length);

  const current = testimonials[index];

  return (
    <section
      id="depoimentos"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "linear-gradient(180deg, hsl(36 35% 95%) 0%, hsl(36 30% 92%) 100%)" }}
    >
      {/* Detalhe dourado decorativo */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-32"
        style={{ background: "linear-gradient(90deg, transparent, hsl(40 70% 55%), transparent)" }}
      />

      <div className="container max-w-4xl text-center">
        <span
          className="text-[11px] uppercase tracking-[0.4em] font-medium"
          style={{ color: "hsl(40 60% 40%)" }}
        >
          Depoimentos
        </span>
        <h2
          className="font-display text-4xl md:text-5xl font-medium mt-4 mb-16"
          style={{ color: "hsl(20 14% 15%)" }}
        >
          Histórias que carregamos
        </h2>

        <div className="relative min-h-[280px] md:min-h-[240px]">
          <Quote
            className="mx-auto mb-8 h-10 w-10 opacity-80"
            style={{ color: "hsl(40 70% 50%)" }}
            strokeWidth={1.25}
          />

          <blockquote
            key={index}
            className="animate-fade-in font-display text-2xl md:text-3xl leading-relaxed font-light italic px-4 md:px-12"
            style={{ color: "hsl(20 14% 20%)" }}
          >
            “{current.quote}”
          </blockquote>

          <div className="mt-10 flex flex-col items-center gap-1">
            <div
              className="h-px w-12 mb-4"
              style={{ background: "hsl(40 70% 55%)" }}
            />
            <p
              className="text-sm font-medium tracking-wide"
              style={{ color: "hsl(20 14% 15%)" }}
            >
              {current.name}
            </p>
            <p
              className="text-xs uppercase tracking-[0.25em]"
              style={{ color: "hsl(20 8% 45%)" }}
            >
              {current.role} · <span style={{ color: "hsl(40 60% 40%)" }}>{current.distance}</span>
            </p>
          </div>
        </div>

        {/* Controles */}
        <div className="mt-12 flex items-center justify-center gap-6">
          <button
            onClick={prev}
            aria-label="Depoimento anterior"
            className="p-2 rounded-full border transition-all hover:scale-110"
            style={{ borderColor: "hsl(40 40% 70%)", color: "hsl(20 14% 20%)" }}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Ir para depoimento ${i + 1}`}
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: i === index ? "32px" : "8px",
                  background: i === index ? "hsl(40 70% 50%)" : "hsl(30 15% 75%)",
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Próximo depoimento"
            className="p-2 rounded-full border transition-all hover:scale-110"
            style={{ borderColor: "hsl(40 40% 70%)", color: "hsl(20 14% 20%)" }}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
