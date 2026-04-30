import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Sparkles, Package, Award, Gem, ShieldCheck, Heart, Clock } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import runnerEmotional from "@/assets/runner-emotional.jpg";
import colarDestaque from "@/assets/colar-destaque.jpg";

const GOLD = "#D4AF37";

const passos = [
  {
    icon: MapPin,
    title: "Escolha sua distância",
    desc: "5K, 10K, meia, maratona ou ultra — sua conquista, seu marco.",
  },
  {
    icon: Sparkles,
    title: "Personalize sua história",
    desc: "Nome, data, tempo e local. Cada detalhe gravado em prata.",
  },
  {
    icon: Package,
    title: "Receba sua joia",
    desc: "Produzida sob encomenda e enviada com cuidado até a sua porta.",
  },
];

const beneficios = [
  { icon: Heart, title: "Feito para atletas reais" },
  { icon: Sparkles, title: "Personalização única" },
  { icon: Gem, title: "Prata 925 de alta qualidade" },
  { icon: Award, title: "Design sofisticado" },
  { icon: ShieldCheck, title: "Resistente para o dia a dia" },
];

const depoimentos = [
  {
    nome: "Mariana S.",
    prova: "Maratona de São Paulo",
    texto:
      "Toda vez que olho meu colar, lembro da última quilômetro — quando achei que não ia conseguir. É emoção pura.",
  },
  {
    nome: "Rafael T.",
    prova: "Ultra 80km",
    texto:
      "Não é uma joia, é um troféu que carrego comigo. Quem corre entende o que está gravado ali.",
  },
  {
    nome: "Júlia M.",
    prova: "Meia Maratona do Rio",
    texto:
      "Ganhei do meu marido depois da minha primeira meia. Choro até hoje. Acabamento impecável.",
  },
];

const faqs = [
  {
    q: "Qual é o material da joia?",
    a: "Trabalhamos com Prata 925 maciça e Ouro 18K. Ambos com certificado de pureza e acabamento de alta joalheria.",
  },
  {
    q: "Como funciona a personalização?",
    a: "Você escolhe a distância, envia os detalhes (nome, data, tempo, local) e nossa equipe grava a laser, à mão, em cada peça. Cada joia é única.",
  },
  {
    q: "Quanto tempo leva para receber?",
    a: "Como cada peça é feita sob encomenda, a produção leva de 7 a 15 dias úteis, somado ao prazo de envio para o seu endereço.",
  },
  {
    q: "Posso usar todos os dias, inclusive treinando?",
    a: "Sim. A Prata 925 é resistente e pensada para o dia a dia. Recomendamos apenas evitar contato prolongado com cloro e produtos químicos agressivos.",
  },
  {
    q: "E se eu não gostar?",
    a: "Como é uma peça personalizada, não trabalhamos com troca por arrependimento, mas garantimos qualidade. Qualquer defeito de fabricação é trocado sem custo.",
  },
];

const CriarMinhaJoia = () => {
  const goCheckout = () => {
    document.getElementById("cta-final")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar mínima */}
      <header className="absolute top-0 left-0 right-0 z-30">
        <div className="container py-5">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-smooth"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
        </div>
      </header>

      {/* 2. BLOCO EMOCIONAL */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
        <img
          src={runnerEmotional}
          alt="Corredor cruzando a linha de chegada ao pôr do sol"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80" />

        <div className="relative container max-w-3xl text-center text-white animate-fade-in">
          <p
            className="text-xs md:text-sm uppercase tracking-[0.4em] mb-6"
            style={{ color: GOLD }}
          >
            3R Fitness
          </p>
          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl leading-tight mb-8">
            VOCÊ NÃO CORRE POR ACASO.
          </h1>
          <div className="space-y-4 text-base md:text-lg text-white/85 max-w-xl mx-auto leading-relaxed">
            <p>Você corre por algo maior.</p>
            <p>Cada treino. Cada dor. Cada conquista.</p>
            <p className="italic">
              Agora, tudo isso pode ser carregado com você — todos os dias.
            </p>
          </div>

          <button
            onClick={goCheckout}
            className="mt-12 inline-flex items-center justify-center px-10 py-4 text-black font-semibold tracking-[0.2em] text-sm shadow-elegant transition-smooth hover:-translate-y-0.5 hover:scale-105"
            style={{ backgroundColor: GOLD }}
          >
            CRIAR MEU COLAR
          </button>
        </div>
      </section>

      {/* 3. COMO FUNCIONA */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <p
              className="text-xs uppercase tracking-[0.3em] mb-3"
              style={{ color: GOLD }}
            >
              Como funciona
            </p>
            <h2 className="font-display text-3xl md:text-5xl">
              Três passos para eternizar sua história
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10 md:gap-6">
            {passos.map((p, i) => (
              <div
                key={p.title}
                className="text-center px-4 animate-fade-in"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 border"
                  style={{ borderColor: GOLD, color: GOLD }}
                >
                  <p.icon className="h-7 w-7" strokeWidth={1.5} />
                </div>
                <p
                  className="text-xs tracking-[0.3em] uppercase mb-3"
                  style={{ color: GOLD }}
                >
                  Passo {i + 1}
                </p>
                <h3 className="font-display text-2xl mb-3">{p.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BENEFÍCIOS */}
      <section className="py-24 md:py-32 bg-secondary/40 border-y border-border">
        <div className="container max-w-6xl">
          <div className="text-center mb-16">
            <p
              className="text-xs uppercase tracking-[0.3em] mb-3"
              style={{ color: GOLD }}
            >
              Por que 3R Fitness
            </p>
            <h2 className="font-display text-3xl md:text-5xl">
              Pensada nos mínimos detalhes
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {beneficios.map((b, i) => (
              <div
                key={b.title}
                className="bg-card border border-border rounded-lg p-6 text-center transition-smooth hover:-translate-y-1 hover:shadow-elegant animate-fade-in"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
                  style={{ backgroundColor: `${GOLD}15`, color: GOLD }}
                >
                  <b.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <p className="font-medium text-sm leading-snug">{b.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROVA SOCIAL */}
      <section className="py-24 md:py-32">
        <div className="container max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl">
              QUEM CORRE, RECONHECE.
            </h2>
            <div
              className="w-16 h-px mx-auto mt-6"
              style={{ backgroundColor: GOLD }}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {depoimentos.map((d, i) => (
              <figure
                key={d.nome}
                className="bg-card border border-border rounded-lg p-8 flex flex-col animate-fade-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div
                  className="font-display text-5xl leading-none mb-4"
                  style={{ color: GOLD }}
                >
                  “
                </div>
                <blockquote className="text-base leading-relaxed text-foreground/90 flex-1">
                  {d.texto}
                </blockquote>
                <figcaption className="mt-6 pt-6 border-t border-border">
                  <p className="font-semibold">{d.nome}</p>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                    {d.prova}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PRODUTO EM DESTAQUE */}
      <section className="py-24 md:py-32 bg-[#0d0b0a] text-white">
        <div className="container max-w-6xl grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="relative animate-fade-in">
            <img
              src={colarDestaque}
              alt="Colar 3R Fitness em prata 925 com pingente personalizado"
              className="w-full h-auto rounded-lg shadow-elegant"
              loading="lazy"
              width={1280}
              height={1280}
            />
          </div>
          <div className="animate-fade-in">
            <p
              className="text-xs uppercase tracking-[0.3em] mb-4"
              style={{ color: GOLD }}
            >
              Produto em destaque
            </p>
            <h2 className="font-display text-3xl md:text-5xl leading-tight mb-6">
              MAIS QUE UM ACESSÓRIO. <br />
              <span style={{ color: GOLD }}>UM SÍMBOLO DA SUA DISCIPLINA.</span>
            </h2>
            <p className="text-white/70 leading-relaxed mb-8 max-w-md">
              Em Prata 925, com gravação personalizada da sua maior conquista.
              Pensada para durar — assim como a sua memória.
            </p>
            <button
              onClick={goCheckout}
              className="inline-flex items-center justify-center px-10 py-4 text-black font-semibold tracking-[0.2em] text-sm shadow-elegant transition-smooth hover:-translate-y-0.5 hover:scale-105"
              style={{ backgroundColor: GOLD }}
            >
              CRIAR MEU COLAR
            </button>
          </div>
        </div>
      </section>

      {/* 7. SOBRE A MARCA */}
      <section className="py-24 md:py-32">
        <div className="container max-w-3xl text-center">
          <p
            className="text-xs uppercase tracking-[0.3em] mb-4"
            style={{ color: GOLD }}
          >
            Sobre a marca
          </p>
          <h2 className="font-display text-3xl md:text-4xl leading-tight mb-8">
            A 3R Fitness não é sobre acessórios.
            <br />
            <span style={{ color: GOLD }}>É sobre identidade.</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Criamos peças para quem entende que performance não é estética —
            é compromisso.
          </p>
        </div>
      </section>

      {/* 8. URGÊNCIA */}
      <section className="py-16 border-y border-border bg-secondary/40">
        <div className="container max-w-3xl text-center">
          <Clock
            className="h-7 w-7 mx-auto mb-4"
            style={{ color: GOLD }}
            strokeWidth={1.5}
          />
          <p className="font-display text-xl md:text-2xl">
            Produção limitada.{" "}
            <span className="text-muted-foreground">
              Cada peça é feita sob demanda.
            </span>
          </p>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="py-24 md:py-32">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <p
              className="text-xs uppercase tracking-[0.3em] mb-3"
              style={{ color: GOLD }}
            >
              Perguntas frequentes
            </p>
            <h2 className="font-display text-3xl md:text-4xl">
              Tudo o que você precisa saber
            </h2>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-display text-lg hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 10. CTA FINAL */}
      <section
        id="cta-final"
        className="relative py-32 md:py-40 overflow-hidden bg-[#0d0b0a] text-white"
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, ${GOLD}40 0%, transparent 60%)`,
          }}
        />
        <div className="relative container max-w-3xl text-center">
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl leading-tight mb-10">
            SUA HISTÓRIA NÃO TERMINA <br className="hidden md:block" />
            NA LINHA DE CHEGADA.
            <br />
            <span style={{ color: GOLD }}>ELA COMEÇA ALI.</span>
          </h2>
          <a
            href="#cta-final"
            className="inline-flex items-center justify-center px-12 py-5 text-black font-semibold tracking-[0.25em] text-sm md:text-base shadow-elegant transition-smooth hover:-translate-y-0.5 hover:scale-105"
            style={{ backgroundColor: GOLD }}
          >
            CRIAR MEU COLAR
          </a>
          <p className="mt-8 text-xs uppercase tracking-[0.3em] text-white/50">
            Prata 925 · Feito sob encomenda · Envio para todo Brasil
          </p>
        </div>
      </section>
    </div>
  );
};

export default CriarMinhaJoia;
