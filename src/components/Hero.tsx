"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Github, Linkedin, Twitter, ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";
import { easeOutExpo } from "@/lib/motion";

const HeroSphere = dynamic(() => import("./HeroSphere"), { ssr: false });

// LeetCode icon (Simple Icons SVG)
const LeetCodeIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
  </svg>
);

const SOCIALS = [
  { href: "https://github.com/lemonn0902",    label: "GitHub",   icon: <Github size={20} /> },
  { href: "https://www.linkedin.com/in/shreya-srivastava-435845292/",  label: "LinkedIn", icon: <Linkedin size={20} /> },
  { href: "https://twitter.com",   label: "Twitter",  icon: <Twitter size={20} /> },
  { href: "https://leetcode.com/u/Lemon_0/",  label: "LeetCode", icon: <LeetCodeIcon /> },
];

export default function Hero() {
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const onScroll = () => setShowHint(window.scrollY < 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display:   "flex",
        alignItems: "center",
        position:  "relative",
        overflow:  "hidden",
        background: "radial-gradient(ellipse at 65% 50%, rgba(201,168,76,0.035) 0%, transparent 60%), linear-gradient(135deg,#0c0c0e 0%,#1a1a22 100%)",
      }}
    >
      <div
        className="hero-grid"
        style={{
          maxWidth:  1280,
          margin:    "0 auto",
          padding:   "160px 80px 80px",
          width:     "100%",
          display:   "grid",
          gridTemplateColumns: "1fr 1fr",
          gap:       48,
          alignItems: "center",
        }}
      >
        {/* ── Left ── */}
        <div>
          {/* Eyebrow */}
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            style={{ marginBottom: 16 }}
          >
            Hi, I&apos;m a developer based in Bangalore
          </motion.p>

          {/* Display name */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62, duration: 0.9, ease: easeOutExpo }}
            style={{
              fontFamily:    "var(--font-dm-serif)",
              fontSize:      "clamp(52px, 8vw, 92px)",
              color:         "var(--color-text-primary)",
              letterSpacing: "-0.02em",
              lineHeight:    1,
              margin:        "0 0 18px",
            }}
          >
            Shreya Srivastava
          </motion.h1>

          {/* Typewriter role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.92, duration: 0.4 }}
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize:   "clamp(17px, 2.4vw, 25px)",
              color:      "var(--color-accent)",
              minHeight:  38,
              marginBottom: 18,
            }}
          >
            <TypeAnimation
              sequence={[900, "Full Stack Developer", 2500, "ML Enthusiast", 2500, "CyberSecurity Enthusiast", 2500]}
              wrapper="span"
              speed={55}
              repeat={Infinity}
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.02, duration: 0.5 }}
            style={{
              fontFamily:   "var(--font-geist-sans)",
              fontSize:     16,
              color:        "var(--color-text-secondary)",
              lineHeight:   1.8,
              marginBottom: 40,
              maxWidth:     460,
            }}
          >
            I build things for the web — from full-stack apps to ML pipelines,
            with a focus on clean code and real-world impact.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex items-center flex-wrap gap-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5, ease: easeOutExpo }}
          >
            <a
              href="/resume.pdf"
              download
              style={{
                fontFamily:     "var(--font-geist-sans)",
                fontSize:       14,
                color:          "var(--color-accent)",
                border:         "1px solid var(--color-accent)",
                padding:        "12px 28px",
                textDecoration: "none",
                transition:     "background 200ms ease, color 200ms ease",
                borderRadius:   2,
                display:        "inline-block",
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
              Download Resume
            </a>
            <a
              href="#contact"
              style={{
                fontFamily:     "var(--font-geist-sans)",
                fontSize:       14,
                color:          "var(--color-text-secondary)",
                textDecoration: "none",
                transition:     "color 200ms ease",
                display:        "inline-flex",
                alignItems:     "center",
                gap:            6,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--color-text-primary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--color-text-secondary)")
              }
            >
              Get In Touch →
            </a>
          </motion.div>

          {/* Social icons */}
          <div className="flex items-center gap-5 mt-8">
            {SOCIALS.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.28 + i * 0.06 }}
                style={{
                  color:      "var(--color-text-muted)",
                  transition: "color 200ms ease, transform 200ms ease",
                  display:    "flex",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color     = "var(--color-accent)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color     = "var(--color-text-muted)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* ── Right — Three.js sphere ── */}
        <motion.div
          className="hidden md:block"
          initial={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 1.0, ease: easeOutExpo }}
          style={{ height: 420, position: "relative" }}
        >
          <HeroSphere />
        </motion.div>
      </div>

      {/* Scroll hint */}
      {showHint && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 2.2, repeat: Infinity }}
          style={{ color: "var(--color-text-muted)" }}
        >
          <ChevronDown size={20} />
        </motion.div>
      )}
    </section>
  );
}
