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
    camposGravacao: ["nome", "palavra", "data"],
  },
  // próximas modalidades virão aqui (Musculação=2, Triathlon=3, Ciclismo=4, Crossfit=5, Corrida=6)
};

/* ===================== Componentes auxiliares ===================== */

const SectionTitle = ({ numeral, label }: { numeral: string; label: string }) => (
  <div className="flex items-center gap-3 mb-2.5">
    <span className="font-display text-[9px] tracking-[0.5em] text-accent">{numeral}</span>
    <span className="h-px flex-1 bg-gradient-to-r from-accent/60 to-transparent" />
    <h3 className="font-display text-[11px] md:text-xs tracking-[0.25em] uppercase text-accent whitespace-nowrap">
      {label}
    </h3>
    <span className="h-px flex-1 bg-gradient-to-l from-accent/60 to-transparent" />
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
    className={`relative font-display tracking-[0.2em] uppercase text-[10px] md:text-xs transition-all duration-300 border rounded-none px-4 py-2.5 ${
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
      <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-md">
        <Check className="h-3 w-3" strokeWidth={3} />
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

      {/* Botão voltar flutuante sobre a imagem */}
      <Link
        to="/"
        className="absolute top-4 left-4 z-40 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/80 hover:text-accent transition-colors bg-black/40 backdrop-blur-sm px-3 py-2 rounded-sm"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </Link>

      {/* Hero da modalidade — atletas completos + frase sobreposta à esquerda */}
      {config.slug === "fisiculturismo" && (
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
      )}

      {/* Conteúdo principal: 2 colunas */}
      <main className="container mx-auto px-4 pt-4 pb-16 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)] gap-5 lg:gap-8">
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
          <div className="space-y-5">
            {/* I — Gênero */}
            <section>
              <SectionTitle numeral="I" label="Gênero" />
              <div className="flex gap-3 flex-wrap">
                {(["Masculino", "Feminino"] as Genero[]).map((g) => (
                  <ChoiceButton key={g} selected={genero === g} onClick={() => setGenero(genero === g ? null : g)}>
                    {g}
                  </ChoiceButton>
                ))}
              </div>
            </section>

            {/* II — Metal */}
            <section>
              <SectionTitle numeral="II" label="Escolha o metal" />
              <div className="flex gap-3 flex-wrap">
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
              <div className="flex gap-3 flex-wrap">
                {(["Clássico", "Underground"] as Estilo[]).map((e) => (
                  <ChoiceButton key={e} selected={estilo === e} onClick={() => setEstilo(estilo === e ? null : e)}>
                    {e === "Underground" ? "Personalizado" : e}
                  </ChoiceButton>
                ))}
              </div>
              <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70 italic">
                Clássico: linhas tradicionais · Personalizado: traço Underground
              </p>
            </section>

            {/* IV — Gravação */}
            <section>
              <SectionTitle numeral="IV" label="Grave seu significado" />
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70 mb-4 italic">
                Abrevie pra digitar · escolha apenas uma opção
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {config.camposGravacao.includes("nome") && (
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.3em] text-accent/80 block mb-1.5">Nome</label>
                    <Input
                      value={nome}
                      maxLength={20}
                      onChange={(e) => setExclusivo("nome", e.target.value)}
                      placeholder="Ex: Renata"
                      className="bg-card/40 border-accent/30 focus-visible:border-accent"
                    />
                  </div>
                )}
                {config.camposGravacao.includes("palavra") && (
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.3em] text-accent/80 block mb-1.5">Palavra</label>
                    <Input
                      value={palavra}
                      maxLength={15}
                      onChange={(e) => setExclusivo("palavra", e.target.value)}
                      placeholder="Ex: Força"
                      className="bg-card/40 border-accent/30 focus-visible:border-accent"
                    />
                  </div>
                )}
                {config.camposGravacao.includes("km") && (
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.3em] text-accent/80 block mb-1.5">KM</label>
                    <Input
                      value={km}
                      onChange={(e) => setExclusivo("km", e.target.value)}
                      placeholder="Ex: 21K"
                      className="bg-card/40 border-accent/30 focus-visible:border-accent"
                    />
                  </div>
                )}
                {config.camposGravacao.includes("data") && (
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.3em] text-accent/80 block mb-1.5">Data</label>
                    <Input
                      value={data}
                      maxLength={10}
                      onChange={(e) => setExclusivo("data", e.target.value)}
                      placeholder="DD/MM/AAAA"
                      className="bg-card/40 border-accent/30 focus-visible:border-accent"
                    />
                  </div>
                )}
                {config.camposGravacao.includes("tempo") && (
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.3em] text-accent/80 block mb-1.5">Tempo</label>
                    <Input
                      value={tempo}
                      maxLength={10}
                      onChange={(e) => setExclusivo("tempo", e.target.value)}
                      placeholder="Ex: 1h45"
                      className="bg-card/40 border-accent/30 focus-visible:border-accent"
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

            {/* V — Para os mais exclusivos */}
            <section>
              <SectionTitle numeral="V" label="Para os mais exclusivos" />
              <p
                className="font-serif italic text-base md:text-lg text-accent/90 mb-5 text-center"
                style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
              >
                "Transforme você em uma joia única"
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Upload */}
                <button
                  onClick={() => fotoInputRef.current?.click()}
                  disabled={!genero || !material || !estilo}
                  className="relative aspect-square border border-dashed border-accent/40 hover:border-accent transition-all flex flex-col items-center justify-center gap-2 bg-card/20 hover:bg-card/40 disabled:opacity-40 disabled:cursor-not-allowed group"
                >
                  {fotoCliente ? (
                    <>
                      <img src={fotoCliente} alt="Sua foto" className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-xs uppercase tracking-[0.3em] text-accent">Trocar foto</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <Upload className="h-8 w-8 text-accent/60" />
                      <span className="text-[10px] uppercase tracking-[0.3em] text-accent/80">Upload da foto</span>
                      {(!genero || !material || !estilo) && (
                        <span className="text-[9px] text-muted-foreground/60 px-2 text-center">
                          Escolha gênero, metal e estilo antes
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
                      <Loader2 className="h-6 w-6 text-accent animate-spin" />
                      <span className="text-[10px] uppercase tracking-[0.3em] text-accent">Gerando…</span>
                    </div>
                  ) : pingenteGerado ? (
                    <img src={pingenteGerado} alt="Pingente gerado por IA" className="w-full h-full object-contain" />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-center px-4">
                      <Camera className="h-7 w-7 text-accent/40" />
                      <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">
                        Prévia do boneco gerado por IA
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <p
                className="mt-5 text-center font-serif italic text-sm text-muted-foreground/80 max-w-md mx-auto"
                style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
              >
                Você está a um passo de materializar sua história em uma joia que só você tem.
              </p>
            </section>

            {/* CTA Final */}
            <section className="pt-4 border-t border-accent/20">
              <div className="flex items-center justify-between mb-5">
                <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Investimento</span>
                <span className="font-display text-2xl gold-text">a partir de R$ 890</span>
              </div>

              <Button
                onClick={handleAdicionar}
                disabled={adicionando || !podeAdicionar}
                size="lg"
                className="w-full bg-gradient-to-r from-[#b8860b] via-[#d4af37] to-[#b8860b] text-black hover:opacity-90 font-display tracking-[0.3em] uppercase text-sm py-6"
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
                className="mt-3 w-full text-center text-xs uppercase tracking-[0.3em] text-accent/80 hover:text-accent disabled:opacity-40 underline-offset-4 hover:underline"
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
