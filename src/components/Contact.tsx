"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Github, Linkedin, Twitter, Copy, Check } from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";
import { easeOutExpo } from "@/lib/motion";

// ─── Replace with your real values ───────────────────────────────────────────
const EMAIL       = "shreya.srivastava0902@gmail.com";
const FORMSPREE   = "YOUR_FORM_ID"; // get yours at formspree.io

const SOCIALS = [
  { href: "https://github.com/lemonn0902",   label: "GitHub",    icon: <Github size={16} /> },
  { href: "https://www.linkedin.com/in/shreya-srivastava-435845292/", label: "LinkedIn",  icon: <Linkedin size={16} /> },
  { href: "https://twitter.com",  label: "Twitter/X", icon: <Twitter size={16} /> },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function Contact() {
  const ref     = useRef<HTMLElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.08 });

  const [state, handleSubmit] = useForm(FORMSPREE);
  const [copied, setCopied]   = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  const inputBase: React.CSSProperties = {
    width:       "100%",
    display:     "block",
    background:  "var(--color-surface)",
    border:      "1px solid var(--color-border)",
    borderRadius: 4,
    padding:     "14px 16px",
    color:       "var(--color-text-primary)",
    fontFamily:  "var(--font-geist-sans)",
    fontSize:    15,
    outline:     "none",
    transition:  "border-color 200ms ease, box-shadow 200ms ease",
  };

  const focusIn  = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "var(--color-accent)";
    e.currentTarget.style.boxShadow   = "0 0 0 3px rgba(201,168,76,0.12)";
  };
  const focusOut = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "var(--color-border)";
    e.currentTarget.style.boxShadow   = "none";
  };

  const labelStyle: React.CSSProperties = {
    display:       "block",
    fontFamily:    "var(--font-geist-sans)",
    fontSize:      12,
    color:         "var(--color-text-secondary)",
    letterSpacing: "0.05em",
    marginBottom:  6,
  };

  const errorStyle: React.CSSProperties = {
    fontFamily: "var(--font-geist-sans)",
    fontSize:   12,
    color:      "var(--color-red)",
    marginTop:  4,
  };

  return (
    <section id="contact" ref={ref} style={{ padding: "120px 0 80px" }}>
      <div className="contact-wrap" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px" }}>
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: easeOutExpo }}
          style={{ marginBottom: 64 }}
        >
          <p className="eyebrow" style={{ marginBottom: 16 }}>08 — Contact</p>
          <h2
            style={{
              fontFamily:    "var(--font-dm-serif)",
              fontSize:      "clamp(44px, 6vw, 78px)",
              color:         "var(--color-text-primary)",
              lineHeight:    1.05,
              letterSpacing: "-0.02em",
              margin:        0,
            }}
          >
            Let&apos;s build
            <br />
            <em>something.</em>
          </h2>
        </motion.div>

        {/* Two-column layout */}
        <div
          className="contact-grid"
          style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 80, alignItems: "start" }}
        >
          {/* ── Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.1 }}
          >
            {state.succeeded ? (
              <div
                style={{
                  padding:      32,
                  border:       "1px solid var(--color-green)",
                  borderRadius: 8,
                  textAlign:    "center",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-dm-serif)",
                    fontSize:   26,
                    color:      "var(--color-green)",
                    margin:     "0 0 8px",
                  }}
                >
                  Message sent ✓
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize:   15,
                    color:      "var(--color-text-secondary)",
                    margin:     0,
                  }}
                >
                  I&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: 20 }}
              >
                {/* Honeypot (hidden, anti-spam) */}
                <input
                  type="text"
                  name="_gotcha"
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Name */}
                <div>
                  <label htmlFor="name" style={labelStyle}>Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    placeholder="Your name"
                    style={inputBase}
                    onFocus={focusIn}
                    onBlur={focusOut}
                  />
                  <ValidationError prefix="Name" field="name" errors={state.errors} style={errorStyle} />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" style={labelStyle}>Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    placeholder="your@email.com"
                    style={inputBase}
                    onFocus={focusIn}
                    onBlur={focusOut}
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} style={errorStyle} />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" style={labelStyle}>Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me about your project or opportunity..."
                    style={{ ...inputBase, resize: "vertical" }}
                    onFocus={focusIn}
                    onBlur={focusOut}
                  />
                  <ValidationError prefix="Message" field="message" errors={state.errors} style={errorStyle} />
                </div>

                <button
                  type="submit"
                  disabled={state.submitting}
                  style={{
                    width:       "100%",
                    padding:     "14px 24px",
                    fontFamily:  "var(--font-geist-sans)",
                    fontSize:    14,
                    color:       "var(--color-accent)",
                    background:  "transparent",
                    border:      "1px solid var(--color-accent)",
                    borderRadius: 4,
                    cursor:      state.submitting ? "not-allowed" : "pointer",
                    transition:  "background 200ms ease, color 200ms ease",
                    opacity:     state.submitting ? 0.65 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!state.submitting) {
                      e.currentTarget.style.background = "var(--color-accent)";
                      e.currentTarget.style.color      = "var(--color-bg)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color      = "var(--color-accent)";
                  }}
                >
                  {state.submitting ? "Sending..." : "Send Message →"}
                </button>
              </form>
            )}
          </motion.div>

          {/* ── Right info ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.2 }}
            style={{ display: "flex", flexDirection: "column", gap: 36 }}
          >
            {/* Availability */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  width:       8,
                  height:      8,
                  borderRadius: "50%",
                  background:  "var(--color-green)",
                  display:     "inline-block",
                  flexShrink:  0,
                  animation:   "availability-pulse 2.2s ease infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize:   14,
                  color:      "var(--color-text-secondary)",
                }}
              >
                Graduating 2027
              </span>
            </div>

            {/* Email */}
            <div>
              <p style={{ ...labelStyle, marginBottom: 8 }}>Direct email</p>
              <button
                onClick={copyEmail}
                style={{
                  fontFamily:  "var(--font-dm-serif)",
                  fontSize:    19,
                  color:       "var(--color-text-primary)",
                  background:  "none",
                  border:      "none",
                  cursor:      "pointer",
                  display:     "inline-flex",
                  alignItems:  "center",
                  gap:         8,
                  padding:     0,
                  transition:  "color 200ms ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--color-accent)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--color-text-primary)")
                }
              >
                {EMAIL}
                {copied ? (
                  <Check size={16} color="var(--color-green)" />
                ) : (
                  <Copy size={16} />
                )}
              </button>
              {copied && (
                <p
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize:   12,
                    color:      "var(--color-green)",
                    marginTop:  4,
                  }}
                >
                  Copied to clipboard!
                </p>
              )}
            </div>

            {/* Socials */}
            <div>
              <p style={{ ...labelStyle, marginBottom: 12 }}>Find me on</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display:        "inline-flex",
                      alignItems:     "center",
                      gap:            10,
                      fontFamily:     "var(--font-geist-sans)",
                      fontSize:       14,
                      color:          "var(--color-text-secondary)",
                      textDecoration: "none",
                      transition:     "color 200ms ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--color-text-primary)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--color-text-secondary)")
                    }
                  >
                    {s.icon} {s.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
