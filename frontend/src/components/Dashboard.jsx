import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Users, Activity, Eye, AlertTriangle, Search, Filter, ShieldCheck, ChevronRight, Cpu } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const mockStudents = [
  { id: '1', name: 'John Doe', trustScore: 95, riskLevel: 'TRUSTED', status: 'ACTIVE' },
  { id: '2', name: 'Jane Smith', trustScore: 45, riskLevel: 'HIGH_RISK', status: 'ACTIVE', lastEvent: 'Multiple faces detected' },
  { id: '3', name: 'Alex Johnson', trustScore: 72, riskLevel: 'WARNING', status: 'ACTIVE', lastEvent: 'Background noise detected' },
  { id: '4', name: 'Emily Davis', trustScore: 0, riskLevel: 'HIGH_RISK', status: 'FORCE_SUBMITTED' },
  { id: '5', name: 'Michael Chen', trustScore: 88, riskLevel: 'TRUSTED', status: 'ACTIVE' },
  { id: '6', name: 'Sarah Wilson', trustScore: 61, riskLevel: 'WARNING', status: 'ACTIVE', lastEvent: 'Gaze deviation detected' },
];

const mockTimelineData = Array.from({ length: 20 }, (_, i) => ({
  time: `10:${i < 10 ? '0'+i : i}`,
  avgTrust: 100 - Math.floor(Math.random() * 20),
  riskEvents: Math.floor(Math.random() * 3)
}));

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('GRID'); // GRID, METRICS

  return (
    <div className="min-h-screen bg-cyber-bg text-slate-200 flex font-sans overflow-hidden selection:bg-cyber-cyan/30">
      
      {/* Background Cyber Glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-cyber-purple/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen"></div>

      {/* Sidebar */}
      <aside className="w-80 bg-cyber-panel border-r border-cyber-border flex flex-col z-20 shadow-[10px_0_30px_rgba(0,0,0,0.5)] backdrop-blur-3xl">
        <div className="p-8 border-b border-cyber-border/50 flex items-center gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-cyber-cyan/20 blur-[30px]"></div>
          
          <div className="relative w-12 h-12 rounded-xl border border-cyber-cyan/40 bg-cyber-cyan/10 flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.3)]">
            <Cpu className="text-cyber-cyan w-6 h-6 animate-pulse-fast" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-widest uppercase shadow-cyber-cyan drop-shadow-md">SYS_ADMIN</h1>
            <p className="text-xs text-cyber-cyan font-mono tracking-widest">GLOBAL AI GRID</p>
          </div>
        </div>
        
        <nav className="flex-1 p-6 space-y-2">
          <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 mt-2">Core Modules</p>
          
          <button onClick={() => setActiveTab('GRID')} className={`w-full flex items-center justify-between px-5 py-4 rounded-xl transition-all duration-300 ${activeTab === 'GRID' ? 'bg-gradient-to-r from-cyber-cyan/20 to-transparent border-l-2 border-cyber-cyan text-cyber-cyan' : 'hover:bg-slate-800/50 text-slate-400 hover:text-slate-200 border-l-2 border-transparent'}`}>
            <div className="flex items-center gap-4"><Users size={20} className={activeTab === 'GRID' ? 'drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]' : ''} /> <span className="font-medium tracking-wide">Live Nodes</span></div>
            {activeTab === 'GRID' && <ChevronRight size={18} />}
          </button>
          
          <button onClick={() => setActiveTab('METRICS')} className={`w-full flex items-center justify-between px-5 py-4 rounded-xl transition-all duration-300 ${activeTab === 'METRICS' ? 'bg-gradient-to-r from-cyber-purple/20 to-transparent border-l-2 border-cyber-purple text-cyber-purple' : 'hover:bg-slate-800/50 text-slate-400 hover:text-slate-200 border-l-2 border-transparent'}`}>
            <div className="flex items-center gap-4"><Activity size={20} className={activeTab === 'METRICS' ? 'drop-shadow-[0_0_8px_rgba(124,77,255,0.8)]' : ''} /> <span className="font-medium tracking-wide">Telemetry</span></div>
            {activeTab === 'METRICS' && <ChevronRight size={18} />}
          </button>
          
          <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 mt-10">Security Forensics</p>
          
          <button className="w-full flex items-center justify-between px-5 py-4 rounded-xl transition-all hover:bg-rose-500/10 hover:border-l-2 hover:border-rose-500 text-slate-400 hover:text-rose-400 border-l-2 border-transparent">
            <div className="flex items-center gap-4"><ShieldAlert size={20} /> <span className="font-medium tracking-wide">Threat Logs</span></div>
          </button>
        </nav>
        
        <div className="p-6 border-t border-cyber-border/30 bg-black/40">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-cyber-success"></div>
              <div className="absolute inset-0 w-3 h-3 rounded-full bg-cyber-success animate-ping"></div>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] mb-0.5">Mainframe Status</p>
              <p className="text-sm font-bold text-cyber-success tracking-wider drop-shadow-[0_0_5px_rgba(0,200,83,0.8)]">OPERATIONAL</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative z-10 scrollbar-hide">
        
        <div className="p-12 relative z-10 max-w-[1600px] mx-auto">
          <motion.header 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6"
          >
            <div>
              <h2 className="text-4xl font-bold tracking-wider text-white uppercase drop-shadow-md">Global Surveillance Grid</h2>
              <p className="text-cyber-cyan mt-3 text-sm flex items-center gap-2 tracking-widest font-mono">
                <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse"></span> MONITORING 6 ACTIVE SECTORS
              </p>
            </div>
            
            <div className="flex gap-6">
              <div className="bg-cyber-panel border border-cyber-border px-8 py-5 rounded-2xl shadow-[0_0_30px_rgba(0,229,255,0.05)] backdrop-blur-md flex items-center gap-5">
                <div className="w-14 h-14 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center">
                  <Activity className="text-cyber-cyan w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-1">Grid Trust Index</p>
                  <p className="text-3xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">82.5<span className="text-cyber-cyan text-xl">%</span></p>
                </div>
              </div>
              
              <div className="bg-rose-950/40 border border-rose-500/30 px-8 py-5 rounded-2xl shadow-[0_0_30px_rgba(255,59,59,0.1)] backdrop-blur-md flex items-center gap-5">
                <div className="w-14 h-14 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center shadow-[0_0_15px_rgba(255,59,59,0.5)]">
                  <ShieldAlert className="text-rose-400 w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <p className="text-[10px] text-rose-400 font-bold uppercase tracking-[0.2em] mb-1">Active Threats</p>
                  <p className="text-3xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,59,59,0.8)]">2</p>
                </div>
              </div>
            </div>
          </motion.header>

          <AnimatePresence mode="wait">
            {activeTab === 'GRID' && (
              <motion.div 
                key="grid"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
              >
                {/* Toolbar */}
                <div className="flex justify-between items-center mb-8">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-cyber-cyan w-5 h-5" />
                    <input type="text" placeholder="QUERY NODE ID..." className="pl-12 pr-4 py-3 bg-cyber-panel/80 border border-cyber-border rounded-xl text-sm focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan w-80 text-cyber-cyan placeholder-cyber-cyan/50 font-mono tracking-widest backdrop-blur-md" />
                  </div>
                  <button className="flex items-center gap-3 px-6 py-3 bg-cyber-panel/80 border border-cyber-border rounded-xl text-xs font-bold tracking-widest text-cyber-cyan hover:bg-cyber-cyan/10 hover:shadow-[0_0_15px_rgba(0,229,255,0.2)] transition-all uppercase">
                    <Filter size={16} /> Filter Grid
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {mockStudents.map((student, idx) => (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      key={student.id} 
                      className="group bg-cyber-panel border border-cyber-border/50 rounded-2xl overflow-hidden shadow-2xl hover:shadow-[0_0_30px_rgba(0,229,255,0.15)] hover:border-cyber-cyan transition-all duration-500 backdrop-blur-xl relative"
                    >
                      {/* Corner Accents */}
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyber-cyan opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyber-cyan opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyber-cyan opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyber-cyan opacity-0 group-hover:opacity-100 transition-opacity"></div>

                      <div className="h-48 bg-black relative flex items-center justify-center cursor-pointer overflow-hidden border-b border-cyber-border/30">
                        {/* Feed Overlay */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-40 mix-blend-overlay"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg to-transparent"></div>
                        
                        <div className="w-16 h-16 rounded-full bg-cyber-panel/80 border border-cyber-border backdrop-blur-md flex items-center justify-center transform group-hover:scale-125 transition-all duration-500 shadow-xl group-hover:shadow-[0_0_20px_rgba(0,229,255,0.5)] z-10">
                          <Eye className="w-8 h-8 text-cyber-cyan/50 group-hover:text-cyber-cyan transition-colors" />
                        </div>
                        
                        <div className="absolute top-4 left-4 z-10">
                          <span className="px-3 py-1.5 bg-black/80 backdrop-blur-md text-[10px] font-bold tracking-[0.2em] rounded-md border border-cyber-border text-cyber-cyan uppercase shadow-sm">
                            NODE_{student.id.padStart(3, '0')}
                          </span>
                        </div>

                        <div className="absolute top-4 right-4 flex gap-2 z-10">
                          {student.status === 'FORCE_SUBMITTED' ? (
                            <span className="px-3 py-1.5 bg-rose-600/20 border border-rose-500 text-[10px] font-bold tracking-[0.2em] rounded-md shadow-[0_0_10px_rgba(255,59,59,0.5)] text-rose-400 uppercase backdrop-blur-md">Terminated</span>
                          ) : (
                            <span className="px-3 py-1.5 bg-cyber-success/20 border border-cyber-success/50 text-[10px] font-bold tracking-[0.2em] rounded-md shadow-[0_0_10px_rgba(0,200,83,0.3)] flex items-center gap-2 text-cyber-success uppercase backdrop-blur-md">
                              <span className="w-2 h-2 bg-cyber-success rounded-full animate-pulse shadow-[0_0_5px_rgba(0,200,83,1)]"></span> Link Active
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <h3 className="font-bold text-xl text-white tracking-wide">{student.name}</h3>
                            <p className="text-xs text-slate-500 font-mono mt-1 tracking-widest">ID: STU-{8900 + parseInt(student.id)}</p>
                          </div>
                          <div className={`text-[10px] font-bold tracking-[0.15em] px-3 py-1.5 rounded-md border ${
                            student.riskLevel === 'TRUSTED' ? 'bg-cyber-success/10 text-cyber-success border-cyber-success/30' :
                            student.riskLevel === 'WARNING' ? 'bg-cyber-warning/10 text-cyber-warning border-cyber-warning/30' : 'bg-rose-500/10 text-rose-400 border-rose-500/30 shadow-[0_0_10px_rgba(255,59,59,0.2)] animate-pulse'
                          }`}>
                            {student.riskLevel.replace('_', ' ')}
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-6">
                          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2">
                            <span className="text-slate-500">Trust Index</span>
                            <span className={`font-mono text-sm ${
                              student.trustScore >= 80 ? 'text-cyber-success drop-shadow-[0_0_5px_rgba(0,200,83,0.8)]' :
                              student.trustScore >= 50 ? 'text-cyber-warning drop-shadow-[0_0_5px_rgba(255,176,32,0.8)]' : 'text-rose-400 drop-shadow-[0_0_5px_rgba(255,59,59,0.8)]'
                            }`}>{student.trustScore}%</span>
                          </div>
                          <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                            <div className={`h-full rounded-full transition-all duration-1000 ${
                              student.trustScore >= 80 ? 'bg-cyber-success shadow-[0_0_10px_rgba(0,200,83,1)]' :
                              student.trustScore >= 50 ? 'bg-cyber-warning shadow-[0_0_10px_rgba(255,176,32,1)]' : 'bg-rose-500 shadow-[0_0_10px_rgba(255,59,59,1)]'
                            }`} style={{ width: `${student.trustScore}%` }}></div>
                          </div>
                        </div>

                        {student.lastEvent ? (
                          <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl flex gap-3 items-start shadow-[inset_0_0_15px_rgba(255,59,59,0.05)]">
                            <AlertTriangle size={16} className="text-rose-500 mt-0.5 shrink-0 animate-pulse" />
                            <div>
                              <p className="text-[10px] text-rose-500 font-bold uppercase tracking-widest mb-1">AI Flag</p>
                              <p className="text-xs text-rose-200 font-medium leading-tight">{student.lastEvent}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="p-3.5 bg-cyber-success/5 border border-cyber-success/20 rounded-xl flex gap-3 items-center justify-center">
                            <ShieldCheck size={16} className="text-cyber-success/70" />
                            <p className="text-[10px] font-bold text-cyber-success/70 uppercase tracking-widest">Environment Secure</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'METRICS' && (
              <motion.div 
                key="metrics"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="bg-cyber-panel border border-cyber-border p-8 rounded-3xl shadow-[0_0_40px_rgba(0,229,255,0.05)] backdrop-blur-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-cyan to-cyber-purple"></div>
                  <h3 className="text-xl font-bold mb-8 text-white tracking-wider uppercase">Global Trust Index Over Time</h3>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={mockTimelineData}>
                        <defs>
                          <linearGradient id="colorTrust" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#00E5FF" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,229,255,0.1)" vertical={false} />
                        <XAxis dataKey="time" stroke="#64748b" tick={{fill: '#64748b', fontSize: 12, fontFamily: 'monospace'}} tickMargin={15} axisLine={false} tickLine={false} />
                        <YAxis stroke="#64748b" tick={{fill: '#64748b', fontSize: 12, fontFamily: 'monospace'}} axisLine={false} tickLine={false} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: 'rgba(5, 6, 10, 0.9)', border: '1px solid rgba(0,229,255,0.5)', borderRadius: '12px', color: '#fff', boxShadow: '0 0 20px rgba(0,229,255,0.2)' }}
                          itemStyle={{ color: '#00E5FF', fontWeight: 'bold' }}
                        />
                        <Area type="monotone" dataKey="avgTrust" stroke="#00E5FF" strokeWidth={4} fillOpacity={1} fill="url(#colorTrust)" style={{filter: 'drop-shadow(0 0 8px rgba(0,229,255,0.5))'}} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-cyber-panel border border-rose-500/20 p-8 rounded-3xl shadow-[0_0_40px_rgba(255,59,59,0.05)] backdrop-blur-xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 to-transparent"></div>
                    <h3 className="text-xl font-bold mb-8 text-white tracking-wider uppercase">Anomaly Frequency</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={mockTimelineData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,59,59,0.1)" vertical={false} />
                          <XAxis dataKey="time" stroke="#64748b" tick={{fontSize: 10, fontFamily: 'monospace'}} axisLine={false} tickLine={false} />
                          <YAxis stroke="#64748b" tick={{fontSize: 10, fontFamily: 'monospace'}} axisLine={false} tickLine={false} />
                          <Tooltip contentStyle={{ backgroundColor: 'rgba(5, 6, 10, 0.9)', border: '1px solid rgba(255,59,59,0.5)', borderRadius: '12px', fontFamily: 'monospace' }} />
                          <Line type="step" dataKey="riskEvents" stroke="#FF3B3B" strokeWidth={3} dot={{ fill: '#FF3B3B', strokeWidth: 0, r: 4 }} activeDot={{ r: 8, strokeWidth: 0 }} style={{filter: 'drop-shadow(0 0 8px rgba(255,59,59,0.8))'}} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;