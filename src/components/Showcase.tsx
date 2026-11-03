import React, { useState, useEffect, useRef } from 'react';
import { GlitchText } from './GlitchText';
import { 
  Sliders, 
  RotateCw, 
  Layers, 
  Crosshair, 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
  Maximize2
} from 'lucide-react';
import { soundManager } from '../audio/soundManager';

interface ProductArtifact {
  id: string;
  name: string;
  codename: string;
  tagline: string;
  desc: string;
  category: string;
  color: string;
  specs: { label: string; value: string }[];
  accentGradient: string;
}

const ARTIFACTS: ProductArtifact[] = [
  {
    id: 'ART-01',
    name: 'NEURO-SYNC V4',
    codename: 'PROJECT CIRCE',
    tagline: 'The world’s first seamless bio-photonic neural gateway.',
    desc: 'Crafted from aerospace-grade titanium alloy and carbon nanotube mesh. Bridges human cerebral cortex with quantum computing clouds at sub-millisecond precision.',
    category: 'EXOCORTEX HARDWARE',
    color: '#00f0ff',
    accentGradient: 'from-[#00f0ff] via-[#38bdf8] to-[#0284c7]',
    specs: [
      { label: 'BANDWIDTH', value: '144 TB/s' },
      { label: 'CHASSIS', value: 'Forged Titanium' },
      { label: 'THERMAL BLEED', value: '0.00 W' },
      { label: 'NEURAL CHANNELS', value: '16,384 Direct' },
    ],
  },
  {
    id: 'ART-02',
    name: 'VOID-RUNNER BLADE',
    codename: 'VELOCITY-X',
    tagline: 'Gravitational drift cruiser engineered for sub-orbital transit.',
    desc: 'Features anti-matter ionic vector thrusters capable of Mach 8 intra-atmospheric traversal. Controlled entirely through direct cerebral telemetry.',
    category: 'AEROSPACE DRIFT RIG',
    color: '#b026ff',
    accentGradient: 'from-[#b026ff] via-[#d946ef] to-[#a855f7]',
    specs: [
      { label: 'TOP VELOCITY', value: 'Mach 8.4' },
      { label: 'PROPULSION', value: 'Ion Vector Void' },
      { label: 'RECHARGE RATE', value: '3.2s Full Warp' },
      { label: 'PILOT INTERFACE', value: 'Neural Hologram' },
    ],
  },
  {
    id: 'ART-03',
    name: 'CHRONO-HUD 16K',
    codename: 'OCULAR PRIME',
    tagline: 'Retinal lightfield projection with infinite focal range.',
    desc: 'Bypasses conventional optical displays by projecting modulated laser beams directly onto the retina, rendering high-resolution spatial interfaces indistinguishable from reality.',
    category: 'LIGHTFIELD OCULAR',
    color: '#10f596',
    accentGradient: 'from-[#10f596] via-[#34d399] to-[#059669]',
    specs: [
      { label: 'RESOLUTION', value: '16K per Eye' },
      { label: 'REFRESH RATE', value: '240 Hz Native' },
      { label: 'WEIGHT', value: '18 Grams' },
      { label: 'LATENCY', value: '0.01ms Foveated' },
    ],
  },
  {
    id: 'ART-04',
    name: 'AETHER-CORE MK-VII',
    codename: 'SINGULARITY-7',
    tagline: 'Superconducting quantum power cell with zero emissions.',
    desc: 'Harvests micro-fluctuations in vacuum zero-point energy to deliver continuous clean terra-watt discharge in a compact cylindrical form factor.',
    category: 'ZERO-POINT ENERGY',
    color: '#00f0ff',
    accentGradient: 'from-[#00f0ff] via-[#b026ff] to-[#10f596]',
    specs: [
      { label: 'POWER DENSITY', value: '8.4 GW/cm³' },
      { label: 'OPERATING TEMP', value: '0.004 Kelvin' },
      { label: 'LIFESPAN', value: '100 Years Continuous' },
      { label: 'EFFICIENCY', value: '99.9998%' },
    ],
  },
];

export const Showcase: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [overclock, setOverclock] = useState(120);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const current = ARTIFACTS[selectedIndex];

  // Canvas Rotating Blueprint Wireframe Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    let angle = 0;

    const renderBlueprint = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const speed = (overclock / 100) * 0.015;
      angle += speed;

      // Draw Radar Scan Grid
      ctx.strokeStyle = `${current.color}20`;
      ctx.lineWidth = 1;

      for (let r = 40; r < 200; r += 40) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Crosshairs
      ctx.beginPath();
      ctx.moveTo(cx - 220, cy);
      ctx.lineTo(cx + 220, cy);
      ctx.moveTo(cx, cy - 220);
      ctx.lineTo(cx, cy + 220);
      ctx.stroke();

      // Rotating Radar Sweeper
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, 200, angle, angle + 0.35);
      ctx.fillStyle = `${current.color}15`;
      ctx.fill();

      // Draw Rotating 3D Wireframe Polyhedron
      const vertices = [
        [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
        [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
        [0, 1.6, 0], [0, -1.6, 0], [1.6, 0, 0], [-1.6, 0, 0]
      ];

      const projected = vertices.map(([x, y, z]) => {
        // Rotate around Y and X axes
        const radY = angle;
        const radX = angle * 0.6;

        let x1 = x * Math.cos(radY) + z * Math.sin(radY);
        let z1 = -x * Math.sin(radY) + z * Math.cos(radY);

        let y2 = y * Math.cos(radX) - z1 * Math.sin(radX);
        let z2 = y * Math.sin(radX) + z1 * Math.cos(radX);

        const fov = 300;
        const scale = fov / (fov + z2 * 70);

        return {
          x: cx + x1 * 90 * scale,
          y: cy + y2 * 90 * scale,
          scale,
        };
      });

      // Connect Polyhedron Vertices
      ctx.strokeStyle = current.color;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.85;

      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].x - projected[j].x;
          const dy = projected[i].y - projected[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(projected[i].x, projected[i].y);
            ctx.lineTo(projected[j].x, projected[j].y);
            ctx.stroke();
          }
        }

        // Draw vertex points
        ctx.beginPath();
        ctx.arc(projected[i].x, projected[i].y, 3 * projected[i].scale, 0, Math.PI * 2);
        ctx.fillStyle = current.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = current.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1;

      // Telemetry Text in Canvas
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillStyle = `${current.color}90`;
      ctx.fillText(`ROTATION_VECTOR: ${(angle % (Math.PI * 2)).toFixed(3)} RAD`, 20, height - 30);
      ctx.fillText(`OVERCLOCK_MODULATOR: ${overclock}% PEAK`, 20, height - 15);

      animId = requestAnimationFrame(renderBlueprint);
    };

    renderBlueprint();

    return () => cancelAnimationFrame(animId);
  }, [selectedIndex, overclock, current.color]);

  const handlePrev = () => {
    soundManager.playClick();
    setSelectedIndex((prev) => (prev === 0 ? ARTIFACTS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    soundManager.playClick();
    setSelectedIndex((prev) => (prev === ARTIFACTS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="showcase" className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center space-x-2 font-mono text-xs text-[#b026ff] tracking-widest uppercase">
              <Layers className="w-4 h-4 animate-spin-slow" />
              <span>FLAGSHIP ARTIFACTS // GALLERY 03</span>
            </div>
            <GlitchText
              text="2030 ARTIFACTS"
              tag="h2"
              className="font-cyber font-black text-4xl sm:text-6xl text-white tracking-tight"
            />
            <p className="text-gray-400 font-sans text-lg">
              Precision-forged devices designed for spatial cyberspace. Switch artifacts and tweak parameters below.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrev}
              onMouseEnter={() => soundManager.playHover()}
              className="w-12 h-12 rounded-xl glass-panel border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:border-[#00f0ff] transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-mono text-sm text-gray-400">
              0{selectedIndex + 1} / 0{ARTIFACTS.length}
            </span>
            <button
              onClick={handleNext}
              onMouseEnter={() => soundManager.playHover()}
              className="w-12 h-12 rounded-xl glass-panel border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:border-[#00f0ff] transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Artifact Quick Switcher Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {ARTIFACTS.map((item, idx) => {
            const isSelected = selectedIndex === idx;
            return (
              <button
                key={item.id}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedIndex(idx);
                }}
                onMouseEnter={() => soundManager.playHover()}
                className={`p-4 rounded-xl text-left font-mono transition-all duration-300 border ${
                  isSelected
                    ? 'glass-panel-glow border-[#00f0ff] text-white shadow-lg scale-102'
                    : 'glass-panel border-white/5 text-gray-400 hover:border-white/20 hover:text-gray-200'
                }`}
              >
                <div className="text-[10px] text-[#00f0ff] font-bold mb-1">{item.id}</div>
                <div className="font-cyber font-bold text-sm text-white truncate">{item.name}</div>
                <div className="text-[10px] text-gray-500 uppercase mt-0.5">{item.category}</div>
              </button>
            );
          })}
        </div>

        {/* Main Showcase Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: 3D Canvas Blueprint Visualizer */}
          <div className="lg:col-span-7 rounded-2xl glass-panel-glow p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden h-[420px] sm:h-[500px]">
            {/* Blueprint Canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

            {/* Top Blueprint Header */}
            <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center space-x-2">
                <Crosshair className="w-4 h-4 text-[#00f0ff] animate-pulse" />
                <span className="font-mono text-xs text-gray-300 uppercase tracking-wider">
                  REAL-TIME BLUEPRINT RENDERING // {current.codename}
                </span>
              </div>
              <span className="font-mono text-[10px] text-gray-400">FPS: 60.0</span>
            </div>

            {/* Bottom Blueprint Interactive Controls */}
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-black/75 border border-white/10 backdrop-blur-md">
              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <Sliders className="w-4 h-4 text-[#00f0ff]" />
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] text-gray-400">OVERCLOCK VELOCITY</span>
                  <span className="font-mono text-xs text-white font-bold">{overclock}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="200"
                  value={overclock}
                  onChange={(e) => {
                    setOverclock(Number(e.target.value));
                    soundManager.playParticleTone(Number(e.target.value) / 200, 0.5);
                  }}
                  className="w-28 sm:w-36 accent-[#00f0ff] cursor-pointer"
                />
              </div>

              <div className="flex items-center space-x-2">
                <span className="font-mono text-[10px] text-[#10f596] flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#10f596] animate-pulse" />
                  OPTICAL LOCK ACTIVE
                </span>
              </div>
            </div>
          </div>

          {/* Right: Technical Specification & Apple-grade Details */}
          <div className="lg:col-span-5 rounded-2xl glass-panel p-8 flex flex-col justify-between border border-white/10">
            <div className="space-y-6">
              <div>
                <span
                  className="font-mono text-xs px-3 py-1 rounded-full border tracking-widest font-semibold uppercase"
                  style={{
                    color: current.color,
                    borderColor: `${current.color}40`,
                    backgroundColor: `${current.color}15`,
                  }}
                >
                  {current.category}
                </span>
                <h3 className="font-cyber font-black text-3xl sm:text-4xl text-white tracking-tight mt-4">
                  {current.name}
                </h3>
                <p className="font-mono text-xs text-[#00f0ff] tracking-wide mt-1">
                  {current.tagline}
                </p>
              </div>

              <p className="text-gray-400 font-sans text-sm sm:text-base leading-relaxed">
                {current.desc}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                {current.specs.map((s, i) => (
                  <div key={i} className="p-3 rounded-lg bg-black/30 border border-white/5">
                    <div className="font-mono text-[10px] text-gray-500 uppercase">{s.label}</div>
                    <div className="font-cyber font-bold text-base text-white mt-0.5">{s.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => soundManager.playSuccess()}
                onMouseEnter={() => soundManager.playHover()}
                className="w-full py-3.5 rounded-xl font-cyber font-bold text-xs tracking-wider text-black bg-gradient-to-r from-[#00f0ff] via-[#b026ff] to-[#10f596] hover:opacity-95 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-black" />
                <span>COMMISSION ARCHITECTURE</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
