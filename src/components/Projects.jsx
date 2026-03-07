import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { projects } from '../data.js';

const colorMap = {
  acid: { text: 'text-acid', border: 'border-acid/30', bg: 'bg-acid/10', badge: 'bg-acid/20 text-acid border-acid/30' },
  plasma: { text: 'text-plasma', border: 'border-plasma/30', bg: 'bg-plasma/10', badge: 'bg-plasma/20 text-plasma border-plasma/30' },
  ice: { text: 'text-ice', border: 'border-ice/30', bg: 'bg-ice/10', badge: 'bg-ice/20 text-ice border-ice/30' },
  ember: { text: 'text-ember', border: 'border-ember/30', bg: 'bg-ember/10', badge: 'bg-ember/20 text-ember border-ember/30' },
};

const statusColor = {
  'Live': 'bg-acid/20 text-acid border-acid/40',
  'Completed': 'bg-ice/20 text-ice border-ice/40',
  'In Progress': 'bg-ember/20 text-ember border-ember/40',
};

function ProjectCard({ project, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [expanded, setExpanded] = useState(false);
  const c = colorMap[project.color];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: (index % 3) * 0.12 }}
      layout
      className={`glass rounded-2xl border ${c.border} overflow-hidden group hover:border-opacity-60 transition-all duration-400 flex flex-col`}
    >
      {/* Visual header */}
      <div className={`relative h-48 ${c.bg} flex items-center justify-center overflow-hidden`}>
        {/* Pattern */}
        <div className="absolute inset-0 section-grid opacity-40" />

        {/* Project number */}
        <span className={`font-display text-8xl font-bold ${c.text} opacity-10 select-none`}>
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Status badge */}
        <div className="absolute top-4 right-4">
          <span className={`font-mono text-xs px-3 py-1 rounded-full border ${statusColor[project.status]}`}>
            {project.status === 'Live' && '● '}{project.status}
          </span>
        </div>

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-4 left-4">
            <span className="font-mono text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-chrome/50">
              Featured
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex gap-3">
            <a
              href={project.github}
              className="glass px-4 py-2 rounded-lg font-mono text-xs text-chrome/70 hover:text-acid border border-white/10 hover:border-acid/30 transition-all duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              GitHub →
            </a>
            <a
              href={project.live}
              className={`px-4 py-2 rounded-lg font-mono text-xs ${c.text} border ${c.border} hover:${c.bg} transition-all duration-200`}
              onClick={(e) => e.stopPropagation()}
            >
              Live ↗
            </a>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className={`font-display text-lg font-bold text-chrome group-hover:${c.text} transition-colors duration-300 mb-2 leading-snug`}>
          {project.title}
        </h3>
        <p className="font-body text-chrome/50 text-sm leading-relaxed mb-4 flex-1">
          {expanded ? project.longDesc : project.description}
        </p>

        {/* Metrics */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.metrics.map((m) => (
            <span key={m} className={`font-mono text-[10px] px-2 py-1 rounded border ${c.badge}`}>
              {m}
            </span>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} className="font-mono text-[10px] px-2 py-1 rounded glass border border-white/[0.05] text-chrome/40">
              {tag}
            </span>
          ))}
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className={`text-xs font-mono ${c.text} hover:underline text-left mt-auto`}
        >
          {expanded ? '↑ Show less' : '↓ Read more'}
        </button>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Live', 'Completed', 'In Progress'];
  const filtered = filter === 'All' ? projects : projects.filter((p) => p.status === filter);

  return (
    <section id="projects" className="relative py-32 px-6 overflow-hidden" ref={ref}>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-ice/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-acid/60 text-sm tracking-widest">03 /</span>
            <h2 className="font-display text-5xl md:text-6xl font-bold text-chrome">
              <span className="text-gradient-full">Projects</span>
            </h2>
          </div>
          <div className="w-24 h-px bg-gradient-to-r from-ice to-transparent ml-12" />
          <p className="ml-12 mt-4 font-body text-chrome/40 max-w-xl">
            Production apps and real-world solutions — from concept to deployment.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="flex gap-3 flex-wrap mb-10"
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full font-mono text-xs border transition-all duration-200 ${
                filter === f
                  ? 'bg-acid/20 text-acid border-acid/40'
                  : 'glass border-white/10 text-chrome/50 hover:border-acid/20 hover:text-chrome/70'
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div layout className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
