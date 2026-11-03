import React, { useRef, useState } from 'react';
import { CyberCore3D } from './CyberCore3D';
import { GlitchText } from './GlitchText';
import { ArrowUpRight, Cpu, Radio, Zap, Terminal, ShieldCheck } from 'lucide-react';
import { soundManager } from '../audio/soundManager';
import confetti from 'canvas-confetti';

export const Hero: React.FC = () => {
  const ctaButtonRef = useRef<HTMLAnchorElement | null>(null);
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });

  // Magnetic Button Effect
  const handleButtonMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = ctaButtonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Magnetic pull with max clamp
    setBtnOffset({
      x: Math.max(-18, Math.min(18, x * 0.35)),
      y: Math.max(-14, Math.min(14, y * 0.35)),
    });
  };

  const handleButtonMouseLeave = () => {
    setBtnOffset({ x: 0, y: 0 });
  };

  const handleInitiateClick = (e: React.MouseEvent) => {
    soundManager.playWarp();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#00f0ff', '#b026ff', '#10f596'],
    });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Top Cyber Badge */}
      <div className="relative z-10 mb-6 flex flex-wrap items-center justify-center gap-2 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border border-[#00f0ff]/30 text-xs font-mono text-gray-300 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
          <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
          <span className="text-white font-semibold">2030 MATRIX ARCHITECTURE</span>
          <span className="text-[#00f0ff]">●</span>
          <span className="text-gray-400">AWWWARDS SITE OF THE DAY</span>
        </div>
      </div>

      {/* Main Grid: Headline & 3D Interactive Centerpiece */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Massive Headline & Story Intro */}
        <div className="lg:col-span-7 flex flex-col text-left space-y-6">
          <div className="font-mono text-xs sm:text-sm tracking-widest text-[#00f0ff] uppercase flex items-center gap-2">
            <Radio className="w-4 h-4 text-[#10f596] animate-pulse" />
            <span>TRANSMITTING ON QUANTUM BAND 88.4</span>
          </div>

          {/* Huge Cyberpunk Glitch Headline */}
          <div className="space-y-1">
            <GlitchText
              text="THE NEURAL"
              tag="h1"
              className="font-cyber font-black text-5xl sm:text-7xl lg:text-8xl tracking-tighter text-white leading-none block"
            />
            <div className="flex flex-wrap items-center gap-3">
              <GlitchText
                text="CYBERSPACE"
                tag="h1"
                className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-[#b026ff] to-[#10f596] block leading-none filter drop-shadow-[0_0_30px_rgba(0,240,255,0.4)]"
              />
            </div>
            <GlitchText
              text="FOR 2030 ARCHITECTS"
              tag="h2"
              className="font-cyber font-bold text-3xl sm:text-5xl lg:text-6xl tracking-tight text-gray-200 block"
            />
          </div>

          <p className="max-w-xl text-base sm:text-lg text-gray-400 font-sans leading-relaxed">
            A visceral fusion of hyper-refined <span className="text-white font-medium">Apple minimalism</span>, 
            award-winning experimental design, and raw <span className="text-[#00f0ff] font-medium">cybernetic horsepower</span>. 
            Step directly into the next epoch of spatial digital consciousness.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* Powerful Magnetic CTA */}
            <a
              ref={ctaButtonRef}
              href="#warp"
              onClick={handleInitiateClick}
              onMouseMove={handleButtonMouseMove}
              onMouseLeave={handleButtonMouseLeave}
              onMouseEnter={() => soundManager.playHover()}
              style={{
                transform: `translate3d(${btnOffset.x}px, ${btnOffset.y}px, 0)`,
                transition: btnOffset.x === 0 ? 'transform 0.4s cubic-bezier(0.2, 0.9, 0.3, 1)' : 'none',
              }}
              className="relative inline-flex items-center justify-center px-8 py-4 rounded-xl font-cyber font-black text-sm tracking-wider text-black bg-gradient-to-r from-[#00f0ff] via-[#b026ff] to-[#10f596] group overflow-hidden shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:shadow-[0_0_50px_rgba(176,38,255,0.7)] transition-shadow duration-300"
            >
              {/* Internal Shimmer */}
              <span className="absolute inset-0 bg-white/25 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <span className="relative z-10 flex items-center space-x-2">
                <span>INITIALIZE SYNC</span>
                <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </a>

            {/* Secondary Cyber Button */}
            <a
              href="#experience"
              onClick={() => soundManager.playClick()}
              onMouseEnter={() => soundManager.playHover()}
              className="px-6 py-4 rounded-xl glass-panel border border-white/10 hover:border-[#00f0ff]/60 text-gray-300 hover:text-white font-mono text-sm tracking-wide transition-all duration-200 flex items-center space-x-2 group"
            >
              <Cpu className="w-4 h-4 text-[#00f0ff] group-hover:rotate-90 transition-transform duration-300" />
              <span>TEST PARTICLES</span>
            </a>
          </div>

          {/* Quick HUD Telemetry Bar */}
          <div className="pt-4 grid grid-cols-3 gap-4 border-t border-white/10 max-w-lg">
            <div>
              <div className="font-cyber font-bold text-xl sm:text-2xl text-[#00f0ff]">
                0.08<span className="text-sm font-mono text-gray-400">ms</span>
              </div>
              <div className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">
                SYNAPSE LAG
              </div>
            </div>
            <div>
              <div className="font-cyber font-bold text-xl sm:text-2xl text-[#b026ff]">
                128<span className="text-sm font-mono text-gray-400">TB/s</span>
              </div>
              <div className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">
                QUANTUM PIPE
              </div>
            </div>
            <div>
              <div className="font-cyber font-bold text-xl sm:text-2xl text-[#10f596]">
                100<span className="text-sm font-mono text-gray-400">%</span>
              </div>
              <div className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">
                BIO-INTEGRITY
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Giant Animated 3D Cyber Core */}
        <div className="lg:col-span-5 h-[420px] sm:h-[500px] lg:h-[600px] relative flex items-center justify-center">
          {/* Glowing Aura Behind Core */}
          <div className="absolute w-[280px] h-[280px] rounded-full bg-gradient-to-tr from-[#00f0ff]/20 via-[#b026ff]/30 to-[#10f596]/10 blur-[80px] pointer-events-none" />

          {/* The 3D Canvas */}
          <CyberCore3D
            className="w-full h-full"
            onCoreClick={() => {
              confetti({
                particleCount: 50,
                spread: 90,
                colors: ['#00f0ff', '#b026ff', '#10f596'],
              });
            }}
          />

          {/* Floating Live Telemetry HUD Tag */}
          <div className="absolute top-4 right-4 glass-panel p-3 rounded-xl border border-white/10 font-mono text-xs text-gray-300 hidden sm:block max-w-[200px] shadow-lg">
            <div className="flex items-center space-x-2 text-[#10f596] mb-1">
              <Zap className="w-3.5 h-3.5" />
              <span className="font-bold text-[10px]">QUANTUM STABLE</span>
            </div>
            <div className="text-[10px] text-gray-400">
              Interactive 3D geometry responds to cursor orientation & clicks.
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Prompt */}
      <div className="relative z-10 mt-12 flex flex-col items-center space-y-2 opacity-60 hover:opacity-100 transition-opacity">
        <span className="font-mono text-[10px] tracking-widest text-gray-400 uppercase">
          SCROLL TO ENTER MATRIX
        </span>
        <div className="w-5 h-8 rounded-full border-2 border-white/20 flex items-start justify-center p-1">
          <span className="w-1 h-2 rounded-full bg-[#00f0ff] animate-bounce" />
        </div>
      </div>
    </section>
  );
};
