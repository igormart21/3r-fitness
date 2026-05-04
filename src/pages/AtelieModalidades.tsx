import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { MODALIDADES } from "@/data/atelie";

const AtelieModalidades = () => {
  return (
    <div
      className="min-h-screen w-full text-white"
      style={{ backgroundColor: "#050505" }}
    >
      {/* Header */}
      <header className="absolute top-0 inset-x-0 z-30">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <Link
            to="/atelie"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white/70 hover:text-[#d4af37] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Ateliê
          </Link>
          <span
            className="hidden md:block font-display italic text-sm tracking-[0.3em]"
            style={{ color: "#d4af37" }}
          >
            MODALIDADES
          </span>
          <span className="w-16" />
        </div>
      </header>

      <main className="pt-32 pb-24">
        <div className="container mx-auto max-w-7xl px-6 text-center mb-20">
          <p
            className="text-[10px] uppercase tracking-[0.6em] mb-6"
            style={{ color: "rgba(212,175,55,0.75)" }}
          >
            Etapa 01
          </p>
          <h1
            className="font-display font-light leading-tight"
            style={{
              fontSize: "clamp(34px, 4.5vw, 56px)",
              letterSpacing: "0.03em",
              color: "#f4ead0",
            }}
          >
            Escolha sua{" "}
            <em className="italic" style={{ color: "#d4af37" }}>
              modalidade
            </em>
          </h1>
          <p
            className="mt-5 italic font-light max-w-xl mx-auto"
            style={{
              fontFamily: '"Fraunces",serif',
              color: "rgba(255,255,255,0.6)",
              fontSize: "15px",
              letterSpacing: "0.03em",
            }}
          >
            Cada disciplina inspira sua própria linha autoral.
          </p>
        </div>

        <div className="container mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10" style={{ maxWidth: "55%" }}>
          {MODALIDADES.map((m, i) => (
            <Link
              key={m.slug}
              to={`/atelie/modalidade/${m.slug}`}
              className={`group relative overflow-hidden block transition-all duration-700 hover:-translate-y-1 ${
                i === 0 ? "lg:col-span-2 lg:row-span-2" : ""
              }`}
              style={{
                aspectRatio: i === 0 ? "16 / 11" : "4 / 5",
                border: "1px solid rgba(212,175,55,0.18)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 30px 70px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.55), 0 0 40px rgba(212,175,55,0.22)";
                e.currentTarget.style.borderColor =
                  "rgba(212,175,55,0.55)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 20px 50px rgba(0,0,0,0.5)";
                e.currentTarget.style.borderColor =
                  "rgba(212,175,55,0.18)";
              }}
            >
              <img
                src={m.img}
                alt={m.nome}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-contain transition-transform duration-[1600ms] ease-out group-hover:scale-105"
                style={{ filter: "contrast(1.04) saturate(1.02)" }}
              />
              <div
                className="absolute inset-0"
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
              <div
                className={`absolute inset-x-0 bottom-0 z-10 ${
                  i === 0 ? "p-8 sm:p-10" : "p-6"
                }`}
              >
                <h3
                  className="font-display text-white font-light tracking-wide"
                  style={{
                    fontSize: i === 0 ? "clamp(28px,3vw,40px)" : "22px",
                    textShadow: "0 2px 12px rgba(0,0,0,0.65)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {m.nome}
                </h3>
                <p
                  className="mt-2 italic font-light text-sm"
                  style={{
                    color: "rgba(244,215,122,0.82)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {m.subtitulo}
                </p>
                <div
                  className="mt-4 h-px w-0 group-hover:w-20 transition-all duration-700"
                  style={{
                    background:
                      "linear-gradient(90deg, #d4af37, transparent)",
                  }}
                />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AtelieModalidades;
