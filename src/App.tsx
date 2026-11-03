import React, { useState } from 'react';
import { BootLoader } from './components/BootLoader';
import { CustomCursor } from './components/CustomCursor';
import { SpotlightBackground } from './components/SpotlightBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Features } from './components/Features';
import { Showcase } from './components/Showcase';
import { ExperiencePlayground } from './components/ExperiencePlayground';
import { Testimonials } from './components/Testimonials';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [booted, setBooted] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#030308] text-white selection:bg-[#b026ff] selection:text-white">
      {/* Cinematic Booting Screen */}
      {!booted && <BootLoader onComplete={() => setBooted(true)} />}

      {/* Custom Trailing Reticle Cursor */}
      <CustomCursor />

      {/* Dynamic Mouse Spotlight & Floating Particle Mesh */}
      <SpotlightBackground />

      {/* Main Content Layout */}
      <div className="relative z-10 flex flex-col">
        {/* Futuristic Glassmorphic HUD Navbar */}
        <Navbar />

        {/* Hero Section */}
        <Hero />

        {/* About: The Neural Architecture of 2030 */}
        <About />

        {/* Features: 3D Tilt Cards */}
        <Features />

        {/* Showcase: Immersive Artifacts & Blueprint Simulator */}
        <Showcase />

        {/* Experience: Interactive Quantum Gravity Well */}
        <ExperiencePlayground />

        {/* Testimonials: Intercepted Transmissions */}
        <Testimonials />

        {/* CTA: Hyperspace Warp Sequence */}
        <CTASection />

        {/* Cyberpunk HUD Footer with Interactive Terminal */}
        <Footer />
      </div>
    </div>
  );
};

export default App;
