import { useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { companies } from '../data/companiesData';
import CompanyLogo from './CompanyLogo';
import { staggerContainer, staggerItem, staggerCard } from '../lib/motionVariants';
import { useEffect } from 'react';

/* ─── Animated Count-Up Number ─── */
function CountUp({ to, suffix = '', duration = 1.8 }) {
  const ref      = useRef(null);
  const inView   = useInView(ref, { once: true, margin: '-60px' });
  const count    = useMotionValue(0);
  const rounded  = useTransform(count, v => {
    if (to.includes('+')) return Math.round(v) + '+';
    if (to.includes('%')) return Math.round(v) + '%';
    return Math.round(v);
  });

  // Parse numeric value
  const numericTo = parseFloat(to);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, numericTo, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [inView, count, numericTo, duration]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
    </span>
  );
}

/* ─── Single marquee pill ─── */
function MarqueePill({ company }) {
  return (
    <div
      className="flex-shrink-0 flex items-center gap-3 mx-3 px-5 py-3.5 rounded-2xl select-none group"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        minWidth: '200px',
        transition: 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = company.bgColor;
        e.currentTarget.style.borderColor = `${company.color}45`;
        e.currentTarget.style.transform = 'scale(1.06) translateY(-2px)';
        e.currentTarget.style.boxShadow = `0 10px 32px ${company.color}25`;
        e.currentTarget.querySelector('.pill-logo').style.filter = 'grayscale(0) brightness(1)';
        e.currentTarget.querySelector('.pill-name').style.color = '#ffffff';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
        e.currentTarget.style.transform = 'scale(1) translateY(0px)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.querySelector('.pill-logo').style.filter = 'grayscale(1) brightness(0.45)';
        e.currentTarget.querySelector('.pill-name').style.color = '#86868b';
      }}
    >
      <div className="pill-logo" style={{ filter: 'grayscale(1) brightness(0.45)', transition: 'filter 0.35s ease' }}>
        <CompanyLogo id={company.id} name={company.name} domain={company.domain} initials={company.initials} color={company.color} size={44} />
      </div>
      <div>
        <p className="pill-name font-semibold text-[13px] transition-colors duration-300" style={{ color: '#86868b' }}>
          {company.name}
        </p>
        <p className="text-[11px] mt-0.5" style={{ color: '#3a3a3c' }}>
          {company.subtitle}
        </p>
      </div>
    </div>
  );
}

/* ─── Seamless marquee ─── */
function SeamlessMarquee({ speed = 32 }) {
  const items = [...companies, ...companies];
  return (
    <div
      className="overflow-hidden w-full"
      style={{ maskImage: 'linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)' }}
    >
      <div
        className="flex items-center w-max"
        style={{ animation: `marquee-single ${speed}s linear infinite` }}
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
  const headerRef  = useRef(null);
  const marqueeRef = useRef(null);
  const headerInView  = useInView(headerRef,  { once: true, margin: '-80px' });
  const marqueeInView = useInView(marqueeRef, { once: true, margin: '-40px' });

  const stats = [
    { value: '4+',  label: 'Years Experience' },
    { value: '12+', label: 'Companies' },
    { value: '80%', label: 'Deploy Time Saved' },
    { value: '30%', label: 'Efficiency Gains' },
  ];

  return (
    <section id="companies" className="py-32 overflow-hidden relative" style={{ background: 'transparent' }}>

      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <motion.div
          ref={headerRef}
          variants={staggerContainer(0.12, 0)}
          initial="hidden"
          animate={headerInView ? 'show' : 'hidden'}
          className="text-center"
        >
          <motion.p variants={staggerItem} className="text-xs text-[#86868b] uppercase tracking-[0.2em] mb-4">
            Hired by the best
          </motion.p>
          <motion.h2 variants={staggerItem} className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-4">
            Cracked 12+ Companies
          </motion.h2>
          <motion.p variants={staggerItem} className="text-[#86868b] text-base max-w-md mx-auto">
            Rigorous processes. Selective teams. Trusted to build and ship at scale.
          </motion.p>
        </motion.div>
      </div>

      {/* Marquee strip — slides up from below when in view */}
      <motion.div
        ref={marqueeRef}
        initial={{ opacity: 0, y: 40 }}
        animate={marqueeInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <SeamlessMarquee speed={28} />
      </motion.div>

      {/* Stats — animated count-up */}
      <motion.div
        variants={staggerContainer(0.1, 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        className="max-w-4xl mx-auto px-6 mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {stats.map(({ value, label }, i) => (
          <motion.div
            key={label}
            variants={staggerCard}
            whileHover={{ y: -4, scale: 1.03, transition: { duration: 0.3 } }}
            className="text-center py-7 rounded-2xl cursor-default"
            style={{
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.06)',
              transition: 'box-shadow 0.35s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 16px 48px rgba(255,255,255,0.06)')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
          >
            <p className="text-3xl font-semibold text-white mb-1">
              <CountUp to={value} duration={1.6 + i * 0.15} />
            </p>
            <p className="text-[12px] text-[#86868b]">{label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
