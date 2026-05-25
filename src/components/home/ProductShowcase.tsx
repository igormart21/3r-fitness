import { useState, useEffect } from "react";
import { ShopifyProduct, STOREFRONT_QUERY, storefrontApiRequest } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { useCartUIStore } from "@/stores/cartUIStore";

import linhaImperiumOuro from "@/assets/linha-imperium-ouro.jpg";
import linhaImperiumPrata from "@/assets/linha-imperium-prata.jpg";
import linhaStrataOuro from "@/assets/linha-strata-ouro.jpg";
import linhaStrataPrata from "@/assets/linha-strata-prata.jpg";
import linhaTriadeOuro from "@/assets/linha-triade-ouro.jpg";
import linhaTriadePrata from "@/assets/linha-triade-prata.jpg";
import linhaVigorOuro from "@/assets/linha-vigor-ouro.jpg";
import linhaVigorPrata from "@/assets/linha-vigor-prata.jpg";
import linhaHalterOuro from "@/assets/linha-halter-ouro.jpg";
import linhaHalterPrata from "@/assets/linha-halter-prata.jpg";
import linhaVeloxOuro from "@/assets/linha-velox-ouro.png";
import linhaVeloxPrata from "@/assets/linha-velox-royale-prata-masculino.jpg";
import linhaAeronOuro from "@/assets/linha-aeron-ouro.png";
import linhaAeronPrata from "@/assets/linha-aeron-prata-masculino.jpg";

const STATIC = [
  { nome: "Imperium", mat: "Ouro 18k", img: linhaImperiumOuro, hot: true },
  { nome: "Imperium", mat: "Prata",    img: linhaImperiumPrata },
  { nome: "Strata",   mat: "Ouro 18k", img: linhaStrataOuro, hot: true },
  { nome: "Strata",   mat: "Prata",    img: linhaStrataPrata },
  { nome: "Tríade",   mat: "Ouro 18k", img: linhaTriadeOuro },
  { nome: "Tríade",   mat: "Prata",    img: linhaTriadePrata },
  { nome: "Vigor",    mat: "Ouro 18k", img: linhaVigorOuro },
  { nome: "Vigor",    mat: "Prata",    img: linhaVigorPrata },
  { nome: "Halter",   mat: "Ouro 18k", img: linhaHalterOuro },
  { nome: "Halter",   mat: "Prata",    img: linhaHalterPrata },
  { nome: "Corrida",  mat: "Ouro 18k", img: linhaVeloxOuro },
  { nome: "Corrida",  mat: "Prata",    img: linhaVeloxPrata },
  { nome: "Ciclismo", mat: "Ouro 18k", img: linhaAeronOuro },
  { nome: "Ciclismo", mat: "Prata",    img: linhaAeronPrata },
];

const WPP = "https://wa.me/5548991486304?text=Ol%C3%A1!%20Tenho%20interesse%20em%20uma%20joia%203R%20Fitness.%20Pode%20me%20informar%20mais%3F";

const isGold = (title: string) =>
  title.toLowerCase().includes("ouro") || title.toLowerCase().includes("gold");

const fmtBRL = (amount: string) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(parseFloat(amount));

type ShopifyPreview = { product: ShopifyProduct; variantIdx: number };
type StaticPreview  = { img: string; nome: string; mat: string };
type Preview = { kind: "shopify"; data: ShopifyPreview } | { kind: "static"; data: StaticPreview } | null;

export const ProductShowcase = () => {
  const [shopifyProducts, setShopifyProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading]   = useState(true);
  const [preview, setPreview]   = useState<Preview>(null);
  const [adding, setAdding]     = useState(false);

  const addItem  = useCartStore(s => s.addItem);
  const openCart = useCartUIStore(s => s.openCart);

  useEffect(() => {
    storefrontApiRequest(STOREFRONT_QUERY, { first: 20 })
      .then(data => {
        const edges: ShopifyProduct[] = data?.data?.products?.edges ?? [];
        setShopifyProducts(edges);
      })
      .catch(() => {/* silently fall back to static */})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    document.body.style.overflow = preview ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [preview]);

  const useShopify = shopifyProducts.length > 0;

  const handleAddToCart = async () => {
    if (!preview || preview.kind !== "shopify") return;
    const { product, variantIdx } = preview.data;
    const variant = product.node.variants.edges[variantIdx]?.node;
    if (!variant || !variant.availableForSale) return;
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
      setPreview(null);
      openCart();
    } finally {
      setAdding(false);
    }
  };

  return (
    <section id="produtos" className="sec" style={{ background: "#F8F5F0", padding: "96px 0 80px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div className="showcase-header" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 48, flexWrap: "wrap", gap: 20 }}>
          <div>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.35em", textTransform: "uppercase", color: "#C9A220", marginBottom: 10 }}>
              Catálogo
            </p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 400, color: "#1C1814", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
              Linha de joias <em>do Ateliê</em>
            </h2>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, fontWeight: 300, color: "#6B5E52", marginTop: 10, lineHeight: 1.6, maxWidth: "46ch" }}>
              Cada joia é produzida com acabamento premium em Ouro 18k ou Prata. Personalize para a sua modalidade.
            </p>
          </div>
        </div>

        <style>{`
          @media(max-width:480px){.prod-grid{grid-template-columns:repeat(2,1fr)!important;}}
          .prod-card:hover .prod-zoom { opacity: 1 !important; }
        `}</style>

        {/* Loading skeleton */}
        {loading && (
          <div className="prod-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 12 }}>
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(28,24,20,0.07)" }}>
                <div style={{ aspectRatio: "2/3", background: "linear-gradient(90deg,#f0ebe4 25%,#e8e1d8 50%,#f0ebe4 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite" }} />
                <div style={{ padding: "14px 16px 16px" }}>
                  <div style={{ height: 18, background: "#ede7df", borderRadius: 4, marginBottom: 8 }} />
                  <div style={{ height: 12, background: "#ede7df", borderRadius: 4, width: "60%" }} />
                </div>
              </div>
            ))}
            <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
          </div>
        )}

        {/* Shopify products grid */}
        {!loading && useShopify && (
          <div className="prod-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 12 }}>
            {shopifyProducts.map((p) => {
              const product = p;
              const img = product.node.images?.edges?.[0]?.node?.url ?? "";
              const name = product.node.title;
              const price = product.node.priceRange.minVariantPrice;
              const hasMultipleVariants = product.node.variants.edges.length > 1;
              return (
                <div
                  key={product.node.id}
                  className="prod-card"
                  style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(28,24,20,0.07)", boxShadow: "0 2px 12px rgba(28,24,20,0.06)", transition: "transform 0.3s, box-shadow 0.3s" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-6px)"; el.style.boxShadow = "0 16px 40px rgba(28,24,20,0.14)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = ""; el.style.boxShadow = "0 2px 12px rgba(28,24,20,0.06)"; }}
                >
                  <div
                    style={{ position: "relative", aspectRatio: "2/3", background: "#F2EDE6", overflow: "hidden", cursor: "zoom-in" }}
                    onClick={() => setPreview({ kind: "shopify", data: { product, variantIdx: 0 } })}
                  >
                    {img ? (
                      <img
                        src={img}
                        alt={name}
                        loading="lazy"
                        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", transition: "transform 0.6s ease" }}
                        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                        onMouseLeave={e => (e.currentTarget.style.transform = "")}
                      />
                    ) : (
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", color: "#C9A220" }}>3R</span>
                      </div>
                    )}
                    <div className="prod-zoom" style={{ position: "absolute", inset: 0, background: "rgba(28,24,20,0.35)", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.25s" }}>
                      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#F8F5F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                      </svg>
                    </div>
                  </div>

                  <div style={{ padding: "14px 16px 16px" }}>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, fontWeight: 400, color: "#1C1814", marginBottom: 4 }}>{name}</div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 600, color: "#C9A220" }}>
                        {hasMultipleVariants ? "A partir de " : ""}{fmtBRL(price.amount)}
                      </span>
                      <button
                        onClick={() => setPreview({ kind: "shopify", data: { product, variantIdx: 0 } })}
                        style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 600, color: "#C9A220", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                      >
                        Ver →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Static fallback grid (when Shopify has no products) */}
        {!loading && !useShopify && (
          <div className="prod-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 12 }}>
            {STATIC.map(({ nome, mat, img, hot }, i) => (
              <div
                key={i}
                className="prod-card"
                style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(28,24,20,0.07)", boxShadow: "0 2px 12px rgba(28,24,20,0.06)", transition: "transform 0.3s, box-shadow 0.3s" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-6px)"; el.style.boxShadow = "0 16px 40px rgba(28,24,20,0.14)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = ""; el.style.boxShadow = "0 2px 12px rgba(28,24,20,0.06)"; }}
              >
                <div
                  style={{ position: "relative", aspectRatio: "2/3", background: "#F2EDE6", overflow: "hidden", cursor: "zoom-in" }}
                  onClick={() => setPreview({ kind: "static", data: { img, nome, mat } })}
                >
                  <img
                    src={img}
                    alt={`${nome} ${mat}`}
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", transition: "transform 0.6s ease" }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "")}
                  />
                  {hot && (
                    <div style={{ position: "absolute", top: 10, left: 10, background: "linear-gradient(135deg,#C9A220,#E8C84A)", color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 100, fontFamily: "'Inter',sans-serif" }}>
                      Popular
                    </div>
                  )}
                  <div className="prod-zoom" style={{ position: "absolute", inset: 0, background: "rgba(28,24,20,0.35)", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.25s" }}>
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#F8F5F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                    </svg>
                  </div>
                </div>
                <div style={{ padding: "14px 16px 16px" }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, fontWeight: 400, color: "#1C1814", marginBottom: 4 }}>{nome}</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 600, color: isGold(mat) ? "#C9A220" : "#6B5E52", display: "flex", alignItems: "center", gap: 5 }}>
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: isGold(mat) ? "linear-gradient(135deg,#C9A220,#E8C84A)" : "linear-gradient(135deg,#A0A0A0,#D4D4D4)", display: "inline-block", flexShrink: 0 }} />
                      {mat}
                    </span>
                    <a href={WPP} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                      style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 600, color: "#C9A220" }}>
                      Pedir →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox — Static */}
      {preview?.kind === "static" && (() => {
        const { img, nome, mat } = preview.data;
        return (
          <div
            onClick={() => setPreview(null)}
            style={{ position: "fixed", inset: 0, zIndex: 999, background: "rgba(28,24,20,0.88)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, cursor: "zoom-out" }}
          >
            <div
              onClick={e => e.stopPropagation()}
              style={{ position: "relative", background: "#fff", borderRadius: 20, overflow: "hidden", maxWidth: 520, width: "100%", boxShadow: "0 40px 100px rgba(28,24,20,0.50)" }}
            >
              <img src={img} alt={`${nome} ${mat}`} style={{ width: "100%", display: "block", objectFit: "cover" }} />
              <div style={{ padding: "20px 24px 24px", borderTop: "1px solid rgba(28,24,20,0.07)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 400, color: "#1C1814", marginBottom: 4 }}>{nome}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, color: isGold(mat) ? "#C9A220" : "#6B5E52" }}>
                      <span style={{ width: 9, height: 9, borderRadius: "50%", background: isGold(mat) ? "linear-gradient(135deg,#C9A220,#E8C84A)" : "linear-gradient(135deg,#A0A0A0,#D4D4D4)", display: "inline-block" }} />
                      {mat}
                    </div>
                  </div>
                  <button onClick={() => setPreview(null)} style={{ width: 36, height: 36, borderRadius: 10, border: "1.5px solid rgba(28,24,20,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#6B5E52", flexShrink: 0, cursor: "pointer", background: "none" }}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                </div>
                <a
                  href={WPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginTop: 20, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#1C1814", color: "#F8F5F0", fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 600, padding: "14px 24px", borderRadius: 12, textDecoration: "none" }}
                >
                  Pedir no WhatsApp →
                </a>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Lightbox — Shopify */}
      {preview?.kind === "shopify" && (() => {
        const { product, variantIdx } = preview.data;
        const node = product.node;
        const variants = node.variants.edges;
        const selectedVariant = variants[variantIdx]?.node;
        const img = node.images?.edges?.[0]?.node?.url ?? "";
        const hasVariants = variants.length > 1;

        return (
          <div
            onClick={() => setPreview(null)}
            style={{ position: "fixed", inset: 0, zIndex: 999, background: "rgba(28,24,20,0.88)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px", cursor: "zoom-out" }}
          >
            <style>{`
              @media(max-width:640px){.lb-inner{flex-direction:column!important;max-height:92vh!important;}
              .lb-img{width:100%!important;min-height:260px!important;max-height:320px!important;}
              .lb-info{max-height:none!important;overflow:visible!important;}}
              @keyframes spin{to{transform:rotate(360deg)}}
            `}</style>
            <div
              onClick={e => e.stopPropagation()}
              className="lb-inner"
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                background: "#fff",
                borderRadius: 20,
                overflow: "hidden",
                maxWidth: 900,
                width: "100%",
                maxHeight: "88vh",
                boxShadow: "0 40px 100px rgba(28,24,20,0.55)",
                cursor: "auto",
              }}
            >
              {/* Image — left panel */}
              <div
                className="lb-img"
                style={{ width: "48%", flexShrink: 0, background: "#F2EDE6", position: "relative", minHeight: 480 }}
              >
                {img ? (
                  <img
                    src={img}
                    alt={node.title}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                  />
                ) : (
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", color: "#C9A220" }}>3R</span>
                  </div>
                )}
              </div>

              {/* Info — right panel (scrollable) */}
              <div
                className="lb-info"
                style={{ flex: 1, overflowY: "auto", padding: "36px 32px 32px", display: "flex", flexDirection: "column" }}
              >
                {/* Close */}
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
                  <button onClick={() => setPreview(null)} style={{ width: 36, height: 36, borderRadius: 10, border: "1.5px solid rgba(28,24,20,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#6B5E52", cursor: "pointer", background: "none", flexShrink: 0 }}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                </div>

                {/* Title */}
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 400, color: "#1C1814", lineHeight: 1.15, marginBottom: 14 }}>{node.title}</div>

                {/* Description */}
                {node.description && (
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 300, color: "#6B5E52", lineHeight: 1.75, marginBottom: 24 }}>{node.description}</p>
                )}

                <div style={{ marginTop: "auto" }}>
                  {/* Variant selector */}
                  {hasVariants && (
                    <div style={{ marginBottom: 20 }}>
                      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(28,24,20,0.40)", marginBottom: 10 }}>
                        Material
                      </div>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {variants.map((ve, vi) => {
                          const v = ve.node;
                          const selected = vi === variantIdx;
                          const mat = v.selectedOptions.find(o => o.name.toLowerCase().includes("material") || o.name.toLowerCase().includes("tipo"))?.value ?? v.title;
                          return (
                            <button
                              key={v.id}
                              onClick={() => setPreview({ kind: "shopify", data: { product, variantIdx: vi } })}
                              disabled={!v.availableForSale}
                              style={{
                                fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 500,
                                padding: "8px 18px", borderRadius: 100,
                                border: selected ? "2px solid #C9A220" : "1.5px solid rgba(28,24,20,0.15)",
                                background: selected ? "rgba(201,162,32,0.08)" : "transparent",
                                color: selected ? "#C9A220" : "#6B5E52",
                                cursor: v.availableForSale ? "pointer" : "not-allowed",
                                opacity: v.availableForSale ? 1 : 0.4,
                                transition: "all 0.2s",
                              }}
                            >
                              {mat}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Price */}
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 20 }}>
                    <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 30, fontWeight: 400, color: "#1C1814" }}>
                      {selectedVariant ? fmtBRL(selectedVariant.price.amount) : fmtBRL(node.priceRange.minVariantPrice.amount)}
                    </span>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(28,24,20,0.35)" }}>BRL</span>
                  </div>

                  {/* Add to cart */}
                  <button
                    onClick={handleAddToCart}
                    disabled={adding || !selectedVariant?.availableForSale}
                    style={{
                      width: "100%", padding: "16px 24px", borderRadius: 12, border: "none",
                      background: selectedVariant?.availableForSale ? "#1C1814" : "rgba(28,24,20,0.10)",
                      color: selectedVariant?.availableForSale ? "#F8F5F0" : "#6B5E52",
                      fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: "0.05em",
                      cursor: (adding || !selectedVariant?.availableForSale) ? "not-allowed" : "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      transition: "background 0.25s",
                    }}
                    onMouseEnter={e => { if (selectedVariant?.availableForSale && !adding) (e.currentTarget as HTMLElement).style.background = "#C9A220"; }}
                    onMouseLeave={e => { if (selectedVariant?.availableForSale) (e.currentTarget as HTMLElement).style.background = "#1C1814"; }}
                  >
                    {adding ? (
                      <>
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "spin 1s linear infinite" }}>
                          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                        Adicionando...
                      </>
                    ) : selectedVariant?.availableForSale ? (
                      "Adicionar ao Carrinho"
                    ) : (
                      "Indisponível"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </section>
  );
};

export default ProductShowcase;
