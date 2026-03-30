import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { User, LogOut, Wallet, ChevronLeft, CreditCard, Mail, Phone, Trophy } from 'lucide-react';
import api from '../utils/api';
import BottomNav from '../components/BottomNav';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('user') || '{}'));

    React.useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return navigate('/login');

        api.get('/api/auth/me')
            .then(res => {
                setUser(res.data);
                localStorage.setItem('user', JSON.stringify(res.data));
            })
            .catch(() => {
                localStorage.clear();
                navigate('/login');
            });
    }, [navigate]);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-[#070b14] text-slate-100 overflow-x-hidden pt-6 px-4 pb-24 mesh-bg">
            <div className="max-w-md mx-auto space-y-6">
                
                {/* Header */}
                <div className="flex items-center justify-between">
                    <button onClick={() => navigate(-1)} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all glass-premium border border-white/5">
                        <ChevronLeft size={20} className="text-slate-400" />
                    </button>
                    <h1 className="text-sm font-black uppercase tracking-widest text-emerald-400">My Profile</h1>
                    <button onClick={handleLogout} className="p-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-2xl transition-all glass-premium border border-rose-500/20">
                        <LogOut size={20} />
                    </button>
                </div>

                {/* Main Card */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-premium rounded-[2.5rem] p-8 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-emerald-500/20 to-transparent -z-10" />
                    
                    <div className="w-24 h-24 bg-emerald-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-emerald-500/30 shadow-2xl rotate-3">
                        <User size={40} className="text-emerald-400 -rotate-3" />
                    </div>
                    
                    <h2 className="text-3xl font-black uppercase tracking-tight">{user.name || 'User'}</h2>
                    <div className="flex items-center justify-center gap-2 mt-2 text-slate-400">
                        <Trophy size={14} className="text-amber-400" />
                        <span className="text-xs font-bold uppercase tracking-widest">Level 1 Player</span>
                    </div>

                    <div className="mt-8 p-6 bg-slate-900/50 rounded-3xl border border-white/5">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Total Balance</p>
                        <h3 className="text-4xl font-black text-emerald-400">₹{user.balance?.toLocaleString() || '0'}</h3>
                    </div>
                </motion.div>

                {/* Details List */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-premium rounded-[2rem] p-4 space-y-2">
                    <div className="flex items-center gap-4 p-4 hover:bg-white/5 rounded-2xl transition-colors">
                        <div className="p-3 bg-violet-500/20 text-violet-400 rounded-xl"><Mail size={18} /></div>
                        <div className="flex-1">
                            <p className="text-[10px] uppercase font-black tracking-widest text-slate-500">Email</p>
                            <p className="font-bold">{user.email || 'user@example.com'}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 hover:bg-white/5 rounded-2xl transition-colors">
                        <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl"><Phone size={18} /></div>
                        <div className="flex-1">
                            <p className="text-[10px] uppercase font-black tracking-widest text-slate-500">Phone</p>
                            <p className="font-bold">{user.phone || '+91 -'}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 hover:bg-white/5 rounded-2xl transition-colors">
                        <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-xl"><User size={18} /></div>
                        <div className="flex-1">
                            <p className="text-[10px] uppercase font-black tracking-widest text-slate-500">Bank Holder Name</p>
                            <p className="font-bold">{user.bank_holder_name || user.name || 'Not Set'}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 hover:bg-white/5 rounded-2xl transition-colors">
                        <div className="p-3 bg-rose-500/20 text-rose-400 rounded-xl"><CreditCard size={18} /></div>
                        <div className="flex-1">
                            <p className="text-[10px] uppercase font-black tracking-widest text-slate-500">UPI ID / IFSC</p>
                            <p className="font-bold font-mono text-xs">{user.upi_id || 'N/A'} {user.ifsc_code ? `| ${user.ifsc_code}` : ''}</p>
                        </div>
                    </div>
                </motion.div>

                {user.role === 'ADMIN' && (
                    <Link to="/admin" className="block w-full py-5 bg-gradient-to-r from-rose-500 to-violet-500 rounded-2xl font-black uppercase text-sm tracking-widest text-center shadow-xl hover:scale-[1.02] transition-transform">
                        Access Admin Panel
                    </Link>
                )}

            </div>
            <BottomNav />
        </div>
    );
};

export default Profile;
