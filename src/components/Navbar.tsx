import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Shield, Activity, Sparkles } from 'lucide-react';
import { soundManager } from '../audio/soundManager';

export const Navbar: React.FC = () => {
  const [isMuted, setIsMuted] = useState(soundManager.getMuted());
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [latency, setLatency] = useState(14);

  useEffect(() => {
    const unsub = soundManager.subscribe(setIsMuted);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);

    // Simulate subtle network ping jitter
    const pingInterval = setInterval(() => {
      setLatency(Math.floor(11 + Math.random() * 6));
    }, 3500);

    return () => {
      unsub();
      window.removeEventListener('scroll', handleScroll);
      clearInterval(pingInterval);
    };
  }, []);

  const handleAudioToggle = () => {
    soundManager.toggleMute();
    soundManager.playClick();
  };

  const navLinks = [
    { label: 'ARCH//01', name: 'About', href: '#about' },
    { label: 'TECH//02', name: 'Features', href: '#features' },
    { label: 'SPEC//03', name: 'Showcase', href: '#showcase' },
    { label: 'VOID//04', name: 'Playground', href: '#experience' },
    { label: 'LOGS//05', name: 'Transmissions', href: '#testimonials' },
  ];

  const handleLinkClick = (href: string) => {
    soundManager.playClick();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#030308]/85 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Node Indicator */}
          <div className="flex items-center space-x-3">
            <a
              href="#"
              onClick={() => soundManager.playHover()}
              className="flex items-center space-x-2.5 group"
            >
              <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-[#00f0ff] to-[#b026ff] p-[1.5px] transition-transform duration-300 group-hover:scale-110">
                <div className="w-full h-full bg-[#06060f] rounded-lg flex items-center justify-center">
                  <span className="font-cyber font-black text-xs text-[#00f0ff] group-hover:text-[#10f596] transition-colors">
                    CV
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-cyber font-extrabold text-sm tracking-wider text-white flex items-center gap-1.5">
                  CYBER<span className="text-[#00f0ff]">//</span>VOID
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#b026ff]/20 text-[#b026ff] border border-[#b026ff]/40">
                    2030
                  </span>
                </span>
                <span className="font-mono text-[9px] text-gray-400 tracking-tighter">
                  NEURAL OS V4.8
                </span>
              </div>
            </a>

            {/* System Status Pill (Desktop) */}
            <div className="hidden lg:flex items-center space-x-2 px-2.5 py-1 rounded-full bg-black/40 border border-white/5 font-mono text-[10px]">
              <span className="w-2 h-2 rounded-full bg-[#10f596] animate-pulse shadow-[0_0_8px_#10f596]" />
              <span className="text-gray-300">ONLINE</span>
              <span className="text-gray-600">|</span>
              <span className="text-[#00f0ff]">{latency}ms</span>
              <span className="text-gray-600">|</span>
              <span className="text-gray-400">TOKYO-01</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link.href)}
                onMouseEnter={() => soundManager.playHover()}
                className="px-3.5 py-1.5 rounded-lg font-mono text-xs text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200 group relative flex flex-col items-center"
              >
                <span className="text-[8px] text-[#00f0ff]/60 group-hover:text-[#00f0ff] tracking-widest">
                  {link.label}
                </span>
                <span className="font-sans font-medium text-xs tracking-wide">
                  {link.name}
                </span>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#00f0ff] transition-all duration-200 group-hover:w-4/5 shadow-[0_0_8px_#00f0ff]" />
              </button>
            ))}
          </nav>

          {/* Right Controls: Audio + Warp CTA */}
          <div className="flex items-center space-x-3">
            {/* Cyberpunk Audio Frequency Visualizer Button */}
            <button
              onClick={handleAudioToggle}
              onMouseEnter={() => soundManager.playHover()}
              className="relative px-3 py-1.5 rounded-lg border border-white/10 bg-black/40 hover:border-[#00f0ff]/50 transition-all duration-200 flex items-center space-x-2 text-xs font-mono group"
              title={isMuted ? 'Unmute Cyber Audio' : 'Mute Audio'}
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#00f0ff]" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-[#10f596] animate-pulse" />
              )}
              {/* Simulated Equalizer Bars */}
              <div className="flex items-end space-x-0.5 h-3">
                <span
                  className={`w-0.5 rounded-full bg-[#00f0ff] transition-all ${
                    !isMuted ? 'animate-[bounce_0.6s_ease-in-out_infinite] h-3' : 'h-1 bg-gray-600'
                  }`}
                />
                <span
                  className={`w-0.5 rounded-full bg-[#b026ff] transition-all ${
                    !isMuted ? 'animate-[bounce_0.4s_ease-in-out_infinite_0.1s] h-2.5' : 'h-1 bg-gray-600'
                  }`}
                />
                <span
                  className={`w-0.5 rounded-full bg-[#10f596] transition-all ${
                    !isMuted ? 'animate-[bounce_0.7s_ease-in-out_infinite_0.2s] h-3' : 'h-1 bg-gray-600'
                  }`}
                />
              </div>
              <span className="hidden sm:inline text-[10px] text-gray-400 group-hover:text-gray-200">
                {isMuted ? 'MUTED' : 'AUDIO'}
              </span>
            </button>

            {/* Warp CTA Button */}
            <a
              href="#warp"
              onClick={() => {
                soundManager.playWarp();
                const target = document.querySelector('#warp');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="relative hidden sm:inline-flex items-center justify-center px-4 py-1.5 text-xs font-cyber font-bold tracking-wider text-black rounded-lg overflow-hidden group transition-transform duration-200 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#00f0ff] via-[#b026ff] to-[#10f596] transition-transform duration-500 group-hover:rotate-180" />
              <div className="relative z-10 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-black" />
                <span>WARP</span>
              </div>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => {
                soundManager.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden p-2 rounded-lg border border-white/10 bg-black/40 text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 p-4 rounded-xl glass-panel-glow border border-[#00f0ff]/30 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.href)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-sm font-mono text-gray-200 hover:bg-white/10 hover:text-[#00f0ff]"
                >
                  <span>{link.name}</span>
                  <span className="text-[10px] text-gray-400">{link.label}</span>
                </button>
              ))}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#10f596] animate-pulse" />
                  STATUS: OK
                </span>
                <span>{latency}ms NODE PING</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
