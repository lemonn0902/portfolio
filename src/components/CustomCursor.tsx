"use client";
import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState } from "react";

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springX = useSpring(cursorX, { stiffness: 600, damping: 50 });
  const springY = useSpring(cursorY, { stiffness: 600, damping: 50 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setVisible(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);

    document.addEventListener("mousemove", onMove);

    const updateListeners = () => {
      document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };
    updateListeners();
    const observer = new MutationObserver(updateListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      observer.disconnect();
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:flex items-center justify-center"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
    >
      <motion.div
        className="rounded-full flex items-center justify-center"
        animate={{
          width:        hovered ? 42 : 24,
          height:       hovered ? 42 : 24,
          borderColor:  "rgba(201,168,76,0.9)",
          opacity:      visible ? 1 : 0,
        }}
        transition={{ duration: 0.15, ease: "easeInOut" }}
        style={{ border: "1.5px solid rgba(201,168,76,0.9)" }}
      >
        {hovered && (
          <span
            style={{
              fontFamily:    "var(--font-geist-mono)",
              fontSize:      7,
              color:         "#C9A84C",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              whiteSpace:    "nowrap",
            }}
          >
            VISIT
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
