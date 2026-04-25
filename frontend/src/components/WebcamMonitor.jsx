import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExam } from '../context/ExamContext.jsx';
import { useFaceDetection } from '../hooks/useFaceDetection.js';
import { Camera, AlertCircle, CheckCircle2, Loader2, AlertTriangle, Crosshair } from 'lucide-react';

const WebcamMonitor = () => {
  const videoRef = useRef(null);
  const { reportEvent } = useExam();
  const { faceStatus, warningMessage } = useFaceDetection(videoRef, reportEvent);

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing webcam:", err);
      }
    };
    startVideo();
  }, []);

  const hasViolation = faceStatus !== 'OK' && faceStatus !== 'LOADING';

  return (
    <div className="relative rounded-2xl overflow-hidden border border-cyber-border/50 bg-black aspect-video group shadow-[0_0_20px_rgba(0,0,0,0.5)]">
      <video
        ref={videoRef}
        autoPlay
        muted
        className={`w-full h-full object-cover transition-all duration-700 ${hasViolation ? 'sepia-[.8] hue-rotate-[-30deg] saturate-[2] blur-[4px] brightness-50' : 'contrast-125 saturate-50'}`}
      />
      
      {/* Cyberpunk grid overlay on video */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
      
      {/* Scanning overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-cyan/10 to-transparent h-full w-full -translate-y-full animate-scan pointer-events-none opacity-50"></div>
      
      {/* Center crosshair */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
        <Crosshair size={150} className="text-cyber-cyan" strokeWidth={0.5} />
      </div>

      {/* Top badges */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none z-10">
        <div className="flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold bg-black/60 backdrop-blur-md text-slate-200 rounded-md border border-cyber-cyan/30 shadow-[0_0_10px_rgba(0,229,255,0.2)] tracking-widest uppercase">
          <Camera size={12} className="text-cyber-cyan animate-pulse" />
          REC_01
        </div>
        
        <div className={`flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase backdrop-blur-md rounded-md border shadow-sm transition-all duration-300 ${
          faceStatus === 'OK' ? 'bg-cyber-success/10 text-cyber-success border-cyber-success/30 shadow-[0_0_10px_rgba(0,200,83,0.2)]' : 
          faceStatus === 'LOADING' ? 'bg-cyber-warning/10 text-cyber-warning border-cyber-warning/30 shadow-[0_0_10px_rgba(255,176,32,0.2)]' : 
          'bg-rose-600/20 text-rose-400 border-rose-500/50 animate-pulse shadow-[0_0_15px_rgba(255,59,59,0.5)]'
        }`}>
          {faceStatus === 'OK' ? <CheckCircle2 size={12} /> : 
           faceStatus === 'LOADING' ? <Loader2 size={12} className="animate-spin" /> : 
           <AlertCircle size={12} />}
          {faceStatus.replace('_', ' ')}
        </div>
      </div>

      {/* Warning Overlay with Framer Motion */}
      <AnimatePresence>
        {hasViolation && warningMessage && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 flex items-center justify-center p-6 bg-rose-950/60 z-20 backdrop-blur-sm"
          >
            <div className="bg-black/80 backdrop-blur-2xl border border-rose-500/50 rounded-2xl p-6 text-center shadow-[0_0_40px_rgba(255,59,59,0.4)] relative overflow-hidden">
              <div className="absolute inset-0 bg-rose-500/10 animate-pulse pointer-events-none"></div>
              
              <AlertTriangle className="w-10 h-10 text-rose-500 mx-auto mb-3 drop-shadow-[0_0_10px_rgba(255,59,59,0.8)]" />
              <h4 className="text-rose-100 font-bold text-xs tracking-[0.2em] uppercase mb-2">Threat Detected</h4>
              <p className="text-rose-400 text-xs font-mono leading-relaxed max-w-[220px] mx-auto">
                {warningMessage}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Corner Brackets */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyber-cyan/50 pointer-events-none z-30"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyber-cyan/50 pointer-events-none z-30"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyber-cyan/50 pointer-events-none z-30"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyber-cyan/50 pointer-events-none z-30"></div>

      {/* Frame border when error */}
      {hasViolation && (
        <div className="absolute inset-0 border-[3px] border-rose-500/80 pointer-events-none animate-pulse z-30 shadow-[inset_0_0_30px_rgba(255,59,59,0.5)]"></div>
      )}
    </div>
  );
};

export default WebcamMonitor;