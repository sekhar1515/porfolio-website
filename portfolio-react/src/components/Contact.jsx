import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { staggerContainer, staggerItem, staggerCard, scaleIn } from '../lib/motionVariants';

const links = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/sekharreddy8',
    color: '#0A66C2',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/sekhar1515',
    color: '#fff',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    ),
  },
  {
    label: 'LeetCode',
    href: 'https://leetcode.com/u/sekharreddy1515',
    color: '#FFA116',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.843 5.843 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A.952.952 0 0 1 14.327 2a.95.95 0 0 1 .654.303l.033.045 2.582 4.125a.952.952 0 0 1-.26 1.266.909.909 0 0 1-1.248-.274l-1.028-1.643-.707 1.162 1.027 1.641a2.836 2.836 0 0 0 3.84.832 2.881 2.881 0 0 0 .786-3.956L17.418 1.12A2.879 2.879 0 0 0 14.327 0h-.844z"/>
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:sekharreddy1515@gmail.com',
    color: '#EA4335',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="M2 6l10 7 10-7"/>
      </svg>
    ),
  },
];

export default function Contact() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="py-32 px-6 bg-black relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center bottom, rgba(0,113,227,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="max-w-3xl mx-auto text-center relative z-10">

        {/* Header — full stagger, word by word reveal */}
        <motion.div
          ref={ref}
          variants={staggerContainer(0.1, 0)}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          <motion.p variants={staggerItem} className="text-xs text-[#86868b] uppercase tracking-[0.2em] mb-4">
            Get in touch
          </motion.p>

          <motion.h2
            variants={staggerItem}
            className="text-4xl md:text-6xl font-semibold text-white tracking-tight leading-tight mb-6"
          >
            Let's build something
            <br />
            <motion.span
              variants={scaleIn}
              style={{
                background: 'linear-gradient(135deg, #2997ff 0%, #0071e3 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              great together.
            </motion.span>
          </motion.h2>

          <motion.p variants={staggerItem} className="text-[#86868b] text-base max-w-lg mx-auto leading-relaxed mb-12">
            Open to backend engineering roles, distributed systems challenges, and
            interesting collaborations. Drop me a line — I respond quickly.
          </motion.p>
        </motion.div>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <motion.a
            href="mailto:sekharreddy1515@gmail.com"
            className="inline-flex items-center gap-2.5 bg-[#0071e3] text-white font-semibold text-base px-8 py-4 rounded-full"
            style={{ boxShadow: '0 0 40px rgba(0,113,227,0.3)' }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 60px rgba(0,113,227,0.55)',
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            Say Hello
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </motion.a>
        </motion.div>

        {/* Social links — stagger from below */}
        <motion.div
          variants={staggerContainer(0.08, 0.45)}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="flex items-center justify-center flex-wrap gap-4"
        >
          {links.map(({ label, href, color, icon }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : '_self'}
              rel="noopener noreferrer"
              variants={staggerItem}
              whileHover={{ y: -4, scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              transition={{ duration: 0.22 }}
              className="flex items-center gap-2.5 px-5 py-3 rounded-2xl border border-white/10 bg-white/[0.03] text-[#86868b] hover:text-white group"
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${color}40`;
                e.currentTarget.style.background  = `${color}12`;
                e.currentTarget.querySelector('.link-icon').style.color = color;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.background  = 'rgba(255,255,255,0.03)';
                e.currentTarget.querySelector('.link-icon').style.color = '#86868b';
              }}
              style={{ transition: 'border-color 0.3s ease, background 0.3s ease' }}
            >
              <span className="link-icon text-[#86868b] transition-colors duration-200">{icon}</span>
              <span className="text-sm font-medium">{label}</span>
            </motion.a>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 1, ease: 'easeOut' }}
          className="mt-20 text-[#3a3a3c] text-xs"
        >
          © 2025 Sekhar Reddy · Designed & built with React, Tailwind & Framer Motion
        </motion.p>
      </div>
    </section>
  );
}
