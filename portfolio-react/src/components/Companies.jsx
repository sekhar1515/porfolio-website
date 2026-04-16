import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { companies } from '../data/companiesData';
import CompanyLogo from './CompanyLogo';



/* ─── Single marquee pill ─── */
function MarqueePill({ company }) {
  return (
    <div
      className="flex-shrink-0 flex items-center gap-3 mx-3 px-5 py-3.5 rounded-2xl select-none"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        minWidth: '200px',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
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
        <CompanyLogo id={company.id} name={company.name} domain={company.domain} initials={company.initials} color={company.color} size={44} />
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
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
