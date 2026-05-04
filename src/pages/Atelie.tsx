import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import vigorPrata from "@/assets/linha-vigor-prata-clean.jpg";
import vigorOuro from "@/assets/linha-vigor-ouro-clean.jpg";
import imperiumPrata from "@/assets/linha-imperium-prata-clean.jpg";
import imperiumOuro from "@/assets/linha-imperium-ouro-clean.jpg";
import triadePrata from "@/assets/linha-triade-prata-clean.jpg";
import triadeOuro from "@/assets/linha-triade-ouro-clean.jpg";

type Material = "ouro" | "prata";
type Forma = "classico" | "slim";

type Linha = {
  id: string;
  nome: string;
  frase: string;
  imagens: Record<Material, string>;
};

const LINHAS: Linha[] = [
  {
    id: "vigor",
    nome: "VIGOR",
    frase: "Força que se constrói diariamente.",
    imagens: { ouro: vigorOuro, prata: vigorPrata },
  },
  {
    id: "imperium",
    nome: "IMPERIUM",
    frase: "O domínio sobre os próprios limites.",
    imagens: { ouro: imperiumOuro, prata: imperiumPrata },
  },
  {
    id: "triade",
    nome: "TRÍADE",
    frase: "A travessia que define o espírito.",
    imagens: { ouro: triadeOuro, prata: triadePrata },
  },
];

const Atelie = () => {
  const [linhaId, setLinhaId] = useState("vigor");
  const [material, setMaterial] = useState<Material>("ouro");
  const [forma, setForma] = useState<Forma>("classico");
  const [revealKey, setRevealKey] = useState(0);

  const linha = useMemo(() => LINHAS.find((l) => l.id === linhaId)!, [linhaId]);
  const imgSrc = linha.imagens[material];

  // re-trigger reveal animation on any change
  useEffect(() => {
    setRevealKey((k) => k + 1);
  }, [linhaId, material, forma]);

  // preload all
  useEffect(() => {
    LINHAS.forEach((l) => {
      Object.values(l.imagens).forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    });
  }, []);

  const lightTone =
    material === "ouro"
      ? "radial-gradient(ellipse 60% 55% at 50% 45%, rgba(244,200,90,0.22) 0%, transparent 70%)"
      : "radial-gradient(ellipse 60% 55% at 50% 45%, rgba(200,215,235,0.16) 0%, transparent 70%)";

  return (
    <div
      className="min-h-screen w-full text-white"
      style={{ backgroundColor: "#050505" }}
    >
      {/* Header */}
      <header className="absolute top-0 inset-x-0 z-30">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white/70 hover:text-[#d4af37] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Início
          </Link>
          <span
            className="hidden md:block font-display italic text-sm tracking-[0.3em]"
            style={{ color: "#d4af37" }}
          >
            ATELIÊ 3R
          </span>
          <span className="w-16" />
        </div>
      </header>

      <main className="relative w-full min-h-screen pt-28 md:pt-32 pb-24">
        <div className="container mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* ESQUERDA — imagem */}
          <section className="lg:col-span-7 relative">
            <div
              className="relative w-full overflow-hidden"
              style={{
                aspectRatio: "4 / 5",
                background:
                  "linear-gradient(180deg, #0a0a0a 0%, #050505 100%)",
                border: "1px solid rgba(212,175,55,0.18)",
                boxShadow:
                  "0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(212,175,55,0.08) inset",
              }}
            >
              {/* Iluminação contextual (quente / fria) */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none transition-opacity duration-700"
                style={{ background: lightTone }}
              />
              {/* Imagem com fade + zoom suave */}
              <img
                key={revealKey}
                src={imgSrc}
                alt={`${linha.nome} — ${material === "ouro" ? "Ouro 18K" : "Prata 925"}`}
                className="absolute inset-0 w-full h-full object-contain reveal-piece"
                style={{
                  filter:
                    material === "ouro"
                      ? "saturate(1.05) contrast(1.04) brightness(1.02)"
                      : "saturate(0.92) contrast(1.05) brightness(1) hue-rotate(-2deg)",
                }}
              />
              {/* Vinheta */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 55%, rgba(0,0,0,0.6) 100%)",
                }}
              />
              {/* Marca discreta */}
              <div
                className="absolute bottom-4 right-5 text-[9px] uppercase tracking-[0.5em]"
                style={{ color: "rgba(212,175,55,0.55)" }}
              >
                Ateliê 3R · {forma === "classico" ? "Clássico" : "Slim"}
              </div>
            </div>
          </section>

          {/* DIREITA — interface */}
          <section className="lg:col-span-5">
            <div className="max-w-md mx-auto lg:mx-0">
              <p
                className="text-[10px] uppercase tracking-[0.5em] mb-5"
                style={{ color: "rgba(212,175,55,0.75)" }}
              >
                Linha autoral
              </p>
              <h1
                className="font-display font-light leading-none"
                style={{
                  fontSize: "clamp(44px, 5vw, 68px)",
                  letterSpacing: "0.04em",
                  color: "#f4ead0",
                }}
                key={`name-${linha.id}`}
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
                Assinatura
              </p>

              <div
                className="my-8 h-px w-20"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(212,175,55,0.7), transparent)",
                }}
              />

              <p
                className="font-light leading-relaxed"
                style={{
                  color: "rgba(255,255,255,0.72)",
                  fontSize: "16px",
                  fontFamily: '"Fraunces",serif',
                  fontStyle: "italic",
                }}
              >
                {linha.frase}
              </p>

              {/* SELETORES */}
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
                <Selector
                  label="Forma"
                  options={[
                    { value: "classico", label: "Clássico" },
                    { value: "slim", label: "Slim" },
                  ]}
                  value={forma}
                  onChange={(v) => setForma(v as Forma)}
                />
                <Selector
                  label="Linha"
                  options={LINHAS.map((l) => ({
                    value: l.id,
                    label: l.nome,
                  }))}
                  value={linhaId}
                  onChange={setLinhaId}
                />
              </div>

              {/* CTA */}
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
                    e.currentTarget.style.borderColor = "#d4af37";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#d4af37";
                    e.currentTarget.style.borderColor = "rgba(212,175,55,0.55)";
                  }}
                >
                  <span
                    className="h-px w-5 transition-all duration-500"
                    style={{ background: "currentColor" }}
                  />
                  Selecionar peça
                  <span
                    className="h-px w-5 transition-all duration-500"
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
        .reveal-piece { animation: reveal-piece 0.7s cubic-bezier(0.22,1,0.36,1) both; }
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
                  e.currentTarget.style.borderColor = "rgba(212,175,55,0.7)";
                  e.currentTarget.style.color = "#f4d77a";
                  e.currentTarget.style.boxShadow =
                    "0 0 18px rgba(212,175,55,0.18)";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.borderColor =
                    "rgba(212,175,55,0.32)";
                  e.currentTarget.style.color = "rgba(244,215,122,0.85)";
                  e.currentTarget.style.boxShadow = "none";
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

export default Atelie;
