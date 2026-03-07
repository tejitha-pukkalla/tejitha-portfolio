import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo, techIcons } from '../data.js';

/* ── Typing Animation ─────────────────────────────── */
function TypingText({ words }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[idx];
    const delay = deleting ? 45 : 95;
    const timer = setTimeout(() => {
      if (!deleting && text === word) {
        setTimeout(() => setDeleting(true), 1600);
        return;
      }
      if (deleting && text === '') {
        setDeleting(false);
        setIdx((p) => (p + 1) % words.length);
        return;
      }
      setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
    }, delay);
    return () => clearTimeout(timer);
  }, [text, deleting, idx, words]);

  return (
    <span style={{ background: 'linear-gradient(135deg,#00ff94,#00d4ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
      {text}
      <span style={{ WebkitTextFillColor: '#00ff94', animation: 'blink 1s step-end infinite' }}>|</span>
    </span>
  );
}

/* ── Floating Tech Icon ───────────────────────────── */
function FloatingIcon({ tech, style, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className="absolute cursor-default select-none hidden lg:block"
      style={style}
    >
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.5 }}
        style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(0,255,148,0.15)',
          borderRadius: '14px',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ fontSize: '18px' }}>{tech.symbol}</span>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: 'rgba(200,214,229,0.7)' }}>
          {tech.name}
        </span>
      </motion.div>
    </motion.div>
  );
}

/* ── Particle ─────────────────────────────────────── */
function Particle({ x, y, size, color, duration, delay }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: color }}
      animate={{ y: [0, -28, 0], opacity: [0.2, 0.7, 0.2], scale: [1, 1.6, 1] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
}

/* ── Orbit Ring ───────────────────────────────────── */
function OrbitRing({ size, duration, delay, color }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size, height: size,
        border: `1px solid ${color}`,
        top: '50%', left: '50%',
        marginTop: -size / 2, marginLeft: -size / 2,
      }}
      animate={{ rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear', delay }}
    >
      <div style={{
        position: 'absolute', width: 7, height: 7, borderRadius: '50%',
        background: color.replace('0.07', '0.9').replace('0.05', '0.8').replace('0.04', '0.7'),
        top: -3.5, left: '50%', marginLeft: -3.5,
        boxShadow: `0 0 10px ${color}`,
      }} />
    </motion.div>
  );
}

/* ── Animated Counter ─────────────────────────────── */
function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const val = parseInt(target);
  useEffect(() => {
    let n = 0;
    const step = Math.ceil(val / 35);
    const t = setInterval(() => {
      n += step;
      if (n >= val) { setCount(val); clearInterval(t); }
      else setCount(n);
    }, 45);
    return () => clearInterval(t);
  }, [val]);
  return <>{count}{suffix}</>;
}

/* ── Main Hero ────────────────────────────────────── */
export default function Hero() {
  const particles = Array.from({ length: 22 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    color: ['rgba(0,255,148,0.4)', 'rgba(123,47,255,0.4)', 'rgba(0,212,255,0.4)'][i % 3],
    duration: 3 + Math.random() * 4,
    delay: Math.random() * 3,
  }));

  const iconPositions = [
    { top: '14%', left: '4%' },
    { top: '20%', right: '5%' },
    { top: '45%', left: '1%' },
    { top: '58%', right: '2%' },
    { top: '76%', left: '8%' },
    { top: '70%', right: '8%' },
    { top: '32%', left: '1%' },
    { top: '36%', right: '2%' },
  ];

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundImage: `linear-gradient(rgba(0,255,148,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,148,0.025) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }}
    >
      {/* BG Orbs */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: -200, left: -200, width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,255,148,0.12) 0%, transparent 70%)', filter: 'blur(60px)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.16, 0.08] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          style={{ position: 'absolute', bottom: -250, right: -200, width: 800, height: 800, borderRadius: '50%', background: 'radial-gradient(circle, rgba(123,47,255,0.12) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.05, 0.12, 0.05] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 7 }}
          style={{ position: 'absolute', top: '40%', left: '40%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,212,255,0.1) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
      </div>

      {/* Particles */}
      {particles.map((p, i) => <Particle key={i} {...p} />)}

      {/* Orbit Rings — centered */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <OrbitRing size={340} duration={20} delay={0} color="rgba(0,255,148,0.07)" />
        <OrbitRing size={520} duration={28} delay={3} color="rgba(123,47,255,0.05)" />
        <OrbitRing size={720} duration={36} delay={6} color="rgba(0,212,255,0.04)" />
      </div>

      {/* Floating Icons */}
      {techIcons.map((tech, i) => (
        <FloatingIcon key={tech.name} tech={tech} style={iconPositions[i]} delay={0.9 + i * 0.1} />
      ))}

      {/* ─── MAIN CONTENT ─── */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '860px',
        width: '100%',
        margin: '0 auto',
        padding: '100px 24px 80px',
        textAlign: 'center',
      }}>

        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            background: 'rgba(0,255,148,0.06)', border: '1px solid rgba(0,255,148,0.22)',
            borderRadius: '999px', padding: '8px 20px', marginBottom: '32px',
          }}
        >
          <motion.span
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            style={{ width: 8, height: 8, borderRadius: '50%', background: '#00ff94', display: 'inline-block', flexShrink: 0 }}
          />
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: 'rgba(0,255,148,0.85)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Available for opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '16px' }}
        >
          <div style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 800, lineHeight: 1.0,
            fontSize: 'clamp(52px, 10vw, 108px)', letterSpacing: '-0.02em', color: '#c8d6e5',
          }}>
            Tejitha
          </div>
          <div style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 800, lineHeight: 1.0,
            fontSize: 'clamp(52px, 10vw, 108px)', letterSpacing: '-0.02em',
            background: 'linear-gradient(135deg, #00ff94 0%, #00d4ff 50%, #7b2fff 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            filter: 'drop-shadow(0 0 40px rgba(0,255,148,0.25))',
          }}>
            Pukkalla
          </div>
        </motion.div>

        {/* Typing Role */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(17px, 3vw, 28px)',
            fontWeight: 600,
            minHeight: '44px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '20px',
          }}
        >
          <TypingText words={personalInfo.roles} />
        </motion.div>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          style={{
            width: '100px', height: '2px', margin: '0 auto 20px',
            background: 'linear-gradient(90deg, transparent, #00ff94, transparent)',
            borderRadius: '2px',
          }}
        />

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          style={{
            fontFamily: 'DM Sans, sans-serif', color: 'rgba(200,214,229,0.5)',
            fontSize: 'clamp(14px, 1.8vw, 17px)', maxWidth: '600px',
            margin: '0 auto 32px', lineHeight: 1.8,
          }}
        >
          {personalInfo.bio}
        </motion.p>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.72 }}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', marginBottom: '32px' }}
        >
          {[
            { value: '2', suffix: '+', label: 'Years Exp.' },
            { value: '8', suffix: '+', label: 'Projects' },
            { value: '3', suffix: '+', label: 'Live Apps' },
            { value: '5', suffix: '', label: 'Core Tech' },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              whileHover={{ y: -5, scale: 1.05, borderColor: 'rgba(0,255,148,0.4)' }}
              style={{
                background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px',
                padding: '14px 26px', minWidth: '95px', cursor: 'default',
                transition: 'all 0.25s ease',
              }}
            >
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '28px', fontWeight: 700, color: '#00ff94', lineHeight: 1 }}>
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: 'rgba(200,214,229,0.35)', marginTop: '4px' }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '36px' }}
        >
          <motion.a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(0,255,148,0.55)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-block', padding: '14px 34px',
              background: '#00ff94', color: '#020408',
              fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '14px', letterSpacing: '0.06em',
              borderRadius: '12px', textDecoration: 'none',
              boxShadow: '0 0 30px rgba(0,255,148,0.35)',
            }}
          >
            View My Work →
          </motion.a>

          <motion.a
            href="mailto:p.tejitha@gmail.com"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-block', padding: '14px 34px',
              background: 'transparent', color: 'rgba(200,214,229,0.7)',
              fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: '14px', letterSpacing: '0.06em',
              borderRadius: '12px', textDecoration: 'none',
              border: '1px solid rgba(200,214,229,0.2)',
            }}
          >
            Get In Touch
          </motion.a>
        </motion.div>

        {/* Social + email strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}
        >
          {[
            { label: 'GitHub', icon: '⎇', href: 'https://github.com/tejitha-pukkalla' },
            { label: 'LinkedIn', icon: 'in', href: personalInfo.linkedin },
            { label: 'Email', icon: '✉', href: `mailto:${personalInfo.email}` },
          ].map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              whileHover={{ y: -3, scale: 1.1, borderColor: 'rgba(0,255,148,0.4)' }}
              title={s.label}
              style={{
                width: 42, height: 42, borderRadius: '10px',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'JetBrains Mono, monospace', fontSize: '13px',
                color: 'rgba(200,214,229,0.5)', textDecoration: 'none',
                transition: 'all 0.25s',
              }}
            >
              {s.icon}
            </motion.a>
          ))}

          <div style={{ width: 1, height: 22, background: 'rgba(255,255,255,0.1)' }} />

          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: 'rgba(200,214,229,0.22)' }}>
            {personalInfo.email}
          </span>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
      >
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: 'rgba(200,214,229,0.2)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 22, height: 36, borderRadius: '11px', border: '1.5px solid rgba(200,214,229,0.12)', display: 'flex', justifyContent: 'center', paddingTop: '6px' }}
        >
          <motion.div
            animate={{ opacity: [0.8, 0.2, 0.8] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            style={{ width: 4, height: 8, borderRadius: '2px', background: 'rgba(0,255,148,0.6)' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}