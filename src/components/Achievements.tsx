"use client";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";

interface Tile {
  icon:  string;
  year:  string;
  title: string;
  desc:  string;
}

const TILES: Tile[] = [
  {
    icon:  "🎓",
    year:  "2025",
    title: "CGPA 9.26 / 10",
    desc:  "Ranked among the top students at R.V. College of Engineering, Bangalore.",
  },
  {
    icon:  "⚡",
    year:  "2025",
    title: "−53.33% RAG Latency",
    desc:  "Designed a GCP-based RAG pipeline at SpikedAI that slashed end-to-end latency by over half.",
  },
  {
    icon:  "🏆",
    year:  "2023",
    title: "97% — ISC 12th",
    desc:  "All-India top-tier board result from St. Joseph's Boys' High School.",
  },
  {
    icon:  "🏅",
    year:  "2021",
    title: "97% — ICSE 10th",
    desc:  "State-level distinction in ICSE board examinations.",
  },
  {
    icon:  "💻",
    year:  "2025",
    title: "IEEE CS SAC Member",
    desc:  "Selected as a Student Activities Committee member at the IEEE Computer Society, RVCE Chapter.",
  },
  {
    icon:  "🎤",
    year:  "2024",
    title: "TedX RVCE Core Team",
    desc:  "Joined the TedX organiser team at RVCE — coordinating events, speakers, and social strategy.",
  },
];

export default function Achievements() {
  const ref     = useRef<HTMLElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.1 });
  const reduced = useReducedMotion();

  return (
    <section id="achievements" ref={ref} style={{ padding: "120px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px" }}>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 40 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: easeOutExpo }}
          style={{ marginBottom: 64 }}
        >
          <p className="eyebrow" style={{ marginBottom: 12 }}>06 — Achievements</p>
          <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 48, color: "var(--color-text-primary)", letterSpacing: "-0.01em", lineHeight: 1.1, margin: 0 }}>
            Milestones
          </h2>
        </motion.div>

        {/* 3-column grid */}
        <div className="achievements-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {TILES.map((tile, i) => (
            <motion.div
              key={tile.title}
              initial={{ opacity: 0, rotateY: reduced ? 0 : 90 }}
              animate={visible ? { opacity: 1, rotateY: 0 } : {}}
              transition={{ duration: 0.55, ease: easeOutExpo, delay: 0.08 + i * 0.1 }}
              style={{ perspective: 600 }}
            >
              <div
                style={{
                  background:    "var(--color-surface)",
                  border:        "1px solid var(--color-border)",
                  borderRadius:  8,
                  padding:       "28px 28px 24px",
                  height:        "100%",
                  display:       "flex",
                  flexDirection: "column",
                  gap:           12,
                  transition:    "border-color 220ms ease, transform 220ms ease",
                  cursor:        "default",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "var(--color-accent)";
                  (e.currentTarget as HTMLDivElement).style.transform    = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "var(--color-border)";
                  (e.currentTarget as HTMLDivElement).style.transform    = "translateY(0)";
                }}
              >
                <span style={{ fontSize: 32 }}>{tile.icon}</span>

                <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <span style={{ fontFamily: "var(--font-dm-serif)", fontSize: 18, color: "var(--color-text-primary)", lineHeight: 1.2 }}>
                    {tile.title}
                  </span>
                  <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 11, color: "var(--color-accent-dim)" }}>
                    {tile.year}
                  </span>
                </div>

                <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.7, margin: 0 }}>
                  {tile.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
