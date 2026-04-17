import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import {
  staggerContainer,
  staggerItem,
  heroWord,
  heroSubtle,
  scaleIn,
  fadeIn,
} from '../lib/motionVariants';

/** Split a string into animated word spans */
function AnimatedWords({ text, className, variants = heroWord }) {
  return (
    <span className={className} aria-label={text}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            variants={variants}
            className="inline-block"
            style={{ willChange: 'transform, opacity' }}
          >
            {word}
            {i < text.split(' ').length - 1 && '\u00A0'}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  /* ── Parallax transforms ── */
  const bgY      = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY    = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const imageY   = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 0.84]);
  const fadeOp   = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  /* ── Smooth spring for scroll cue opacity ── */
  const scrollCueOp = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  /* ── Mouse parallax tilt on profile card ── */
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const rotateX = useSpring(mouse.y * -12, { stiffness: 200, damping: 30 });
  const rotateY = useSpring(mouse.x * 12,  { stiffness: 200, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const cx = window.innerWidth  / 2;
      const cy = window.innerHeight / 2;
      setMouse({
        x: (e.clientX - cx) / cx,
        y: (e.clientY - cy) / cy,
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
      style={{ background: 'transparent' }}
    >
      {/* ── Parallax depth layer — very faint, cinematic charcoal cloud ── */}
      <motion.div style={{ y: bgY, opacity: fadeOp }} className="absolute inset-0 pointer-events-none">
        {/* Soft hero vignette — grounds the content area */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(255,255,255,0.015) 0%, transparent 70%)',
          }}
        />
        {/* Deep shadow anchor at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-64"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.35))',
          }}
        />
      </motion.div>

      {/* ── Main content ── */}
      <motion.div
        variants={staggerContainer(0.11, 0.1)}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-5xl"
      >
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-16">

          {/* LEFT — text content */}
          <motion.div style={{ y: textY, opacity: fadeOp }} className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">

            {/* Status pill */}
            <motion.div variants={scaleIn} className="mb-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-[#86868b] text-xs tracking-widest uppercase font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C896] animate-pulse" />
                Available for opportunities
              </span>
            </motion.div>

            {/* Name — word-by-word cinematic reveal */}
            <motion.h1
              variants={staggerContainer(0.18, 0)}
              initial="hidden"
              animate="show"
              className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-white leading-[0.95] mb-5"
            >
              <AnimatedWords text="Sekhar" className="block" />
              <span className="block overflow-hidden">
                <motion.span
                  variants={heroWord}
                  className="inline-block"
                  style={{
                    background: 'linear-gradient(135deg,#ffffff 0%,#86868b 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    willChange: 'transform, opacity',
                  }}
                >
                  Reddy
                </motion.span>
              </span>
            </motion.h1>

            {/* Title */}
            <motion.p variants={heroSubtle} className="text-lg md:text-xl font-light text-[#86868b] mb-4 tracking-tight">
              Senior Backend Engineer
              <span className="text-white/20 mx-3">·</span>
              Distributed Systems
            </motion.p>

            {/* Bio */}
            <motion.p variants={heroSubtle} className="text-sm md:text-base text-[#a1a1a6] max-w-xl leading-relaxed mb-10">
              Senior Backend Developer with 4.6+ years of experience building scalable, high-performance backend systems. Skilled in Core Java, J2EE, Spring Boot, REST APIs, microservices, multithreading, concurrency, data structures, algorithms. Strong in debugging, system design, and performance optimization. Proven track record of delivering robust backend solutions in fast-paced environments.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={staggerItem} className="flex flex-col sm:flex-row items-center gap-3 mb-10">
              <motion.a
                href="#experience"
                onClick={(e) => { e.preventDefault(); document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                className="inline-flex items-center gap-2 bg-white text-black font-medium text-sm px-6 py-3 rounded-full"
                whileHover={{ scale: 1.04, boxShadow: '0 0 32px rgba(255,255,255,0.15)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.22 }}
              >
                View Experience
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.a>
              <motion.a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                className="inline-flex items-center gap-2 border border-white/20 text-white/80 hover:text-white hover:border-white/40 font-medium text-sm px-6 py-3 rounded-full bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-200"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.22 }}
              >
                Contact Me
              </motion.a>
            </motion.div>

            {/* Social quick-links */}
            <motion.div
              variants={staggerContainer(0.08, 0)}
              initial="hidden"
              animate="show"
              className="flex items-center gap-3 flex-wrap"
            >
              {[
                { label: 'LinkedIn', color: '#0A66C2', href: 'https://linkedin.com/in/sekharreddy8' },
                { label: 'GitHub',   color: '#ffffff',  href: 'https://github.com/sekhar1515' },
                { label: 'LeetCode', color: '#FFA116',  href: 'https://leetcode.com/u/sekharreddy1515' },
              ].map(({ label, color, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={scaleIn}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/[0.04] text-white/90 text-xs tracking-wider uppercase font-medium transition-all duration-200"
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = `${color}60`;
                    e.currentTarget.style.color = color;
                    e.currentTarget.style.background = `${color}12`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.9)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  }}
                >
                  {label}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — profile image with mouse parallax */}
          <motion.div
            style={{ y: imageY, scale: imageScale, opacity: fadeOp }}
            className="flex-shrink-0 flex items-center justify-center"
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Outer glow ring — neutral white halo */}
              <motion.div
                animate={{ opacity: [0.06, 0.13, 0.06] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-3xl blur-2xl"
                style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)' }}
              />

              {/* Image container */}
              <div
                className="relative w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-3xl overflow-hidden"
                style={{
                  border: '1px solid rgba(255,255,255,0.12)',
                  boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(255,255,255,0.06)',
                }}
              >
                <img
                  src="/profile.png"
                  alt="Sekhar Reddy — Senior Backend Engineer"
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                  draggable={false}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.25) 100%)' }}
                />
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-4 -right-4 flex items-center gap-2 px-3.5 py-2 rounded-2xl"
                style={{
                  background: 'rgba(15,15,17,0.95)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
                }}
              >
                <span className="w-2 h-2 rounded-full bg-[#00C896] animate-pulse" />
                <span className="text-white text-xs font-medium">Open to work</span>
              </motion.div>

              {/* Years badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 1.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -top-4 -left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
                style={{
                  background: 'rgba(15,15,17,0.95)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
                }}
              >
                <span className="text-[#0071e3] text-xs font-bold">4.6+</span>
                <span className="text-white/60 text-[11px]">yrs exp</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll cue ── */}
      <motion.div
        style={{ opacity: scrollCueOp }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[#444] text-[9px] tracking-[0.3em] uppercase font-medium">Scroll</span>
        <div className="w-px h-10 relative overflow-hidden">
          <motion.div
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-x-0 h-full bg-gradient-to-b from-transparent via-white/30 to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}
