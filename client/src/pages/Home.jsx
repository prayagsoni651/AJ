import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Trophy, Shield, Coins, ArrowRight, Sparkles, Gamepad2 } from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    // Auto-redirect if already logged in
    React.useEffect(() => {
        if (token) {
            if (user.role === 'ADMIN') navigate('/admin');
            else navigate('/play');
        }
    }, [token, user.role, navigate]);

    // Features Section Data
    const features = [
        { icon: <Trophy className="text-emerald-400" size={24} />, title: "Win Big", desc: "Highest multiplier in the game industry." },
        { icon: <Shield className="text-blue-400" size={24} />, title: "Secure", desc: "Advanced encryption for your wallet. (SSL Protected)" },
        { icon: <Coins className="text-amber-400" size={24} />, title: "Instant", desc: "Fastest withdrawal processing under 2 minutes." }
    ];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 mesh-bg text-white overflow-hidden">
            {/* Hero Section */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl w-full text-center z-10"
            >
                {/* Floating Badge */}
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full mb-8 text-xs font-black uppercase tracking-[0.2em] shadow-2xl"
                >
                    <Sparkles size={14} className="text-emerald-400 animate-pulse" />
                    <span>Premium Betting Experience</span>
                </motion.div>

                {/* Main Heading with Gradient */}
                <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight tracking-tighter">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500 drop-shadow-2xl">WINGO</span>
                    <br />
                    <span className="text-white drop-shadow-sm">PRO GAMES</span>
                </h1>

                <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-md mx-auto font-medium leading-relaxed">
                    The most advanced, fast-paced and rewarding color prediction platform ever built.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col gap-4 justify-center items-center mb-12 px-4 w-full max-w-md mx-auto">
                    {token ? (
                        <button 
                            onClick={() => navigate('/play')}
                            className="w-full px-10 py-5 bg-emerald-500 rounded-2xl font-black uppercase text-sm tracking-widest shadow-2xl shadow-emerald-500/40 active:scale-95 transition-all flex items-center justify-center gap-3 group"
                        >
                            <Gamepad2 size={20} />
                            Enter Game Dashboard
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    ) : (
                        <>
                            <button 
                                onClick={() => navigate('/signup')}
                                className="w-full px-10 py-5 bg-emerald-500 rounded-2xl font-black uppercase text-sm tracking-widest shadow-2xl shadow-emerald-500/40 active:scale-95 transition-all flex items-center justify-center gap-3 group"
                            >
                                <Gamepad2 size={20} />
                                Join & Play Now
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            
                            <div className="flex flex-col sm:flex-row gap-3 w-full">
                                <button 
                                    onClick={() => navigate('/login')}
                                    className="flex-1 px-8 py-5 bg-white/5 border border-white/10 rounded-2xl font-black uppercase text-[10px] tracking-widest backdrop-blur-xl hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center gap-2"
                                >
                                    User Login
                                </button>
                                <button 
                                    onClick={() => navigate('/login')} // Admin also uses the same login page
                                    className="flex-1 px-8 py-5 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-2xl font-black uppercase text-[10px] tracking-widest backdrop-blur-xl hover:bg-rose-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                                >
                                    <Shield size={14} />
                                    Admin Portal
                                </button>
                            </div>
                        </>
                    )}
                </div>

                {/* Stats / Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {features.map((f, i) => (
                        <motion.div 
                            key={i}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 + i * 0.1 }}
                            className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm text-left group hover:border-emerald-500/30 transition-all"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                {f.icon}
                            </div>
                            <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                            <p className="text-slate-500 text-sm font-medium">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Background elements (decoration) */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 overflow-hidden">
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500 blur-[150px] rounded-full animate-blob"></div>
                <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500 blur-[150px] rounded-full animate-blob animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full"></div>
            </div>
        </div>
    );
};

export default Home;
