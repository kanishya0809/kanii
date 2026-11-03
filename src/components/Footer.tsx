import React, { useState, useEffect } from 'react';
import { 
  ArrowUp, 
  Terminal as TerminalIcon, 
  Activity, 
  Shield, 
  Github, 
  Twitter, 
  Disc as Discord, 
  Radio,
  Send
} from 'lucide-react';
import { soundManager } from '../audio/soundManager';

export const Footer: React.FC = () => {
  const [timeStr, setTimeStr] = useState('');
  const [cmdInput, setCmdInput] = useState('');
  const [cmdLogs, setCmdLogs] = useState<string[]>([
    'CYBER//VOID TERMINAL V4.8 [ONLINE]',
    'TYPE "help" FOR PROTOCOL COMMANDS.',
  ]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC'
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cmdInput.trim()) return;

    soundManager.playClick();
    const cmd = cmdInput.trim().toLowerCase();
    const newLogs = [...cmdLogs, `> ${cmdInput}`];

    if (cmd === 'help') {
      newLogs.push('AVAILABLE PROTOCOLS:');
      newLogs.push('  help     - List terminal protocols');
      newLogs.push('  warp     - Trigger hyperspace jump');
      newLogs.push('  matrix   - Scan current synaptic load');
      newLogs.push('  audio    - Toggle ambient synthesizer');
      newLogs.push('  clear    - Clear console memory');
      newLogs.push('  about    - Cybernetic origins 2030');
    } else if (cmd === 'warp') {
      soundManager.playWarp();
      newLogs.push('WARP VECTOR ENGAGED. TRANSCENDING VIEWPORT...');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (cmd === 'matrix') {
      soundManager.playGlitch();
      newLogs.push('SYNAPSE METRICS: COHERENCE 99.98% // BUFFER 0.02ms');
    } else if (cmd === 'audio') {
      const isMuted = soundManager.toggleMute();
      newLogs.push(`AUDIO ENGINE: ${isMuted ? 'OFFLINE (MUTED)' : 'ONLINE (DRONE ACTIVE)'}`);
    } else if (cmd === 'clear') {
      setCmdLogs(['CYBER//VOID CONSOLE CLEARED.']);
      setCmdInput('');
      return;
    } else if (cmd === 'about') {
      newLogs.push('CYBER//VOID 2030: Award-winning digital experience forged with React, Vite, Three.js, and Web Audio API.');
    } else {
      soundManager.playGlitch();
      newLogs.push(`ERR 404: PROTOCOL "${cmd}" NOT RECOGNIZED. TYPE "help"`);
    }

    setCmdLogs(newLogs.slice(-8)); // keep last 8 entries
    setCmdInput('');
  };

  const scrollToTop = () => {
    soundManager.playWarp();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#020205] border-t border-white/10 pt-16 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Grid: Brand + Interactive Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Brand & Manifesto */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00f0ff] to-[#b026ff] flex items-center justify-center font-cyber font-black text-xs text-black">
                CV
              </div>
              <span className="font-cyber font-black text-xl text-white tracking-wider">
                CYBER<span className="text-[#00f0ff]">//</span>VOID
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded font-mono bg-[#10f596]/15 text-[#10f596] border border-[#10f596]/30">
                2030 EDITION
              </span>
            </div>

            <p className="max-w-md text-gray-400 font-sans text-sm leading-relaxed">
              Engineered with extreme aesthetic rigor. Designed like an award-winning creative laboratory 
              at the intersection of Apple precision and high-voltage cyberpunk reality.
            </p>

            <div className="flex items-center space-x-4 pt-2">
              {[
                { name: 'Github', icon: <Github className="w-4 h-4" />, href: '#' },
                { name: 'Twitter', icon: <Twitter className="w-4 h-4" />, href: '#' },
                { name: 'Discord', icon: <Discord className="w-4 h-4" />, href: '#' },
                { name: 'Matrix', icon: <Radio className="w-4 h-4" />, href: '#' },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  onMouseEnter={() => soundManager.playHover()}
                  onClick={() => soundManager.playClick()}
                  className="w-10 h-10 rounded-xl glass-panel border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#00f0ff] hover:border-[#00f0ff]/50 transition-all hover:scale-110"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Interactive Mini Cyber Terminal */}
          <div className="lg:col-span-6 rounded-2xl glass-panel p-5 border border-white/10 font-mono text-xs shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-gray-400 mb-3">
              <div className="flex items-center space-x-2">
                <TerminalIcon className="w-4 h-4 text-[#10f596]" />
                <span className="text-white font-bold">TERMINAL ACCESS</span>
              </div>
              <span className="text-[10px] text-gray-500">BASH//CYBER_OS</span>
            </div>

            {/* Terminal Output Log */}
            <div className="space-y-1 h-32 overflow-y-auto text-gray-300 pr-1">
              {cmdLogs.map((log, i) => (
                <div
                  key={i}
                  className={
                    log.startsWith('>')
                      ? 'text-[#00f0ff] font-bold'
                      : log.startsWith('ERR')
                      ? 'text-[#ff007f]'
                      : 'text-gray-400'
                  }
                >
                  {log}
                </div>
              ))}
            </div>

            {/* Terminal Input */}
            <form onSubmit={handleCommand} className="mt-3 flex items-center space-x-2 border-t border-white/10 pt-3">
              <span className="text-[#10f596] font-bold">{'>'}</span>
              <input
                type="text"
                placeholder="type 'help', 'warp', 'matrix'..."
                value={cmdInput}
                onChange={(e) => setCmdInput(e.target.value)}
                className="w-full bg-transparent text-white placeholder-gray-600 outline-none font-mono text-xs"
              />
              <button
                type="submit"
                onMouseEnter={() => soundManager.playHover()}
                className="p-1.5 text-gray-400 hover:text-[#00f0ff]"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar: Telemetry Status + Back to Top */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-gray-500">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5 text-gray-400">
              <span className="w-2 h-2 rounded-full bg-[#10f596] animate-pulse" />
              SYSTEM NODE: TOKYO-01
            </span>
            <span>|</span>
            <span>CLOCK: {timeStr || '2030-11-03 07:16:00 UTC'}</span>
            <span>|</span>
            <span className="text-gray-400">LATENCY: 12ms</span>
          </div>

          <button
            onClick={scrollToTop}
            onMouseEnter={() => soundManager.playHover()}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg glass-panel border border-white/10 text-gray-300 hover:text-white hover:border-[#00f0ff] transition-all group"
          >
            <span>RETURN TO STRATOSPHERE</span>
            <ArrowUp className="w-4 h-4 text-[#00f0ff] group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
