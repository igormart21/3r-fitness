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

const ESTILO_IMAGENS: Record<string, string> = {
  Underground: estiloUndergroundImg,
  "Clássico": estiloClassicoImg,
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
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 w-8 rounded-full transition-colors ${
                  s <= step ? "bg-accent" : "bg-border"
                }`}
              />
            ))}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* STEP 1 - Categoria */}
        {step === 1 && (
          <section>
            <div className="text-center mb-10">
              <p className="text-muted-foreground text-lg">
                Comece escolhendo sua modalidade
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {CATEGORIAS.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setCategoria(cat);
                    setStep(2);
                  }}
                  className={`group relative aspect-square rounded-lg border-2 p-6 flex flex-col items-center justify-center text-center transition-all hover:border-accent hover:shadow-elegant hover:-translate-y-1 ${
                    categoria === cat ? "border-accent bg-accent/5" : "border-border bg-card"
                  }`}
                >
                  <span className="font-display text-xl md:text-2xl">{cat}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* STEP 2 - Mostruário */}
        {step === 2 && categoria && (
          <section>
            <div className="text-center mb-10">
              <p className="text-sm uppercase tracking-widest text-accent mb-2">
                Categoria: {categoria}
              </p>
              <h1 className="font-display text-4xl md:text-5xl mb-3">Escolha seu modelo</h1>
              <p className="text-muted-foreground text-lg">
                Material e estilo da sua joia
              </p>
            </div>

            {/* Material */}
            <div className="mb-10">
              <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
                Material
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {MATERIAIS.map((m) => (
                  <button
                    key={m}
                    onClick={() => handleSelecionarMaterial(m)}
                    className={`rounded-lg border-2 p-8 transition-all hover:border-accent ${
                      material === m
                        ? "border-accent bg-accent/5"
                        : "border-border bg-card"
                    }`}
                  >
                    {/* Mostruário ilustrativo (placeholder) */}
                    <div className="aspect-square mb-4 rounded-md bg-gradient-warm flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-2 rounded-full border-4 border-foreground/20" />
                        <div className="w-1 h-12 mx-auto bg-foreground/20" />
                        <div className="w-8 h-8 mx-auto mt-1 rounded bg-foreground/30" />
                      </div>
                    </div>
                    <p className="font-display text-2xl">{m}</p>
                    <p className="text-xs text-muted-foreground mt-1">Colar + Pingente</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Estilo (somente após escolher material) */}
            {material && (
              <div className="mb-10 animate-in fade-in slide-in-from-bottom-4">
                <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
                  Estilo
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ESTILOS.map((e) => (
                    <button
                      key={e}
                      onClick={() => setEstilo(e)}
                      className={`rounded-lg border-2 p-4 text-center transition-all hover:border-accent overflow-hidden ${
                        estilo === e
                          ? "border-accent bg-accent/5"
                          : "border-border bg-card"
                      }`}
                    >
                      {ESTILO_IMAGENS[e] && (
                        <div className="aspect-square mb-3 rounded-md overflow-hidden bg-background">
                          <img
                            src={ESTILO_IMAGENS[e]}
                            alt={`Estilo ${e}`}
                            width={768}
                            height={768}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <p className="font-display text-xl">{e}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tamanho (somente após escolher estilo) */}
            {estilo && (
              <div className="mb-10 animate-in fade-in slide-in-from-bottom-4">
                <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
                  Tamanho
                </h2>
                <div className="grid grid-cols-3 gap-3">
                  {TAMANHOS.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTamanho(t)}
                      className={`rounded-lg border-2 p-4 md:p-6 text-center transition-all hover:border-accent ${
                        tamanho === t
                          ? "border-accent bg-accent/5"
                          : "border-border bg-card"
                      }`}
                    >
                      <p className="font-display text-lg md:text-xl">{t}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={!material || !estilo || !tamanho}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Termine sua personalização
              </Button>
            </div>
          </section>
        )}

        {/* STEP 3 - Personalização */}
        {step === 3 && (
          <section>
            <div className="text-center mb-10">
              <p className="text-sm uppercase tracking-widest text-accent mb-2">
                {categoria} · {material} · {estilo} · {tamanho}
              </p>
              <h1 className="font-display text-4xl md:text-5xl mb-3">
                Termine sua personalização
              </h1>
              <p className="text-muted-foreground text-lg">
                Adicione os detalhes que vão eternizar sua história
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Foto */}
              <div>
                <Label className="text-sm uppercase tracking-widest text-muted-foreground mb-3 block">
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

            <div className="flex gap-3 justify-between mt-10">
              <Button variant="outline" onClick={() => setStep(2)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
              <Button
                onClick={handleAdicionarAoCarrinho}
                disabled={adicionando || !nome.trim()}
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
          </section>
        )}
      </main>
    </div>
  );
};

export default CriarMinhaJoia;
