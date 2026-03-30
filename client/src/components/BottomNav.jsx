import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Trophy, Gamepad2, Wallet, User } from 'lucide-react';

const BottomNav = () => {
    return (
        <nav className="fixed bottom-0 left-0 w-full bg-[#0f172a]/80 backdrop-blur-xl border-t border-white/10 z-[100] pb-6 pt-3 px-4 flex justify-around items-center">
            <NavLink 
                to="/" 
                className={({ isActive }) => `flex flex-col items-center gap-1 transition-all ${isActive ? 'text-emerald-400 scale-110' : 'text-slate-500'}`}
            >
                <Home size={20} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Home</span>
            </NavLink>

            <NavLink 
                to="/activity" 
                className={({ isActive }) => `flex flex-col items-center gap-1 transition-all ${isActive ? 'text-emerald-400 scale-110' : 'text-slate-500'}`}
            >
                <Gamepad2 size={20} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Activity</span>
            </NavLink>

            <NavLink 
                to="/play" 
                className={({ isActive }) => `flex flex-col items-center gap-1 transition-all ${isActive ? 'text-emerald-400 scale-110' : 'text-slate-500'}`}
            >
                <Trophy size={20} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Win Go</span>
            </NavLink>

            <NavLink 
                to="/wallet" 
                className={({ isActive }) => `flex flex-col items-center gap-1 transition-all ${isActive ? 'text-emerald-400 scale-110' : 'text-slate-500'}`}
            >
                <Wallet size={20} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Wallet</span>
            </NavLink>

            <NavLink 
                to="/profile" 
                className={({ isActive }) => `flex flex-col items-center gap-1 transition-all ${isActive ? 'text-emerald-400 scale-110' : 'text-slate-500'}`}
            >
                <User size={20} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Account</span>
            </NavLink>
        </nav>
    );
};

export default BottomNav;
