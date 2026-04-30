import { Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const HomeFloatingButton = () => {
  const location = useLocation();
  if (location.pathname === "/") return null;

  return (
    <Link
      to="/"
      aria-label="Voltar para a página inicial"
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 inline-flex items-center gap-2 px-5 h-11 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2"
    >
      <Home className="h-4 w-4" strokeWidth={2} />
      <span className="text-xs font-semibold uppercase tracking-[0.2em]">Home</span>
    </Link>
  );
};
