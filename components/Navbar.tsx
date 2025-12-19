
import React from 'react';

interface NavbarProps {
  balance: number;
  onViewChange: (view: 'containers' | 'garage' | 'races') => void;
  currentView: 'containers' | 'garage' | 'races';
  onAddFunds: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ balance, onViewChange, currentView, onAddFunds }) => {
  return (
    <nav className="bg-[#0d1117]/80 backdrop-blur-2xl border-b border-white/10 px-4 md:px-12 py-5 flex flex-wrap justify-between items-center sticky top-0 z-50 shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
      <div 
        className="flex items-center gap-5 cursor-pointer group"
        onClick={() => onViewChange('containers')}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-yellow-500 rounded-2xl blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
          <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 rounded-[18px] flex items-center justify-center transform group-hover:rotate-[20deg] group-hover:scale-110 transition-all duration-500 shadow-2xl relative z-10 border-2 border-white/20">
            <i className="fa-solid fa-car-side text-black text-2xl md:text-3xl"></i>
          </div>
        </div>
        <div className="hidden lg:block">
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-white leading-none">
            CAR<span className="text-yellow-500 italic">PORT</span>
          </h1>
          <p className="text-[9px] font-black text-gray-500 tracking-[0.5em] uppercase opacity-60">Global Export Ops</p>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-8">
        <div className="flex bg-black/50 rounded-2xl p-1.5 border border-white/10 shadow-inner">
          {[
            { id: 'containers', label: 'Порт', icon: 'fa-anchor' },
            { id: 'garage', label: 'Гараж', icon: 'fa-warehouse' },
            { id: 'races', label: 'Гонки', icon: 'fa-flag-checkered' }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => onViewChange(tab.id as any)}
              className={`flex items-center gap-2 px-5 md:px-8 py-3 rounded-xl transition-all text-[10px] md:text-xs font-black tracking-widest uppercase relative group overflow-hidden ${
                currentView === tab.id 
                  ? 'bg-yellow-500 text-black shadow-[0_10px_25px_rgba(234,179,8,0.35)]' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <i className={`fa-solid ${tab.icon} ${currentView === tab.id ? 'opacity-100' : 'opacity-40'}`}></i>
              {tab.label}
              {currentView === tab.id && (
                <div className="absolute inset-0 bg-white/20 -translate-x-full hover:translate-x-full transition-transform duration-700"></div>
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 md:gap-6 bg-black/60 px-5 py-3 rounded-[24px] border border-white/10 shadow-2xl">
          <div className="flex flex-col items-end">
            <span className="text-[9px] text-gray-500 uppercase font-black tracking-[0.2em] leading-none mb-1 opacity-50">Активы</span>
            <span className="text-xl md:text-3xl font-black text-green-400 font-mono tracking-tighter leading-none drop-shadow-[0_0_10px_rgba(74,222,128,0.3)]">
              ${balance.toLocaleString()}
            </span>
          </div>
          <button 
            onClick={onAddFunds}
            className="group relative w-10 h-10 md:w-12 md:h-12 rounded-[14px] bg-yellow-500/10 hover:bg-yellow-500 transition-all duration-500 flex items-center justify-center border-2 border-yellow-500/30 active:scale-90"
          >
            <i className="fa-solid fa-plus text-yellow-500 group-hover:text-black transition-colors text-xl"></i>
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-yellow-500"></span>
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
