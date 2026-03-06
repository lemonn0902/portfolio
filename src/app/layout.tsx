import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Serif_Display } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shreya-srivastava.dev"),
  title: {
    default: "Shreya Srivastava | CS & Cybersecurity Developer",
    template: "%s | Shreya Srivastava",
  },
  description:
    "Shreya Srivastava — B.E. CS (Cyber Security) student at RVCE Bangalore. Builds full-stack web apps, ML pipelines, and AI-integrated systems. CGPA 9.26.",
  keywords: ["Shreya Srivastava", "RVCE", "Full Stack Developer", "ML Engineer", "Cybersecurity", "Bangalore", "Portfolio"],
  authors: [{ name: "Shreya Srivastava", url: "https://github.com/lemonn0902" }],
  creator: "Shreya Srivastava",
  openGraph: {
    title:       "Shreya Srivastava | CS & Cybersecurity Developer",
    description: "Building full-stack apps, ML pipelines and AI systems. RVCE Bangalore · CGPA 9.26.",
    url:         "https://shreya-srivastava.dev",
    siteName:    "Shreya Srivastava Portfolio",
    locale:      "en_IN",
    type:        "website",
    images: [
      {
        url:    "/og-image.png",
        width:  1200,
        height: 630,
        alt:    "Shreya Srivastava — Portfolio",
      },
    ],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Shreya Srivastava | CS & Cybersecurity Developer",
    description: "Building full-stack apps, ML pipelines and AI systems. RVCE Bangalore · CGPA 9.26.",
    images:      ["/og-image.png"],
  },
  robots: {
    index:  true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dmSerifDisplay.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Script id="json-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context":   "https://schema.org",
          "@type":      "Person",
          name:         "Shreya Srivastava",
          url:          "https://shreya-srivastava.dev",
          email:        "shreya.srivastava0902@gmail.com",
          sameAs: [
            "https://github.com/lemonn0902",
            "https://www.linkedin.com/in/shreya-srivastava-435845292/",
            "https://leetcode.com/u/Lemon_0/",
          ],
          jobTitle:     "Software Developer & CS Student",
          alumniOf: {
            "@type": "CollegeOrUniversity",
            name:    "R.V. College of Engineering",
          },
          address: {
            "@type":           "PostalAddress",
            addressLocality:   "Bangalore",
            addressCountry:    "IN",
          },
        }) }} />
      </body>
    </html>
  );
}
