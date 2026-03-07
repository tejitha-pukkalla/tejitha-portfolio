import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import CustomCursor from './components/CustomCursor.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';

// Lazy load below-fold sections
const About = lazy(() => import('./components/About.jsx'));
const Skills = lazy(() => import('./components/Skills.jsx'));
const Projects = lazy(() => import('./components/Projects.jsx'));
const Experience = lazy(() => import('./components/Experience.jsx'));
const Contact = lazy(() => import('./components/Contact.jsx'));
const Footer = lazy(() => import('./components/Footer.jsx'));

function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-24">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-6 h-6 border-2 border-acid/20 border-t-acid rounded-full"
      />
    </div>
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen bg-void noise-overlay">
      {/* Global UI chrome */}
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      {/* Page content */}
      <main>
        <Hero />

        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Skills />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Projects />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Experience />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Footer />
        </Suspense>
      </main>
    </div>
  );
}
