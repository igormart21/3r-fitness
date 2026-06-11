import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/Footer";
import logo3r from "@/assets/3r-logo.png";

const GOLD = "#C9A220";

const Section = ({ n, title, children }: { n: string; title: string; children: React.ReactNode }) => (
  <section style={{ marginBottom: 40 }}>
    <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 14 }}>
      <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, fontWeight: 600, fontStyle: "italic", color: GOLD, lineHeight: 1, minWidth: 34 }}>
        {n}
      </span>
      <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.4rem,3vw,1.9rem)", fontWeight: 500, color: "#1C1814", lineHeight: 1.2 }}>
        {title}
      </h2>
    </div>
    <div style={{ paddingLeft: 48, fontFamily: "'Inter',sans-serif", fontSize: 15, fontWeight: 300, color: "#4e463e", lineHeight: 1.8 }}>
      {children}
    </div>
  </section>
);

const Bullets = ({ items }: { items: string[] }) => (
  <ul style={{ listStyle: "none", margin: "10px 0", padding: 0, display: "flex", flexDirection: "column", gap: 7 }}>
    {items.map((it, i) => (
      <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "linear-gradient(135deg,#C9A220,#E8C84A)", marginTop: 9, flexShrink: 0 }} />
        <span>{it}</span>
      </li>
    ))}
  </ul>
);

const PoliticaTrocaDevolucao = () => {
  return (
    <div style={{ minHeight: "100vh", background: "#F8F5F0", color: "#1C1814" }}>
      {/* Header */}
      <header style={{ background: "#1C1814", borderBottom: "1px solid rgba(248,245,240,0.06)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 110, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link
            to="/"
            aria-label="Início"
            style={{ width: 42, height: 42, borderRadius: 10, border: "1.5px solid rgba(248,245,240,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#F8F5F0", transition: "border-color 0.25s, color 0.25s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = GOLD; (e.currentTarget as HTMLElement).style.color = "#E8C84A"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(248,245,240,0.15)"; (e.currentTarget as HTMLElement).style.color = "#F8F5F0"; }}
          >
            <ArrowLeft size={18} strokeWidth={1.75} />
          </Link>
          <Link to="/" style={{ display: "flex", alignItems: "center" }}>
            <img src={logo3r} alt="3R Fitness" style={{ height: 90, width: "auto", objectFit: "contain" }} />
          </Link>
          <div style={{ width: 42 }} />
        </div>
      </header>

      {/* Hero */}
      <div style={{ background: "linear-gradient(180deg,#1C1814 0%,#241f1a 100%)", padding: "56px 24px 64px", textAlign: "center" }}>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.4em", textTransform: "uppercase", color: GOLD, marginBottom: 14 }}>
          3R Fitness · Joias
        </p>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 500, color: "#F8F5F0", lineHeight: 1.1, letterSpacing: "-0.01em" }}>
          Política de Troca <em style={{ color: "#E8C84A" }}>e Devolução</em>
        </h1>
        <div style={{ width: 60, height: 1, background: "linear-gradient(90deg,transparent,#C9A220,transparent)", margin: "22px auto 0" }} />
      </div>

      {/* Content */}
      <main style={{ maxWidth: 860, margin: "0 auto", padding: "56px 24px 72px" }}>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15.5, fontWeight: 300, color: "#4e463e", lineHeight: 1.85, marginBottom: 48, paddingBottom: 32, borderBottom: "1px solid rgba(28,24,20,0.10)" }}>
          A 3R Fitness – Linha de Joias trabalha com peças cuidadosamente selecionadas e/ou
          produzidas, prezando pela qualidade, durabilidade e satisfação de seus clientes. Nossa
          política segue as diretrizes do Código de Defesa do Consumidor (Lei nº 8.078/1990).
        </p>

        <Section n="1" title="Direito de Arrependimento (Compras Online)">
          <p>
            Para compras realizadas fora do estabelecimento comercial (site, Instagram, WhatsApp etc.),
            o cliente poderá solicitar a devolução em até <strong>7 (sete) dias corridos</strong> após o
            recebimento do produto.
          </p>
          <p style={{ marginTop: 10, fontWeight: 500, color: "#1C1814" }}>Condições:</p>
          <Bullets items={[
            "A joia deve estar sem sinais de uso;",
            "Deve estar na embalagem original, com certificado (quando houver), etiqueta e acessórios;",
            "Não pode apresentar arranhões, amassados ou alterações;",
            "A solicitação deve ocorrer dentro do prazo legal.",
          ]} />
          <p style={{ marginTop: 10 }}>
            Após análise e aprovação, o reembolso será feito conforme a forma de pagamento utilizada.
          </p>
        </Section>

        <Section n="2" title="Troca por Defeito de Fabricação">
          <p>
            A 3R Fitness garante troca para defeitos de fabricação no prazo de até{" "}
            <strong>90 (noventa) dias corridos</strong>, conforme previsto no Código de Defesa do
            Consumidor para produtos duráveis.
          </p>
          <p style={{ marginTop: 10, fontWeight: 500, color: "#1C1814" }}>São considerados defeitos de fabricação:</p>
          <Bullets items={[
            "Quebra ou soltura de fecho sem mau uso;",
            "Cravação com queda de pedra sem impacto;",
            "Problemas estruturais na peça.",
          ]} />
          <p style={{ marginTop: 10, fontWeight: 500, color: "#1C1814" }}>Não são considerados defeitos:</p>
          <Bullets items={[
            "Oxidação natural;",
            "Desgaste por uso contínuo;",
            "Mau uso, quedas ou contato com produtos químicos;",
            "Danos causados por terceiros.",
          ]} />
          <p style={{ marginTop: 10 }}>A peça passará por análise técnica antes da aprovação da troca.</p>
        </Section>

        <Section n="3" title="Troca por Modelo ou Tamanho">
          <p>
            A troca por modelo, numeração (anel) ou outro item poderá ser solicitada em até{" "}
            <strong>7 dias corridos</strong> após o recebimento.
          </p>
          <p style={{ marginTop: 10, fontWeight: 500, color: "#1C1814" }}>Condições:</p>
          <Bullets items={[
            "Peça sem uso e sem sinais de manuseio;",
            "Embalagem original intacta;",
            "Primeira troca: (definir se será por conta da empresa ou do cliente);",
            "Demais trocas: frete por conta do cliente.",
          ]} />
          <p style={{ marginTop: 10, fontWeight: 500, color: "#8a6d12" }}>
            ⚠️ Peças personalizadas, sob medida ou gravadas não poderão ser trocadas.
          </p>
        </Section>

        <Section n="4" title="Peças Personalizadas">
          <p>
            Joias com gravações, ajustes personalizados, encomendas sob medida ou modificações
            específicas não poderão ser trocadas ou devolvidas, exceto em caso de defeito de fabricação.
          </p>
        </Section>

        <Section n="5" title="Reembolso">
          <p>O reembolso será realizado após análise e aprovação da devolução:</p>
          <Bullets items={[
            "Cartão de crédito: conforme regras da administradora;",
            "Pix/Transferência: em até 5 dias úteis;",
            "Boleto: depósito em conta indicada pelo cliente em até 5 dias úteis.",
          ]} />
        </Section>

        <Section n="6" title="Procedimento para Solicitação">
          <p>Para solicitar troca ou devolução, entre em contato:</p>
          <Bullets items={[
            "📧 E-mail: 3rfitnessjr@gmail.com",
            "📱 WhatsApp: 48999289170",
          ]} />
          <p style={{ marginTop: 10, fontWeight: 500, color: "#1C1814" }}>📦 Informar:</p>
          <Bullets items={[
            "Nome completo;",
            "Número do pedido;",
            "Motivo da solicitação;",
            "Fotos claras da peça.",
          ]} />
        </Section>

        <Section n="7" title="Cuidados com as Joias">
          <p>Para maior durabilidade das peças:</p>
          <Bullets items={[
            "Evite contato com perfumes, cremes e produtos químicos;",
            "Retire antes de atividades físicas intensas;",
            "Guarde separadamente para evitar atrito;",
            "Limpe com pano macio e seco.",
          ]} />
        </Section>

        <Section n="8" title="Disposições Finais">
          <p>
            A 3R Fitness se reserva o direito de atualizar esta Política sempre que necessário, visando
            melhorias e adequação à legislação vigente.
          </p>
        </Section>

        {/* CTA contato */}
        <div style={{ marginTop: 16, background: "#1C1814", borderRadius: 16, padding: "32px 28px", textAlign: "center" }}>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.5rem", fontStyle: "italic", color: "#F8F5F0", marginBottom: 18 }}>
            Precisa de ajuda com uma troca ou devolução?
          </p>
          <a
            href="https://wa.me/5548999289170?text=Ol%C3%A1!%20Preciso%20de%20ajuda%20com%20uma%20troca%2Fdevolu%C3%A7%C3%A3o."
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg,#C9A220,#E8C84A)", color: "#1C1814", fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "0.03em", padding: "14px 32px", borderRadius: 12, textDecoration: "none" }}
          >
            Falar no WhatsApp →
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PoliticaTrocaDevolucao;
