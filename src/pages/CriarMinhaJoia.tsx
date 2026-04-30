import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Upload, Check, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useCartStore } from "@/stores/cartStore";
import { storefrontApiRequest, STOREFRONT_QUERY, type ShopifyProduct } from "@/lib/shopify";
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

  const fileInputRef = useRef<HTMLInputElement>(null);
  const addItem = useCartStore((s) => s.addItem);

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
    if (!nome.trim()) {
      toast.error("Por favor, preencha seu nome");
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

        {/* Personalização */}
        <div className="border-t border-border pt-8 mb-8">
          <h2 className="font-display text-2xl md:text-3xl mb-1">
            Termine sua personalização
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Adicione os detalhes que vão eternizar sua história
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Foto */}
            <div>
              <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
                Adicione sua foto
              </Label>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full aspect-square rounded-lg border-2 border-dashed border-border hover:border-accent transition-colors bg-card flex flex-col items-center justify-center overflow-hidden group"
              >
                {foto ? (
                  <img src={foto} alt="Sua foto" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <Upload className="h-10 w-10 text-muted-foreground group-hover:text-accent mb-3 transition-colors" />
                    <p className="text-sm text-muted-foreground">Upload foto</p>
                    <p className="text-xs text-muted-foreground/60 mt-1">JPG, PNG até 5MB</p>
                  </>
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFotoUpload}
                className="hidden"
              />
              {foto && (
                <button
                  onClick={() => setFoto(null)}
                  className="text-xs text-muted-foreground hover:text-destructive mt-2"
                >
                  Remover foto
                </button>
              )}
            </div>

            {/* Campos */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="nome">Nome *</Label>
                <Input
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value.slice(0, 50))}
                  placeholder="Escreva aqui"
                  maxLength={50}
                />
              </div>
              <div>
                <Label htmlFor="data">Data</Label>
                <Input
                  id="data"
                  value={data}
                  onChange={(e) => setData(e.target.value.slice(0, 30))}
                  placeholder="Escreva aqui"
                  maxLength={30}
                />
              </div>
              <div>
                <Label htmlFor="km">KM</Label>
                <Input
                  id="km"
                  value={km}
                  onChange={(e) => setKm(e.target.value.slice(0, 20))}
                  placeholder="Escreva aqui"
                  maxLength={20}
                />
              </div>
              <div>
                <Label htmlFor="tempo">Tempo</Label>
                <Input
                  id="tempo"
                  value={tempo}
                  onChange={(e) => setTempo(e.target.value.slice(0, 20))}
                  placeholder="Escreva aqui"
                  maxLength={20}
                />
              </div>
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
              !nome.trim()
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
