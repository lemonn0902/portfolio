import CustomCursor  from "@/components/CustomCursor";
import Navbar        from "@/components/Navbar";
import Hero          from "@/components/Hero";
import About         from "@/components/About";
import Experience    from "@/components/Experience";
import Skills        from "@/components/Skills";
import Projects      from "@/components/Projects";
import Education     from "@/components/Education";
import Achievements  from "@/components/Achievements";
import Contact       from "@/components/Contact";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navbar />

      <main>
        <Hero />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Experience />
        <div className="section-divider" />
        <Skills />
        <div className="section-divider" />
        <Projects />
        <div className="section-divider" />
        <Education />
        <div className="section-divider" />
        <Achievements />
        <div className="section-divider" />
        <Contact />
      </main>

      <footer style={{ borderTop: "1px solid var(--color-border)", padding: "24px 80px" }}>
        <div
          className="footer-inner"
          style={{
            maxWidth:       1280,
            margin:         "0 auto",
            display:        "flex",
            justifyContent: "space-between",
            alignItems:     "center",
          }}
        >
          <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 12, color: "var(--color-text-muted)" }}>
            © 2025 Shreya Srivastava
          </span>
          <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 12, color: "var(--color-text-muted)" }}>
            Built with Next.js + Tailwind
          </span>
        </div>
      </footer>
    </>
  );
}

