import { Hero } from "@/components/Hero";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1">
        {/* Seção 1 - Hero com CTA */}
        <Hero />

        {/* Divisor com gradiente dourado e ornamento central */}
        <div className="relative w-full py-8 md:py-12 bg-background">
          <div className="container flex items-center justify-center gap-4">
            <div
              className="h-px flex-1 max-w-md"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(184,134,11,0.3) 30%, rgba(244,215,122,0.9) 50%, rgba(184,134,11,0.3) 70%, transparent 100%)",
              }}
            />
            <div className="relative flex items-center justify-center">
              <span
                className="block h-2 w-2 rotate-45"
                style={{
                  background:
                    "linear-gradient(135deg, #d4af37 0%, #f4d77a 50%, #b8860b 100%)",
                  boxShadow: "0 0 12px rgba(212,175,55,0.6)",
                }}
              />
            </div>
            <div
              className="h-px flex-1 max-w-md"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(184,134,11,0.3) 30%, rgba(244,215,122,0.9) 50%, rgba(184,134,11,0.3) 70%, transparent 100%)",
              }}
            />
          </div>
        </div>

        {/* Seção 2 - vazia para preencher */}
        <section
          className="relative w-full min-h-[60vh] flex items-center justify-center"
          style={{
            background:
              "radial-gradient(ellipse at center, hsl(0 0% 8%) 0%, hsl(0 0% 4%) 100%)",
          }}
        >
          <div className="container text-center">
            <p className="font-display text-sm tracking-[0.4em] uppercase text-muted-foreground/40">
              Seção em breve
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
