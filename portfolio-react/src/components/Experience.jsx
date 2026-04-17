import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { experiences } from '../data/experienceData';
import CompanyLogo from './CompanyLogo';
import {
  staggerContainer,
  staggerItem,
  staggerCard,
  slideInLeft,
  lineGrow,
} from '../lib/motionVariants';

/* ─── Mini Card ─── */
function ExperienceCard({ exp, onClick, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.article
      ref={ref}
      variants={staggerCard}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      custom={index}
      whileHover={{ y: -6, scale: 1.015, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
      onClick={() => onClick(exp)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick(exp)}
      aria-label={`Open ${exp.company} details`}
      className="group relative cursor-pointer rounded-2xl p-6 flex flex-col gap-4 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3]"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        transition: 'box-shadow 0.35s ease',
        transitionDelay: `${index * 0.05}s`,
      }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 20px 60px ${exp.color}20`)}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
    >
      {/* Top accent line — glides in on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${exp.color}, transparent)` }}
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <CompanyLogo id={exp.id} name={exp.company} domain={exp.domain} initials={exp.logoText} color={exp.color} size={44} />
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-white font-semibold text-[15px]">{exp.company}</h3>
              {exp.dept && (
                <span className="text-[10px] text-[#86868b] border border-white/10 px-1.5 py-0.5 rounded-full">
                  {exp.dept}
                </span>
              )}
            </div>
            <p className="text-[#86868b] text-xs mt-0.5">{exp.location}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          {exp.current && (
            <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-400 border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Now
            </span>
          )}
          <span className="text-[12px] text-[#a1a1a6] font-mono">{exp.period}</span>
        </div>
      </div>

      {/* Role */}
      <p className="text-[15px] font-semibold" style={{ color: exp.color }}>{exp.role}</p>

      {/* Teaser */}
      <p className="text-[14px] text-[#a1a1a6] leading-relaxed flex-1">{exp.teaser}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {exp.tags.slice(0, 4).map(tag => (
          <span
            key={tag}
            className="text-[12px] px-2.5 py-0.5 rounded-full border border-white/10 text-[#a1a1a6]"
            style={{ background: `${exp.color}10` }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center gap-1 text-[11px] text-[#555] group-hover:text-[#86868b] transition-colors pt-2 border-t border-white/[0.05]">
        <span>View full story</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </motion.article>
  );
}

/* ─── Full-Screen Detail Panel ─── */
function FullScreenPanel({ exp, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      {exp && (
        <>
          {/* Backdrop */}
          <motion.div
            key="fs-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Panel — scale + fade from center */}
          <motion.div
            key="fs-panel"
            initial={{ opacity: 0, scale: 0.92, y: 48 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 24 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 pointer-events-none"
          >
            <div
              className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-3xl overflow-hidden pointer-events-auto"
              style={{
                background: 'rgba(15, 15, 17, 0.98)',
                border: '1px solid rgba(255,255,255,0.09)',
                boxShadow: `0 40px 120px rgba(0,0,0,0.85), 0 0 0 0.5px rgba(255,255,255,0.05)`,
              }}
            >
              {/* Header */}
              <div
                className="relative flex-shrink-0 px-8 py-10 overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${exp.color}18 0%, transparent 60%)`,
                  borderBottom: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                {/* Background watermark logo */}
                <div className="absolute right-6 top-4 opacity-[0.06] pointer-events-none">
                  <CompanyLogo id={exp.id} name={exp.company} domain={exp.domain} initials={exp.logoText} color={exp.color} size={120} />
                </div>

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-[#86868b] hover:text-white transition-colors"
                  style={{ background: 'rgba(255,255,255,0.08)' }}
                  aria-label="Close"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>

                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-4 mb-6"
                >
                  <CompanyLogo id={exp.id} name={exp.company} domain={exp.domain} initials={exp.logoText} color={exp.color} size={52} />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-white font-bold text-2xl">{exp.company}</h2>
                      {exp.dept && (
                        <span className="text-[13px] text-[#a1a1a6] border border-white/10 px-2 py-0.5 rounded-full">
                          {exp.dept}
                        </span>
                      )}
                      {exp.current && (
                        <span className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-400 border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-[#a1a1a6] text-[15px]">{exp.location}</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight" style={{ color: exp.color }}>
                    {exp.role}
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {[`📅 ${exp.period}`, `📍 ${exp.location}`, `💼 ${exp.type}`].map(m => (
                      <span
                        key={m}
                        className="text-[13px] text-[#a1a1a6] border border-white/10 px-3.5 py-1 rounded-full bg-white/[0.04]"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto overscroll-contain px-8 py-8 space-y-8">
                {/* Highlights */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="text-[11px] text-[#a1a1a6] uppercase tracking-[0.25em] font-medium mb-5">
                    Key Contributions
                  </p>
                  <ul className="space-y-5">
                    {exp.highlights.map((h, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35 + i * 0.06, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="flex gap-3.5 text-[15.5px] text-white/85 leading-[1.65]"
                      >
                        <span
                          className="flex-shrink-0 w-2 h-2 rounded-full mt-[8px]"
                          style={{ background: exp.color }}
                        />
                        <div>
                          {h.split('**').map((part, index) =>
                            index % 2 === 1 ? (
                              <strong key={index} className="text-white font-bold tracking-wide">{part}</strong>
                            ) : (
                              part
                            )
                          )}
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Tech stack */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="pt-6 border-t border-white/[0.06]"
                >
                  <p className="text-[11px] text-[#a1a1a6] uppercase tracking-[0.25em] font-medium mb-4">Tech Stack</p>
                  <div className="flex flex-wrap gap-2.5">
                    {exp.tags.map(tag => (
                      <motion.span
                        key={tag}
                        whileHover={{ scale: 1.07 }}
                        className="text-[13px] font-medium px-3.5 py-1.5 rounded-full border transition-colors cursor-default"
                        style={{
                          color: exp.color,
                          borderColor: `${exp.color}40`,
                          background: `${exp.color}10`,
                        }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─── Section ─── */
export default function Experience() {
  const [selected, setSelected] = useState(null);
  const headerRef = useRef(null);
  const lineRef   = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });
  const lineInView   = useInView(lineRef,   { once: true, margin: '-120px' });

  return (
    <section id="experience" className="py-32 px-6 relative" style={{ background: 'transparent' }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12">

        {/* Left sticky header */}
        <div className="md:w-1/3 relative">
          {/* Animated vertical timeline line */}
          <div
            ref={lineRef}
            className="hidden md:block absolute left-0 top-0 bottom-0 w-px -ml-6"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          >
            <motion.div
              variants={lineGrow}
              initial="hidden"
              animate={lineInView ? 'show' : 'hidden'}
              className="w-full h-full origin-top"
              style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 100%)', scaleY: 0 }}
            />
          </div>

          <motion.div
            ref={headerRef}
            variants={staggerContainer(0.12, 0)}
            initial="hidden"
            animate={headerInView ? 'show' : 'hidden'}
            className="md:sticky md:top-32 text-left"
          >
            <motion.p variants={staggerItem} className="text-xs text-[#86868b] uppercase tracking-[0.2em] mb-4">
              Career
            </motion.p>
            <motion.h2 variants={staggerItem} className="text-4xl md:text-5xl font-semibold text-white tracking-tight leading-[1.1]">
              Work Experience
            </motion.h2>
            <motion.p variants={staggerItem} className="text-[#86868b] mt-5 text-base leading-relaxed">
              Click any card to open the full story and role details.
            </motion.p>
          </motion.div>
        </div>

        {/* Right cards grid */}
        <motion.div
          variants={staggerContainer(0.1, 0.15)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="md:w-2/3 flex flex-col gap-6"
        >
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} onClick={setSelected} />
          ))}
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {selected && (
          <FullScreenPanel exp={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
