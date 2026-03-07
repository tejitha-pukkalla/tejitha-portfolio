import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { skills } from '../data.js';

const colorMap = {
  acid: { bar: 'bg-acid', text: 'text-acid', border: 'border-acid/30', glow: 'shadow-[0_0_20px_#00ff9440]', bg: 'bg-acid/5' },
  plasma: { bar: 'bg-plasma', text: 'text-plasma', border: 'border-plasma/30', glow: 'shadow-[0_0_20px_#7b2fff40]', bg: 'bg-plasma/5' },
  ice: { bar: 'bg-ice', text: 'text-ice', border: 'border-ice/30', glow: 'shadow-[0_0_20px_#00d4ff40]', bg: 'bg-ice/5' },
  ember: { bar: 'bg-ember', text: 'text-ember', border: 'border-ember/30', glow: 'shadow-[0_0_20px_#ff4d6d40]', bg: 'bg-ember/5' },
};

function SkillBar({ name, level, color, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const c = colorMap[color];

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-body text-sm text-chrome/70">{name}</span>
        <span className={`font-mono text-xs ${c.text}`}>{level}%</span>
      </div>
      <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className={`h-full rounded-full ${c.bar} relative`}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/60 shadow-lg" />
        </motion.div>
      </div>
    </div>
  );
}

function SkillCard({ category, color, icon, items, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const c = colorMap[color];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className={`glass rounded-2xl p-6 border ${c.border} hover:${c.glow} transition-all duration-300 group`}
    >
      {/* Card header */}
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-10 h-10 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center text-xl`}>
          {icon}
        </div>
        <div>
          <h3 className={`font-display font-bold text-lg ${c.text}`}>{category}</h3>
          <p className="font-mono text-xs text-chrome/30">{items.length} skills</p>
        </div>
      </div>

      {/* Skill bars */}
      <div className="space-y-4">
        {items.map((skill, i) => (
          <SkillBar key={skill.name} name={skill.name} level={skill.level} color={color} index={i} />
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="skills" className="relative py-32 px-6 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-acid/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-acid/60 text-sm tracking-widest">02 /</span>
            <h2 className="font-display text-5xl md:text-6xl font-bold text-chrome">
              Tech <span className="text-gradient-plasma">Stack</span>
            </h2>
          </div>
          <div className="w-24 h-px bg-gradient-to-r from-plasma to-transparent ml-12" />
          <p className="ml-12 mt-4 font-body text-chrome/40 max-w-xl">
            Tools and technologies I use to bring ideas to life — from pixel to production.
          </p>
        </motion.div>

        {/* Skill grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <SkillCard key={skill.category} {...skill} index={index} />
          ))}
        </div>

        {/* Extra tech pills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-12 flex flex-wrap gap-3 justify-center"
        >
          {['Turborepo', 'ShadCN UI', 'React Hook Form', 'Zod', 'Mongoose', 'JWT', 'Socket.io', 'Vite', 'Axios', 'Zustand'].map((tech) => (
            <span
              key={tech}
              className="glass px-4 py-2 rounded-full font-mono text-xs text-chrome/50 border border-white/[0.05] hover:border-acid/30 hover:text-acid/80 transition-all duration-300"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
