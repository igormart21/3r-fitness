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

      <main className="container mx-auto px-4 py-14 md:py-20 max-w-5xl">
        {/* Cabeçalho editorial */}
        <div className="text-center mb-16 md:mb-20 relative">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-10 bg-accent/60" />
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="h-px w-10 bg-accent/60" />
          </div>
          <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-accent/80 mb-3">
            Atelier · Edição Personalizada
          </p>
          <h1 className="font-display text-4xl md:text-6xl tracking-tight mb-4">
            Crie sua joia
          </h1>
          <p className="text-muted-foreground italic max-w-md mx-auto text-sm md:text-base">
            Cada peça é composta à mão. Selecione abaixo os elementos que vão eternizar a sua história.
          </p>

          {/* Assinatura da artesã */}
          <div className="mt-8 flex flex-col items-center">
            <div className="flex items-center gap-3 mb-2">
              <span className="h-px w-8 bg-accent/40" />
              <span className="text-[9px] uppercase tracking-[0.45em] text-muted-foreground/70">
                Assinado por
              </span>
              <span className="h-px w-8 bg-accent/40" />
            </div>
            <div className="relative inline-block">
              <span
                className="block text-white text-2xl md:text-3xl leading-none italic font-light tracking-wide"
                style={{ fontFamily: "'Pinyon Script', 'Cormorant Garamond', serif" }}
              >
                Renata Ramos Ribeiro
              </span>
              <span className="block mt-2 text-[9px] uppercase tracking-[0.45em] text-center text-white">
                Artesã · Mestre Joalheira
              </span>
            </div>
          </div>
        </div>

        {/* I — Modalidade */}
        <SectionTitle numeral="I" label="Modalidade" />
        <div className="mb-16 flex flex-wrap gap-2.5 justify-center">
          {CATEGORIAS.map((cat) => (
            <LuxButton
              key={cat}
              selected={categoria === cat}
              onClick={() => setCategoria(categoria === cat ? null : cat)}
            >
              {cat}
            </LuxButton>
          ))}
        </div>

        <Divider />

        {/* II — Material */}
        <SectionTitle numeral="II" label="Material" hint="Escolha a essência" />
        <div className="mb-16">
          <div
            className={`grid gap-8 items-center ${
              material ? "md:grid-cols-[1fr,auto,1fr]" : "grid-cols-1"
            }`}
          >
            <div className="flex justify-center md:justify-end min-h-[1px]">
              {material === "Prata 925" && MATERIAL_IMAGENS[material] && (
                <ShowcaseFrame
                  src={MATERIAL_IMAGENS[material]}
                  alt={`Mostruário ${material}`}
                  caption="Prata 925 · Polimento Espelhado"
                />
              )}
            </div>

            <div className="flex flex-wrap gap-3 justify-center md:items-center">
              {MATERIAIS.map((m) => (
                <LuxButton
                  key={m}
                  selected={material === m}
                  onClick={() => handleSelecionarMaterial(m)}
                  size="lg"
                >
                  {m}
                </LuxButton>
              ))}
            </div>

            <div className="flex justify-center md:justify-start min-h-[1px]">
              {material === "Ouro 18K" && MATERIAL_IMAGENS[material] && (
                <ShowcaseFrame
                  src={MATERIAL_IMAGENS[material]}
                  alt={`Mostruário ${material}`}
                  caption="Ouro 18K · Acabamento Premium"
                />
              )}
            </div>
          </div>
        </div>

        <Divider />

        {/* III — Gênero */}
        <SectionTitle numeral="III" label="Gênero" />
        <div className="mb-16 flex flex-wrap gap-2.5 justify-center">
          {GENEROS.map((g) => (
            <LuxButton
              key={g}
              selected={genero === g}
              onClick={() => setGenero(genero === g ? null : g)}
            >
              {g}
            </LuxButton>
          ))}
        </div>

        <Divider />

        {/* IV — Tamanho */}
        <SectionTitle numeral="IV" label="Tamanho" hint="Medida do pingente" />
        <div className="mb-16 flex flex-wrap gap-5 justify-center">
          {TAMANHOS.map((t) => (
            <div key={t} className="flex flex-col items-center gap-2">
              <LuxButton
                selected={tamanho === t}
                onClick={() => setTamanho(tamanho === t ? null : t)}
              >
                {t}
              </LuxButton>
              <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground/80">
                {TAMANHO_LEGENDAS[t]}
              </span>
            </div>
          ))}
        </div>

        <Divider />

        {/* V — Estilo */}
        <SectionTitle numeral="V" label="Estilo" hint="A alma da peça" />
        <div className="mb-16">
          <div
            className={`grid gap-8 items-center ${
              estilo ? "md:grid-cols-[1fr,auto,1fr]" : "grid-cols-1"
            }`}
          >
            <div className="flex justify-center md:justify-end min-h-[1px]">
              {estilo === "Underground" && ESTILO_IMAGENS[estilo] && (
                <ShowcaseFrame
                  src={ESTILO_IMAGENS[estilo]}
                  alt={`Estilo ${estilo}`}
                  caption="Underground · Pingente com acessórios"
                />
              )}
            </div>

            <div className="flex flex-wrap gap-3 justify-center md:items-center">
              {ESTILOS.map((e) => (
                <LuxButton
                  key={e}
                  selected={estilo === e}
                  onClick={() => setEstilo(estilo === e ? null : e)}
                  size="lg"
                >
                  {e}
                </LuxButton>
              ))}
            </div>

            <div className="flex justify-center md:justify-start min-h-[1px]">
              {estilo === "Clássico" && ESTILO_IMAGENS[estilo] && (
                <ShowcaseFrame
                  src={ESTILO_IMAGENS[estilo]}
                  alt={`Estilo ${estilo}`}
                  caption="Clássico · Pingente puro"
                />
              )}
            </div>
          </div>
        </div>

        <Divider />

        {/* VI — Termine sua personalização */}
        <SectionTitle
          numeral="VI"
          label="Termine sua personalização"
          hint="Escolha apenas UMA inscrição para sua joia"
        />

        <div className="mb-12 max-w-2xl mx-auto space-y-3">
          {/* Nome */}
          <CtaField
            label="Nome"
            isOpen={openField === "nome"}
            hasValue={!!nome.trim()}
            disabled={!!personalizacaoEscolhida && personalizacaoEscolhida !== "nome"}
            onToggle={() => abrirCampoExclusivo("nome")}
          >
            <Input
              autoFocus
              value={nome}
              onChange={(e) => setNome(e.target.value.slice(0, 50))}
              placeholder="Escreva o nome a ser gravado"
              maxLength={50}
              className="bg-transparent border-0 border-b border-accent/40 rounded-none px-0 focus-visible:ring-0 focus-visible:border-accent text-foreground placeholder:text-muted-foreground/60"
            />
          </CtaField>

          {/* KM */}
          <CtaField
            label="KM"
            isOpen={openField === "km"}
            hasValue={!!km}
            valuePreview={km}
            disabled={!!personalizacaoEscolhida && personalizacaoEscolhida !== "km"}
            onToggle={() => abrirCampoExclusivo("km")}
          >
            <div className="flex flex-wrap gap-2.5 justify-center pt-1">
              {KM_OPCOES.map((opt) => (
                <LuxButton
                  key={opt}
                  selected={km === opt}
                  onClick={() => setKm(km === opt ? "" : opt)}
                >
                  {opt}
                </LuxButton>
              ))}
            </div>
          </CtaField>

          {/* Data */}
          <CtaField
            label="Data da corrida"
            isOpen={openField === "data"}
            hasValue={!!data.trim()}
            valuePreview={data}
            disabled={!!personalizacaoEscolhida && personalizacaoEscolhida !== "data"}
            onToggle={() => abrirCampoExclusivo("data")}
          >
            <Input
              autoFocus
              value={data}
              onChange={(e) => setData(e.target.value.slice(0, 30))}
              placeholder="Ex: 12/10/2025"
              maxLength={30}
              className="bg-transparent border-0 border-b border-accent/40 rounded-none px-0 focus-visible:ring-0 focus-visible:border-accent text-foreground placeholder:text-muted-foreground/60"
            />
          </CtaField>

          {/* Tempo */}
          <CtaField
            label="Tempo percorrido"
            isOpen={openField === "tempo"}
            hasValue={!!tempo.trim()}
            valuePreview={tempo}
            disabled={!!personalizacaoEscolhida && personalizacaoEscolhida !== "tempo"}
            onToggle={() => abrirCampoExclusivo("tempo")}
          >
            <Input
              autoFocus
              value={tempo}
              onChange={(e) => setTempo(e.target.value.slice(0, 20))}
              placeholder="Ex: 1h 45min"
              maxLength={20}
              className="bg-transparent border-0 border-b border-accent/40 rounded-none px-0 focus-visible:ring-0 focus-visible:border-accent text-foreground placeholder:text-muted-foreground/60"
            />
          </CtaField>

          {personalizacaoEscolhida && (
            <button
              onClick={() => {
                limparPersonalizacao();
                setOpenField(null);
              }}
              className="block mx-auto mt-4 text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-accent transition-colors"
            >
              Trocar inscrição
            </button>
          )}
        </div>

        <Divider />

        {/* VII — Sua foto eternizada em pingente */}
        <SectionTitle
          numeral="VII"
          label="Sua foto em pingente"
          hint="Envie uma pose · veja a peça moldada por IA"
        />

        <div className="mb-12 max-w-5xl mx-auto">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Quadro 1 — Upload */}
            <div className="relative border border-border/60 bg-card/30 p-6 md:p-8 min-h-[340px] flex flex-col">
              <span className="absolute top-0 left-0 h-3 w-3 border-t border-l border-accent" />
              <span className="absolute top-0 right-0 h-3 w-3 border-t border-r border-accent" />
              <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-accent" />
              <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-accent" />

              <p className="text-[10px] uppercase tracking-[0.4em] text-accent/80 mb-2 text-center">
                Etapa 01
              </p>
              <h3 className="font-display tracking-[0.18em] uppercase text-sm md:text-base text-center mb-4">
                Envie sua foto
              </h3>
              <p className="text-xs text-muted-foreground/80 italic text-center mb-6 max-w-xs mx-auto leading-relaxed">
                Escolha uma foto sua em pose marcante — corrida, salto, vitória.
                Nossa IA transformará seu corpo em uma escultura miniatura.
              </p>

              <input
                ref={fotoPingenteInputRef}
                type="file"
                accept="image/*"
                onChange={handleFotoPingenteUpload}
                className="hidden"
              />

              <div className="flex-1 flex items-center justify-center">
                {fotoPingente ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-40 h-40 overflow-hidden border border-accent/40">
                      <img src={fotoPingente} alt="Sua foto" className="w-full h-full object-cover" />
                    </div>
                    <button
                      onClick={() => fotoPingenteInputRef.current?.click()}
                      className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-accent transition-colors"
                    >
                      Trocar foto
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => fotoPingenteInputRef.current?.click()}
                    className="group flex flex-col items-center gap-3 px-6 py-8 border border-dashed border-accent/50 hover:border-accent transition-colors w-full max-w-xs"
                  >
                    <Camera className="h-8 w-8 text-accent group-hover:scale-110 transition-transform" />
                    <span className="font-display tracking-[0.2em] uppercase text-xs text-accent">
                      Subir foto
                    </span>
                    <span className="text-[10px] text-muted-foreground/70">JPG ou PNG · até 5MB</span>
                  </button>
                )}
              </div>
            </div>

            {/* Quadro 2 — Resultado */}
            <div className="relative border border-border/60 bg-card/30 p-6 md:p-8 min-h-[340px] flex flex-col">
              <span className="absolute top-0 left-0 h-3 w-3 border-t border-l border-accent" />
              <span className="absolute top-0 right-0 h-3 w-3 border-t border-r border-accent" />
              <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-accent" />
              <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-accent" />

              <p className="text-[10px] uppercase tracking-[0.4em] text-accent/80 mb-2 text-center">
                Etapa 02
              </p>
              <h3 className="font-display tracking-[0.18em] uppercase text-sm md:text-base text-center mb-4">
                Pingente moldado
              </h3>

              <div className="flex-1 flex items-center justify-center">
                {gerandoPingente ? (
                  <div className="flex flex-col items-center gap-4 text-center">
                    <Loader2 className="h-10 w-10 text-accent animate-spin" />
                    <p className="text-xs text-muted-foreground italic max-w-[200px] leading-relaxed">
                      Esculpindo sua peça em {material === "Ouro 18K" ? "ouro 18K" : "prata 925"}…
                    </p>
                  </div>
                ) : pingenteGerado ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-52 h-52 overflow-hidden bg-black border border-accent/50">
                      <img
                        src={pingenteGerado}
                        alt="Pingente personalizado gerado"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-accent/80">
                      Prévia artística · IA
                    </p>
                    {fotoPingente && (
                      <button
                        onClick={() => fotoPingente && gerarPingenteDaFoto(fotoPingente)}
                        className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-accent transition-colors"
                      >
                        <Wand2 className="h-3 w-3" />
                        Gerar novamente
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3 text-center opacity-60">
                    <Sparkles className="h-8 w-8 text-accent/60" />
                    <p className="text-xs text-muted-foreground italic max-w-[220px] leading-relaxed">
                      Sua prévia aparecerá aqui assim que enviar a foto.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Inscrição independente para o pingente */}
          <div className="mt-10">
            <p className="text-center text-[10px] md:text-xs uppercase tracking-[0.4em] text-accent/80 mb-5">
              Inscrição gravada nesta peça
            </p>

            <div className="max-w-2xl mx-auto space-y-3">
              <CtaField
                label="Nome"
                isOpen={openPingenteField === "nome"}
                hasValue={!!pingenteNome.trim()}
                disabled={!!inscricaoPingenteEscolhida && inscricaoPingenteEscolhida !== "nome"}
                onToggle={() => abrirCampoPingenteExclusivo("nome")}
              >
                <Input
                  autoFocus
                  value={pingenteNome}
                  onChange={(e) => setPingenteNome(e.target.value.slice(0, 50))}
                  placeholder="Escreva o nome a ser gravado"
                  maxLength={50}
                  className="bg-transparent border-0 border-b border-accent/40 rounded-none px-0 focus-visible:ring-0 focus-visible:border-accent text-foreground placeholder:text-muted-foreground/60"
                />
              </CtaField>

              <CtaField
                label="KM"
                isOpen={openPingenteField === "km"}
                hasValue={!!pingenteKm}
                valuePreview={pingenteKm}
                disabled={!!inscricaoPingenteEscolhida && inscricaoPingenteEscolhida !== "km"}
                onToggle={() => abrirCampoPingenteExclusivo("km")}
              >
                <div className="flex flex-wrap gap-2.5 justify-center pt-1">
                  {KM_OPCOES.map((opt) => (
                    <LuxButton
                      key={opt}
                      selected={pingenteKm === opt}
                      onClick={() => setPingenteKm(pingenteKm === opt ? "" : opt)}
                    >
                      {opt}
                    </LuxButton>
                  ))}
                </div>
              </CtaField>

              <CtaField
                label="Data da corrida"
                isOpen={openPingenteField === "data"}
                hasValue={!!pingenteData.trim()}
                valuePreview={pingenteData}
                disabled={!!inscricaoPingenteEscolhida && inscricaoPingenteEscolhida !== "data"}
                onToggle={() => abrirCampoPingenteExclusivo("data")}
              >
                <Input
                  autoFocus
                  value={pingenteData}
                  onChange={(e) => setPingenteData(e.target.value.slice(0, 30))}
                  placeholder="Ex: 12/10/2025"
                  maxLength={30}
                  className="bg-transparent border-0 border-b border-accent/40 rounded-none px-0 focus-visible:ring-0 focus-visible:border-accent text-foreground placeholder:text-muted-foreground/60"
                />
              </CtaField>

              <CtaField
                label="Tempo percorrido"
                isOpen={openPingenteField === "tempo"}
                hasValue={!!pingenteTempo.trim()}
                valuePreview={pingenteTempo}
                disabled={!!inscricaoPingenteEscolhida && inscricaoPingenteEscolhida !== "tempo"}
                onToggle={() => abrirCampoPingenteExclusivo("tempo")}
              >
                <Input
                  autoFocus
                  value={pingenteTempo}
                  onChange={(e) => setPingenteTempo(e.target.value.slice(0, 20))}
                  placeholder="Ex: 1h 45min"
                  maxLength={20}
                  className="bg-transparent border-0 border-b border-accent/40 rounded-none px-0 focus-visible:ring-0 focus-visible:border-accent text-foreground placeholder:text-muted-foreground/60"
                />
              </CtaField>

              {inscricaoPingenteEscolhida && (
                <button
                  onClick={() => {
                    limparInscricaoPingente();
                    setOpenPingenteField(null);
                  }}
                  className="block mx-auto mt-4 text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-accent transition-colors"
                >
                  Trocar inscrição
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleAdicionarAoCarrinho}
            disabled={
              adicionando ||
              !categoria ||
              !material ||
              !estilo ||
              !tamanho ||
              !genero ||
              !personalizacaoEscolhida
            }
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            {adicionando ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Adicionando...
              </>
            ) : (
              <>
                <Check className="h-4 w-4 mr-2" />
                Adicionar ao carrinho
              </>
            )}
          </Button>
        </div>
      </main>

    </div>
  );
};

export default CriarMinhaJoia;
