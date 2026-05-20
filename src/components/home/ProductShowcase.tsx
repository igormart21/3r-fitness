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

const WPP = "https://wa.me/5548991486304?text=Ol%C3%A1!%20Tenho%20interesse%20em%20uma%20medalha%203R%20Fitness.%20Pode%20me%20informar%20mais%3F";

const products = [
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
];

const isGold = (mat: string) => mat.includes("Ouro");

export const ProductShowcase = () => (
  <section id="produtos" style={{ background: "#F8F5F0", padding: "96px 0 80px" }}>
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 48, flexWrap: "wrap", gap: 20 }}>
        <div>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.35em", textTransform: "uppercase", color: "#C9A220", marginBottom: 10 }}>
            Catálogo
          </p>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 400, color: "#1C1814", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
            Linhas de <em>medalhas</em>
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, fontWeight: 300, color: "#6B5E52", marginTop: 10, lineHeight: 1.6, maxWidth: "46ch" }}>
            Cada peça é produzida com acabamento premium em Ouro 18k ou Prata. Personalize para a sua modalidade.
          </p>
        </div>
        <a
          href={WPP} target="_blank" rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "linear-gradient(135deg, #C9A220 0%, #E8C84A 100%)",
            color: "#fff", fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 600,
            padding: "13px 24px", borderRadius: 12,
            boxShadow: "0 4px 20px rgba(201,162,32,0.30)",
          }}
        >
          <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M20.5 3.5A12 12 0 0 0 3.5 20.5L2 22l1.5-.5A12 12 0 1 0 20.5 3.5zm-8.5 18a10 10 0 0 1-5.4-1.6l-.4-.3-3.6.9.9-3.5-.3-.4A10 10 0 1 1 12 21.5zm5.5-7.5c-.3-.1-1.7-.9-2-.9s-.5.1-.6.3l-.9 1.1c-.1.2-.3.2-.5.1a8 8 0 0 1-2.4-1.5 8.5 8.5 0 0 1-1.7-2c-.1-.3 0-.5.1-.6l.5-.6.3-.6v-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.4 1.4 3.6c.2.2 2.4 3.7 5.9 5.1a17 17 0 0 0 2 .7c.8.2 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.1-.4-.2-.8-.4z"/></svg>
          Fazer pedido
        </a>
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 16 }}>
        {products.map(({ nome, mat, img, hot }, i) => (
          <a
            key={i}
            href={WPP} target="_blank" rel="noopener noreferrer"
            style={{
              display: "block", background: "#fff", borderRadius: 16,
              overflow: "hidden", border: "1px solid rgba(28,24,20,0.07)",
              boxShadow: "0 2px 12px rgba(28,24,20,0.06)",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-6px)"; el.style.boxShadow = "0 16px 40px rgba(28,24,20,0.14)"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = ""; el.style.boxShadow = "0 2px 12px rgba(28,24,20,0.06)"; }}
          >
            {/* Image */}
            <div style={{ position: "relative", aspectRatio: "1", background: "#F2EDE6", overflow: "hidden" }}>
              <img src={img} alt={`${nome} ${mat}`} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "")}
              />
              {hot && (
                <div style={{ position: "absolute", top: 10, left: 10, background: "linear-gradient(135deg,#C9A220,#E8C84A)", color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 100, fontFamily: "'Inter',sans-serif" }}>
                  Popular
                </div>
              )}
            </div>
            {/* Info */}
            <div style={{ padding: "14px 16px 16px" }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, fontWeight: 400, color: "#1C1814", marginBottom: 4 }}>{nome}</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{
                  fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 600,
                  color: isGold(mat) ? "#C9A220" : "#6B5E52",
                  display: "flex", alignItems: "center", gap: 5,
                }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: isGold(mat) ? "linear-gradient(135deg,#C9A220,#E8C84A)" : "linear-gradient(135deg,#A0A0A0,#D4D4D4)", display: "inline-block", flexShrink: 0 }} />
                  {mat}
                </span>
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 600, color: "#C9A220" }}>Pedir →</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default ProductShowcase;
