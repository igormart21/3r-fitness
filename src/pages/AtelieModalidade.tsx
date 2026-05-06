import { useEffect, useState } from "react";
import { Link, useParams, Navigate, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { MODALIDADES, LINHAS } from "@/data/atelie";
import triathlonCinematic from "@/assets/triathlon-cinematic.jpg";
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
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    if (hash === "#modalidade-linhas") {
      // Aguarda render para garantir que a seção exista
      requestAnimationFrame(() => {
        const el = document.getElementById("modalidade-linhas");
        if (el) {
          const rect = el.getBoundingClientRect();
          const targetCenter = rect.top + window.scrollY + rect.height / 2;
          window.scrollTo({ top: Math.max(0, targetCenter - window.innerHeight / 2), behavior: "auto" });
        }
      });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
    if (slug) {
      import("@/stores/modalidadeStore").then(({ useModalidadeStore }) =>
        useModalidadeStore.getState().setModalidade(slug),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const smoothScrollToLinhas = () => {
    const el = document.getElementById("modalidade-linhas");
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const startY = window.scrollY;
    // Center the linhas section in viewport so cards + "Explorar linha" button are fully visible
    const targetCenter = rect.top + startY + rect.height / 2;
    const endY = Math.max(0, targetCenter - window.innerHeight / 2);
    const distance = endY - startY;
    const duration = 1800;
    let startTime: number | null = null;
    const easeInOut = (t: number) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, startY + distance * easeInOut(progress));
      if (elapsed < duration) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

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

  // Background cinematográfico por modalidade (usa imagem da própria modalidade como fallback)
  const heroBg = modalidade.slug === "ciclismo" ? ciclismoBg : modalidade.img;

  return (
    <div className="w-full text-white atelie-page-fade-in" style={{ backgroundColor: "#050505" }}>
      <style>{`
        @keyframes atelie-page-fade-in { from { opacity: 0; } to { opacity: 1; } }
        .atelie-page-fade-in { animation: atelie-page-fade-in 700ms ease-out both; }
        @media (prefers-reduced-motion: reduce) { .atelie-page-fade-in { animation: none !important; } }
      `}</style>
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

      {/* 1. HERO + 2. FAIXA — ocultos no Triathlon (vai direto para "O Ateliê Triatlo") */}
      {modalidade.slug !== "triathlon" && (
        <>
          <section className="relative w-screen h-screen overflow-hidden">
            <img
              src={heroBg}
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover modalidade-hero-zoom"
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
              <div className="max-w-xl modalidade-fade-in">
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
                  {modalidade.nome.toUpperCase()}
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
                  {modalidade.subtitulo}.
                </p>
              </div>
            </div>
          </section>

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
        </>
      )}

      {/* 3. PRODUTOS */}
      <section
        id="modalidade-linhas"
        className="relative w-full py-28 md:py-40 overflow-hidden"
        style={{ backgroundColor: "#000" }}
      >
        {modalidade.slug === "triathlon" && (
          <>
            <img
              src={triathlonCinematic}
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover triathlon-linhas-zoom"
              style={{
                objectPosition: "center 38%",
                filter: "contrast(1.06) saturate(0.92) brightness(0.9)",
              }}
            />
            <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ backgroundColor: "rgba(0,0,0,0.62)" }} />
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.10) 28%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.10) 72%, rgba(0,0,0,0.55) 100%)",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 8% 48%, rgba(212,175,55,0.16) 0%, rgba(212,175,55,0.05) 14%, rgba(212,175,55,0) 32%)",
                mixBlendMode: "screen",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)" }}
            />
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 pointer-events-none"
              style={{ height: "22%", background: "linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0) 100%)" }}
            />
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 pointer-events-none"
              style={{ height: "30%", background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.95) 100%)" }}
            />
            <style>{`
              @keyframes triathlon-linhas-zoom {
                0% { transform: scale(1); }
                100% { transform: scale(1.06); }
              }
              .triathlon-linhas-zoom {
                animation: triathlon-linhas-zoom 18s ease-in-out infinite alternate;
                will-change: transform;
              }
              @media (prefers-reduced-motion: reduce) {
                .triathlon-linhas-zoom { animation: none !important; }
              }
            `}</style>
          </>
        )}
        <div className="relative z-10 container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-24 atelie-linhas-fade">
            <p
              className="text-[10px] uppercase mb-5"
              style={{ color: "rgba(212,175,55,0.7)", letterSpacing: "0.7em" }}
            >
              {modalidade.slug === "triathlon" ? "Endurance Collection" : "Assinaturas"}
            </p>
            <h2
              className="font-display font-extralight"
              style={{
                fontSize: "clamp(30px, 3.4vw, 52px)",
                letterSpacing: "0.14em",
                color: "#f4ead0",
                textTransform: "uppercase",
              }}
            >
              {modalidade.slug === "triathlon"
                ? "O Ateliê Triatlo"
                : `As linhas de ${modalidade.nome.toLowerCase()}`}
            </h2>
            <div
              className="mx-auto mt-8 h-px"
              style={{
                width: "64px",
                background:
                  "linear-gradient(90deg, transparent, rgba(212,175,55,0.85), transparent)",
              }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-5xl mx-auto">
            {linhas.map((l, idx) => (
              <div
                key={l.slug}
                className="atelie-linha-card group flex flex-col items-center text-center"
                style={{
                  position: "relative",
                  padding: "26px 22px 30px",
                  background:
                    "linear-gradient(180deg, rgba(15,15,15,0.55) 0%, rgba(5,5,5,0.62) 100%)",
                  backdropFilter: "blur(14px) saturate(1.05)",
                  WebkitBackdropFilter: "blur(14px) saturate(1.05)",
                  border: "1px solid rgba(212,175,55,0.18)",
                  boxShadow:
                    "0 24px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)",
                  animation: `atelie-card-rise 900ms cubic-bezier(0.22,1,0.36,1) ${idx * 120}ms both`,
                  transition: "transform 700ms cubic-bezier(0.22,1,0.36,1), box-shadow 700ms ease, border-color 700ms ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.borderColor = "rgba(212,175,55,0.42)";
                  e.currentTarget.style.boxShadow =
                    "0 36px 80px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 0 1px rgba(212,175,55,0.14)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.borderColor = "rgba(212,175,55,0.18)";
                  e.currentTarget.style.boxShadow =
                    "0 24px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)";
                }}
              >
                <div
                  className="relative w-full aspect-[3/4] overflow-hidden mb-7"
                  style={{
                    background: l.cardFit === "contain"
                      ? "radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.14) 0%, #050505 70%)"
                      : "radial-gradient(ellipse at 50% 55%, rgba(212,175,55,0.10) 0%, transparent 65%)",
                  }}
                >
                  <img
                    src={l.imagens.ouro}
                    alt={l.nome}
                    loading="lazy"
                    className={`w-full h-full ${l.cardFit === "contain" ? "object-contain p-4" : "object-cover"} transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]`}
                    style={{ filter: "contrast(1.06) saturate(1.05) brightness(1.02)" }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none opacity-70 transition-opacity duration-700 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(244,215,122,0.18) 0%, transparent 70%)",
                      mixBlendMode: "screen",
                    }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.45) 100%)",
                    }}
                  />
                </div>
                <h3
                  className="font-display font-extralight"
                  style={{
                    fontSize: "clamp(18px, 1.4vw, 22px)",
                    letterSpacing: "0.34em",
                    color: "#f4ead0",
                    textTransform: "uppercase",
                  }}
                >
                  {l.nome}
                </h3>
                <p
                  className="mt-3 italic font-light"
                  style={{
                    fontFamily: '"Fraunces",serif',
                    color: "rgba(255,255,255,0.55)",
                    fontSize: "13px",
                    letterSpacing: "0.04em",
                  }}
                >
                  {l.assinatura}
                </p>
                <button
                  type="button"
                  onClick={() => navigate(`/atelie/linha/${l.slug}`)}
                  className="mt-7 inline-flex items-center gap-3 transition-all duration-700"
                  style={{
                    padding: "11px 24px",
                    color: "#d4af37",
                    border: "1px solid rgba(212,175,55,0.45)",
                    background: "transparent",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "9.5px",
                    letterSpacing: "0.5em",
                    textTransform: "uppercase",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#d4af37";
                    e.currentTarget.style.color = "#0a0a0a";
                    e.currentTarget.style.boxShadow = "0 0 30px rgba(212,175,55,0.32)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#d4af37";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <span className="h-px w-4" style={{ background: "currentColor" }} />
                  Explorar linha
                  <span className="h-px w-4" style={{ background: "currentColor" }} />
                </button>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes atelie-card-rise {
            0% { opacity: 0; transform: translateY(28px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes atelie-linhas-fade {
            0% { opacity: 0; transform: translateY(14px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .atelie-linhas-fade { animation: atelie-linhas-fade 1100ms cubic-bezier(0.22,1,0.36,1) both; }
          @media (prefers-reduced-motion: reduce) {
            .atelie-linha-card, .atelie-linhas-fade { animation: none !important; }
          }
        `}</style>
      </section>

      {/* 4. STORYTELLING CINEMATOGRÁFICO */}
      <section className="relative w-screen h-[70vh] overflow-hidden">
        <img
          src={heroBg}
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
                smoothScrollToLinhas();
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
        @keyframes modalidade-hero-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.04); }
        }
        .modalidade-hero-zoom {
          animation: modalidade-hero-zoom 10s ease-in-out infinite alternate;
        }
        @keyframes modalidade-fade-in {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .modalidade-fade-in {
          animation: modalidade-fade-in 1.2s cubic-bezier(0.22,1,0.36,1) both;
        }
      `}</style>
    </div>
  );
};

export default AtelieModalidade;
