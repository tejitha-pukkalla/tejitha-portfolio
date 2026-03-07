import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { experience } from '../data.js';

const colorMap = {
  acid: { text: 'text-acid', border: 'border-acid', dot: 'bg-acid', glow: 'shadow-[0_0_16px_#00ff94]', badge: 'bg-acid/10 text-acid border-acid/30' },
  plasma: { text: 'text-plasma', border: 'border-plasma', dot: 'bg-plasma', glow: 'shadow-[0_0_16px_#7b2fff]', badge: 'bg-plasma/10 text-plasma border-plasma/30' },
  ice: { text: 'text-ice', border: 'border-ice', dot: 'bg-ice', glow: 'shadow-[0_0_16px_#00d4ff]', badge: 'bg-ice/10 text-ice border-ice/30' },
  ember: { text: 'text-ember', border: 'border-ember', dot: 'bg-ember', glow: 'shadow-[0_0_16px_#ff4d6d]', badge: 'bg-ember/10 text-ember border-ember/30' },
};

const typeIcon = { 'Full-time': '💼', 'Internship': '🎓', 'Education': '🏛️' };

function ExperienceItem({ item, index, isLast }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [open, setOpen] = useState(index === 0);
  const c = colorMap[item.color];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="relative flex gap-6 md:gap-10"
    >
      {/* Timeline spine */}
      <div className="relative flex flex-col items-center flex-shrink-0 w-10">
        {/* Dot */}
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
          className={`w-4 h-4 rounded-full ${c.dot} ${inView ? c.glow : ''} z-10 mt-1 flex-shrink-0 border-2 border-void`}
        />
        {/* Vertical line */}
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0, originY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: index * 0.1 + 0.4 }}
            className={`w-px flex-1 mt-2 ${c.border} border-l border-dashed opacity-30`}
          />
        )}
      </div>

      {/* Card */}
      <div className="flex-1 pb-10">
        <button
          onClick={() => setOpen(!open)}
          className="w-full text-left group"
          data-cursor-hover
        >
          <div className="glass rounded-2xl border border-white/[0.06] p-5 hover:border-white/[0.12] transition-all duration-300">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-base">{typeIcon[item.type]}</span>
                  <span className={`font-mono text-xs px-2 py-0.5 rounded border ${c.badge}`}>{item.type}</span>
                </div>
                <h3 className={`font-display text-xl font-bold text-chrome group-hover:${c.text} transition-colors duration-300`}>
                  {item.role}
                </h3>
                <p className={`font-body text-sm ${c.text} font-medium`}>{item.company}</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-xs text-chrome/40">{item.period}</p>
                <motion.span
                  animate={{ rotate: open ? 180 : 0 }}
                  className="inline-block text-chrome/30 mt-1"
                >
                  ↓
                </motion.span>
              </div>
            </div>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-1.5">
              {item.tech.slice(0, 4).map((t) => (
                <span key={t} className="font-mono text-[10px] glass px-2 py-0.5 rounded border border-white/[0.05] text-chrome/40">
                  {t}
                </span>
              ))}
              {item.tech.length > 4 && (
                <span className="font-mono text-[10px] text-chrome/30">+{item.tech.length - 4}</span>
              )}
            </div>
          </div>
        </button>

        {/* Expandable highlights */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className={`mt-2 glass rounded-2xl border ${c.border} border-opacity-20 p-5`}>
                <ul className="space-y-3">
                  {item.highlights.map((h, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-start gap-3 font-body text-sm text-chrome/60"
                    >
                      <span className={`${c.text} mt-1 flex-shrink-0 text-xs`}>▸</span>
                      {h}
                    </motion.li>
                  ))}
                </ul>
                {/* All tech tags */}
                <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-white/[0.04]">
                  {item.tech.map((t) => (
                    <span key={t} className={`font-mono text-[10px] px-2 py-1 rounded border ${c.badge}`}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="experience" className="relative py-32 px-6 overflow-hidden" ref={ref}>
      <div className="absolute top-0 right-0 w-80 h-80 bg-ember/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-acid/60 text-sm tracking-widest">04 /</span>
            <h2 className="font-display text-5xl md:text-6xl font-bold text-chrome">
              My <span className="text-gradient-acid">Journey</span>
            </h2>
          </div>
          <div className="w-24 h-px bg-gradient-to-r from-acid to-transparent ml-12" />
          <p className="ml-12 mt-4 font-body text-chrome/40 max-w-xl">
            From internships to building production systems — click each to expand.
          </p>
        </motion.div>

        {/* Timeline */}
        <div>
          {experience.map((item, index) => (
            <ExperienceItem key={item.id} item={item} index={index} isLast={index === experience.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
