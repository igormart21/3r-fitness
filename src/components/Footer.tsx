import { Instagram } from "lucide-react";

export const Footer = () => {
  return (
    <footer id="contato" className="border-t border-border bg-secondary/40 mt-16 sm:mt-20">
      <div className="container py-10 sm:py-16 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 text-center md:text-left">
        <div>
          <h3 className="font-display text-2xl font-semibold mb-3">Atelier</h3>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto md:mx-0">
            Loja independente de produtos artesanais, com curadoria atemporal.
          </p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Loja</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#produtos" className="hover:text-accent transition-smooth">Produtos</a></li>
            <li><a href="#sobre" className="hover:text-accent transition-smooth">Sobre nós</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Contato</h4>
          <p className="text-sm text-muted-foreground break-words mb-4">contato@atelier.com</p>
          <div className="flex gap-3 justify-center md:justify-start">
            <a
              href="https://instagram.com/3rfitnessjr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram @3rfitnessjr"
              className="flex h-10 w-10 items-center justify-center rounded-full text-white shadow transition-transform hover:scale-110"
              style={{
                background:
                  "linear-gradient(135deg, #feda75 0%, #fa7e1e 25%, #d62976 50%, #962fbf 75%, #4f5bd5 100%)",
              }}
            >
              <Instagram className="h-5 w-5" strokeWidth={2} />
            </a>
            <a
              href="https://wa.me/5548991486304"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full text-white shadow transition-transform hover:scale-110"
              style={{ background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)" }}
            >
              <svg viewBox="0 0 32 32" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.715.315-.41.442-1.117 1.11-1.117 2.532 0 .457.072.93.187 1.376.315 1.232.962 2.41 1.733 3.412 1.118 1.448 2.62 2.66 4.32 3.317.434.157 2.32.792 2.736.792.817 0 1.59-.4 1.962-1.103.215-.4.357-.85.4-1.288 0-.073 0-.158-.043-.215-.115-.187-.43-.287-.6-.387z"/>
                <path d="M16.013 2.667C8.65 2.667 2.68 8.638 2.68 16c0 2.348.617 4.65 1.79 6.668L2.667 29.333l6.838-1.794a13.292 13.292 0 0 0 6.508 1.683C23.376 29.222 29.347 23.252 29.347 15.89c0-3.546-1.388-6.881-3.91-9.391-2.51-2.51-5.84-3.832-9.424-3.832zm0 24.402c-2.061 0-4.077-.555-5.84-1.604l-.418-.247-4.328 1.135 1.155-4.222-.272-.434c-1.155-1.832-1.766-3.96-1.766-6.144 0-6.397 5.21-11.605 11.482-11.605 3.103 0 6.013 1.21 8.198 3.405a11.512 11.512 0 0 1 3.396 8.21c0 6.396-5.077 11.605-11.474 11.605z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container py-5 sm:py-6 text-[11px] sm:text-xs text-muted-foreground flex flex-col sm:flex-row flex-wrap justify-between gap-2 sm:gap-4 text-center sm:text-left">
          <span>© {new Date().getFullYear()} Atelier. Todos os direitos reservados.</span>
          <span>Powered by Shopify</span>
        </div>
      </div>
    </footer>
  );
};
