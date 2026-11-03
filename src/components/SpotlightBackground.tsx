import React, { useEffect, useRef, useState } from 'react';

export const SpotlightBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 }); // percentage
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Floating Cyber Dust Particle Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;
      pulse: number;
    }> = [];

    const colors = ['#00f0ff', '#b026ff', '#10f596', '#ffffff'];

    for (let i = 0; i < 75; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4 - 0.1, // gently float upward
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.6 + 0.1,
        pulse: Math.random() * Math.PI,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulse += 0.02;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentAlpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-35" />

      {/* Floating Particles Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Dynamic Mouse Spotlight: Dual Neon Purple & Electric Blue */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background: `
            radial-gradient(circle 650px at ${mousePos.x}% ${mousePos.y}%, rgba(176, 38, 255, 0.12) 0%, rgba(0, 240, 255, 0.08) 35%, transparent 75%),
            radial-gradient(circle 900px at ${100 - mousePos.x}% ${100 - mousePos.y}%, rgba(0, 240, 255, 0.05) 0%, transparent 60%)
          `,
        }}
      />

      {/* Static Ambient Atmospheric Vignette */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#b026ff]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-[#00f0ff]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-2/3 left-10 w-[450px] h-[450px] bg-[#10f596]/05 rounded-full blur-[130px] pointer-events-none" />

      {/* Scanline CRT overlay */}
      <div className="absolute inset-0 scanlines opacity-40 mix-blend-overlay" />
    </div>
  );
};
