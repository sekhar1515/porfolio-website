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
        background: 'linear-gradient(90deg, rgba(255,255,255,0.3), rgba(255,255,255,0.85), rgba(255,255,255,0.3))',
        boxShadow: '0 0 8px rgba(255,255,255,0.1)',
      }}
    />
  );
}
