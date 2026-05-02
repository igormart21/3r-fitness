import { MessageCircle } from "lucide-react";

export const WhatsappFloatingButton = () => {
  return (
    <a
      href="https://wa.me/5548991486304"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a loja no WhatsApp"
      className="fixed top-20 left-5 sm:top-24 sm:left-6 z-50 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2"
      style={{
        background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
        boxShadow: "0 10px 25px rgba(37, 211, 102, 0.45)",
      }}
    >
      <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} fill="currentColor" />
    </a>
  );
};
