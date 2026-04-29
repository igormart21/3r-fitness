import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-3r-fitness.png";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-background">
      <img
        src={heroImage}
        alt="3R Fitness - Cada quilômetro tem uma história"
        className="w-full h-auto block"
        loading="eager"
      />
      {/* CTA sobreposto na posição do texto "CRIAR MINHA JOIA" da imagem */}
      <Link
        to="/criar-minha-joia"
        aria-label="Criar minha joia"
        className="absolute left-1/2 -translate-x-1/2 bottom-[6%] md:bottom-[8%] inline-flex items-center justify-center px-8 md:px-12 py-3 md:py-4 rounded-full bg-accent text-accent-foreground font-semibold tracking-wider text-sm md:text-base shadow-elegant hover:bg-accent/90 transition-smooth hover:-translate-y-0.5 hover:scale-105"
      >
        CRIAR MINHA JOIA
      </Link>
    </section>
  );
};
