import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ExamPage from './components/ExamPage.jsx';
import Dashboard from './components/Dashboard.jsx';
import { ExamProvider } from './context/ExamContext.jsx';
import { ShieldCheck, User, ArrowRight, BrainCircuit, ScanLine } from 'lucide-react';

function App() {
  const [view, setView] = useState('HOME');

  if (view === 'EXAM') {
    return (
      <ExamProvider>
        <ExamPage />
      </ExamProvider>
    );
  }

  if (view === 'ADMIN') {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen bg-cyber-bg text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-cyber-cyan/30">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>
      
      {/* Animated Glowing Orbs */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyber-cyan rounded-full blur-[150px] pointer-events-none mix-blend-screen"
      ></motion.div>
      <motion.div 
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-[800px] h-[800px] bg-cyber-purple rounded-full blur-[180px] pointer-events-none mix-blend-screen"
      ></motion.div>
      
      <div className="z-10 text-center max-w-5xl w-full">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyber-bg/50 border border-cyber-cyan/30 backdrop-blur-xl mb-12 shadow-[0_0_20px_rgba(0,229,255,0.15)]"
        >
          <BrainCircuit className="text-cyber-cyan w-5 h-5 animate-pulse" />
          <span className="text-sm font-semibold tracking-[0.2em] text-cyber-cyan uppercase">VeriSight Mainframe Online</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-tight"
        >
          VeriSight <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-purple drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]">AI</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-slate-400 text-lg md:text-2xl mb-20 max-w-3xl mx-auto leading-relaxed font-light"
        >
          NASA-level surveillance engine for remote assessments. Immutable logging. Edge-AI behavioral analysis. 
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto relative">
          {/* Decorative Line between cards */}
          <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[80%] bg-gradient-to-b from-transparent via-cyber-border to-transparent"></div>

          <motion.button 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
            onClick={() => setView('EXAM')}
            className="group relative flex flex-col items-center p-10 bg-cyber-panel border border-cyber-border rounded-3xl hover:border-cyber-cyan transition-all duration-500 overflow-hidden backdrop-blur-md"
          >
            {/* Hover Glint */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyber-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="w-20 h-20 bg-cyber-cyan/10 rounded-2xl border border-cyber-cyan/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-300 relative overflow-hidden">
              <ScanLine size={36} className="text-cyber-cyan absolute opacity-20" />
              <User size={36} className="text-cyber-cyan relative z-10" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-white group-hover:text-cyber-cyan transition-colors tracking-wide">Student Node</h2>
            <p className="text-slate-400 leading-relaxed mb-8 text-center text-lg">
              Establish a secure, monitored link to the exam mainframe.
            </p>
            <div className="flex items-center gap-3 text-cyber-cyan font-bold tracking-widest uppercase group-hover:gap-5 transition-all mt-auto text-sm">
              Initialize Link <ArrowRight size={20} />
            </div>
          </motion.button>
          
          <motion.button 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8, type: "spring" }}
            onClick={() => setView('ADMIN')}
            className="group relative flex flex-col items-center p-10 bg-cyber-panel border border-cyber-purple/20 rounded-3xl hover:border-cyber-purple transition-all duration-500 overflow-hidden backdrop-blur-md"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyber-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="w-20 h-20 bg-cyber-purple/10 rounded-2xl border border-cyber-purple/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(124,77,255,0.3)] transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-cyber-purple/20 animate-pulse-fast"></div>
              <ShieldCheck size={36} className="text-cyber-purple relative z-10" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-white group-hover:text-cyber-purple transition-colors tracking-wide">Command Center</h2>
            <p className="text-slate-400 leading-relaxed mb-8 text-center text-lg">
              Access the global surveillance grid and forensic telemetry logs.
            </p>
            <div className="flex items-center gap-3 text-cyber-purple font-bold tracking-widest uppercase group-hover:gap-5 transition-all mt-auto text-sm">
              Access Console <ArrowRight size={20} />
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default App;