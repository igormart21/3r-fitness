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
      {/* CTA sobreposto logo abaixo da coroa */}
      <Link
        to="/criar-minha-joia"
        aria-label="Criar minha joia"
        className="absolute left-[8%] md:left-[12%] top-[72%] md:top-[74%] inline-flex items-center justify-center px-12 md:px-20 py-3 md:py-4 rounded-full bg-black font-semibold tracking-[0.2em] text-sm md:text-base shadow-elegant hover:bg-black/90 transition-smooth hover:-translate-y-0.5 hover:scale-105"
        style={{ color: "#D4AF37" }}
      >
        CRIAR MINHA JOIA
      </Link>
    </section>
  );
};
