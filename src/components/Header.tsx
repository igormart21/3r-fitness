import { Link } from "react-router-dom";
import { CartDrawer } from "./CartDrawer";

export const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-2xl font-semibold tracking-tight">Atelier</span>
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground hidden sm:inline">est. 2026</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link to="/" className="hover:text-accent transition-smooth">Loja</Link>
          <a href="#sobre" className="hover:text-accent transition-smooth">Sobre</a>
          <a href="#contato" className="hover:text-accent transition-smooth">Contato</a>
        </nav>
        <CartDrawer />
      </div>
    </header>
  );
};
