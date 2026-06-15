const WPP_CONTATO =
  "https://wa.me/5548991486304?text=Ol%C3%A1!%20N%C3%A3o%20encontrei%20a%20joia%20que%20procuro%20no%20site.%20Pode%20me%20ajudar%20a%20criar%20uma%20pe%C3%A7a%3F";

type Props = {
  /** "light" para fundos claros (padrão), "dark" para fundos escuros */
  variant?: "light" | "dark";
  style?: React.CSSProperties;
};

export const NaoEncontrouCTA = ({ variant = "light", style }: Props) => {
  const dark = variant === "dark";
  const titleColor = dark ? "#F4EAD0" : "#1C1814";
  const subColor = dark ? "rgba(248,245,240,0.55)" : "#6B5E52";
  const border = dark ? "1px solid rgba(212,175,55,0.18)" : "1px solid rgba(28,24,20,0.10)";
  const labelColor = "#C9A220";

  return (
    <div
      style={{
        marginTop: 56,
        paddingTop: 40,
        borderTop: border,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 8,
        ...style,
      }}
    >
      <span
        style={{
          fontFamily: "'Inter',sans-serif",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: labelColor,
        }}
      >
        Atendimento exclusivo
      </span>
      <h3
        style={{
          fontFamily: "'Cormorant Garamond','Playfair Display',serif",
          fontSize: "clamp(1.5rem,3vw,2rem)",
          fontWeight: 400,
          color: titleColor,
          lineHeight: 1.2,
          margin: 0,
        }}
      >
        Não encontrou a joia que procura?
      </h3>
      <p
        style={{
          fontFamily: "'Inter',sans-serif",
          fontSize: 14,
          fontWeight: 300,
          color: subColor,
          lineHeight: 1.7,
          maxWidth: "46ch",
          margin: "2px 0 18px",
        }}
      >
        Criamos peças personalizadas e sob medida para a sua modalidade. Fale com a
        gente e desenhamos a joia perfeita para você.
      </p>
      <a
        href={WPP_CONTATO}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          background: "#1C1814",
          color: "#F8F5F0",
          fontFamily: "'Inter',sans-serif",
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: "0.03em",
          padding: "14px 30px",
          borderRadius: 12,
          textDecoration: "none",
          transition: "background 0.25s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#C9A220")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#1C1814")}
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
          <path d="M20.5 3.5A12 12 0 0 0 3.5 20.5L2 22l1.5-.5A12 12 0 1 0 20.5 3.5zm-8.5 18a10 10 0 0 1-5.4-1.6l-.4-.3-3.6.9.9-3.5-.3-.4A10 10 0 1 1 12 21.5zm5.5-7.5c-.3-.1-1.7-.9-2-.9s-.5.1-.6.3l-.9 1.1c-.1.2-.3.2-.5.1a8 8 0 0 1-2.4-1.5 8.5 8.5 0 0 1-1.7-2c-.1-.3 0-.5.1-.6l.5-.6.3-.6v-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.4 1.4 3.6c.2.2 2.4 3.7 5.9 5.1a17 17 0 0 0 2 .7c.8.2 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.1-.4-.2-.8-.4z" />
        </svg>
        Falar no WhatsApp
      </a>
    </div>
  );
};

export default NaoEncontrouCTA;
