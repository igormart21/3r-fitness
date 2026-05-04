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

      {/* Botões sociais — canto direito da seção */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex flex-col gap-3">
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
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
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
            <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.715.315-.41.442-1.117 1.11-1.117 2.532 0 .457.072.93.187 1.376.315 1.232.962 2.41 1.733 3.412 1.118 1.448 2.62 2.66 4.32 3.317.434.157 2.32.792 2.736.792.817 0 1.59-.4 1.962-1.103.215-.4.357-.85.4-1.288 0-.073 0-.158-.043-.215-.115-.187-.43-.287-.6-.387z"/>
            <path d="M16.013 2.667C8.65 2.667 2.68 8.638 2.68 16c0 2.348.617 4.65 1.79 6.668L2.667 29.333l6.838-1.794a13.292 13.292 0 0 0 6.508 1.683C23.376 29.222 29.347 23.252 29.347 15.89c0-3.546-1.388-6.881-3.91-9.391-2.51-2.51-5.84-3.832-9.424-3.832zm0 24.402c-2.061 0-4.077-.555-5.84-1.604l-.418-.247-4.328 1.135 1.155-4.222-.272-.434c-1.155-1.832-1.766-3.96-1.766-6.144 0-6.397 5.21-11.605 11.482-11.605 3.103 0 6.013 1.21 8.198 3.405a11.512 11.512 0 0 1 3.396 8.21c0 6.396-5.077 11.605-11.474 11.605z"/>
          </svg>
        </a>
      </div>

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
