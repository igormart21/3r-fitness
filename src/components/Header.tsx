import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/3r-logo.png";

const NAV = [
  { to: "/atelie/modalidades", label: "Modalidades" },
  { to: "/colecao", label: "Coleções" },
  { to: "/catalogo", label: "Personalizar" },
];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <header style={{
        position: "sticky",
        top: 0, left: 0, right: 0,
        zIndex: 50,
        height: 68,
        background: "#ffffff",
        borderBottom: "1px solid rgba(28,24,20,0.09)",
        boxShadow: scrolled ? "0 2px 16px rgba(28,24,20,0.07)" : "none",
        transition: "box-shadow 0.35s ease",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <Link to="/" style={{ flexShrink: 0 }}>
            <img src={logo} alt="3R Fitness" style={{ height: 36, width: "auto", objectFit: "contain" }} />
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: 36 }} className="hidden-mobile">
            <style>{`.hidden-mobile { display:flex; } @media(max-width:768px){.hidden-mobile{display:none!important;}}`}</style>
            {NAV.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#1C1814",
                  transition: "color 0.25s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#C9A220")}
                onMouseLeave={e => (e.currentTarget.style.color = "#1C1814")}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Hamburger */}
            <button
              onClick={() => setOpen(v => !v)}
              aria-label="Menu"
              className="show-mobile"
              style={{
                width: 42, height: 42, borderRadius: 10,
                border: "1.5px solid rgba(28,24,20,0.12)",
                display: "none", alignItems: "center", justifyContent: "center",
                color: "#1C1814",
                flexDirection: "column", gap: 5, padding: 11,
              }}
            >
              <style>{`.show-mobile{display:flex!important;} @media(min-width:769px){.show-mobile{display:none!important;}}`}</style>
              <span style={{ display: "block", height: 2, borderRadius: 2, background: "currentColor", width: open ? "100%" : "100%", transition: "all 0.3s", transform: open ? "rotate(45deg) translateY(7px)" : "none" }} />
              <span style={{ display: "block", height: 2, borderRadius: 2, background: "currentColor", width: "75%", transition: "all 0.3s", opacity: open ? 0 : 1 }} />
              <span style={{ display: "block", height: 2, borderRadius: 2, background: "currentColor", width: "100%", transition: "all 0.3s", transform: open ? "rotate(-45deg) translateY(-7px)" : "none" }} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 49,
        background: "rgba(255,255,255,0.98)",
        backdropFilter: "blur(24px)",
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
        paddingTop: 68,
        display: "flex", flexDirection: "column",
      }}>
        <nav style={{ padding: "24px 28px", display: "flex", flexDirection: "column" }}>
          {[{ to: "/", label: "Início" }, ...NAV].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: 26, fontWeight: 400,
                color: "#1C1814",
                padding: "16px 0",
                borderBottom: "1px solid rgba(28,24,20,0.07)",
              }}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};
