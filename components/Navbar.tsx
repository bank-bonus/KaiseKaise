
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
  const xpRemaining = xpToNext - xp;

  return (
    <nav className="bg-[#0d1117]/95 backdrop-blur-xl border-b border-white/10 sticky top-0 z-[80] shadow-2xl">
      {/* Улучшенный XP Bar Top */}
      <div className="h-1.5 w-full bg-black/40 overflow-hidden relative">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500 transition-all duration-1000 shadow-[0_0_15px_rgba(59,130,246,0.6)] relative"
          style={{ width: `${xpPercent}%` }}
        >
          {/* Эффект бегущего блика по XP бару */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full h-full animate-[shine_2s_infinite]"></div>
        </div>
      </div>

      <div className="px-3 md:px-8 py-2 md:py-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          {/* Уровень игрока */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-blue-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative w-10 h-10 bg-[#1a1f2e] border border-blue-500/30 rounded-xl flex flex-col items-center justify-center shadow-lg">
              <span className="text-[8px] font-black text-blue-400 uppercase leading-none">LVL</span>
              <span className="text-lg font-black text-white leading-none">{level}</span>
            </div>
          </div>

          <div className="hidden sm:flex flex-col">
             <h1 className="text-xl font-black text-white italic tracking-tighter uppercase leading-none">
               CAR<span className="text-yellow-500">PORT</span>
             </h1>
             <div className="flex items-center gap-2 mt-1">
               <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">
                 XP: <span className="text-blue-400">{xp.toLocaleString()}</span> / {xpToNext.toLocaleString()}
               </span>
               <span className="text-[9px] font-black text-gray-600 uppercase italic">
                 (осталось {xpRemaining.toLocaleString()})
               </span>
             </div>
          </div>
        </div>

        {/* Переключатель вкладок */}
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
                currentView === tab.id 
                  ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20' 
                  : 'text-gray-500 hover:text-white'
              }`}
            >
              <i className={`fa-solid ${tab.icon}`}></i>
              <span className="hidden md:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Баланс */}
        <div className="flex items-center gap-2 bg-black/60 px-3 py-1.5 md:py-2 rounded-xl border border-white/10">
          <div className="flex flex-col items-end mr-1 md:mr-2">
             <span className="text-xs md:text-lg font-black text-green-400 font-mono leading-none">
               ${balance.toLocaleString()}
             </span>
             <span className="text-[7px] font-black text-gray-500 uppercase tracking-widest mt-1 hidden md:block">Валюта</span>
          </div>
          <button 
            onClick={onAddFunds}
            className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black transition-all flex items-center justify-center active:scale-90 shadow-lg btn-shine"
          >
            <i className="fa-solid fa-plus text-xs"></i>
          </button>
        </div>
      </div>
      
      {/* Мобильная подпись XP (видна только на мобайле под меню) */}
      <div className="sm:hidden w-full px-3 py-1 border-t border-white/5 bg-black/20 flex justify-between">
         <span className="text-[8px] font-black text-gray-500 uppercase tracking-tighter">ПРОГРЕСС: {xpPercent.toFixed(0)}%</span>
         <span className="text-[8px] font-black text-blue-400 uppercase tracking-tighter">{xp.toLocaleString()} / {xpToNext.toLocaleString()} XP</span>
      </div>
    </nav>
  );
};

export default Navbar;
