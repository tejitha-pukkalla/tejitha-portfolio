import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (href) => {
    setMenuOpen(false);
    setActive(href);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass border-b border-white/[0.06] py-3' : 'py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-3 group"
        >
          <div className="w-9 h-9 rounded-lg bg-acid/10 border border-acid/30 flex items-center justify-center group-hover:border-acid/60 group-hover:bg-acid/20 transition-all duration-300">
            <span className="font-mono text-acid font-bold text-sm">TP</span>
          </div>
          <span className="font-display font-semibold text-chrome hidden sm:block group-hover:text-acid transition-colors duration-300">
            Tejitha Pukkalla<span className="text-acid">.</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNav(link.href)}
                className={`px-4 py-2 rounded-lg font-body text-sm transition-all duration-300 relative group ${
                  active === link.href ? 'text-acid' : 'text-chrome/60 hover:text-chrome'
                }`}
              >
                {active === link.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 bg-acid/10 rounded-lg border border-acid/20"
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="mailto:p.tejitha@gmail.com"
            className="px-4 py-2 rounded-lg border border-acid/40 text-acid text-sm font-body font-medium hover:bg-acid/10 hover:border-acid/70 transition-all duration-300"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg glass"
        >
          <motion.span
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
            className="w-5 h-px bg-acid block origin-center"
          />
          <motion.span
            animate={{ opacity: menuOpen ? 0 : 1 }}
            className="w-5 h-px bg-chrome/60 block"
          />
          <motion.span
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
            className="w-5 h-px bg-acid block origin-center"
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden glass border-t border-white/[0.06] overflow-hidden"
          >
            <ul className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <button
                    onClick={() => handleNav(link.href)}
                    className="w-full text-left px-4 py-3 rounded-lg text-chrome/70 hover:text-acid hover:bg-acid/5 transition-all duration-200 font-body"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
              <motion.li
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: navLinks.length * 0.06 }}
                className="pt-2 border-t border-white/[0.06]"
              >
                <a
                  href="mailto:p.tejitha@gmail.com"
                  className="block text-center px-4 py-3 rounded-lg border border-acid/40 text-acid text-sm font-body font-medium hover:bg-acid/10 transition-all duration-300"
                >
                  Hire Me
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
