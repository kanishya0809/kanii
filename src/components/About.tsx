import React, { useState, useEffect, useRef } from 'react';
import { GlitchText } from './GlitchText';
import { Network, Sparkles, Terminal, Activity, Eye, ShieldAlert } from 'lucide-react';
import { soundManager } from '../audio/soundManager';

interface NodeData {
  id: string;
  name: string;
  type: string;
  bandwidth: string;
  latency: string;
  status: string;
}

const NODES_DATA: NodeData[] = [
  { id: 'NODE-01', name: 'Thalamus Link', type: 'Sensory Relay', bandwidth: '1.4 PB/s', latency: '0.02ms', status: 'SYNCHRONIZED' },
  { id: 'NODE-02', name: 'Neocortex Matrix', type: 'Logic Lattice', bandwidth: '9.2 PB/s', latency: '0.04ms', status: 'ACTIVE OVERCLOCK' },
  { id: 'NODE-03', name: 'Hippocampus Vault', type: 'Quantum Memory', bandwidth: '14.8 PB/s', latency: '0.01ms', status: 'ENCRYPTED' },
  { id: 'NODE-04', name: 'Occipital Hologram', type: 'Retinal Renderer', bandwidth: '3.6 PB/s', latency: '0.03ms', status: 'STREAMING 16K' },
];

export const About: React.FC = () => {
  const [activeNode, setActiveNode] = useState<NodeData>(NODES_DATA[1]);
  const [activeTab, setActiveTab] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Interactive Synaptic Canvas Matrix
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const points: Array<{ x: number; y: number; vx: number; vy: number; radius: number; color: string }> = [];
    const colors = ['#00f0ff', '#b026ff', '#10f596'];

    for (let i = 0; i < 36; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2.5 + 1.5,
        color: colors[i % colors.length],
      });
    }

    let mouseX = -100;
    let mouseY = -100;

    const handleCanvasMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    canvas.addEventListener('mousemove', handleCanvasMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect nodes within distance threshold
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.strokeStyle = points[i].color;
            ctx.globalAlpha = 0.2 * (1 - dist / 100);
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      // Connect to mouse cursor with intense laser glow
      points.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        const mdx = p.x - mouseX;
        const mdy = p.y - mouseY;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mDist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = '#00f0ff';
          ctx.globalAlpha = 0.7 * (1 - mDist / 120);
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }

        // Draw node circle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleCanvasMouseMove);
    };
  }, []);

  const milestones = [
    {
      year: '2026',
      title: 'THE SILICON CEILING',
      desc: 'Classical semiconductors encountered physical quantum tunneling limits. We pioneered sub-molecular graphene lithography to shatter the 1nm boundary.',
      color: '#00f0ff',
    },
    {
      year: '2028',
      title: 'THE SYNAPSE BRIDGE',
      desc: 'Direct bio-neural handshake accomplished. Organic synapses interfacing at 120GHz with non-invasive quantum photonic sensors.',
      color: '#b026ff',
    },
    {
      year: '2030',
      title: 'THE TOTAL VOID MATRIX',
      desc: 'Zero-latency spatial consciousness. The physical and digital realms merge into a unified canvas where imagination compiles in real-time.',
      color: '#10f596',
    },
  ];

  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-4 max-w-3xl">
          <div className="flex items-center space-x-2 font-mono text-xs text-[#10f596] tracking-widest uppercase">
            <Activity className="w-4 h-4 animate-spin-slow" />
            <span>ARCHITECTURAL GENESIS // FILE 001</span>
          </div>
          <GlitchText
            text="THE NEURAL PARADIGM"
            tag="h2"
            className="font-cyber font-black text-4xl sm:text-6xl text-white tracking-tight"
          />
          <p className="text-gray-400 font-sans text-lg leading-relaxed">
            We discarded conventional flat screen dogma. CYBER//VOID is forged from the ground up to render 
            uncompromising high-fidelity cybernetic interfaces for the year 2030 and beyond.
          </p>
        </div>

        {/* Interactive Dual-Panel Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Interactive Canvas Synaptic Scanner */}
          <div className="lg:col-span-7 rounded-2xl glass-panel-glow p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group">
            {/* Background Neural Canvas */}
            <div className="absolute inset-0 z-0 opacity-80">
              <canvas ref={canvasRef} className="w-full h-full" />
            </div>

            {/* Top HUD Telemetry */}
            <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-2">
                <Network className="w-5 h-5 text-[#00f0ff]" />
                <span className="font-cyber font-bold text-sm tracking-wider text-white">
                  SYNAPSE GRID SCANNER
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded font-mono text-[10px] bg-[#10f596]/15 text-[#10f596] border border-[#10f596]/30">
                LIVE INTERACTION
              </span>
            </div>

            {/* Central Node Selector */}
            <div className="relative z-10 py-16 sm:py-20 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {NODES_DATA.map((node) => {
                const isSelected = activeNode.id === node.id;
                return (
                  <button
                    key={node.id}
                    onClick={() => {
                      soundManager.playClick();
                      setActiveNode(node);
                    }}
                    onMouseEnter={() => soundManager.playHover()}
                    className={`p-3 rounded-xl font-mono text-left transition-all duration-200 border ${
                      isSelected
                        ? 'bg-[#00f0ff]/15 border-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.4)] text-white scale-105'
                        : 'bg-black/40 border-white/10 text-gray-400 hover:border-white/30 hover:text-gray-200'
                    }`}
                  >
                    <div className="text-[10px] text-[#00f0ff] font-bold">{node.id}</div>
                    <div className="text-xs font-semibold truncate text-white">{node.name}</div>
                    <div className="text-[9px] text-gray-400 truncate">{node.latency}</div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Real-time Telemetry Card */}
            <div className="relative z-10 p-4 rounded-xl bg-black/75 border border-white/10 backdrop-blur-md">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
                <div>
                  <div className="text-[10px] text-gray-500 uppercase">ACTIVE TARGET</div>
                  <div className="text-white font-bold">{activeNode.name}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 uppercase">TYPE</div>
                  <div className="text-[#b026ff] font-bold">{activeNode.type}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 uppercase">BANDWIDTH</div>
                  <div className="text-[#00f0ff] font-bold">{activeNode.bandwidth}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 uppercase">STATUS</div>
                  <div className="text-[#10f596] font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10f596] animate-ping" />
                    {activeNode.status}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Evolutionary Timeline */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            {milestones.map((item, idx) => {
              const isActive = activeTab === idx;
              return (
                <div
                  key={item.year}
                  onClick={() => {
                    soundManager.playClick();
                    setActiveTab(idx);
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${
                    isActive
                      ? 'glass-panel-purple border-[#b026ff]/60 scale-[1.02]'
                      : 'glass-panel border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="font-cyber font-black text-2xl tracking-wider"
                      style={{ color: item.color }}
                    >
                      {item.year}
                    </span>
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-white/5 text-gray-400">
                      EPOCH {idx + 1}
                    </span>
                  </div>
                  <h3 className="font-cyber font-bold text-base text-white tracking-wide mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
