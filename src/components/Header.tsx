import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";
import { CartDrawer } from "./CartDrawer";
import logo3R from "@/assets/3r-logo.png";

export const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <a
            href="https://instagram.com/3rfitnessjr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm hover:text-accent transition-smooth"
            aria-label="Instagram @3rfitnessjr"
          >
            <Instagram className="h-5 w-5" strokeWidth={1.5} />
          </a>
        </div>
        <Link to="/" className="hidden md:flex items-center gap-3 absolute left-1/2 -translate-x-1/2" aria-label="3R Fitness - Início">
          <img src={logo3R} alt="3R Fitness" className="h-10 w-auto" loading="eager" />
          <span className="font-display text-sm uppercase tracking-[0.25em] text-muted-foreground hidden sm:inline">Fitness</span>
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
