"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import Image from "next/image";
import { easeOutExpo } from "@/lib/motion";

// ── Data ─────────────────────────────────────────────────────────────────────
// Replace with your real projects
const PROJECTS = [
  {
    id:         "01",
    title:      "Digital Twin of Smart Building",
    desc:       "A smart building digital twin system that creates a 3D virtual replica of real buildings using IoT and simulation data to monitor, analyze, and optimize building performance in real time.",
    tech:       ["Python", "Three.js", "Flask", "JavaScript", "InfluxDB", "AI models"],
    github:     "https://github.com/lemonn0902/digital_twin_smart_buildings",
    demo:       "https://digital-twin-smart-buildings-pvtr.vercel.app/",
    screenshot: "/screenshots/digital-twin.png",
    featured:   true,
  },
  {
    id:       "02",
    title:    "AI Peer Matcher",
    desc:     "An AI-powered platform that analyzes user profiles and preferences to intelligently match compatible peers for collaboration, networking, or study groups.",
    tech:     ["Python", "Scikit-learn", "Flask", "JavaScript", "React", "SQLite"],
    github:   "https://github.com/lemonn0902/AI-Peer-Matcher",
    demo:     "https://ai-peer-matcher.vercel.app/",
    featured: false,
  },
  {
    id:       "03",
    title:    "AI-Driven Medical Image Steganography",
    desc:     "A deep-learning based system that securely embeds encrypted patient data into medical images (MRI, CT, X-ray) using CNN-based steganography while preserving diagnostic image quality.",
    tech:     ["Python", "PyTorch", "PostgreSQL", "OpenCV", "NumPy", "Image Steganography", "Encryption", "Flask", "React"],
    github:   "https://github.com/lemonn0902/AI-driven-medical-image-steganography",
    demo:     null,
    featured: false,
  },
  {
    id:       "04",
    title:    "EcoEats",
    desc:     "A sustainable food delivery platform that connects local restaurants with consumers while optimizing delivery routes using geolocation APIs to reduce delivery time and environmental impact.",
    tech:     ["Python", "Flask", "JavaScript", "HTML/CSS", "HERE Maps API", "MySQL"],
    github:   "https://github.com/lemonn0902/ecoeats",
    demo:     "https://ecoeats.onrender.com/",
    featured: false,
  },
  {
    id:       "05",
    title:    "SandalSage",
    desc:     "Created Kannada (ASR) automatic speech recognition system using fine-tuned Whisper model with vector embeddings",
    tech:     ["Python", "LangChain", "OpenAPI Whisper", "FAISS", "FastAPI"],
    github:   "https://github.com/lemonn0902/SandalSage",
    demo:     null,
    featured: false,
  },
  {
    id:       "06",
    title:    "InkThroughTime",
    desc:     "An interactive storytelling platform that visualizes historical narratives through branching timelines, allowing users to explore events and decisions across different periods.",
    tech:     ["React", "JavaScript", "CSS", "Open Library API", ],
    github:   "https://github.com/lemonn0902/InkThroughTime",
    demo:     "https://ink-through-time.vercel.app/",
    featured: false,
  },
] as const;

// ── Tech chip ─────────────────────────────────────────────────────────────────
function TechChip({ label }: { label: string }) {
  return (
    <span
      style={{
        fontFamily:    "var(--font-geist-mono)",
        fontSize:      11,
        letterSpacing: "0.05em",
        background:    "rgba(201,168,76,0.08)",
        border:        "1px solid rgba(201,168,76,0.28)",
        color:         "var(--color-accent)",
        padding:       "2px 8px",
        borderRadius:  3,
        display:       "inline-block",
        whiteSpace:    "nowrap",
      }}
    >
      {label}
    </span>
  );
}

// ── Links row ─────────────────────────────────────────────────────────────────
function ProjectLinks({
  github,
  demo,
  size = 16,
}: {
  github: string;
  demo: string | null;
  size?: number;
}) {
  const base: React.CSSProperties = {
    display:        "inline-flex",
    alignItems:     "center",
    gap:            5,
    fontFamily:     "var(--font-geist-sans)",
    fontSize:       13,
    color:          "var(--color-text-muted)",
    textDecoration: "none",
    transition:     "color 200ms ease",
  };

  return (
    <div style={{ display: "flex", gap: 20 }}>
      <a
        href={github}
        target="_blank"
        rel="noopener noreferrer"
        style={base}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
      >
        <Github size={size} /> Source
      </a>
      {demo && (
        <a
          href={demo}
          target="_blank"
          rel="noopener noreferrer"
          style={base}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
        >
          <ExternalLink size={size} /> Live Demo
        </a>
      )}
    </div>
  );
}

// ── Featured card ─────────────────────────────────────────────────────────────
function FeaturedCard({ project, visible }: { project: typeof PROJECTS[0]; visible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: easeOutExpo, delay: 0.1 }}
      className="featured-grid"
      style={{
        background:    "var(--color-surface)",
        borderTop:     "1px solid var(--color-accent)",
        border:        "1px solid var(--color-border)",
        borderTopColor: "var(--color-accent)",
        borderRadius:  8,
        padding:       40,
        display:       "grid",
        gridTemplateColumns: "1fr 1fr",
        gap:           48,
        alignItems:    "center",
        position:      "relative",
        overflow:      "hidden",
        marginBottom:  24,
      }}
    >
      {/* Watermark */}
      <span
        aria-hidden="true"
        style={{
          position:      "absolute",
          top:           12,
          right:         24,
          fontFamily:    "var(--font-geist-mono)",
          fontSize:      88,
          color:         "var(--color-border)",
          lineHeight:    1,
          pointerEvents: "none",
          userSelect:    "none",
        }}
      >
        {project.id}
      </span>

      {/* Left */}
      <div>
        <p
          style={{
            fontFamily:    "var(--font-geist-mono)",
            fontSize:      11,
            color:         "var(--color-accent)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            margin:        "0 0 12px",
          }}
        >
          Featured Project
        </p>
        <h3
          style={{
            fontFamily:    "var(--font-dm-serif)",
            fontSize:      32,
            color:         "var(--color-text-primary)",
            margin:        "0 0 12px",
            lineHeight:    1.1,
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize:   15,
            color:      "var(--color-text-secondary)",
            lineHeight: 1.75,
            margin:     "0 0 20px",
          }}
        >
          {project.desc}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
          {project.tech.map((t) => (
            <TechChip key={t} label={t} />
          ))}
        </div>
        <ProjectLinks github={project.github} demo={project.demo} />
      </div>

      {/* Right — mock browser */}
      <div
        style={{
          background:   "var(--color-surface-raised)",
          borderRadius: 8,
          overflow:     "hidden",
          border:       "1px solid var(--color-border)",
          boxShadow:    "0 20px 60px rgba(0,0,0,0.45)",
        }}
      >
        {/* Browser chrome dots */}
        <div
          style={{
            padding:      "10px 16px",
            borderBottom: "1px solid var(--color-border)",
            display:      "flex",
            alignItems:   "center",
            gap:          6,
          }}
        >
          {(["#f87171", "#fbbf24", "#4ade80"] as const).map((c) => (
            <div
              key={c}
              style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.7 }}
            />
          ))}
        </div>
        <div style={{ position: "relative", height: 220 }}>
          {project.screenshot ? (
            <Image
              src={project.screenshot}
              alt={`${project.title} — live preview`}
              fill
              style={{ objectFit: "cover", objectPosition: "top" }}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          ) : (
            <div
              style={{
                height:         "100%",
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                fontFamily:     "var(--font-geist-mono)",
                fontSize:       13,
                color:          "var(--color-text-muted)",
              }}
            >
              [ add screenshot ]
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── Secondary card ────────────────────────────────────────────────────────────
function SecondaryCard({
  project,
  delay,
}: {
  project: (typeof PROJECTS)[number];
  delay: number;
}) {
  const ref     = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: easeOutExpo, delay }}
      style={{
        background:    "var(--color-surface)",
        border:        "1px solid var(--color-border)",
        borderRadius:  8,
        padding:       28,
        cursor:        "default",
        transition:    "border-color 250ms ease, transform 250ms ease, box-shadow 250ms ease",
        position:      "relative",
        overflow:      "hidden",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--color-accent)";
        (e.currentTarget as HTMLElement).style.transform   = "translateY(-6px)";
        (e.currentTarget as HTMLElement).style.boxShadow   = "0 20px 60px rgba(0,0,0,0.4)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
        (e.currentTarget as HTMLElement).style.transform   = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow   = "none";
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position:      "absolute",
          top:           10,
          right:         16,
          fontFamily:    "var(--font-geist-mono)",
          fontSize:      52,
          color:         "var(--color-border)",
          lineHeight:    1,
          pointerEvents: "none",
          userSelect:    "none",
        }}
      >
        {project.id}
      </span>

      <h3
        style={{
          fontFamily: "var(--font-dm-serif)",
          fontSize:   22,
          color:      "var(--color-text-primary)",
          margin:     "0 0 8px",
          lineHeight: 1.2,
        }}
      >
        {project.title}
      </h3>
      <p
        style={{
          fontFamily:         "var(--font-geist-sans)",
          fontSize:           14,
          color:              "var(--color-text-secondary)",
          lineHeight:         1.75,
          margin:             "0 0 16px",
          display:            "-webkit-box",
          WebkitLineClamp:    3,
          WebkitBoxOrient:    "vertical",
          overflow:           "hidden",
        }}
      >
        {project.desc}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
        {project.tech.map((t) => (
          <TechChip key={t} label={t} />
        ))}
      </div>
      <ProjectLinks github={project.github} demo={project.demo} size={15} />
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Projects() {
  const ref     = useRef<HTMLElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.05 });

  const featured   = PROJECTS[0];
  const secondary  = PROJECTS.slice(1);

  return (
    <section id="projects" ref={ref} style={{ padding: "120px 0" }}>
      <div className="projects-wrap" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px" }}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: easeOutExpo }}
          style={{ marginBottom: 48 }}
        >
          <p className="eyebrow" style={{ marginBottom: 12 }}>04 — Work</p>
          <h2
            style={{
              fontFamily:    "var(--font-dm-serif)",
              fontSize:      48,
              color:         "var(--color-text-primary)",
              letterSpacing: "-0.01em",
              lineHeight:    1.1,
              margin:        0,
            }}
          >
            Projects
          </h2>
        </motion.div>

        <FeaturedCard project={featured} visible={visible} />

        <div
          className="projects-grid"
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap:                 20,
          }}
        >
          {secondary.map((p, i) => (
            <SecondaryCard key={p.id} project={p} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
}
