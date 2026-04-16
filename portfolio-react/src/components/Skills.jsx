import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { skillCategories } from '../data/skillsData';

function SkillTile({ skill, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative flex flex-col items-center gap-2.5 p-4 rounded-2xl cursor-default"
      style={{
        background: hovered ? `${skill.color}14` : 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? `${skill.color}40` : 'rgba(255,255,255,0.07)'}`,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: hovered ? 'translateY(-4px) scale(1.03)' : 'none',
        boxShadow: hovered ? `0 10px 30px ${skill.color}20` : 'none',
      }}
    >
      {/* Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-base font-bold select-none transition-all duration-300"
        style={{
          background: hovered ? `${skill.color}25` : `${skill.color}15`,
          color: skill.color,
          fontSize: skill.icon.length > 2 ? '11px' : '20px',
          letterSpacing: '0',
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
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [activeTab, setActiveTab] = useState(skillCategories[0].id);

  const active = skillCategories.find(c => c.id === activeTab);

  return (
    <section id="skills" className="py-32 px-6" style={{ background: '#0a0a0a' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <p className="text-xs text-[#86868b] uppercase tracking-[0.2em] mb-4">Expertise</p>
          <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-4">
            Technical Skills
          </h2>
          <p className="text-[#86868b] text-base max-w-md mx-auto">
            A curated set of technologies I've used in production.
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {skillCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-5 py-2 rounded-full text-[14px] font-medium transition-all duration-250 ${
                activeTab === cat.id
                  ? 'bg-white text-black shadow-lg shadow-white/10'
                  : 'text-[#c8c8cc] border border-white/10 bg-white/[0.02] hover:text-white hover:border-white/30 hover:bg-white/[0.05]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skill tiles */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3"
        >
          {active.skills.map((skill, i) => (
            <SkillTile key={skill.name} skill={skill} index={i} />
          ))}
        </motion.div>

        {/* All skills overview — subtle pills */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-16 pt-12 border-t border-white/[0.06]"
        >
          <p className="text-[12px] text-[#a1a1a6] font-semibold uppercase tracking-[0.25em] text-center mb-8">All Technologies</p>
          <div className="flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto">
            {skillCategories.flatMap(c => c.skills).map(skill => (
              <span
                key={skill.name}
                className="text-[13px] font-medium text-[#c8c8cc] px-4 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.03] hover:text-white hover:border-white/30 hover:bg-white/[0.06] transition-all cursor-default"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
