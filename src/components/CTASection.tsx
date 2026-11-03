import React, { useState, useEffect, useRef } from 'react';
import { GlitchText } from './GlitchText';
import { Sparkles, ArrowRight, Zap, CheckCircle2, ShieldCheck, Radio } from 'lucide-react';
import { soundManager } from '../audio/soundManager';
import confetti from 'canvas-confetti';

export const CTASection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'linking' | 'connected'>('idle');
  const [warpSpeed, setWarpSpeed] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Hyperspace Starfield Warp Tunnel Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 1000);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const numStars = 400;
    const stars: Array<{ x: number; y: number; z: number; color: string }> = [];
    const colors = ['#00f0ff', '#b026ff', '#10f596', '#ffffff'];

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * width,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const cx = width / 2;
    const cy = height / 2;

    const render = () => {
      ctx.fillStyle = 'rgba(3, 3, 8, 0.35)';
      ctx.fillRect(0, 0, width, height);

      const speed = 6 * warpSpeed;

      stars.forEach((star) => {
        star.z -= speed;
        if (star.z <= 0) {
          star.z = width;
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
        }

        const k = 250 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        if (px >= 0 && px < width && py >= 0 && py < height) {
          const size = Math.max(0.5, (1 - star.z / width) * (warpSpeed > 2 ? 4 : 2.5));
          const prevK = 250 / (star.z + speed * 2);
          const prevX = star.x * prevK + cx;
          const prevY = star.y * prevK + cy;

          // Draw streak
          ctx.beginPath();
          ctx.moveTo(prevX, prevY);
          ctx.lineTo(px, py);
          ctx.strokeStyle = star.color;
          ctx.lineWidth = size;
          ctx.stroke();
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [warpSpeed]);

  const handleWarpEngage = () => {
    soundManager.playWarp();
    setWarpSpeed(6); // hyperspace speed surge!
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#00f0ff', '#b026ff', '#10f596'],
    });

    setTimeout(() => {
      setWarpSpeed(1);
    }, 1800);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    soundManager.playClick();
    setStatus('linking');

    setTimeout(() => {
      soundManager.playSuccess();
      setStatus('connected');
      confetti({
        particleCount: 50,
        spread: 60,
        colors: ['#10f596', '#00f0ff'],
      });
    }, 1200);
  };

  return (
    <section id="warp" className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-white/5">
      {/* Background Warp Tunnel Canvas */}
      <div className="absolute inset-0 z-0">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-10">
        {/* Top Floating Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full glass-panel border border-[#00f0ff]/40 text-xs font-mono text-gray-300 shadow-[0_0_20px_rgba(0,240,255,0.3)]">
          <Zap className="w-3.5 h-3.5 text-[#10f596] animate-pulse" />
          <span>HYPERSPACE JUMP VECTOR ENGAGED</span>
        </div>

        {/* Big Glitch Headline */}
        <div className="space-y-3">
          <GlitchText
            text="INITIATE WARP SEQUENCE"
            tag="h2"
            className="font-cyber font-black text-5xl sm:text-7xl lg:text-8xl text-white tracking-tighter"
          />
          <p className="max-w-2xl mx-auto text-gray-300 font-sans text-lg sm:text-xl leading-relaxed">
            Ready to deploy your enterprise architecture into 2030? 
            Engage hyperspace or establish your direct quantum handshake below.
          </p>
        </div>

        {/* Warp Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={handleWarpEngage}
            onMouseEnter={() => soundManager.playHover()}
            className="px-10 py-5 rounded-2xl font-cyber font-black text-base tracking-widest text-black bg-gradient-to-r from-[#00f0ff] via-[#b026ff] to-[#10f596] shadow-[0_0_40px_rgba(0,240,255,0.5)] hover:shadow-[0_0_70px_rgba(176,38,255,0.8)] transition-all duration-300 hover:scale-105 flex items-center space-x-3 group"
          >
            <Sparkles className="w-5 h-5 text-black group-hover:rotate-45 transition-transform" />
            <span>ENGAGE HYPERSPACE</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>

        {/* Interactive Neural Newsletter Link Form */}
        <div className="pt-8 max-w-md mx-auto">
          {status === 'connected' ? (
            <div className="p-4 rounded-xl glass-panel-glow border border-[#10f596] text-[#10f596] font-mono text-xs flex items-center justify-center space-x-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" />
              <span>QUANTUM HANDSHAKE CONFIRMED // TELEMETRY LINKED</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="relative flex items-center">
              <input
                type="email"
                required
                placeholder="ENTER FREQUENCY / EMAIL..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 rounded-xl glass-panel border border-white/20 focus:border-[#00f0ff] text-white placeholder-gray-500 font-mono text-xs tracking-wider outline-none transition-all pr-32"
              />
              <button
                type="submit"
                disabled={status === 'linking'}
                onMouseEnter={() => soundManager.playHover()}
                className="absolute right-2 px-4 py-2.5 rounded-lg font-cyber font-bold text-xs bg-[#00f0ff] text-black hover:bg-[#10f596] transition-colors"
              >
                {status === 'linking' ? 'LINKING...' : 'CONNECT'}
              </button>
            </form>
          )}
          <div className="mt-3 flex items-center justify-center space-x-4 font-mono text-[10px] text-gray-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#10f596]" />
              AES-Q512 ENCRYPTED
            </span>
            <span>ZERO TELEMETRY LEAKAGE</span>
          </div>
        </div>
      </div>
    </section>
  );
};
