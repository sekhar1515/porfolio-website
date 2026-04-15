import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Companies from './components/Companies';
import Contact from './components/Contact';

export default function App() {
  return (
    <div className="bg-black min-h-screen text-white antialiased">
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Skills />
        <Companies />
        <Contact />
      </main>
    </div>
  );
}
