import { useRef, useState } from "react";

const WPP_BASE = "https://wa.me/5548991486304?text=";
const wppMsg = (mat: string) =>
  encodeURIComponent(
    `Olá! Acabei de gerar o design da minha joia personalizada em ${mat} no site. Quero fazer o pedido!`
  );

const STEPS = [
  { n: "01", title: "Envie sua foto", desc: "Selecione a foto que inspira a sua joia — uma competição, treino ou momento especial." },
  { n: "02", title: "Escolha o material", desc: "Ouro 18k ou Prata 925. O design será criado com base na sua imagem." },
  { n: "03", title: "Veja o resultado", desc: "O site gera a prévia em tempo real. Aprovou? Peça a joia com um clique." },
];

type Estado = "idle" | "gerando" | "pronto" | "erro";

export const PersonalizacaoTeaser = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [foto, setFoto]           = useState<string | null>(null);   // base64
  const [fotoUrl, setFotoUrl]     = useState<string | null>(null);   // object URL para preview
  const [material, setMaterial]   = useState<"ouro" | "prata">("ouro");
  const [estado, setEstado]       = useState<Estado>("idle");
  const [resultado, setResultado] = useState<string | null>(null);
  const [erro, setErro]           = useState<string | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFotoUrl(URL.createObjectURL(file));
    const reader = new FileReader();
    reader.onload = ev => setFoto(ev.target?.result as string);
    reader.readAsDataURL(file);
    setResultado(null);
    setErro(null);
    setEstado("idle");
  };

  const handleGerar = async () => {
    setEstado("gerando");
    setErro(null);
    setResultado(null);
    try {
      const res = await fetch("/api/gerar-joia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: foto ?? undefined, material }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResultado(data.imageUrl);
      setEstado("pronto");
    } catch (err: unknown) {
      setErro(err instanceof Error ? err.message : "Erro ao gerar imagem.");
      setEstado("erro");
    }
  };

  const materialLabel = material === "ouro" ? "Ouro 18k" : "Prata 925";

  return (
    <section id="personalizar" style={{ background: "#1C1814", padding: "100px 0", position: "relative", overflow: "hidden" }}>
      {/* Glow orbs */}
      <div style={{ position: "absolute", top: "-10%", right: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,162,32,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-15%", left: "-8%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,162,32,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(201,162,32,0.12)", border: "1px solid rgba(201,162,32,0.30)", borderRadius: 100, padding: "6px 18px", marginBottom: 24 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C9A220", display: "block", animation: "pers-pulse 2s ease-in-out infinite" }} />
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.35em", textTransform: "uppercase", color: "#E8C84A" }}>Exclusivo · Feito para você</span>
          </div>
          <style>{`@keyframes pers-pulse{0%,100%{opacity:1}50%{opacity:0.35}} @keyframes pers-spin{to{transform:rotate(360deg)}}`}</style>

          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 400, color: "#F8F5F0", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 14, maxWidth: 640, margin: "0 auto 14px" }}>
            Transforme sua melhor foto<br />em uma <em style={{ color: "#E8C84A" }}>joia exclusiva</em>
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, fontWeight: 300, color: "rgba(248,245,240,0.50)", lineHeight: 1.7, maxWidth: "42ch", margin: "0 auto" }}>
            Envie sua foto, escolha o material e o site gera a prévia da sua joia em tempo real.
          </p>
        </div>

        {/* Grid */}
        <div className="pers-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "start" }}>
          <style>{`@media(max-width:768px){.pers-grid{grid-template-columns:1fr!important;gap:40px!important;}}`}</style>

          {/* Steps */}
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {STEPS.map(({ n, title, desc }) => (
              <div key={n} style={{ display: "flex", gap: 20 }}>
                <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 12, border: "1px solid rgba(201,162,32,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 13, fontWeight: 400, color: "#C9A220" }}>{n}</span>
                </div>
                <div>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 400, color: "#F8F5F0", marginBottom: 6 }}>{title}</div>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 300, color: "rgba(248,245,240,0.45)", lineHeight: 1.7, margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
            <div style={{ borderTop: "1px solid rgba(248,245,240,0.08)", paddingTop: 24 }}>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 300, color: "rgba(248,245,240,0.25)", lineHeight: 1.6, margin: 0 }}>
                ✦ Geração por IA · Ouro 18k ou Prata 925 · Entrega em todo o Brasil
              </p>
            </div>
          </div>

          {/* Ferramenta */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Upload */}
            <div
              onClick={() => estado !== "gerando" && inputRef.current?.click()}
              style={{
                border: fotoUrl ? "1.5px solid rgba(201,162,32,0.40)" : "1.5px dashed rgba(248,245,240,0.15)",
                borderRadius: 18,
                background: fotoUrl ? "transparent" : "rgba(248,245,240,0.02)",
                overflow: "hidden",
                cursor: estado === "gerando" ? "default" : "pointer",
                transition: "border-color 0.3s",
                minHeight: 220,
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
              onMouseEnter={e => { if (!fotoUrl && estado !== "gerando") (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,162,32,0.40)"; }}
              onMouseLeave={e => { if (!fotoUrl) (e.currentTarget as HTMLElement).style.borderColor = "rgba(248,245,240,0.15)"; }}
            >
              {fotoUrl ? (
                <>
                  <img src={fotoUrl} alt="Sua foto" style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }} />
                  <div style={{ padding: "12px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 500, color: "#E8C84A" }}>✓ Foto carregada</span>
                    {estado !== "gerando" && (
                      <button
                        onClick={e => { e.stopPropagation(); setFoto(null); setFotoUrl(null); setResultado(null); setEstado("idle"); }}
                        style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(248,245,240,0.30)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                      >
                        Trocar foto
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40, textAlign: "center" }}>
                  <div style={{ width: 80, height: 80, borderRadius: "50%", border: "1px solid rgba(201,162,32,0.20)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                    <div style={{ width: 56, height: 56, borderRadius: "50%", border: "1px solid rgba(201,162,32,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#C9A220" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="17 8 12 3 7 8"/>
                        <line x1="12" y1="3" x2="12" y2="15"/>
                      </svg>
                    </div>
                  </div>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, fontWeight: 400, color: "#F8F5F0", marginBottom: 6 }}>Envie sua foto</div>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 300, color: "rgba(248,245,240,0.35)", lineHeight: 1.6, margin: 0, maxWidth: "26ch" }}>
                    Clique para selecionar · JPG, PNG ou WEBP
                  </p>
                </div>
              )}
            </div>
            <input ref={inputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFile} />

            {/* Material selector */}
            <div style={{ display: "flex", gap: 10 }}>
              {(["ouro", "prata"] as const).map(m => (
                <button
                  key={m}
                  onClick={() => setMaterial(m)}
                  disabled={estado === "gerando"}
                  style={{
                    flex: 1, padding: "12px 0", borderRadius: 12, fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600,
                    border: material === m ? "2px solid #C9A220" : "1.5px solid rgba(248,245,240,0.12)",
                    background: material === m ? "rgba(201,162,32,0.10)" : "transparent",
                    color: material === m ? "#E8C84A" : "rgba(248,245,240,0.40)",
                    cursor: estado === "gerando" ? "not-allowed" : "pointer",
                    transition: "all 0.2s",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  }}
                >
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: m === "ouro" ? "linear-gradient(135deg,#C9A220,#E8C84A)" : "linear-gradient(135deg,#A0A0A0,#D4D4D4)", display: "inline-block" }} />
                  {m === "ouro" ? "Ouro 18k" : "Prata 925"}
                </button>
              ))}
            </div>

            {/* Gerar button */}
            <button
              onClick={handleGerar}
              disabled={estado === "gerando"}
              style={{
                width: "100%", padding: "16px 24px", borderRadius: 14, border: "none",
                background: estado === "gerando"
                  ? "rgba(201,162,32,0.25)"
                  : "linear-gradient(135deg, #C9A220 0%, #E8C84A 100%)",
                color: estado === "gerando" ? "rgba(248,245,240,0.50)" : "#1C1814",
                fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "0.05em",
                cursor: estado === "gerando" ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                transition: "opacity 0.25s, transform 0.25s",
                boxShadow: estado === "gerando" ? "none" : "0 8px 32px rgba(201,162,32,0.22)",
              }}
              onMouseEnter={e => { if (estado !== "gerando") (e.currentTarget as HTMLElement).style.opacity = "0.88"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
            >
              {estado === "gerando" ? (
                <>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "pers-spin 1s linear infinite" }}>
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                  </svg>
                  Gerando sua joia…
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                  {resultado ? "Gerar novamente" : "Gerar minha joia"}
                </>
              )}
            </button>

            {/* Erro */}
            {estado === "erro" && erro && (
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#E07070", textAlign: "center", margin: 0 }}>
                {erro}
              </p>
            )}

            {/* Resultado */}
            {estado === "pronto" && resultado && (
              <div style={{ borderRadius: 18, overflow: "hidden", border: "1.5px solid rgba(201,162,32,0.35)", background: "#0E0B08" }}>
                <div style={{ position: "relative" }}>
                  <img
                    src={resultado}
                    alt="Sua joia gerada por IA"
                    style={{ width: "100%", display: "block", objectFit: "cover" }}
                  />
                  <div style={{ position: "absolute", top: 12, left: 12, background: "rgba(201,162,32,0.90)", borderRadius: 100, padding: "4px 12px" }}>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#1C1814" }}>Preview IA</span>
                  </div>
                </div>
                <div style={{ padding: "20px 20px 20px" }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 400, color: "#F8F5F0", marginBottom: 4 }}>
                    Design gerado · {materialLabel}
                  </div>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 300, color: "rgba(248,245,240,0.40)", lineHeight: 1.6, marginBottom: 16 }}>
                    Esta é a prévia do design. A joia final é produzida artesanalmente com acabamento premium.
                  </p>
                  <a
                    href={`${WPP_BASE}${wppMsg(materialLabel)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      padding: "13px 20px", borderRadius: 12, textDecoration: "none",
                      background: "#1C1814", border: "1.5px solid rgba(201,162,32,0.35)",
                      color: "#E8C84A", fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600,
                      transition: "background 0.25s",
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(201,162,32,0.12)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#1C1814"}
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                    </svg>
                    Pedir esta joia no WhatsApp
                  </a>
                </div>
              </div>
            )}

            {estado === "gerando" && (
              <p style={{ textAlign: "center", fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 300, color: "rgba(248,245,240,0.30)", margin: 0 }}>
                Gerando via IA · pode levar até 20 segundos
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalizacaoTeaser;
