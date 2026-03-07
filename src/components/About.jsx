import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { personalInfo } from '../data.js';

const certs = [
  { name: "Data Analysis Using AI", org: "Skill Nation", icon: "🤖" },
  { name: "Cloud Computing", org: "Simplilearn", icon: "☁️" },
  { name: "Basics of Python", org: "UniAthena Cambridge", icon: "🐍" },
];

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden" ref={ref}>
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-plasma/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-acid/60 text-sm tracking-widest">01 /</span>
            <h2 className="font-display text-5xl md:text-6xl font-bold text-chrome">
              About <span className="text-gradient-acid">Me</span>
            </h2>
          </div>
          <div className="w-24 h-px bg-gradient-to-r from-acid to-transparent ml-12" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Avatar placeholder + decoration */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full max-w-sm mx-auto aspect-square">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-2xl border border-acid/20 animate-pulse-slow" />
              <div className="absolute inset-3 rounded-2xl border border-plasma/10" />

              {/* Avatar card */}
              <div className="absolute inset-6 rounded-2xl glass-strong flex flex-col items-center justify-center gap-4 p-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-acid/20 to-plasma/20 border border-acid/30 flex items-center justify-center">
                  <span className="font-display text-4xl font-bold text-gradient-full">T</span>
                </div>
                <div className="text-center">
                  <p className="font-display text-xl font-bold text-chrome">Tejitha Pukkalla</p>
                  <p className="font-body text-sm text-acid/70 mt-1">Full-Stack Developer</p>
                  <p className="font-mono text-xs text-chrome/40 mt-2">Visakhapatnam, India</p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="w-2 h-2 rounded-full bg-acid animate-pulse" />
                  <span className="font-mono text-xs text-acid/70">Open to work</span>
                </div>
              </div>

              {/* Corner decorations */}
              <div className="absolute -top-3 -left-3 w-6 h-6 border-l-2 border-t-2 border-acid/60 rounded-tl-lg" />
              <div className="absolute -top-3 -right-3 w-6 h-6 border-r-2 border-t-2 border-acid/60 rounded-tr-lg" />
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-l-2 border-b-2 border-acid/60 rounded-bl-lg" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-r-2 border-b-2 border-acid/60 rounded-br-lg" />
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -right-4 top-12 glass px-4 py-2 rounded-xl border border-ice/20"
            >
              <span className="font-mono text-xs text-ice">M.Tech Data Science</span>
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute -left-4 bottom-12 glass px-4 py-2 rounded-xl border border-plasma/20"
            >
              <span className="font-mono text-xs text-plasma">MERN Stack Expert</span>
            </motion.div>
          </motion.div>

          {/* Right — Text content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <p className="font-body text-chrome/70 text-lg leading-relaxed">
              I'm a Full-Stack MERN Developer with a Master's in{' '}
              <span className="text-acid font-medium">Computer Science & Data Science</span> from JNTUK.
              I don't just write code — I architect systems that solve real problems at scale.
            </p>
            <p className="font-body text-chrome/60 leading-relaxed">
              My journey spans building{' '}
              <span className="text-ice font-medium">production-grade multi-platform ecosystems</span> like
              food delivery apps with 4 interconnected applications, sports booking systems with live payment
              processing, and clinical management platforms — all from scratch.
            </p>
            <p className="font-body text-chrome/60 leading-relaxed">
              What sets me apart is my unique blend of{' '}
              <span className="text-plasma font-medium">Data Science depth</span> with full-stack
              engineering breadth. I can take a product from whiteboard to production.
            </p>

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { label: 'Location', value: 'Visakhapatnam, AP' },
                { label: 'Experience', value: '2+ Years' },
                { label: 'Education', value: 'M.Tech Data Science' },
                { label: 'Availability', value: 'Immediate' },
              ].map((item) => (
                <div key={item.label} className="glass rounded-xl p-4 border border-white/[0.04]">
                  <p className="font-mono text-xs text-acid/60 mb-1">{item.label}</p>
                  <p className="font-body text-chrome/80 text-sm font-medium">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Certificates */}
            <div>
              <p className="font-mono text-xs text-chrome/30 mb-3 tracking-widest uppercase">Certifications</p>
              <div className="flex flex-wrap gap-2">
                {certs.map((cert) => (
                  <div
                    key={cert.name}
                    className="flex items-center gap-2 glass px-3 py-2 rounded-lg border border-white/[0.05] hover:border-acid/20 transition-colors duration-200"
                  >
                    <span>{cert.icon}</span>
                    <div>
                      <p className="font-body text-xs text-chrome/70">{cert.name}</p>
                      <p className="font-mono text-[10px] text-chrome/30">{cert.org}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <a
                href="mailto:p.tejitha@gmail.com"
                className="px-6 py-3 rounded-xl bg-acid/10 border border-acid/30 text-acid text-sm font-medium hover:bg-acid/20 transition-all duration-300"
              >
                Contact Me
              </a>
              <a
                href="#"
                className="px-6 py-3 rounded-xl border border-white/10 text-chrome/60 text-sm font-medium hover:border-chrome/30 hover:text-chrome transition-all duration-300"
              >
                Download CV
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
