import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Quote, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import modelLeft from "@/assets/model-left-new.png";
import modelRight from "@/assets/model-original.jpg";

// 👇 TROQUE AQUI PARA TESTAR: "offwhite" | "preto" | "grafite" | "bokeh" | "luxoBordo"
const THEME: "offwhite" | "preto" | "grafite" | "bokeh" | "luxoBordo" = "luxoBordo";

const themes = {
  offwhite: {
    background: "linear-gradient(180deg, hsl(36 35% 95%) 0%, hsl(36 30% 92%) 100%)",
    overlay: null as string | null,
    eyebrow: "hsl(40 60% 40%)",
    title: "hsl(20 14% 15%)",
    quoteIcon: "hsl(40 70% 50%)",
    quote: "hsl(20 14% 20%)",
    line: "hsl(40 70% 55%)",
    name: "hsl(20 14% 15%)",
    role: "hsl(20 8% 45%)",
    accent: "hsl(40 60% 40%)",
    border: "hsl(40 40% 70%)",
    arrow: "hsl(20 14% 20%)",
    dotInactive: "hsl(30 15% 75%)",
    dotActive: "hsl(40 70% 50%)",
    topLine: "linear-gradient(90deg, transparent, hsl(40 70% 55%), transparent)",
  },
  preto: {
    background: "hsl(0 0% 4%)",
    overlay: null,
    eyebrow: "hsl(40 70% 60%)",
    title: "hsl(36 30% 96%)",
    quoteIcon: "hsl(40 80% 60%)",
    quote: "hsl(36 20% 92%)",
    line: "hsl(40 70% 55%)",
    name: "hsl(36 30% 96%)",
    role: "hsl(30 10% 60%)",
    accent: "hsl(40 70% 60%)",
    border: "hsl(40 40% 35%)",
    arrow: "hsl(36 30% 90%)",
    dotInactive: "hsl(0 0% 25%)",
    dotActive: "hsl(40 70% 55%)",
    topLine: "linear-gradient(90deg, transparent, hsl(40 70% 55%), transparent)",
  },
  grafite: {
    background:
      "radial-gradient(ellipse at top, hsl(20 6% 18%) 0%, hsl(20 8% 12%) 60%, hsl(20 10% 8%) 100%)",
    overlay:
      "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.06 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
    eyebrow: "hsl(40 50% 60%)",
    title: "hsl(36 20% 92%)",
    quoteIcon: "hsl(40 60% 55%)",
    quote: "hsl(30 15% 88%)",
    line: "hsl(40 60% 50%)",
    name: "hsl(36 20% 92%)",
    role: "hsl(30 8% 60%)",
    accent: "hsl(40 55% 55%)",
    border: "hsl(20 10% 30%)",
    arrow: "hsl(36 20% 88%)",
    dotInactive: "hsl(20 8% 28%)",
    dotActive: "hsl(40 60% 55%)",
    topLine: "linear-gradient(90deg, transparent, hsl(40 50% 50%), transparent)",
  },
  bokeh: {
    background:
      "radial-gradient(circle at 20% 30%, hsl(40 80% 50% / 0.18), transparent 40%), radial-gradient(circle at 80% 70%, hsl(35 70% 55% / 0.15), transparent 45%), radial-gradient(circle at 50% 50%, hsl(40 60% 40% / 0.08), transparent 60%), linear-gradient(180deg, hsl(20 15% 8%), hsl(20 20% 5%))",
    overlay: null,
    eyebrow: "hsl(40 80% 65%)",
    title: "hsl(36 30% 96%)",
    quoteIcon: "hsl(40 90% 65%)",
    quote: "hsl(36 25% 94%)",
    line: "hsl(40 80% 60%)",
    name: "hsl(36 30% 96%)",
    role: "hsl(30 15% 70%)",
    accent: "hsl(40 80% 65%)",
    border: "hsl(40 40% 40%)",
    arrow: "hsl(36 30% 92%)",
    dotInactive: "hsl(20 10% 30%)",
    dotActive: "hsl(40 80% 60%)",
    topLine: "linear-gradient(90deg, transparent, hsl(40 80% 60%), transparent)",
  },
  luxoBordo: {
    // Fundo bordô profundo com vinheta dourada e textura sutil — visual luxuoso e exclusivo
    background:
      "radial-gradient(ellipse 80% 60% at 50% 0%, hsl(40 70% 50% / 0.18) 0%, transparent 55%), radial-gradient(ellipse 70% 50% at 50% 100%, hsl(40 60% 45% / 0.12) 0%, transparent 60%), linear-gradient(180deg, hsl(350 45% 12%) 0%, hsl(350 50% 8%) 50%, hsl(350 55% 6%) 100%)",
    overlay:
      "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.05 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
    eyebrow: "hsl(42 75% 65%)",        // dourado claro - "Depoimentos"
    title: "hsl(42 80% 70%)",          // título dourado luminoso
    quoteIcon: "hsl(42 80% 62%)",
    quote: "hsl(36 30% 94%)",          // depoimento off-white para contraste
    line: "hsl(42 70% 55%)",
    name: "hsl(42 75% 68%)",           // nome dourado (diferente do depoimento)
    role: "hsl(36 15% 75%)",
    accent: "hsl(42 85% 70%)",
    border: "hsl(42 50% 40%)",
    arrow: "hsl(42 70% 70%)",
    dotInactive: "hsl(350 30% 25%)",
    dotActive: "hsl(42 80% 60%)",
    topLine: "linear-gradient(90deg, transparent, hsl(42 80% 60%), transparent)",
  },
};

const testimonials = [
  {
    quote:
      "A joia significa a personificação da corredora que sempre sonhei ser!",
    name: "Elizandra Fernandes",
    role: "Corredora — SC",
    distance: "RUN",
  },
  {
    quote:
      "Minha joia chegou na sexta, já coloquei assim que chegou, não tirei mais! Ela é linda demais e já me deu muita sorte. Primeira prova com ela e voltei com 2 troféus.",
    name: "Carin Marchinhacki",
    role: "Corredora — SP",
    distance: "RUN",
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
      "Meu pingente de corredora carrega minha alegria, minha dedicação e a liberdade que sinto quando estou correndo.",
    name: "Catiucia Bertuol",
    role: "Corredora — RJ",
    distance: "RUN",
  },
];

export const Testimonials = () => {
  const t = themes[THEME];
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
      className="relative pt-2 sm:pt-3 pb-6 sm:pb-10 md:pb-14 overflow-hidden"
      style={{ background: t.background }}
    >
      {t.overlay && (
        <div
          className="absolute inset-0 pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: t.overlay }}
        />
      )}

      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-24 sm:w-32"
        style={{ background: t.topLine }}
      />

      {/* Modelos laterais — apenas em telas médias+ (no mobile aparecem acima do depoimento) */}
      <div
        className="hidden md:block absolute left-0 top-1/2 w-[32%] lg:w-[22%] max-w-[320px] pointer-events-none select-none opacity-60 lg:opacity-100"
        style={{
          transform: "translateY(-50%) rotate(-4deg)",
          filter: "drop-shadow(0 30px 40px hsl(20 14% 15% / 0.18))",
        }}
        aria-hidden="true"
      >
        <img
          src={modelLeft}
          alt=""
          className="w-full h-auto object-contain rounded-sm"
          loading="lazy"
        />
      </div>
      <div
        className="hidden md:block absolute right-0 top-1/2 w-[32%] lg:w-[22%] max-w-[320px] pointer-events-none select-none opacity-60 lg:opacity-100"
        style={{
          transform: "translateY(-50%) rotate(4deg)",
          filter: "drop-shadow(0 30px 40px hsl(20 14% 15% / 0.18))",
        }}
        aria-hidden="true"
      >
        <img
          src={modelRight}
          alt=""
          className="w-full h-auto object-contain rounded-sm"
          loading="lazy"
        />
      </div>

      {/* Mobile: fotos lado a lado acima do depoimento, sem sobreposição com o texto */}
      <div className="md:hidden container max-w-md px-6 mb-8 flex items-end justify-center gap-4">
        <div
          className="w-[42%] max-w-[160px]"
          style={{
            transform: "rotate(-3deg)",
            filter: "drop-shadow(0 18px 24px hsl(20 14% 15% / 0.18))",
          }}
        >
          <img
            src={modelLeft}
            alt=""
            className="w-full h-auto object-contain rounded-sm"
            loading="lazy"
          />
        </div>
        <div
          className="w-[42%] max-w-[160px]"
          style={{
            transform: "rotate(3deg)",
            filter: "drop-shadow(0 18px 24px hsl(20 14% 15% / 0.18))",
          }}
        >
          <img
            src={modelRight}
            alt=""
            className="w-full h-auto object-contain rounded-sm"
            loading="lazy"
          />
        </div>
      </div>

      <div className="container max-w-4xl text-center relative px-6 sm:px-8">
        <span
          className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] sm:tracking-[0.4em] font-medium"
          style={{ color: t.eyebrow }}
        >
          Depoimentos
        </span>
        <h2
          className="font-display text-3xl sm:text-4xl md:text-5xl font-medium mt-3 sm:mt-4 mb-10 sm:mb-16"
          style={{ color: t.title }}
        >
          Histórias que carregamos
        </h2>

        <div className="relative min-h-[320px] sm:min-h-[280px] md:min-h-[240px]">
          <Quote
            className="mx-auto mb-6 sm:mb-8 h-8 w-8 sm:h-10 sm:w-10 opacity-80"
            style={{ color: t.quoteIcon }}
            strokeWidth={1.25}
          />

          <blockquote
            key={index}
            className="animate-fade-in font-display text-lg sm:text-2xl md:text-3xl leading-relaxed font-light italic px-2 sm:px-4 md:px-12"
            style={{ color: t.quote }}
          >
            “{current.quote}”
          </blockquote>

          <div className="mt-8 sm:mt-10 flex flex-col items-center gap-1">
            <div className="h-px w-10 sm:w-12 mb-3 sm:mb-4" style={{ background: t.line }} />
            <p className="text-sm font-medium tracking-wide" style={{ color: t.name }}>
              {current.name}
            </p>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em]" style={{ color: t.role }}>
              {current.role} · <span style={{ color: t.accent }}>{current.distance}</span>
            </p>
          </div>
        </div>

        <div className="mt-10 sm:mt-12 flex items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={prev}
            aria-label="Depoimento anterior"
            className="p-2 rounded-full border transition-all hover:scale-110"
            style={{ borderColor: t.border, color: t.arrow }}
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
                  background: i === index ? t.dotActive : t.dotInactive,
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Próximo depoimento"
            className="p-2 rounded-full border transition-all hover:scale-110"
            style={{ borderColor: t.border, color: t.arrow }}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* CTA "Criar minha joia" — movido do Hero para a sessão Depoimentos */}
        <div className="mt-12 sm:mt-16 flex items-center justify-center px-4">
          <style>{`
            @keyframes testi-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
            @keyframes testi-shine { 0% { transform: translateX(-150%) skewX(-20deg); } 60%, 100% { transform: translateX(250%) skewX(-20deg); } }
          `}</style>
          <Link
            to="/catalogo"
            aria-label="Criar minha joia"
            translate="no"
            className="group notranslate relative inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-10 md:px-12 py-3 sm:py-4 overflow-hidden border border-black transition-all duration-500 hover:-translate-y-0.5 whitespace-nowrap"
            style={{
              background:
                "linear-gradient(110deg, rgba(184,134,11,0.95) 0%, rgba(212,175,55,0.95) 25%, rgba(244,215,122,0.95) 50%, rgba(212,175,55,0.95) 75%, rgba(184,134,11,0.95) 100%)",
              backgroundSize: "300% 100%",
              animation: "testi-shimmer 4s linear infinite",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5), 0 0 25px rgba(212,175,55,0.4)",
            }}
          >
            <span
              className="pointer-events-none absolute top-0 left-0 h-full w-1/3"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.85) 50%, transparent 100%)",
                animation: "testi-shine 3.5s ease-in-out infinite",
                mixBlendMode: "screen",
              }}
            />
            <Sparkles className="h-4 w-4 text-black relative z-10 shrink-0" strokeWidth={1.5} />
            <span
              translate="no"
              lang="pt-BR"
              className="notranslate relative z-10 font-display text-xs sm:text-sm tracking-[0.35em] sm:tracking-[0.4em] uppercase text-black"
            >
              Criar minha joia
            </span>
            <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
          </Link>
        </div>
      </div>
    </section>
  );
};
