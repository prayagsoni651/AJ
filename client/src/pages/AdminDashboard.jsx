import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Users, Settings, LogOut, CheckCircle, AlertCircle, RefreshCw, ChevronLeft } from 'lucide-react';
import api from '../utils/api';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [resultNumber, setResultNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (!token || user.role !== 'ADMIN') return navigate('/');

        const fetchUsers = async () => {
            try {
                const res = await api.get('/api/admin/users');
                setUsers(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchUsers();
    }, [navigate]);

    return (
        <div className="min-h-screen pb-32 pt-8 px-4 mesh-bg text-slate-100 overflow-x-hidden">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-8">
                
                {/* Header */}
                <div className="flex justify-between items-center bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2.5rem] shadow-2xl gap-4">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/')} className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors shadow-2xl">
                            <ChevronLeft size={24} className="text-rose-400" />
                        </button>
                        <div className="w-12 h-12 bg-rose-500/20 rounded-2xl flex items-center justify-center border border-rose-500/30 shadow-lg shadow-rose-500/20">
                            <Users size={24} className="text-rose-400" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black uppercase tracking-tight">Admin Console</h1>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none mt-1">Platform Control Center</p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center">
                        <button onClick={() => navigate('/play')} className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors shadow-lg shadow-emerald-500/10">
                            <Gamepad2 size={20} className="text-emerald-400" />
                        </button>
                        <button onClick={() => navigate('/')} className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors">
                            <LogOut size={20} className="text-slate-400" />
                        </button>
                    </div>
                </div>

                {/* Game Control Section */}
                <div className="glass-premium rounded-[2.5rem] p-8 space-y-6">
                    <div className="flex items-center gap-3">
                        <RefreshCw className="text-emerald-400 animate-spin-slow" size={20} />
                        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-300">Set Next Game Result</h2>
                    </div>
                    <form onSubmit={async (e) => {
                        e.preventDefault();
                        setLoading(true);
                        try {
                            await api.post('/api/admin/set-result', { number: resultNumber });
                            alert(`Next result fixed: ${resultNumber}`);
                        } catch (err) {
                            alert("Control Error");
                        } finally {
                            setLoading(false);
                            setResultNumber('');
                        }
                    }} className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 grid grid-cols-5 gap-2">
                            {[0,1,2,3,4,5,6,7,8,9].map(num => (
                                <button
                                    key={num}
                                    type="button"
                                    onClick={() => setResultNumber(num)}
                                    className={`aspect-square sm:aspect-auto sm:h-12 rounded-xl font-bold transition-all border ${resultNumber === num ? 'bg-emerald-500 border-emerald-400 shadow-lg shadow-emerald-500/40 text-black' : 'bg-white/5 border-white/10 text-slate-400'}`}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>
                        <button disabled={loading || resultNumber === ''} type="submit" className="sm:w-40 h-14 sm:h-auto bg-emerald-500 rounded-2xl font-black uppercase text-xs tracking-widest text-black shadow-xl shadow-emerald-500/20 active:scale-95 transition-all disabled:opacity-50">
                            Set Now
                        </button>
                    </form>
                </div>

                {/* Users List Section */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Registered Users ({users.length})</h2>
                    </div>

                    {/* Hidden on desktop table, shown on mobile cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                        {users.map(u => (
                            <motion.div 
                                key={u.id}
                                className="glass-premium p-6 rounded-[2rem] flex flex-col sm:flex-row gap-4 sm:items-center hover:scale-[1.01] transition-transform"
                            >
                                <div className="flex items-center gap-4 flex-1">
                                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center font-black text-xs text-blue-400 border border-white/5">
                                        #{u.id}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-100">{u.name}</h3>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{u.email}</p>
                                    </div>
                                </div>
                                <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 border-white/5 pt-4 sm:pt-0">
                                    <div className="text-lg font-black text-emerald-400">₹{u.balance.toLocaleString()}</div>
                                    <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest sm:mt-1">{u.phone}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminDashboard;
