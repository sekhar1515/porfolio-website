import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { experiences } from '../data/experienceData';

/* ─── Inline SVG Logos ─── */
function CompanyLogo({ exp, size = 48 }) {
  const r = Math.round(size * 0.25);
  const logos = {
    oracle: (
      <svg viewBox="0 0 60 60" width={size} height={size} aria-label="Oracle">
        <rect width="60" height="60" rx={r} fill="#C74634" />
        {[18, 30, 42].map((cy, i) => (
          <ellipse key={i} cx="30" cy={cy} rx="16" ry="5.5"
            fill="none" stroke="white" strokeWidth="2" />
        ))}
        <line x1="14" y1="18" x2="14" y2="42" stroke="white" strokeWidth="2" />
        <line x1="46" y1="18" x2="46" y2="42" stroke="white" strokeWidth="2" />
      </svg>
    ),
    techolution: (
      <svg viewBox="0 0 60 60" width={size} height={size} aria-label="Techolution">
        <defs>
          <linearGradient id={`tg-${size}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7928CA" />
            <stop offset="100%" stopColor="#2997ff" />
          </linearGradient>
        </defs>
        <rect width="60" height="60" rx={r} fill={`url(#tg-${size})`} />
        <text x="30" y="28" fontSize="11" fontWeight="700" fill="white"
          textAnchor="middle" fontFamily="-apple-system,sans-serif">tech</text>
        <text x="30" y="42" fontSize="11" fontWeight="700" fill="white"
          textAnchor="middle" fontFamily="-apple-system,sans-serif">olution</text>
      </svg>
    ),
    bytexl: (
      <svg viewBox="0 0 60 60" width={size} height={size} aria-label="Bytexl">
        <defs>
          <linearGradient id={`bg-${size}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00C896" />
            <stop offset="100%" stopColor="#0095c8" />
          </linearGradient>
        </defs>
        <rect width="60" height="60" rx={r} fill={`url(#bg-${size})`} />
        <text x="30" y="28" fontSize="15" fontWeight="700" fill="white"
          textAnchor="middle" fontFamily="monospace">{'<>'}</text>
        <text x="30" y="43" fontSize="9.5" fontWeight="600" fill="white"
          textAnchor="middle" fontFamily="-apple-system,sans-serif" letterSpacing="1">BYTEXL</text>
      </svg>
    ),
    ford: (
      <svg viewBox="0 0 60 60" width={size} height={size} aria-label="Ford">
        <rect width="60" height="60" rx={r} fill="#003499" />
        <ellipse cx="30" cy="30" rx="24" ry="15" fill="none" stroke="white" strokeWidth="2.2" />
        <text x="30" y="35" fontSize="14" fontWeight="700" fill="white"
          textAnchor="middle" fontFamily="Georgia,serif" fontStyle="italic">Ford</text>
      </svg>
    ),
  };
  return logos[exp.id] ?? (
    <svg viewBox="0 0 60 60" width={size} height={size}>
      <rect width="60" height="60" rx={r} fill={exp.color} />
      <text x="30" y="36" fontSize="16" fontWeight="700" fill="white"
        textAnchor="middle" fontFamily="-apple-system,sans-serif">
        {exp.company[0]}
      </text>
    </svg>
  );
}

/* ─── Mini Card (grid view) ─── */
function ExperienceCard({ exp, onClick, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 44 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -5, scale: 1.012 }}
      onClick={() => onClick(exp)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick(exp)}
      aria-label={`Open ${exp.company} details`}
      className="group relative cursor-pointer rounded-2xl p-6 flex flex-col gap-4 overflow-hidden focus:outline-none"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        transition: 'box-shadow 0.35s ease',
      }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = `0 20px 60px ${exp.color}18`}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${exp.color}, transparent)` }}
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <CompanyLogo exp={exp} size={44} />
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
          <span key={tag}
            className="text-[12px] px-2.5 py-0.5 rounded-full border border-white/10 text-[#a1a1a6]"
            style={{ background: `${exp.color}10` }}>
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
          {/* ── Backdrop ── */}
          <motion.div
            key="fs-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-lg"
            onClick={onClose}
          />

          {/* ── Panel ── */}
          <motion.div
            key="fs-panel"
            initial={{ opacity: 0, scale: 0.94, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
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
              {/* ── Hero header (fixed, not scrollable) ── */}
              <div
                className="relative flex-shrink-0 px-8 py-10 overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${exp.color}18 0%, transparent 60%)`,
                  borderBottom: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                {/* Background large logo watermark */}
                <div className="absolute right-6 top-4 opacity-[0.06] pointer-events-none">
                  <CompanyLogo exp={exp} size={120} />
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

                {/* Logo + company */}
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15, duration: 0.5 }}
                  className="flex items-center gap-4 mb-6"
                >
                  <CompanyLogo exp={exp} size={52} />
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

                {/* Role, period, type */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22, duration: 0.5 }}
                >
                  <h3
                    className="text-3xl md:text-4xl font-bold mb-4 tracking-tight"
                    style={{ color: exp.color }}
                  >
                    {exp.role}
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {[`📅 ${exp.period}`, `📍 ${exp.location}`, `💼 ${exp.type}`].map(m => (
                      <span key={m}
                        className="text-[13px] text-[#a1a1a6] border border-white/10 px-3.5 py-1 rounded-full bg-white/[0.04]">
                        {m}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* ── Scrollable content ── */}
              <div className="flex-1 overflow-y-auto overscroll-contain px-8 py-8 space-y-8">
                {/* Highlights */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <p className="text-[11px] text-[#a1a1a6] uppercase tracking-[0.25em] font-medium mb-5">
                    Key Contributions
                  </p>
                  <ul className="space-y-5">
                    {exp.highlights.map((h, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35 + i * 0.07, duration: 0.4 }}
                        className="flex gap-3.5 text-[15.5px] text-white/85 leading-[1.65]"
                      >
                        <span
                          className="flex-shrink-0 w-2 h-2 rounded-full mt-[8px]"
                          style={{ background: exp.color }}
                        />
                        <div>
                          {h.split('**').map((part, index) =>
                            index % 2 === 1 ? (
                              <strong key={index} className="text-white font-bold tracking-wide">
                                {part}
                              </strong>
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
                  transition={{ delay: 0.55, duration: 0.45 }}
                  className="pt-6 border-t border-white/[0.06]"
                >
                  <p className="text-[11px] text-[#a1a1a6] uppercase tracking-[0.25em] font-medium mb-4">Tech Stack</p>
                  <div className="flex flex-wrap gap-2.5">
                    {exp.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-[13px] font-medium px-3.5 py-1.5 rounded-full border transition-colors"
                        style={{
                          color: exp.color,
                          borderColor: `${exp.color}40`,
                          background: `${exp.color}10`,
                        }}
                      >
                        {tag}
                      </span>
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
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="py-32 bg-black px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-16"
        >
          <p className="text-xs text-[#86868b] uppercase tracking-[0.2em] mb-4">Career</p>
          <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tight">Work Experience</h2>
          <p className="text-[#86868b] mt-4 text-base max-w-md mx-auto">
            Click any card to open the full story.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} onClick={setSelected} />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {selected && (
          <FullScreenPanel exp={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
