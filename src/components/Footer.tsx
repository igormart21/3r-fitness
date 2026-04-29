export const Footer = () => {
  return (
    <footer id="contato" className="border-t border-border bg-secondary/40 mt-20">
      <div className="container py-16 grid md:grid-cols-3 gap-10">
        <div>
          <h3 className="font-display text-2xl font-semibold mb-3">Atelier</h3>
          <p className="text-sm text-muted-foreground max-w-xs">
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
          <p className="text-sm text-muted-foreground">contato@atelier.com</p>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container py-6 text-xs text-muted-foreground flex flex-wrap justify-between gap-4">
          <span>© {new Date().getFullYear()} Atelier. Todos os direitos reservados.</span>
          <span>Powered by Shopify</span>
        </div>
      </div>
    </footer>
  );
};
