import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { MODALIDADES, LINHAS } from "@/data/atelie";

const AtelieModalidade = () => {
  const { slug } = useParams();
  const modalidade = MODALIDADES.find((m) => m.slug === slug);

  if (!modalidade) return <Navigate to="/atelie/modalidades" replace />;

  const linhas = modalidade.linhas
    .map((id) => LINHAS[id])
    .filter(Boolean);

  return (
    <div
      className="min-h-screen w-full text-white"
      style={{ backgroundColor: "#050505" }}
    >
      {/* Header */}
      <header className="absolute top-0 inset-x-0 z-30">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <Link
            to="/atelie/modalidades"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white/70 hover:text-[#d4af37] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Modalidades
          </Link>
          <span
            className="hidden md:block font-display italic text-sm tracking-[0.3em]"
            style={{ color: "#d4af37" }}
          >
            {modalidade.nome.toUpperCase()}
          </span>
          <span className="w-16" />
        </div>
      </header>

      <main className="pt-32 pb-24">
        {/* Intro */}
        <div className="container mx-auto max-w-5xl px-6 text-center mb-24">
          <p
            className="text-[10px] uppercase tracking-[0.6em] mb-6"
            style={{ color: "rgba(212,175,55,0.75)" }}
          >
            Etapa 02 · Linhas autorais
          </p>
          <h1
            className="font-display font-light leading-tight"
            style={{
              fontSize: "clamp(36px, 5vw, 64px)",
              letterSpacing: "0.03em",
              color: "#f4ead0",
            }}
          >
            {modalidade.nome}
          </h1>
          <p
            className="mt-5 italic font-light max-w-xl mx-auto"
            style={{
              fontFamily: '"Fraunces",serif',
              color: "rgba(255,255,255,0.65)",
              fontSize: "16px",
              letterSpacing: "0.03em",
            }}
          >
            Duas linhas. Duas narrativas. Uma essência.
          </p>
        </div>

        {/* Linhas full-width campaign sections */}
        <div className="space-y-24">
          {linhas.map((linha, i) => (
            <section
              key={linha.slug}
              className="relative w-full"
              style={{ minHeight: "82vh" }}
            >
              <div
                className={`container mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Imagem campanha */}
                <div className="lg:col-span-7 relative">
                  <div
                    className="relative w-full overflow-hidden group"
                    style={{
                      aspectRatio: "4 / 5",
                      border: "1px solid rgba(212,175,55,0.18)",
                      boxShadow: "0 30px 80px rgba(0,0,0,0.7)",
                    }}
                  >
                    <img
                      src={linha.campaign}
                      alt={linha.nome}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-105"
                      style={{ filter: "contrast(1.05) saturate(1.04)" }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%)",
                      }}
                    />
                  </div>
                </div>

                {/* Texto + CTA */}
                <div className="lg:col-span-5">
                  <div className="max-w-md mx-auto lg:mx-0">
                    <p
                      className="text-[10px] uppercase tracking-[0.5em] mb-5"
                      style={{ color: "rgba(212,175,55,0.75)" }}
                    >
                      Linha autoral · 0{i + 1}
                    </p>
                    <h2
                      className="font-display font-light leading-none"
                      style={{
                        fontSize: "clamp(44px, 5vw, 72px)",
                        letterSpacing: "0.04em",
                        color: "#f4ead0",
                      }}
                    >
                      {linha.nome}
                    </h2>
                    <p
                      className="mt-4 italic font-light"
                      style={{
                        fontFamily: '"Fraunces",serif',
                        color: "rgba(244,215,122,0.9)",
                        fontSize: "15px",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {linha.assinatura}
                    </p>

                    <div
                      className="my-8 h-px w-20"
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(212,175,55,0.7), transparent)",
                      }}
                    />

                    <p
                      className="font-light leading-relaxed italic"
                      style={{
                        fontFamily: '"Fraunces",serif',
                        color: "rgba(255,255,255,0.72)",
                        fontSize: "17px",
                      }}
                    >
                      {linha.frase}
                    </p>

                    <div className="mt-12">
                      <Link
                        to={`/atelie/linha/${linha.slug}`}
                        className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 transition-all duration-500"
                        style={{
                          color: "#d4af37",
                          border: "1px solid rgba(212,175,55,0.55)",
                          background: "transparent",
                          fontFamily: "Inter, sans-serif",
                          fontSize: "11px",
                          letterSpacing: "0.42em",
                          textTransform: "uppercase",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#d4af37";
                          e.currentTarget.style.color = "#000";
                          e.currentTarget.style.boxShadow =
                            "0 0 32px rgba(212,175,55,0.35)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = "#d4af37";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        <span
                          className="h-px w-5"
                          style={{ background: "currentColor" }}
                        />
                        Explorar linha
                        <span
                          className="h-px w-5"
                          style={{ background: "currentColor" }}
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AtelieModalidade;
