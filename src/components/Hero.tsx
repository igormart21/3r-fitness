export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-warm">
      <div className="container py-24 md:py-36 relative z-10">
        <div className="max-w-3xl">
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
            Nova coleção · Outono 2026
          </span>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium leading-[0.95] mb-6">
            Peças feitas <em className="text-accent not-italic">para durar</em>, pensadas para você.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
            Curadoria de produtos artesanais. Cada item é selecionado pela qualidade,
            origem e atemporalidade.
          </p>
          <div className="mt-10 flex items-center gap-6">
            <a href="#produtos" className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.2em] border-b-2 border-primary pb-1 hover:border-accent hover:text-accent transition-smooth">
              Explorar a loja
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
      <div className="absolute -right-32 -bottom-32 w-[500px] h-[500px] rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute -left-20 top-20 w-[300px] h-[300px] rounded-full bg-primary/5 blur-3xl" />
    </section>
  );
};
