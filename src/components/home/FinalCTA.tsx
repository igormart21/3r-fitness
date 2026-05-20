import atelieBg from "@/assets/atelie-cta-bg.png";

const WPP = "https://wa.me/5548991486304?text=Ol%C3%A1!%20Quero%20fazer%20minha%20medalha%20personalizada%203R%20Fitness.";

export const FinalCTA = () => (
  <section style={{ position: "relative", overflow: "hidden", padding: "120px 0" }}>
    <img src={atelieBg} alt="" aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%", filter: "brightness(0.30) saturate(0.9)" }} />
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(28,24,20,0.85) 0%, rgba(28,24,20,0.55) 100%)" }} />

    <div style={{ position: "relative", zIndex: 2, maxWidth: 720, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(201,162,32,0.15)", border: "1px solid rgba(201,162,32,0.35)", borderRadius: 100, padding: "6px 16px", marginBottom: 28 }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C9A220", display: "block" }} />
        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: "#E8C84A" }}>Pronto para começar?</span>
      </div>

      <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.2rem,4.5vw,3.8rem)", fontWeight: 400, color: "#F8F5F0", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 18 }}>
        Crie agora a sua <em style={{ color: "#E8C84A" }}>medalha única</em>
      </h2>

      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, fontWeight: 300, color: "rgba(248,245,240,0.60)", lineHeight: 1.7, marginBottom: 40, maxWidth: "42ch", margin: "0 auto 40px" }}>
        Atendimento personalizado pelo WhatsApp. Entregamos para todo o Brasil com embalagem premium.
      </p>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 36 }}>
        <a href={WPP} target="_blank" rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: 9,
            background: "linear-gradient(135deg, #C9A220 0%, #E8C84A 100%)",
            color: "#fff", fontFamily: "'Inter',sans-serif", fontSize: 15, fontWeight: 600,
            padding: "15px 32px", borderRadius: 14,
            boxShadow: "0 8px 40px rgba(201,162,32,0.40)",
            transition: "transform 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = ""}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20.5 3.5A12 12 0 0 0 3.5 20.5L2 22l1.5-.5A12 12 0 1 0 20.5 3.5zm-8.5 18a10 10 0 0 1-5.4-1.6l-.4-.3-3.6.9.9-3.5-.3-.4A10 10 0 1 1 12 21.5zm5.5-7.5c-.3-.1-1.7-.9-2-.9s-.5.1-.6.3l-.9 1.1c-.1.2-.3.2-.5.1a8 8 0 0 1-2.4-1.5 8.5 8.5 0 0 1-1.7-2c-.1-.3 0-.5.1-.6l.5-.6.3-.6v-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.4 1.4 3.6c.2.2 2.4 3.7 5.9 5.1a17 17 0 0 0 2 .7c.8.2 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.1-.4-.2-.8-.4z"/></svg>
          Falar no WhatsApp
        </a>
      </div>

      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 20 }}>
        {["Entrega nacional", "Ouro 18k e Prata", "+1.000 atletas"].map(t => (
          <div key={t} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ color: "#C9A220" }}>✓</span>
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 400, color: "rgba(248,245,240,0.45)" }}>{t}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FinalCTA;
