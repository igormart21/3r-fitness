import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Upload, Check, Loader2 } from "lucide-react";
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
const GENEROS: Genero[] = ["Masculino", "Feminino"];

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

      <main className="container mx-auto px-4 py-10 max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl md:text-4xl mb-2">Crie sua joia</h1>
          <p className="text-muted-foreground">
            Personalize cada detalhe e finalize abaixo
          </p>
        </div>

        {/* Modalidade — fileira única, botões médios */}
        <div className="mb-8">
          <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-3 text-center">
            Modalidade
          </h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIAS.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoria(cat)}
                className={`px-4 py-2.5 rounded-md border-2 text-sm md:text-base font-display transition-all hover:border-accent ${
                  categoria === cat
                    ? "border-accent bg-accent/5"
                    : "border-border bg-card"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Material */}
        <div className="mb-8">
          <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-3 text-center">
            Material
          </h2>

          <div
            className={`grid gap-6 items-center ${
              material ? "md:grid-cols-[1fr,auto,1fr]" : "grid-cols-1"
            }`}
          >
            {/* Mostruário Prata (esquerda) */}
            <div className="flex justify-center md:justify-end min-h-[1px]">
              {material === "Prata 925" && MATERIAL_IMAGENS[material] && (
                <div className="w-64 h-64 md:w-72 md:h-72 rounded-lg overflow-hidden border-2 border-accent bg-background animate-in fade-in zoom-in-95">
                  <img
                    src={MATERIAL_IMAGENS[material]}
                    alt={`Mostruário ${material}`}
                    width={768}
                    height={768}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Botões (centro) */}
            <div className="flex flex-wrap gap-2 justify-center md:items-center">
              {MATERIAIS.map((m) => (
                <button
                  key={m}
                  onClick={() => handleSelecionarMaterial(m)}
                  className={`px-4 py-2.5 rounded-md border-2 text-sm md:text-base font-display transition-all hover:border-accent ${
                    material === m
                      ? "border-accent bg-accent/5"
                      : "border-border bg-card"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            {/* Mostruário Ouro (direita) */}
            <div className="flex justify-center md:justify-start min-h-[1px]">
              {material === "Ouro 18K" && MATERIAL_IMAGENS[material] && (
                <div className="w-64 h-64 md:w-72 md:h-72 rounded-lg overflow-hidden border-2 border-accent bg-background animate-in fade-in zoom-in-95">
                  <img
                    src={MATERIAL_IMAGENS[material]}
                    alt={`Mostruário ${material}`}
                    width={768}
                    height={768}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Estilo — com imagens, em quadrados menores */}
        <div className="mb-8">
          <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-3 text-center">
            Estilo
          </h2>
          <div
            className={`grid gap-6 items-center ${
              estilo ? "md:grid-cols-[1fr,auto,1fr]" : "grid-cols-1"
            }`}
          >
            {/* Mostruário Underground (esquerda) */}
            <div className="flex justify-center md:justify-end min-h-[1px]">
              {estilo === "Underground" && ESTILO_IMAGENS[estilo] && (
                <div className="w-64 h-64 md:w-72 md:h-72 rounded-lg overflow-hidden border-2 border-accent bg-background animate-in fade-in zoom-in-95">
                  <img
                    src={ESTILO_IMAGENS[estilo]}
                    alt={`Estilo ${estilo}`}
                    width={768}
                    height={768}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Botões (centro) */}
            <div className="flex flex-wrap gap-2 justify-center md:items-center">
              {ESTILOS.map((e) => (
                <button
                  key={e}
                  onClick={() => setEstilo(estilo === e ? null : e)}
                  className={`px-4 py-2.5 rounded-md border-2 text-sm md:text-base font-display transition-all hover:border-accent ${
                    estilo === e
                      ? "border-accent bg-accent/5"
                      : "border-border bg-card"
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>

            {/* Mostruário Clássico (direita) */}
            <div className="flex justify-center md:justify-start min-h-[1px]">
              {estilo === "Clássico" && ESTILO_IMAGENS[estilo] && (
                <div className="w-64 h-64 md:w-72 md:h-72 rounded-lg overflow-hidden border-2 border-accent bg-background animate-in fade-in zoom-in-95">
                  <img
                    src={ESTILO_IMAGENS[estilo]}
                    alt={`Estilo ${estilo}`}
                    width={768}
                    height={768}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Gênero */}
        <div className="mb-8">
          <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-3 text-center">
            Gênero
          </h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {GENEROS.map((g) => (
              <button
                key={g}
                onClick={() => setGenero(g)}
                className={`px-4 py-2.5 rounded-md border-2 text-sm md:text-base font-display transition-all hover:border-accent ${
                  genero === g
                    ? "border-accent bg-accent/5"
                    : "border-border bg-card"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Tamanho */}
        <div className="mb-10">
          <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-3 text-center">
            Tamanho
          </h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {TAMANHOS.map((t) => (
              <button
                key={t}
                onClick={() => setTamanho(t)}
                className={`px-4 py-2.5 rounded-md border-2 text-sm md:text-base font-display transition-all hover:border-accent ${
                  tamanho === t
                    ? "border-accent bg-accent/5"
                    : "border-border bg-card"
                }`}
              >
                {t}
              </button>
            ))}
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
