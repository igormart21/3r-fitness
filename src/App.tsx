import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import CriarMinhaJoia from "./pages/CriarMinhaJoia.tsx";
import Catalogo from "./pages/Catalogo.tsx";
import Colecao from "./pages/Colecao.tsx";
import TesteBotoes from "./pages/TesteBotoes.tsx";
import NotFound from "./pages/NotFound.tsx";
import Auth from "./pages/Auth.tsx";
import { useCartSync } from "@/hooks/useCartSync";
import { InstagramFloatingButton } from "@/components/InstagramFloatingButton";
import { WhatsappFloatingButton } from "@/components/WhatsappFloatingButton";
import { HomeFloatingButton } from "@/components/HomeFloatingButton";
import { AuthFloatingButton } from "@/components/AuthFloatingButton";

const queryClient = new QueryClient();

const AppRoutes = () => {
  useCartSync();
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/product/:handle" element={<ProductDetail />} />
      <Route path="/criar-minha-joia" element={<CriarMinhaJoia />} />
      <Route path="/catalogo" element={<Catalogo />} />
      <Route path="/colecao" element={<Colecao />} />
      <Route path="/teste-botoes" element={<TesteBotoes />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <BrowserRouter>
        <AppRoutes />
        <InstagramFloatingButton />
        <WhatsappFloatingButton />
        <HomeFloatingButton />
        <AuthFloatingButton />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
