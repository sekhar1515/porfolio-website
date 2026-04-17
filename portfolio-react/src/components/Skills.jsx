import { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { skillCategories } from '../data/skillsData';
import {
  staggerContainer,
  staggerItem,
  staggerPill,
  scaleIn,
  fadeIn,
} from '../lib/motionVariants';

function SkillTile({ skill, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24, scale: 0.92 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.6,
            delay: index * 0.035,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -5, scale: 1.06, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
      className="relative flex flex-col items-center gap-2.5 p-4 rounded-2xl cursor-default"
      style={{
        background: hovered ? `${skill.color}14` : 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? `${skill.color}40` : 'rgba(255,255,255,0.07)'}`,
        transition: 'background 0.4s ease, border-color 0.4s ease',
        boxShadow: hovered ? `0 12px 36px ${skill.color}20` : 'none',
      }}
    >
      {/* Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-base font-bold select-none transition-all duration-300"
        style={{
          background: hovered ? `${skill.color}25` : `${skill.color}15`,
          color: skill.color,
          fontSize: skill.icon.length > 2 ? '11px' : '20px',
        }}
      >
        {skill.icon}
      </div>

      {/* Name */}
      <span
        className="text-[12px] font-medium text-center leading-tight transition-colors duration-200"
        style={{ color: hovered ? skill.color : '#86868b' }}
      >
        {skill.name}
      </span>
    </motion.div>
  );
}

export default function Skills() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' });
  const [activeTab, setActiveTab] = useState(skillCategories[0].id);
  const active = skillCategories.find(c => c.id === activeTab);

  return (
    <section id="skills" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative" style={{ background: 'transparent' }}>
      <div className="max-w-5xl mx-auto">

        {/* Header — staggered */}
        <motion.div
          ref={headerRef}
          variants={staggerContainer(0.12, 0)}
          initial="hidden"
          animate={headerInView ? 'show' : 'hidden'}
          className="text-center mb-14"
        >
          <motion.p variants={staggerItem} className="text-xs text-[#86868b] uppercase tracking-[0.2em] mb-4">
            Expertise
          </motion.p>
          <motion.h2 variants={staggerItem} className="text-[clamp(1.9rem,6vw,3rem)] font-semibold text-white tracking-tight mb-4">
            Technical Skills
          </motion.h2>
          <motion.p variants={staggerItem} className="text-[#86868b] text-base max-w-md mx-auto">
            A curated set of technologies I've used in production.
          </motion.p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          variants={staggerContainer(0.06, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2.5 mb-12"
        >
          {skillCategories.map((cat, i) => (
            <motion.button
              key={cat.id}
              variants={scaleIn}
              onClick={() => setActiveTab(cat.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className={`px-4 sm:px-5 py-2 rounded-full text-[13px] sm:text-[14px] font-medium min-h-[40px] transition-all duration-250 ${
                activeTab === cat.id
                  ? 'bg-white text-black shadow-lg shadow-white/10'
                  : 'text-[#c8c8cc] border border-white/10 bg-white/[0.02] hover:text-white hover:border-white/30 hover:bg-white/[0.05]'
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Skill tiles — animates on tab switch */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={staggerContainer(0.035, 0)}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3"
          >
            {active.skills.map((skill, i) => (
              <SkillTile key={skill.name} skill={skill} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* All technologies pill cloud */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 pt-12 border-t border-white/[0.06]"
        >
          <p className="text-[12px] text-[#a1a1a6] font-semibold uppercase tracking-[0.25em] text-center mb-8">
            All Technologies
          </p>
          <motion.div
            variants={staggerContainer(0.025, 0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto"
          >
            {skillCategories.flatMap(c => c.skills).map((skill, i) => (
              <motion.span
                key={skill.name}
                variants={staggerPill}
                whileHover={{ scale: 1.08, y: -2 }}
                className="text-[13px] font-medium text-[#c8c8cc] px-4 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.03] cursor-default transition-colors duration-200"
                onMouseEnter={e => {
                  e.currentTarget.style.color = skill.color;
                  e.currentTarget.style.borderColor = `${skill.color}40`;
                  e.currentTarget.style.background = `${skill.color}0e`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = '#c8c8cc';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                }}
              >
                {skill.name}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
