import { useState, useRef, useEffect, useMemo } from "react";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import { ArrowLeft, Check, Loader2, Sparkles, Upload, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useCartStore } from "@/stores/cartStore";
import { storefrontApiRequest, STOREFRONT_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { supabase } from "@/integrations/supabase/client";
import fisiculturismoHero from "@/assets/fisiculturismo-hero.png";

// Bonecos FISICULTURISMO
import bonecoFisiFemClassicoOuro from "@/assets/boneco-fisiculturismo-fem-classico-ouro.jpg";
import bonecoFisiFemUndergroundOuro from "@/assets/boneco-fisiculturismo-fem-underground-ouro.jpg";
import bonecoFisiMascClassicoOuro from "@/assets/boneco-fisiculturismo-masc-classico-ouro.jpg";
import bonecoFisiMascUndergroundOuro from "@/assets/boneco-fisiculturismo-masc-underground-ouro.jpg";
import bonecoFisiFemClassicoPrata from "@/assets/boneco-fisiculturismo-fem-classico-prata.jpg";
import bonecoFisiFemUndergroundPrata from "@/assets/boneco-fisiculturismo-fem-underground-prata.jpg";
import bonecoFisiMascClassicoPrata from "@/assets/boneco-fisiculturismo-masc-classico-prata.jpg";
import bonecoFisiMascUndergroundPrata from "@/assets/boneco-fisiculturismo-masc-underground-prata.jpg";

// Bonecos MUSCULAÇÃO
import bonecoMuscFemClassicoOuro from "@/assets/boneco-musculacao-fem-classico-ouro.jpg";
import bonecoMuscFemUndergroundOuro from "@/assets/boneco-musculacao-fem-underground-ouro.jpg";
import bonecoMuscMascClassicoOuro from "@/assets/boneco-musculacao-masc-classico-ouro.jpg";
import bonecoMuscMascUndergroundOuro from "@/assets/boneco-musculacao-masc-underground-ouro.jpg";
import bonecoMuscFemClassicoPrata from "@/assets/boneco-musculacao-fem-classico-prata.jpg";
import bonecoMuscFemUndergroundPrata from "@/assets/boneco-musculacao-fem-underground-prata.jpg";
import bonecoMuscMascClassicoPrata from "@/assets/boneco-musculacao-masc-classico-prata.jpg";
import bonecoMuscMascUndergroundPrata from "@/assets/boneco-musculacao-masc-underground-prata.jpg";

// Bonecos TRIATHLON
import bonecoTriFemClassicoOuro from "@/assets/boneco-triatlon-fem-classico-ouro.jpg";
import bonecoTriFemUndergroundOuro from "@/assets/boneco-triatlon-fem-underground-ouro.jpg";
import bonecoTriMascClassicoOuro from "@/assets/boneco-triatlon-masc-classico-ouro.jpg";
import bonecoTriMascUndergroundOuro from "@/assets/boneco-triatlon-masc-underground-ouro.jpg";
import bonecoTriFemClassicoPrata from "@/assets/boneco-triatlon-fem-classico-prata.jpg";
import bonecoTriFemUndergroundPrata from "@/assets/boneco-triatlon-fem-underground-prata.jpg";
import bonecoTriMascClassicoPrata from "@/assets/boneco-triatlon-masc-classico-prata.jpg";
import bonecoTriMascUndergroundPrata from "@/assets/boneco-triatlon-masc-underground-prata.jpg";

// Bikes CICLISMO (Speed como default)
import bikeSpeedClassicoOuro from "@/assets/bike-speed-classico-ouro.jpg";
import bikeSpeedClassicoPrata from "@/assets/bike-speed-classico-prata.jpg";
import bikeSpeedUndergroundMascOuro from "@/assets/bike-speed-underground-masculino-ouro.jpg";
import bikeSpeedUndergroundMascPrata from "@/assets/bike-speed-underground-masculino-prata.jpg";
import bikeSpeedUndergroundFemOuro from "@/assets/bike-speed-underground-feminino-ouro.jpg";
import bikeSpeedUndergroundFemPrata from "@/assets/bike-speed-underground-feminino-prata.jpg";

// Bonecos CROSSFIT
import bonecoCrossFemClassicoOuro from "@/assets/boneco-crossfit-fem-classico-ouro.jpg";
import bonecoCrossFemUndergroundOuro from "@/assets/boneco-crossfit-fem-underground-ouro.jpg";
import bonecoCrossMascClassicoOuro from "@/assets/boneco-crossfit-masc-classico-ouro.jpg";
import bonecoCrossMascUndergroundOuro from "@/assets/boneco-crossfit-masc-underground-ouro.jpg";
import bonecoCrossFemClassicoPrata from "@/assets/boneco-crossfit-fem-classico-prata.jpg";
import bonecoCrossFemUndergroundPrata from "@/assets/boneco-crossfit-fem-underground-prata.jpg";
import bonecoCrossMascClassicoPrata from "@/assets/boneco-crossfit-masc-classico-prata.jpg";
import bonecoCrossMascUndergroundPrata from "@/assets/boneco-crossfit-masc-underground-prata.jpg";

// Bonecos CORRIDA
import bonecoCorrFemClassicoOuro from "@/assets/boneco-corredores-fem-classico-ouro.jpg";
import bonecoCorrFemUndergroundOuro from "@/assets/boneco-corredores-fem-underground-ouro.jpg";
import bonecoCorrMascClassicoOuro from "@/assets/boneco-corredores-masc-classico-ouro.jpg";
import bonecoCorrMascUndergroundOuro from "@/assets/boneco-corredores-masc-underground-ouro.jpg";
import bonecoCorrFemClassicoPrata from "@/assets/boneco-corredores-fem-classico-prata.jpg";
import bonecoCorrFemUndergroundPrata from "@/assets/boneco-corredores-fem-underground-prata.jpg";
import bonecoCorrMascClassicoPrata from "@/assets/boneco-corredores-masc-classico-prata.jpg";
import bonecoCorrMascUndergroundPrata from "@/assets/boneco-corredores-masc-underground-prata.jpg";

/* ===================== Configuração por modalidade ===================== */

type Genero = "Masculino" | "Feminino";
type Material = "Prata 925" | "Ouro 18K";
type Estilo = "Clássico" | "Underground";
type CtaFieldKey = "nome" | "palavra" | "km" | "data" | "tempo";

type ModalidadeConfig = {
  slug: string;
  nome: string;
  fraseImpacto: string;
  bonecos: Record<Material, Record<Genero, Record<Estilo, string>>>;
  // Quais campos de gravação habilitar para esta modalidade
  camposGravacao: CtaFieldKey[];
};

const MODALIDADES: Record<string, ModalidadeConfig> = {
  "1": {
    slug: "fisiculturismo",
    nome: "Fisiculturismo",
    fraseImpacto: "Seu corpo é sua obra. Merece ser representado.",
    bonecos: {
      "Ouro 18K": {
        Masculino: { "Clássico": bonecoFisiMascClassicoOuro, Underground: bonecoFisiMascUndergroundOuro },
        Feminino: { "Clássico": bonecoFisiFemClassicoOuro, Underground: bonecoFisiFemUndergroundOuro },
      },
      "Prata 925": {
        Masculino: { "Clássico": bonecoFisiMascClassicoPrata, Underground: bonecoFisiMascUndergroundPrata },
        Feminino: { "Clássico": bonecoFisiFemClassicoPrata, Underground: bonecoFisiFemUndergroundPrata },
      },
    },
    camposGravacao: [],
  },
  "2": {
    slug: "musculacao",
    nome: "Musculação",
    fraseImpacto: "Cada repetição é uma promessa cumprida.",
    bonecos: {
      "Ouro 18K": {
        Masculino: { "Clássico": bonecoMuscMascClassicoOuro, Underground: bonecoMuscMascUndergroundOuro },
        Feminino: { "Clássico": bonecoMuscFemClassicoOuro, Underground: bonecoMuscFemUndergroundOuro },
      },
      "Prata 925": {
        Masculino: { "Clássico": bonecoMuscMascClassicoPrata, Underground: bonecoMuscMascUndergroundPrata },
        Feminino: { "Clássico": bonecoMuscFemClassicoPrata, Underground: bonecoMuscFemUndergroundPrata },
      },
    },
    camposGravacao: ["nome", "palavra", "data"],
  },
  "3": {
    slug: "triathlon",
    nome: "Triathlon",
    fraseImpacto: "Resistência em todos os níveis.",
    bonecos: {
      "Ouro 18K": {
        Masculino: { "Clássico": bonecoTriMascClassicoOuro, Underground: bonecoTriMascUndergroundOuro },
        Feminino: { "Clássico": bonecoTriFemClassicoOuro, Underground: bonecoTriFemUndergroundOuro },
      },
      "Prata 925": {
        Masculino: { "Clássico": bonecoTriMascClassicoPrata, Underground: bonecoTriMascUndergroundPrata },
        Feminino: { "Clássico": bonecoTriFemClassicoPrata, Underground: bonecoTriFemUndergroundPrata },
      },
    },
    camposGravacao: ["nome", "palavra", "data"],
  },
  "4": {
    slug: "ciclismo",
    nome: "Ciclismo",
    fraseImpacto: "Cada pedalada conta uma história.",
    bonecos: {
      "Ouro 18K": {
        Masculino: { "Clássico": bikeSpeedClassicoOuro, Underground: bikeSpeedUndergroundMascOuro },
        Feminino: { "Clássico": bikeSpeedClassicoOuro, Underground: bikeSpeedUndergroundFemOuro },
      },
      "Prata 925": {
        Masculino: { "Clássico": bikeSpeedClassicoPrata, Underground: bikeSpeedUndergroundMascPrata },
        Feminino: { "Clássico": bikeSpeedClassicoPrata, Underground: bikeSpeedUndergroundFemPrata },
      },
    },
    camposGravacao: ["nome", "palavra", "km", "data", "tempo"],
  },
  "5": {
    slug: "crossfit",
    nome: "Crossfit",
    fraseImpacto: "Força forjada em cada movimento.",
    bonecos: {
      "Ouro 18K": {
        Masculino: { "Clássico": bonecoCrossMascClassicoOuro, Underground: bonecoCrossMascUndergroundOuro },
        Feminino: { "Clássico": bonecoCrossFemClassicoOuro, Underground: bonecoCrossFemUndergroundOuro },
      },
      "Prata 925": {
        Masculino: { "Clássico": bonecoCrossMascClassicoPrata, Underground: bonecoCrossMascUndergroundPrata },
        Feminino: { "Clássico": bonecoCrossFemClassicoPrata, Underground: bonecoCrossFemUndergroundPrata },
      },
    },
    camposGravacao: ["nome", "palavra", "data"],
  },
  "6": {
    slug: "corrida",
    nome: "Corrida",
    fraseImpacto: "Cada quilômetro, uma conquista.",
    bonecos: {
      "Ouro 18K": {
        Masculino: { "Clássico": bonecoCorrMascClassicoOuro, Underground: bonecoCorrMascUndergroundOuro },
        Feminino: { "Clássico": bonecoCorrFemClassicoOuro, Underground: bonecoCorrFemUndergroundOuro },
      },
      "Prata 925": {
        Masculino: { "Clássico": bonecoCorrMascClassicoPrata, Underground: bonecoCorrMascUndergroundPrata },
        Feminino: { "Clássico": bonecoCorrFemClassicoPrata, Underground: bonecoCorrFemUndergroundPrata },
      },
    },
    camposGravacao: ["nome", "palavra", "km", "data", "tempo"],
  },
};

/* ===================== Componentes auxiliares ===================== */

const SectionTitle = ({ numeral, label }: { numeral: string; label: string }) => (
  <div className="flex items-center justify-center gap-2 mb-1.5 text-center">
    <span className="font-display text-[8px] tracking-[0.5em] text-white">{numeral}</span>
    <h3 className="font-display text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-white whitespace-nowrap">
      {label}
    </h3>
  </div>
);

const ChoiceButton = ({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={`relative font-display tracking-[0.2em] uppercase text-[9px] md:text-[10px] transition-all duration-300 border rounded-none px-2.5 py-1.5 ${
      selected
        ? "border-accent text-accent-foreground shadow-[0_0_24px_-4px_hsl(var(--accent)/0.55)]"
        : "border-border/60 text-foreground/85 hover:border-accent/70 hover:text-accent"
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
      <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-md">
        <Check className="h-2.5 w-2.5" strokeWidth={3} />
      </span>
    )}
    {children}
  </button>
);

/* ===================== Página ===================== */

const Modalidade = () => {
  const { id } = useParams();
  const config = id ? MODALIDADES[id] : undefined;

  // Se a modalidade não existe ainda, redireciona para a página antiga (legado)
  if (!config) {
    return <Navigate to="/criar-minha-joia" replace />;
  }

  return <ModalidadePage config={config} />;
};

const ModalidadePage = ({ config }: { config: ModalidadeConfig }) => {
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);
  const getCheckoutUrl = useCartStore((s) => s.getCheckoutUrl);

  const [genero, setGenero] = useState<Genero | null>(null);
  const [material, setMaterial] = useState<Material | null>(null);
  const [estilo, setEstilo] = useState<Estilo | null>(null);

  // Gravação (apenas uma opção por joia)
  const [nome, setNome] = useState("");
  const [palavra, setPalavra] = useState("");
  const [km, setKm] = useState("");
  const [data, setData] = useState("");
  const [tempo, setTempo] = useState("");

  const personalizacaoEscolhida: CtaFieldKey | null = nome.trim()
    ? "nome"
    : palavra.trim()
    ? "palavra"
    : km
    ? "km"
    : data.trim()
    ? "data"
    : tempo.trim()
    ? "tempo"
    : null;

  const setExclusivo = (key: CtaFieldKey, value: string) => {
    // Limpa os outros, mantém apenas o atual
    if (key !== "nome") setNome("");
    if (key !== "palavra") setPalavra("");
    if (key !== "km") setKm("");
    if (key !== "data") setData("");
    if (key !== "tempo") setTempo("");
    if (key === "nome") setNome(value);
    if (key === "palavra") setPalavra(value);
    if (key === "km") setKm(value);
    if (key === "data") setData(value);
    if (key === "tempo") setTempo(value);
  };

  const valorGravacao = () => nome || palavra || km || data || tempo || "";

  // Regra: para crossfit e triathlon, só liberar gravação no estilo "Personalizado" (Underground)
  const exigeUnderground = config.slug === "crossfit" || config.slug === "triathlon";
  const gravacaoLiberada = config.camposGravacao.length > 0 && (!exigeUnderground || estilo === "Underground");

  // Posicionamento da gravação em tempo real sobre o pingente (preview)
  type OverlayStyle = {
    top: string;
    left: string;
    width: string;
    transform?: string;
    rotate?: number;
  };
  const overlayPos: OverlayStyle = useMemo(() => {
    switch (config.slug) {
      case "musculacao":
        return { top: "46%", left: "50%", width: "22%", transform: "translate(-50%,-50%)" };
      case "corrida":
        return { top: "40%", left: "50%", width: "24%", transform: "translate(-50%,-50%)" };
      case "triathlon":
        // costela lateral
        return { top: "48%", left: "44%", width: "22%", transform: "translate(-50%,-50%) rotate(-8deg)" };
      case "crossfit":
        // base do círculo do pingente — substitui a palavra "CROSSFIT"
        return { top: "88%", left: "50%", width: "44%", transform: "translate(-50%,-50%)" };
      default:
        return { top: "45%", left: "50%", width: "26%", transform: "translate(-50%,-50%)" };
    }
  }, [config.slug]);

  const overlayTexto = (gravacaoLiberada ? valorGravacao() : "").trim();
  // Ajuste automático: quanto mais caracteres, menor a fonte (cabe sempre dentro do boneco)
  const overlayFontSize = useMemo(() => {
    const len = Math.max(overlayTexto.length, 1);
    // mapa: 1-4 chars => 14px, 5-8 => 11px, 9-12 => 9px, 13+ => 7-8px
    if (len <= 4) return 18;
    if (len <= 8) return 14;
    if (len <= 12) return 11;
    if (len <= 16) return 9;
    return 8;
  }, [overlayTexto]);

  // Foto → pingente IA
  const fotoInputRef = useRef<HTMLInputElement>(null);
  const [fotoCliente, setFotoCliente] = useState<string | null>(null);
  const [pingenteGerado, setPingenteGerado] = useState<string | null>(null);
  const [gerandoPingente, setGerandoPingente] = useState(false);

  const [adicionando, setAdicionando] = useState(false);

  // Imagem de preview (fundo preto, à esquerda)
  const previewSrc = useMemo(() => {
    if (pingenteGerado) return pingenteGerado;
    const mat = material ?? "Prata 925";
    const gen = genero ?? "Masculino";
    const est = estilo ?? "Clássico";
    return config.bonecos[mat][gen][est];
  }, [pingenteGerado, material, genero, estilo, config]);

  const fetchAsDataUrl = async (url: string): Promise<string | null> => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      return await new Promise((resolve, reject) => {
        const r = new FileReader();
        r.onloadend = () => resolve(r.result as string);
        r.onerror = reject;
        r.readAsDataURL(blob);
      });
    } catch {
      return null;
    }
  };

  const gerarPingente = async (dataUrl: string) => {
    setPingenteGerado(null);
    setGerandoPingente(true);
    try {
      const refUrl = config.bonecos[material ?? "Prata 925"][genero ?? "Masculino"][estilo ?? "Clássico"];
      const referenceImageDataUrl = await fetchAsDataUrl(refUrl);
      const { data: result, error } = await supabase.functions.invoke("gerar-pingente", {
        body: {
          imageDataUrl: dataUrl,
          referenceImageDataUrl,
          categoria: config.nome,
          material: material ?? "Prata 925",
          estilo: estilo ?? "Clássico",
          genero: genero ?? "Masculino",
          inscricao: valorGravacao(),
        },
      });
      if (error) throw error;
      if (!result?.imageUrl) throw new Error("Imagem não retornada");
      setPingenteGerado(result.imageUrl);
      toast.success("Sua joia foi modelada!");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Não foi possível gerar o pingente.");
    } finally {
      setGerandoPingente(false);
    }
  };

  const handleFotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("A foto deve ter no máximo 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const url = reader.result as string;
      setFotoCliente(url);
      gerarPingente(url);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const podeAdicionar = !!genero && !!material && !!estilo;

  const handleAdicionar = async () => {
    if (!podeAdicionar) {
      toast.error("Escolha gênero, metal e estilo.");
      return;
    }
    setAdicionando(true);
    try {
      const data1 = await storefrontApiRequest(STOREFRONT_QUERY, { first: 5, query: null });
      const products: ShopifyProduct[] = data1?.data?.products?.edges || [];
      const product = products.find((p) =>
        p.node.variants.edges.some((v) => v.node.availableForSale)
      );
      if (!product) {
        toast.message("Abrindo nossa coleção.");
        setTimeout(() => navigate("/colecao"), 400);
        return;
      }
      const variant = product.node.variants.edges.find((v) => v.node.availableForSale)!.node;

      const personalizacao = [
        { name: "Modalidade", value: config.nome },
        { name: "Gênero", value: genero! },
        { name: "Material", value: material! },
        { name: "Estilo", value: estilo! },
        ...(nome ? [{ name: "Nome gravado", value: nome }] : []),
        ...(palavra ? [{ name: "Palavra", value: palavra }] : []),
        ...(km ? [{ name: "KM", value: km }] : []),
        ...(data ? [{ name: "Data", value: data }] : []),
        ...(tempo ? [{ name: "Tempo", value: tempo }] : []),
        ...(pingenteGerado ? [{ name: "Pingente por foto", value: "Gerado por IA" }] : []),
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
      setTimeout(() => navigate("/colecao"), 600);
    } catch (err) {
      console.error(err);
      toast.error("Não foi possível adicionar ao carrinho.");
    } finally {
      setAdicionando(false);
    }
  };

  const handleComprar = async () => {
    await handleAdicionar();
    setTimeout(() => {
      const url = getCheckoutUrl();
      if (url) window.open(url, "_blank");
    }, 800);
  };

  return (
    <div
      className="min-h-screen text-foreground relative"
      style={{
        backgroundColor: "#0a0a0a",
        ["--background" as any]: "0 0% 4%",
        ["--foreground" as any]: "43 65% 70%",
        ["--card" as any]: "0 0% 6%",
        ["--card-foreground" as any]: "43 65% 70%",
        ["--primary" as any]: "43 65% 55%",
        ["--primary-foreground" as any]: "0 0% 7%",
        ["--secondary" as any]: "0 0% 10%",
        ["--secondary-foreground" as any]: "43 65% 70%",
        ["--muted" as any]: "0 0% 10%",
        ["--muted-foreground" as any]: "43 30% 60%",
        ["--accent" as any]: "43 65% 55%",
        ["--accent-foreground" as any]: "0 0% 7%",
        ["--border" as any]: "43 55% 45%",
        ["--input" as any]: "43 55% 45%",
        ["--ring" as any]: "43 65% 55%",
      }}
    >
      <style>{`
        @keyframes shimmer-gold {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .gold-text {
          background: linear-gradient(110deg, #b8860b 0%, #d4af37 25%, #f4d77a 50%, #d4af37 75%, #b8860b 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shimmer-gold 6s linear infinite;
        }
        @keyframes spotlight-pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>


      {/* Hero da modalidade — atletas completos + frase sobreposta à esquerda */}
      {config.slug === "fisiculturismo" ? (
        <section className="relative w-full overflow-hidden" style={{ backgroundColor: "#0a0a0a" }}>
          <div
            className="relative w-full"
            style={{ height: "clamp(180px, 22vw, 260px)" }}
          >
            {/* Imagem de fundo desfocada preenchendo as laterais */}
            <img
              src={fisiculturismoHero}
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover object-center select-none"
              style={{ filter: "blur(40px) brightness(0.45) saturate(0.7)", transform: "scale(1.15)" }}
              draggable={false}
            />
            {/* Imagem principal por cima, com atletas completos */}
            <img
              src={fisiculturismoHero}
              alt={`Atletas de ${config.nome}`}
              className="absolute inset-0 w-full h-full object-contain object-center select-none"
              draggable={false}
            />
            {/* Fade inferior suave para o fundo da página */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 75%, #0a0a0a 100%)",
              }}
            />

            {/* Frase de impacto sobreposta — canto esquerdo */}
            <div className="absolute inset-y-0 left-0 z-20 flex items-center pl-4 sm:pl-8 md:pl-12 max-w-[55%]">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-3 w-3 text-accent" />
                  <span className="h-px w-8 bg-accent/60" />
                </div>
                <h1
                  className="font-serif italic text-base sm:text-xl md:text-2xl tracking-[0.04em] gold-text leading-tight"
                  style={{ fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif' }}
                >
                  {config.fraseImpacto}
                </h1>
              </div>
            </div>
          </div>
        </section>
      ) : (
        // Espaço reservado no topo para foto horizontal da modalidade (será anexada depois)
        <section
          className="relative w-full overflow-hidden border-b border-accent/10"
          style={{
            backgroundColor: "#0a0a0a",
            height: "clamp(180px, 22vw, 260px)",
          }}
          aria-label={`Espaço reservado para foto de ${config.nome}`}
        >
          {/* Frase de impacto sobreposta — canto esquerdo */}
          <div className="absolute inset-y-0 left-0 z-20 flex items-center pl-4 sm:pl-8 md:pl-12 max-w-[55%]">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-3 w-3 text-accent" />
                <span className="h-px w-8 bg-accent/60" />
              </div>
              <h1
                className="font-serif italic text-base sm:text-xl md:text-2xl tracking-[0.04em] gold-text leading-tight"
                style={{ fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif' }}
              >
                {config.fraseImpacto}
              </h1>
            </div>
          </div>
        </section>
      )}

      {/* Conteúdo principal: 2 colunas */}
      <main className="container mx-auto px-4 pt-3 pb-10 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)] gap-3 lg:gap-6">
          {/* COLUNA ESQUERDA — Preview sticky */}
          <div className="lg:sticky lg:top-4 lg:self-start max-w-[280px] mx-auto lg:mx-0 w-full">
            <div
              className="relative aspect-[4/5] w-full overflow-hidden border border-accent/30"
              style={{
                backgroundColor: "#000",
                boxShadow:
                  "0 30px 80px -20px rgba(0,0,0,0.8), 0 0 60px -20px hsl(43 65% 35% / 0.4)",
              }}
            >
              {/* Holofotes douradas */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-10 mix-blend-screen"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 50% at 50% 30%, hsl(43 75% 60% / 0.35) 0%, hsl(43 65% 30% / 0.15) 35%, transparent 70%)",
                  animation: "spotlight-pulse 4s ease-in-out infinite",
                }}
              />
              {/* Cantos dourados */}
              <span className="absolute top-2 left-2 h-4 w-4 border-t border-l border-accent z-20" />
              <span className="absolute top-2 right-2 h-4 w-4 border-t border-r border-accent z-20" />
              <span className="absolute bottom-2 left-2 h-4 w-4 border-b border-l border-accent z-20" />
              <span className="absolute bottom-2 right-2 h-4 w-4 border-b border-r border-accent z-20" />

              {gerandoPingente && (
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm gap-3">
                  <Loader2 className="h-10 w-10 text-accent animate-spin" />
                  <p className="text-xs uppercase tracking-[0.3em] text-accent">Modelando sua joia…</p>
                </div>
              )}

              <img
                src={previewSrc}
                alt={`Pré-visualização de joia ${config.nome}`}
                className="absolute inset-0 w-full h-full object-contain z-5 transition-opacity duration-500"
              />

              {/* Gravação em tempo real sobre o pingente */}
              {overlayTexto && (
                <div
                  className="absolute z-20 pointer-events-none text-center"
                  style={{
                    top: overlayPos.top,
                    left: overlayPos.left,
                    width: overlayPos.width,
                    transform: overlayPos.transform,
                  }}
                >
                  <span
                    className="block uppercase leading-none whitespace-nowrap overflow-hidden"
                    style={{
                      fontFamily: 'Arial, Helvetica, sans-serif',
                      fontSize: `${overlayFontSize}px`,
                      color: material === "Ouro 18K" ? "#d4af37" : "#c0c0c0",
                      fontWeight: 700,
                      letterSpacing: "0.02em",
                      WebkitTextStroke: "0.15px rgba(0,0,0,0.55)",
                      textShadow: "0 0 0.5px rgba(0,0,0,0.45)",
                    }}
                  >
                    {overlayTexto}
                  </span>
                </div>
              )}

              {/* Legenda das escolhas */}
              {(genero || material || estilo) && (
                <div className="absolute bottom-6 left-0 right-0 z-20 text-center px-4">
                  <p className="text-[10px] uppercase tracking-[0.4em] text-accent/90">
                    {[material, genero, estilo].filter(Boolean).join(" · ")}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* COLUNA DIREITA — Escolhas em sequência */}
          <div className="space-y-3">
            {/* I — Gênero */}
            <section>
              <SectionTitle numeral="I" label="Escolha quem você se tornou" />
              <div className="flex gap-2 flex-wrap justify-center">
                {(["Masculino", "Feminino"] as Genero[]).map((g) => (
                  <ChoiceButton key={g} selected={genero === g} onClick={() => setGenero(genero === g ? null : g)}>
                    {g}
                  </ChoiceButton>
                ))}
              </div>
            </section>

            {/* II — Metal */}
            <section>
              <SectionTitle numeral="II" label="Defina o material da sua conquista" />
              <div className="flex gap-2 flex-wrap justify-center">
                {(["Ouro 18K", "Prata 925"] as Material[]).map((m) => (
                  <ChoiceButton key={m} selected={material === m} onClick={() => setMaterial(material === m ? null : m)}>
                    {m}
                  </ChoiceButton>
                ))}
              </div>
            </section>

            {/* III — Estilo */}
            <section>
              <SectionTitle numeral="III" label="Forma da sua história" />
              <div className="flex gap-2 flex-wrap justify-center">
                {(["Clássico", "Underground"] as Estilo[]).map((e) => (
                  <ChoiceButton key={e} selected={estilo === e} onClick={() => setEstilo(estilo === e ? null : e)}>
                    {e === "Underground" ? "Personalizado" : e}
                  </ChoiceButton>
                ))}
              </div>
            </section>

            {/* IV — Gravação */}
            {gravacaoLiberada && (
            <section>
              <SectionTitle numeral="IV" label="Dê significado à sua peça" />
              <div className="flex flex-wrap gap-1.5 justify-center">
                {config.camposGravacao.includes("nome") && (
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.3em] text-white block mb-1 text-center">Nome</label>
                    <Input
                      value={nome}
                      maxLength={20}
                      onChange={(e) => setExclusivo("nome", e.target.value)}
                      placeholder="Ex: Renata"
                      className="bg-card/40 border-accent/30 focus-visible:border-accent h-8 text-xs"
                    />
                  </div>
                )}
                {config.camposGravacao.includes("palavra") && (
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.3em] text-white block mb-1 text-center">Palavra</label>
                    <Input
                      value={palavra}
                      maxLength={15}
                      onChange={(e) => setExclusivo("palavra", e.target.value)}
                      placeholder="Ex: Força"
                      className="bg-card/40 border-accent/30 focus-visible:border-accent h-8 text-xs"
                    />
                  </div>
                )}
                {config.camposGravacao.includes("km") && (
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.3em] text-white block mb-1 text-center">KM</label>
                    <Input
                      value={km}
                      onChange={(e) => setExclusivo("km", e.target.value)}
                      placeholder="Ex: 21K"
                      className="bg-card/40 border-accent/30 focus-visible:border-accent h-8 text-xs"
                    />
                  </div>
                )}
                {config.camposGravacao.includes("data") && (
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.3em] text-white block mb-1 text-center">Data</label>
                    <Input
                      value={data}
                      maxLength={10}
                      onChange={(e) => setExclusivo("data", e.target.value)}
                      placeholder="DD/MM/AAAA"
                      className="bg-card/40 border-accent/30 focus-visible:border-accent h-8 text-xs"
                    />
                  </div>
                )}
                {config.camposGravacao.includes("tempo") && (
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.3em] text-white block mb-1 text-center">Tempo</label>
                    <Input
                      value={tempo}
                      maxLength={10}
                      onChange={(e) => setExclusivo("tempo", e.target.value)}
                      placeholder="Ex: 1h45"
                      className="bg-card/40 border-accent/30 focus-visible:border-accent h-8 text-xs"
                    />
                  </div>
                )}
              </div>
              {personalizacaoEscolhida && (
                <button
                  onClick={() => setExclusivo("nome", "")}
                  className="mt-3 text-[10px] uppercase tracking-[0.3em] text-accent/70 hover:text-accent underline"
                >
                  Limpar gravação
                </button>
              )}
            </section>
            )}

            {/* V — Para os mais exclusivos */}
            <section>
              <SectionTitle numeral="V" label="Torne isso único" />
              <p className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground/70 mb-2 italic text-center">
                Transforme em uma jóia que só você tem
              </p>

              <div className="grid grid-cols-2 gap-3">
                {/* Upload */}
                <button
                  onClick={() => fotoInputRef.current?.click()}
                  disabled={!genero || !material || !estilo}
                  className="relative aspect-square border border-dashed border-accent/40 hover:border-accent transition-all flex flex-col items-center justify-center gap-1.5 bg-card/20 hover:bg-card/40 disabled:opacity-40 disabled:cursor-not-allowed group"
                >
                  {fotoCliente ? (
                    <>
                      <img src={fotoCliente} alt="Sua foto" className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-accent">Trocar foto</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <Upload className="h-6 w-6 text-accent/60" />
                      <span className="text-[9px] uppercase tracking-[0.3em] text-accent/80">Upload da foto</span>
                      {(!genero || !material || !estilo) && (
                        <span className="text-[8px] text-muted-foreground/60 px-2 text-center leading-tight">
                          Escolha gênero, metal e estilo
                        </span>
                      )}
                    </>
                  )}
                  <input
                    ref={fotoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFotoUpload}
                    className="hidden"
                  />
                </button>

                {/* Prévia gerada */}
                <div className="relative aspect-square border border-accent/30 bg-black/60 flex items-center justify-center overflow-hidden">
                  {gerandoPingente ? (
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="h-5 w-5 text-accent animate-spin" />
                      <span className="text-[9px] uppercase tracking-[0.3em] text-accent">Gerando…</span>
                    </div>
                  ) : pingenteGerado ? (
                    <img src={pingenteGerado} alt="Pingente gerado por IA" className="w-full h-full object-contain" />
                  ) : (
                    <div className="flex flex-col items-center gap-1.5 text-center px-3">
                      <Camera className="h-5 w-5 text-accent/40" />
                      <span className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground/60 leading-tight">
                        Prévia IA
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* CTA Final */}
            <section className="pt-2 border-t border-accent/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground">Investimento</span>
                <span className="font-display text-lg gold-text">a partir de R$ 890</span>
              </div>

              <Button
                onClick={handleAdicionar}
                disabled={adicionando || !podeAdicionar}
                className="w-full bg-gradient-to-r from-[#b8860b] via-[#d4af37] to-[#b8860b] text-black hover:opacity-90 font-display tracking-[0.3em] uppercase text-xs py-3 h-auto"
              >
                {adicionando ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Adicionando…
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Adicionar ao carrinho
                  </>
                )}
              </Button>

              <button
                onClick={handleComprar}
                disabled={adicionando || !podeAdicionar}
                className="mt-2 w-full text-center text-[10px] uppercase tracking-[0.3em] text-accent/80 hover:text-accent disabled:opacity-40 underline-offset-4 hover:underline"
              >
                Comprar agora
              </button>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Modalidade;
