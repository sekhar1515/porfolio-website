import { LazyMotion, domAnimation } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Companies from './components/Companies';
import Contact from './components/Contact';
import ScrollProgress from './components/ScrollProgress';

export default function App() {
  return (
    <LazyMotion features={domAnimation}>
      <div className="bg-black min-h-screen text-white antialiased">
        {/* Scroll progress bar — fixed, z-200, always on top */}
        <ScrollProgress />

        <Navbar />

        <main>
          <Hero />

          {/* Subtle section divider glow */}
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
