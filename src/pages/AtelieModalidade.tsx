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
            {modalidade.slug === "ciclismo" && (
              <>
                <div
                  aria-hidden
                  className="absolute -inset-x-6 -inset-y-10 lg:-inset-y-16 lg:-right-12 lg:-left-6 overflow-hidden pointer-events-none"
                  style={{ zIndex: 0 }}
                >
                  <img
                    src={ciclismoBg}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover ciclismo-bg-anim"
                    style={{ filter: "contrast(1.1) saturate(1.05)" }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.55) 35%, rgba(5,5,5,0.35) 70%, rgba(5,5,5,0.85) 100%), radial-gradient(ellipse 80% 70% at 60% 50%, rgba(212,175,55,0.10) 0%, transparent 65%)",
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(5,5,5,0.6) 0%, transparent 20%, transparent 80%, rgba(5,5,5,0.8) 100%)",
                    }}
                  />
                </div>
                <style>{`
                  @keyframes ciclismo-bg-zoom {
                    0% { transform: scale(1.08); }
                    100% { transform: scale(1.15); }
                  }
                  .ciclismo-bg-anim {
                    animation: ciclismo-bg-zoom 18s ease-in-out infinite alternate;
                  }
                `}</style>
              </>
            )}
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
