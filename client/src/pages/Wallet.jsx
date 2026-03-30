import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet as WalletIcon, Plus, ArrowUpRight, ArrowDownLeft, ChevronRight, Sparkles, CreditCard, Lock, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

const Wallet = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [balance, setBalance] = useState(user.balance || 0);

    const handleRecharge = () => {
        alert("Recharge functionality coming soon!");
    };

    const handleWithdraw = () => {
        if (balance < 100) return alert("Minimum withdrawal is ₹100");
        alert("Withdrawal request submitted for approval.");
    };

    return (
        <div className="min-h-screen bg-[#070b14] text-slate-100 pb-32 mesh-bg px-4 pt-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto space-y-6">
                
                {/* Header */}
                <div className="flex justify-between items-center mb-8 gap-4">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate(-1)} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all glass-premium border border-white/5">
                            <ChevronLeft size={20} className="text-slate-400" />
                        </button>
                        <h1 className="text-3xl font-black uppercase tracking-tight">Wallet</h1>
                    </div>
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 glass-premium">
                        <WalletIcon className="text-emerald-400" size={24} />
                    </div>
                </div>

                {/* Balance Card */}
                <div className="glass-premium rounded-[2.5rem] p-8 overflow-hidden relative group bg-gradient-to-br from-emerald-500/10 to-transparent">
                    <div className="absolute top-0 right-0 p-6 opacity-30"><Sparkles size={100} className="text-emerald-400" /></div>
                    <div className="space-y-1 mb-8">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Available Balance</p>
                        <h2 className="text-5xl font-black tracking-tight text-white drop-shadow-xl">₹{balance.toLocaleString()}</h2>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={handleRecharge} className="flex-1 px-8 py-5 bg-emerald-500 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-emerald-500/20 active:scale-95 transition-all flex items-center justify-center gap-2">
                            <Plus size={16} /> Recharge
                        </button>
                        <button onClick={handleWithdraw} className="flex-1 px-8 py-5 bg-white/5 border border-white/10 rounded-2xl font-black uppercase text-xs tracking-widest backdrop-blur-xl hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center gap-2">
                            <ArrowUpRight size={16} /> Withdraw
                        </button>
                    </div>
                </div>

                {/* Sub Cards Section */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="glass-premium p-6 rounded-3xl space-y-2 group hover:bg-white/5 transition-colors cursor-pointer">
                        <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center border border-indigo-500/20"><CreditCard size={20} className="text-indigo-400" /></div>
                        <h4 className="text-xs font-black uppercase tracking-widest">Bank Card</h4>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Manage linked cards</p>
                    </div>
                    <div className="glass-premium p-6 rounded-3xl space-y-2 group hover:bg-white/5 transition-colors cursor-pointer">
                        <div className="w-10 h-10 bg-rose-500/20 rounded-xl flex items-center justify-center border border-rose-500/20"><Lock size={20} className="text-rose-400" /></div>
                        <h4 className="text-xs font-black uppercase tracking-widest">Security</h4>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Change PIN & PASS</p>
                    </div>
                </div>

                {/* Transaction History Section */}
                <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 ml-2">Recent Transactions</h3>
                    
                    {/* Examples */}
                    <div className="glass-premium p-4 rounded-2xl flex items-center gap-4 group">
                        <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl"><ArrowDownLeft size={18} /></div>
                        <div className="flex-1">
                            <h5 className="text-xs font-bold uppercase">Recharge Success</h5>
                            <p className="text-[10px] text-slate-500 font-bold">UTR: 3942***1102</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-black text-emerald-400">+ ₹5,000.00</p>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Today 14:20</p>
                        </div>
                    </div>

                    <div className="glass-premium p-4 rounded-2xl flex items-center gap-4 group opacity-80">
                        <div className="p-3 bg-rose-500/20 text-rose-400 rounded-xl"><ArrowUpRight size={18} /></div>
                        <div className="flex-1">
                            <h5 className="text-xs font-bold uppercase">Withdrawal Pending</h5>
                            <p className="text-[10px] text-slate-500 font-bold">SBI **3941</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-black text-slate-300">- ₹1,200.00</p>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Yesterday 09:15</p>
                        </div>
                    </div>
                </div>

            </motion.div>
            <BottomNav />
        </div>
    );
};

export default Wallet;
