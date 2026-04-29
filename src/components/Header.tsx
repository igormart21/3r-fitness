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
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <a
            href="https://instagram.com/3rfitnessjr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm hover:text-accent transition-smooth"
            aria-label="Instagram @3rfitnessjr"
          >
            <Instagram className="h-5 w-5" strokeWidth={1.5} />
            <span className="font-medium tracking-wide">@3rfitnessjr</span>
          </a>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link to="/" className="hover:text-accent transition-smooth">Loja</Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 hover:text-accent transition-smooth outline-none">
              Coleções <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-background border border-border">
              <DropdownMenuItem asChild>
                <a href="#colecao-ouro" className="cursor-pointer">Coleção Ouro</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="#colecao-prata" className="cursor-pointer">Coleção Prata</a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <a href="#sobre" className="hover:text-accent transition-smooth">Sobre</a>
          <a href="#contato" className="hover:text-accent transition-smooth">Contato</a>
        </nav>
        <CartDrawer />
      </div>
    </header>
  );
};
