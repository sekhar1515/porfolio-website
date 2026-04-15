import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11 } },
};
const item = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const fadeOp = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black px-6"
    >
      {/* Parallax background glows */}
      <motion.div style={{ y: bgY, opacity: fadeOp }}
        className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#0071e3] opacity-[0.06] blur-[120px]" />
        <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-purple-700 opacity-[0.05] blur-[100px]" />
      </motion.div>

      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.022]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)`,
          backgroundSize: '72px 72px',
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-5xl"
      >
        {/* ── Desktop: split layout | Mobile: stacked ── */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-16">

          {/* LEFT — text content */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
            {/* Status pill */}
            <motion.div variants={item} className="mb-5">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-[#86868b] text-xs tracking-widest uppercase font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C896] animate-pulse" />
                Available for opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={item}
              className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-white leading-[0.95] mb-5"
            >
              Sekhar
              <br />
              <span style={{
                background: 'linear-gradient(135deg,#ffffff 0%,#86868b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Reddy
              </span>
            </motion.h1>

            {/* Title */}
            <motion.p variants={item}
              className="text-lg md:text-xl font-light text-[#86868b] mb-4 tracking-tight">
              Senior Backend Engineer
              <span className="text-white/20 mx-3">·</span>
              Distributed Systems
            </motion.p>

            {/* Sub-line */}
            <motion.p variants={item}
              className="text-sm md:text-base text-[#a1a1a6] max-w-xl leading-relaxed mb-10">
              Senior Backend Developer with 4.6+ years of experience building scalable, high-performance backend systems. Skilled in Core Java, J2EE, Spring Boot, REST APIs, microservices, multithreading, concurrency, data structures, algorithms. Strong in debugging, system design, and performance optimization. Proven track record of delivering robust backend solutions in fast-paced environments.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={item}
              className="flex flex-col sm:flex-row items-center gap-3 mb-10">
              <a href="#experience"
                className="inline-flex items-center gap-2 bg-white text-black font-medium text-sm px-6 py-3 rounded-full hover:bg-white/90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
                View Experience
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a href="#contact"
                className="inline-flex items-center gap-2 border border-white/20 text-white/80 hover:text-white hover:border-white/40 font-medium text-sm px-6 py-3 rounded-full bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-200">
                Contact Me
              </a>
            </motion.div>

            {/* Social quick-links */}
            <motion.div variants={item}
              className="flex items-center gap-4 flex-wrap">
              {[
                { label: 'LinkedIn', color: '#0A66C2', href: 'https://linkedin.com/in/sekharreddy8' },
                { label: 'GitHub', color: '#ffffff', href: 'https://github.com/sekhar1515' },
                { label: 'LeetCode', color: '#FFA116', href: 'https://leetcode.com/u/sekharreddy1515' },
              ].map(({ label, color, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/[0.04] text-white/90 text-xs tracking-wider uppercase font-medium hover:bg-white/10 hover:border-white/40 transition-all duration-200"
                  style={{ '--hover-color': color }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = `${color}60`;
                    e.currentTarget.style.color = color;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.9)';
                  }}
                >
                  {label}
                </a>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — profile image */}
          <motion.div
            variants={item}
            className="flex-shrink-0 flex items-center justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.03, rotate: 1 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative"
            >
              {/* Outer glow ring */}
              <div
                className="absolute inset-0 rounded-3xl blur-2xl opacity-30"
                style={{ background: 'radial-gradient(circle, #0071e3 0%, transparent 70%)' }}
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
                {/* Subtle gradient overlay for polish */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.25) 100%)',
                  }}
                />
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
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
            </motion.div>
          </motion.div>

        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
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
