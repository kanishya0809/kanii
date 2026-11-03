import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const requestRef = useRef<number | null>(null);
  const mousePosRef = useRef({ x: -100, y: -100 });
  const trailPosRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Check if touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = target.closest('button, a, input, select, textarea, [role="button"], [data-magnetic="true"], .clickable');
      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousemove', checkHover);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth lerp loop for the trailing ring
    const animate = () => {
      const dx = mousePosRef.current.x - trailPosRef.current.x;
      const dy = mousePosRef.current.y - trailPosRef.current.y;
      trailPosRef.current.x += dx * 0.18;
      trailPosRef.current.y += dy * 0.18;
      setTrailingPos({ ...trailPosRef.current });
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', checkHover);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Central Sharp Dot */}
      <div
        className="fixed -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-75"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: isMouseDown ? '12px' : '6px',
          height: isMouseDown ? '12px' : '6px',
          backgroundColor: isHovered ? '#10f596' : '#00f0ff',
          boxShadow: isHovered
            ? '0 0 12px #10f596, 0 0 24px #10f596'
            : '0 0 10px #00f0ff, 0 0 20px #00f0ff',
        }}
      />

      {/* Trailing Futuristic Reticle Ring */}
      <div
        className="fixed -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ease-out"
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          width: isHovered ? '54px' : isMouseDown ? '26px' : '36px',
          height: isHovered ? '54px' : isMouseDown ? '26px' : '36px',
        }}
      >
        <div
          className={`h-full w-full rounded-full border ${
            isHovered
              ? 'border-[#10f596] shadow-[0_0_20px_rgba(16,245,150,0.6)] animate-spin-slow'
              : 'border-[#b026ff]/60 shadow-[0_0_15px_rgba(176,38,255,0.4)]'
          } relative flex items-center justify-center`}
        >
          {/* Cyber crosshair ticks */}
          <span className="absolute -top-1 w-1 h-0.5 bg-[#00f0ff]" />
          <span className="absolute -bottom-1 w-1 h-0.5 bg-[#00f0ff]" />
          <span className="absolute -left-1 w-0.5 h-1 bg-[#00f0ff]" />
          <span className="absolute -right-1 w-0.5 h-1 bg-[#00f0ff]" />

          {isHovered && (
            <span className="font-mono text-[8px] text-[#10f596] tracking-tighter opacity-70">
              LOCK
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
