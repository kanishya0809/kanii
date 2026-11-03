import React, { useState, useEffect } from 'react';
import { Volume2, Zap, Shield, Sparkles } from 'lucide-react';
import { soundManager } from '../audio/soundManager';

interface BootLoaderProps {
  onComplete: () => void;
}

export const BootLoader: React.FC<BootLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [bootLog, setBootLog] = useState('INITIALIZING QUANTUM BIOS...');
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const logs = [
      'ALLOCATING QUANTUM MEMORY PAGES...',
      'CALIBRATING 3D PHOTONIC CORE (THREE.JS)...',
      'ESTABLISHING SYNAPTIC HANDSHAKE WITH TOKYO-01...',
      'LOADING AESTHETICS ENGINE V4.8...',
      '100% READY. MATRIX ONLINE.',
    ];

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 12) + 6;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setBootLog('100% READY. MATRIX ONLINE.');
        setProgress(100);

        setTimeout(() => {
          setIsFading(true);
          setTimeout(onComplete, 600);
        }, 400);
      } else {
        setProgress(currentProgress);
        const logIndex = Math.min(
          logs.length - 1,
          Math.floor((currentProgress / 100) * logs.length)
        );
        setBootLog(logs[logIndex]);
      }
    }, 90);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleQuickEnter = (withAudio: boolean) => {
    if (withAudio) {
      soundManager.unmute();
      soundManager.playWarp();
    } else {
      soundManager.playClick();
    }
    setIsFading(true);
    setTimeout(onComplete, 400);
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#030308] flex flex-col items-center justify-center p-6 transition-all duration-700 ${
        isFading ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-30" />

      {/* Center Booting HUD Container */}
      <div className="relative z-10 w-full max-w-md p-8 rounded-3xl glass-panel-glow border border-[#00f0ff]/40 shadow-[0_0_80px_rgba(0,240,255,0.25)] flex flex-col items-center text-center space-y-6">
        {/* Animated Gyro Ring */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-t-[#00f0ff] border-r-transparent border-b-[#b026ff] border-l-transparent animate-spin" />
          <div className="absolute inset-2 rounded-full border border-[#10f596]/40 border-dashed animate-spin-slow" />
          <Zap className="w-8 h-8 text-[#00f0ff] animate-pulse" />
        </div>

        {/* Brand */}
        <div>
          <h2 className="font-cyber font-black text-2xl text-white tracking-wider">
            CYBER<span className="text-[#00f0ff]">//</span>VOID
          </h2>
          <div className="font-mono text-[10px] text-gray-400 tracking-widest uppercase mt-1">
            2030 NEURAL OS // BOOT SEQUENCE
          </div>
        </div>

        {/* Progress Bar & Counter */}
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between font-mono text-xs text-gray-400">
            <span className="text-[#00f0ff]">{bootLog}</span>
            <span className="font-bold text-white">{progress}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden p-[1px]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#00f0ff] via-[#b026ff] to-[#10f596] transition-all duration-150 shadow-[0_0_10px_#00f0ff]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Action Prompt */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3 w-full">
          <button
            onClick={() => handleQuickEnter(true)}
            className="flex-1 py-3 px-4 rounded-xl font-cyber font-bold text-xs tracking-wider text-black bg-gradient-to-r from-[#00f0ff] to-[#10f596] hover:opacity-90 transition-all flex items-center justify-center space-x-2 shadow-lg"
          >
            <Volume2 className="w-4 h-4" />
            <span>ENTER WITH AUDIO</span>
          </button>
          <button
            onClick={() => handleQuickEnter(false)}
            className="py-3 px-4 rounded-xl font-mono text-xs text-gray-400 hover:text-white glass-panel border border-white/10 hover:border-white/30 transition-all"
          >
            SILENT
          </button>
        </div>
      </div>
    </div>
  );
};
