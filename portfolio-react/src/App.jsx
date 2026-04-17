import { LazyMotion, domAnimation } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Companies from './components/Companies';
import Contact from './components/Contact';
import ScrollProgress from './components/ScrollProgress';
import PageLoader from './components/PageLoader';
import DarkSkyCanvas from './components/DarkSkyCanvas';

export default function App() {
  return (
    <LazyMotion features={domAnimation}>
      {/* Cinematic page loading spinner — fades out after ~1.2s */}
      <PageLoader duration={1200} />

      {/* Fixed dark sky background — behind everything */}
      <DarkSkyCanvas />

      <div className="relative z-10 min-h-screen text-white antialiased" style={{ background: 'transparent', overflowX: 'hidden' }}>
        {/* Scroll progress bar — fixed, z-200, always on top */}
        <ScrollProgress />

        <Navbar />

        <main>
          <Hero />

          {/* Subtle section divider */}
          <div className="section-glow-divider" />

          <Experience />
          <div className="section-glow-divider" />

          <Skills />
          <div className="section-glow-divider" />

          <Companies />
          <div className="section-glow-divider" />

          <Contact />
        </main>
      </div>
    </LazyMotion>
  );
}
