import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { companies } from '../data/companiesData';

/* ─── SVG logos for marquee ─── */
function MarqueeLogo({ company, size = 52 }) {
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
          <linearGradient id="tcm" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7928CA" />
            <stop offset="100%" stopColor="#2997ff" />
          </linearGradient>
        </defs>
        <rect width="60" height="60" rx={r} fill="url(#tcm)" />
        <text x="30" y="28" fontSize="11" fontWeight="700" fill="white"
          textAnchor="middle" fontFamily="-apple-system,sans-serif">tech</text>
        <text x="30" y="42" fontSize="11" fontWeight="700" fill="white"
          textAnchor="middle" fontFamily="-apple-system,sans-serif">olution</text>
      </svg>
    ),
    ford: (
      <svg viewBox="0 0 60 60" width={size} height={size} aria-label="Ford">
        <rect width="60" height="60" rx={r} fill="#003499" />
        <ellipse cx="30" cy="30" rx="22" ry="14" fill="none" stroke="white" strokeWidth="2.2" />
        <text x="30" y="35" fontSize="13" fontWeight="700" fill="white"
          textAnchor="middle" fontFamily="Georgia,serif" fontStyle="italic">Ford</text>
      </svg>
    ),
    bytexl: (
      <svg viewBox="0 0 60 60" width={size} height={size} aria-label="Bytexl">
        <defs>
          <linearGradient id="bxm" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00C896" />
            <stop offset="100%" stopColor="#0095c8" />
          </linearGradient>
        </defs>
        <rect width="60" height="60" rx={r} fill="url(#bxm)" />
        <text x="30" y="28" fontSize="14" fontWeight="700" fill="white"
          textAnchor="middle" fontFamily="monospace">{'<>'}</text>
        <text x="30" y="42" fontSize="9" fontWeight="600" fill="white"
          textAnchor="middle" fontFamily="-apple-system,sans-serif" letterSpacing="1">BYTEXL</text>
      </svg>
    ),
    jpmc: (
      <svg viewBox="0 0 60 60" width={size} height={size} aria-label="JPMorgan Chase">
        <rect width="60" height="60" rx={r} fill="#117ACA" />
        <text x="30" y="26" fontSize="10" fontWeight="800" fill="white"
          textAnchor="middle" fontFamily="-apple-system,sans-serif" letterSpacing="0.5">JPMC</text>
        <rect x="12" y="30" width="36" height="1.5" fill="white" opacity="0.5" />
        <text x="30" y="44" fontSize="8" fontWeight="500" fill="white"
          textAnchor="middle" fontFamily="-apple-system,sans-serif" opacity="0.85">Chase</text>
      </svg>
    ),
    interactive_brokers: (
      <svg viewBox="0 0 60 60" width={size} height={size} aria-label="Interactive Brokers">
        <rect width="60" height="60" rx={r} fill="#E8001C" />
        <text x="30" y="25" fontSize="14" fontWeight="800" fill="white"
          textAnchor="middle" fontFamily="-apple-system,sans-serif">IB</text>
        <text x="30" y="39" fontSize="7" fontWeight="500" fill="white"
          textAnchor="middle" fontFamily="-apple-system,sans-serif" letterSpacing="0.3" opacity="0.9">BROKERS</text>
      </svg>
    ),
    idfc: (
      <svg viewBox="0 0 60 60" width={size} height={size} aria-label="IDFC First Bank">
        <rect width="60" height="60" rx={r} fill="#E8491D" />
        <text x="30" y="24" fontSize="10" fontWeight="800" fill="white"
          textAnchor="middle" fontFamily="-apple-system,sans-serif" letterSpacing="1">IDFC</text>
        <rect x="12" y="28" width="36" height="1.2" fill="white" opacity="0.4" />
        <text x="30" y="40" fontSize="8" fontWeight="500" fill="white"
          textAnchor="middle" fontFamily="-apple-system,sans-serif" letterSpacing="0.5">FIRST BANK</text>
      </svg>
    ),
    morgan_stanley: (
      <svg viewBox="0 0 60 60" width={size} height={size} aria-label="Morgan Stanley">
        <rect width="60" height="60" rx={r} fill="#002B5C" />
        <text x="30" y="26" fontSize="11" fontWeight="800" fill="white"
          textAnchor="middle" fontFamily="-apple-system,sans-serif" letterSpacing="0.5">MS</text>
        <rect x="12" y="30" width="36" height="1.2" fill="white" opacity="0.3" />
        <text x="30" y="42" fontSize="7" fontWeight="500" fill="white"
          textAnchor="middle" fontFamily="-apple-system,sans-serif" letterSpacing="0.2" opacity="0.85">MORGAN STANLEY</text>
      </svg>
    ),
    mthree: (
      <svg viewBox="0 0 60 60" width={size} height={size} aria-label="Wiley Mthree">
        <rect width="60" height="60" rx={r} fill="#FF6B35" />
        <text x="30" y="28" fontSize="16" fontWeight="900" fill="white"
          textAnchor="middle" fontFamily="-apple-system,sans-serif">M3</text>
        <text x="30" y="42" fontSize="7.5" fontWeight="500" fill="white"
          textAnchor="middle" fontFamily="-apple-system,sans-serif" opacity="0.9" letterSpacing="0.3">WILEY</text>
      </svg>
    ),
    cognizant: (
      <svg viewBox="0 0 60 60" width={size} height={size} aria-label="Cognizant">
        <rect width="60" height="60" rx={r} fill="#1565C0" />
        <text x="30" y="26" fontSize="11" fontWeight="800" fill="white"
          textAnchor="middle" fontFamily="-apple-system,sans-serif" letterSpacing="0.5">CTS</text>
        <rect x="12" y="30" width="36" height="1.2" fill="white" opacity="0.3" />
        <text x="30" y="43" fontSize="7" fontWeight="500" fill="white"
          textAnchor="middle" fontFamily="-apple-system,sans-serif" letterSpacing="0.2" opacity="0.9">COGNIZANT</text>
      </svg>
    ),
    mindtree: (
      <svg viewBox="0 0 60 60" width={size} height={size} aria-label="Mindtree">
        <rect width="60" height="60" rx={r} fill="#009645" />
        {/* Leaf/tree mark */}
        <path d="M30 14 C30 14 18 22 18 32 C18 38 23 42 30 42 C37 42 42 38 42 32 C42 22 30 14 30 14Z"
          fill="none" stroke="white" strokeWidth="2" />
        <line x1="30" y1="42" x2="30" y2="48" stroke="white" strokeWidth="2" />
        <text x="30" y="56" fontSize="6.5" fontWeight="600" fill="white"
          textAnchor="middle" fontFamily="-apple-system,sans-serif" opacity="0.9">MINDTREE</text>
      </svg>
    ),
    accenture: (
      <svg viewBox="0 0 60 60" width={size} height={size} aria-label="Accenture">
        <rect width="60" height="60" rx={r} fill="#A100FF" />
        {/* Accenture chevron ">" mark */}
        <path d="M22 20 L36 30 L22 40" fill="none" stroke="white" strokeWidth="4"
          strokeLinecap="round" strokeLinejoin="round" />
        <text x="38" y="34" fontSize="7" fontWeight="700" fill="white"
          textAnchor="start" fontFamily="-apple-system,sans-serif" opacity="0.8">ACN</text>
      </svg>
    ),
  };
  return logos[company.id] ?? null;
}

/* ─── Single marquee pill ─── */
function MarqueePill({ company }) {
  return (
    <div
      className="flex-shrink-0 flex items-center gap-3 mx-3 px-5 py-3.5 rounded-2xl select-none"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        minWidth: '200px',
        transition: 'all 0.35s cubic-bezier(0.25,0.1,0.25,1)',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = company.bgColor;
        e.currentTarget.style.borderColor = `${company.color}45`;
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = `0 8px 28px ${company.color}22`;
        e.currentTarget.querySelector('.pill-logo').style.filter = 'grayscale(0) brightness(1)';
        e.currentTarget.querySelector('.pill-name').style.color = '#ffffff';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.querySelector('.pill-logo').style.filter = 'grayscale(1) brightness(0.45)';
        e.currentTarget.querySelector('.pill-name').style.color = '#86868b';
      }}
    >
      <div
        className="pill-logo"
        style={{ filter: 'grayscale(1) brightness(0.45)', transition: 'filter 0.35s ease' }}
      >
        <MarqueeLogo company={company} size={44} />
      </div>
      <div>
        <p
          className="pill-name font-semibold text-[13px] transition-colors duration-300"
          style={{ color: '#86868b' }}
        >
          {company.name}
        </p>
        <p className="text-[11px] mt-0.5" style={{ color: '#3a3a3c' }}>
          {company.subtitle}
        </p>
      </div>
    </div>
  );
}

/* ─── Seamless single-row marquee ─── */
function SeamlessMarquee({ speed = 32 }) {
  // Duplicate exactly once — animation goes from 0 → -50% creating a perfect loop
  const items = [...companies, ...companies];

  return (
    <div
      className="overflow-hidden w-full"
      style={{ maskImage: 'linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)' }}
    >
      <div
        className="flex items-center w-max"
        style={{
          animation: `marquee-single ${speed}s linear infinite`,
        }}
        onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
        onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}
      >
        {items.map((co, i) => (
          <MarqueePill key={`${co.id}-${i}`} company={co} />
        ))}
      </div>
    </div>
  );
}

export default function Companies() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="companies" className="py-32 bg-black overflow-hidden">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center"
        >
          <p className="text-xs text-[#86868b] uppercase tracking-[0.2em] mb-4">Hired by the best</p>
          <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-4">
            Cracked 12+ Companies
          </h2>
          <p className="text-[#86868b] text-base max-w-md mx-auto">
            Rigorous processes. Selective teams. Trusted to build and ship at scale.
          </p>
        </motion.div>
      </div>

      {/* Single seamless marquee row */}
      <SeamlessMarquee speed={28} />

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="max-w-4xl mx-auto px-6 mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { value: '4+',   label: 'Years Experience' },
          { value: '12+',  label: 'Companies' },
          { value: '80%',  label: 'Deploy Time Saved' },
          { value: '30%',  label: 'Efficiency Gains' },
        ].map(({ value, label }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + i * 0.08 }}
            className="text-center py-7 rounded-2xl"
            style={{
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <p className="text-3xl font-semibold text-white mb-1">{value}</p>
            <p className="text-[12px] text-[#86868b]">{label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
