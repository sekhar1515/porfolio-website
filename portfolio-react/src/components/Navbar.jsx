import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

const navItems = [
  { label: 'About',      href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Companies',  href: '#companies' },
  { label: 'Contact',    href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [hidden, setHidden]       = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [active, setActive]       = useState('');
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150 && !menuOpen) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 40);
  });

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-100%", opacity: 0 }
        }}
        initial="visible"
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled
            ? 'bg-black/50 border-b border-white/[0.06]'
            : 'bg-transparent'
        }`}
        style={scrolled ? { backdropFilter: 'blur(40px) saturate(180%)', WebkitBackdropFilter: 'blur(40px) saturate(180%)' } : {}}
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#about"
            className="text-white font-semibold text-base tracking-tight select-none"
            whileHover={{ opacity: 0.7 }}
            transition={{ duration: 0.2 }}
          >
            SR<span className="text-[#0071e3]">.</span>
          </motion.a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map(({ label, href }) => {
              const id = href.replace('#', '');
              return (
                <li key={label}>
                  <a
                    href={href}
                    className={`text-sm transition-colors duration-200 ${
                      active === id
                        ? 'text-white'
                        : 'text-[#86868b] hover:text-white'
                    }`}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* CTA */}
          <a
            href="mailto:sekharreddy1515@gmail.com"
            className="hidden md:inline-flex items-center gap-1.5 bg-[#0071e3] hover:bg-[#0077ed] text-white text-sm font-medium px-4 py-1.5 rounded-full transition-colors duration-200"
          >
            Hire me
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="md:hidden flex flex-col gap-[5px] p-2"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navItems.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="text-3xl font-light text-white/80 hover:text-white transition-colors"
              >
                {label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
