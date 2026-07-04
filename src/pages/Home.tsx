import React, { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '../sections/Navigation';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Experience from '../sections/Experience';
import SelectedWork from '../sections/SelectedWork';
import Contact from '../sections/Contact';
import Footer from '../sections/Footer';

gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.4,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <>
      <Navigation lenisRef={lenisRef} />
      <main>
        <Hero lenisRef={lenisRef} />
        <About />
        <Experience />
        <SelectedWork />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Home;
