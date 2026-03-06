// ── Global Motion Tokens (Design Doc §7.1) ──────────────────────────────────
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
export const easeInOut   = [0.4, 0, 0.2, 1] as const;

export const durations = {
  fast:   0.15,
  base:   0.4,
  reveal: 0.7,
  slow:   1.0,
};

export const stagger = {
  fast: 0.04,
  base: 0.08,
  slow: 0.15,
};

// Reusable variant presets
export const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.reveal, ease: easeOutExpo },
  },
};

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: durations.reveal, ease: easeInOut },
  },
};

export const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: stagger.base } },
};
