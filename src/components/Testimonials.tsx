import React, { useState } from 'react';
import { GlitchText } from './GlitchText';
import { Radio, ShieldCheck, Terminal, MessageSquare, Quote, Sparkles } from 'lucide-react';
import { soundManager } from '../audio/soundManager';

interface Transmission {
  id: string;
  sender: string;
  role: string;
  org: string;
  quote: string;
  hash: string;
  coherence: string;
  timestamp: string;
  color: string;
}

const TRANSMISSIONS: Transmission[] = [
  {
    id: 'PACKET//0x9F4',
    sender: 'DR. AELIA VANCE',
    role: 'Chief of Bio-Neural Telemetry',
    org: 'NEO-KYOTO QUANTUM LAB',
    quote: 'CYBER//VOID isn’t merely another digital portfolio. It is the definitive blueprint for how sentient consciousness will inhabit spatial computing interfaces in 2030.',
    hash: '0x9482F...E901',
    coherence: '99.98%',
    timestamp: '2030.11.03 // 04:19 UTC',
    color: '#00f0ff',
  },
  {
    id: 'PACKET//0x7B2',
    sender: 'KAELEN VOSS',
    role: 'Former Lead Spatial Designer',
    org: 'EX-APPLE HUMAN INTERFACE / VOID CORP',
    quote: 'The craftsmanship matches Cupertino’s finest hardware tolerances, yet vibrates with the untamed raw power of an underground cyberpunk mainframe. Absolute perfection.',
    hash: '0x3312A...C488',
    coherence: '100.0%',
    timestamp: '2030.10.28 // 22:45 UTC',
    color: '#b026ff',
  },
  {
    id: 'PACKET//0x1C8',
    sender: 'SYNTH-ALPHA // 09',
    role: 'Autonomous Quantum Sentience',
    org: 'ORBITAL CONSENSUS DAO',
    quote: 'My algorithmic sub-routines rendered 10,000 cyberspace mockups. Only CYBER//VOID achieved zero cognitive impedance with my neural architecture.',
    hash: '0x8891D...77F3',
    coherence: '99.94%',
    timestamp: '2030.11.01 // 11:02 UTC',
    color: '#10f596',
  },
];

export const Testimonials: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="testimonials" className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
          <div className="flex items-center space-x-2 font-mono text-xs text-[#00f0ff] tracking-widest uppercase">
            <Radio className="w-4 h-4 text-[#00f0ff] animate-pulse" />
            <span>INTERCEPTED SIGNALS // LOG 05</span>
          </div>
          <GlitchText
            text="DECRYPTED TRANSMISSIONS"
            tag="h2"
            className="font-cyber font-black text-4xl sm:text-6xl text-white tracking-tight"
          />
          <p className="text-gray-400 font-sans text-lg">
            Direct telemetry verified across quantum-secure channels from pioneers living on the frontier.
          </p>
        </div>

        {/* Transmission Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TRANSMISSIONS.map((item) => {
            const isHovered = hoveredId === item.id;
            return (
              <div
                key={item.id}
                onMouseEnter={() => {
                  setHoveredId(item.id);
                  soundManager.playHover();
                }}
                onMouseLeave={() => setHoveredId(null)}
                className={`rounded-2xl glass-panel p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group border ${
                  isHovered
                    ? 'scale-105 border-white/30 shadow-[0_10px_40px_rgba(0,0,0,0.8)]'
                    : 'border-white/10'
                }`}
                style={{
                  boxShadow: isHovered ? `0 0 30px ${item.color}25` : undefined,
                }}
              >
                {/* Accent Top Border Line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-300"
                  style={{
                    backgroundColor: item.color,
                    boxShadow: isHovered ? `0 0 10px ${item.color}` : 'none',
                  }}
                />

                {/* Packet Header */}
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                    <div className="flex items-center space-x-2">
                      <Terminal className="w-4 h-4" style={{ color: item.color }} />
                      <span className="font-mono text-xs text-white font-bold tracking-wider">
                        {item.id}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-[#10f596] flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      VERIFIED
                    </span>
                  </div>

                  {/* Audio Waveform Simulation */}
                  <div className="flex items-center space-x-1 mb-6 h-5">
                    {[12, 20, 8, 16, 24, 14, 18, 10, 22, 12, 16, 24, 10, 18].map((h, i) => (
                      <span
                        key={i}
                        className="w-1 rounded-full transition-all duration-300"
                        style={{
                          height: isHovered ? `${Math.max(4, (h * (i % 2 === 0 ? 1.2 : 0.8)))}px` : `${h / 2}px`,
                          backgroundColor: item.color,
                          opacity: isHovered ? 0.9 : 0.4,
                        }}
                      />
                    ))}
                  </div>

                  <p className="font-sans text-gray-300 text-base leading-relaxed italic mb-8">
                    "{item.quote}"
                  </p>
                </div>

                {/* Sender Info & Telemetry */}
                <div className="border-t border-white/10 pt-4">
                  <div className="font-cyber font-bold text-sm text-white">
                    {item.sender}
                  </div>
                  <div className="font-mono text-[11px] text-gray-400 mt-0.5">
                    {item.role}
                  </div>
                  <div className="font-mono text-[10px] tracking-wide mt-0.5" style={{ color: item.color }}>
                    {item.org}
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5 font-mono text-[9px] text-gray-500">
                    <span>COHERENCE: {item.coherence}</span>
                    <span>{item.timestamp}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
