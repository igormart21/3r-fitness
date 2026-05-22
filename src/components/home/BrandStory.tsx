import brandVideo from "@/assets/brand-video.mp4";

const WPP = "https://wa.me/5548991486304?text=Ol%C3%A1!%20Quero%20conhecer%20as%20medalhas%203R%20Fitness.";

export const BrandStory = () => {
  return (
    <section className="brand-section" style={{ background: "#F8F5F0", padding: "100px 24px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="brand-grid">
        <style>{`@media(max-width:768px){.brand-grid{grid-template-columns:1fr!important;}}`}</style>

        {/* Video */}
        <div style={{ position: "relative", borderRadius: 24, overflow: "hidden", boxShadow: "0 32px 80px rgba(28,24,20,0.14)" }}>
          <video
            loop
            playsInline
            controls
            style={{ width: "100%", display: "block", objectFit: "cover" }}
          >
            <source src={brandVideo} type="video/mp4" />
          </video>
          <div style={{ position: "absolute", inset: 0, borderRadius: 24, border: "1px solid rgba(201,162,32,0.20)", pointerEvents: "none" }} />
        </div>

        {/* Text */}
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(201,162,32,0.10)", border: "1px solid rgba(201,162,32,0.30)", borderRadius: 100, padding: "6px 16px", marginBottom: 28 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#C9A220", display: "block" }} />
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A220" }}>
              Nossa história
            </span>
          </div>

          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 400, color: "#1C1814", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 20 }}>
            Cada peça carrega a<br />
            <em style={{ color: "#C9A220" }}>essência do atleta</em>
          </h2>

          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, fontWeight: 300, color: "rgba(28,24,20,0.60)", lineHeight: 1.8, marginBottom: 16 }}>
            A 3R Fitness nasceu da paixão pelo esporte e pela excelência artesanal. Cada joia é criada à mão, com materiais nobres — Ouro 18k e Prata — para eternizar conquistas que vão além do pódio.
          </p>

          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, fontWeight: 300, color: "rgba(28,24,20,0.60)", lineHeight: 1.8, marginBottom: 40 }}>
            Do fisiculturismo ao triatlo, atendemos atletas e organizadores de eventos em todo o Brasil com joias 100% personalizadas e entregues com embalagem premium.
          </p>

          <div style={{ display: "flex", gap: 32, marginBottom: 40, flexWrap: "wrap" }}>
            {[
              { n: "+1.000", l: "Peças entregues" },
              { n: "+50",    l: "Eventos atendidos" },
              { n: "100%",   l: "Personalizado" },
            ].map(({ n, l }) => (
              <div key={l}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 400, color: "#C9A220", lineHeight: 1, marginBottom: 4 }}>{n}</div>
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 500, color: "rgba(28,24,20,0.40)", letterSpacing: "0.2em", textTransform: "uppercase" }}>{l}</div>
              </div>
            ))}
          </div>

          <a
            href={WPP}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 9,
              background: "linear-gradient(135deg, #C9A220 0%, #E8C84A 100%)",
              color: "#fff", fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 600,
              padding: "14px 28px", borderRadius: 12,
              boxShadow: "0 8px 32px rgba(201,162,32,0.30)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-2px)"; el.style.boxShadow = "0 16px 40px rgba(201,162,32,0.45)"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = ""; el.style.boxShadow = "0 8px 32px rgba(201,162,32,0.30)"; }}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M20.5 3.5A12 12 0 0 0 3.5 20.5L2 22l1.5-.5A12 12 0 1 0 20.5 3.5zm-8.5 18a10 10 0 0 1-5.4-1.6l-.4-.3-3.6.9.9-3.5-.3-.4A10 10 0 1 1 12 21.5zm5.5-7.5c-.3-.1-1.7-.9-2-.9s-.5.1-.6.3l-.9 1.1c-.1.2-.3.2-.5.1a8 8 0 0 1-2.4-1.5 8.5 8.5 0 0 1-1.7-2c-.1-.3 0-.5.1-.6l.5-.6.3-.6v-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.4 1.4 3.6c.2.2 2.4 3.7 5.9 5.1a17 17 0 0 0 2 .7c.8.2 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.1-.4-.2-.8-.4z"/>
            </svg>
            Falar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
