import { useMemo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * DarkSkyCanvas
 * ─────────────────────────────────────────────────────────────
 * Cinematic dark sky backdrop — fixed, behind all content.
 *
 * Layers (back → front):
 *   1. Deep radial-gradient base — near-black with faint charcoal
 *   2. Far stars  (~50 dots)    — 1px,   low opacity, slow twinkle
 *   3. Mid stars  (~35 dots)    — 1.5px, mid opacity, medium twinkle
 *   4. Near stars (~18 dots)    — 2px,   higher opacity, gentle twinkle
 *   5. Soft vignette            — radial overlay anchoring the edges
 *
 * Parallax: far layer scrolls slowest, near layer scrolls fastest.
 * Performance: CSS-only animations, no canvas, no requestAnimationFrame loop.
 * Accessibility: aria-hidden, pointer-events none throughout.
 */

/* Deterministic pseudo-random so star positions don't shift on re-render */
function makeRng(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generateStars(count, layer, rng) {
  return Array.from({ length: count }, (_, i) => {
    const x             = rng() * 100;         // % left
    const y             = rng() * 100;          // % top
    const animDelay     = (rng() * 6).toFixed(2);  // 0–6s
    const animDuration  = (3 + rng() * 5).toFixed(2); // 3–8s

    let size, opacity;
    if (layer === 'far') {
      size    = 0.8 + rng() * 0.5;     // 0.8–1.3px
      opacity = 0.07 + rng() * 0.09;   // 0.07–0.16
    } else if (layer === 'mid') {
      size    = 1.1 + rng() * 0.6;     // 1.1–1.7px
      opacity = 0.11 + rng() * 0.11;   // 0.11–0.22
    } else {
      size    = 1.5 + rng() * 0.9;     // 1.5–2.4px
      opacity = 0.16 + rng() * 0.16;   // 0.16–0.32
    }

    return { id: `${layer}-${i}`, x, y, size, opacity, animDelay, animDuration };
  });
}

function StarField({ stars }) {
  return (
    <>
      {stars.map(({ id, x, y, size, opacity, animDelay, animDuration }) => (
        <div
          key={id}
          aria-hidden="true"
          className="star-dot"
          style={{
            position: 'absolute',
            left: `${x}%`,
            top: `${y}%`,
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: '50%',
            background: '#ffffff',
            opacity,
            // Inline duration + delay so each star gets its own timing
            animationDuration: `${animDuration}s`,
            animationDelay: `${animDelay}s`,
            willChange: 'opacity',
            pointerEvents: 'none',
          }}
        />
      ))}
    </>
  );
}

export default function DarkSkyCanvas() {
  const { scrollYProgress } = useScroll();

  // Parallax: far moves least, near moves most (very subtle)
  const farY  = useTransform(scrollYProgress, [0, 1], ['0%', '-5%']);
  const midY  = useTransform(scrollYProgress, [0, 1], ['0%', '-11%']);
  const nearY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);

  // Generate stars once with seeded RNG
  const { farStars, midStars, nearStars } = useMemo(() => ({
    farStars:  generateStars(52, 'far',  makeRng(42)),
    midStars:  generateStars(34, 'mid',  makeRng(137)),
    nearStars: generateStars(18, 'near', makeRng(271)),
  }), []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        /* Cinematic near-black base — charcoal core, pure black edges */
        background:
          'radial-gradient(ellipse 90% 65% at 25% 15%, #0d0d13 0%, #090910 30%, #000000 100%)',
      }}
    >
      {/* Far star layer — slowest parallax */}
      <motion.div
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, y: farY, overflow: 'hidden' }}
      >
        <StarField stars={farStars} />
      </motion.div>

      {/* Mid star layer */}
      <motion.div
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, y: midY, overflow: 'hidden' }}
      >
        <StarField stars={midStars} />
      </motion.div>

      {/* Near star layer — most parallax */}
      <motion.div
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, y: nearY, overflow: 'hidden' }}
      >
        <StarField stars={nearStars} />
      </motion.div>

      {/* Bottom vignette — anchors page to black floor */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40%',
          background:
            'linear-gradient(to bottom, transparent, rgba(0,0,0,0.55))',
          pointerEvents: 'none',
        }}
      />

      {/* Top vignette — softens star density at top edge */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '20%',
          background:
            'linear-gradient(to top, transparent, rgba(0,0,0,0.35))',
          pointerEvents: 'none',
        }}
      />

      {/* Barely-visible depth nebula — faint charcoal smear, adds dimension */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '10%',
          left: '55%',
          width: '55vw',
          height: '45vh',
          background:
            'radial-gradient(ellipse at center, rgba(255,255,255,0.008) 0%, transparent 65%)',
          transform: 'rotate(-20deg)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
