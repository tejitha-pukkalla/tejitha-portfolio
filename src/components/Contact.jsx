import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { personalInfo } from '../data.js';

const socials = [
  {
    name: 'Email',
    handle: 'p.tejitha@gmail.com',
    href: 'mailto:p.tejitha@gmail.com',
    icon: '✉',
    color: 'acid',
  },
  {
    name: 'LinkedIn',
    handle: 'pukkalla-tejitha',
    href: personalInfo.linkedin,
    icon: 'in',
    color: 'ice',
  },
  {
    name: 'GitHub',
    handle: 'tejitha-pukkalla',
    href: personalInfo.github,
    icon: '⎇',
    color: 'plasma',
  },
  {
    name: 'Phone',
    handle: '+91 8008429292',
    href: 'tel:+918008429292',
    icon: '☎',
    color: 'ember',
  },
];

const colorMap = {
  acid: 'text-acid border-acid/30 hover:bg-acid/10',
  ice: 'text-ice border-ice/30 hover:bg-ice/10',
  plasma: 'text-plasma border-plasma/30 hover:bg-plasma/10',
  ember: 'text-ember border-ember/30 hover:bg-ember/10',
};

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate send
    setTimeout(() => {
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }, 1500);
  };

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden" ref={ref}>
      {/* Bg glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-acid/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-acid/60 text-sm tracking-widest">05 /</span>
            <h2 className="font-display text-5xl md:text-6xl font-bold text-chrome">
              Let's <span className="text-gradient-acid">Talk</span>
            </h2>
          </div>
          <div className="w-24 h-px bg-gradient-to-r from-acid to-transparent ml-12" />
          <p className="ml-12 mt-4 font-body text-chrome/40 max-w-xl">
            Open to full-time roles, freelance projects, and exciting collaborations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left — social links */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div>
              <h3 className="font-display text-2xl font-bold text-chrome mb-2">Get In Touch</h3>
              <p className="font-body text-chrome/50 text-sm leading-relaxed">
                I'm actively looking for new opportunities. Whether you have a project in mind,
                want to collaborate, or just want to say hi — my inbox is always open.
              </p>
            </div>

            <div className="space-y-3">
              {socials.map((s, i) => (
                <motion.a
                  key={s.name}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className={`flex items-center gap-4 glass rounded-xl p-4 border transition-all duration-300 group ${colorMap[s.color]}`}
                >
                  <div className={`w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-mono text-sm font-bold ${colorMap[s.color].split(' ')[0]}`}>
                    {s.icon}
                  </div>
                  <div>
                    <p className="font-body text-xs text-chrome/40">{s.name}</p>
                    <p className="font-mono text-sm text-chrome/70 group-hover:text-chrome transition-colors">{s.handle}</p>
                  </div>
                  <span className="ml-auto text-chrome/20 group-hover:text-chrome/60 transition-colors">→</span>
                </motion.a>
              ))}
            </div>

            {/* Availability card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="glass rounded-xl p-5 border border-acid/20"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-acid animate-pulse" />
                <span className="font-mono text-xs text-acid">Available for hire</span>
              </div>
              <p className="font-body text-chrome/50 text-sm">
                Based in <span className="text-chrome">Visakhapatnam, India</span>.
                Open to <span className="text-acid">remote</span> and{' '}
                <span className="text-acid">on-site</span> roles.
              </p>
            </motion.div>
          </motion.div>

          {/* Right — Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass-strong rounded-2xl border border-white/[0.08] p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                {[
                  { id: 'name', label: 'Your Name', placeholder: 'John Doe', type: 'text' },
                  { id: 'email', label: 'Email Address', placeholder: 'john@example.com', type: 'email' },
                ].map((field) => (
                  <div key={field.id}>
                    <label htmlFor={field.id} className="font-mono text-xs text-chrome/40 block mb-2">
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      name={field.id}
                      type={field.type}
                      value={form[field.id]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      required
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 font-body text-sm text-chrome placeholder-chrome/20 focus:outline-none focus:border-acid/40 focus:bg-acid/5 transition-all duration-200"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label htmlFor="subject" className="font-mono text-xs text-chrome/40 block mb-2">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Let's work together..."
                  required
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 font-body text-sm text-chrome placeholder-chrome/20 focus:outline-none focus:border-acid/40 focus:bg-acid/5 transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="message" className="font-mono text-xs text-chrome/40 block mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  required
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 font-body text-sm text-chrome placeholder-chrome/20 focus:outline-none focus:border-acid/40 focus:bg-acid/5 transition-all duration-200 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                className="w-full py-4 rounded-xl bg-acid text-void font-display font-bold text-sm tracking-wide hover:bg-acid/90 transition-all duration-300 acid-glow hover:shadow-[0_0_50px_#00ff9460] disabled:opacity-60 disabled:cursor-not-allowed relative overflow-hidden group"
              >
                {status === 'idle' && (
                  <span className="relative z-10">Send Message →</span>
                )}
                {status === 'sending' && (
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="inline-block w-4 h-4 border-2 border-void/30 border-t-void rounded-full"
                    />
                    Sending...
                  </span>
                )}
                {status === 'sent' && (
                  <span className="relative z-10">✓ Message Sent!</span>
                )}
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
              </button>

              {status === 'sent' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center font-body text-sm text-acid/70"
                >
                  Thanks for reaching out! I'll get back to you soon.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
