import React, { useState, useEffect, useRef } from 'react';
import { GlitchText } from './GlitchText';
import { 
  Atom, 
  Orbit, 
  Flame, 
  Zap, 
  RefreshCw, 
  MousePointer, 
  Volume2,
  Sliders
} from 'lucide-react';
import { soundManager } from '../audio/soundManager';

type ParticleMode = 'vortex' | 'wave' | 'repulsion' | 'chaos';
type ColorTheme = 'cyber' | 'toxic' | 'solar';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  originX: number;
  originY: number;
  color: string;
  size: number;
  phase: number;
}

export const ExperiencePlayground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mode, setMode] = useState<ParticleMode>('vortex');
  const [theme, setTheme] = useState<ColorTheme>('cyber');
  const [particleSpeed, setParticleSpeed] = useState(1.2);
  const [gravityPower, setGravityPower] = useState(1.5);
  const [particleCount, setParticleCount] = useState(1200);

  const themeColors: Record<ColorTheme, string[]> = {
    cyber: ['#00f0ff', '#b026ff', '#38bdf8', '#c084fc'],
    toxic: ['#10f596', '#00ff88', '#00f0ff', '#22c55e'],
    solar: ['#ff007f', '#f43f5e', '#eab308', '#fbbf24'],
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 550);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const colors = themeColors[theme];
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        originX: x,
        originY: y,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 2 + 1,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;
    let isMouseDown = false;
    let lastSoundTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      // Play synthesized tone with throttle
      const now = performance.now();
      if (now - lastSoundTime > 90) {
        lastSoundTime = now;
        soundManager.playParticleTone(mouseX / width, mouseY / height);
      }
    };

    const handleMouseDown = () => {
      isMouseDown = true;
      soundManager.playWarp();
    };

    const handleMouseUp = () => {
      isMouseDown = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    let time = 0;

    const render = () => {
      // Trail fade effect for motion streaks
      ctx.fillStyle = 'rgba(3, 3, 8, 0.25)';
      ctx.fillRect(0, 0, width, height);

      time += 0.02 * particleSpeed;

      const gMultiplier = isMouseDown ? gravityPower * 3.5 : gravityPower;

      particles.forEach((p) => {
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;

        if (mode === 'vortex') {
          // Gravitational pull + tangential vortex spin
          const force = (1 / dist) * 18 * gMultiplier;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force + -Math.sin(angle) * (force * 1.5);
          p.vy += Math.sin(angle) * force + Math.cos(angle) * (force * 1.5);
          p.vx *= 0.94;
          p.vy *= 0.94;
        } else if (mode === 'repulsion') {
          // Intense force field pushing particles away
          if (dist < 220) {
            const force = ((220 - dist) / 220) * 8 * gMultiplier;
            const angle = Math.atan2(dy, dx);
            p.vx -= Math.cos(angle) * force;
            p.vy -= Math.sin(angle) * force;
          }
          // Spring back toward origin
          p.vx += (p.originX - p.x) * 0.02;
          p.vy += (p.originY - p.y) * 0.02;
          p.vx *= 0.92;
          p.vy *= 0.92;
        } else if (mode === 'wave') {
          // Harmonic undulating wave lattice
          p.phase += 0.03 * particleSpeed;
          p.vy += Math.sin(p.x * 0.01 + time + p.phase) * 0.6 * gMultiplier;
          p.vx += (p.originX - p.x) * 0.01;
          p.vy *= 0.95;
        } else if (mode === 'chaos') {
          // High energy Brownian motion
          p.vx += (Math.random() - 0.5) * 1.5 * gMultiplier;
          p.vy += (Math.random() - 0.5) * 1.5 * gMultiplier;
          p.vx *= 0.96;
          p.vy *= 0.96;
        }

        p.x += p.vx * particleSpeed;
        p.y += p.vy * particleSpeed;

        // Wrap edges smoothly
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Cursor Gravity Singularity Visualizer
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, isMouseDown ? 35 : 18, 0, Math.PI * 2);
      ctx.strokeStyle = colors[0];
      ctx.lineWidth = 2;
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mode, theme, particleSpeed, gravityPower, particleCount]);

  return (
    <section id="experience" className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
          <div className="flex items-center space-x-2 font-mono text-xs text-[#10f596] tracking-widest uppercase">
            <Atom className="w-4 h-4 animate-spin-slow" />
            <span>INTERACTIVE EXPERIMENTAL ENGINE // LAB 04</span>
          </div>
          <GlitchText
            text="QUANTUM GRAVITY WELL"
            tag="h2"
            className="font-cyber font-black text-4xl sm:text-6xl text-white tracking-tight"
          />
          <p className="text-gray-400 font-sans text-lg">
            Drag your cursor across the quantum matrix to warp gravitational fields. 
            Click and hold to collapse space-time into a singularity. Real-time audio synthesis active.
          </p>
        </div>

        {/* The Interactive Sandbox Container */}
        <div className="relative rounded-3xl glass-panel-glow border border-[#00f0ff]/30 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.9)]">
          {/* Top HUD Controls Overlay */}
          <div className="relative z-10 p-4 sm:p-6 bg-black/60 backdrop-blur-md border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
            {/* Mode Selector */}
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs text-gray-400 uppercase hidden sm:inline">MODE:</span>
              {(['vortex', 'repulsion', 'wave', 'chaos'] as ParticleMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    soundManager.playClick();
                    setMode(m);
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs uppercase tracking-wider transition-all border ${
                    mode === m
                      ? 'bg-[#00f0ff]/20 border-[#00f0ff] text-white shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                      : 'bg-black/30 border-white/10 text-gray-400 hover:text-white hover:border-white/30'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            {/* Color Theme Selector */}
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs text-gray-400 uppercase hidden sm:inline">SPECTRUM:</span>
              {(['cyber', 'toxic', 'solar'] as ColorTheme[]).map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    soundManager.playClick();
                    setTheme(t);
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs uppercase tracking-wider transition-all border ${
                    theme === t
                      ? 'bg-[#b026ff]/20 border-[#b026ff] text-white shadow-[0_0_12px_rgba(176,38,255,0.4)]'
                      : 'bg-black/30 border-white/10 text-gray-400 hover:text-white hover:border-white/30'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Canvas Canvas Area */}
          <div className="relative w-full h-[450px] sm:h-[550px] cursor-crosshair">
            <canvas ref={canvasRef} className="w-full h-full block" />

            {/* Hint Overlay */}
            <div className="pointer-events-none absolute bottom-4 left-4 font-mono text-[11px] text-gray-400 glass-panel px-3 py-1.5 rounded-lg border border-white/10 flex items-center space-x-2">
              <MousePointer className="w-3.5 h-3.5 text-[#00f0ff]" />
              <span>DRAG CURSOR // HOLD CLICK FOR BLACK HOLE DISRUPTION</span>
            </div>

            {/* Telemetry Indicator */}
            <div className="pointer-events-none absolute top-4 right-4 font-mono text-[11px] text-[#10f596] glass-panel px-3 py-1.5 rounded-lg border border-white/10 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#10f596] animate-ping" />
              <span>{particleCount} PARTICLES // 60 FPS</span>
            </div>
          </div>

          {/* Bottom Tuner Bar */}
          <div className="relative z-10 p-4 sm:p-5 bg-black/70 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs text-gray-300">
            <div className="flex items-center space-x-3">
              <span className="text-gray-400 text-[11px]">VELOCITY:</span>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={particleSpeed}
                onChange={(e) => setParticleSpeed(Number(e.target.value))}
                className="w-full accent-[#00f0ff] cursor-pointer"
              />
              <span className="text-[#00f0ff] font-bold">{particleSpeed.toFixed(1)}x</span>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-gray-400 text-[11px]">GRAVITY:</span>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.2"
                value={gravityPower}
                onChange={(e) => setGravityPower(Number(e.target.value))}
                className="w-full accent-[#b026ff] cursor-pointer"
              />
              <span className="text-[#b026ff] font-bold">{gravityPower.toFixed(1)}G</span>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-gray-400 text-[11px]">DENSITY:</span>
              <input
                type="range"
                min="600"
                max="2000"
                step="100"
                value={particleCount}
                onChange={(e) => setParticleCount(Number(e.target.value))}
                className="w-full accent-[#10f596] cursor-pointer"
              />
              <span className="text-[#10f596] font-bold">{particleCount}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
