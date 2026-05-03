import { Link } from "react-router-dom";
import { Instagram, ChevronDown } from "lucide-react";
import { CartDrawer } from "./CartDrawer";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";


export const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container flex h-14 sm:h-16 items-center justify-between gap-2">
        <div className="flex items-center gap-3 sm:gap-6 min-w-0">
          <a
            href="https://instagram.com/3rfitnessjr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm hover:text-accent transition-smooth shrink-0"
            aria-label="Instagram @3rfitnessjr"
          >
            <Instagram className="h-5 w-5" strokeWidth={1.5} />
            <span className="hidden sm:inline font-medium tracking-wide">@3rfitnessjr</span>
          </a>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-xs sm:text-sm hover:text-accent transition-smooth outline-none shrink-0">
              Coleções <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-background border border-border z-50">
              <DropdownMenuItem asChild>
                <a href="#colecao-ouro" className="cursor-pointer">Coleção Ouro</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="#colecao-prata" className="cursor-pointer">Coleção Prata</a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link to="/" className="hover:text-accent transition-smooth">Início</Link>
          <Link to="/colecao" className="hover:text-accent transition-smooth tracking-[0.15em] uppercase text-xs">Coleções</Link>
          <Link to="/criar-minha-joia" className="hover:text-accent transition-smooth tracking-[0.15em] uppercase text-xs">Personalizar</Link>
          <a href="#contato" className="hover:text-accent transition-smooth">Contato</a>
        </nav>
        <CartDrawer />
      </div>
    </header>
  );
};
