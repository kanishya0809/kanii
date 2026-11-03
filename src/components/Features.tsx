import React, { useState, useRef } from 'react';
import { GlitchText } from './GlitchText';
import { 
  Zap, 
  ShieldCheck, 
  Eye, 
  Cpu, 
  Layers, 
  Orbit, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { soundManager } from '../audio/soundManager';

interface FeatureCardProps {
  icon: React.ReactNode;
  badge: string;
  title: string;
  desc: string;
  specs: string[];
  color: string;
  accentClass: string;
}

const TiltCard: React.FC<FeatureCardProps> = ({
  icon,
  badge,
  title,
  desc,
  specs,
  color,
  accentClass,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * 12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setRotate({ x: rotateX, y: rotateY });
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.25,
    });
  };

  const handleMouseEnter = () => {
    soundManager.playHover();
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`,
        transition: rotate.x === 0 ? 'transform 0.5s ease-out' : 'none',
      }}
      className="relative rounded-2xl glass-panel p-8 flex flex-col justify-between overflow-hidden group border border-white/10 hover:border-white/30 transition-colors duration-300 shadow-xl"
    >
      {/* Specular Glare Reflection */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: glarePos.opacity,
          background: `radial-gradient(circle 280px at ${glarePos.x}% ${glarePos.y}%, ${color}40, transparent 70%)`,
        }}
      />

      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center p-2.5 transition-transform duration-300 group-hover:scale-110 shadow-lg ${accentClass}`}
            style={{ backgroundColor: `${color}15`, color: color }}
          >
            {icon}
          </div>
          <span
            className="font-mono text-[10px] px-2.5 py-1 rounded-full border tracking-widest uppercase font-semibold"
            style={{
              color: color,
              borderColor: `${color}40`,
              backgroundColor: `${color}10`,
            }}
          >
            {badge}
          </span>
        </div>

        <h3 className="font-cyber font-bold text-xl text-white tracking-wide mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all">
          {title}
        </h3>

        <p className="text-gray-400 font-sans text-sm leading-relaxed mb-6">
          {desc}
        </p>
      </div>

      {/* Specs Bullet Points */}
      <div className="border-t border-white/10 pt-4 space-y-2">
        {specs.map((spec, i) => (
          <div key={i} className="flex items-center space-x-2 font-mono text-xs text-gray-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#10f596]" />
            <span>{spec}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Features: React.FC = () => {
  const featureList: FeatureCardProps[] = [
    {
      icon: <Zap className="w-6 h-6" />,
      badge: 'SYNAPSE LINK',
      title: 'Neural Photonic Bus',
      desc: 'Direct biometric sync with 120GHz non-invasive laser lace. Zero perceivable lag between cognitive intent and digital rendering.',
      specs: ['0.02ms Response Time', '128 TB/s Throughput', 'Multi-layer ECC'],
      color: '#00f0ff',
      accentClass: 'border border-[#00f0ff]/40 shadow-[0_0_15px_rgba(0,240,255,0.3)]',
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      badge: 'QUANTUM CELL',
      title: 'Aether-Core Overclock',
      desc: 'Superconducting cryo-cooled microcells with absolute zero thermal bleed. Sustains infinite peak performance under heaviest matrix loads.',
      specs: ['Superconducting Qubits', 'Zero Thermal Bleed', 'Auto-Phase Tuning'],
      color: '#b026ff',
      accentClass: 'border border-[#b026ff]/40 shadow-[0_0_15px_rgba(176,38,255,0.3)]',
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      badge: 'SECURITY',
      title: 'Q-Lattice Cryptography',
      desc: 'Post-quantum dynamic ciphering built upon multi-dimensional mathematical lattices resistant to 10,000 Qubit adversarial cracking.',
      specs: ['AES-Q512 Encryption', 'Zero-Knowledge Proofs', 'Hardware Enclave'],
      color: '#10f596',
      accentClass: 'border border-[#10f596]/40 shadow-[0_0_15px_rgba(16,245,150,0.3)]',
    },
    {
      icon: <Eye className="w-6 h-6" />,
      badge: 'SPATIAL HUD',
      title: '16K Direct Retina Beam',
      desc: 'Lightfield projection mapping directly into ocular pathways. Renders infinite focal planes and ultra-crisp holographic depth.',
      specs: ['Infinite Focal Planes', 'True 120 FPS Motion', 'Eye-Track Foveation'],
      color: '#00f0ff',
      accentClass: 'border border-[#00f0ff]/40 shadow-[0_0_15px_rgba(0,240,255,0.3)]',
    },
    {
      icon: <Layers className="w-6 h-6" />,
      badge: 'UI MATRIX',
      title: 'Liquid Glass Physics',
      desc: 'Next-gen shader pipelines simulating organic fluid dynamics and dynamic refraction in real-time at buttery 144Hz refresh rates.',
      specs: ['Dynamic Ray-Marching', 'Chromium Sub-Surface', 'Spatial Haptics'],
      color: '#b026ff',
      accentClass: 'border border-[#b026ff]/40 shadow-[0_0_15px_rgba(176,38,255,0.3)]',
    },
    {
      icon: <Orbit className="w-6 h-6" />,
      badge: 'AI SENTIENCE',
      title: 'Autonomous Sentinel',
      desc: 'Embedded local neural subagent that anticipates user trajectories, pre-caches volumetric nodes, and optimizes pipeline memory.',
      specs: ['Local On-Chip LLM', 'Sub-millisecond Preds', 'Zero Cloud Leakage'],
      color: '#10f596',
      accentClass: 'border border-[#10f596]/40 shadow-[0_0_15px_rgba(16,245,150,0.3)]',
    },
  ];

  return (
    <section id="features" className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
          <div className="flex items-center space-x-2 font-mono text-xs text-[#00f0ff] tracking-widest uppercase">
            <Zap className="w-4 h-4 animate-bounce" />
            <span>CUTTING EDGE CAPABILITIES // MODULE 02</span>
          </div>
          <GlitchText
            text="FUTURISTIC ARSENAL"
            tag="h2"
            className="font-cyber font-black text-4xl sm:text-6xl text-white tracking-tight"
          />
          <p className="text-gray-400 font-sans text-lg leading-relaxed">
            Engineered with extreme precision. Hover over cards to experience real-time 3D parallax tilt, 
            tactile audio haptics, and live telemetry data.
          </p>
        </div>

        {/* 3D Tilt Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureList.map((feature, idx) => (
            <TiltCard key={idx} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};
