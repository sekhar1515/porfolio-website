import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { staggerContainer, staggerItem } from '../lib/motionVariants';

const navItems = [
  { label: 'About',      href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Companies',  href: '#companies' },
  { label: 'Contact',    href: '#contact' },
];

/** Smooth-scrolls to a section by id, accounting for fixed navbar height */
function smoothScrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 56; // navbar height
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [hidden, setHidden]       = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [active, setActive]       = useState('about');
  const { scrollY } = useScroll();

  /* ── Hide / show navbar on scroll direction ── */
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150 && !menuOpen) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 40);
  });

  /* ── Active section via IntersectionObserver ── */
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* ── Click handler: smooth scroll + close menu ── */
  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    const id = href.replace('#', '');
    smoothScrollTo(id);
    setMenuOpen(false);
  }, []);

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden:  { y: '-100%', opacity: 0 },
        }}
        initial="visible"
        animate={hidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled
            ? 'bg-black/70 border-b border-white/[0.07]'
            : 'bg-transparent'
        }`}
        style={scrolled
          ? { backdropFilter: 'blur(40px) saturate(180%)', WebkitBackdropFilter: 'blur(40px) saturate(180%)' }
          : {}
        }
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">

          {/* Logo */}
          <motion.a
            href="#about"
            onClick={(e) => handleNavClick(e, '#about')}
            className="text-white font-semibold text-base tracking-tight select-none"
            whileHover={{ opacity: 0.75, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            SR<span className="text-[#0071e3]">.</span>
          </motion.a>

          {/* Desktop nav links — stagger on mount */}
          <motion.ul
            variants={staggerContainer(0.07, 0.3)}
            initial="hidden"
            animate="show"
            className="hidden md:flex items-center gap-8 relative"
          >
            {navItems.map(({ label, href }) => {
              const id = href.replace('#', '');
              const isActive = active === id;
              return (
                <motion.li key={label} variants={staggerItem} className="relative">
                  <a
                    href={href}
                    onClick={(e) => handleNavClick(e, href)}
                    className={`text-sm transition-colors duration-200 relative inline-block pb-0.5 ${
                      isActive ? 'text-white' : 'text-[#86868b] hover:text-white'
                    }`}
                  >
                    {label}
                    {/* Spring-animated active underline */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute -bottom-0.5 left-0 right-0 h-px"
                        style={{ background: 'rgba(255,255,255,0.65)' }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </motion.li>
              );
            })}
          </motion.ul>

          {/* Hire Me CTA */}
          <motion.a
            href="mailto:sekharreddy1515@gmail.com"
            className="hidden md:inline-flex items-center gap-1.5 bg-[#0071e3] hover:bg-[#0077ed] text-white text-sm font-medium px-4 py-1.5 rounded-full transition-colors duration-200"
            whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(0,113,227,0.4)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            Hire me
          </motion.a>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="md:hidden flex flex-col gap-[5px] p-3 -mr-1 min-w-[44px] min-h-[44px] items-center justify-center"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-black/97 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 md:hidden"
            style={{ backdropFilter: 'blur(40px)' }}
          >
            {navItems.map(({ label, href }, i) => (
              <motion.a
                key={label}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                initial={{ opacity: 0, x: 32 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`text-2xl sm:text-3xl font-light transition-colors touch-manipulation min-h-[52px] flex items-center ${
                  active === href.replace('#', '') ? 'text-white' : 'text-white/50 hover:text-white'
                }`}
              >
                {label}
              </motion.a>
            ))}
            <motion.a
              href="mailto:sekharreddy1515@gmail.com"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="mt-4 inline-flex items-center gap-2 bg-[#0071e3] text-white font-medium text-base px-8 py-3 rounded-full"
            >
              Hire me
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
