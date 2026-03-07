import { motion } from 'framer-motion';
import { personalInfo } from '../data.js';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.05] py-12 px-6 overflow-hidden">
      <div className="absolute inset-0 section-grid opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-acid/10 border border-acid/30 flex items-center justify-center">
              <span className="font-mono text-acid font-bold text-sm">TP</span>
            </div>
            <div>
              <p className="font-display font-semibold text-chrome text-sm">Tejitha Pukkalla</p>
              <p className="font-mono text-xs text-chrome/30">Full-Stack Developer</p>
            </div>
          </div>

          {/* Nav links */}
          <div className="flex gap-6">
            {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(`#${link.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="font-body text-xs text-chrome/30 hover:text-acid transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {[
              { icon: 'GH', href: personalInfo.github, label: 'GitHub' },
              { icon: 'LI', href: personalInfo.linkedin, label: 'LinkedIn' },
              { icon: '✉', href: `mailto:${personalInfo.email}`, label: 'Email' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-lg glass border border-white/[0.05] flex items-center justify-center font-mono text-xs text-chrome/40 hover:text-acid hover:border-acid/30 transition-all duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-chrome/20">
            © {year} Tejitha Pukkalla. All rights reserved.
          </p>
          <p className="font-mono text-xs text-chrome/20">
            Built with <span className="text-acid">React</span> +{' '}
            <span className="text-plasma">Framer Motion</span> +{' '}
            <span className="text-ice">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
