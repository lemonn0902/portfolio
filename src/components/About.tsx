"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";

export default function About() {
  const ref     = useRef<HTMLElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.12 });
  const reduced = useReducedMotion();

  const slideLeft  = { hidden: { opacity: 0, x: reduced ? 0 : -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: easeOutExpo, delay: 0.1 } } };
  const slideRight = { hidden: { opacity: 0, x: reduced ? 0 : 40  }, visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: easeOutExpo, delay: 0.2 } } };

  const tag = (label: string) => (
    <span
      key={label}
      style={{
        fontFamily:    "var(--font-geist-sans)",
        fontSize:      12,
        color:         "var(--color-text-secondary)",
        background:    "var(--color-surface-raised)",
        border:        "1px solid var(--color-border)",
        padding:       "4px 10px",
        borderRadius:  3,
        display:       "inline-block",
      }}
    >
      {label}
    </span>
  );

  return (
    <section id="about" ref={ref} style={{ padding: "120px 0" }}>
      <div className="about-wrap" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px" }}>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 40 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: easeOutExpo }}
          style={{ marginBottom: 64 }}
        >
          <p className="eyebrow" style={{ marginBottom: 12 }}>02 — About</p>
          <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 48, color: "var(--color-text-primary)", letterSpacing: "-0.01em", lineHeight: 1.1, margin: 0 }}>
            About Me
          </h2>
        </motion.div>

        {/* Two-column */}
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 80, alignItems: "start" }}>

          {/* ── Left — bio ── */}
          <motion.div variants={slideLeft} initial="hidden" animate={visible ? "visible" : "hidden"}>
            {/* Drop-cap first paragraph */}
            <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: 17, color: "var(--color-text-secondary)", lineHeight: 1.85, marginBottom: 20 }}>
              <span style={{ fontFamily: "var(--font-dm-serif)", fontSize: 62, color: "var(--color-accent)", float: "left", lineHeight: 0.78, marginRight: 6, marginTop: 10 }}>
                I
              </span>
              &apos;m a 3rd-year B.E. student at R.V. College of Engineering, Bangalore, specialising in Computer
              Science &amp; Engineering (Cyber Security). I build full-stack web apps, ML pipelines, and
              AI-integrated systems — with a focus on shipping things that solve real problems.
            </p>

            <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: 17, color: "var(--color-text-secondary)", lineHeight: 1.85, marginBottom: 20, clear: "both" }}>
              In 2025 I interned at SpikedAI (California, remote) as a Product Development Intern —
              building a scalable RAG pipeline on GCP that cut latency by 53%, and a real-time
              transcription system deployed on AWS EC2. I care deeply about the entire product, not just
              the code layer.
            </p>

            <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: 17, color: "var(--color-text-secondary)", lineHeight: 1.85, marginBottom: 32 }}>
              Outside engineering, I organise events as a TedX RVCE member and run workshops as part of
              the IEEE Computer Society. Good engineers communicate as well as they build.
            </p>

            {/* Currently line */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 28, padding: "16px 20px", background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: 6, borderLeft: "2px solid var(--color-accent)" }}>
              <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 11, letterSpacing: "0.1em", color: "var(--color-accent)", textTransform: "uppercase", whiteSpace: "nowrap", marginTop: 2 }}>
                Currently
              </span>
              <span style={{ fontFamily: "var(--font-geist-sans)", fontSize: 14, color: "var(--color-text-secondary)", lineHeight: 1.7 }}>
                Exploring vector databases &amp; LLM fine-tuning, applying for 2025 internships,
                and building this portfolio.
              </span>
            </div>

            {/* Availability chip */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--color-green)", flexShrink: 0, animation: "availability-pulse 2.2s ease infinite" }} />
              <span style={{ fontFamily: "var(--font-geist-sans)", fontSize: 13, color: "var(--color-green)", fontWeight: 500 }}>
                Available for internships — Graduating 2027
              </span>
            </div>
          </motion.div>

          {/* ── Right — quick facts card ── */}
          <motion.div variants={slideRight} initial="hidden" animate={visible ? "visible" : "hidden"}>
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: 8, overflow: "hidden" }}>

              {/* Avatar */}
              <div style={{ borderBottom: "1px solid var(--color-border)", display: "flex", justifyContent: "center", background: "var(--color-surface-raised)" }}>
                <Image
                  src="/avatar.jpg"
                  alt="Shreya Srivastava"
                  width={400}
                  height={500}
                  style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }}
                  priority
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>

              {/* Info rows */}
              <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
                {[
                  { label: "College",   value: "R.V. College of Engineering" },
                  { label: "Branch",    value: "CSE — Cyber Security" },
                  { label: "Location",  value: "Bangalore, India" },
                  { label: "Grad Year", value: "2027" },
                  { label: "CGPA",      value: "9.26 / 10" },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, letterSpacing: "0.12em", color: "var(--color-accent-dim)", textTransform: "uppercase" }}>
                      {label}
                    </span>
                    <span style={{ fontFamily: "var(--font-geist-sans)", fontSize: 14, color: "var(--color-text-primary)" }}>
                      {value}
                    </span>
                  </div>
                ))}

                {/* Interests */}
                <div>
                  <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, letterSpacing: "0.12em", color: "var(--color-accent-dim)", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                    Interests
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {["TedX Events", "IEEE Community", "LLMs", "Cybersecurity", "Open Source"].map(tag)}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
