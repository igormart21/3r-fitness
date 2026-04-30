export const Footer = () => {
  return (
    <footer id="contato" className="border-t border-border bg-secondary/40 mt-16 sm:mt-20">
      <div className="container py-10 sm:py-16 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 text-center md:text-left">
        <div>
          <h3 className="font-display text-2xl font-semibold mb-3">Atelier</h3>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto md:mx-0">
            Loja independente de produtos artesanais, com curadoria atemporal.
          </p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Loja</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#produtos" className="hover:text-accent transition-smooth">Produtos</a></li>
            <li><a href="#sobre" className="hover:text-accent transition-smooth">Sobre nós</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Contato</h4>
          <p className="text-sm text-muted-foreground break-words">contato@atelier.com</p>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container py-5 sm:py-6 text-[11px] sm:text-xs text-muted-foreground flex flex-col sm:flex-row flex-wrap justify-between gap-2 sm:gap-4 text-center sm:text-left">
          <span>© {new Date().getFullYear()} Atelier. Todos os direitos reservados.</span>
          <span>Powered by Shopify</span>
        </div>
      </div>
    </footer>
  );
};
