import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Award, TrendingUp, Users, ChevronRight, Sparkles, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

const Activity = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-[#070b14] text-slate-100 pb-32 mesh-bg px-4 pt-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto space-y-6">
                
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <button onClick={() => navigate(-1)} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all glass-premium border border-white/5">
                        <ChevronLeft size={20} className="text-slate-400" />
                    </button>
                    <div className="text-right">
                        <h1 className="text-2xl font-black uppercase tracking-tight">Activity</h1>
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Boost earnings with rewards</p>
                    </div>
                </div>

                {/* Promotion Card */}
                <div className="glass-premium rounded-[2.5rem] p-8 overflow-hidden relative group">
                    <div className="absolute top-0 right-0 p-6 opacity-20"><Gift size={80} className="text-emerald-400 group-hover:scale-110 transition-transform" /></div>
                    <h2 className="text-2xl font-black mb-2">Refer & Earn</h2>
                    <p className="text-slate-400 text-sm mb-6 max-w-[200px]">Invite friends and get up to ₹1,000 bonus on their first deposit!</p>
                    <button className="px-8 py-4 bg-emerald-500 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl active:scale-95 transition-all">
                        Invite Now
                    </button>
                </div>

                {/* VIP Card */}
                <div className="glass-premium rounded-[2.5rem] p-8 overflow-hidden relative">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-amber-500/20 rounded-2xl flex items-center justify-center border border-amber-500/20">
                            <Award className="text-amber-400" size={24} />
                        </div>
                        <div>
                            <h3 className="font-black uppercase tracking-tight">VIP Rewards</h3>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none mt-1">Unlock daily cashback</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="p-4 bg-white/5 rounded-2xl flex justify-between items-center border border-white/5">
                            <div className="flex items-center gap-3">
                                <TrendingUp className="text-emerald-400" size={16} />
                                <span className="text-sm font-bold">Daily Cashback</span>
                            </div>
                            <span className="text-emerald-400 font-black">0.5%</span>
                        </div>
                        <div className="p-4 bg-white/5 rounded-2xl flex justify-between items-center border border-white/5">
                            <div className="flex items-center gap-3">
                                <Users className="text-blue-400" size={16} />
                                <span className="text-sm font-bold">Referral Rebate</span>
                            </div>
                            <span className="text-blue-400 font-black">2.0%</span>
                        </div>
                    </div>
                </div>

                {/* Latest Activity Feed */}
                <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 ml-2">Recent Winners</h3>
                    {[1, 2, 3].map(i => (
                        <motion.div key={i} className="glass-premium p-4 rounded-2xl flex items-center gap-4 hover:scale-[1.01] transition-transform">
                            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center font-bold">P{i}</div>
                            <div className="flex-1">
                                <p className="text-xs font-bold">Player_***{500+i}</p>
                                <p className="text-[10px] text-slate-500 font-bold">Win Go 1Min</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-black text-emerald-400">+ ₹{200 * i * 5}.00</p>
                                <p className="text-[10px] text-slate-500 font-bold uppercase">Just now</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </motion.div>
            <BottomNav />
        </div>
    );
};

export default Activity;
