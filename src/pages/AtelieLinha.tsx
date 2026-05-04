import { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { LINHAS, MODALIDADES, type Material, type Forma } from "@/data/atelie";
import vigorMasculino from "@/assets/linha-vigor-masculino.jpg";
import vigorMasculinoPrata from "@/assets/linha-vigor-masculino-prata.jpg";
import veloxRoyaleOuroMasc from "@/assets/linha-velox-royale-ouro-masculino.jpg";
import veloxRoyaleOuroFem from "@/assets/linha-velox-royale-ouro-feminino.jpg";
import veloxRoyalePrataMasc from "@/assets/linha-velox-royale-prata-masculino.jpg";
import aeronPrataMasc from "@/assets/linha-aeron-prata-masculino.jpg";
import aeronPrataFem from "@/assets/linha-aeron-prata-feminino.jpg";

const AtelieLinha = () => {
  const { slug } = useParams();
  const linha = slug ? LINHAS[slug] : undefined;

  const [material, setMaterial] = useState<Material>("ouro");
  const [forma, setForma] = useState<Forma>("masculino");
  const [revealKey, setRevealKey] = useState(0);

  useEffect(() => {
    setRevealKey((k) => k + 1);
  }, [material, forma, slug]);

  useEffect(() => {
    if (!linha) return;
    Object.values(linha.imagens).forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [linha]);

  if (!linha) return <Navigate to="/atelie/modalidades" replace />;

  const parentModalidade = MODALIDADES.find((m) =>
    m.linhas.includes(linha.slug),
  );

  const imgSrc =
    linha.slug === "vigor" && forma === "masculino" && material === "ouro"
      ? vigorMasculino
      : linha.slug === "vigor" && forma === "masculino" && material === "prata"
      ? vigorMasculinoPrata
      : linha.slug === "horizonte" && forma === "masculino" && material === "ouro"
      ? veloxRoyaleOuroMasc
      : linha.slug === "horizonte" && forma === "feminino" && material === "ouro"
      ? veloxRoyaleOuroFem
      : linha.slug === "horizonte" && forma === "masculino" && material === "prata"
      ? veloxRoyalePrataMasc
      : linha.slug === "cadencia" && forma === "masculino" && material === "prata"
      ? aeronPrataMasc
      : linha.slug === "cadencia" && forma === "feminino" && material === "prata"
      ? aeronPrataFem
      : linha.imagens[material];
  const lightTone =
    material === "ouro"
      ? "radial-gradient(ellipse 60% 55% at 50% 45%, rgba(244,200,90,0.22) 0%, transparent 70%)"
      : "radial-gradient(ellipse 60% 55% at 50% 45%, rgba(200,215,235,0.16) 0%, transparent 70%)";

  return (
    <div
      className="min-h-screen w-full text-white"
      style={{ backgroundColor: "#050505" }}
    >
      <header className="absolute top-0 inset-x-0 z-30">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <Link
            to={
              parentModalidade
                ? `/atelie/modalidade/${parentModalidade.slug}`
                : "/atelie/modalidades"
            }
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white/70 hover:text-[#d4af37] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {parentModalidade ? parentModalidade.nome : "Modalidades"}
          </Link>
          <span
            className="hidden md:block font-display italic text-sm tracking-[0.3em]"
            style={{ color: "#d4af37" }}
          >
            {linha.nome}
          </span>
          <span className="w-16" />
        </div>
      </header>

      <main className="relative w-full min-h-screen pt-24 md:pt-28 pb-12">
        <div className="container mx-auto max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* ESQUERDA — imagem */}
          <section className="lg:col-span-6 relative">
            <div
              className="relative w-full overflow-hidden mx-auto group"
              style={{
                aspectRatio: "1122 / 946",
                maxHeight: "calc(100vh - 180px)",
                background:
                  "linear-gradient(180deg, #0a0a0a 0%, #050505 100%)",
                border: "1px solid rgba(212,175,55,0.18)",
                boxShadow:
                  "0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(212,175,55,0.08) inset",
              }}
            >
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none transition-opacity duration-700 group-hover:opacity-80"
                style={{ background: lightTone }}
              />
              <img
                key={revealKey}
                src={imgSrc}
                alt={`${linha.nome} — ${material === "ouro" ? "Ouro 18K" : "Prata 925"}`}
                className="absolute inset-0 w-full h-full object-contain reveal-piece will-change-transform"
                style={{
                  filter:
                    material === "ouro"
                      ? "saturate(1.05) contrast(1.04) brightness(1.02)"
                      : "saturate(0.92) contrast(1.05) brightness(1) hue-rotate(-2deg)",
                  transformOrigin: "50% 42%",
                  transition:
                    "transform 600ms cubic-bezier(0.22,1,0.36,1), filter 600ms ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.1)";
                  e.currentTarget.style.filter =
                    material === "ouro"
                      ? "saturate(1.1) contrast(1.08) brightness(1.05)"
                      : "saturate(0.95) contrast(1.08) brightness(1.03) hue-rotate(-2deg)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.filter =
                    material === "ouro"
                      ? "saturate(1.05) contrast(1.04) brightness(1.02)"
                      : "saturate(0.92) contrast(1.05) brightness(1) hue-rotate(-2deg)";
                }}
              />
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 55%, rgba(0,0,0,0.6) 100%)",
                }}
              />
            </div>
          </section>

          {/* DIREITA — interface */}
          <section className="lg:col-span-6">
            <div className="max-w-md mx-auto lg:mx-0">
              <p
                className="text-[10px] uppercase tracking-[0.5em] mb-5"
                style={{ color: "rgba(212,175,55,0.75)" }}
              >
                Etapa 03 · Linha autoral
              </p>
              <h1
                className="font-display font-light leading-none"
                style={{
                  fontSize: "clamp(44px, 5vw, 68px)",
                  letterSpacing: "0.04em",
                  color: "#f4ead0",
                }}
              >
                {linha.nome}
              </h1>
              <p
                className="mt-4 italic font-light"
                style={{
                  fontFamily: '"Fraunces","Cormorant Garamond",serif',
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
                  color: "rgba(255,255,255,0.72)",
                  fontSize: "16px",
                  fontFamily: '"Fraunces",serif',
                }}
              >
                {linha.frase}
              </p>

              <div className="mt-12 space-y-9">
                <Selector
                  label="Material"
                  options={[
                    { value: "ouro", label: "Ouro 18K" },
                    { value: "prata", label: "Prata 925" },
                  ]}
                  value={material}
                  onChange={(v) => setMaterial(v as Material)}
                />
                {linha.slug !== "halter" && (
                  <Selector
                    label="Forma"
                    options={[
                      { value: "masculino", label: "Masculino" },
                      { value: "feminino", label: "Feminino" },
                    ]}
                    value={forma}
                    onChange={(v) => setForma(v as Forma)}
                  />
                )}
              </div>

              <div className="mt-14">
                <button
                  type="button"
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
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#d4af37";
                  }}
                >
                  <span
                    className="h-px w-5"
                    style={{ background: "currentColor" }}
                  />
                  Selecionar peça
                  <span
                    className="h-px w-5"
                    style={{ background: "currentColor" }}
                  />
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <style>{`
        @keyframes reveal-piece {
          0% { opacity: 0; transform: scale(0.985); filter: blur(4px); }
          100% { opacity: 1; transform: scale(1.02); filter: blur(0); }
        }
        .reveal-piece { animation: reveal-piece 0.4s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>
    </div>
  );
};

const Selector = ({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) => {
  return (
    <div>
      <p
        className="text-[10px] uppercase tracking-[0.45em] mb-4"
        style={{ color: "rgba(255,255,255,0.45)" }}
      >
        {label}
      </p>
      <div className="flex flex-wrap gap-3">
        {options.map((o) => {
          const active = o.value === value;
          return (
            <button
              key={o.value}
              type="button"
              onClick={() => onChange(o.value)}
              className="transition-all duration-500"
              style={{
                padding: "10px 22px",
                fontFamily: "Inter, sans-serif",
                fontSize: "10.5px",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: active ? "#0a0a0a" : "rgba(244,215,122,0.85)",
                background: active ? "#d4af37" : "transparent",
                border: active
                  ? "1px solid #d4af37"
                  : "1px solid rgba(212,175,55,0.32)",
                boxShadow: active
                  ? "0 0 24px rgba(212,175,55,0.35)"
                  : "none",
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.borderColor =
                    "rgba(212,175,55,0.7)";
                  e.currentTarget.style.color = "#f4d77a";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.borderColor =
                    "rgba(212,175,55,0.32)";
                  e.currentTarget.style.color =
                    "rgba(244,215,122,0.85)";
                }
              }}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AtelieLinha;
