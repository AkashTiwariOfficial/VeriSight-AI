import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExam } from '../context/ExamContext.jsx';
import { useAudioNoise } from '../hooks/useAudioNoise.js';
import { Mic, MicOff, Volume2 } from 'lucide-react';

const AudioMonitor = () => {
  const { reportEvent } = useExam();
  const { isNoisy } = useAudioNoise(reportEvent);

  return (
    <div className={`relative flex items-center justify-between p-5 rounded-2xl border transition-all duration-500 overflow-hidden ${
      isNoisy ? 'bg-rose-950/20 border-rose-500/40 shadow-[0_0_20px_rgba(255,59,59,0.15)]' : 'bg-cyber-panel border-cyber-border/40 hover:border-cyber-cyan/30 shadow-[0_0_20px_rgba(0,0,0,0.3)]'
    }`}>
      
      {/* Background Pulse if noisy */}
      <AnimatePresence>
        {isNoisy && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-r from-rose-500/10 to-transparent animate-pulse-fast pointer-events-none"
          ></motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-5 relative z-10">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-500 relative ${
          isNoisy ? 'bg-rose-500/20 border border-rose-500/50 shadow-[0_0_15px_rgba(255,59,59,0.3)]' : 'bg-black/60 border border-cyber-cyan/30 shadow-[0_0_10px_rgba(0,229,255,0.1)]'
        }`}>
          {isNoisy ? (
            <MicOff size={22} className="text-rose-500 animate-pulse" />
          ) : (
            <Mic size={22} className="text-cyber-cyan" />
          )}
          {/* Cyber bracket top right */}
          <div className={`absolute -top-1 -right-1 w-2 h-2 border-t border-r ${isNoisy ? 'border-rose-500' : 'border-cyber-cyan'}`}></div>
          {/* Cyber bracket bottom left */}
          <div className={`absolute -bottom-1 -left-1 w-2 h-2 border-b border-l ${isNoisy ? 'border-rose-500' : 'border-cyber-cyan'}`}></div>
        </div>
        
        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1">Audio Sensor</h3>
          <p className={`text-xs font-mono tracking-wide ${isNoisy ? 'text-rose-400' : 'text-slate-300'}`}>
            {isNoisy ? 'THRESHOLD_EXCEEDED' : 'NOMINAL_LEVELS'}
          </p>
        </div>
      </div>
      
      <div className="relative z-10 flex items-center h-8">
        {isNoisy ? (
          <motion.span 
            initial={{ scale: 0.8 }} animate={{ scale: 1 }}
            className="px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] bg-rose-500/20 text-rose-400 rounded-md border border-rose-500/50 shadow-[0_0_10px_rgba(255,59,59,0.3)]"
          >
            Alert
          </motion.span>
        ) : (
          <div className="flex items-center gap-1.5 opacity-70">
             {/* Cyber Audio Waveform */}
             <motion.div animate={{ height: ["20%", "80%", "40%", "90%", "20%"] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1 bg-cyber-cyan shadow-[0_0_5px_rgba(0,229,255,0.8)]"></motion.div>
             <motion.div animate={{ height: ["40%", "100%", "20%", "70%", "40%"] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.1 }} className="w-1 bg-cyber-cyan shadow-[0_0_5px_rgba(0,229,255,0.8)]"></motion.div>
             <motion.div animate={{ height: ["70%", "30%", "90%", "50%", "70%"] }} transition={{ duration: 1.7, repeat: Infinity, delay: 0.2 }} className="w-1 bg-cyber-cyan shadow-[0_0_5px_rgba(0,229,255,0.8)]"></motion.div>
             <motion.div animate={{ height: ["30%", "60%", "10%", "80%", "30%"] }} transition={{ duration: 1.3, repeat: Infinity, delay: 0.3 }} className="w-1 bg-cyber-cyan shadow-[0_0_5px_rgba(0,229,255,0.8)]"></motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioMonitor;