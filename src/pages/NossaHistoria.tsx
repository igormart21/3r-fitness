import { Link } from "react-router-dom";
import { ArrowLeft, Award, Heart, Sparkles } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const NossaHistoria = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero da página */}
        <section className="relative overflow-hidden border-b border-border">
          <div className="container py-20 md:py-28 max-w-4xl text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">
              3R Fitness · Joalheria Esportiva
            </p>
            <h1 className="font-display text-4xl md:text-6xl mb-6 leading-tight">
              Cada conquista merece <br className="hidden md:block" />
              ser <span className="text-accent">eternizada</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Transformamos quilômetros, suor e superação em joias feitas à mão —
              peças únicas que carregam a sua história.
            </p>
          </div>
        </section>

        {/* Nossa história */}
        <section className="container py-20 max-w-3xl">
          <h2 className="font-display text-3xl md:text-4xl mb-6">Nossa história</h2>
          <div className="space-y-5 text-muted-foreground text-base md:text-lg leading-relaxed">
            <p>
              A 3R Fitness nasceu da paixão por esporte e pelo poder simbólico das
              pequenas conquistas. Cada largada, cada linha de chegada e cada PR
              marcam um capítulo da sua trajetória.
            </p>
            <p>
              Acreditamos que medalhas ficam na gaveta, mas uma joia personalizada
              fica na pele — perto do coração, lembrando todos os dias do que você
              é capaz.
            </p>
            <p>
              Por isso, criamos joias artesanais em Prata 925 e Ouro 18K, gravadas
              com o seu nome, data, distância e tempo. Sua história, eternizada em
              metal nobre.
            </p>
          </div>
        </section>

        {/* Pilares */}
        <section className="bg-secondary/40 border-y border-border">
          <div className="container py-20 max-w-5xl">
            <h2 className="font-display text-3xl md:text-4xl mb-12 text-center">
              O que nos move
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Heart,
                  title: "Feito com propósito",
                  desc: "Cada peça é pensada para quem entende que treino é estilo de vida.",
                },
                {
                  icon: Sparkles,
                  title: "Artesanal e único",
                  desc: "Joias produzidas à mão, sob encomenda, com acabamento de alta joalheria.",
                },
                {
                  icon: Award,
                  title: "Conquista eterna",
                  desc: "Materiais nobres que duram a vida toda — assim como a sua memória.",
                },
              ].map((p) => (
                <div
                  key={p.title}
                  className="bg-card border border-border rounded-lg p-8 text-center transition-smooth hover:-translate-y-1 hover:shadow-elegant"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 text-accent mb-5">
                    <p.icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-xl mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="container py-20 max-w-3xl text-center">
          <h2 className="font-display text-3xl md:text-4xl mb-4">
            Pronto para criar a sua?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Monte sua joia personalizada em poucos passos.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/criar-minha-joia"
              className="inline-flex items-center justify-center px-8 py-4 rounded-none font-semibold tracking-[0.2em] text-sm shadow-elegant transition-smooth hover:-translate-y-0.5 hover:scale-105 text-black"
              style={{ backgroundColor: "#D4AF37" }}
            >
              CRIAR MINHA JOIA
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-smooth"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para a home
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default NossaHistoria;
