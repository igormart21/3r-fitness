import { useState, useRef, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, Check, Loader2, Sparkles, ChevronDown, Camera, Wand2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useCartStore } from "@/stores/cartStore";
import { storefrontApiRequest, STOREFRONT_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { supabase } from "@/integrations/supabase/client";
import estiloUndergroundImg from "@/assets/estilo-underground.jpg";
import estiloClassicoImg from "@/assets/estilo-classico.jpg";
import materialPrataImg from "@/assets/material-prata.jpg";
import materialOuroImg from "@/assets/material-ouro.jpg";
// Bonecos OURO (Ouro 18K)
import bonecoMascClassicoOuro from "@/assets/boneco-masc-classico-ouro.jpg";
import bonecoMascUndergroundOuro from "@/assets/boneco-masc-underground-ouro.jpg";
import bonecoFemClassicoOuro from "@/assets/boneco-fem-classico-ouro.jpg";
import bonecoFemUndergroundOuro from "@/assets/boneco-fem-underground-ouro.jpg";
// Bonecos PRATA (Prata 925)
import bonecoMascClassicoPrata from "@/assets/boneco-masc-classico-prata.jpg";
import bonecoMascUndergroundPrata from "@/assets/boneco-masc-underground-prata.jpg";
import bonecoFemClassicoPrata from "@/assets/boneco-fem-classico-prata.jpg";
import bonecoFemUndergroundPrata from "@/assets/boneco-fem-underground-prata.jpg";
// Bonecos CORREDORES (específicos da modalidade)
import bonecoCorrFemClassicoOuro from "@/assets/boneco-corredores-fem-classico-ouro.jpg";
import bonecoCorrFemUndergroundOuro from "@/assets/boneco-corredores-fem-underground-ouro.jpg";
import bonecoCorrMascClassicoOuro from "@/assets/boneco-corredores-masc-classico-ouro.jpg";
import bonecoCorrMascUndergroundOuro from "@/assets/boneco-corredores-masc-underground-ouro.jpg";
import bonecoCorrFemClassicoPrata from "@/assets/boneco-corredores-fem-classico-prata.jpg";
import bonecoCorrFemUndergroundPrata from "@/assets/boneco-corredores-fem-underground-prata.jpg";
import bonecoCorrMascClassicoPrata from "@/assets/boneco-corredores-masc-classico-prata.jpg";
import bonecoCorrMascUndergroundPrata from "@/assets/boneco-corredores-masc-underground-prata.jpg";
// Bonecos MUSCULAÇÃO
import bonecoMuscFemClassicoOuro from "@/assets/boneco-musculacao-fem-classico-ouro.jpg";
import bonecoMuscFemUndergroundOuro from "@/assets/boneco-musculacao-fem-underground-ouro.jpg";
import bonecoMuscMascClassicoOuro from "@/assets/boneco-musculacao-masc-classico-ouro.jpg";
import bonecoMuscMascUndergroundOuro from "@/assets/boneco-musculacao-masc-underground-ouro.jpg";
import bonecoMuscFemClassicoPrata from "@/assets/boneco-musculacao-fem-classico-prata.jpg";
import bonecoMuscFemUndergroundPrata from "@/assets/boneco-musculacao-fem-underground-prata.jpg";
import bonecoMuscMascClassicoPrata from "@/assets/boneco-musculacao-masc-classico-prata.jpg";
import bonecoMuscMascUndergroundPrata from "@/assets/boneco-musculacao-masc-underground-prata.jpg";
// Bonecos FISICULTURISMO
import bonecoFisiFemClassicoOuro from "@/assets/boneco-fisiculturismo-fem-classico-ouro.jpg";
import bonecoFisiFemUndergroundOuro from "@/assets/boneco-fisiculturismo-fem-underground-ouro.jpg";
import bonecoFisiMascClassicoOuro from "@/assets/boneco-fisiculturismo-masc-classico-ouro.jpg";
import bonecoFisiMascUndergroundOuro from "@/assets/boneco-fisiculturismo-masc-underground-ouro.jpg";
import bonecoFisiFemClassicoPrata from "@/assets/boneco-fisiculturismo-fem-classico-prata.jpg";
import bonecoFisiFemUndergroundPrata from "@/assets/boneco-fisiculturismo-fem-underground-prata.jpg";
import bonecoFisiMascClassicoPrata from "@/assets/boneco-fisiculturismo-masc-classico-prata.jpg";
import bonecoFisiMascUndergroundPrata from "@/assets/boneco-fisiculturismo-masc-underground-prata.jpg";
// Bikes CICLISTA (Speed = pneu liso, Mountain = pneu com ranhuras)
import bikeSpeedClassicoOuro from "@/assets/bike-speed-classico-ouro.jpg";
import bikeSpeedClassicoPrata from "@/assets/bike-speed-classico-prata.jpg";
import bikeMountainClassicoOuro from "@/assets/bike-mountain-classico-ouro.jpg";
import bikeMountainClassicoPrata from "@/assets/bike-mountain-classico-prata.jpg";
import bikeSpeedUndergroundFemOuro from "@/assets/bike-speed-underground-feminino-ouro.jpg";
import bikeSpeedUndergroundFemPrata from "@/assets/bike-speed-underground-feminino-prata.jpg";
import bikeMountainUndergroundFemOuro from "@/assets/bike-mountain-underground-feminino-ouro.jpg";
import bikeMountainUndergroundFemPrata from "@/assets/bike-mountain-underground-feminino-prata.jpg";
import bikeSpeedUndergroundMascOuro from "@/assets/bike-speed-underground-masculino-ouro.jpg";
import bikeSpeedUndergroundMascPrata from "@/assets/bike-speed-underground-masculino-prata.jpg";
import bikeMountainUndergroundMascOuro from "@/assets/bike-mountain-underground-masculino-ouro.jpg";
import bikeMountainUndergroundMascPrata from "@/assets/bike-mountain-underground-masculino-prata.jpg";
// Bonecos CROSSFIT
import bonecoCrossfitMascClassicoPrata from "@/assets/boneco-crossfit-masc-classico-prata.jpg";
import bonecoCrossfitMascUndergroundPrata from "@/assets/boneco-crossfit-masc-underground-prata.jpg";
import bonecoCrossfitMascClassicoOuro from "@/assets/boneco-crossfit-masc-classico-ouro.jpg";
import bonecoCrossfitMascUndergroundOuro from "@/assets/boneco-crossfit-masc-underground-ouro.jpg";
import bonecoCrossfitFemClassicoPrata from "@/assets/boneco-crossfit-fem-classico-prata.jpg";
import bonecoCrossfitFemUndergroundPrata from "@/assets/boneco-crossfit-fem-underground-prata.jpg";
import bonecoCrossfitFemClassicoOuro from "@/assets/boneco-crossfit-fem-classico-ouro.jpg";
import bonecoCrossfitFemUndergroundOuro from "@/assets/boneco-crossfit-fem-underground-ouro.jpg";
import bonecoTriatlonMascClassicoPrata from "@/assets/boneco-triatlon-masc-classico-prata.jpg";
import bonecoTriatlonMascUndergroundPrata from "@/assets/boneco-triatlon-masc-underground-prata.jpg";
import bonecoTriatlonFemClassicoPrata from "@/assets/boneco-triatlon-fem-classico-prata.jpg";
import bonecoTriatlonFemUndergroundPrata from "@/assets/boneco-triatlon-fem-underground-prata.jpg";
import bonecoTriatlonMascClassicoOuro from "@/assets/boneco-triatlon-masc-classico-ouro.jpg";
import bonecoTriatlonMascUndergroundOuro from "@/assets/boneco-triatlon-masc-underground-ouro.jpg";
import bonecoTriatlonFemClassicoOuro from "@/assets/boneco-triatlon-fem-classico-ouro.jpg";
import bonecoTriatlonFemUndergroundOuro from "@/assets/boneco-triatlon-fem-underground-ouro.jpg";
import maoColar3RFitness from "@/assets/mao-colar-3r-fitness.png";

const ESTILO_IMAGENS: Record<string, string> = {
  Underground: estiloUndergroundImg,
  "Clássico": estiloClassicoImg,
};

// Mapa padrão de bonecos por Material × Gênero × Estilo (fallback compartilhado).
// Usado quando uma modalidade ainda não tem ilustrações próprias.
const BONECOS_DEFAULT: Record<string, Record<string, Record<string, string>>> = {
  "Ouro 18K": {
    Masculino: { "Clássico": bonecoMascClassicoOuro, Underground: bonecoMascUndergroundOuro },
    Feminino: { "Clássico": bonecoFemClassicoOuro, Underground: bonecoFemUndergroundOuro },
  },
  "Prata 925": {
    Masculino: { "Clássico": bonecoMascClassicoPrata, Underground: bonecoMascUndergroundPrata },
    Feminino: { "Clássico": bonecoFemClassicoPrata, Underground: bonecoFemUndergroundPrata },
  },
};

// Bonecos por Modalidade × Material × Gênero × Estilo.
// Para customizar uma modalidade específica, sobrescreva aqui.
// Estrutura: BONECOS[modalidade][material][genero][estilo] = imagem
const BONECOS: Record<string, Record<string, Record<string, Record<string, string>>>> = {
  Corredores: {
    "Ouro 18K": {
      Masculino: { "Clássico": bonecoCorrMascClassicoOuro, Underground: bonecoCorrMascUndergroundOuro },
      Feminino: { "Clássico": bonecoCorrFemClassicoOuro, Underground: bonecoCorrFemUndergroundOuro },
    },
    "Prata 925": {
      Masculino: { "Clássico": bonecoCorrMascClassicoPrata, Underground: bonecoCorrMascUndergroundPrata },
      Feminino: { "Clássico": bonecoCorrFemClassicoPrata, Underground: bonecoCorrFemUndergroundPrata },
    },
  },
  "Musculação": {
    "Ouro 18K": {
      Masculino: { "Clássico": bonecoMuscMascClassicoOuro, Underground: bonecoMuscMascUndergroundOuro },
      Feminino: { "Clássico": bonecoMuscFemClassicoOuro, Underground: bonecoMuscFemUndergroundOuro },
    },
    "Prata 925": {
      Masculino: { "Clássico": bonecoMuscMascClassicoPrata, Underground: bonecoMuscMascUndergroundPrata },
      Feminino: { "Clássico": bonecoMuscFemClassicoPrata, Underground: bonecoMuscFemUndergroundPrata },
    },
  },
  Fisiculturismo: {
    "Ouro 18K": {
      Masculino: { "Clássico": bonecoFisiMascClassicoOuro, Underground: bonecoFisiMascUndergroundOuro },
      Feminino: { "Clássico": bonecoFisiFemClassicoOuro, Underground: bonecoFisiFemUndergroundOuro },
    },
    "Prata 925": {
      Masculino: { "Clássico": bonecoFisiMascClassicoPrata, Underground: bonecoFisiMascUndergroundPrata },
      Feminino: { "Clássico": bonecoFisiFemClassicoPrata, Underground: bonecoFisiFemUndergroundPrata },
    },
  },
  Ciclista: BONECOS_DEFAULT,
  Crossfit: {
    "Ouro 18K": {
      Masculino: {
        "Clássico": bonecoCrossfitMascClassicoOuro,
        Underground: bonecoCrossfitMascUndergroundOuro,
      },
      Feminino: {
        "Clássico": bonecoCrossfitFemUndergroundOuro,
        Underground: bonecoCrossfitFemClassicoOuro,
      },
    },
    "Prata 925": {
      Masculino: {
        "Clássico": bonecoCrossfitMascClassicoPrata,
        Underground: bonecoCrossfitMascUndergroundPrata,
      },
      Feminino: {
        "Clássico": bonecoCrossfitFemUndergroundPrata,
        Underground: bonecoCrossfitFemClassicoPrata,
      },
    },
  },
  Triatlon: {
    "Ouro 18K": {
      Masculino: {
        "Clássico": bonecoTriatlonMascClassicoOuro,
        Underground: bonecoTriatlonMascUndergroundOuro,
      },
      Feminino: {
        "Clássico": bonecoTriatlonFemClassicoOuro,
        Underground: bonecoTriatlonFemUndergroundOuro,
      },
    },
    "Prata 925": {
      Masculino: {
        "Clássico": bonecoTriatlonMascClassicoPrata,
        Underground: bonecoTriatlonMascUndergroundPrata,
      },
      Feminino: {
        "Clássico": bonecoTriatlonFemClassicoPrata,
        Underground: bonecoTriatlonFemUndergroundPrata,
      },
    },
  },
};

const MATERIAL_IMAGENS: Record<string, string> = {
  "Prata 925": materialPrataImg,
  "Ouro 18K": materialOuroImg,
};

type Categoria =
  | "Corredores"
  | "Musculação"
  | "Fisiculturismo"
  | "Ciclista"
  | "Crossfit"
  | "Triatlon";

type Material = "Prata 925" | "Ouro 18K";
type Estilo = "Botão Reta" | "Underground" | "Clássico";
type Tamanho = "Grande" | "Médio" | "Pequeno";
type Genero = "Masculino" | "Feminino";
type PerfilBike = "Speed" | "Mountain Bike";

const CATEGORIAS: Categoria[] = [
  "Corredores",
  "Musculação",
  "Fisiculturismo",
  "Ciclista",
  "Crossfit",
  "Triatlon",
];

const MATERIAIS: Material[] = ["Prata 925", "Ouro 18K"];
const ESTILOS: Estilo[] = ["Underground", "Clássico"];
const TAMANHOS: Tamanho[] = ["Grande", "Médio", "Pequeno"];
const TAMANHO_LEGENDAS: Record<Tamanho, string> = {
  Grande: "3 cm",
  "Médio": "2,5 cm",
  Pequeno: "2 cm",
};
const GENEROS: Genero[] = ["Masculino", "Feminino"];
const PERFIS_BIKE: PerfilBike[] = ["Speed", "Mountain Bike"];

// Bikes do Ciclista por Perfil × Gênero × Material × Estilo.
// Clássico = só a bike (independe de gênero). Underground = bike + boneco (varia por gênero).
const BIKES: Record<PerfilBike, Record<Genero, Record<Material, Record<"Clássico" | "Underground", string>>>> = {
  Speed: {
    Masculino: {
      "Ouro 18K": { "Clássico": bikeSpeedClassicoOuro, Underground: bikeSpeedUndergroundMascOuro },
      "Prata 925": { "Clássico": bikeSpeedClassicoPrata, Underground: bikeSpeedUndergroundMascPrata },
    },
    Feminino: {
      "Ouro 18K": { "Clássico": bikeSpeedClassicoOuro, Underground: bikeSpeedUndergroundFemOuro },
      "Prata 925": { "Clássico": bikeSpeedClassicoPrata, Underground: bikeSpeedUndergroundFemPrata },
    },
  },
  "Mountain Bike": {
    Masculino: {
      "Ouro 18K": { "Clássico": bikeMountainClassicoOuro, Underground: bikeMountainUndergroundMascOuro },
      "Prata 925": { "Clássico": bikeMountainClassicoPrata, Underground: bikeMountainUndergroundMascPrata },
    },
    Feminino: {
      "Ouro 18K": { "Clássico": bikeMountainClassicoOuro, Underground: bikeMountainUndergroundFemOuro },
      "Prata 925": { "Clássico": bikeMountainClassicoPrata, Underground: bikeMountainUndergroundFemPrata },
    },
  },
};
const KM_OPCOES = ["5K", "10K", "21K", "42K"] as const;
type CtaFieldKey = "nome" | "km" | "data" | "tempo";

/* ----- Componentes auxiliares (visual de luxo) ----- */

const SectionTitle = ({
  numeral,
  label,
  hint,
}: {
  numeral: string;
  label: string;
  hint?: string;
}) => (
  <div className="text-center mb-6 md:mb-8">
    <div className="flex items-center justify-center gap-4 mb-3">
      <span className="h-px w-12 md:w-24 joia-gold-divider" />
      <span
        className="font-display text-[10px] md:text-xs tracking-[0.5em] joia-gold-text"
        style={{ textShadow: "0 0 18px hsl(43 75% 55% / 0.45)" }}
      >
        {numeral}
      </span>
      <span className="h-px w-12 md:w-24 joia-gold-divider" />
    </div>
    <h2 className="font-display text-xl md:text-2xl tracking-[0.2em] uppercase joia-gold-text inline-block">
      {label}
    </h2>
    {hint && (
      <p className="mt-1.5 text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground/80 italic">
        {hint}
      </p>
    )}
  </div>
);

const Divider = () => (
  <div className="flex items-center justify-center gap-3 my-12 md:my-14">
    <span className="h-px w-20 joia-gold-divider" />
    <span className="h-1.5 w-1.5 rounded-full bg-accent joia-glow-dot" />
    <span className="h-px w-20 joia-gold-divider" />
  </div>
);

const LuxButton = ({
  selected,
  onClick,
  children,
  size = "default",
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  size?: "default" | "lg";
}) => (
  <button
    onClick={onClick}
    className={`relative font-display tracking-[0.15em] uppercase text-xs md:text-sm transition-all duration-300 border rounded-none ${
      size === "lg" ? "px-7 py-3.5" : "px-5 py-2.5"
    } ${
      selected
        ? "border-accent text-accent-foreground shadow-[0_0_24px_-4px_hsl(var(--accent)/0.55),inset_0_0_0_1px_hsl(var(--accent)/0.5)]"
        : "border-border/60 text-foreground/85 hover:border-accent/70 hover:text-accent hover:shadow-[0_0_18px_-6px_hsl(var(--accent)/0.4)]"
    }`}
    style={
      selected
        ? {
            backgroundImage:
              "linear-gradient(135deg, hsl(43 65% 22% / 0.9) 0%, hsl(43 75% 35% / 0.85) 50%, hsl(43 65% 22% / 0.9) 100%)",
          }
        : undefined
    }
  >
    {selected && (
      <>
        <span className="absolute -top-[5px] -left-[5px] h-2 w-2 border-t border-l border-accent" />
        <span className="absolute -top-[5px] -right-[5px] h-2 w-2 border-t border-r border-accent" />
        <span className="absolute -bottom-[5px] -left-[5px] h-2 w-2 border-b border-l border-accent" />
        <span className="absolute -bottom-[5px] -right-[5px] h-2 w-2 border-b border-r border-accent" />
        <span className="absolute -top-2.5 -right-2.5 h-5 w-5 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-md">
          <Check className="h-3 w-3" strokeWidth={3} />
        </span>
      </>
    )}
    {children}
  </button>
);

const ShowcaseFrame = ({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) => (
  <div className="animate-in fade-in zoom-in-95 duration-500">
    <div className="relative p-3 bg-card">
      <span className="absolute top-0 left-0 h-3 w-3 border-t border-l border-accent" />
      <span className="absolute top-0 right-0 h-3 w-3 border-t border-r border-accent" />
      <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-accent" />
      <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-accent" />
      <div className="w-64 h-64 md:w-72 md:h-72 overflow-hidden bg-white">
        <img
          src={src}
          alt={alt}
          width={768}
          height={768}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-110"
        />
      </div>
    </div>
    {caption && (
      <p className="mt-3 text-center text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        {caption}
      </p>
    )}
  </div>
);

/* Imagem com efeito lupa: ao passar o mouse, uma área circular ampliada segue o cursor */
const MagnifierImage = ({
  src,
  alt,
  className = "",
  zoom = 2.4,
  lensSize = 140,
  fit = "cover",
}: {
  src: string;
  alt: string;
  className?: string;
  zoom?: number;
  lensSize?: number;
  fit?: "cover" | "contain";
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [box, setBox] = useState({ w: 0, h: 0 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPos({ x, y });
    setBox({ w: rect.width, h: rect.height });
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden cursor-zoom-in ${className}`}
      onMouseEnter={(e) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) setBox({ w: rect.width, h: rect.height });
        setShow(true);
        onMove(e);
      }}
      onMouseMove={onMove}
      onMouseLeave={() => setShow(false)}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`w-full h-full ${fit === "contain" ? "object-contain" : "object-cover"} select-none pointer-events-none`}
      />
      {show && box.w > 0 && (
        <div
          className="pointer-events-none absolute rounded-full border-2 border-accent shadow-[0_8px_30px_-4px_hsl(var(--accent)/0.6)] hidden md:block"
          style={{
            width: lensSize,
            height: lensSize,
            top: pos.y - lensSize / 2,
            left: pos.x - lensSize / 2,
            backgroundImage: `url(${src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${box.w * zoom}px ${box.h * zoom}px`,
            backgroundPosition: `${-pos.x * zoom + lensSize / 2}px ${-pos.y * zoom + lensSize / 2}px`,
          }}
        />
      )}
    </div>
  );
};


const CtaField = ({
  label,
  isOpen,
  hasValue,
  valuePreview,
  disabled,
  onToggle,
  children,
}: {
  label: string;
  isOpen: boolean;
  hasValue: boolean;
  valuePreview?: string;
  disabled?: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) => (
  <div
    className={`relative border transition-all duration-300 ${
      disabled
        ? "border-border/30 bg-card/10 opacity-40"
        : isOpen
        ? "border-accent bg-accent/[0.04]"
        : hasValue
        ? "border-accent/60 bg-card/40"
        : "border-border/60 bg-card/20 hover:border-accent/70"
    }`}
  >
    <button
      onClick={onToggle}
      disabled={disabled}
      className="w-full flex items-center justify-between px-5 py-4 text-left group disabled:cursor-not-allowed"
    >
      <span className="flex items-center gap-3">
        <span
          className={`h-5 w-5 rounded-full border flex items-center justify-center transition-colors ${
            hasValue ? "border-accent bg-accent text-accent-foreground" : "border-border/70"
          }`}
        >
          {hasValue && <Check className="h-3 w-3" strokeWidth={3} />}
        </span>
        <span className="font-display tracking-[0.2em] uppercase text-xs md:text-sm">
          {label}
        </span>
        {valuePreview && !isOpen && (
          <span className="text-xs text-accent/90 italic normal-case tracking-normal">
            · {valuePreview}
          </span>
        )}
      </span>
      <ChevronDown
        className={`h-4 w-4 text-accent transition-transform duration-300 ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </button>
    {isOpen && !disabled && (
      <div className="px-5 pb-5 pt-1 animate-in fade-in slide-in-from-top-1 duration-200">
        {children}
      </div>
    )}
  </div>
);


const CriarMinhaJoia = () => {
  const [categoria, setCategoria] = useState<Categoria | null>(null);
  const [material, setMaterial] = useState<Material | null>(null);
  const [estilo, setEstilo] = useState<Estilo | null>(null);
  const [tamanho, setTamanho] = useState<Tamanho | null>(null);
  const [genero, setGenero] = useState<Genero | null>(null);
  const [perfilBike, setPerfilBike] = useState<PerfilBike | null>(null);

  const [foto, setFoto] = useState<string | null>(null);
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [km, setKm] = useState("");
  const [tempo, setTempo] = useState("");
  const [adicionando, setAdicionando] = useState(false);
  const [openField, setOpenField] = useState<CtaFieldKey | null>(null);

  // Apenas UMA opção de personalização final pode ser preenchida por joia
  const personalizacaoEscolhida: CtaFieldKey | null = nome.trim()
    ? "nome"
    : km
    ? "km"
    : data.trim()
    ? "data"
    : tempo.trim()
    ? "tempo"
    : null;

  const limparPersonalizacao = () => {
    setNome("");
    setKm("");
    setData("");
    setTempo("");
  };

  const abrirCampoExclusivo = (key: CtaFieldKey) => {
    if (openField === key) {
      setOpenField(null);
      return;
    }
    // Se já existe valor em outro campo, limpa antes de trocar
    if (personalizacaoEscolhida && personalizacaoEscolhida !== key) {
      limparPersonalizacao();
    }
    setOpenField(key);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const addItem = useCartStore((s) => s.addItem);
  const getCheckoutUrl = useCartStore((s) => s.getCheckoutUrl);
  const navigate = useNavigate();

  // ===== Seção VII — Foto → Pingente (inscrição independente) =====
  const [pingenteNome, setPingenteNome] = useState("");
  const [pingenteKm, setPingenteKm] = useState("");
  const [pingenteData, setPingenteData] = useState("");
  const [pingenteTempo, setPingenteTempo] = useState("");
  const [openPingenteField, setOpenPingenteField] = useState<CtaFieldKey | null>(null);
  const [gerandoPingente, setGerandoPingente] = useState(false);
  const [pingenteGerado, setPingenteGerado] = useState<string | null>(null);
  const [fotoPingente, setFotoPingente] = useState<string | null>(null);
  const fotoPingenteInputRef = useRef<HTMLInputElement>(null);

  const inscricaoPingenteEscolhida: CtaFieldKey | null = pingenteNome.trim()
    ? "nome"
    : pingenteKm
    ? "km"
    : pingenteData.trim()
    ? "data"
    : pingenteTempo.trim()
    ? "tempo"
    : null;

  const inscricaoPingenteValor = () => {
    if (pingenteNome.trim()) return pingenteNome.trim();
    if (pingenteKm) return pingenteKm;
    if (pingenteData.trim()) return pingenteData.trim();
    if (pingenteTempo.trim()) return pingenteTempo.trim();
    return "";
  };

  const limparInscricaoPingente = () => {
    setPingenteNome("");
    setPingenteKm("");
    setPingenteData("");
    setPingenteTempo("");
  };

  const abrirCampoPingenteExclusivo = (key: CtaFieldKey) => {
    if (openPingenteField === key) {
      setOpenPingenteField(null);
      return;
    }
    if (inscricaoPingenteEscolhida && inscricaoPingenteEscolhida !== key) {
      limparInscricaoPingente();
    }
    setOpenPingenteField(key);
  };

  const gerarPingenteDaFoto = async (dataUrl: string) => {
    setPingenteGerado(null);
    setGerandoPingente(true);
    try {
      const { data: result, error } = await supabase.functions.invoke("gerar-pingente", {
        body: {
          imageDataUrl: dataUrl,
          material: material ?? "Prata 925",
          estilo: estilo ?? "Clássico",
          genero: genero ?? "Masculino",
          inscricao: inscricaoPingenteValor(),
        },
      });
      if (error) throw error;
      if (!result?.imageUrl) throw new Error("Imagem não retornada");
      setPingenteGerado(result.imageUrl);
      toast.success("Seu pingente foi modelado!");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Não foi possível gerar o pingente. Tente novamente.");
    } finally {
      setGerandoPingente(false);
    }
  };

  const handleFotoPingenteUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("A foto deve ter no máximo 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      setFotoPingente(dataUrl);
      gerarPingenteDaFoto(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleFotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("A foto deve ter no máximo 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setFoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSelecionarMaterial = (m: Material) => {
    if (material === m) {
      setMaterial(null);
      setEstilo(null);
      return;
    }
    setMaterial(m);
    setEstilo(null);
  };

  const handleAdicionarAoCarrinho = async () => {
    if (!personalizacaoEscolhida) {
      toast.error("Escolha uma inscrição para sua joia (Nome, KM, Data ou Tempo)");
      return;
    }

    setAdicionando(true);
    try {
      // Busca um produto disponível na loja para anexar a personalização
      const data1 = await storefrontApiRequest(STOREFRONT_QUERY, { first: 5, query: null });
      const products: ShopifyProduct[] = data1?.data?.products?.edges || [];
      const product = products.find((p) =>
        p.node.variants.edges.some((v) => v.node.availableForSale)
      );

      if (!product) {
        toast.error("Nenhum produto disponível para personalização. Cadastre uma joia na loja primeiro.");
        return;
      }
      const variant = product.node.variants.edges.find((v) => v.node.availableForSale)!.node;

      const personalizacao = [
        { name: "Categoria", value: categoria! },
        { name: "Material", value: material! },
        { name: "Estilo", value: estilo! },
        { name: "Tamanho", value: tamanho! },
        { name: "Gênero", value: genero! },
        { name: "Nome gravado", value: nome },
        ...(data ? [{ name: "Data", value: data }] : []),
        ...(km ? [{ name: "KM", value: km }] : []),
        ...(tempo ? [{ name: "Tempo", value: tempo }] : []),
        ...(foto ? [{ name: "Foto", value: "Anexada pelo cliente" }] : []),
      ];

      await addItem({
        product,
        variantId: variant.id,
        variantTitle: variant.title,
        price: variant.price,
        quantity: 1,
        selectedOptions: personalizacao,
      });

      toast.success("Joia personalizada adicionada ao carrinho!");
      // Redireciona para o catálogo para o cliente continuar comprando
      setTimeout(() => navigate("/catalogo"), 600);
    } catch (err) {
      console.error(err);
      toast.error("Não foi possível adicionar ao carrinho. Tente novamente.");
    } finally {
      setAdicionando(false);
    }
  };

  const handleProsseguirParaPagamento = async () => {
    await handleAdicionarAoCarrinho();
    // Aguarda o cart sincronizar e abre checkout
    setTimeout(() => {
      const url = getCheckoutUrl();
      if (url) {
        window.open(url, "_blank");
      } else {
        toast.error("Não foi possível abrir o checkout. Verifique sua sacola.");
      }
    }, 800);
  };

  return (
    <div
      className="min-h-screen text-foreground relative overflow-hidden"
      style={{
        // Preto fosco + dourado (escopado a esta página)
        backgroundColor: "hsl(0 0% 7%)",
        backgroundImage:
          "radial-gradient(ellipse 80% 50% at 50% -10%, hsl(43 65% 18% / 0.55), transparent 60%), radial-gradient(ellipse 60% 40% at 90% 30%, hsl(43 65% 14% / 0.4), transparent 65%), radial-gradient(ellipse 50% 35% at 10% 75%, hsl(43 65% 12% / 0.35), transparent 70%)",
        ["--background" as any]: "0 0% 7%",
        ["--foreground" as any]: "43 65% 70%",
        ["--card" as any]: "0 0% 9%",
        ["--card-foreground" as any]: "43 65% 70%",
        ["--popover" as any]: "0 0% 9%",
        ["--popover-foreground" as any]: "43 65% 70%",
        ["--primary" as any]: "43 65% 55%",
        ["--primary-foreground" as any]: "0 0% 7%",
        ["--secondary" as any]: "0 0% 12%",
        ["--secondary-foreground" as any]: "43 65% 70%",
        ["--muted" as any]: "0 0% 12%",
        ["--muted-foreground" as any]: "43 30% 60%",
        ["--accent" as any]: "43 65% 55%",
        ["--accent-foreground" as any]: "0 0% 7%",
        ["--border" as any]: "43 55% 45%",
        ["--input" as any]: "43 55% 45%",
        ["--ring" as any]: "43 65% 55%",
      }}
    >
      {/* Efeitos visuais escopados a esta página */}
      <style>{`
        @keyframes joia-shimmer {
          0% { background-position: 200% 50%; }
          100% { background-position: -200% 50%; }
        }
        @keyframes joia-glow-pulse {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 1; }
        }
        @keyframes joia-enter {
          0% { opacity: 0; transform: translateY(18px) scale(0.985); filter: blur(6px); }
          60% { filter: blur(0); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        @keyframes joia-fade-down {
          0% { opacity: 0; transform: translateY(-12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes joia-pop {
          0% { opacity: 0; transform: translateY(10px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .joia-gold-text {
          background: linear-gradient(110deg, hsl(43 55% 45%) 0%, hsl(43 75% 65%) 25%, hsl(48 95% 82%) 50%, hsl(43 75% 65%) 75%, hsl(43 55% 45%) 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: joia-shimmer 6s linear infinite;
        }
        .joia-gold-divider {
          background: linear-gradient(90deg, transparent 0%, hsl(43 65% 55% / 0.6) 50%, transparent 100%);
        }
        .joia-glow-dot {
          box-shadow: 0 0 12px hsl(43 75% 60% / 0.8), 0 0 4px hsl(48 95% 75%);
          animation: joia-glow-pulse 2.8s ease-in-out infinite;
        }
        .joia-card-glow {
          background: radial-gradient(ellipse at top, hsl(43 65% 18% / 0.35), transparent 70%);
        }
        .joia-glass {
          position: relative;
          background:
            linear-gradient(135deg, hsl(0 0% 100% / 0.04) 0%, hsl(0 0% 100% / 0.015) 40%, hsl(43 65% 25% / 0.06) 100%);
          -webkit-backdrop-filter: blur(14px) saturate(140%);
          backdrop-filter: blur(14px) saturate(140%);
          border: 1px solid hsl(43 65% 55% / 0.22);
          box-shadow:
            inset 0 1px 0 hsl(0 0% 100% / 0.06),
            inset 0 -1px 0 hsl(0 0% 0% / 0.4),
            0 20px 60px -20px hsl(0 0% 0% / 0.55),
            0 0 0 1px hsl(43 65% 55% / 0.06);
        }
        .joia-glass::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(180deg, hsl(43 75% 65% / 0.08), transparent 30%);
          mix-blend-mode: screen;
        }
        .joia-glass-soft {
          background:
            linear-gradient(135deg, hsl(0 0% 100% / 0.035) 0%, hsl(43 65% 25% / 0.05) 100%);
          -webkit-backdrop-filter: blur(10px) saturate(130%);
          backdrop-filter: blur(10px) saturate(130%);
          border: 1px solid hsl(43 65% 55% / 0.25);
          box-shadow:
            inset 0 1px 0 hsl(0 0% 100% / 0.05),
            0 8px 28px -12px hsl(0 0% 0% / 0.5);
        }
        .joia-fade-down { animation: joia-fade-down 0.7s ease-out both; }
        .joia-step-enter { animation: joia-enter 0.55s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .joia-stagger > * {
          opacity: 0;
          animation: joia-pop 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .joia-stagger > *:nth-child(1) { animation-delay: 0.05s; }
        .joia-stagger > *:nth-child(2) { animation-delay: 0.12s; }
        .joia-stagger > *:nth-child(3) { animation-delay: 0.19s; }
        .joia-stagger > *:nth-child(4) { animation-delay: 0.26s; }
        .joia-stagger > *:nth-child(5) { animation-delay: 0.33s; }
        .joia-stagger > *:nth-child(6) { animation-delay: 0.40s; }
        .joia-stagger > *:nth-child(7) { animation-delay: 0.47s; }
        .joia-stagger > *:nth-child(8) { animation-delay: 0.54s; }
        .joia-stagger > *:nth-child(n+9) { animation-delay: 0.6s; }
        @media (prefers-reduced-motion: reduce) {
          .joia-gold-text, .joia-glow-dot, .joia-fade-down, .joia-step-enter,
          .joia-stagger > * { animation: none !important; opacity: 1 !important; }
        }
      `}</style>

      {/* Header */}
      <header className="border-b border-accent/20 bg-card/40 backdrop-blur-md sticky top-0 z-10 relative joia-fade-down">
        <span className="absolute bottom-0 left-0 right-0 h-px joia-gold-divider" />
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
          <div className="text-sm text-muted-foreground">Crie sua joia</div>
        </div>
      </header>

      <StepperExperience
        categoria={categoria} setCategoria={setCategoria}
        material={material} handleSelecionarMaterial={handleSelecionarMaterial}
        genero={genero} setGenero={setGenero}
        perfilBike={perfilBike} setPerfilBike={setPerfilBike}
        tamanho={tamanho} setTamanho={setTamanho}
        estilo={estilo} setEstilo={setEstilo}
        nome={nome} setNome={setNome}
        km={km} setKm={setKm}
        data={data} setData={setData}
        tempo={tempo} setTempo={setTempo}
        openField={openField} abrirCampoExclusivo={abrirCampoExclusivo}
        personalizacaoEscolhida={personalizacaoEscolhida}
        limparPersonalizacao={limparPersonalizacao} setOpenField={setOpenField}
        fotoPingente={fotoPingente} fotoPingenteInputRef={fotoPingenteInputRef}
        handleFotoPingenteUpload={handleFotoPingenteUpload}
        gerandoPingente={gerandoPingente} pingenteGerado={pingenteGerado}
        gerarPingenteDaFoto={gerarPingenteDaFoto}
        pingenteNome={pingenteNome} setPingenteNome={setPingenteNome}
        pingenteKm={pingenteKm} setPingenteKm={setPingenteKm}
        pingenteData={pingenteData} setPingenteData={setPingenteData}
        pingenteTempo={pingenteTempo} setPingenteTempo={setPingenteTempo}
        openPingenteField={openPingenteField}
        abrirCampoPingenteExclusivo={abrirCampoPingenteExclusivo}
        inscricaoPingenteEscolhida={inscricaoPingenteEscolhida}
        limparInscricaoPingente={limparInscricaoPingente}
        setOpenPingenteField={setOpenPingenteField}
        adicionando={adicionando}
        handleAdicionarAoCarrinho={handleAdicionarAoCarrinho}
        handleProsseguirParaPagamento={handleProsseguirParaPagamento}
      />
    </div>
  );
};

/* ===================== STEPPER HORIZONTAL DE LUXO ===================== */

type StepperProps = {
  categoria: Categoria | null; setCategoria: (v: Categoria | null) => void;
  material: Material | null; handleSelecionarMaterial: (m: Material) => void;
  genero: Genero | null; setGenero: (v: Genero | null) => void;
  perfilBike: PerfilBike | null; setPerfilBike: (v: PerfilBike | null) => void;
  tamanho: Tamanho | null; setTamanho: (v: Tamanho | null) => void;
  estilo: Estilo | null; setEstilo: (v: Estilo | null) => void;
  nome: string; setNome: (v: string) => void;
  km: string; setKm: (v: string) => void;
  data: string; setData: (v: string) => void;
  tempo: string; setTempo: (v: string) => void;
  openField: CtaFieldKey | null; abrirCampoExclusivo: (k: CtaFieldKey) => void;
  personalizacaoEscolhida: CtaFieldKey | null;
  limparPersonalizacao: () => void; setOpenField: (k: CtaFieldKey | null) => void;
  fotoPingente: string | null;
  fotoPingenteInputRef: React.RefObject<HTMLInputElement>;
  handleFotoPingenteUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  gerandoPingente: boolean; pingenteGerado: string | null;
  gerarPingenteDaFoto: (dataUrl: string) => void;
  pingenteNome: string; setPingenteNome: (v: string) => void;
  pingenteKm: string; setPingenteKm: (v: string) => void;
  pingenteData: string; setPingenteData: (v: string) => void;
  pingenteTempo: string; setPingenteTempo: (v: string) => void;
  openPingenteField: CtaFieldKey | null;
  abrirCampoPingenteExclusivo: (k: CtaFieldKey) => void;
  inscricaoPingenteEscolhida: CtaFieldKey | null;
  limparInscricaoPingente: () => void;
  setOpenPingenteField: (k: CtaFieldKey | null) => void;
  adicionando: boolean;
  handleAdicionarAoCarrinho: () => void;
  handleProsseguirParaPagamento: () => void;
};

const STEP_LABELS = [
  "Modalidade",
  "Material",
  "Tamanho",
  "Estilo",
  "Inscrição",
  "Foto em pingente",
];

const StepperExperience = (p: StepperProps) => {
  const [step, setStep] = useState(0);
  const [showBalao, setShowBalao] = useState(false);
  const total = STEP_LABELS.length;

  const stepCompleted = useMemo(() => [
    !!p.categoria,
    !!p.material,
    !!p.tamanho,
    !!p.estilo && !!p.genero,
    !!p.personalizacaoEscolhida,
    true,
  ], [p.categoria, p.material, p.tamanho, p.estilo, p.genero, p.personalizacaoEscolhida]);

  const allReady =
    !!p.categoria && !!p.material && !!p.genero && !!p.tamanho && !!p.estilo && !!p.personalizacaoEscolhida;

  const goPrev = () => setStep((s) => Math.max(0, s - 1));
  const goNext = () => setStep((s) => Math.min(total - 1, s + 1));
  const autoAdvance = (fromStep: number) => {
    // Avança apenas se o usuário ainda está na etapa que acabou de preencher
    setStep((s) => (s === fromStep && fromStep < total - 1 ? fromStep + 1 : s));
  };
  const withAdvance = (fromStep: number, fn: () => void) => () => {
    fn();
    setTimeout(() => autoAdvance(fromStep), 320);
  };

  return (
    <main className="container mx-auto px-4 pt-8 pb-12 md:pt-10 md:pb-16 max-w-7xl relative">
      {/* Decorativo: mão segurando colar 3R Fitness entrando pela borda direita */}
      <img
        src={maoColar3RFitness}
        alt="Pingente 3R Fitness em colar de ouro 18K"
        className="hidden md:block pointer-events-none select-none fixed top-0 right-0 w-48 lg:w-64 xl:w-72 z-20 drop-shadow-[0_20px_40px_rgba(212,175,55,0.35)] opacity-95"
        style={{ animation: "joia-fade-down 1.2s ease-out both", transform: "translateX(8%)" }}
      />
      <div className="text-center mb-6 md:mb-8">
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="h-px w-8 bg-accent/60" />
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          <span className="h-px w-8 bg-accent/60" />
        </div>
        <p className="text-[10px] uppercase tracking-[0.4em] text-accent/80 mb-2 flex items-center justify-center gap-2 flex-wrap">
          <span>Edição Personalizada</span>
          <span className="text-accent/40">·</span>
          <span className="text-accent/80 inline-flex flex-col items-center">
            <span>Renata Ramos Ribeiro</span>
            <span className="mt-1 h-px w-full bg-accent/70" />
          </span>
        </p>
        <h1 className="font-display text-3xl md:text-5xl tracking-tight mb-2 joia-gold-text inline-block">
          Crie sua joia
        </h1>
      </div>

      <div className="mb-8 md:mb-10 max-w-5xl mx-auto">
        <div className="flex items-center justify-between gap-1.5 md:gap-2">
          {STEP_LABELS.map((label, i) => {
            const isActive = i === step;
            const isDone = stepCompleted[i] && i !== step;
            return (
              <button
                key={label}
                onClick={() => setStep(i)}
                className="group flex-1 flex flex-col items-center gap-1.5"
              >
                <div className="w-full h-px bg-border/40 relative overflow-hidden">
                  <span
                    className={`absolute inset-0 bg-accent transition-transform duration-500 origin-left ${
                      isActive || isDone ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`h-1.5 w-1.5 rounded-full transition-all ${
                      isActive ? "bg-accent scale-150" : isDone ? "bg-accent" : "bg-border/60"
                    }`}
                  />
                  <span
                    className={`hidden md:inline text-[9px] uppercase tracking-[0.3em] transition-colors ${
                      isActive ? "text-accent" : isDone ? "text-foreground/70" : "text-muted-foreground/50"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")} · {label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
        <p className="md:hidden text-center mt-3 text-[10px] uppercase tracking-[0.35em] text-accent">
          {String(step + 1).padStart(2, "0")} · {STEP_LABELS[step]}
        </p>
      </div>

      {/* Carrossel de escolhas — clique para editar */}
      {(() => {
        const escolhas: { stepIdx: number; label: string; value: string | null }[] = [
          { stepIdx: 0, label: "Modalidade", value: p.categoria },
          { stepIdx: 1, label: "Material", value: p.material },
          { stepIdx: 2, label: "Tamanho", value: p.tamanho },
          { stepIdx: 3, label: "Gênero", value: p.genero },
          { stepIdx: 3, label: "Estilo", value: p.estilo },
          {
            stepIdx: 4,
            label: "Inscrição",
            value: p.nome.trim() || p.km || p.data.trim() || p.tempo.trim() || null,
          },
        ];
        const selecionadas = escolhas.filter((e) => !!e.value);
        if (selecionadas.length === 0) return null;
        return (
          <div className="mb-5 max-w-5xl mx-auto">
            <p className="text-center text-[9px] uppercase tracking-[0.4em] text-muted-foreground/70 mb-2.5">
              Suas escolhas · clique para alterar
            </p>
            <div className="flex gap-2 overflow-x-auto pb-2 px-1 [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:bg-accent/30">
              {selecionadas.map((e) => (
                <button
                  key={e.label}
                  onClick={() => setStep(e.stepIdx)}
                  className="group joia-glass-soft flex items-center gap-2 flex-shrink-0 px-3 py-1.5 rounded-sm hover:border-accent/60 hover:shadow-[0_0_18px_-4px_hsl(43_75%_55%/0.45)] transition-all"
                >
                  <span className="text-[8px] uppercase tracking-[0.3em] text-muted-foreground/70 group-hover:text-accent/80">
                    {String(e.stepIdx + 1).padStart(2, "0")} · {e.label}
                  </span>
                  <span className="text-[10px] tracking-[0.1em] text-accent font-display uppercase whitespace-nowrap">
                    {e.value}
                  </span>
                </button>
              ))}
            </div>
          </div>
        );
      })()}

      <div className="relative">
        <button
          onClick={goPrev}
          disabled={step === 0}
          aria-label="Anterior"
          className="hidden md:flex absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full border border-accent/40 bg-card/60 backdrop-blur items-center justify-center text-accent hover:bg-accent hover:text-accent-foreground transition-all disabled:opacity-20 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={goNext}
          disabled={step === total - 1}
          aria-label="Próximo"
          className="hidden md:flex absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full border border-accent/40 bg-card/60 backdrop-blur items-center justify-center text-accent hover:bg-accent hover:text-accent-foreground transition-all disabled:opacity-20 disabled:cursor-not-allowed"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="overflow-hidden joia-glass relative rounded-sm">
          <span className="absolute top-0 left-0 h-4 w-4 border-t border-l border-accent/70 z-10" />
          <span className="absolute top-0 right-0 h-4 w-4 border-t border-r border-accent/70 z-10" />
          <span className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-accent/70 z-10" />
          <span className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-accent/70 z-10" />

          <div className="relative">
            <StepPanel index={0} step={step} numeral="I" label="Modalidade" hint="A sua jornada">
              <div className="flex flex-wrap gap-2.5 justify-center max-w-2xl mx-auto">
                {CATEGORIAS.map((cat) => (
                  <LuxButton
                    key={cat}
                    selected={p.categoria === cat}
                    onClick={() => {
                      const desmarcar = p.categoria === cat;
                      p.setCategoria(desmarcar ? null : cat);
                      if (!desmarcar) setTimeout(() => autoAdvance(0), 280);
                    }}
                  >
                    {cat}
                  </LuxButton>
                ))}
              </div>
            </StepPanel>

            <StepPanel index={1} step={step} numeral="II" label="Material" hint="Escolha a essência">
              <div className="grid grid-cols-2 gap-3 sm:gap-5 md:gap-8 lg:gap-16 max-w-6xl mx-auto">
                {MATERIAIS.map((m) => {
                  const selected = p.material === m;
                  const legenda = m === "Prata 925" ? "Polimento Espelhado" : "Acabamento Premium";
                  return (
                    <button
                      key={m}
                      onClick={() => {
                        const desmarcar = p.material === m;
                        p.handleSelecionarMaterial(m);
                        if (!desmarcar) setTimeout(() => autoAdvance(1), 280);
                      }}
                      className={`group relative flex flex-col items-center gap-3 p-3 md:p-4 transition-all duration-300 ${
                        selected ? "bg-accent/[0.06]" : "opacity-70 hover:opacity-100"
                      }`}
                    >
                      {selected && (
                        <>
                          <span className="absolute -top-[5px] -left-[5px] h-2.5 w-2.5 border-t border-l border-accent" />
                          <span className="absolute -top-[5px] -right-[5px] h-2.5 w-2.5 border-t border-r border-accent" />
                          <span className="absolute -bottom-[5px] -left-[5px] h-2.5 w-2.5 border-b border-l border-accent" />
                          <span className="absolute -bottom-[5px] -right-[5px] h-2.5 w-2.5 border-b border-r border-accent" />
                          <span className="absolute -top-2.5 -right-2.5 h-5 w-5 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-md z-10">
                            <Check className="h-3 w-3" strokeWidth={3} />
                          </span>
                        </>
                      )}
                      <div
                        className={`relative p-2 md:p-3 bg-card transition-all ${
                          selected ? "" : "grayscale-[40%] group-hover:grayscale-0"
                        }`}
                      >
                        <span className="absolute top-0 left-0 h-3 w-3 border-t border-l border-accent/70" />
                        <span className="absolute top-0 right-0 h-3 w-3 border-t border-r border-accent/70" />
                        <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-accent/70" />
                        <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-accent/70" />
                        <MagnifierImage
                          src={MATERIAL_IMAGENS[m]}
                          alt={`Mostruário ${m}`}
                          className="w-36 h-36 sm:w-48 sm:h-48 md:w-72 md:h-72 lg:w-[26rem] lg:h-[26rem] xl:w-[32rem] xl:h-[32rem] bg-white"
                        />
                      </div>
                      <span
                        className={`font-display tracking-[0.25em] uppercase text-xs md:text-sm transition-colors ${
                          selected ? "text-accent" : "text-foreground/85 group-hover:text-accent"
                        }`}
                      >
                        {m}
                      </span>
                      <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-muted-foreground/80">
                        {legenda}
                      </span>
                    </button>
                  );
                })}
              </div>
            </StepPanel>

            <StepPanel index={2} step={step} numeral="III" label="Tamanho" hint="Medida do pingente">
              <div className="flex flex-wrap gap-6 justify-center">
                {TAMANHOS.map((t) => (
                  <div key={t} className="flex flex-col items-center gap-2">
                    <LuxButton
                      selected={p.tamanho === t}
                      onClick={() => {
                        const desmarcar = p.tamanho === t;
                        p.setTamanho(desmarcar ? null : t);
                        if (!desmarcar) setTimeout(() => autoAdvance(2), 280);
                      }}
                      size="lg"
                    >
                      {t}
                    </LuxButton>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground/80">
                      {TAMANHO_LEGENDAS[t]}
                    </span>
                  </div>
                ))}
              </div>
            </StepPanel>

            <StepPanel index={3} step={step} numeral="IV" label="Estilo" hint="Escolha o gênero e o estilo da peça">
              <div className="max-w-2xl mx-auto mb-5 md:mb-6 px-4 py-3 border border-accent/40 bg-accent/[0.06] text-center relative">
                <span className="absolute top-0 left-0 h-2.5 w-2.5 border-t border-l border-accent" />
                <span className="absolute top-0 right-0 h-2.5 w-2.5 border-t border-r border-accent" />
                <span className="absolute bottom-0 left-0 h-2.5 w-2.5 border-b border-l border-accent" />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 border-b border-r border-accent" />
                <p className="text-[11px] md:text-xs tracking-[0.15em] uppercase text-accent font-medium">
                  Imagens meramente ilustrativas
                </p>
                <p className="text-[11px] md:text-sm text-foreground/85 mt-1 normal-case tracking-normal">
                  A cor e o material do seu pingente será igual ao <span className="text-accent">material escolhido</span> na etapa 2.
                </p>
              </div>

              {/* 1º — Gênero */}
              <div className="mb-8">
                <p className="text-center text-[10px] uppercase tracking-[0.4em] text-accent/80 mb-4">
                  01 · Selecione o gênero
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  {GENEROS.map((g) => (
                    <LuxButton
                      key={g}
                      selected={p.genero === g}
                      onClick={() => {
                        const desmarcar = p.genero === g;
                        if (desmarcar) {
                          p.setGenero(null);
                          p.setPerfilBike(null);
                        } else {
                          p.setGenero(g);
                          // Ao trocar de gênero, limpa estilo e perfil de bike
                          if (p.estilo) p.setEstilo(null);
                          p.setPerfilBike(null);
                        }
                      }}
                      size="lg"
                    >
                      {g}
                    </LuxButton>
                  ))}
                </div>
              </div>

              {/* 1.5º — Perfil da bike (somente Ciclista) */}
              {p.genero && p.categoria === "Ciclista" && (
                <div className="mb-8 animate-in fade-in slide-in-from-bottom-2 duration-400">
                  <p className="text-center text-[10px] uppercase tracking-[0.4em] text-accent/80 mb-4">
                    02 · Selecione o perfil da bike
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {PERFIS_BIKE.map((perfil) => (
                      <LuxButton
                        key={perfil}
                        selected={p.perfilBike === perfil}
                        onClick={() => {
                          const desmarcar = p.perfilBike === perfil;
                          if (desmarcar) {
                            p.setPerfilBike(null);
                          } else {
                            p.setPerfilBike(perfil);
                            if (p.estilo) p.setEstilo(null);
                          }
                        }}
                        size="lg"
                      >
                        {perfil}
                      </LuxButton>
                    ))}
                  </div>
                </div>
              )}

              {/* 2º — Estilo (só após gênero — e, se Ciclista, após perfil da bike) */}
              {p.genero && (p.categoria !== "Ciclista" || p.perfilBike) && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-400">
                  <p className="text-center text-[10px] uppercase tracking-[0.4em] text-accent/80 mb-4">
                    {p.categoria === "Ciclista" ? "03" : "02"} · Escolha o estilo
                  </p>
                  <div className="grid grid-cols-2 gap-3 sm:gap-5 md:gap-8 lg:gap-16 max-w-6xl mx-auto">
                    {ESTILOS.map((e) => {
                      const selected = p.estilo === e;
                      const legenda =
                        e === "Underground"
                          ? p.categoria === "Musculação"
                            ? "Boné e relógio"
                            : p.categoria === "Fisiculturismo"
                              ? "Corpo definido"
                                : p.categoria === "Ciclista"
                                ? "Bike + boneco"
                                : p.categoria === "Triatlon"
                                  ? "Formato medalha"
                                  : p.categoria === "Crossfit"
                                    ? "Formato medalha"
                                    : "Boné, óculos e relógio"
                          : p.categoria === "Ciclista"
                            ? "Apenas a bike"
                            : "Pingente puro";
                      const bikeSrc =
                        p.categoria === "Ciclista" && p.perfilBike && p.material && p.genero
                          ? BIKES[p.perfilBike][p.genero][p.material][e as "Clássico" | "Underground"]
                          : null;
                      const bonecoSrc =
                        bikeSrc ||
                        (p.categoria && p.material && BONECOS[p.categoria]?.[p.material]?.[p.genero!]?.[e]) ||
                        ESTILO_IMAGENS[e];
                      return (
                        <button
                          key={e}
                          onClick={() => {
                            const desmarcar = p.estilo === e;
                            p.setEstilo(desmarcar ? null : e);
                            if (!desmarcar) setTimeout(() => autoAdvance(3), 280);
                          }}
                          className={`group relative flex flex-col items-center gap-3 p-3 md:p-4 transition-all duration-300 ${
                            selected ? "bg-accent/[0.06]" : "hover:bg-accent/[0.03]"
                          }`}
                        >
                          {selected && (
                            <>
                              <span className="absolute -top-[5px] -left-[5px] h-2.5 w-2.5 border-t border-l border-accent" />
                              <span className="absolute -top-[5px] -right-[5px] h-2.5 w-2.5 border-t border-r border-accent" />
                              <span className="absolute -bottom-[5px] -left-[5px] h-2.5 w-2.5 border-b border-l border-accent" />
                              <span className="absolute -bottom-[5px] -right-[5px] h-2.5 w-2.5 border-b border-r border-accent" />
                              <span className="absolute -top-2.5 -right-2.5 h-5 w-5 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-md z-10">
                                <Check className="h-3 w-3" strokeWidth={3} />
                              </span>
                            </>
                          )}
                          <div
                            className={`relative p-2 md:p-3 bg-card transition-all ${
                              selected ? "" : "grayscale-[40%] group-hover:grayscale-0"
                            }`}
                          >
                            <span className="absolute top-0 left-0 h-3 w-3 border-t border-l border-accent/70" />
                            <span className="absolute top-0 right-0 h-3 w-3 border-t border-r border-accent/70" />
                            <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-accent/70" />
                            <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-accent/70" />
                            <MagnifierImage
                              src={bonecoSrc}
                              alt={`Estilo ${e} ${p.genero}`}
                              className="w-36 h-36 sm:w-48 sm:h-48 md:w-72 md:h-72 lg:w-[26rem] lg:h-[26rem] xl:w-[32rem] xl:h-[32rem] bg-white"
                            />
                          </div>
                          <span
                            style={{ fontFamily: "'Inter', sans-serif" }}
                            className={`tracking-[0.25em] uppercase text-xs md:text-sm transition-colors ${
                              selected ? "text-accent" : "text-foreground/85 group-hover:text-accent"
                            }`}
                          >
                            {e}
                          </span>
                          <span
                            style={{ fontFamily: "'Inter', sans-serif" }}
                            className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-muted-foreground/80"
                          >
                            {legenda}
                          </span>
                        </button>
                      );
                     })}
                  </div>
                  <p
                    style={{ fontFamily: "'Fraunces', serif", fontWeight: 400 }}
                    className="mt-6 text-center text-sm md:text-base tracking-[0.02em] text-white"
                  >
                    Pingentes legítimos em <span className="text-accent">Ouro 18K</span> e Prata 925
                  </p>
                </div>
              )}
            </StepPanel>

            <StepPanel index={4} step={step} numeral="V" label="Inscrição" hint="Escolha apenas UMA inscrição para sua joia">
              <div className="max-w-2xl mx-auto space-y-5">
                {/* Informativo + escolha de caminho */}
                <div className="border border-accent/30 bg-card/40 p-5 md:p-6 text-center relative">
                  <span className="absolute top-0 left-0 h-3 w-3 border-t border-l border-accent" />
                  <span className="absolute top-0 right-0 h-3 w-3 border-t border-r border-accent" />
                  <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-accent" />
                  <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-accent" />
                  <p className="text-sm md:text-base text-foreground/90 leading-relaxed">
                    Quer uma joia com seu <span className="text-accent">estilo autêntico e único</span>?
                    Pule para a próxima seção, envie uma foto sua e transforme em pingente exclusivo.
                  </p>
                  <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      onClick={() => setStep(5)}
                      className="bg-accent hover:bg-accent/90 text-accent-foreground tracking-[0.2em] uppercase text-xs px-6"
                    >
                      <Camera className="h-4 w-4 mr-2" /> Anexar foto
                    </Button>
                    <Button
                      onClick={() => setShowBalao(true)}
                      variant="outline"
                      className="border-accent text-accent hover:bg-accent/10 tracking-[0.2em] uppercase text-xs px-6"
                    >
                      Pingente do site
                    </Button>
                  </div>
                </div>

                {/* Balão de fala */}
                {showBalao && (
                  <div className="relative mx-auto max-w-md animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="relative bg-accent text-accent-foreground px-5 py-3 rounded-2xl shadow-lg text-sm font-medium text-center">
                      Selecione uma inscrição abaixo para sua joia ✨
                      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-accent rotate-45" />
                    </div>
                  </div>
                )}

                <CtaField
                  label="Nome"
                  isOpen={p.openField === "nome"}
                  hasValue={!!p.nome.trim()}
                  disabled={!!p.personalizacaoEscolhida && p.personalizacaoEscolhida !== "nome"}
                  onToggle={() => p.abrirCampoExclusivo("nome")}
                >
                  <Input
                    autoFocus value={p.nome}
                    onChange={(e) => p.setNome(e.target.value.slice(0, 50))}
                    placeholder="Escreva o nome a ser gravado"
                    maxLength={50}
                    className="bg-transparent border-0 border-b border-accent/40 rounded-none px-0 focus-visible:ring-0 focus-visible:border-accent text-foreground placeholder:text-muted-foreground/60"
                  />
                </CtaField>
                <CtaField
                  label="KM"
                  isOpen={p.openField === "km"}
                  hasValue={!!p.km}
                  valuePreview={p.km}
                  disabled={!!p.personalizacaoEscolhida && p.personalizacaoEscolhida !== "km"}
                  onToggle={() => p.abrirCampoExclusivo("km")}
                >
                  <div className="flex flex-wrap gap-2.5 justify-center pt-1">
                    {KM_OPCOES.map((opt) => (
                      <LuxButton
                        key={opt}
                        selected={p.km === opt}
                        onClick={() => {
                          const desmarcar = p.km === opt;
                          p.setKm(desmarcar ? "" : opt);
                          // Não avança automaticamente: o cliente deve permanecer na Seção 6
                          // para clicar nos botões dourados (Adicionar ao carrinho / Prosseguir).
                        }}
                      >
                        {opt}
                      </LuxButton>
                    ))}
                  </div>
                </CtaField>
                <CtaField
                  label="Data da corrida"
                  isOpen={p.openField === "data"}
                  hasValue={!!p.data.trim()}
                  valuePreview={p.data}
                  disabled={!!p.personalizacaoEscolhida && p.personalizacaoEscolhida !== "data"}
                  onToggle={() => p.abrirCampoExclusivo("data")}
                >
                  <Input
                    autoFocus value={p.data}
                    onChange={(e) => p.setData(e.target.value.slice(0, 30))}
                    placeholder="Ex: 12/10/2025"
                    maxLength={30}
                    className="bg-transparent border-0 border-b border-accent/40 rounded-none px-0 focus-visible:ring-0 focus-visible:border-accent text-foreground placeholder:text-muted-foreground/60"
                  />
                </CtaField>
                <CtaField
                  label="Tempo percorrido"
                  isOpen={p.openField === "tempo"}
                  hasValue={!!p.tempo.trim()}
                  valuePreview={p.tempo}
                  disabled={!!p.personalizacaoEscolhida && p.personalizacaoEscolhida !== "tempo"}
                  onToggle={() => p.abrirCampoExclusivo("tempo")}
                >
                  <Input
                    autoFocus value={p.tempo}
                    onChange={(e) => p.setTempo(e.target.value.slice(0, 20))}
                    placeholder="Ex: 1h 45min"
                    maxLength={20}
                    className="bg-transparent border-0 border-b border-accent/40 rounded-none px-0 focus-visible:ring-0 focus-visible:border-accent text-foreground placeholder:text-muted-foreground/60"
                  />
                </CtaField>
                {p.personalizacaoEscolhida && (
                  <>
                    <button
                      onClick={() => { p.limparPersonalizacao(); p.setOpenField(null); }}
                      className="block mx-auto mt-4 text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-accent transition-colors"
                    >
                      Trocar inscrição
                    </button>
                    <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center animate-in fade-in slide-in-from-bottom-2 duration-400">
                      <Button
                        onClick={p.handleAdicionarAoCarrinho}
                        disabled={p.adicionando}
                        size="lg"
                        className="bg-accent hover:bg-accent/90 text-black font-bold tracking-[0.15em] uppercase text-xs px-8"
                      >
                        {p.adicionando ? (
                          <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Adicionando...</>
                        ) : (
                          <><Check className="h-4 w-4 mr-2" /> Adicionar ao carrinho</>
                        )}
                      </Button>
                      <Button
                        onClick={p.handleProsseguirParaPagamento}
                        disabled={p.adicionando}
                        size="lg"
                        className="bg-accent hover:bg-accent/90 text-black font-bold tracking-[0.15em] uppercase text-xs px-8"
                      >
                        Prosseguir para pagamento
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </StepPanel>

            <StepPanel index={5} step={step} numeral="VI" label="Sua foto em pingente" hint="Envie uma pose · veja a peça moldada por IA" expanded>
              <div className="grid gap-5 md:grid-cols-2 max-w-4xl mx-auto">
                <div className="relative joia-glass rounded-sm p-5 md:p-6 min-h-[280px] flex flex-col">
                  <span className="absolute top-0 left-0 h-3 w-3 border-t border-l border-accent" />
                  <span className="absolute top-0 right-0 h-3 w-3 border-t border-r border-accent" />
                  <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-accent" />
                  <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-accent" />
                  <p className="text-[10px] uppercase tracking-[0.4em] text-accent/80 mb-2 text-center">Etapa 01</p>
                  <h3 className="font-display tracking-[0.18em] uppercase text-sm text-center mb-3">Envie sua foto</h3>
                  <input
                    ref={p.fotoPingenteInputRef} type="file" accept="image/*"
                    onChange={p.handleFotoPingenteUpload} className="hidden"
                  />
                  <div className="flex-1 flex items-center justify-center">
                    {p.fotoPingente ? (
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-32 h-32 overflow-hidden border border-accent/40">
                          <img src={p.fotoPingente} alt="Sua foto" className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-110" />
                        </div>
                        <button
                          onClick={() => p.fotoPingenteInputRef.current?.click()}
                          className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-accent transition-colors"
                        >
                          Trocar foto
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => p.fotoPingenteInputRef.current?.click()}
                        className="group flex flex-col items-center gap-2 px-6 py-6 border border-dashed border-accent/50 hover:border-accent transition-colors w-full max-w-xs"
                      >
                        <Camera className="h-7 w-7 text-accent group-hover:scale-110 transition-transform" />
                        <span className="font-display tracking-[0.2em] uppercase text-xs text-accent">Subir foto</span>
                        <span className="text-[10px] text-muted-foreground/70">JPG ou PNG · até 5MB</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="relative joia-glass rounded-sm p-5 md:p-6 min-h-[440px] flex flex-col">
                  <span className="absolute top-0 left-0 h-3 w-3 border-t border-l border-accent" />
                  <span className="absolute top-0 right-0 h-3 w-3 border-t border-r border-accent" />
                  <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-accent" />
                  <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-accent" />
                  <p className="text-[10px] uppercase tracking-[0.4em] text-accent/80 mb-2 text-center">Etapa 02</p>
                  <h3 className="font-display tracking-[0.18em] uppercase text-sm text-center mb-3">Pingente moldado</h3>
                  <div className="flex-1 flex items-center justify-center">
                    {p.gerandoPingente ? (
                      <div className="flex flex-col items-center gap-3 text-center">
                        <Loader2 className="h-8 w-8 text-accent animate-spin" />
                        <p className="text-xs text-muted-foreground italic max-w-[200px]">
                          Esculpindo sua peça em {p.material === "Ouro 18K" ? "ouro 18K" : "prata 925"}…
                        </p>
                      </div>
                    ) : p.pingenteGerado ? (
                      <div className="flex flex-col items-center gap-3 w-full">
                        <MagnifierImage
                          src={p.pingenteGerado}
                          alt="Pingente gerado"
                          className="w-full max-w-[320px] aspect-square bg-black border border-accent/50"
                          zoom={3.2}
                          lensSize={150}
                          fit="contain"
                        />
                        {p.fotoPingente && (
                          <button
                            onClick={() => p.fotoPingente && p.gerarPingenteDaFoto(p.fotoPingente)}
                            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-accent transition-colors"
                          >
                            <Wand2 className="h-3 w-3" /> Gerar novamente
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-center opacity-60">
                        <Sparkles className="h-7 w-7 text-accent/60" />
                        <p className="text-xs text-muted-foreground italic max-w-[200px]">
                          Sua prévia aparecerá aqui assim que enviar a foto.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 max-w-2xl mx-auto">
                <p className="text-center text-[10px] uppercase tracking-[0.4em] text-accent/80 mb-3">
                  Inscrição gravada nesta peça
                </p>
                <div className="space-y-2.5">
                  <CtaField
                    label="Nome"
                    isOpen={p.openPingenteField === "nome"}
                    hasValue={!!p.pingenteNome.trim()}
                    disabled={!!p.inscricaoPingenteEscolhida && p.inscricaoPingenteEscolhida !== "nome"}
                    onToggle={() => p.abrirCampoPingenteExclusivo("nome")}
                  >
                    <Input
                      autoFocus value={p.pingenteNome}
                      onChange={(e) => p.setPingenteNome(e.target.value.slice(0, 50))}
                      placeholder="Escreva o nome a ser gravado"
                      maxLength={50}
                      className="bg-transparent border-0 border-b border-accent/40 rounded-none px-0 focus-visible:ring-0 focus-visible:border-accent text-foreground placeholder:text-muted-foreground/60"
                    />
                  </CtaField>
                  <CtaField
                    label="KM"
                    isOpen={p.openPingenteField === "km"}
                    hasValue={!!p.pingenteKm}
                    valuePreview={p.pingenteKm}
                    disabled={!!p.inscricaoPingenteEscolhida && p.inscricaoPingenteEscolhida !== "km"}
                    onToggle={() => p.abrirCampoPingenteExclusivo("km")}
                  >
                    <div className="flex flex-wrap gap-2.5 justify-center pt-1">
                      {KM_OPCOES.map((opt) => (
                        <LuxButton
                          key={opt}
                          selected={p.pingenteKm === opt}
                          onClick={() => p.setPingenteKm(p.pingenteKm === opt ? "" : opt)}
                        >
                          {opt}
                        </LuxButton>
                      ))}
                    </div>
                  </CtaField>
                  <CtaField
                    label="Data da corrida"
                    isOpen={p.openPingenteField === "data"}
                    hasValue={!!p.pingenteData.trim()}
                    valuePreview={p.pingenteData}
                    disabled={!!p.inscricaoPingenteEscolhida && p.inscricaoPingenteEscolhida !== "data"}
                    onToggle={() => p.abrirCampoPingenteExclusivo("data")}
                  >
                    <Input
                      autoFocus value={p.pingenteData}
                      onChange={(e) => p.setPingenteData(e.target.value.slice(0, 30))}
                      placeholder="Ex: 12/10/2025"
                      maxLength={30}
                      className="bg-transparent border-0 border-b border-accent/40 rounded-none px-0 focus-visible:ring-0 focus-visible:border-accent text-foreground placeholder:text-muted-foreground/60"
                    />
                  </CtaField>
                  <CtaField
                    label="Tempo percorrido"
                    isOpen={p.openPingenteField === "tempo"}
                    hasValue={!!p.pingenteTempo.trim()}
                    valuePreview={p.pingenteTempo}
                    disabled={!!p.inscricaoPingenteEscolhida && p.inscricaoPingenteEscolhida !== "tempo"}
                    onToggle={() => p.abrirCampoPingenteExclusivo("tempo")}
                  >
                    <Input
                      autoFocus value={p.pingenteTempo}
                      onChange={(e) => p.setPingenteTempo(e.target.value.slice(0, 20))}
                      placeholder="Ex: 1h 45min"
                      maxLength={20}
                      className="bg-transparent border-0 border-b border-accent/40 rounded-none px-0 focus-visible:ring-0 focus-visible:border-accent text-foreground placeholder:text-muted-foreground/60"
                    />
                  </CtaField>
                  {p.inscricaoPingenteEscolhida && (
                    <button
                      onClick={() => { p.limparInscricaoPingente(); p.setOpenPingenteField(null); }}
                      className="block mx-auto mt-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-accent transition-colors"
                    >
                      Trocar inscrição
                    </button>
                  )}
                </div>
              </div>

              {/* CTA final */}
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <Button
                  onClick={p.handleAdicionarAoCarrinho}
                  disabled={p.adicionando}
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-black font-bold tracking-[0.2em] uppercase text-xs px-8 shadow-lg shadow-accent/20"
                >
                  {p.adicionando ? (
                    <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Adicionando...</>
                  ) : (
                    <><Check className="h-4 w-4 mr-2" /> Adicionar ao carrinho</>
                  )}
                </Button>
                <Button
                  onClick={p.handleProsseguirParaPagamento}
                  disabled={p.adicionando}
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-black font-bold tracking-[0.2em] uppercase text-xs px-8 shadow-lg shadow-accent/20"
                >
                  Prosseguir para pagamento
                </Button>
              </div>
            </StepPanel>
          </div>
        </div>
      </div>

    </main>
  );
};

const StepPanel = ({
  index, step, numeral, label, hint, children, expanded = false,
}: { index: number; step: number; numeral: string; label: string; hint?: string; children: React.ReactNode; expanded?: boolean }) => {
  const isActive = index === step;
  return (
    <section
      key={isActive ? `active-${index}` : `inactive-${index}`}
      aria-hidden={!isActive}
      className={`w-full px-5 md:px-12 flex-col ${isActive ? "flex joia-step-enter" : "hidden"} ${
        expanded ? "py-6 md:py-8 min-h-[320px] md:min-h-[380px]" : "py-2 md:py-3"
      }`}
    >
      <SectionTitle numeral={numeral} label={label} hint={hint} />
      <div className={`flex ${expanded ? "items-center" : "items-start"} justify-center w-full pt-1`}>
        <div className="w-full joia-stagger">{children}</div>
      </div>
    </section>
  );
};

const Chip = ({ label, value }: { label: string; value: string | null }) => (
  <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
    <span className="text-muted-foreground/50">{label}</span>
    <span className={value ? "text-accent" : "text-muted-foreground/30"}>
      {value || "—"}
    </span>
  </span>
);

export default CriarMinhaJoia;
