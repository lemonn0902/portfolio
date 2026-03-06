"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "next-themes";
import { easeOutExpo } from "@/lib/motion";
import LogoLoop from "./LogoLoop";

// ── Data ────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    label: "Languages",
    skills: [
      { name: "Python",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "JavaScript",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "TypeScript",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "C++",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
      { name: "Java",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    ],
  },
  {
    label: "Frontend",
    skills: [
      { name: "React",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "HTML5",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS3",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "Tailwind",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    ],
  },
  {
    label: "Backend",
    skills: [
      { name: "Node.js",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Django",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
      { name: "FastAPI",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
      { name: "Express",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
    ],
  },
  {
    label: "Databases",
    skills: [
      { name: "PostgreSQL",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "MongoDB",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "Firebase",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
      { name: "Redis",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
    ],
  },
  {
    label: "Tools & DevOps",
    skills: [
      { name: "Git",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "Docker",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "Linux",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
      { name: "GitHub",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
    ],
  },
  {
    label: "Cloud / Platforms",
    skills: [
      { name: "AWS",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
      { name: "GCP",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
      { name: "Vercel",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
    ],
  },
];

// ── Flat logo list for the marquee strip ────────────────────────────────────
const ALL_LOGOS = CATEGORIES.flatMap((cat) =>
  cat.skills.map((skill) => ({ src: skill.icon, alt: skill.name }))
);

// ── Chip component ───────────────────────────────────────────────────────────
function SkillChip({
  name,
  icon,
  delay,
  visible,
}: {
  name: string;
  icon: string;
  delay: number;
  visible: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.82 }}
      animate={visible ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay, duration: 0.38, type: "spring", stiffness: 280, damping: 22 }}
      style={{
        background:    "var(--color-surface)",
        border:        "1px solid var(--color-border)",
        padding:       "8px 14px",
        borderRadius:  4,
        display:       "inline-flex",
        alignItems:    "center",
        gap:           8,
        cursor:        "default",
        transition:    "border-color 200ms ease",
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLElement).style.borderColor = "var(--color-accent)")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)")
      }
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={icon}
        alt=""
        width={16}
        height={16}
        style={{ opacity: 0.75, flexShrink: 0 }}
        onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
      />
      <span
        style={{
          fontFamily: "var(--font-geist-sans)",
          fontSize:   13,
          color:      "var(--color-text-secondary)",
          whiteSpace: "nowrap",
        }}
      >
        {name}
      </span>
    </motion.div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function Skills() {
  const ref     = useRef<HTMLElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.08 });
  const { resolvedTheme } = useTheme();
  const fadeColor = resolvedTheme === "light" ? "#fafafa" : "#0c0c0e";

  return (
    <section id="skills" ref={ref} style={{ padding: "120px 0" }}>
      <div className="skills-wrap" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px" }}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: easeOutExpo }}
          style={{ marginBottom: 60 }}
        >
          <p className="eyebrow" style={{ marginBottom: 12 }}>03 — Tech Stack</p>
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
            Skills
          </h2>
        </motion.div>

        {/* Logo marquee strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.15 }}
          style={{ marginBottom: 56, overflow: "hidden" }}
        >
          <LogoLoop
            logos={ALL_LOGOS}
            speed={70}
            direction="left"
            logoHeight={34}
            gap={44}
            hoverSpeed={20}
            scaleOnHover
            fadeOut
            fadeOutColor={fadeColor}
            ariaLabel="Tech stack logos"
          />
        </motion.div>

        {/* Categories */}
        <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
          {CATEGORIES.map((cat, ci) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 18 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.08 + ci * 0.06 }}
            >
              <p
                style={{
                  fontFamily:    "var(--font-geist-mono)",
                  fontSize:      11,
                  letterSpacing: "0.1em",
                  color:         "var(--color-accent-dim)",
                  textTransform: "uppercase",
                  marginBottom:  10,
                  margin:        "0 0 10px",
                }}
              >
                {cat.label}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {cat.skills.map((skill, si) => (
                  <SkillChip
                    key={skill.name}
                    name={skill.name}
                    icon={skill.icon}
                    delay={visible ? 0.12 + ci * 0.04 + si * 0.04 : 0}
                    visible={visible}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
