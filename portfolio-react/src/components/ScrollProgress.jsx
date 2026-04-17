import { useScroll, useSpring, motion } from 'framer-motion';

/**
 * ScrollProgress
 * ─────────────────────────────────────────────────────
 * Apple-style 2px scroll progress bar fixed at top of page.
 * Uses useSpring for buttery-smooth lag that prevents jitter.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: '0%',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        zIndex: 200,
        background: 'linear-gradient(90deg, #0071e3, #2997ff, #30d2ff)',
        boxShadow: '0 0 12px rgba(0, 113, 227, 0.6)',
      }}
    />
  );
}
