import React, { useState, useEffect } from 'react';
import { soundManager } from '../audio/soundManager';

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchOnHover?: boolean;
  decodeOnLoad?: boolean;
  subtext?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'span' | 'div';
}

const CYBER_GLYPHS = '01アイウエオカキクケコサシスセソタチツテトXYZ_#@%&<>!*+';

export const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  className = '',
  glitchOnHover = true,
  decodeOnLoad = true,
  subtext,
  tag = 'h1',
}) => {
  const [displayText, setDisplayText] = useState(decodeOnLoad ? '' : text);
  const [isGlitching, setIsGlitching] = useState(false);

  // Scramble / Decoder Effect
  const triggerDecode = () => {
    let iteration = 0;
    const maxIterations = text.length;
    soundManager.playGlitch();

    const interval = setInterval(() => {
      setDisplayText(() =>
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return text[index];
            }
            return CYBER_GLYPHS[Math.floor(Math.random() * CYBER_GLYPHS.length)];
          })
          .join('')
      );

      if (iteration >= maxIterations) {
        clearInterval(interval);
      }
      iteration += 1 / 3;
    }, 28);
  };

  useEffect(() => {
    if (decodeOnLoad) {
      triggerDecode();
    }
  }, [text, decodeOnLoad]);

  const handleMouseEnter = () => {
    if (glitchOnHover) {
      setIsGlitching(true);
      triggerDecode();
      setTimeout(() => setIsGlitching(false), 500);
    }
  };

  const Component = tag;

  return (
    <div className="relative inline-block select-none group cursor-pointer" onMouseEnter={handleMouseEnter}>
      {/* Glitch Shadow Layer 1: Electric Blue Offset */}
      <span
        aria-hidden="true"
        className={`absolute top-0 left-0 text-[#00f0ff] opacity-0 transition-opacity duration-150 pointer-events-none ${
          isGlitching ? 'opacity-80 -translate-x-1 -translate-y-0.5' : 'group-hover:opacity-70 group-hover:-translate-x-0.5'
        } ${className}`}
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)' }}
      >
        {displayText || text}
      </span>

      {/* Glitch Shadow Layer 2: Neon Purple Offset */}
      <span
        aria-hidden="true"
        className={`absolute top-0 left-0 text-[#b026ff] opacity-0 transition-opacity duration-150 pointer-events-none ${
          isGlitching ? 'opacity-90 translate-x-1 translate-y-0.5' : 'group-hover:opacity-70 group-hover:translate-x-0.5'
        } ${className}`}
        style={{ clipPath: 'polygon(0 40%, 100% 40%, 100% 100%, 0 100%)' }}
      >
        {displayText || text}
      </span>

      {/* Glitch Shadow Layer 3: Toxic Green Offset */}
      <span
        aria-hidden="true"
        className={`absolute top-0 left-0 text-[#10f596] opacity-0 transition-opacity duration-150 pointer-events-none ${
          isGlitching ? 'opacity-70 translate-x-0.5 -translate-y-1' : ''
        } ${className}`}
        style={{ clipPath: 'polygon(0 20%, 100% 20%, 100% 60%, 0 60%)' }}
      >
        {displayText || text}
      </span>

      {/* Main Sharp Text */}
      <Component className={`relative z-10 transition-colors duration-200 ${className}`}>
        {displayText || text}
      </Component>

      {subtext && (
        <span className="block font-mono text-xs uppercase tracking-widest text-[#00f0ff]/70 mt-1">
          {subtext}
        </span>
      )}
    </div>
  );
};
