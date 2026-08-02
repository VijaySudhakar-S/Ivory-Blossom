import React, { useEffect } from 'react';
import Lenis from '@studio-freight/react-lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import IntroAnimation from './components/IntroAnimation';
import HeroTemple from './components/HeroTemple';
import Section2Ceremony from './components/Section2Ceremony';
import Ceremonies from './components/Ceremonies';
import TamilRSVP from './components/TamilRSVP';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <>
      <IntroAnimation />
      <Lenis root options={{ lerp: 0.05, smoothWheel: true }}>
      <main className="app-container" style={{backgroundColor: 'var(--color-ivory)'}}>
        <HeroTemple />
        <Section2Ceremony />
        <Ceremonies />
        <TamilRSVP />
      </main>
      </Lenis>
    </>
  );
}

export default App;
