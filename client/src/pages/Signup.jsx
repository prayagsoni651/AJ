import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Phone, Lock, CreditCard, Sparkles, Loader2, ChevronLeft } from 'lucide-react';
import api from '../utils/api';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', password: '', upi_id: '', ifsc_code: '', bank_holder_name: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Already logged in check
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) navigate('/play');
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await api.post('/api/auth/signup', formData);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            
            navigate('/play');
        } catch (err) {
            setError(err.response?.data?.error || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 mesh-bg relative">
            <button 
                onClick={() => navigate('/')} 
                className="absolute top-8 left-8 w-12 h-12 glass-premium rounded-2xl flex items-center justify-center border-white/5 hover:bg-white/10 transition-all z-[100]"
            >
                <ChevronLeft size={24} className="text-slate-100" />
            </button>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-premium p-8 rounded-[2.5rem] w-full max-w-md border-white/10"
            >
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-500/20 shadow-xl">
                        <Sparkles className="text-emerald-400" size={32} />
                    </div>
                    <h1 className="text-2xl font-black uppercase tracking-tight">Create Account</h1>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Join the Wingo Pro platform</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-rose-500/10 border border-rose-500/20 p-3 rounded-xl text-rose-400 text-xs font-bold text-center">
                            {error}
                        </motion.div>
                    )}
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input 
                                    required
                                    type="text"
                                    disabled={loading}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-emerald-500/50 transition-colors disabled:opacity-50"
                                    placeholder="Enter full name"
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4">Email ID (Login ID)</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input 
                                    required
                                    type="email"
                                    disabled={loading}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-emerald-500/50 transition-colors disabled:opacity-50"
                                    placeholder="name@example.com"
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4">Mobile Number</label>
                        <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input 
                                required
                                type="tel"
                                disabled={loading}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-emerald-500/50 transition-colors disabled:opacity-50"
                                placeholder="+91 00000 00000"
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="p-6 bg-emerald-500/5 rounded-3xl border border-emerald-500/10 space-y-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400/80 mb-2">Banking & Payout Details</p>
                        
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4">Bank Holder Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input 
                                    required
                                    type="text"
                                    disabled={loading}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-emerald-500/50 transition-colors disabled:opacity-50"
                                    placeholder="As per bank record"
                                    onChange={(e) => setFormData({...formData, bank_holder_name: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4">UPI ID</label>
                                <div className="relative">
                                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                    <input 
                                        required
                                        type="text"
                                        disabled={loading}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-emerald-500/50 transition-colors disabled:opacity-50"
                                        placeholder="username@upi"
                                        onChange={(e) => setFormData({...formData, upi_id: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4">IFSC Code</label>
                                <div className="relative">
                                    <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                    <input 
                                        required
                                        type="text"
                                        disabled={loading}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-emerald-500/50 transition-colors disabled:opacity-50"
                                        placeholder="SBIN0001234"
                                        onChange={(e) => setFormData({...formData, ifsc_code: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4">Create Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input 
                                required
                                type="password"
                                disabled={loading}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-emerald-500/50 transition-colors disabled:opacity-50"
                                placeholder="••••••••"
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                            />
                        </div>
                    </div>

                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full py-5 bg-emerald-500 rounded-2xl font-black uppercase text-sm tracking-widest shadow-xl shadow-emerald-500/20 active:scale-95 transition-all mt-6 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : 'Create Account & Play'}
                    </button>
                </form>

                <p className="text-center text-slate-500 text-xs font-bold mt-8 uppercase tracking-widest">
                    Already have an account? <Link to="/login" className="text-emerald-400 ml-1 underline transition-all">Login</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Signup;
