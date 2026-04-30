import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const CriarMinhaJoia = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-4xl md:text-5xl mb-4">Criar minha joia</h1>
        <p className="text-muted-foreground">Página em construção.</p>
      </main>
    </div>
  );
};

export default CriarMinhaJoia;
