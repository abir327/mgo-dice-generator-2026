import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Activity, ShieldCheck, Database, 
  Smartphone, Apple, Search, Terminal, AlertTriangle, 
  CheckCircle2, Dices, Coins, Loader2, ChevronRight, Fingerprint,
  Network, Cpu, Server, Lock, Zap, Globe, Gauge, Code2, Link, ArrowRight, ShieldAlert
} from 'lucide-react';

export default function App() {
  const [step, setStep] = useState<'connect' | 'searching' | 'select' | 'injecting' | 'verify'>('connect');
  const [username, setUsername] = useState('');
  const [platform, setPlatform] = useState<'iOS' | 'Android'>('iOS');
  
  // Resources
  const [diceAmount, setDiceAmount] = useState(0);
  const [cashAmount, setCashAmount] = useState(0);

  // Console / Terminal state
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const consoleEndRef = useRef<HTMLDivElement>(null);

  // Live Activity & Stats
  const [activities, setActivities] = useState<{id: number, text: React.ReactNode, time: string}[]>([]);
  const [apiPing, setApiPing] = useState(24);
  const [connectedUsers, setConnectedUsers] = useState(1248);
  const [hexLine, setHexLine] = useState('');

  // Live Toast
  const [toastData, setToastData] = useState<{user: string, rolls: number, visible: boolean}>({user: '', rolls: 0, visible: false});
  const [hardwareMasking, setHardwareMasking] = useState(true);
  const [antiBan, setAntiBan] = useState(true);

  const generateRandomActivity = () => {
    const names = ['Ax***', 'Gh***', 'Di***', 'Sa***', 'Mo***', 'Us***', 'Ma***'];
    const rolls = [15000, 25000, 50000, 99999];
    const name = names[Math.floor(Math.random() * names.length)];
    const roll = rolls[Math.floor(Math.random() * rolls.length)];
    return {
      id: Date.now() + Math.random(),
      text: <span><span className="text-blue-400">[{name}]</span> OP_INJECT <span className="text-amber-400">{roll.toLocaleString()} RLS</span></span>,
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" })
    };
  };

  useEffect(() => {
    setActivities([generateRandomActivity(), generateRandomActivity(), generateRandomActivity()]);
    
    const interval = setInterval(() => {
      setActivities(prev => [generateRandomActivity(), ...prev].slice(0, 5));
      setApiPing(Math.floor(Math.random() * (45 - 15) + 15));
      setConnectedUsers(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 2500);

    const hexInterval = setInterval(() => {
      const chars = '0123456789ABCDEF';
      let r = '';
      for(let j=0; j<40; j++) r += chars[Math.floor(Math.random()*16)];
      setHexLine(r);
    }, 150);

    const runToast = () => {
      const names = ['Ax***92', 'Ghost***', 'Diabl***', 'Sama***', 'Mo***Xx', 'User***', 'Max***X'];
      const rolls = [15000, 25000, 50000, 99999];
      setToastData({
        user: names[Math.floor(Math.random() * names.length)],
        rolls: rolls[Math.floor(Math.random() * rolls.length)],
        visible: true
      });
      setTimeout(() => setToastData(prev => ({...prev, visible: false})), 4000);
    };

    const toastInterval = setInterval(runToast, Math.random() * 5000 + 8000); // 8-13 seconds

    return () => {
      clearInterval(interval);
      clearInterval(hexInterval);
      clearInterval(toastInterval);
    };
  }, []);

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;
    setStep('searching');
    setTimeout(() => {
      setStep('select');
    }, 3500);
  };

  const handleInject = () => {
    if (diceAmount === 0 && cashAmount === 0) return;
    setStep('injecting');
    
    const logs = [
      "[SYSTEM] INIT API_BRIDGE_PROTOCOL_V4.2",
      "[NETWORK] RESOLVING HOST: mgo.api.scopely.internal",
      "[NETWORK] TCP HANDSHAKE SUCCESS... 200 OK",
      "[AUTH] NEGOTIATING SSL/TLS ENCRYPTION LAYER",
      "[AUTH] CERTIFICATE VERIFIED (SHA-256)",
      `[DATABASE] QUERY TARGET UID: ${username}`,
      `[DATABASE] RESPONSE: 200 OK | PLATFORM: ${platform}`,
      "[EXPLOIT] DEPLOYING MEMORY_INJECTOR_PAYLOAD.BIN",
      "[EXPLOIT] BYPASSING ANTI-CHEAT KERNEL HOOKS",
      `[MEMORY] ALLOCATING ${diceAmount.toLocaleString()} ROLLS CHUNKS...`,
      `[MEMORY] ALLOCATING ${cashAmount.toLocaleString()} CASH CHUNKS...`,
      "[DATABASE] FORCING ASYNC WRITE EVENT TO MAIN CLUSTER",
      "[DATABASE] SYNC STATUS: PENDING VERIFICATION",
      "[WARNING] ANOMALY DETECTED BY WAF (Web Application Firewall)",
      "[SYSTEM] CONNECTION BLOCKED. CAPTCHA/HUMAN VALIDATION REQUIRED."
    ];

    let currentLog = 0;
    setConsoleLogs([]);
    
    const logInterval = setInterval(() => {
      if (currentLog < logs.length) {
        setConsoleLogs(prev => [...prev, logs[currentLog]]);
        currentLog++;
        if (consoleEndRef.current && consoleEndRef.current.parentElement) {
          consoleEndRef.current.parentElement.scrollTop = consoleEndRef.current.parentElement.scrollHeight;
        }
      } else {
        clearInterval(logInterval);
        setTimeout(() => setStep('verify'), 2000);
      }
    }, 400);
  };

  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  };

  const dicePackages = [15000, 25000, 50000, 99999];
  const cashPackages = [5000000, 10000000, 25000000, 99999999];

  return (
    <div className="min-h-screen bg-[#030712] font-mono text-slate-300 selection:bg-blue-500/30 flex flex-col relative overflow-hidden">
      
      {/* ULTRA TRUSTABLE BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         {/* Base dark tone */}
         <div className="absolute inset-0 bg-[#02050A]"></div>
         
         {/* Cyber grid - geometric trust */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,#000_20%,transparent_100%)]"></div>
         <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:10px_10px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,#000_20%,transparent_100%)]"></div>
         
         {/* High-tech circuit overlay effect */}
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-[0.15] mix-blend-screen shadow-[inset_0_0_150px_rgba(2,5,10,1)]"></div>

         {/* Animated scanner line */}
         <div className="absolute top-0 left-0 w-full h-[1px] bg-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.5)] animate-[slide_8s_ease-in-out_infinite_alternate] z-0"></div>

         {/* Light bursts for premium feel */}
         <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-amber-500/10 rounded-full blur-[120px] mix-blend-screen"></div>
         <div className="absolute bottom-[-10%] left-[-5%] w-[50vw] h-[50vw] bg-emerald-600/10 rounded-full blur-[140px] mix-blend-screen"></div>
         
         {/* Security seal watermarks */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.015] flex items-center justify-center pointer-events-none select-none">
            <ShieldCheck className="w-[80vw] h-[80vw] text-emerald-500" />
         </div>
         
         {/* Hexagonal overlay for auth vibe */}
         <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSI0OSIgdmlld0JveD0iMCAwIDI4IDQ5Ij4KICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgPHBhdGggZmlsbD0icmdiYSgxNiwxODUsMTI5LDAuMDMpIiBkPSJNMTMuOTkgMTcuMjVsMTItNi45djEzLjhsLTEyIDYuOXYtMTMuOHpNMCAxNi44NWwtMTItNi45djEzLjhsMTIgNi45di0xMy44eiIvPgogIDwvZz4KPC9zdmc+')] opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]"></div>
      </div>

      {/* TOP PREMIUM NAV BAR */}
      <header className="relative z-20 border-b border-white/5 bg-[#030508]/90 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
         <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-5 border border-white/10 bg-white/5 pr-4 pl-3 py-2 rounded-2xl shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]">
               <img src="https://i.ibb.co/211K4w5C/lota.png" alt="Monopoly Go Server" className="h-8 sm:h-10 select-none drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
               <div className="h-8 w-px bg-white/10"></div>
               <div className="flex flex-col">
                  <span className="text-[9px] sm:text-[10px] md:text-[11px] text-amber-400 font-black tracking-[0.2em] uppercase flex items-center gap-1.5 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)] whitespace-nowrap">
                     <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4" /> Verified Gateway
                  </span>
                  <span className="text-[8px] sm:text-[9px] text-emerald-400 font-bold tracking-widest flex items-center gap-1 whitespace-nowrap">
                     <Lock className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> SECURE TUNNEL ACTIVE
                  </span>
               </div>
            </div>
            <div className="flex items-center gap-4 sm:gap-8 w-full md:w-auto justify-between md:justify-end">
               <div className="flex flex-col items-start md:items-end">
                  <span className="text-[9px] sm:text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Server Load</span>
                  <span className="text-[10px] sm:text-xs text-emerald-400 font-bold flex items-center gap-1.5 drop-shadow-sm">
                     <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                     Low ({apiPing}ms)
                  </span>
               </div>
               <div className="flex flex-col items-end border-l border-white/10 pl-4 sm:pl-6">
                  <span className="text-[9px] sm:text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Encryption</span>
                  <span className="text-[10px] sm:text-xs text-amber-400 font-black tracking-widest flex items-center gap-1 drop-shadow-md">
                     <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> AES-256-GCM
                  </span>
               </div>
            </div>
         </div>
         {/* Premium Loading Bar Tracker */}
         <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-500/10 to-transparent relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-[30%] bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-[slide_3s_ease-in-out_infinite]"></div>
         </div>
      </header>

      {/* SMART TRUST BANNER (Running Marquee) */}
      <div className="w-full bg-[#0A0F1C]/90 border-b border-emerald-500/10 overflow-hidden relative z-10 py-1.5 flex items-center backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
         <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#020305] to-transparent z-10 pointer-events-none"></div>
         <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#020305] to-transparent z-10 pointer-events-none"></div>
         
         <motion.div 
            initial={{ x: "0%" }}
            animate={{ x: "-50%" }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="flex flex-nowrap whitespace-nowrap min-w-max items-center gap-10 pl-10 text-[10px] sm:text-[11px] font-mono tracking-widest uppercase"
         >
            {[...Array(2)].map((_, i) => (
               <React.Fragment key={i}>
                  <span className="flex items-center gap-2 drop-shadow-[0_0_5px_rgba(16,185,129,0.3)]"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_5px_rgba(16,185,129,0.8)]"></div> <span className="text-emerald-400/90 font-bold">User<span className="opacity-50">***</span>92 successfully injected 50,000 Rolls</span></span>
                  <span className="text-white/10 text-[16px]">•</span>
                  <span className="flex items-center gap-2 drop-shadow-[0_0_5px_rgba(251,191,36,0.2)]"><div className="w-1.5 h-1.5 rounded-full bg-amber-400/80"></div> <span className="text-amber-400/90">Mainnet Bypass: <strong className="text-amber-400">ONLINE</strong></span></span>
                  <span className="text-white/10 text-[16px]">•</span>
                  <span className="flex items-center gap-2 drop-shadow-[0_0_5px_rgba(59,130,246,0.3)]"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div> <span className="text-blue-400/90">Hardware Masking: <strong className="text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.5)] bg-blue-500/10 px-1 py-0.5 rounded">ACTIVE [ZERO BAN RISK]</strong></span></span>
                  <span className="text-white/10 text-[16px]">•</span>
                  <span className="flex items-center gap-2 drop-shadow-[0_0_5px_rgba(168,85,247,0.3)]"><div className="w-1.5 h-1.5 rounded-full bg-purple-400/80"></div> <span className="text-purple-400/90 font-bold">Max<span className="opacity-50">***</span> just claimed 80,000 Dice</span></span>
                  <span className="text-white/10 text-[16px]">•</span>
                  <span className="flex items-center gap-2 drop-shadow-[0_0_5px_rgba(16,185,129,0.3)]"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_5px_rgba(16,185,129,0.8)]"></div> <span className="text-emerald-400/90">Anti-Ban Security: <strong className="text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.5)] bg-emerald-500/10 px-1 py-0.5 rounded">UNDETECTED (v4.2)</strong></span></span>
                  <span className="text-white/10 text-[16px]">•</span>
               </React.Fragment>
            ))}
         </motion.div>
      </div>

      <main className="flex-1 w-full max-w-[1400px] mx-auto p-2 sm:p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 relative z-10">
         
         {/* LEFT PANEL - NETWORK STATUS */}
         <div className="lg:col-span-3 xl:col-span-3 space-y-4 flex flex-col order-2 lg:order-1">
            
            {/* 3D Dice Graphic */}
            <div className="bg-[#1a150b]/80 border border-amber-500/30 rounded-xl p-6 backdrop-blur-md relative overflow-hidden shadow-[0_10px_30px_rgba(245,158,11,0.15)] flex flex-col items-center justify-center min-h-[160px] group hidden lg:flex">
               <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent"></div>
               <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,#f59e0b_0%,transparent_50%,#f59e0b_100%)] opacity-20 animate-[spin_8s_linear_infinite] blur-xl"></div>
               
               <style>{`
                  @keyframes roll3d {
                     0% { transform: rotateX(30deg) rotateY(45deg); }
                     100% { transform: rotateX(390deg) rotateY(405deg); }
                  }
                  .dice-cube {
                     transform-style: preserve-3d;
                     animation: roll3d 12s linear infinite;
                  }
               `}</style>

               <div className="relative z-20 w-full h-28 mb-2 flex items-center justify-center" style={{ perspective: '1200px' }}>
                  {/* Fake floor shadow since we can't use drop-shadow on the 3D container */}
                  <div className="absolute -bottom-2 w-16 h-4 bg-amber-600/50 blur-[10px] rounded-[100%] animate-pulse"></div>

                  <div className="relative w-24 h-24 dice-cube">
                     {/* Front (1) */}
                     <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 rounded-[18px] border-[1.5px] border-amber-300/70 p-2 shadow-[inset_0_0_20px_rgba(255,255,255,0.7),inset_0_0_8px_rgba(0,0,0,0.1)] flex items-center justify-center" style={{ transform: 'rotateY(0deg) translateZ(48px)' }}>
                        <div className="w-full h-full flex items-center justify-center relative z-10">
                           <span className="w-7 h-7 bg-gradient-to-b from-white to-gray-200 rounded-full shadow-[inset_0_3px_6px_rgba(0,0,0,0.5),0_2px_4px_rgba(255,255,255,0.6)]"></span>
                        </div>
                     </div>
                     
                     {/* Back (6) */}
                     <div className="absolute inset-0 bg-gradient-to-tl from-amber-500 via-amber-600 to-orange-600 rounded-[18px] border-[1.5px] border-amber-400/70 p-3 shadow-[inset_0_0_20px_rgba(255,255,255,0.4),inset_0_0_8px_rgba(0,0,0,0.2)]" style={{ transform: 'rotateY(180deg) translateZ(48px)' }}>
                        <div className="w-full h-full flex flex-col justify-between">
                           <div className="flex justify-between w-full"><span className="w-5 h-5 bg-gradient-to-b from-white to-gray-200 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.4),0_1px_2px_rgba(255,255,255,0.2)]"></span><span className="w-5 h-5 bg-gradient-to-b from-white to-gray-200 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.4),0_1px_2px_rgba(255,255,255,0.2)]"></span></div>
                           <div className="flex justify-between w-full"><span className="w-5 h-5 bg-gradient-to-b from-white to-gray-200 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.4),0_1px_2px_rgba(255,255,255,0.2)]"></span><span className="w-5 h-5 bg-gradient-to-b from-white to-gray-200 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.4),0_1px_2px_rgba(255,255,255,0.2)]"></span></div>
                           <div className="flex justify-between w-full"><span className="w-5 h-5 bg-gradient-to-b from-white to-gray-200 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.4),0_1px_2px_rgba(255,255,255,0.2)]"></span><span className="w-5 h-5 bg-gradient-to-b from-white to-gray-200 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.4),0_1px_2px_rgba(255,255,255,0.2)]"></span></div>
                        </div>
                     </div>

                     {/* Right (3) */}
                     <div className="absolute inset-0 bg-gradient-to-tr from-amber-400 via-amber-500 to-amber-600 rounded-[18px] border-[1.5px] border-amber-300/70 p-3 shadow-[inset_0_0_20px_rgba(255,255,255,0.5),inset_0_0_8px_rgba(0,0,0,0.15)] flex flex-col justify-between" style={{ transform: 'rotateY(90deg) translateZ(48px)' }}>
                        <span className="w-5 h-5 bg-gradient-to-b from-white to-gray-200 rounded-full place-self-end shadow-[inset_0_2px_4px_rgba(0,0,0,0.4),0_1px_2px_rgba(255,255,255,0.3)]"></span>
                        <span className="w-5 h-5 bg-gradient-to-b from-white to-gray-200 rounded-full place-self-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.4),0_1px_2px_rgba(255,255,255,0.3)]"></span>
                        <span className="w-5 h-5 bg-gradient-to-b from-white to-gray-200 rounded-full place-self-start shadow-[inset_0_2px_4px_rgba(0,0,0,0.4),0_1px_2px_rgba(255,255,255,0.3)]"></span>
                     </div>

                     {/* Left (4) */}
                     <div className="absolute inset-0 bg-gradient-to-bl from-amber-500 via-orange-500 to-orange-600 rounded-[18px] border-[1.5px] border-amber-400/70 p-3.5 shadow-[inset_0_0_20px_rgba(255,255,255,0.3),inset_0_0_8px_rgba(0,0,0,0.2)]" style={{ transform: 'rotateY(-90deg) translateZ(48px)' }}>
                        <div className="w-full h-full flex flex-col justify-between">
                           <div className="flex justify-between w-full"><span className="w-5 h-5 bg-gradient-to-b from-white to-gray-200 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.4),0_1px_2px_rgba(255,255,255,0.2)]"></span><span className="w-5 h-5 bg-gradient-to-b from-white to-gray-200 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.4),0_1px_2px_rgba(255,255,255,0.2)]"></span></div>
                           <div className="flex justify-between w-full"><span className="w-5 h-5 bg-gradient-to-b from-white to-gray-200 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.4),0_1px_2px_rgba(255,255,255,0.2)]"></span><span className="w-5 h-5 bg-gradient-to-b from-white to-gray-200 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.4),0_1px_2px_rgba(255,255,255,0.2)]"></span></div>
                        </div>
                     </div>

                     {/* Top (2) */}
                     <div className="absolute inset-0 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 rounded-[18px] border-[1.5px] border-amber-200/70 p-3 shadow-[inset_0_0_25px_rgba(255,255,255,0.8),inset_0_0_8px_rgba(0,0,0,0.1)] flex justify-between" style={{ transform: 'rotateX(90deg) translateZ(48px)' }}>
                        <span className="w-5 h-5 bg-gradient-to-b from-white to-gray-200 rounded-full place-self-start shadow-[inset_0_3px_5px_rgba(0,0,0,0.4),0_1px_3px_rgba(255,255,255,0.4)]"></span>
                        <span className="w-5 h-5 bg-gradient-to-b from-white to-gray-200 rounded-full place-self-end shadow-[inset_0_3px_5px_rgba(0,0,0,0.4),0_1px_3px_rgba(255,255,255,0.4)]"></span>
                     </div>

                     {/* Bottom (5) */}
                     <div className="absolute inset-0 bg-gradient-to-t from-orange-500 via-orange-600 to-orange-700 rounded-[18px] border-[1.5px] border-orange-500/70 p-3 shadow-[inset_0_0_20px_rgba(0,0,0,0.4),inset_0_0_8px_rgba(0,0,0,0.3)]" style={{ transform: 'rotateX(-90deg) translateZ(48px)' }}>
                        <div className="w-full h-full flex flex-col justify-between">
                           <div className="flex justify-between w-full"><span className="w-5 h-5 bg-gradient-to-b from-white to-gray-300 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]"></span><span className="w-5 h-5 bg-gradient-to-b from-white to-gray-300 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]"></span></div>
                           <div className="flex justify-center w-full"><span className="w-5 h-5 bg-gradient-to-b from-white to-gray-300 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]"></span></div>
                           <div className="flex justify-between w-full"><span className="w-5 h-5 bg-gradient-to-b from-white to-gray-300 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]"></span><span className="w-5 h-5 bg-gradient-to-b from-white to-gray-300 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]"></span></div>
                        </div>
                     </div>
                  </div>
               </div>

               <span className="relative z-10 mt-2 text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 drop-shadow-md">Quantum Rolls</span>
            </div>

            {/* Cluster Nodes */}
            <div className="bg-[#0A0F1C]/80 border border-slate-800/60 rounded-xl p-4 backdrop-blur-md relative overflow-hidden shadow-lg">
               <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
               <div className="flex justify-between items-center mb-5">
                  <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                     <ShieldCheck className="w-4 h-4 text-emerald-400" /> Protection Status
                  </h3>
                  <div className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">ACTIVE</div>
               </div>
               
               <div className="grid grid-cols-4 gap-2.5 mb-4">
                  {Array.from({length: 16}).map((_, i) => {
                     const isActive = Math.random() > 0.4;
                     return (
                     <div key={i} className={`h-8 rounded flex items-center justify-center border transition-colors duration-1000 ${
                        isActive 
                        ? 'border-emerald-900/50 bg-emerald-500/10 text-emerald-400 shadow-[inset_0_0_10px_rgba(16,185,129,0.1)]' 
                        : 'border-slate-800/50 bg-[#05070A] text-slate-700'
                     }`}>
                        <Cpu className={`w-3.5 h-3.5 ${isActive ? 'animate-pulse' : ''}`} />
                     </div>
                  )})}
               </div>
               
               <div className="text-[9px] text-slate-500 font-mono break-all leading-tight border-t border-slate-800 pt-3 mt-3">
                  <span className="text-emerald-400/80 font-bold">ANTI-BAN HASH:</span> <br/>{hexLine}
               </div>
            </div>

            {/* Live Webhook Feed */}
            <div className="bg-[#05070A]/80 border border-slate-800/80 rounded-xl flex-1 relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col p-1 backdrop-blur-md">
               <div className="bg-[#0A0F1C]/80 border-b border-white/5 p-3 rounded-t-lg flex items-center justify-between z-10 relative">
                  <h3 className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                     <Activity className="w-3.5 h-3.5 text-emerald-400" /> Webhook Stream
                  </h3>
                  <div className="flex items-center gap-2 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                     <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_5px_rgba(16,185,129,0.5)]"></span>
                     <span className="text-[8px] font-bold font-mono text-emerald-400 tracking-widest">LIVE SYNC</span>
                  </div>
               </div>
               <div className="bg-[#020305] flex-1 p-3 xl:p-4 rounded-b-lg relative overflow-hidden shadow-inner border border-white/5">
                  {/* Digital Grid lines */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_2px,transparent_2px),linear-gradient(90deg,rgba(255,255,255,0.02)_2px,transparent_2px)] bg-[size:20px_20px] pointer-events-none z-0"></div>
                  
                  <div className="space-y-2 lg:space-y-3 h-full overflow-hidden relative z-10 flex flex-col justify-start">
                     <AnimatePresence>
                        {activities.map((act) => (
                           <motion.div 
                              key={act.id}
                              initial={{ opacity: 0, x: -10, backgroundColor: 'rgba(16,185,129,0.1)' }}
                              animate={{ opacity: 1, x: 0, backgroundColor: 'transparent' }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.5 }}
                              className="text-[9px] xl:text-[10px] font-mono border-l-2 border-slate-700 hover:border-emerald-500/50 transition-colors pl-3 py-1 relative group"
                           >
                              <div className="text-slate-500 mb-0.5 flex items-center gap-1.5">
                                 <ShieldCheck className="w-2.5 h-2.5 text-slate-600 group-hover:text-amber-500 transition-colors" /> 
                                 <span className="opacity-70 group-hover:opacity-100">{act.time}</span>
                                 <span className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity ml-1">- 200 OK</span>
                              </div>
                              <div className="text-slate-300 whitespace-nowrap overflow-hidden text-ellipsis flex items-center gap-2">
                                 <span className="text-emerald-500 font-bold opacity-50 group-hover:opacity-100">➔</span> {act.text}
                              </div>
                           </motion.div>
                        ))}
                     </AnimatePresence>
                     <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#020305] to-transparent pointer-events-none"></div>
                  </div>
               </div>
            </div>
         </div>

         {/* MAIN INTERFACE CONTROLLER */}
         <div className="col-span-1 lg:col-span-9 xl:col-span-9 flex flex-col order-1 lg:order-2">
            
            {/* Page Title & Logo Above Card */}
            <motion.div 
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               className="flex flex-col items-center justify-center mb-6 text-center relative z-20"
            >
               <motion.div 
                  animate={{ y: [-5, 5, -5], rotate: [-2, 2, -2] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative"
               >
                  <div className="absolute inset-0 bg-amber-500/20 blur-[40px] rounded-full animate-pulse"></div>
                  <img src="https://i.ibb.co/9mzDXc5C/drws.png" alt="Monopoly Go Generator" className="h-16 sm:h-20 md:h-24 object-contain filter drop-shadow-[0_10px_25px_rgba(245,158,11,0.5)] mb-3 relative z-10" />
               </motion.div>
               <h1 className="text-xl sm:text-2xl font-black uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 drop-shadow-[0_2px_10px_rgba(245,158,11,0.3)] flex flex-wrap items-center justify-center gap-3">
                  Monopoly Go Dice Generator
                  <span className="inline-flex items-center justify-center bg-emerald-500/10 border border-emerald-500/30 rounded px-2 py-0.5">
                     <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2 animate-pulse shadow-[0_0_5px_rgba(16,185,129,0.8)]"></span>
                     <span className="text-emerald-400 text-[9px] tracking-widest font-bold">ONLINE</span>
                  </span>
               </h1>
               <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
                  <div className="flex items-center gap-1.5 text-[9px] md:text-[10px] text-slate-400 font-mono tracking-widest uppercase bg-[#0A0F1C]/80 border border-white/5 py-1 px-3 rounded-full shadow-inner backdrop-blur-md">
                     <Server className="w-3 h-3 text-blue-400" />
                     Mainnet <strong className="text-blue-400 font-black">v9.2.4</strong>
                  </div>
                  <div className="flex items-center gap-1.5 text-[9px] md:text-[10px] text-slate-400 font-mono tracking-widest uppercase bg-[#0A0F1C]/80 border border-white/5 py-1 px-3 rounded-full shadow-inner backdrop-blur-md">
                     <ShieldCheck className="w-3 h-3 text-emerald-400" />
                     Bypass: <strong className="text-emerald-400 font-black drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]">Undetected</strong>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 text-[9px] md:text-[10px] text-slate-400 font-mono tracking-widest uppercase bg-[#0A0F1C]/80 border border-white/5 py-1 px-3 rounded-full shadow-inner backdrop-blur-md">
                     <Activity className="w-3 h-3 text-amber-400" />
                     Load: <strong className="text-amber-400 font-black">42%</strong>
                  </div>
               </div>
            </motion.div>

            <div className="bg-white/[0.03] backdrop-blur-[40px] saturate-[150%] border border-red-500/50 ring-2 ring-red-500 rounded-3xl shadow-[0_0_40px_rgba(255,0,0,0.7),0_30px_60px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] relative overflow-hidden flex flex-col min-h-[550px] lg:flex-1">
               
               {/* Terminal/Window Header Decor */}
               <div className="h-10 sm:h-14 border-b border-white/[0.08] flex items-center px-3 sm:px-6 gap-2 sm:gap-4 bg-white/[0.02]">
                  <div className="flex gap-2">
                     <div className="w-3.5 h-3.5 rounded-full bg-slate-800 border border-slate-700"></div>
                     <div className="w-3.5 h-3.5 rounded-full bg-slate-800 border border-slate-700"></div>
                     <div className="w-3.5 h-3.5 rounded-full bg-slate-800 border border-slate-700"></div>
                  </div>
                  <div className="h-6 w-px bg-slate-800 ml-2"></div>
                  <span className="hidden sm:flex text-[11px] text-slate-400 uppercase tracking-[0.2em] font-bold select-none items-center gap-2">
                     <ShieldCheck className="w-4 h-4 text-emerald-400" /> Secure Console Gateway
                  </span>
                  <div className="ml-auto flex items-center gap-2 sm:gap-3">
                     <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.2em] text-amber-500 bg-amber-500/10 px-2 flex-wrap text-center py-1 rounded border border-amber-500/20 flex items-center gap-1 sm:gap-1.5 drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]">
                        <Lock className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> <span className="hidden sm:inline">End-to-End Encrypted</span><span className="sm:hidden">Encrypted</span>
                     </span>
                  </div>
               </div>

               {/* Main Dynamic Content Area */}
               <div className="flex-1 p-3 sm:p-6 lg:p-12 relative z-10 flex flex-col justify-center">
                  
                  {/* Faded background watermark */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none">
                     <Database className="w-[400px] h-[400px]" />
                  </div>

                  <AnimatePresence mode="wait">
                     
                     {/* STEP 1: REST API CONFIGURATION */}
                     {step === 'connect' && (
                        <motion.div key="connect" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="max-w-xl mx-auto w-full space-y-8 relative z-10">
                           
                           {/* Trust Banner */}
                           <div className="bg-gradient-to-r from-emerald-900/40 to-transparent border-l-4 border-emerald-500 p-3 sm:p-4 rounded-r-xl flex items-center gap-3 mb-6 shadow-lg">
                              <div className="p-2 bg-emerald-500/20 rounded-lg">
                                 <ShieldCheck className="w-6 h-6 text-emerald-400" />
                              </div>
                              <div>
                                 <h4 className="text-emerald-400 font-bold text-sm tracking-widest uppercase">Safe Connect Active</h4>
                                 <p className="text-slate-400 text-xs font-mono mt-0.5">Your IP is hidden and connection is fully encrypted.</p>
                              </div>
                           </div>

                           <div className="mb-8">
                              <h2 className="text-2xl sm:text-4xl font-light text-white mb-2 sm:mb-3 flex items-center gap-2 sm:gap-3 tracking-tight">
                                 Player <strong className="font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 drop-shadow">Verification</strong>
                              </h2>
                              <p className="text-slate-400 text-sm font-medium">Please enter your exact Monopoly Go username to connect securely to the database.</p>
                           </div>

                           <form onSubmit={handleConnect} className="space-y-6">
                              <div className="space-y-3">
                                 <label className="text-xs font-bold text-slate-300 uppercase tracking-[0.2em] block">Target Username</label>
                                 <div className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-emerald-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                                    <input 
                                      type="text"
                                      required
                                      value={username}
                                      onChange={(e) => setUsername(e.target.value)}
                                      placeholder="Enter username exactly as shown in-game..."
                                      className="relative w-full bg-[#0D111A] border-2 border-white/10 focus:border-amber-500/50 rounded-xl pl-10 sm:pl-12 pr-4 py-4 sm:py-5 text-white font-bold text-base sm:text-lg placeholder:font-normal placeholder:text-slate-600 focus:outline-none focus:ring-4 focus:ring-amber-500/10 transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
                                    />
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-amber-500 transition-colors">
                                       <Search className="w-5 h-5" />
                                    </div>
                                 </div>
                              </div>

                              <div className="space-y-3">
                                 <label className="text-xs font-bold text-slate-300 uppercase tracking-[0.2em] block">Platform (OS)</label>
                                 <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                    <button
                                      type="button"
                                      onClick={() => setPlatform('iOS')}
                                      className={`py-5 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 font-bold text-sm shadow-[0_4px_20px_rgba(0,0,0,0.5)] ${
                                        platform === 'iOS' 
                                          ? 'bg-gradient-to-b from-white/10 to-transparent border-white text-white shadow-[inset_0_0_20px_rgba(255,255,255,0.15),0_10px_20px_rgba(255,255,255,0.05)] scale-[1.02]' 
                                          : 'bg-[#0A0F1C] border-[#1A2235] text-slate-500 hover:border-slate-600 grayscale opacity-80 scale-100 hover:opacity-100'
                                      }`}
                                    >
                                      <svg viewBox="0 0 384 512" fill="currentColor" className="w-8 h-8"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                                      <span className="tracking-[0.2em] font-black uppercase text-[10px]">Apple iOS</span>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setPlatform('Android')}
                                      className={`py-5 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 font-bold text-sm shadow-[0_4px_20px_rgba(0,0,0,0.5)] ${
                                        platform === 'Android' 
                                          ? 'bg-gradient-to-b from-[#3ddc84]/20 to-transparent border-[#3ddc84] text-[#3ddc84] shadow-[inset_0_0_20px_rgba(61,220,132,0.15),0_10px_20px_rgba(61,220,132,0.05)] scale-[1.02]' 
                                          : 'bg-[#0A0F1C] border-[#1A2235] text-slate-500 hover:border-slate-600 grayscale opacity-80 scale-100 hover:opacity-100'
                                      }`}
                                    >
                                      <svg viewBox="0 0 576 512" fill="currentColor" className="w-8 h-8"><path d="M420.224 200.224L486.528 85.344a16.8 16.8 0 00-6.144-23.008 16.864 16.864 0 00-23.04 6.144l-67.936 117.6a297.248 297.248 0 00-202.944 0L118.528 68.32a16.8 16.8 0 00-23.008-6.144 16.8 16.8 0 00-6.144 23.04l66.432 114.976A288.768 288.768 0 000 480h576a288.8 288.8 0 00-155.776-279.776zM151.008 384A33.152 33.152 0 11184 350.848 33 33 0 01151.008 384zm273.792 0A33.184 33.184 0 11457.952 350.84 33.12 33.12 0 01424.8 384z"/></svg> 
                                      <span className="tracking-[0.2em] font-black uppercase text-[10px]">Android</span>
                                    </button>
                                 </div>
                              </div>

                              <div className="space-y-3">
                                 <button 
                                    type="button"
                                    onClick={() => setHardwareMasking(!hardwareMasking)}
                                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${hardwareMasking ? 'bg-[#0A0F1C]/80 border-blue-500/30 shadow-[inset_0_0_20px_rgba(59,130,246,0.1)]' : 'bg-[#0A0F1C]/40 border-slate-800/80 grayscale opacity-70'}`}
                                 >
                                    <div className="flex items-center gap-3">
                                       <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${hardwareMasking ? 'bg-blue-500/10 border-blue-500/20' : 'bg-slate-800/50 border-slate-700'}`}>
                                          <Server className={`w-4 h-4 ${hardwareMasking ? 'text-blue-400' : 'text-slate-500'}`} />
                                       </div>
                                       <div className="text-left">
                                          <div className={`text-xs font-bold uppercase tracking-widest ${hardwareMasking ? 'text-slate-300' : 'text-slate-500'}`}>Hardware Masking</div>
                                          <div className="text-[9px] font-mono text-slate-500">Hide MAC & IP Address</div>
                                       </div>
                                    </div>
                                    <div className={`w-10 h-5 rounded-full border relative flex items-center p-0.5 transition-colors shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] ${hardwareMasking ? 'bg-blue-500/20 border-blue-500/30' : 'bg-slate-900 border-slate-800'}`}>
                                       <motion.div 
                                          layout
                                          initial={false}
                                          animate={{ x: hardwareMasking ? 20 : 0 }}
                                          className={`w-4 h-4 rounded-full ${hardwareMasking ? 'bg-blue-400 shadow-[0_0_5px_rgba(59,130,246,0.8)]' : 'bg-slate-600'}`}
                                       />
                                    </div>
                                 </button>

                                 <button 
                                    type="button"
                                    onClick={() => setAntiBan(!antiBan)}
                                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${antiBan ? 'bg-[#0A0F1C]/80 border-emerald-500/30 shadow-[inset_0_0_20px_rgba(16,185,129,0.1)]' : 'bg-[#0A0F1C]/40 border-slate-800/80 grayscale opacity-70'}`}
                                 >
                                    <div className="flex items-center gap-3">
                                       <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${antiBan ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-slate-800/50 border-slate-700'}`}>
                                          <ShieldCheck className={`w-4 h-4 ${antiBan ? 'text-emerald-400' : 'text-slate-500'}`} />
                                       </div>
                                       <div className="text-left">
                                          <div className={`text-xs font-bold uppercase tracking-widest ${antiBan ? 'text-slate-300' : 'text-slate-500'}`}>Anti-Ban Module</div>
                                          <div className="text-[9px] font-mono text-slate-500">v4.2 Sandbox Protection</div>
                                       </div>
                                    </div>
                                    <div className={`w-10 h-5 rounded-full border relative flex items-center p-0.5 transition-colors shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] ${antiBan ? 'bg-emerald-500/20 border-emerald-500/30' : 'bg-slate-900 border-slate-800'}`}>
                                       <motion.div 
                                          layout
                                          initial={false}
                                          animate={{ x: antiBan ? 20 : 0 }}
                                          className={`w-4 h-4 rounded-full ${antiBan ? 'bg-emerald-400 shadow-[0_0_5px_rgba(16,185,129,0.8)]' : 'bg-slate-600'}`}
                                       />
                                    </div>
                                 </button>
                              </div>

                              <div className="pt-6">
                                 <button 
                                   type="submit"
                                   className="relative w-full overflow-hidden rounded-xl p-[2px] transition-all transform active:scale-[0.98] group shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                                 >
                                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-emerald-400 to-blue-400 opacity-80 group-hover:opacity-100 group-hover:blur-sm transition-all duration-500"></div>
                                    <div className="relative bg-gradient-to-b from-[#1a2333] to-[#0A0F1C] group-hover:from-[#2a374d] rounded-[10px] py-5 px-6 flex items-center justify-center gap-3 border-t border-white/20">
                                       <span className="text-white font-black uppercase tracking-[0.2em] text-sm md:text-base drop-shadow-md">Connect Securely</span>
                                       <Lock className="w-5 h-5 text-emerald-400" />
                                    </div>
                                 </button>
                                 <div className="flex items-center justify-center gap-4 mt-5 opacity-60">
                                    <div className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-slate-400" /><span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">AES-256</span></div>
                                    <div className="w-1 h-1 rounded-full bg-slate-700"></div>
                                    <div className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-slate-400" /><span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">SSL Certified</span></div>
                                    <div className="w-1 h-1 rounded-full bg-slate-700"></div>
                                    <div className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5 text-slate-400" /><span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Cloudflare</span></div>
                                 </div>
                              </div>
                           </form>
                        </motion.div>
                     )}

                     {/* STEP 2: HANDSHAKE / SEARCHING */}
                     {step === 'searching' && (
                        <motion.div key="searching" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col items-center justify-center w-full h-full relative z-10 py-8 overflow-hidden">
                           
                           {/* High-End Cybernetic Scanner Matrix Background */}
                           <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center rounded-[2rem] overflow-hidden">
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] border border-blue-500/10 rounded-full animate-[spin_20s_linear_infinite] shadow-[inset_0_0_50px_rgba(59,130,246,0.1)]"></div>
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] border-2 border-dashed border-emerald-500/10 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[400px] h-[300px] md:h-[400px] border border-amber-500/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
                              
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[2px] bg-blue-500/10 animate-[spin_8s_linear_infinite]"></div>
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-[2px] bg-blue-500/10 animate-[spin_8s_linear_infinite]"></div>
                              
                              <div className="absolute bg-blue-600/10 w-[150%] h-[100%] blur-[80px] animate-pulse rounded-full mix-blend-screen"></div>
                           </div>

                           <div className="relative flex items-center justify-center w-48 h-48 md:w-64 md:h-64 mb-8 mt-4 z-10">
                              {/* Glowing Radar Rings */}
                              <div className="absolute inset-0 rounded-full border border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.2)]"></div>
                              <div className="absolute inset-4 rounded-full border border-blue-400/40 animate-[spin_3s_linear_infinite] border-t-blue-400 border-l-transparent"></div>
                              <div className="absolute inset-8 rounded-full border-2 border-emerald-400/60 animate-[spin_2s_linear_infinite_reverse] border-b-emerald-400 border-r-transparent shadow-[0_0_30px_rgba(16,185,129,0.3)]"></div>
                              <div className="absolute inset-12 rounded-full border border-amber-500/40 animate-pulse bg-amber-500/5"></div>
                              
                              {/* Sweep Radar Effect */}
                              <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_270deg,rgba(59,130,246,0.4)_360deg)] w-full h-full rounded-full animate-[spin_2s_linear_infinite] origin-center mix-blend-screen"></div>

                              <div className="relative z-10 bg-gradient-to-br from-[#0A0F1C] to-[#05070A] w-20 h-20 md:w-24 md:h-24 rounded-full shadow-[0_0_40px_rgba(59,130,246,0.6)] flex items-center justify-center border-2 border-blue-500/50 relative overflow-hidden group">
                                 <div className="absolute inset-0 bg-blue-500/10 animate-pulse group-hover:bg-blue-500/20"></div>
                                 <Search className="w-8 h-8 md:w-10 md:h-10 text-blue-400 animate-pulse drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                              </div>
                           </div>
                           
                           {/* Data Console */}
                           <div className="text-center space-y-6 bg-[#030508]/80 backdrop-blur-2xl border border-white/10 p-6 md:p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_2px_20px_rgba(255,255,255,0.05)] relative w-full max-w-lg z-10">
                              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-80 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                              
                              <h2 className="text-2xl md:text-3xl font-light text-white flex flex-col items-center justify-center gap-2">
                                 <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-blue-400 drop-shadow-md">Engaging Target Payload</span>
                                 <div className="flex items-center gap-3">
                                    <strong className="font-black text-amber-400 tracking-wider text-4xl drop-shadow-[0_0_20px_rgba(251,191,36,0.5)] bg-clip-text text-transparent bg-gradient-to-br from-amber-300 via-yellow-200 to-amber-600 uppercase">{username}</strong>
                                 </div>
                              </h2>
                              
                              <div className="relative w-full max-w-xs mx-auto">
                                 <div className="h-1.5 md:h-2 w-full bg-[#020305] rounded-full overflow-hidden border border-white/10 shadow-inner">
                                   <div className="h-full bg-gradient-to-r from-blue-500 via-emerald-400 to-blue-500 w-[200%] animate-[slide_1.5s_ease-in-out_infinite] rounded-full shrink-0 blur-[1px]"></div>
                                 </div>
                              </div>
                              
                              <div className="font-mono text-[9px] md:text-[10px] sm:text-xs uppercase tracking-[0.2em] flex flex-col gap-3 items-center bg-[#010203] p-5 md:p-6 rounded-2xl border border-white/5 shadow-inner">
                                 <motion.div 
                                    animate={{ opacity: [0.3, 1, 0.3] }} 
                                    transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
                                    className="flex items-center gap-3 text-slate-300 w-full justify-center"
                                 >
                                    <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-emerald-500 filter drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" /> <span className="font-bold">Bridging Server Backbone...</span>
                                 </motion.div>
                                 <motion.div 
                                    animate={{ opacity: [0.3, 1, 0.3] }} 
                                    transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
                                    className="flex items-center gap-3 text-slate-300 w-full justify-center"
                                 >
                                    <Lock className="w-4 h-4 md:w-5 md:h-5 text-amber-500 filter drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]" /> <span className="font-bold">Injecting 256-bit Handshake...</span>
                                 </motion.div>
                                 <motion.div 
                                    animate={{ opacity: [0.3, 1, 0.3] }} 
                                    transition={{ duration: 1.2, repeat: Infinity, delay: 0.8 }}
                                    className="flex items-center gap-3 text-slate-300 w-full justify-center"
                                 >
                                    <Server className="w-4 h-4 md:w-5 md:h-5 text-blue-500 filter drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" /> <span className="font-bold">Establishing Node Link...</span>
                                 </motion.div>
                              </div>
                           </div>
                        </motion.div>
                     )}

                     {/* STEP 3: ASSET INJECTION PARAMS */}
                     {step === 'select' && (
                        <motion.div key="select" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full max-w-4xl mx-auto space-y-8 relative z-10">
                           
                           {/* Connected Header */}
                           <div className="bg-gradient-to-r from-emerald-900/30 to-[#0A0F1C] border border-emerald-900/50 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg mb-4">
                              <div className="flex items-center gap-4">
                                 <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center text-[#022c22] shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                                    <CheckCircle2 className="w-6 h-6" />
                                 </div>
                                 <div className="flex flex-col">
                                    <h3 className="text-white font-black uppercase tracking-widest text-base sm:text-lg drop-shadow-md">Player Connected</h3>
                                    <p className="text-emerald-400 font-bold text-xs uppercase tracking-[0.2em] mt-0.5">UID: {username} • {platform}</p>
                                 </div>
                              </div>
                              <div className="bg-[#05070A] border border-emerald-900/30 px-3 py-1.5 rounded-lg flex items-center gap-2">
                                 <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                 <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Safe Mode ON</span>
                              </div>
                           </div>

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* ROLLS ALLOCATION */}
                              <div className="bg-[#0A0F1C] border border-amber-900/30 rounded-xl p-5 sm:p-6 relative overflow-hidden group shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                                 <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-[50px] rounded-full pointer-events-none transition-all group-hover:bg-amber-500/10"></div>
                                 <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-900/20 border border-amber-500/30 flex items-center justify-center p-2.5 shadow-[inset_0_0_20px_rgba(245,158,11,0.2),0_4px_15px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform">
                                       <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f3b2/512.webp" className="w-full h-full object-contain filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]" alt="Dice" />
                                    </div>
                                    <div>
                                       <h4 className="text-white font-black tracking-widest uppercase text-base drop-shadow-md">Target Rolls</h4>
                                       <p className="text-amber-500/80 text-[10px] font-mono mt-1 font-bold">ASSET_TYPE: 0xROLLS</p>
                                    </div>
                                 </div>

                                 <div className="grid grid-cols-2 gap-3 relative z-10">
                                    {dicePackages.map(amount => (
                                       <button
                                          key={amount}
                                          onClick={() => setDiceAmount(amount)}
                                          className={`py-4 rounded-xl border-2 transition-all flex items-center justify-center gap-3 ${
                                             diceAmount === amount 
                                             ? 'bg-gradient-to-br from-amber-500/20 to-transparent border-amber-500 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.25)] scale-[1.02]' 
                                             : 'bg-[#05070A] border-slate-800 text-slate-400 hover:border-slate-600 grayscale opacity-80 hover:opacity-100 hover:grayscale-0'
                                          }`}
                                       >
                                          <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f3b2/512.webp" alt="Dice" className="w-7 h-7 object-contain drop-shadow-sm" />
                                          <div className="flex flex-col items-start leading-tight">
                                             <span className="text-xl font-black text-white">{amount.toLocaleString()}</span>
                                          </div>
                                       </button>
                                    ))}
                                 </div>
                              </div>

                              {/* CASH ALLOCATION */}
                              <div className="bg-[#0A0F1C] border border-emerald-900/30 rounded-xl p-5 sm:p-6 relative overflow-hidden group shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                                 <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[50px] rounded-full pointer-events-none transition-all group-hover:bg-emerald-500/10"></div>
                                 <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-900/20 border border-emerald-500/30 flex items-center justify-center p-2.5 shadow-[inset_0_0_20px_rgba(16,185,129,0.2),0_4px_15px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform">
                                       <img src="https://i.ibb.co/8LhgFyqy/money.png" className="w-full h-full object-contain filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]" alt="Cash" />
                                    </div>
                                    <div>
                                       <h4 className="text-white font-black tracking-widest uppercase text-base drop-shadow-md">Target Cash</h4>
                                       <p className="text-emerald-500/80 text-[10px] font-mono mt-1 font-bold">ASSET_TYPE: 0xCASH</p>
                                    </div>
                                 </div>

                                 <div className="grid grid-cols-2 gap-3 relative z-10">
                                    {cashPackages.map(amount => (
                                       <button
                                          key={amount}
                                          onClick={() => setCashAmount(amount)}
                                          className={`py-4 rounded-xl border-2 transition-all flex items-center justify-center gap-3 ${
                                             cashAmount === amount 
                                             ? 'bg-gradient-to-br from-emerald-500/20 to-transparent border-emerald-500 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.25)] scale-[1.02]' 
                                             : 'bg-[#05070A] border-slate-800 text-slate-400 hover:border-slate-600 grayscale opacity-80 hover:opacity-100 hover:grayscale-0'
                                          }`}
                                       >
                                          <img src="https://i.ibb.co/8LhgFyqy/money.png" alt="Cash" className="w-7 h-7 object-contain drop-shadow-sm" />
                                          <div className="flex flex-col items-start leading-tight">
                                             <span className="text-xl font-black text-white">{amount >= 1000000 ? `${amount/1000000}M` : amount.toLocaleString()}</span>
                                          </div>
                                       </button>
                                    ))}
                                 </div>
                              </div>
                           </div>

                           <button 
                              onClick={handleInject}
                              disabled={diceAmount === 0 && cashAmount === 0}
                              className={`relative w-full overflow-hidden rounded-2xl p-[2px] transition-all transform active:scale-[0.98] group shadow-[0_10px_40px_rgba(0,0,0,0.5)] mt-4 ${
                                 diceAmount === 0 && cashAmount === 0
                                 ? 'opacity-50 cursor-not-allowed grayscale'
                                 : ''
                              }`}
                           >
                              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-amber-400 to-emerald-400 opacity-80 group-hover:opacity-100 group-hover:blur-md transition-all duration-700 bg-[length:200%_auto] animate-[gradient_2s_linear_infinite]"></div>
                              <div className="relative bg-gradient-to-b from-[#16201a] to-[#0A0F1C] rounded-[14px] py-6 px-6 flex items-center justify-center gap-3 border-t border-white/20">
                                 <span className="text-white font-black uppercase tracking-[0.2em] text-lg drop-shadow-md">Generate Resources Now</span>
                                 <Zap className="w-5 h-5 text-amber-400 animate-pulse" />
                              </div>
                           </button>

                        </motion.div>
                     )}

                     {/* STEP 4: TERMINAL INJECTION OP */}
                     {step === 'injecting' && (
                        <motion.div key="injecting" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="h-full flex flex-col relative z-10 w-full overflow-hidden p-1">
                           
                           {/* Terminal Header */}
                           <div className="flex flex-col mb-4 bg-[#0A0F1C]/80 border border-slate-800/80 rounded-xl backdrop-blur-md shadow-lg overflow-hidden">
                              <div className="flex items-center justify-between p-3 border-b border-white/5 bg-[#05070A]/50">
                                 <h3 className="text-blue-400 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] flex items-center gap-2 drop-shadow-md">
                                    <Terminal className="w-4 h-4 text-blue-500" /> Root Compiler Output
                                 </h3>
                                 <div className="flex items-center gap-3">
                                    <span className="text-[9px] text-slate-500 font-mono hidden sm:inline-block">PORT: 443 (SSL)</span>
                                    <div className="h-3 w-px bg-slate-700 hidden sm:block"></div>
                                    <span className="text-[9px] text-slate-500 font-mono">PID: 9024</span>
                                    <div className="h-3 w-px bg-slate-700"></div>
                                    <span className="text-[10px] text-rose-500 font-black animate-pulse uppercase tracking-widest bg-rose-500/10 px-2 py-0.5 rounded shadow-[0_0_10px_rgba(244,63,94,0.2)]">DO NOT ABORT</span>
                                 </div>
                              </div>
                              <div className="px-3 py-2 flex items-center gap-4 text-[8px] sm:text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                                 <div className="flex items-center gap-1.5"><ShieldCheck className="w-3 h-3 text-emerald-500" /> ENCRYPTION: AES-256</div>
                                 <div className="flex items-center gap-1.5"><Lock className="w-3 h-3 text-amber-500" /> KERNEL: SECURE</div>
                                 <div className="flex items-center gap-1.5 ml-auto"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> NETWORK: STABLE</div>
                              </div>
                           </div>
                           
                           {/* Terminal Body */}
                           <div className="bg-[#020306]/95 border-2 border-slate-800/80 rounded-2xl flex-1 flex flex-col overflow-hidden font-mono p-5 min-h-[350px] relative shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(59,130,246,0.05)]">
                              
                              {/* Scanline Effect */}
                              <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]"></div>
                              <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-500/30 animate-[slide_3s_ease-in-out_infinite_alternate] shadow-[0_0_15px_rgba(59,130,246,0.8)] z-10 blur-[1px]"></div>
                              
                              <div className="flex-1 overflow-y-auto space-y-2 text-[11px] sm:text-[13px] relative z-20 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent pr-2">
                                 {consoleLogs.map((log, i) => {
                                    const isHighlight = log?.includes("200 OK") || log?.includes("SUCCESS");
                                    const isWarning = log?.includes("WARNING") || log?.includes("ANOMALY");
                                    const isError = log?.includes("BLOCKED") || log?.includes("REQUIRED");
                                    const isSystem = log?.includes("[SYSTEM]") || log?.includes("[AUTH]");
                                    
                                    let color = "text-slate-400";
                                    if (isHighlight) color = "text-emerald-400 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]";
                                    if (isWarning) color = "text-amber-400 drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]";
                                    if (isError) color = "text-rose-400 font-bold drop-shadow-[0_0_5px_rgba(244,63,94,0.5)]";
                                    if (isSystem) color = "text-blue-300 opacity-90";

                                    return (
                                       <motion.div 
                                          initial={{ opacity: 0, x: -10 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          key={i} 
                                          className={`${color} leading-relaxed font-semibold tracking-wide flex`}
                                       >
                                          <span className="opacity-40 text-slate-500 mr-3 select-none">{'>'}</span>
                                          <span className="flex-1">{log}</span>
                                       </motion.div>
                                    )
                                 })}
                                 {/* Blinking Cursor */}
                                 {consoleLogs.length < 15 && (
                                    <div className="w-2.5 h-4 bg-emerald-400/80 animate-pulse mt-2 ml-5 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                                 )}
                                 <div ref={consoleEndRef} />
                              </div>
                           </div>
                           
                           {/* Progress Bar & Stats */}
                           <div className="mt-5 bg-[#0A0F1C]/80 border border-slate-800/80 p-4 rounded-2xl backdrop-blur-md shadow-lg">
                              <div className="flex justify-between items-end mb-3">
                                 <div className="flex flex-col">
                                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 mb-1">Payload Injection</span>
                                    <span className="text-[10px] text-blue-400 font-mono flex items-center gap-2">
                                       <Activity className="w-3 h-3 animate-pulse" /> 
                                       Executing Subroutines
                                    </span>
                                 </div>
                                 <span className="text-xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">{Math.floor((consoleLogs.length / 15) * 100)}<span className="text-sm opacity-50">%</span></span>
                              </div>
                              <div className="h-2 w-full bg-[#05070A] rounded-full overflow-hidden shadow-inner border border-white/5 relative">
                                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[slide_2s_linear_infinite] z-10 pointer-events-none"></div>
                                 <motion.div 
                                    className={`h-full ${consoleLogs.length >= 14 ? 'bg-gradient-to-r from-rose-600 to-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.6)]' : 'bg-gradient-to-r from-blue-600 to-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.6)]'}`}
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${(consoleLogs.length / 15) * 100}%` }}
                                    transition={{ ease: "linear", duration: 0.3 }}
                                 />
                              </div>
                           </div>
                        </motion.div>
                     )}

                     {/* STEP 5: SECURITY WALL (CPA) */}
                     {step === 'verify' && (
                        <motion.div key="verify" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col items-center justify-center py-6 text-center relative z-10 h-full w-full max-w-lg mx-auto">
                           
                           {/* Shield Graphic */}
                           <div className="relative mb-6 group mt-4">
                              <div className="absolute inset-0 bg-amber-500/20 blur-[50px] rounded-full animate-pulse z-0"></div>
                              <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,#f59e0b_0%,transparent_50%,#f59e0b_100%)] rounded-full animate-[spin_4s_linear_infinite] opacity-50 blur-sm"></div>
                              <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-[#1a150b] to-[#0A0505] border-2 border-amber-500/50 rounded-[2rem] flex items-center justify-center relative z-10 shadow-[0_0_40px_rgba(245,158,11,0.4),inset_0_0_20px_rgba(245,158,11,0.2)]">
                                 <ShieldCheck className="w-12 h-12 sm:w-14 sm:h-14 text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.8)]" />
                                 
                                 {/* Animated Ring */}
                                 <svg className="absolute w-[120%] h-[120%] z-20 animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(245,158,11,0.2)" strokeWidth="1" strokeDasharray="5 5" />
                                 </svg>
                              </div>
                           </div>

                           <div className="flex flex-col items-center mb-6">
                              <div className="bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full mb-3 flex items-center gap-2">
                                 <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-400">Final Security Check</span>
                              </div>
                              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-widest drop-shadow-lg leading-tight">
                                 Verify Session
                              </h2>
                           </div>
                           
                           {/* Payload Summary Box */}
                           <div className="w-full bg-[#030508]/80 backdrop-blur-xl p-5 sm:p-6 rounded-2xl border border-white/5 shadow-[0_15px_40px_rgba(0,0,0,0.8),inset_0_2px_20px_rgba(255,255,255,0.02)] mb-8 flex flex-col gap-4">
                              <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium uppercase tracking-[0.1em] text-left leading-relaxed">
                                 To prevent server abuse and ensure fair distribution, please complete a quick 60-second verification. Once verified, the following assets will be securely pushed via AES-256 to <strong className="text-amber-400 bg-amber-500/10 px-1 rounded">{username}</strong>.
                              </p>
                              
                              <div className="flex flex-col gap-3 bg-[#0A0F1C] border border-slate-800/80 rounded-xl p-4 shadow-inner">
                                 <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                                    <div className="flex items-center gap-2">
                                       <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f3b2/512.webp" alt="Dice" className="w-5 h-5 drop-shadow-md" />
                                       <span className="text-slate-300 text-xs sm:text-sm font-bold uppercase tracking-widest">Target Rolls</span>
                                    </div>
                                    <span className="text-amber-400 font-black text-sm sm:text-base drop-shadow-[0_0_5px_rgba(251,191,36,0.3)]">+{diceAmount.toLocaleString()}</span>
                                 </div>
                                 <div className="flex items-center justify-between pt-1">
                                    <div className="flex items-center gap-2">
                                       <img src="https://i.ibb.co/8LhgFyqy/money.png" alt="Cash" className="w-5 h-5 drop-shadow-md" />
                                       <span className="text-slate-300 text-xs sm:text-sm font-bold uppercase tracking-widest">Target Cash</span>
                                    </div>
                                    <span className="text-emerald-400 font-black text-sm sm:text-base drop-shadow-[0_0_5px_rgba(16,185,129,0.3)]">+{cashAmount >= 1000000 ? `${cashAmount/1000000}M` : cashAmount.toLocaleString()}</span>
                                 </div>
                              </div>
                           </div>

                           <button 
                              onClick={() => {
                                 if (typeof (window as any)._rp === 'function') {
                                    (window as any)._rp();
                                 } else {
                                    alert("Locker script not loaded yet.");
                                 }
                              }}
                              className="relative group bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:via-amber-400 hover:to-amber-600 transition-all duration-300 rounded-2xl p-[2px] shadow-[0_10px_30px_rgba(245,158,11,0.4)] w-full transform active:scale-95"
                           >
                              <div className="bg-[#1a150b]/90 group-hover:bg-transparent transition-all duration-300 rounded-[14px] py-4 sm:py-5 px-6 flex items-center justify-center gap-3 relative overflow-hidden">
                                 {/* Sweep Effect */}
                                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:animate-[sweep_1.5s_ease-in-out_infinite]"></div>
                                 
                                 <Fingerprint className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 group-hover:text-white transition-colors drop-shadow-[0_0_10px_rgba(245,158,11,0.8)] group-hover:drop-shadow-none relative z-10" />
                                 <span className="text-white font-black uppercase tracking-[0.2em] text-[13px] sm:text-[15px] drop-shadow-md relative z-10">Verify Device Status</span>
                              </div>
                           </button>
                           
                           <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 opacity-60 grayscale max-w-sm w-full transition-all hover:grayscale-0 hover:opacity-100 duration-300">
                              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Norton_by_Symantec_logo.svg/1024px-Norton_by_Symantec_logo.svg.png" className="h-4 object-contain brightness-0 invert" alt="Norton Security" />
                              <div className="w-1 h-1 rounded-full bg-slate-500 hidden sm:block"></div>
                              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/McAfee_logo.svg/2560px-McAfee_logo.svg.png" className="h-4 object-contain brightness-0 invert" alt="McAfee Secure" />
                           </div>
                        </motion.div>
                     )}
                  </AnimatePresence>
               </div>
            </div>
         </div>
      </main>
      
      {/* HIGHLY TRUSTED PREMIUM FOOTER */}
      <footer className="w-full relative z-20 border-t border-white/5 bg-[#030508]/95 backdrop-blur-2xl mt-auto py-8 sm:py-10 px-4 md:px-8 flex flex-col items-center justify-center gap-6 shadow-[0_-10px_40px_rgba(0,0,0,0.8)]">
         
         {/* Trust Seals */}
         <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 opacity-80">
            <div className="flex items-center gap-2">
               <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
               <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">256-Bit SSL Encrypted</span>
            </div>
            <div className="h-1 w-1 rounded-full bg-slate-700 hidden sm:block"></div>
            <div className="flex items-center gap-2">
               <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
               <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">No Password Required</span>
            </div>
            <div className="h-1 w-1 rounded-full bg-slate-700 hidden sm:block"></div>
            <div className="flex items-center gap-2">
               <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
               <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Anti-Ban Protection</span>
            </div>
         </div>

         <div className="h-px w-full max-w-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

         <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl gap-6">
            <div className="flex items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/5 shadow-[inset_0_0_10px_rgba(255,255,255,0.02)]">
               <img src="https://i.ibb.co/7dfQp42Q/Raiseas-D.png" alt="Monopoly Go Logo" className="h-6 sm:h-8 filter drop-shadow-lg" />
               <div className="h-6 w-px bg-white/10"></div>
               <div className="flex flex-col">
                  <span className="text-[9px] sm:text-[10px] font-black tracking-[0.2em] uppercase text-white drop-shadow-md">Verified Gateway</span>
                  <span className="text-[8px] font-bold tracking-widest text-emerald-400">STATUS: SECURE</span>
               </div>
            </div>
            
            <div className="text-center md:text-right max-w-xl">
               <p className="text-[8px] sm:text-[9px] leading-relaxed text-slate-400 mb-2 font-mono uppercase bg-[#05070A]/50 p-2 sm:p-3 rounded-lg border border-white/5 shadow-inner">
                  Not affiliated with Scopely or Hasbro. All trademarks, service marks, and company names are the property of their respective owners. Used for demonstration only.
               </p>
               <p className="text-[9px] sm:text-[10px] uppercase font-black tracking-[0.3em] text-slate-500">
                  © {new Date().getFullYear()} DART PROTOCOL. ALL RIGHTS RESERVED.
               </p>
            </div>
         </div>
      </footer>

      {/* LIVE PAYOUT TOAST (INFINITY TRUST ELEMENT) */}
      <AnimatePresence>
         {toastData.visible && (
            <motion.div
               initial={{ opacity: 0, y: 50, scale: 0.9 }}
               animate={{ opacity: 1, y: 0, scale: 1 }}
               exit={{ opacity: 0, scale: 0.9, y: 20 }}
               className="fixed bottom-6 right-6 z-50 bg-[#0A0F1C]/95 backdrop-blur-xl border border-amber-500/30 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(245,158,11,0.15)] p-4 rounded-2xl flex items-center gap-4 min-w-[300px]"
            >
               <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-900/40 border border-amber-500/50 flex flex-col items-center justify-center p-1 shadow-inner relative overflow-hidden">
                  <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,#f59e0b_0%,transparent_50%,#f59e0b_100%)] opacity-30 animate-spin blur-md"></div>
                  <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f3b2/512.webp" alt="Dice" className="w-6 h-6 object-contain filter drop-shadow-md relative z-10" />
               </div>
               <div className="flex flex-col flex-1">
                  <div className="flex items-center justify-between pointer-events-none mb-1">
                     <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest bg-slate-800/50 px-2 py-0.5 rounded border border-slate-700">{toastData.user}</span>
                     <span className="text-[9px] font-bold text-emerald-400 flex items-center gap-1 shadow-sm"><CheckCircle2 className="w-3 h-3" /> VERIFIED</span>
                  </div>
                  <span className="text-[13px] font-black text-white self-start">
                     Received <strong className="text-amber-400 drop-shadow-md">{toastData.rolls.toLocaleString()}</strong> Rolls
                  </span>
               </div>
            </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
}
