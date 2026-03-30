import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Wallet, History, Timer, TrendingUp, Info, ChevronRight, Zap, Trophy, Gamepad2, Volume2, VolumeX, User, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { audioManager } from '../utils/audio';
import { useNavigate, Link } from 'react-router-dom';
import api, { API_URL } from '../utils/api';
import BottomNav from '../components/BottomNav';

const socket = io(API_URL);

const RollingDigit = ({ target, duration = 1.5 }) => {
  const [current, setCurrent] = useState(0);
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  useEffect(() => {
    const timer = setTimeout(() => setCurrent(target), 100);
    return () => clearTimeout(timer);
  }, [target]);

  return (
    <div className="relative h-12 w-8 overflow-hidden bg-slate-800/50 rounded-lg flex items-center justify-center border border-white/10">
      <motion.div
        animate={{ y: -target * 48 }}
        transition={{ type: "spring", stiffness: 70, damping: 20, duration }}
        className="absolute top-0 flex flex-col items-center"
      >
        {digits.map(d => (
          <div key={d} className="h-12 flex items-center justify-center font-bold text-3xl">{d}</div>
        ))}
      </motion.div>
    </div>
  );
};

const Wingo = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const navigate = useNavigate();
    
    const [gameState, setGameState] = useState({ timer: 60, periodId: '...', history: [] });
    const [balance, setBalance] = useState(user.balance || 0);
    const [showBetModal, setShowBetModal] = useState(false);
    const [activeBet, setActiveBet] = useState(null);
    const [betAmount, setBetAmount] = useState(10);
    const [showResult, setShowResult] = useState(null);
    const [soundEnabled, setSoundEnabled] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return navigate('/');

        api.get('/api/auth/me')
            .then(res => {
                setBalance(res.data.balance);
                localStorage.setItem('user', JSON.stringify(res.data));
            })
            .catch(() => {
                localStorage.clear();
                navigate('/');
            });

        api.get('/api/history')
            .then(res => setGameState(prev => ({ ...prev, history: res.data })))
            .catch(console.error);

        socket.on('timerUpdate', (data) => {
            setGameState(prev => ({ ...prev, ...data }));
            if (data.timer <= 5 && data.timer > 0) {
                audioManager.playTick();
            }
        });

        socket.on('gameResult', (result) => {
            setShowResult(result);
            audioManager.playWin();
            
            confetti({
                particleCount: 150, spread: 70, origin: { y: 0.6 },
                colors: result.colors.includes('green') ? ['#00b8a9'] : ['#f6416c']
            });

            setTimeout(() => setShowResult(null), 5000);
            
            setGameState(prev => ({
                ...prev,
                history: [result, ...prev.history].slice(0, 10)
            }));
            
            // Sync balance after win
            api.get('/api/auth/me').then(res => setBalance(res.data.balance));
        });

        return () => {
            socket.off('timerUpdate');
            socket.off('gameResult');
        };
    }, [navigate]);

    const handlePlaceBet = async () => {
        if (gameState.timer <= 5) return alert("Bets locked for current period!");
        if (balance < betAmount) return alert("Insufficient balance");
        
        try {
            // Mocking the bet API call for now or integrating if defined
            // await api.post('/api/bet', { selection: activeBet, amount: betAmount });
            setBalance(prev => prev - betAmount);
            setShowBetModal(false);
            audioManager.playClick();
        } catch (err) {
            alert("Betting Error");
        }
    };

    const ColorButton = ({ color, label }) => (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
                setActiveBet(label);
                setShowBetModal(true);
            }}
            className={`relative flex-1 py-5 rounded-2xl font-black uppercase text-sm tracking-tighter shadow-2xl overflow-hidden group ${
                color === 'green' ? 'bg-[#00b8a9] glow-green' :
                color === 'red' ? 'bg-[#f6416c] glow-red' : 'bg-[#9c27b0] glow-violet'
            }`}
        >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            {label}
        </motion.button>
    );

    return (
        <div className="min-h-screen bg-[#070b14] text-slate-100 overflow-x-hidden">
            <div className="mesh-bg" />
            
            <div className="glass-premium p-4 flex justify-between items-center sticky top-0 z-50 rounded-b-3xl mx-2 border-t-0 shadow-2xl">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate('/')} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                        <ChevronLeft size={24} className="text-slate-400" />
                    </button>
                    <div className="flex items-center gap-2 border-l border-white/10 pl-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
                            <Zap size={22} className="text-white fill-white" />
                        </div>
                        <h1 className="text-xl font-black tracking-tighter leading-none">WINGO<br/><span className="text-[10px] text-emerald-400 opacity-80 mt-1 uppercase tracking-widest font-bold">Premium Draw</span></h1>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={toggleSound} className="p-2 transition-colors hover:bg-slate-800 rounded-full text-slate-300">
                        {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} className="text-rose-400" />}
                    </button>
                    <Link to="/profile" className="p-2 transition-colors hover:bg-slate-800 rounded-full bg-slate-800/50">
                        <User size={20} className="text-emerald-400" />
                    </Link>
                </div>
            </div>

            <div className="max-w-md mx-auto py-6 px-4 space-y-6 pb-24">
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass-premium rounded-[2rem] p-8 flex flex-col items-center gap-4 relative">
                    <div className="absolute top-4 right-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-900/50 px-2 py-1 rounded-full border border-white/5 flex items-center gap-1">
                        <Trophy size={10} className="text-amber-400" /> LVL 1
                    </div>
                    <div className="text-center">
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Your Wallet ({user.name})</p>
                        <h2 className="text-4xl font-black tracking-tight text-white drop-shadow-lg">₹{balance.toLocaleString()}</h2>
                    </div>
                </motion.div>

                <div className="glass-premium rounded-[2rem] p-6 relative">
                    <div className="flex justify-between items-end mb-6">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`w-2 h-2 rounded-full ${gameState.timer <= 5 ? 'bg-rose-500' : 'bg-emerald-500 animate-pulse'}`} />
                                <p className={`${gameState.timer <= 5 ? 'text-rose-400' : 'text-emerald-400'} text-[10px] uppercase tracking-[0.2em] font-black`}>Live Monitor</p>
                            </div>
                            <p className="text-slate-400 text-[10px] uppercase font-bold opacity-50">Current Period</p>
                            <h3 className="text-xl font-black">{gameState.periodId}</h3>
                        </div>
                        <div className="text-right">
                            <p className="text-slate-400 text-[10px] uppercase font-bold opacity-50 mb-1">Closing In</p>
                            <div className={`text-4xl font-black flex items-baseline gap-1 ${gameState.timer <= 5 ? 'text-rose-500' : 'text-emerald-400'}`}>
                                <span className="text-xs opacity-50">00:</span>
                                {gameState.timer.toString().padStart(2, '0')}
                            </div>
                        </div>
                    </div>
                    
                    <div className="h-2 bg-slate-900/80 rounded-full p-[2px] overflow-hidden border border-white/5">
                        <motion.div 
                            className={`h-full ${gameState.timer <= 5 ? 'bg-rose-500' : 'bg-gradient-to-r from-emerald-400 to-rose-500'}`}
                            initial={{ width: "100%" }}
                            animate={{ width: `${(gameState.timer / 60) * 100}%` }}
                            transition={{ ease: "linear", duration: 1 }}
                        />
                    </div>
                </div>

                <div className="space-y-2 relative">
                    {gameState.timer <= 5 && (
                        <div className="absolute inset-0 z-10 glass-premium rounded-3xl flex items-center justify-center p-4">
                            <h2 className="text-2xl font-black tracking-widest uppercase text-rose-500 animate-pulse">Bets Locked</h2>
                        </div>
                    )}
                    <div className="flex gap-3">
                        <ColorButton color="green" label="Green" />
                        <ColorButton color="violet" label="Violet" />
                        <ColorButton color="red" label="Red" />
                    </div>

                    <div className="grid grid-cols-5 gap-3 pt-2">
                        {[...Array(10).keys()].map(num => (
                            <motion.button 
                                key={num} 
                                whileHover={{ scale: 1.1 }} 
                                whileTap={{ scale: 0.9 }} 
                                onClick={() => {
                                    setActiveBet(`Number ${num}`);
                                    setShowBetModal(true);
                                }} 
                                className={`aspect-square rounded-2xl font-black text-xl glass-premium border-white/5 flex items-center justify-center ${
                                    [1, 3, 7, 9].includes(num) ? 'text-emerald-400' : [2, 4, 6, 8].includes(num) ? 'text-rose-400' : num === 0 ? 'text-violet-400' : 'text-slate-200'
                                }`}
                            >
                                {num}
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* History */}
                <div className="glass-premium rounded-[2rem] p-6">
                    <h3 className="font-black text-sm uppercase flex items-center gap-2 mb-6"><History size={16} className="text-emerald-400" /> Draw History</h3>
                    <div className="space-y-3">
                        <AnimatePresence>
                            {gameState.history.map(h => (
                                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} key={h.periodId} className="flex justify-between items-center p-4 rounded-2xl bg-white/5">
                                    <span className="text-[10px] font-black font-mono text-slate-500">{h.periodId}</span>
                                    <div className="flex items-center gap-4">
                                        <span className={`text-[10px] font-black uppercase ${h.size === 'Big' ? 'text-rose-400' : 'text-emerald-400'}`}>{h.size}</span>
                                        <div className="flex items-center gap-3">
                                            <div className="flex -space-x-1">
                                                {h.colors.map(c => <div key={c} className={`w-3 h-3 rounded-full border-2 border-[#070b14] ${c === 'green' ? 'bg-[#00b8a9]' : c === 'red' ? 'bg-[#f6416c]' : 'bg-[#9c27b0]'}`} />)}
                                            </div>
                                            <span className="font-black text-xl w-6 text-center">{h.number || h.resultNumber}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {showBetModal && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-[#070b14]/90 backdrop-blur-md z-[200] flex items-end sm:items-center justify-center p-4"
                        onClick={() => setShowBetModal(false)}
                    >
                        <motion.div 
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 100, opacity: 0 }}
                            className="w-full max-w-sm glass-premium rounded-[2.5rem] p-8 space-y-6"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between border-b border-white/5 pb-4">
                                <h3 className="text-xl font-black uppercase tracking-tight">Select {activeBet}</h3>
                                <div className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
                                    Period: {gameState.periodId.slice(-4)}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Pick Amount</p>
                                <div className="grid grid-cols-4 gap-2">
                                    {[10, 100, 1000, 10000].map(amt => (
                                        <button 
                                            key={amt}
                                            onClick={() => setBetAmount(amt)}
                                            className={`py-3 rounded-xl font-bold text-xs transition-all border ${betAmount === amt ? 'bg-emerald-500 border-emerald-400 text-black shadow-lg shadow-emerald-500/20' : 'bg-white/5 border-white/10 text-slate-400'}`}
                                        >
                                            {amt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Total Bet</span>
                                    <span className="text-xl font-black">₹{betAmount.toLocaleString()}</span>
                                </div>
                                <button 
                                    onClick={handlePlaceBet}
                                    className="w-full py-5 bg-emerald-500 rounded-2xl font-black uppercase text-sm tracking-widest text-black shadow-xl shadow-emerald-500/20 active:scale-95 transition-all"
                                >
                                    Confirm order
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showResult && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-xl">
                        <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="glass-premium rounded-[3rem] p-10 flex flex-col items-center gap-6 max-w-xs text-center">
                            <h2 className="text-xs uppercase font-black text-emerald-400">Draw Result</h2>
                            <RollingDigit target={showResult.resultNumber} />
                            <p className="text-4xl font-black text-white">{showResult.size}</p>
                            <button onClick={() => setShowResult(null)} className="mt-4 w-full py-4 bg-emerald-500 rounded-3xl font-black shadow-xl text-white">Confirm</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <BottomNav />
        </div>
    );
};

export default Wingo;
