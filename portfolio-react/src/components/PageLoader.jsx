import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * PageLoader
 * ─────────────────────────────────────────────────────────────
 * Minimal cinematic loading screen — full-screen black overlay
 * with a two-ring spinner. Fades out after `duration` ms.
 *
 * Reduced-motion: skips spinner, exits immediately.
 * Usage: render once at the App root, inside AnimatePresence.
 */
export default function PageLoader({ duration = 1200 }) {
  const [visible, setVisible] = useState(true);

  // Respect prefers-reduced-motion
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (prefersReduced) {
      setVisible(false);
      return;
    }
    const t = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(t);
  }, [duration, prefersReduced]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '20px',
          }}
          aria-label="Loading…"
          role="status"
        >
          {/* Two-ring spinner */}
          <div style={{ position: 'relative', width: 44, height: 44 }}>
            {/* Outer ring — slow */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                border: '1.5px solid rgba(255,255,255,0.08)',
                borderTopColor: 'rgba(255,255,255,0.55)',
              }}
            />
            {/* Inner ring — faster, counter-rotation */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                inset: 8,
                borderRadius: '50%',
                border: '1.5px solid rgba(255,255,255,0.05)',
                borderTopColor: 'rgba(255,255,255,0.3)',
              }}
            />
          </div>

          {/* Wordmark — fades in after a beat */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
            style={{
              fontFamily: "'Inter', -apple-system, sans-serif",
              fontSize: '11px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.22)',
              fontWeight: 500,
              userSelect: 'none',
            }}
          >
            SR
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
