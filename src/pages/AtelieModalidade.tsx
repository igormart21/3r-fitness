import { useEffect, useState } from "react";
import { Link, useParams, Navigate, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { MODALIDADES, LINHAS } from "@/data/atelie";
import musculacaoCampaign from "@/assets/modalidade-musculacao-campaign.jpg";
import musculacaoHalter from "@/assets/modalidade-musculacao-halter.jpg";
import ciclismoCampaign from "@/assets/modalidade-ciclismo-campaign.jpg";
import crossfitCampaign from "@/assets/modalidade-crossfit-campaign.jpg";
import crossfitStrata from "@/assets/modalidade-crossfit-strata.jpg";
import ciclismoBg from "@/assets/atelie-ciclismo-bg.jpg";

const AtelieModalidade = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const modalidade = MODALIDADES.find((m) => m.slug === slug);

  const linhas = (modalidade?.linhas ?? [])
    .map((id) => LINHAS[id])
    .filter(Boolean);

  const [activeSlug, setActiveSlug] = useState<string | undefined>(
    linhas[0]?.slug,
  );
  const [revealKey, setRevealKey] = useState(0);
  const [hoverSlug, setHoverSlug] = useState<string | undefined>(undefined);

  useEffect(() => {
    setActiveSlug(linhas[0]?.slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    setRevealKey((k) => k + 1);
    // preload
    linhas.forEach((l) => {
      const img = new Image();
      img.src = l.campaign;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSlug, hoverSlug]);

  if (!modalidade) return <Navigate to="/atelie/modalidades" replace />;

  const active = linhas.find((l) => l.slug === (hoverSlug ?? activeSlug)) ?? linhas[0];

  // === CICLISMO: layout cinematográfico premium ===
  if (modalidade.slug === "ciclismo") {
    return (
      <div className="w-full text-white" style={{ backgroundColor: "#050505" }}>
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

        {/* 1. HERO FULL SCREEN */}
        <section className="relative w-screen h-screen overflow-hidden">
          <img
            src={ciclismoBg}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover ciclismo-hero-zoom"
            style={{ objectPosition: "center center", filter: "contrast(1.08) saturate(1.05)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.75) 30%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0) 80%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(5,5,5,0.4) 0%, transparent 20%, transparent 75%, rgba(5,5,5,0.95) 100%)",
            }}
          />

          <div className="relative z-10 h-full container mx-auto px-6 lg:px-12 flex items-center">
            <div className="max-w-xl ciclismo-fade-in">
              <p
                className="text-[10px] uppercase tracking-[0.55em] mb-6"
                style={{ color: "rgba(212,175,55,0.85)" }}
              >
                Etapa 02 · Modalidade
              </p>
              <h1
                className="font-display font-light leading-[0.95]"
                style={{
                  fontSize: "clamp(56px, 8vw, 128px)",
                  letterSpacing: "0.04em",
                  color: "#f4ead0",
                }}
              >
                CICLISMO
              </h1>
              <p
                className="mt-6 italic font-light max-w-md"
                style={{
                  fontFamily: '"Fraunces",serif',
                  color: "rgba(255,255,255,0.75)",
                  fontSize: "17px",
                  letterSpacing: "0.02em",
                }}
              >
                Horizontes conquistados em silêncio. A jornada do atleta, eternizada em ouro.
              </p>
              <div className="mt-10">
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById("ciclismo-linhas")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-3 px-10 py-4 transition-all duration-500"
                  style={{
                    color: "#0a0a0a",
                    background: "#d4af37",
                    border: "1px solid #d4af37",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "11px",
                    letterSpacing: "0.42em",
                    textTransform: "uppercase",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 0 40px rgba(212,175,55,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  Descobrir assinaturas
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 2. FAIXA DE TRANSIÇÃO */}
        <section className="w-full bg-black flex items-center justify-center" style={{ minHeight: "110px" }}>
          <p
            className="text-[11px] uppercase text-center"
            style={{
              color: "rgba(255,255,255,0.7)",
              letterSpacing: "0.7em",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Disciplina &nbsp;·&nbsp; Foco &nbsp;·&nbsp; Superação
          </p>
        </section>

        {/* 3. PRODUTOS */}
        <section id="ciclismo-linhas" className="w-full bg-black py-28 md:py-40">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-20">
              <p
                className="text-[10px] uppercase tracking-[0.55em] mb-4"
                style={{ color: "rgba(212,175,55,0.75)" }}
              >
                Assinaturas
              </p>
              <h2
                className="font-display font-light"
                style={{
                  fontSize: "clamp(28px, 3vw, 42px)",
                  letterSpacing: "0.06em",
                  color: "#f4ead0",
                }}
              >
                As linhas do ciclismo
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-12">
              {linhas.map((l) => (
                <div key={l.slug} className="flex flex-col items-center text-center">
                  <div className="w-full max-w-sm aspect-[3/4] overflow-hidden mb-10">
                    <img
                      src={l.imagens.ouro}
                      alt={l.nome}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      style={{ filter: "contrast(1.05) saturate(1.04)" }}
                    />
                  </div>
                  <h3
                    className="font-display font-light"
                    style={{
                      fontSize: "clamp(24px, 2.2vw, 32px)",
                      letterSpacing: "0.18em",
                      color: "#f4ead0",
                    }}
                  >
                    {l.nome}
                  </h3>
                  <p
                    className="mt-3 italic font-light"
                    style={{
                      fontFamily: '"Fraunces",serif',
                      color: "rgba(255,255,255,0.6)",
                      fontSize: "14px",
                    }}
                  >
                    {l.assinatura}
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate(`/atelie/linha/${l.slug}`)}
                    className="mt-8 inline-flex items-center gap-3 px-9 py-3 transition-all duration-500"
                    style={{
                      color: "#d4af37",
                      border: "1px solid rgba(212,175,55,0.55)",
                      background: "transparent",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "10px",
                      letterSpacing: "0.42em",
                      textTransform: "uppercase",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#d4af37";
                      e.currentTarget.style.color = "#000";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#d4af37";
                    }}
                  >
                    Explorar linha
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. STORYTELLING CINEMATOGRÁFICO */}
        <section className="relative w-screen h-[70vh] overflow-hidden">
          <img
            src={ciclismoBg}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center 40%", filter: "contrast(1.1) saturate(1.05) brightness(0.85)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.6) 100%)",
            }}
          />
          <div className="relative z-10 h-full container mx-auto px-6 lg:px-12 flex items-center">
            <div className="max-w-2xl">
              <p
                className="text-[10px] uppercase tracking-[0.55em] mb-6"
                style={{ color: "rgba(212,175,55,0.85)" }}
              >
                Storytelling
              </p>
              <h2
                className="font-display font-light leading-tight"
                style={{
                  fontSize: "clamp(36px, 5vw, 72px)",
                  letterSpacing: "0.04em",
                  color: "#f4ead0",
                }}
              >
                Representado em uma joia.
              </h2>
            </div>
          </div>
        </section>

        {/* 5. PROVA / AUTORIDADE */}
        <section className="w-full bg-black py-28 md:py-36">
          <div className="container mx-auto px-6 max-w-5xl text-center">
            <p
              className="text-[10px] uppercase tracking-[0.55em] mb-6"
              style={{ color: "rgba(212,175,55,0.75)" }}
            >
              A marca
            </p>
            <h2
              className="font-display font-light leading-tight max-w-3xl mx-auto"
              style={{
                fontSize: "clamp(28px, 3.4vw, 46px)",
                letterSpacing: "0.04em",
                color: "#f4ead0",
              }}
            >
              Criado para quem vive disciplina todos os dias.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 mt-20">
              {[
                { t: "Artesanal", d: "Cada peça forjada à mão por mestres ourives." },
                { t: "Premium", d: "Ouro e prata da mais alta pureza." },
                { t: "Eterno", d: "Joias pensadas para atravessar gerações." },
              ].map((b) => (
                <div key={b.t}>
                  <h3
                    className="font-display font-light mb-3"
                    style={{
                      fontSize: "18px",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "#d4af37",
                    }}
                  >
                    {b.t}
                  </h3>
                  <p
                    className="italic font-light max-w-xs mx-auto"
                    style={{
                      fontFamily: '"Fraunces",serif',
                      color: "rgba(255,255,255,0.6)",
                      fontSize: "15px",
                    }}
                  >
                    {b.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. CTA FINAL */}
        <section className="w-full bg-black py-32 md:py-44">
          <div className="container mx-auto px-6 text-center">
            <h2
              className="font-display font-light leading-tight"
              style={{
                fontSize: "clamp(36px, 5vw, 72px)",
                letterSpacing: "0.04em",
                color: "#f4ead0",
              }}
            >
              Escolha sua assinatura.
            </h2>
            <div className="mt-12">
              <button
                type="button"
                onClick={() => {
                  document.getElementById("ciclismo-linhas")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-3 px-12 py-5 transition-all duration-500"
                style={{
                  color: "#0a0a0a",
                  background: "#d4af37",
                  border: "1px solid #d4af37",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "11px",
                  letterSpacing: "0.42em",
                  textTransform: "uppercase",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 40px rgba(212,175,55,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Ver linhas
              </button>
            </div>
          </div>
        </section>

        <style>{`
          @keyframes ciclismo-hero-zoom {
            0% { transform: scale(1); }
            100% { transform: scale(1.04); }
          }
          .ciclismo-hero-zoom {
            animation: ciclismo-hero-zoom 10s ease-in-out infinite alternate;
          }
          @keyframes ciclismo-fade-in {
            0% { opacity: 0; transform: translateY(12px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .ciclismo-fade-in {
            animation: ciclismo-fade-in 1.2s cubic-bezier(0.22,1,0.36,1) both;
          }
        `}</style>
      </div>
    );
  }

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

      <main className="relative w-full min-h-screen pt-24 md:pt-28 pb-12">
        {modalidade.slug === "ciclismo" && (
          <>
            <div
              aria-hidden
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ zIndex: 0, width: "100vw", left: "50%", transform: "translateX(-50%)" }}
            >
              <img
                src={ciclismoBg}
                alt=""
                className="absolute inset-0 w-full h-full object-cover ciclismo-bg-anim"
                style={{ objectPosition: "center center", filter: "contrast(1.08) saturate(1.05)" }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 28%, rgba(0,0,0,0.45) 52%, rgba(0,0,0,0.15) 75%, rgba(0,0,0,0.35) 100%)",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(5,5,5,0.55) 0%, transparent 18%, transparent 82%, rgba(5,5,5,0.85) 100%)",
                }}
              />
            </div>
            <style>{`
              @keyframes ciclismo-bg-zoom {
                0% { transform: scale(1.00); }
                100% { transform: scale(1.04); }
              }
              .ciclismo-bg-anim {
                animation: ciclismo-bg-zoom 12s ease-in-out infinite alternate;
              }
            `}</style>
          </>
        )}
        <div className="relative container mx-auto max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center" style={{ zIndex: 1 }}>
          {/* ESQUERDA — campanha */}
          <section className="lg:col-span-6 relative">
            {(() => {
              const isHalter = modalidade.slug === "musculacao" && active?.slug === "halter";
              const isMusc = modalidade.slug === "musculacao";
              const isCiclismo = modalidade.slug === "ciclismo";
              const isCrossfit = modalidade.slug === "crossfit";
              const isCrossfitStrata = isCrossfit && active?.slug === "strata";
              const imgSrc = isHalter
                ? musculacaoHalter
                : isMusc
                ? musculacaoCampaign
                : isCiclismo
                ? ciclismoCampaign
                : isCrossfitStrata
                ? crossfitStrata
                : isCrossfit
                ? crossfitCampaign
                : active?.campaign;
              const ratio = isHalter
                ? "1402 / 1122"
                : isMusc
                ? "1122 / 1402"
                : isCiclismo
                ? "1086 / 1448"
                : isCrossfit
                ? "1536 / 1024"
                : "1135 / 1410";
              return (
                <div
                  className="relative w-full overflow-hidden mx-auto group"
                  style={{
                    aspectRatio: ratio,
                    maxHeight: "calc(100vh - 100px)",
                    border: "1px solid rgba(212,175,55,0.18)",
                    boxShadow:
                      "0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(212,175,55,0.08) inset",
                    background:
                      "linear-gradient(180deg, #0a0a0a 0%, #050505 100%)",
                    cursor: "zoom-in",
                  }}
                  onMouseMove={(e) => {
                    const r = e.currentTarget.getBoundingClientRect();
                    const x = ((e.clientX - r.left) / r.width) * 100;
                    const y = ((e.clientY - r.top) / r.height) * 100;
                    e.currentTarget.style.setProperty("--zx", `${x}%`);
                    e.currentTarget.style.setProperty("--zy", `${y}%`);
                  }}
                >
                  {active && (
                    <img
                      key={imgSrc}
                      src={imgSrc}
                      alt={active.nome}
                      className="absolute inset-0 w-full h-full object-cover crossfade-img transition-transform duration-500 ease-out group-hover:scale-[2]"
                      style={{
                        filter: "contrast(1.05) saturate(1.04)",
                        transformOrigin: "var(--zx, 50%) var(--zy, 50%)",
                        objectPosition: active.slug === "vigor" ? "65% 50%" : "50% 50%",
                      }}
                    />
                  )}
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%)",
                    }}
                  />
                </div>
              );
            })()}
          </section>

          {/* DIREITA — seleção */}
          <section className="lg:col-span-6 relative">
            <div className="relative" style={{ zIndex: 1 }}>

            <div className="max-w-md mx-auto lg:mx-0">
              <p
                className="text-[10px] uppercase tracking-[0.5em] mb-4"
                style={{ color: "rgba(212,175,55,0.75)" }}
              >
                Etapa 02 · Modalidade
              </p>
              <h1
                className="font-display font-light leading-none"
                style={{
                  fontSize: "clamp(34px, 3.6vw, 52px)",
                  letterSpacing: "0.05em",
                  color: "#f4ead0",
                }}
              >
                {modalidade.nome.toUpperCase()}
              </h1>
              <p
                className="mt-4 italic font-light"
                style={{
                  fontFamily: '"Fraunces",serif',
                  color: "rgba(255,255,255,0.65)",
                  fontSize: "15px",
                  letterSpacing: "0.02em",
                }}
              >
                Escolha uma assinatura da modalidade.
              </p>

              <div
                className="my-10 h-px w-20"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(212,175,55,0.7), transparent)",
                }}
              />

              {/* Botões das linhas */}
              <div className="flex flex-wrap gap-3">
                {linhas.map((l) => {
                  const isActive = l.slug === activeSlug;
                  return (
                    <button
                      key={l.slug}
                      type="button"
                      onClick={() => setActiveSlug(l.slug)}
                      onMouseEnter={(e) => {
                        setHoverSlug(l.slug);
                        if (!isActive) {
                          e.currentTarget.style.borderColor =
                            "rgba(212,175,55,0.75)";
                          e.currentTarget.style.color = "#f4d77a";
                        }
                      }}
                      onFocus={() => setHoverSlug(l.slug)}
                      className="transition-all duration-500"
                      style={{
                        padding: "12px 26px",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "11px",
                        letterSpacing: "0.4em",
                        textTransform: "uppercase",
                        color: isActive ? "#0a0a0a" : "rgba(244,215,122,0.9)",
                        background: isActive ? "#d4af37" : "transparent",
                        border: isActive
                          ? "1px solid #d4af37"
                          : "1px solid rgba(212,175,55,0.35)",
                        boxShadow: isActive
                          ? "0 0 28px rgba(212,175,55,0.35)"
                          : "none",
                      }}
                      onMouseLeave={(e) => {
                        setHoverSlug(undefined);
                        if (!isActive) {
                          e.currentTarget.style.borderColor =
                            "rgba(212,175,55,0.35)";
                          e.currentTarget.style.color =
                            "rgba(244,215,122,0.9)";
                        }
                      }}
                      onBlur={() => setHoverSlug(undefined)}
                    >
                      {l.slug === "strata" ? "STRATA" : l.nome}
                    </button>
                  );
                })}
              </div>

              {/* Detalhes da linha ativa */}
              {active && (
                <div key={`info-${active.slug}`} className="mt-14 reveal-info">
                  <div className="mt-12">
                    <button
                      type="button"
                      onClick={() => navigate(`/atelie/linha/${active.slug}`)}
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
                    </button>
                  </div>
                </div>
              )}
            </div>
            </div>
          </section>
        </div>
      </main>

      <style>{`
        @keyframes crossfade-img {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .crossfade-img { animation: crossfade-img 0.7s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes reveal-info {
          0% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .reveal-info { animation: reveal-info 0.45s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>
    </div>
  );
};

export default AtelieModalidade;
