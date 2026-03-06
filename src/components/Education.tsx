"use client";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";

const COURSES = [
  "Data Structures & Algorithms",
  "Machine Learning",
  "Cryptography & Network Security",
  "Computer Networks",
  "Database Management",
  "Operating Systems",
  "Cloud Computing",
  "Object-Oriented Programming",
  "Computer Organisation",
  "Discrete Mathematics",
];

interface EduEntry {
  school:  string;
  degree:  string;
  period:  string;
  score:   string;
  type:    "college" | "high-school";
}

const EDU: EduEntry[] = [
  {
    school: "R.V. College of Engineering",
    degree: "B.E. Computer Science & Engineering (Cyber Security)",
    period: "Sep 2023 – Present",
    score:  "CGPA 9.26 / 10",
    type:   "college",
  },
  {
    school: "St. Joseph's Boys' High School",
    degree: "12th — ISC Board",
    period: "Completed May 2023",
    score:  "97%",
    type:   "high-school",
  },
  {
    school: "Sacred Heart Girls' High School",
    degree: "10th — ICSE Board",
    period: "Completed Mar 2021",
    score:  "97%",
    type:   "high-school",
  },
];

export default function Education() {
  const ref     = useRef<HTMLElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.1 });
  const reduced = useReducedMotion();

  return (
    <section id="education" ref={ref} style={{ padding: "120px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px" }}>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 40 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: easeOutExpo }}
          style={{ marginBottom: 72 }}
        >
          <p className="eyebrow" style={{ marginBottom: 12 }}>05 — Education</p>
          <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 48, color: "var(--color-text-primary)", letterSpacing: "-0.01em", lineHeight: 1.1, margin: 0 }}>
            Academic Background
          </h2>
        </motion.div>

        {/* Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 64 }}>
          {EDU.map((entry, i) => (
            <motion.div
              key={entry.school}
              initial={{ opacity: 0, y: reduced ? 0 : 28 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.1 + i * 0.12 }}
              style={{
                background:   "var(--color-surface)",
                border:       "1px solid var(--color-border)",
                borderRadius: 8,
                padding:      "28px 32px",
                borderLeft:   entry.type === "college" ? "2px solid var(--color-accent)" : "2px solid var(--color-border)",
                display:      "flex",
                alignItems:   "center",
                justifyContent: "space-between",
                flexWrap:     "wrap",
                gap:          16,
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <span style={{ fontFamily: "var(--font-dm-serif)", fontSize: 20, color: "var(--color-text-primary)" }}>
                    {entry.school}
                  </span>
                  {entry.type === "college" && (
                    <span style={{
                      fontFamily:    "var(--font-geist-sans)",
                      fontSize:      10,
                      color:         "var(--color-accent)",
                      border:        "1px solid var(--color-accent)",
                      padding:       "2px 8px",
                      borderRadius:  2,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}>
                      Current
                    </span>
                  )}
                </div>
                <span style={{ fontFamily: "var(--font-geist-sans)", fontSize: 14, color: "var(--color-text-secondary)" }}>
                  {entry.degree}
                </span>
                <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: 12, color: "var(--color-text-muted)", marginTop: 4 }}>
                  {entry.period}
                </div>
              </div>

              {/* Score badge */}
              <div style={{
                fontFamily:   "var(--font-dm-serif)",
                fontSize:     28,
                color:        "var(--color-accent)",
                background:   "var(--color-surface-raised)",
                border:       "1px solid var(--color-border)",
                borderRadius: 6,
                padding:      "8px 20px",
                letterSpacing:"0.02em",
                flexShrink:   0,
              }}>
                {entry.score}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Coursework */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 28 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.5 }}
        >
          <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-accent-dim)", marginBottom: 16 }}>
            Relevant Coursework
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {COURSES.map((c) => (
              <span
                key={c}
                style={{
                  fontFamily:   "var(--font-geist-sans)",
                  fontSize:     13,
                  color:        "var(--color-text-secondary)",
                  background:   "var(--color-surface)",
                  border:       "1px solid var(--color-border)",
                  padding:      "6px 14px",
                  borderRadius: 3,
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
