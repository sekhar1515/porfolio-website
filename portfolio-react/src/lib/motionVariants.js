/**
 * motionVariants.js
 * ─────────────────────────────────────────────────────────────
 * Centralized Framer Motion animation library.
 * Apple × Uber design language: calm, deliberate, cinematic.
 *
 * How to use:
 *   import { fadeUp, staggerContainer, staggerItem } from '../lib/motionVariants';
 *   <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
 *     <motion.p variants={staggerItem}>Hello</motion.p>
 *   </motion.div>
 */

/* ─── Shared easing curves ─── */
export const EASE_SPRING  = [0.16, 1, 0.3, 1];   // Custom spring — used everywhere
export const EASE_OUT     = [0.0, 0.0, 0.2, 1];  // Material-style ease-out
export const EASE_BOUNCE  = [0.34, 1.56, 0.64, 1]; // Gentle overshoot

/* ─────────────────────────────────────────
   ENTRANCE VARIANTS
   ───────────────────────────────────────── */

/** Fade + slide up — the workhorse for section content */
export const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_SPRING },
  },
};

/** Fade + slight slide up — lighter than fadeUp, for secondary text */
export const fadeUpSoft = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_SPRING },
  },
};

/** Pure opacity reveal — for ambient/background elements */
export const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

/** Scale + fade — for badges, pills, icons */
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.65, ease: EASE_BOUNCE },
  },
};

/** Slide in from the left */
export const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: EASE_SPRING },
  },
};

/** Slide in from the right */
export const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: EASE_SPRING },
  },
};

/* ─────────────────────────────────────────
   HERO-SPECIFIC VARIANTS
   ───────────────────────────────────────── */

/**
 * Cinematic hero word reveal — each word slides up from below
 * with a clip-path mask. Use on individual <motion.span> inside
 * a stagger parent.
 */
export const heroWord = {
  hidden: {
    opacity: 0,
    y: 60,
    clipPath: 'inset(100% 0% 0% 0%)',
  },
  show: {
    opacity: 1,
    y: 0,
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 0.9, ease: EASE_SPRING },
  },
};

/** Fade + blur entrance — for hero subtitle / body copy */
export const heroSubtle = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.85, ease: EASE_SPRING },
  },
};

/* ─────────────────────────────────────────
   STAGGER CONTAINERS
   ───────────────────────────────────────── */

/**
 * Wrap a group of elements so children stagger in sequentially.
 * Each child should use `staggerItem` or any other variant.
 */
export const staggerContainer = (stagger = 0.1, delayStart = 0) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delayStart,
    },
  },
});

/** Generic child for use inside staggerContainer */
export const staggerItem = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE_SPRING },
  },
};

/** Scale child for use inside staggerContainer (cards, tiles) */
export const staggerCard = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: EASE_SPRING },
  },
};

/** Pill/badge child for stagger (small inline items) */
export const staggerPill = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_BOUNCE },
  },
};

/* ─────────────────────────────────────────
   HOVER / INTERACTIVE VARIANTS
   ───────────────────────────────────────── */

/** Card hover — lift + very slight scale */
export const cardHover = {
  rest:  { y: 0, scale: 1 },
  hover: {
    y: -6,
    scale: 1.02,
    transition: { duration: 0.4, ease: EASE_SPRING },
  },
};

/** Button / CTA hover */
export const buttonHover = {
  rest:  { scale: 1 },
  hover: { scale: 1.04, transition: { duration: 0.25, ease: EASE_SPRING } },
  tap:   { scale: 0.96 },
};

/* ─────────────────────────────────────────
   TIMELINE / LINE DRAW VARIANTS
   ───────────────────────────────────────── */

/** Vertical line draws itself from top to bottom */
export const lineGrow = {
  hidden: { scaleY: 0, originY: 0 },
  show: {
    scaleY: 1,
    transition: { duration: 1.4, ease: EASE_SPRING },
  },
};

/* ─────────────────────────────────────────
   PAGE / SECTION TRANSITION VARIANTS
   ───────────────────────────────────────── */

/** Wraps an entire section for page-level transition */
export const sectionReveal = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.5, ease: EASE_OUT, when: 'beforeChildren' },
  },
};
