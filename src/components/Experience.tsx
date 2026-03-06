"use client";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";

interface ExpEntry {
  org:      string;
  role:     string;
  period:   string;
  location: string;
  type:     "internship" | "extracurricular";
  bullets:  string[];
}

const ENTRIES: ExpEntry[] = [
  {
    org:      "SpikedAI",
    role:     "Product Development Intern",
    period:   "Mar 2025 – Jun 2025",
    location: "California, USA (Remote)",
    type:     "internship",
    bullets: [
      "Built a Selenium bot for automated Google Meet sessions with PyAudio for live audio capture.",
      "Integrated OpenAI Whisper for real-time transcriptions, deployed headlessly on AWS EC2.",
      "Developed a low-latency WebSocket server on AWS Elastic Beanstalk for streaming transcriptions.",
      "Designed &amp; deployed a scalable RAG pipeline on GCP (Cloud Run, Firestore, GCS) with Vertex AI embeddings and vector caching — reducing end-to-end latency by 53.33%.",
    ],
  },
  {
    org:      "IEEE Computer Society",
    role:     "SAC Member",
    period:   "Jan 2025 – Present",
    location: "RVCE Chapter, Bangalore",
    type:     "extracurricular",
    bullets: [
      "Conduct technical workshops and hackathons in computer science for the student community.",
      "Curate educational content for the society's social media platforms.",
    ],
  },
  {
    org:      "TedX RVCE",
    role:     "Core Member",
    period:   "Oct 2024 – Present",
    location: "R.V. College of Engineering, Bangalore",
    type:     "extracurricular",
    bullets: [
      "Organise campus events, coordinate speakers, and manage social media content.",
      "Contribute to brainstorming sessions for innovative event themes and speaker selection.",
    ],
  },
];

export default function Experience() {
  const ref     = useRef<HTMLElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.08 });
  const reduced = useReducedMotion();

  return (
    <section id="experience" ref={ref} style={{ padding: "120px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px" }}>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 40 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: easeOutExpo }}
          style={{ marginBottom: 72 }}
        >
          <p className="eyebrow" style={{ marginBottom: 12 }}>03 — Experience</p>
          <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 48, color: "var(--color-text-primary)", letterSpacing: "-0.01em", lineHeight: 1.1, margin: 0 }}>
            Where I&apos;ve Worked
          </h2>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: "relative", paddingLeft: 48 }}>

          {/* Gold spine line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={visible ? { scaleY: 1 } : {}}
            transition={{ duration: 1.4, ease: easeOutExpo, delay: 0.2 }}
            style={{
              position:        "absolute",
              left:            10,
              top:             8,
              bottom:          0,
              width:           2,
              background:      "linear-gradient(to bottom, var(--color-accent) 0%, var(--color-accent-dim) 100%)",
              transformOrigin: "top",
            }}
          />

          {ENTRIES.map((entry, i) => (
            <motion.div
              key={entry.org}
              initial={{ opacity: 0, x: reduced ? 0 : -20 }}
              animate={visible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.3 + i * 0.15 }}
              style={{ position: "relative", marginBottom: i < ENTRIES.length - 1 ? 56 : 0 }}
            >
              {/* Dot */}
              <div style={{
                position:    "absolute",
                left:        -43,
                top:         5,
                width:       16,
                height:      16,
                borderRadius: "50%",
                background:  entry.type === "internship" ? "var(--color-accent)" : "var(--color-surface-raised)",
                border:      `2px solid ${entry.type === "internship" ? "var(--color-accent)" : "var(--color-border)"}`,
                zIndex:      1,
              }} />

              {/* Card */}
              <div style={{
                background:   "var(--color-surface)",
                border:       "1px solid var(--color-border)",
                borderRadius: 8,
                padding:      "28px 32px",
                borderLeft:   entry.type === "internship" ? "2px solid var(--color-accent)" : "2px solid var(--color-border)",
              }}>
                {/* Top row */}
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                      <span style={{ fontFamily: "var(--font-dm-serif)", fontSize: 22, color: "var(--color-text-primary)" }}>
                        {entry.org}
                      </span>
                      {entry.type === "internship" && (
                        <span style={{
                          fontFamily:   "var(--font-geist-sans)",
                          fontSize:     10,
                          color:        "var(--color-accent)",
                          border:       "1px solid var(--color-accent)",
                          padding:      "2px 8px",
                          borderRadius: 2,
                          letterSpacing:"0.1em",
                          textTransform:"uppercase",
                        }}>
                          Internship
                        </span>
                      )}
                    </div>
                    <span style={{ fontFamily: "var(--font-geist-sans)", fontSize: 15, color: "var(--color-text-secondary)" }}>
                      {entry.role}
                    </span>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: 12, color: "var(--color-accent-dim)", marginBottom: 2 }}>
                      {entry.period}
                    </div>
                    <div style={{ fontFamily: "var(--font-geist-sans)", fontSize: 12, color: "var(--color-text-muted)" }}>
                      {entry.location}
                    </div>
                  </div>
                </div>

                {/* Bullets */}
                <ul style={{ margin: "16px 0 0", padding: "0 0 0 20px" }}>
                  {entry.bullets.map((b, bi) => (
                    <li
                      key={bi}
                      style={{ fontFamily: "var(--font-geist-sans)", fontSize: 14, color: "var(--color-text-secondary)", lineHeight: 1.75, marginBottom: bi < entry.bullets.length - 1 ? 6 : 0 }}
                      dangerouslySetInnerHTML={{ __html: b }}
                    />
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
