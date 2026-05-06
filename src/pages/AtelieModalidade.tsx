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
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
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
            <div className="mt-10">
              <button
                type="button"
                onClick={() => {
                  smoothScrollToLinhas();
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

      {/* 2. FAIXA DE TRANSIÇÃO / HERO CINEMATOGRÁFICO (triathlon) */}
      {modalidade.slug === "triathlon" ? (
        <TriathlonCinematicHero />
      ) : (
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
      )}

      {/* 3. PRODUTOS */}
      <section id="modalidade-linhas" className="w-full bg-black py-28 md:py-40">
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
              As linhas de {modalidade.nome.toLowerCase()}
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
