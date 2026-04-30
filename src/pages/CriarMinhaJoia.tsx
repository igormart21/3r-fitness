import { useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
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

const ESTILO_IMAGENS: Record<string, string> = {
  Underground: estiloUndergroundImg,
  "Clássico": estiloClassicoImg,
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
      <span className="h-px w-12 md:w-20 bg-accent/40" />
      <span className="font-display text-[10px] md:text-xs tracking-[0.5em] text-accent">
        {numeral}
      </span>
      <span className="h-px w-12 md:w-20 bg-accent/40" />
    </div>
    <h2 className="font-display text-xl md:text-2xl tracking-[0.2em] uppercase">
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
    <span className="h-px w-16 bg-border" />
    <span className="h-1 w-1 rounded-full bg-accent/60" />
    <span className="h-px w-16 bg-border" />
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
        ? "border-accent text-accent bg-accent/[0.04] shadow-[inset_0_0_0_1px_hsl(var(--accent)/0.4)]"
        : "border-border/60 text-foreground/85 hover:border-accent/70 hover:text-accent"
    }`}
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
          className="w-full h-full object-cover"
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
    } catch (err) {
      console.error(err);
      toast.error("Não foi possível adicionar ao carrinho. Tente novamente.");
    } finally {
      setAdicionando(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{
        // Preto fosco + dourado (escopado a esta página)
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
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-10">
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
      />
    </div>
  );
};

/* ===================== STEPPER HORIZONTAL DE LUXO ===================== */

type StepperProps = {
  categoria: Categoria | null; setCategoria: (v: Categoria | null) => void;
  material: Material | null; handleSelecionarMaterial: (m: Material) => void;
  genero: Genero | null; setGenero: (v: Genero | null) => void;
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
};

const STEP_LABELS = [
  "Modalidade",
  "Material",
  "Gênero",
  "Tamanho",
  "Estilo",
  "Inscrição",
  "Foto em pingente",
];

const StepperExperience = (p: StepperProps) => {
  const [step, setStep] = useState(0);
  const total = STEP_LABELS.length;

  const stepCompleted = useMemo(() => [
    !!p.categoria,
    !!p.material,
    !!p.genero,
    !!p.tamanho,
    !!p.estilo,
    !!p.personalizacaoEscolhida,
    true,
  ], [p.categoria, p.material, p.genero, p.tamanho, p.estilo, p.personalizacaoEscolhida]);

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
    <main className="container mx-auto px-4 pt-8 pb-12 md:pt-10 md:pb-16 max-w-7xl">
      <div className="text-center mb-6 md:mb-8">
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="h-px w-8 bg-accent/60" />
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          <span className="h-px w-8 bg-accent/60" />
        </div>
        <p className="text-[10px] uppercase tracking-[0.4em] text-accent/80 mb-2">
          Atelier · Edição Personalizada
        </p>
        <h1 className="font-display text-3xl md:text-4xl tracking-tight mb-2">
          Crie sua joia
        </h1>
        <p
          className="text-white text-lg md:text-xl italic font-light tracking-wide"
          style={{ fontFamily: "'Pinyon Script', 'Cormorant Garamond', serif" }}
        >
          Renata Ramos Ribeiro
        </p>
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
          { stepIdx: 2, label: "Gênero", value: p.genero },
          { stepIdx: 3, label: "Tamanho", value: p.tamanho },
          { stepIdx: 4, label: "Estilo", value: p.estilo },
          {
            stepIdx: 5,
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
                  className="group flex items-center gap-2 flex-shrink-0 px-3 py-1.5 border border-accent/40 hover:border-accent hover:bg-accent/[0.06] transition-all"
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

        <div className="overflow-hidden border border-border/40 bg-card/20 relative">
          <span className="absolute top-0 left-0 h-4 w-4 border-t border-l border-accent/70 z-10" />
          <span className="absolute top-0 right-0 h-4 w-4 border-t border-r border-accent/70 z-10" />
          <span className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-accent/70 z-10" />
          <span className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-accent/70 z-10" />

          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${step * 100}%)` }}
          >
            <StepPanel numeral="I" label="Modalidade" hint="A sua jornada">
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

            <StepPanel numeral="II" label="Material" hint="Escolha a essência">
              <div className="grid grid-cols-2 gap-3 sm:gap-5 md:gap-8 lg:gap-12 max-w-4xl mx-auto">
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
                        <div className="w-36 h-36 sm:w-48 sm:h-48 md:w-72 md:h-72 lg:w-[26rem] lg:h-[26rem] xl:w-[32rem] xl:h-[32rem] overflow-hidden bg-white">
                          <img
                            src={MATERIAL_IMAGENS[m]}
                            alt={`Mostruário ${m}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
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

            <StepPanel numeral="III" label="Gênero">
              <div className="flex flex-wrap gap-3 justify-center">
                {GENEROS.map((g) => (
                  <LuxButton
                    key={g}
                    selected={p.genero === g}
                    onClick={() => {
                      const desmarcar = p.genero === g;
                      p.setGenero(desmarcar ? null : g);
                      if (!desmarcar) setTimeout(() => autoAdvance(2), 280);
                    }}
                    size="lg"
                  >
                    {g}
                  </LuxButton>
                ))}
              </div>
            </StepPanel>

            <StepPanel numeral="IV" label="Tamanho" hint="Medida do pingente">
              <div className="flex flex-wrap gap-6 justify-center">
                {TAMANHOS.map((t) => (
                  <div key={t} className="flex flex-col items-center gap-2">
                    <LuxButton
                      selected={p.tamanho === t}
                      onClick={() => {
                        const desmarcar = p.tamanho === t;
                        p.setTamanho(desmarcar ? null : t);
                        if (!desmarcar) setTimeout(() => autoAdvance(3), 280);
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

            <StepPanel numeral="V" label="Estilo" hint="A alma da peça">
              <div
                className={`grid gap-8 items-center ${
                  p.estilo ? "md:grid-cols-[1fr,auto,1fr]" : "grid-cols-1"
                }`}
              >
                <div className="flex justify-center md:justify-end min-h-[1px]">
                  {p.estilo === "Underground" && ESTILO_IMAGENS[p.estilo] && (
                    <ShowcaseFrame
                      src={ESTILO_IMAGENS[p.estilo]}
                      alt={`Estilo ${p.estilo}`}
                      caption="Underground · Pingente com acessórios"
                    />
                  )}
                </div>
                <div className="flex flex-wrap gap-3 justify-center md:items-center">
                  {ESTILOS.map((e) => (
                    <LuxButton
                      key={e}
                      selected={p.estilo === e}
                      onClick={() => {
                        const desmarcar = p.estilo === e;
                        p.setEstilo(desmarcar ? null : e);
                        if (!desmarcar) setTimeout(() => autoAdvance(4), 280);
                      }}
                      size="lg"
                    >
                      {e}
                    </LuxButton>
                  ))}
                </div>
                <div className="flex justify-center md:justify-start min-h-[1px]">
                  {p.estilo === "Clássico" && ESTILO_IMAGENS[p.estilo] && (
                    <ShowcaseFrame
                      src={ESTILO_IMAGENS[p.estilo]}
                      alt={`Estilo ${p.estilo}`}
                      caption="Clássico · Pingente puro"
                    />
                  )}
                </div>
              </div>
            </StepPanel>

            <StepPanel numeral="VI" label="Inscrição" hint="Escolha apenas UMA inscrição para sua joia">
              <div className="max-w-2xl mx-auto space-y-3">
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
                          if (!desmarcar) setTimeout(() => autoAdvance(5), 280);
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
                  <button
                    onClick={() => { p.limparPersonalizacao(); p.setOpenField(null); }}
                    className="block mx-auto mt-4 text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-accent transition-colors"
                  >
                    Trocar inscrição
                  </button>
                )}
              </div>
            </StepPanel>

            <StepPanel numeral="VII" label="Sua foto em pingente" hint="Envie uma pose · veja a peça moldada por IA">
              <div className="grid gap-5 md:grid-cols-2 max-w-4xl mx-auto">
                <div className="relative border border-border/60 bg-card/30 p-5 md:p-6 min-h-[280px] flex flex-col">
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
                          <img src={p.fotoPingente} alt="Sua foto" className="w-full h-full object-cover" />
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

                <div className="relative border border-border/60 bg-card/30 p-5 md:p-6 min-h-[280px] flex flex-col">
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
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-40 h-40 overflow-hidden bg-black border border-accent/50">
                          <img src={p.pingenteGerado} alt="Pingente gerado" className="w-full h-full object-contain" />
                        </div>
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
              <div className="mt-10 flex justify-center">
                <Button
                  onClick={p.handleAdicionarAoCarrinho}
                  disabled={p.adicionando || !allReady}
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground tracking-[0.2em] uppercase text-xs px-8"
                >
                  {p.adicionando ? (
                    <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Adicionando...</>
                  ) : (
                    <><Check className="h-4 w-4 mr-2" /> Adicionar ao carrinho</>
                  )}
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
  numeral, label, hint, children,
}: { numeral: string; label: string; hint?: string; children: React.ReactNode }) => (
  <section className="w-full flex-shrink-0 px-5 md:px-12 py-6 md:py-8 min-h-[320px] md:min-h-[380px] flex flex-col">
    <SectionTitle numeral={numeral} label={label} hint={hint} />
    <div className="flex-1 flex items-start md:items-center justify-center w-full animate-in fade-in duration-500 pt-2">
      <div className="w-full">{children}</div>
    </div>
  </section>
);

const Chip = ({ label, value }: { label: string; value: string | null }) => (
  <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
    <span className="text-muted-foreground/50">{label}</span>
    <span className={value ? "text-accent" : "text-muted-foreground/30"}>
      {value || "—"}
    </span>
  </span>
);

export default CriarMinhaJoia;
