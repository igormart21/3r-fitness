import { useState, useRef, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Zap, Loader2, ChevronRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { useCartStore } from "@/stores/cartStore";
import { useCartUIStore } from "@/stores/cartUIStore";
import {
  storefrontApiRequest,
  STOREFRONT_QUERY,
  ShopifyProduct,
  createShopifyCart,
} from "@/lib/shopify";
import colecoesHero from "@/assets/colecoes-hero.jpg";
import logo3r from "@/assets/3r-logo.png";
import sportFisiculturismo from "@/assets/sport-fisiculturismo.jpg";
import sportMusculacao from "@/assets/sport-musculacao.jpg";
import sportTriathlon from "@/assets/sport-triathlon.jpg";
import sportCiclismo from "@/assets/sport-ciclismo.jpg";
import sportCrossfit from "@/assets/hero-crossfit.png";
import sportCorrida from "@/assets/sport-corrida.jpg";

// ── Imagens ──────────────────────────────────────────────────────────────────
import halterOuro    from "@/assets/linha-halter-ouro.jpg";
import halterPrata   from "@/assets/linha-halter-prata.jpg";
import vigorOuro     from "@/assets/linha-vigor-ouro.jpg";
import vigorPrata    from "@/assets/linha-vigor-prata.jpg";
import imperiumOuro  from "@/assets/linha-imperium-ouro.jpg";
import imperiumPrata from "@/assets/linha-imperium-prata.jpg";
import strataOuro    from "@/assets/linha-strata-ouro.jpg";
import strataPrata   from "@/assets/linha-strata-prata.jpg";
import veloxOuro     from "@/assets/linha-velox-royale-ouro-masculino.jpg";
import veloxPrata    from "@/assets/linha-velox-royale-prata-masculino.jpg";
import aeronOuro     from "@/assets/linha-aeron-ouro.png";
import aeronPrata    from "@/assets/linha-aeron-prata-masculino.jpg";
import trionOuro     from "@/assets/linha-trion-elite-ouro.png";
import velarionOuro  from "@/assets/linha-velarion-ouro.png";
import triadeOuro    from "@/assets/linha-triade-ouro.jpg";
import triadePrata   from "@/assets/linha-triade-prata.jpg";
import dominusOuro   from "@/assets/linha-dominus-ouro.png";
import monarchOuro   from "@/assets/linha-monarch-ouro.png";
import valenzaOuro   from "@/assets/linha-valenza-ouro.png";
import titanImg      from "@/assets/boneco-corredores-masc-classico-ouro.jpg";
import velocitaImg   from "@/assets/boneco-corredores-fem-classico-ouro.jpg";

// ── Utils ────────────────────────────────────────────────────────────────────
const fmtBRL = (v: string) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(parseFloat(v));

const WPP =
  "https://wa.me/5548991486304?text=Ol%C3%A1!%20Tenho%20interesse%20em%20uma%20joia%203R%20Fitness.%20Pode%20me%20informar%20mais%3F";

// ── Dados das coleções ────────────────────────────────────────────────────────
export type ColItem = {
  n: string; name: string; handle: string; sport: string;
  img: string; imgPrata: string; desc: string;
};

const COLECOES: ColItem[] = [
  { n:"01", name:"Halter",       handle:"halter",       sport:"Musculação",     img:halterOuro,   imgPrata:halterPrata,   desc:"Força que esculpe. Disciplina que constrói." },
  { n:"02", name:"Vigor",        handle:"vigor",        sport:"Musculação",     img:vigorOuro,    imgPrata:vigorPrata,    desc:"Evolução contínua. Presença marcante." },
  { n:"03", name:"Dominus",      handle:"dominus",      sport:"Fisiculturismo", img:dominusOuro,  imgPrata:dominusOuro,   desc:"A busca incessante pela melhor versão." },
  { n:"04", name:"Monarch",      handle:"monarch",      sport:"Fisiculturismo", img:monarchOuro,  imgPrata:monarchOuro,   desc:"Domínio, disciplina extrema e presença absoluta." },
  { n:"05", name:"Valenza",      handle:"valenza",      sport:"Fisiculturismo", img:valenzaOuro,  imgPrata:valenzaOuro,   desc:"A união perfeita entre força e elegância." },
  { n:"06", name:"Imperium",     handle:"imperium",     sport:"Crossfit",       img:imperiumOuro, imgPrata:imperiumPrata, desc:"Construída para quem nasceu para dominar." },
  { n:"07", name:"Strata",       handle:"strata",       sport:"Crossfit",       img:strataOuro,   imgPrata:strataPrata,   desc:"Movimento bruto refinado em luxo contemporâneo." },
  { n:"08", name:"Velox Royale", handle:"velox-royale", sport:"Ciclismo",       img:veloxOuro,    imgPrata:veloxPrata,    desc:"Potência, precisão e elegância em movimento." },
  { n:"09", name:"Aeron",        handle:"aeron",        sport:"Ciclismo",       img:aeronOuro,    imgPrata:aeronPrata,    desc:"Leveza, velocidade e constância sobre duas rodas." },
  { n:"10", name:"Titan",        handle:"titan",        sport:"Corrida",        img:titanImg,     imgPrata:titanImg,      desc:"Resistência mental, evolução e força silenciosa." },
  { n:"11", name:"Velocità",     handle:"velocita",     sport:"Corrida",        img:velocitaImg,  imgPrata:velocitaImg,   desc:"Movimento transformado em elegância." },
  { n:"12", name:"Trion Elite",  handle:"trion-elite",  sport:"Triatlo",        img:trionOuro,    imgPrata:trionOuro,     desc:"Para atletas que vivem além dos limites comuns." },
  { n:"13", name:"Velarion",     handle:"velarion",     sport:"Triatlo",        img:velarionOuro, imgPrata:velarionOuro,  desc:"Luxo silencioso. Performance elevada." },
  { n:"14", name:"Tríade",       handle:"triade",       sport:"Triatlo",        img:triadeOuro,   imgPrata:triadePrata,   desc:"Identidade de quem atravessa três mundos." },
];

const SPORTS = ["Todas", "Musculação", "Fisiculturismo", "Crossfit", "Ciclismo", "Corrida", "Triatlo"];

type TipoJoia = "Pingentes" | "Colares" | "Pulseiras" | "Anéis";
type MaterialFiltro = "Prata 925" | "Ouro 18k" | "Aço Inoxidável";

type CatalogProduct = {
  id: string;
  nome: string;
  categoria: string;
  tipo: TipoJoia;
  material: MaterialFiltro;
  preco: number;
  parcelas: number;
  imagem: string;
  collectionHandle: string;
};

const HERO_BY_SPORT: Record<string, string> = {
  Fisiculturismo: sportFisiculturismo,
  "Musculação": sportMusculacao,
  Corrida: sportCorrida,
  Ciclismo: sportCiclismo,
  Crossfit: sportCrossfit,
  Triatlo: sportTriathlon,
};

const SPORT_COPY: Record<string, string> = {
  Fisiculturismo: "Joias que representam sua paixão, disciplina e superação.",
  "Musculação": "Peças para quem constrói evolução diária com constância.",
  Corrida: "Cada quilômetro pode virar símbolo de uma conquista real.",
  Ciclismo: "Velocidade, resistência e estilo traduzidos em joias únicas.",
  Crossfit: "Força, potência e identidade em cada detalhe da peça.",
  Triatlo: "Uma joia para atletas de múltiplas frentes e grandes metas.",
  Todas: "Selecione uma categoria para visualizar coleções específicas.",
};

// ── Card de produto Shopify ──────────────────────────────────────────────────
const ProductCard = ({ product, fallbackImg }: { product: ShopifyProduct; fallbackImg: string }) => {
  const [selOpts, setSelOpts] = useState<Record<string, string>>({});
  const [adding, setAdding]   = useState(false);
  const [buying, setBuying]   = useState(false);
  const [added, setAdded]     = useState(false);

  const addItem  = useCartStore(s => s.addItem);
  const openCart = useCartUIStore(s => s.openCart);

  useEffect(() => {
    const init: Record<string, string> = {};
    product.node.options.forEach(o => { if (o.values[0]) init[o.name] = o.values[0]; });
    setSelOpts(init);
  }, [product.node.options]);

  const variants = product.node.variants.edges;
  const selVariant = (
    variants.find(({ node }) => node.selectedOptions.every(o => selOpts[o.name] === o.value))
    ?? variants[0]
  )?.node;

  const price = selVariant?.price ?? product.node.priceRange.minVariantPrice;

  // imagem: variante > produto > fallback local
  const shopifyImg =
    product.node.images?.edges?.[0]?.node?.url ?? null;
  const img = shopifyImg ?? fallbackImg;

  const handleAdd = async () => {
    if (!selVariant) return;
    setAdding(true);
    await addItem({
      product,
      variantId: selVariant.id,
      variantTitle: selVariant.title,
      price: selVariant.price,
      quantity: 1,
      selectedOptions: selVariant.selectedOptions,
      thumbnailImage: product.node.featuredImage ?? null,
    });
    setAdding(false);
    setAdded(true);
    setTimeout(() => { setAdded(false); openCart(); }, 900);
  };

  const handleBuy = async () => {
    if (!selVariant) return;
    setBuying(true);
    try {
      const r = await createShopifyCart({ variantId: selVariant.id, quantity: 1 });
      if (r?.checkoutUrl) window.location.href = r.checkoutUrl;
    } catch {}
    setBuying(false);
  };

  return (
    <div style={{ background: "#0E0B08", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(212,175,55,0.12)", display: "flex", flexDirection: "column" }}>
      {/* Imagem */}
      <div style={{ aspectRatio: "3/4", overflow: "hidden", flexShrink: 0 }}>
        <img src={img} alt={product.node.title} loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
      </div>

      {/* Conteúdo */}
      <div style={{ padding: "20px 18px 22px", display: "flex", flexDirection: "column", flex: 1, gap: 0 }}>
        <h4 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.25rem", fontWeight: 300, fontStyle: "italic", color: "#f0e6c8", marginBottom: 6, lineHeight: 1.2 }}>
          {product.node.title}
        </h4>

        {product.node.description && (
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 300, color: "rgba(255,255,255,0.35)", lineHeight: 1.6, marginBottom: 14 }}>
            {product.node.description.slice(0, 100)}{product.node.description.length > 100 ? "…" : ""}
          </p>
        )}

        {/* Opções */}
        {product.node.options.filter(o => o.values.length > 1).map(opt => (
          <div key={opt.name} style={{ marginBottom: 12 }}>
            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 7 }}>
              {opt.name}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {opt.values.map(val => {
                const sel = selOpts[opt.name] === val;
                return (
                  <button key={val} onClick={() => setSelOpts(p => ({ ...p, [opt.name]: val }))}
                    style={{ padding: "5px 12px", borderRadius: 6, fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 500, border: sel ? "1.5px solid #d4af37" : "1px solid rgba(255,255,255,0.10)", background: sel ? "rgba(212,175,55,0.12)" : "transparent", color: sel ? "#d4af37" : "rgba(255,255,255,0.40)", cursor: "pointer", transition: "all 0.15s" }}>
                    {val}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Preço */}
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.55rem", fontWeight: 300, color: "#f0e6c8", margin: "10px 0 16px" }}>
          {price ? fmtBRL(price.amount) : "–"}
        </div>

        {/* Botões */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: "auto" }}>
          <button onClick={handleAdd} disabled={adding || added || !selVariant}
            style={{ width: "100%", padding: "12px 0", borderRadius: 10, border: "none", background: added ? "#2a7a47" : "linear-gradient(135deg,#C9A220,#E8C84A)", color: added ? "#fff" : "#1C1814", fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.04em", cursor: adding || added || !selVariant ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "all 0.2s", opacity: !selVariant ? 0.4 : 1 }}>
            {adding ? <Loader2 size={13} style={{ animation: "col-spin 1s linear infinite" }} />
              : added ? "✓ Adicionado!"
              : <><ShoppingBag size={13} strokeWidth={1.5} /> Adicionar ao carrinho</>}
          </button>

          <button onClick={handleBuy} disabled={buying || !selVariant}
            style={{ width: "100%", padding: "11px 0", borderRadius: 10, border: "1px solid rgba(212,175,55,0.28)", background: "transparent", color: buying ? "rgba(255,255,255,0.25)" : "#d4af37", fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.04em", cursor: buying || !selVariant ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "all 0.2s", opacity: !selVariant ? 0.4 : 1 }}>
            {buying ? <Loader2 size={13} style={{ animation: "col-spin 1s linear infinite" }} />
              : <><Zap size={13} strokeWidth={1.5} /> Comprar agora</>}
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Vista de produtos de uma coleção ─────────────────────────────────────────
const ColecaoView = ({
  col,
  allProducts,
  loadingShopify,
  onBack,
}: {
  col: ColItem;
  allProducts: ShopifyProduct[];
  loadingShopify: boolean;
  onBack: () => void;
}) => {
  // Filtra produtos Shopify que pertencem a esta coleção
  const colName = col.name.toLowerCase();
  const products = allProducts.filter(p =>
    p.node.handle === col.handle ||
    p.node.handle.startsWith(col.handle + "-") ||
    p.node.title.toLowerCase().includes(colName)
  );

  return (
    <div>
      {/* Breadcrumb / header da coleção */}
      <div style={{ marginBottom: 40 }}>
        <button onClick={onBack}
          style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", background: "none", border: "none", cursor: "pointer", padding: 0, marginBottom: 24, transition: "color 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#d4af37")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
        >
          <ArrowLeft size={12} strokeWidth={1.5} /> Todas as coleções
        </button>

        <div style={{ display: "flex", alignItems: "flex-start", gap: 32 }} className="col-view-header">
          <style>{`@media(max-width:640px){.col-view-header{flex-direction:column!important;gap:20px!important;}}`}</style>

          {/* Imagem miniatura */}
          <div style={{ width: 120, height: 160, borderRadius: 12, overflow: "hidden", flexShrink: 0, border: "1px solid rgba(212,175,55,0.18)" }}>
            <img src={col.img} alt={col.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
          </div>

          <div style={{ paddingTop: 8 }}>
            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.45em", textTransform: "uppercase", color: "#d4af37", marginBottom: 10 }}>
              {col.sport} · Linha {col.n}
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, fontStyle: "italic", color: "#f0e6c8", lineHeight: 1.1, marginBottom: 10 }}>
              {col.name}
            </h2>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 300, color: "rgba(255,255,255,0.42)", lineHeight: 1.7, maxWidth: "52ch" }}>
              {col.desc}
            </p>
          </div>
        </div>

        <div style={{ height: 1, background: "linear-gradient(90deg,rgba(212,175,55,0.25),transparent)", marginTop: 28 }} />
      </div>

      {/* Produtos */}
      {loadingShopify ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200, gap: 12 }}>
          <Loader2 size={22} style={{ animation: "col-spin 1s linear infinite", color: "#d4af37" }} />
          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.30)" }}>Carregando produtos…</span>
        </div>
      ) : products.length > 0 ? (
        <div className="prod-view-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "24px 20px" }}>
          <style>{`
            @media(max-width:1100px){.prod-view-grid{grid-template-columns:repeat(3,1fr)!important;}}
            @media(max-width:760px){.prod-view-grid{grid-template-columns:repeat(2,1fr)!important;}}
            @media(max-width:480px){.prod-view-grid{grid-template-columns:1fr!important;}}
          `}</style>
          {products.map(p => (
            <ProductCard key={p.node.id} product={p} fallbackImg={col.img} />
          ))}
        </div>
      ) : (
        /* Nenhum produto no Shopify → fallback WPP */
        <div style={{ textAlign: "center", padding: "48px 24px" }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", border: "1px solid rgba(212,175,55,0.20)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <img src={col.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
          </div>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.4rem", fontWeight: 300, fontStyle: "italic", color: "#f0e6c8", marginBottom: 8 }}>
            Linha {col.name}
          </h3>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.35)", lineHeight: 1.7, marginBottom: 24, maxWidth: 360, margin: "0 auto 24px" }}>
            Esta linha está disponível sob encomenda. Fale conosco para preços e personalização.
          </p>
          <a href={WPP} target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", borderRadius: 12, background: "linear-gradient(135deg,#C9A220,#E8C84A)", color: "#1C1814", fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
            Encomendar no WhatsApp →
          </a>
        </div>
      )}
    </div>
  );
};

// ── Card de coleção (grid principal) ─────────────────────────────────────────
const ColecaoCard = ({ col, onClick }: { col: ColItem; onClick: () => void }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: "pointer" }}
    >
      {/* Imagem */}
      <div style={{ position: "relative", aspectRatio: "2/3", borderRadius: 16, overflow: "hidden", border: `1px solid ${hovered ? "rgba(212,175,55,0.40)" : "rgba(212,175,55,0.12)"}`, boxShadow: hovered ? "0 20px 56px rgba(0,0,0,0.60), 0 0 0 1px rgba(212,175,55,0.08)" : "0 6px 24px rgba(0,0,0,0.40)", transition: "all 0.35s" }}>
        <img src={col.img} alt={col.name} loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", transform: hovered ? "scale(1.05)" : "scale(1)", transition: "transform 0.55s ease", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.10) 55%)" }} />

        {/* N° */}
        <div style={{ position: "absolute", top: 12, left: 12, fontFamily: "'Inter',sans-serif", fontSize: 9, letterSpacing: "0.4em", color: "rgba(212,175,55,0.60)" }}>
          N° {col.n}
        </div>

        {/* Sport badge */}
        <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)", borderRadius: 100, padding: "3px 10px", border: "1px solid rgba(212,175,55,0.18)" }}>
          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(212,175,55,0.75)" }}>{col.sport}</span>
        </div>

        {/* Bottom info no hover */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 16px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(6px)", transition: "all 0.3s" }}>
          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#d4af37" }}>Ver linha</span>
          <ChevronRight size={14} color="#d4af37" strokeWidth={1.5} />
        </div>
      </div>

      {/* Info abaixo do card */}
      <div style={{ marginTop: 16, textAlign: "center" }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.35rem", fontWeight: 300, fontStyle: "italic", color: "#e9dcb1", marginBottom: 5, lineHeight: 1.2 }}>
          {col.name}
        </h3>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 300, color: "rgba(255,255,255,0.35)", lineHeight: 1.6, padding: "0 4px" }}>
          {col.desc}
        </p>
      </div>
    </div>
  );
};

// ── Seção IA ──────────────────────────────────────────────────────────────────
const WPP_PERS = "https://wa.me/5548991486304?text=Ol%C3%A1!%20Quero%20personalizar%20uma%20joia%20com%20minha%20foto.%20Pode%20me%20ajudar%3F";

const PersonalizarIA = () => {
  const inputRef                  = useRef<HTMLInputElement>(null);
  const [foto, setFoto]           = useState<string | null>(null);
  const [fotoUrl, setFotoUrl]     = useState<string | null>(null);
  const [material, setMaterial]   = useState<"ouro" | "prata">("ouro");
  const [estado, setEstado]       = useState<"idle" | "gerando" | "pronto" | "erro">("idle");
  const [resultado, setResultado] = useState<string | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFotoUrl(URL.createObjectURL(file));
    const reader = new FileReader();
    reader.onload = ev => setFoto(ev.target?.result as string);
    reader.readAsDataURL(file);
    setResultado(null); setEstado("idle");
  };

  const handleGerar = async () => {
    setEstado("gerando"); setResultado(null);
    try {
      const res = await fetch("/api/gerar-joia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: foto ?? undefined, material }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResultado(data.imageUrl); setEstado("pronto");
    } catch { setEstado("erro"); }
  };

  return (
    <section style={{ background: "#0A0806", padding: "80px 0", borderTop: "1px solid rgba(212,175,55,0.10)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(212,175,55,0.10)", border: "1px solid rgba(212,175,55,0.25)", borderRadius: 100, padding: "5px 16px", marginBottom: 20 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#d4af37", display: "block", animation: "col-pulse 2s infinite" }} />
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.35em", textTransform: "uppercase", color: "#d4af37" }}>Exclusivo · IA</span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 300, color: "#f4ead0", lineHeight: 1.2, marginBottom: 12 }}>
            Transforme sua foto em uma <em style={{ color: "#d4af37" }}>joia exclusiva</em>
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 300, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
            Envie sua foto, escolha o material e o site gera a prévia em tempo real.
          </p>
        </div>

        <div className="col-pers-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
          <style>{`.col-pers-grid{} @media(max-width:768px){.col-pers-grid{grid-template-columns:1fr!important;}}`}</style>
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {[
              { n: "01", t: "Envie sua foto", d: "Selecione a foto que inspira a sua joia — uma competição, treino ou momento especial." },
              { n: "02", t: "Escolha o material", d: "Ouro 18k ou Prata 925. O design será criado com base na sua imagem." },
              { n: "03", t: "Veja o resultado", d: "O site gera a prévia em tempo real. Aprovou? Peça a joia com um clique." },
            ].map(({ n, t, d }) => (
              <div key={n} style={{ display: "flex", gap: 18 }}>
                <div style={{ flexShrink: 0, width: 40, height: 40, borderRadius: 10, border: "1px solid rgba(212,175,55,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 13, color: "#d4af37" }}>{n}</span>
                </div>
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 17, color: "#f4ead0", marginBottom: 4 }}>{t}</div>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 300, color: "rgba(255,255,255,0.40)", lineHeight: 1.7, margin: 0 }}>{d}</p>
                </div>
              </div>
            ))}
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.20)", marginTop: 8 }}>
              ✦ Geração por IA · Ouro 18k ou Prata 925 · Entrega em todo o Brasil
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div onClick={() => estado !== "gerando" && inputRef.current?.click()}
              style={{ border: fotoUrl ? "1px solid rgba(212,175,55,0.40)" : "1px dashed rgba(255,255,255,0.12)", borderRadius: 14, background: "rgba(255,255,255,0.02)", overflow: "hidden", cursor: estado === "gerando" ? "default" : "pointer", minHeight: 200, display: "flex", flexDirection: "column" }}>
              {fotoUrl ? (
                <>
                  <img src={fotoUrl} alt="Sua foto" style={{ width: "100%", height: 180, objectFit: "cover", display: "block" }} />
                  <div style={{ padding: "10px 16px", display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "#d4af37" }}>✓ Foto carregada</span>
                    {estado !== "gerando" && <button onClick={e => { e.stopPropagation(); setFoto(null); setFotoUrl(null); setResultado(null); setEstado("idle"); }} style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", background: "none", border: "none", cursor: "pointer", padding: 0 }}>Trocar</button>}
                  </div>
                </>
              ) : (
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 36, textAlign: "center" }}>
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 14, opacity: 0.7 }}>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, color: "#f4ead0", marginBottom: 4 }}>Envie sua foto</div>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.30)", margin: 0 }}>JPG, PNG ou WEBP</p>
                </div>
              )}
            </div>
            <input ref={inputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFile} />

            <div style={{ display: "flex", gap: 8 }}>
              {(["ouro", "prata"] as const).map(m => (
                <button key={m} onClick={() => setMaterial(m)} disabled={estado === "gerando"}
                  style={{ flex: 1, padding: "11px 0", borderRadius: 10, fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 600, border: material === m ? "1.5px solid #d4af37" : "1px solid rgba(255,255,255,0.10)", background: material === m ? "rgba(212,175,55,0.10)" : "transparent", color: material === m ? "#d4af37" : "rgba(255,255,255,0.35)", cursor: "pointer", transition: "all 0.2s" }}>
                  {m === "ouro" ? "Ouro 18k" : "Prata 925"}
                </button>
              ))}
            </div>

            <button onClick={handleGerar} disabled={estado === "gerando"}
              style={{ width: "100%", padding: "14px 0", borderRadius: 12, border: "none", background: estado === "gerando" ? "rgba(212,175,55,0.20)" : "linear-gradient(135deg,#C9A220,#E8C84A)", color: estado === "gerando" ? "rgba(255,255,255,0.40)" : "#1C1814", fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.05em", cursor: estado === "gerando" ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              {estado === "gerando"
                ? <><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "col-spin 1s linear infinite" }}><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>Gerando…</>
                : <><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>{resultado ? "Gerar novamente" : "Gerar minha joia"}</>}
            </button>

            {estado === "pronto" && resultado && (
              <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid rgba(212,175,55,0.30)" }}>
                <div style={{ position: "relative" }}>
                  <img src={resultado} alt="Joia gerada" style={{ width: "100%", display: "block" }} />
                  <div style={{ position: "absolute", top: 10, left: 10, background: "rgba(212,175,55,0.85)", borderRadius: 100, padding: "3px 10px" }}>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#1C1814" }}>Preview IA</span>
                  </div>
                </div>
                <div style={{ padding: "16px 18px" }}>
                  <a href={WPP_PERS} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, padding: "12px 0", borderRadius: 10, background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.25)", color: "#d4af37", fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 600, textDecoration: "none" }}>
                    Pedir esta joia no WhatsApp →
                  </a>
                </div>
              </div>
            )}
            {estado === "gerando" && <p style={{ textAlign: "center", fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.25)" }}>Pode levar até 20 segundos</p>}
            {estado === "erro" && <p style={{ textAlign: "center", fontFamily: "'Inter',sans-serif", fontSize: 11, color: "#E07070" }}>Erro ao gerar. Tente novamente.</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

// ── Página principal ──────────────────────────────────────────────────────────
const Colecao = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const totalItems = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));
  const openCart = useCartUIStore((s) => s.openCart);
  const addItem = useCartStore((s) => s.addItem);
  const [tipos, setTipos] = useState<TipoJoia[]>([]);
  const [materiais, setMateriais] = useState<MaterialFiltro[]>([]);
  const [ordem, setOrdem] = useState("Mais Vendidos");
  const [allProducts, setAllProducts] = useState<ShopifyProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct | null>(null);
  const [adding, setAdding] = useState(false);
  const [buying, setBuying] = useState(false);

  useEffect(() => {
    storefrontApiRequest(STOREFRONT_QUERY, { first: 80 })
      .then((data) => {
        const products: ShopifyProduct[] =
          (data?.data?.products?.edges ?? []).map((e: any) => ({ node: e.node }));
        setAllProducts(products);
      })
      .catch(() => {});
  }, []);
  const sportParam = searchParams.get("sport");
  const activeSport =
    sportParam && SPORTS.includes(sportParam)
      ? sportParam
      : "Fisiculturismo";
  const heroImage = activeSport === "Todas" ? colecoesHero : (HERO_BY_SPORT[activeSport] ?? colecoesHero);
  const heroCopy = SPORT_COPY[activeSport] ?? SPORT_COPY.Todas;

  const catalogProducts = useMemo<CatalogProduct[]>(() => {
    const tipoPorColecao: Record<string, TipoJoia> = {
      halter: "Pingentes",
      vigor: "Pingentes",
      dominus: "Pingentes",
      monarch: "Pingentes",
      valenza: "Pingentes",
      imperium: "Pingentes",
      strata: "Pingentes",
      "velox-royale": "Colares",
      aeron: "Colares",
      titan: "Pulseiras",
      velocita: "Anéis",
      "trion-elite": "Colares",
      velarion: "Colares",
      triade: "Pingentes",
    };

    const precoBase: Record<string, number> = {
      halter: 299.9,
      vigor: 349.9,
      dominus: 1899.9,
      monarch: 1699.9,
      valenza: 1499.9,
      imperium: 459.9,
      strata: 549.9,
      "velox-royale": 799.9,
      aeron: 699.9,
      titan: 459.9,
      velocita: 399.9,
      "trion-elite": 999.9,
      velarion: 1099.9,
      triade: 899.9,
    };

    return COLECOES.flatMap((c) => [
      {
        id: `${c.handle}-prata`,
        nome: `${c.name} ${c.sport}`,
        categoria: c.sport,
        tipo: tipoPorColecao[c.handle] ?? "Pingentes",
        material: "Prata 925",
        preco: Math.max((precoBase[c.handle] ?? 399.9) * 0.72, 149.9),
        parcelas: 6,
        imagem: c.imgPrata,
        collectionHandle: c.handle,
      },
      {
        id: `${c.handle}-ouro`,
        nome: `${c.name} ${c.sport}`,
        categoria: c.sport,
        tipo: tipoPorColecao[c.handle] ?? "Pingentes",
        material: "Ouro 18k",
        preco: precoBase[c.handle] ?? 399.9,
        parcelas: 10,
        imagem: c.img,
        collectionHandle: c.handle,
      },
    ]);
  }, []);

  const produtosFiltrados = useMemo(() => {
    let result = activeSport === "Todas"
      ? [...catalogProducts]
      : catalogProducts.filter((p) => p.categoria === activeSport);
    if (tipos.length) result = result.filter((p) => tipos.includes(p.tipo));
    if (materiais.length) result = result.filter((p) => materiais.includes(p.material));

    if (ordem === "Menor Preço") result = [...result].sort((a, b) => a.preco - b.preco);
    if (ordem === "Maior Preço") result = [...result].sort((a, b) => b.preco - a.preco);
    if (ordem === "Mais Novos") result = [...result].reverse();
    return result;
  }, [activeSport, catalogProducts, materiais, ordem, tipos]);

  const toggleTipo = (tipo: TipoJoia) => {
    setTipos((prev) => (prev.includes(tipo) ? prev.filter((t) => t !== tipo) : [...prev, tipo]));
  };
  const toggleMaterial = (material: MaterialFiltro) => {
    setMateriais((prev) => (prev.includes(material) ? prev.filter((m) => m !== material) : [...prev, material]));
  };

  const getShopifyMatch = (p: CatalogProduct) => {
    const handleNeedle = p.collectionHandle.toLowerCase();
    const materialNeedle = p.material.toLowerCase();
    const product = allProducts.find((sp) => {
      const h = sp.node.handle.toLowerCase();
      return h === handleNeedle || h.startsWith(`${handleNeedle}-`) || h.includes(handleNeedle);
    });
    if (!product) return { product: null, variant: null };

    const variants = product.node.variants.edges.map((v) => v.node);
    const variant =
      variants.find((v) =>
        v.selectedOptions.some((o) => o.value.toLowerCase().includes(materialNeedle)) ||
        v.title.toLowerCase().includes(materialNeedle)
      ) ?? variants[0] ?? null;

    return { product, variant };
  };

  const handleAddToCart = async () => {
    if (!selectedProduct) return;
    const { product, variant } = getShopifyMatch(selectedProduct);
    if (!product || !variant) return;
    setAdding(true);
    try {
      await addItem({
        product,
        variantId: variant.id,
        variantTitle: variant.title,
        price: variant.price,
        quantity: 1,
        selectedOptions: variant.selectedOptions,
        thumbnailImage: product.node.images?.edges?.[0]?.node ?? null,
      });
      setSelectedProduct(null);
      openCart();
    } finally {
      setAdding(false);
    }
  };

  const handleBuyNow = async () => {
    if (!selectedProduct) return;
    const { product, variant } = getShopifyMatch(selectedProduct);
    if (!product || !variant) return;
    setBuying(true);
    try {
      const cart = await createShopifyCart({ variantId: variant.id, quantity: 1 });
      if (cart?.checkoutUrl) window.location.href = cart.checkoutUrl;
    } finally {
      setBuying(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f7f7f7", color: "#1c1c1c" }}>
      <header style={{ background: "#fff", borderBottom: "1px solid #e8e8e8" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", height: 84, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, textDecoration: "none", color: "#555", fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>
            <ArrowLeft size={13} strokeWidth={1.5} /> Início
          </Link>
          <img src={logo3r} alt="3R Fitness" style={{ height: 82 }} />
          <button
            onClick={openCart}
            aria-label="Carrinho"
            style={{ position: "relative", width: 42, height: 42, borderRadius: 10, border: "1.5px solid rgba(28,24,20,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#1C1814", background: "none", cursor: "pointer", transition: "border-color 0.25s, color 0.25s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#C9A220"; (e.currentTarget as HTMLElement).style.color = "#C9A220"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(28,24,20,0.15)"; (e.currentTarget as HTMLElement).style.color = "#1C1814"; }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            {totalItems > 0 && (
              <span style={{ position: "absolute", top: -4, right: -4, minWidth: 18, height: 18, borderRadius: 100, background: "#C9A220", color: "#fff", fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px" }}>
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "18px 24px 64px" }}>
        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "#787878", marginBottom: 12 }}>
          INÍCIO &nbsp;&gt;&nbsp; CATEGORIAS &nbsp;&gt;&nbsp; <strong style={{ color: "#404040" }}>{activeSport === "Todas" ? "TODOS OS PRODUTOS" : activeSport.toUpperCase()}</strong>
        </div>

        <div className="category-hero" style={{ borderRadius: 8, overflow: "hidden", background: "#121212", marginBottom: 20, border: "1px solid #dedede", position: "relative", minHeight: 220 }}>
          <img src={heroImage} alt={activeSport} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "left center" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.9) 100%)" }} />
          <div className="category-hero-content" style={{ position: "relative", zIndex: 2, marginLeft: "48%", padding: "34px 32px", color: "#fff" }}>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 44, lineHeight: 1, marginBottom: 10 }}>
              {activeSport === "Todas" ? "TODOS OS PRODUTOS" : activeSport.toUpperCase()}
            </h1>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,0.84)", maxWidth: 460, lineHeight: 1.6 }}>{heroCopy}</p>
            <div style={{ display: "flex", gap: 24, marginTop: 20 }}>
              <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(232,200,74,0.9)" }}>Símbolos exclusivos</div>
              <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(232,200,74,0.9)" }}>Prata 925 e Ouro 18k</div>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 18, display: "flex", flexWrap: "wrap", gap: 8 }}>
          {SPORTS.map((s) => {
            const ativo = s === activeSport;
            return (
              <button key={s} onClick={() => setSearchParams({ sport: s })} style={{ padding: "8px 14px", borderRadius: 100, border: ativo ? "1px solid #1f1f1f" : "1px solid #d5d5d5", background: ativo ? "#1f1f1f" : "#fff", color: ativo ? "#fff" : "#666", fontSize: 11, fontFamily: "'Inter',sans-serif", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", cursor: "pointer" }}>
                {s === "Todas" ? "Todos os produtos" : s}
              </button>
            );
          })}
        </div>

        <div className="category-layout" style={{ display: "grid", gridTemplateColumns: "260px minmax(0,1fr)", gap: 20 }}>
          <style>{`
            @media(max-width:980px){.category-layout{grid-template-columns:1fr!important;}}
            @media(max-width:980px){.products-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;}}
            @media(max-width:560px){.products-grid{grid-template-columns:1fr!important;}}
            @media(max-width:980px){.category-hero-content{margin-left:0!important;padding:24px 20px!important;}}
          `}</style>

          <aside style={{ background: "#fff", border: "1px solid #e6e6e6", borderRadius: 8, padding: "16px 14px", height: "fit-content" }}>
            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 700, color: "#222", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>Filtrar por</div>
            <div style={{ borderTop: "1px solid #ececec", paddingTop: 12 }}>
              <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 700, color: "#555", textTransform: "uppercase", marginBottom: 10 }}>Tipo de joia</div>
              {(["Pingentes", "Colares", "Pulseiras", "Anéis"] as TipoJoia[]).map((tipo) => (
                <label key={tipo} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#4a4a4a", cursor: "pointer" }}>
                  <input type="checkbox" checked={tipos.includes(tipo)} onChange={() => toggleTipo(tipo)} />
                  {tipo}
                </label>
              ))}
            </div>
            <div style={{ borderTop: "1px solid #ececec", paddingTop: 12, marginTop: 12 }}>
              <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 700, color: "#555", textTransform: "uppercase", marginBottom: 10 }}>Material</div>
              {(["Prata 925", "Ouro 18k", "Aço Inoxidável"] as MaterialFiltro[]).map((material) => (
                <label key={material} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#4a4a4a", cursor: "pointer" }}>
                  <input type="checkbox" checked={materiais.includes(material)} onChange={() => toggleMaterial(material)} />
                  {material}
                </label>
              ))}
            </div>
          </aside>

          <section>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#666" }}>
                {produtosFiltrados.length} produtos em <strong style={{ color: "#222" }}>{activeSport === "Todas" ? "Todos os produtos" : activeSport}</strong>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#666" }}>Ordenar por:</span>
                <select value={ordem} onChange={(e) => setOrdem(e.target.value)} style={{ padding: "8px 12px", border: "1px solid #dadada", borderRadius: 6, fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#333", background: "#fff" }}>
                  <option>Mais Vendidos</option>
                  <option>Menor Preço</option>
                  <option>Maior Preço</option>
                  <option>Mais Novos</option>
                </select>
              </div>
            </div>

            <div className="products-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 16 }}>
              {produtosFiltrados.map((p) => (
                <article key={p.id} style={{ background: "#fff", borderRadius: 8, border: "1px solid #e8e8e8", overflow: "hidden" }}>
                  <div style={{ aspectRatio: "1/1", background: "#f2f2f2" }}>
                    <img src={p.imagem} alt={p.nome} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ padding: "10px 10px 12px" }}>
                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 600, color: "#282828", textTransform: "uppercase", lineHeight: 1.4, minHeight: 34 }}>
                      {p.tipo.slice(0, -1)} {p.categoria} {p.material.toUpperCase()}
                    </div>
                    <div style={{ marginTop: 8, fontFamily: "'Inter',sans-serif", fontSize: 22, fontWeight: 700, color: "#171717" }}>
                      {fmtBRL(String(p.preco))}
                    </div>
                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#666", marginTop: 2 }}>
                      em até {p.parcelas}x de {fmtBRL(String(p.preco / p.parcelas))}
                    </div>
                    <button
                      onClick={() => setSelectedProduct(p)}
                      style={{ marginTop: 10, width: "100%", border: "1px solid #121212", background: "#121212", color: "#fff", borderRadius: 6, padding: "10px 12px", fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}
                    >
                      Ver joia
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {produtosFiltrados.length === 0 && (
              <div style={{ marginTop: 24, background: "#fff", border: "1px solid #ececec", borderRadius: 8, padding: 24, textAlign: "center", fontFamily: "'Inter',sans-serif", color: "#666" }}>
                Nenhum produto encontrado com os filtros selecionados.
              </div>
            )}
          </section>
        </div>
      </main>
      {selectedProduct && (
        <div
          onClick={() => setSelectedProduct(null)}
          style={{ position: "fixed", inset: 0, zIndex: 80, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(2px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ width: "min(920px,100%)", background: "#fff", borderRadius: 10, overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr" }}
            className="product-modal"
          >
            <style>{`@media(max-width:820px){.product-modal{grid-template-columns:1fr!important;}}`}</style>
            <div style={{ background: "#f2f2f2", minHeight: 360 }}>
              <img src={selectedProduct.imagem} alt={selectedProduct.nome} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ padding: 24, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 38, lineHeight: 1, color: "#1f1f1f" }}>{selectedProduct.nome}</h3>
                <button onClick={() => setSelectedProduct(null)} style={{ border: "1px solid #ddd", background: "#fff", borderRadius: 8, width: 34, height: 34, cursor: "pointer" }}>x</button>
              </div>
              <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#666", marginBottom: 14 }}>
                {selectedProduct.tipo} • {selectedProduct.material} • {selectedProduct.categoria}
              </div>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, lineHeight: 1.7, color: "#4e4e4e", marginBottom: 18 }}>
                Joia exclusiva da linha {selectedProduct.nome.split(" ")[0]}, criada para representar sua trajetória no {selectedProduct.categoria.toLowerCase()} com acabamento premium e design autoral.
              </p>
              <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 34, fontWeight: 700, color: "#111", marginBottom: 2 }}>
                {fmtBRL(String(selectedProduct.preco))}
              </div>
              <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#666", marginBottom: 24 }}>
                em até {selectedProduct.parcelas}x de {fmtBRL(String(selectedProduct.preco / selectedProduct.parcelas))}
              </div>
              <div style={{ display: "grid", gap: 10, marginTop: "auto" }}>
                <button
                  onClick={handleAddToCart}
                  disabled={adding}
                  style={{ width: "100%", border: "1px solid #111", background: "#111", color: "#fff", borderRadius: 8, padding: "13px 12px", fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", cursor: adding ? "not-allowed" : "pointer", opacity: adding ? 0.65 : 1 }}
                >
                  {adding ? "Adicionando..." : "Adicionar ao carrinho"}
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={buying}
                  style={{ width: "100%", border: "1px solid #c9a220", background: "#fff", color: "#9a7c16", borderRadius: 8, padding: "13px 12px", fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", cursor: buying ? "not-allowed" : "pointer", opacity: buying ? 0.65 : 1 }}
                >
                  {buying ? "Redirecionando..." : "Comprar agora"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />

    </div>
  );
};

export default Colecao;
