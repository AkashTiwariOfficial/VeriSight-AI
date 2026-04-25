import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExam } from '../context/ExamContext.jsx';
import WebcamMonitor from './WebcamMonitor.jsx';
import AudioMonitor from './AudioMonitor.jsx';
import BehaviorTracker from './BehaviorTracker.jsx';
import { fullscreenGuard } from '../utils/sandbox/fullscreenGuard.js';
import { ShieldCheck, ShieldAlert, AlertCircle, Info, Clock, CheckCircle2, Lock, Fingerprint } from 'lucide-react';

const ExamPage = () => {
  const { state, dispatch, reportEvent } = useExam();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const startExam = () => {
    const fg = fullscreenGuard((event) => {
      reportEvent(event);
      setIsFullscreen(false);
    });
    fg.enterFullscreen();
    setIsFullscreen(true);

    dispatch({
      type: 'START_EXAM',
      payload: { sessionId: 'SESSION_' + Date.now(), examId: 'EXAM_101' }
    });
  };

  if (state.status === 'IDLE') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-cyber-bg text-slate-100 relative overflow-hidden font-sans selection:bg-cyber-cyan/30">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-cyan/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen"></div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="z-10 max-w-xl text-center bg-cyber-panel backdrop-blur-3xl p-12 rounded-3xl border border-cyber-border shadow-[0_0_50px_rgba(0,229,255,0.1)] relative"
        >
          {/* Cyber accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyber-cyan rounded-tl-3xl"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyber-cyan rounded-br-3xl"></div>

          <div className="w-24 h-24 mx-auto bg-cyber-cyan/10 rounded-2xl border border-cyber-cyan/30 flex items-center justify-center mb-8 relative">
            <div className="absolute inset-0 bg-cyber-cyan/20 animate-pulse-fast rounded-2xl"></div>
            <Lock className="w-12 h-12 text-cyber-cyan relative z-10" />
          </div>
          
          <h1 className="text-3xl font-black mb-4 tracking-widest uppercase text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">Secure Gateway</h1>
          <p className="text-slate-400 mb-10 leading-relaxed font-light">
            You are entering a Level 4 secure environment. All interactions, telemetry, and biometrics will be logged to the mainframe.
          </p>
          
          <div className="space-y-4 mb-10 text-left bg-black/40 p-6 rounded-2xl border border-cyber-border/50 font-mono text-sm">
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-cyber-success/20 flex items-center justify-center">
                <CheckCircle2 className="text-cyber-success w-4 h-4" />
              </div>
              <span className="text-slate-300 uppercase tracking-widest">Biometric Sensors Required</span>
            </motion.div>
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-cyber-success/20 flex items-center justify-center">
                <CheckCircle2 className="text-cyber-success w-4 h-4" />
              </div>
              <span className="text-slate-300 uppercase tracking-widest">Fullscreen Lock Enforced</span>
            </motion.div>
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-cyber-warning/20 flex items-center justify-center">
                <AlertCircle className="text-cyber-warning w-4 h-4" />
              </div>
              <span className="text-slate-300 uppercase tracking-widest">Tab Switching Prohibited</span>
            </motion.div>
          </div>

          <button 
            onClick={startExam}
            className="group relative w-full py-5 bg-cyber-cyan/10 hover:bg-cyber-cyan/20 border border-cyber-cyan text-cyber-cyan rounded-xl font-bold tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(0,229,255,0.2)] hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] overflow-hidden"
          >
            <div className="absolute inset-0 w-1/4 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:animate-[scan_1s_ease-in-out]"></div>
            <div className="flex items-center justify-center gap-3">
              <Fingerprint size={20} /> Initialize Exam Link
            </div>
          </button>
        </motion.div>
      </div>
    );
  }

  if (state.status === 'FORCE_SUBMITTED') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-cyber-bg text-slate-100 relative overflow-hidden font-sans">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose-900/20 blur-[150px] rounded-full pointer-events-none mix-blend-screen"></div>
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="z-10 text-center bg-cyber-panel backdrop-blur-3xl p-16 rounded-3xl border-2 border-rose-500/50 shadow-[0_0_50px_rgba(255,59,59,0.2)] relative"
        >
          <div className="absolute inset-0 bg-rose-500/5 rounded-3xl animate-pulse"></div>
          
          <ShieldAlert className="w-28 h-28 text-rose-500 mx-auto mb-8 drop-shadow-[0_0_15px_rgba(255,59,59,0.8)]" />
          <h1 className="text-5xl font-black mb-4 text-white uppercase tracking-widest drop-shadow-md">Link Terminated</h1>
          <p className="text-rose-200/70 max-w-lg mx-auto text-lg leading-relaxed font-mono">
            CRITICAL VIOLATION THRESHOLD REACHED. 
            YOUR SESSION HAS BEEN SEVERED AND FORENSIC LOGS TRANSMITTED TO SYSTEM ADMIN.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-bg text-slate-100 flex flex-col relative font-sans selection:bg-cyber-cyan/30">
      <BehaviorTracker />
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-cyber-panel border-b border-cyber-border/50 px-8 py-5 flex justify-between items-center shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-xl bg-cyber-cyan/10 flex items-center justify-center border border-cyber-cyan/30 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
            <ShieldCheck className="text-cyber-cyan w-6 h-6" />
            <div className="absolute top-0 right-0 w-2 h-2 bg-cyber-cyan rounded-full animate-ping"></div>
          </div>
          <div>
            <h2 className="font-bold text-xl leading-tight text-white tracking-widest uppercase">Node_Active</h2>
            <p className="text-xs text-cyber-cyan flex items-center gap-1 font-mono mt-1 tracking-widest">
              <Clock size={12}/> T-MINUS: 01:45:00
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-10">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mb-1">Live Trust Index</span>
            <div className="flex items-center gap-4">
              <div className="w-48 h-2 bg-black rounded-full overflow-hidden border border-slate-800">
                <motion.div 
                  layout
                  className={`h-full ${state.trustScore > 80 ? 'bg-cyber-success shadow-[0_0_10px_rgba(0,200,83,1)]' : state.trustScore > 50 ? 'bg-cyber-warning shadow-[0_0_10px_rgba(255,176,32,1)]' : 'bg-rose-500 shadow-[0_0_10px_rgba(255,59,59,1)]'}`} 
                  style={{ width: `${state.trustScore}%` }}
                ></motion.div>
              </div>
              <span className={`font-mono text-2xl font-bold w-12 text-right drop-shadow-md ${
                state.trustScore > 80 ? 'text-cyber-success' : state.trustScore > 50 ? 'text-cyber-warning' : 'text-rose-400'
              }`}>
                {Math.round(state.trustScore)}
              </span>
            </div>
          </div>
          
          <button className="px-8 py-3 bg-rose-600/10 hover:bg-rose-600/20 border border-rose-500/50 text-rose-500 hover:text-rose-400 rounded-xl text-sm font-bold tracking-widest uppercase transition-all shadow-[0_0_15px_rgba(255,59,59,0.1)] hover:shadow-[0_0_25px_rgba(255,59,59,0.3)]">
            Sever Link
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-10 relative">
          {/* Subtle background grid */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02]"></div>

          <div className="max-w-5xl mx-auto space-y-10 relative z-10">
            {/* Question Card */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-cyber-panel border border-cyber-border/40 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-xl"
            >
              <div className="bg-black/50 border-b border-cyber-border/30 px-10 py-6 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyber-cyan rounded-full shadow-[0_0_8px_rgba(0,229,255,1)]"></div>
                  <span className="text-xs font-bold text-cyber-cyan uppercase tracking-[0.2em]">Module 01</span>
                </div>
                <span className="text-xs text-slate-500 font-mono tracking-widest">10 POINTS</span>
              </div>
              <div className="p-10">
                <h3 className="text-3xl font-bold text-white mb-8 tracking-wide drop-shadow-md">Explainable AI Architecture</h3>
                <p className="text-slate-300 text-lg leading-relaxed mb-10 font-light">
                  Describe the significance of Explainable AI (XAI) in modern surveillance and proctoring systems. How does it improve trust and mitigate biases compared to black-box models?
                </p>
                <div className="relative group">
                  {/* Glowing border effect on focus within */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyber-cyan to-cyber-purple rounded-2xl opacity-0 group-focus-within:opacity-30 blur transition duration-500"></div>
                  
                  <textarea 
                    className="relative w-full h-[400px] bg-black/60 border border-slate-700/50 rounded-2xl p-8 text-slate-200 text-lg leading-relaxed focus:outline-none focus:border-cyber-cyan/50 transition-all resize-none shadow-inner font-mono backdrop-blur-sm"
                    placeholder="> AWAITING_INPUT_"
                  />
                  <div className="absolute bottom-6 right-6 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-500 animate-pulse"></div>
                    <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">Auto-sync active</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>

        {/* Sidebar Monitoring Panel */}
        <aside className="w-[400px] bg-[#080B14] border-l border-cyber-border/40 flex flex-col shadow-[-20px_0_40px_rgba(0,0,0,0.5)] z-20">
          <div className="p-6 border-b border-cyber-border/30 bg-cyber-panel flex items-center justify-between">
            <h4 className="text-[10px] font-bold text-cyber-cyan uppercase tracking-[0.2em] flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse shadow-[0_0_8px_rgba(0,229,255,1)]"></div> 
              Telemetry Stream
            </h4>
            <span className="text-[10px] font-mono text-slate-500">SYS_V2.4</span>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
            <div className="bg-black/40 rounded-2xl border border-cyber-border/20 p-4 shadow-inner relative group">
              <div className="absolute top-2 right-2 flex gap-1 z-10">
                <div className="w-1 h-4 bg-cyber-cyan/50 group-hover:bg-cyber-cyan transition-colors"></div>
                <div className="w-1 h-4 bg-cyber-cyan/50 group-hover:bg-cyber-cyan transition-colors"></div>
              </div>
              <WebcamMonitor />
            </div>

            <div className="bg-black/40 rounded-2xl border border-cyber-border/20 p-2 shadow-inner">
              <AudioMonitor />
            </div>

            <div className="pt-4">
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <Info size={14}/> Forensic Log
              </h4>
              <div className="space-y-3">
                <AnimatePresence initial={false}>
                  {state.events.length === 0 ? (
                    <motion.div 
                      key="empty"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="text-center p-8 border border-dashed border-slate-800 rounded-2xl bg-black/20"
                    >
                      <p className="text-slate-500 text-[10px] uppercase tracking-widest font-mono">No anomalies detected</p>
                    </motion.div>
                  ) : (
                    [...state.events].reverse().slice(0, 5).map((ev, i) => (
                      <motion.div 
                        key={`${ev.timestamp}-${i}`}
                        initial={{ opacity: 0, x: 20, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        className="flex gap-4 text-sm bg-rose-500/10 p-4 rounded-xl border border-rose-500/30 shadow-[0_0_15px_rgba(255,59,59,0.05)] backdrop-blur-md relative overflow-hidden"
                      >
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-500"></div>
                        <AlertCircle className="text-rose-400 shrink-0 mt-0.5 w-5 h-5" />
                        <div className="flex-1">
                          <p className="text-rose-200 font-bold text-xs uppercase tracking-wider mb-1">{ev.type.replace('_', ' ')}</p>
                          <p className="text-rose-400/80 font-mono text-[10px] leading-relaxed mb-2">{ev.description}</p>
                          <p className="text-[9px] text-slate-500 font-mono tracking-widest">{new Date(ev.timestamp).toLocaleTimeString()} - SYS_LOG</p>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ExamPage;