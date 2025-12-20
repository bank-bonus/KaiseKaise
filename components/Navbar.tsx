
import React from 'react';

interface NavbarProps {
  balance: number;
  level: number;
  xp: number;
  xpToNext: number;
  onViewChange: (view: 'containers' | 'garage' | 'races') => void;
  currentView: 'containers' | 'garage' | 'races';
  onAddFunds: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ balance, level, xp, xpToNext, onViewChange, currentView, onAddFunds }) => {
  const xpPercent = Math.min((xp / xpToNext) * 100, 100);

  return (
    <nav className="bg-[#0d1117]/95 backdrop-blur-xl border-b border-white/10 sticky top-0 z-[80] shadow-2xl">
      {/* XP Bar Top */}
      <div className="h-1 w-full bg-black/40 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-300 transition-all duration-1000 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
          style={{ width: `${xpPercent}%` }}
        ></div>
      </div>

      <div className="px-3 md:px-8 py-2 md:py-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center cursor-pointer shadow-lg transform active:scale-95 transition-all"
            onClick={() => onViewChange('containers')}
          >
            <i className="fa-solid fa-bolt text-black text-xl"></i>
          </div>
          <div className="hidden sm:block">
             <div className="flex items-center gap-2">
               <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded italic">LVL {level}</span>
               <h1 className="text-xl font-black text-white italic tracking-tighter uppercase leading-none">CAR<span className="text-yellow-500">PORT</span></h1>
             </div>
          </div>
        </div>

        <div className="flex bg-black/50 rounded-xl p-1 border border-white/5">
          {[
            { id: 'containers', icon: 'fa-anchor', label: 'Порт' },
            { id: 'garage', icon: 'fa-warehouse', label: 'Гараж' },
            { id: 'races', icon: 'fa-flag-checkered', label: 'Гонки' }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => onViewChange(tab.id as any)}
              className={`flex items-center gap-2 px-3 md:px-6 py-1.5 md:py-2 rounded-lg transition-all text-[11px] md:text-xs font-black uppercase ${
                currentView === tab.id ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20' : 'text-gray-500'
              }`}
            >
              <i className={`fa-solid ${tab.icon}`}></i>
              <span className="hidden md:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 bg-black/60 px-3 py-1.5 md:py-2 rounded-xl border border-white/10">
          <span className="text-sm md:text-lg font-black text-green-400 font-mono">
            ${balance.toLocaleString()}
          </span>
          <button 
            onClick={onAddFunds}
            className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black transition-all flex items-center justify-center active:scale-90 btn-shine"
          >
            <i className="fa-solid fa-plus text-xs"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
