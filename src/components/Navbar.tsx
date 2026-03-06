"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { easeOutExpo } from "@/lib/motion";

const NAV_LINKS = ["About", "Experience", "Skills", "Projects", "Education", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [mounted, setMounted]   = useState(false);
  const { theme, setTheme }     = useTheme();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkStyle = (base = {}) => ({
    fontFamily:     "var(--font-geist-sans)",
    fontSize:       14,
    color:          "var(--color-text-secondary)",
    textDecoration: "none",
    transition:     "color 200ms ease",
    ...base,
  });

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, delay: 0.4, ease: easeOutExpo }}
        style={{
          position:        "fixed",
          top:             0,
          left:            0,
          right:           0,
          zIndex:          50,
          height:          64,
          backgroundColor: scrolled ? "rgba(20,20,23,0.92)" : "transparent",
          backdropFilter:  scrolled ? "blur(12px)" : "none",
          borderBottom:    scrolled ? "1px solid var(--color-border)" : "none",
          transition:      "background-color 400ms ease, backdrop-filter 400ms ease, border-bottom 400ms ease",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin:   "0 auto",
            padding:  "0 80px",
            height:   "100%",
            display:  "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className="nav-inner"
        >
          {/* Monogram */}
          <a
            href="#hero"
            style={{
              fontFamily:  "var(--font-dm-serif)",
              fontSize:    18,
              color:       "var(--color-accent)",
              letterSpacing: "0.22em",
              textDecoration: "none",
              display:     "inline-block",
              transition:  "transform 200ms ease, filter 200ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "rotate(3deg)";
              e.currentTarget.style.filter    = "brightness(1.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "rotate(0deg)";
              e.currentTarget.style.filter    = "brightness(1)";
            }}
          >
            S.S
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  style={linkStyle()}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--color-text-primary)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--color-text-secondary)")
                  }
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="hidden md:inline-flex items-center justify-center"
              style={{
                background:  "none",
                border:      "1px solid var(--color-border)",
                borderRadius: 2,
                cursor:      "pointer",
                color:       "var(--color-text-secondary)",
                width:       34,
                height:      34,
                flexShrink:  0,
                transition:  "border-color 200ms ease, color 200ms ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-accent)";
                (e.currentTarget as HTMLButtonElement).style.color       = "var(--color-accent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-border)";
                (e.currentTarget as HTMLButtonElement).style.color       = "var(--color-text-secondary)";
              }}
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          )}

          {/* Resume CTA */}
          <a
            href="/resume.pdf"
            download
            className="hidden md:inline-block"
            style={{
              fontFamily:     "var(--font-geist-sans)",
              fontSize:       13,
              color:          "var(--color-accent)",
              border:         "1px solid var(--color-accent)",
              padding:        "8px 20px",
              textDecoration: "none",
              transition:     "background 200ms ease, color 200ms ease",
              borderRadius:   2,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--color-accent)";
              e.currentTarget.style.color      = "var(--color-bg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color      = "var(--color-accent)";
            }}
          >
            Resume
          </a>

          {/* Hamburger */}
          <button
            className="md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            style={{
              background: "none",
              border:     "none",
              cursor:     "pointer",
              color:      "var(--color-text-secondary)",
              padding:    4,
            }}
          >
            <Menu size={22} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ backgroundColor: "var(--color-bg)" }}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="absolute top-5 right-6"
              style={{
                background: "none",
                border:     "none",
                cursor:     "pointer",
                color:      "var(--color-text-secondary)",
              }}
            >
              <X size={24} />
            </button>

            <ul className="flex flex-col items-center gap-8 list-none p-0">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, ease: easeOutExpo, duration: 0.4 }}
                >
                  <a
                    href={`#${link.toLowerCase()}`}
                    onClick={() => setOpen(false)}
                    style={{
                      fontFamily:     "var(--font-dm-serif)",
                      fontSize:       34,
                      color:          "var(--color-text-primary)",
                      textDecoration: "none",
                    }}
                  >
                    {link}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.42 }}
              >
                <a
                  href="/resume.pdf"
                  download
                  style={{
                    fontFamily:     "var(--font-geist-sans)",
                    fontSize:       14,
                    color:          "var(--color-accent)",
                    textDecoration: "none",
                  }}
                >
                  Download Resume
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-inner { padding: 0 24px !important; }
        }
      `}</style>
    </>
  );
}
