import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Sparkles, Loader2, ChevronLeft } from 'lucide-react';
import api from '../utils/api';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // If already logged in, redirect to game
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) navigate('/play');
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await api.post('/api/auth/login', formData);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            
            if (res.data.user.role === 'ADMIN') {
                navigate('/admin');
            } else {
                navigate('/play');
            }
        } catch (err) {
            setError(err.response?.data?.error || "Invalid credentials. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 mesh-bg">
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
                    <h1 className="text-2xl font-black uppercase tracking-tight">Welcome Back</h1>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Login to Wingo Pro</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-rose-500/10 border border-rose-500/20 p-3 rounded-xl text-rose-400 text-xs font-bold text-center">
                            {error}
                        </motion.div>
                    )}
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4">Email Address</label>
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

                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4">Password</label>
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
                        {loading ? <Loader2 className="animate-spin" size={20} /> : 'Secure Login'}
                    </button>
                </form>

                <p className="text-center text-slate-500 text-xs font-bold mt-8 uppercase tracking-widest">
                    Don't have an account? <Link to="/signup" className="text-emerald-400 ml-1 underline transition-all">Sign Up</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
