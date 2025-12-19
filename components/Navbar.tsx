
import React from 'react';

interface NavbarProps {
  balance: number;
  onViewChange: (view: 'containers' | 'garage' | 'races') => void;
  currentView: 'containers' | 'garage' | 'races';
  onAddFunds: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ balance, onViewChange, currentView, onAddFunds }) => {
  return (
    <nav className="bg-[#0d1117]/95 backdrop-blur-xl border-b border-white/10 px-3 md:px-8 py-2 md:py-4 flex flex-row justify-between items-center sticky top-0 z-50 shadow-2xl">
      <div 
        className="flex items-center gap-2 cursor-pointer group shrink-0"
        onClick={() => onViewChange('containers')}
      >
        <div className="w-9 h-9 md:w-12 md:h-12 bg-gradient-to-br from-yellow-400 to-yellow-700 rounded-lg flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all">
          <i className="fa-solid fa-car-side text-black text-xl md:text-2xl"></i>
        </div>
        <h1 className="hidden sm:block text-xl md:text-2xl font-black text-white italic tracking-tighter uppercase">
          CAR<span className="text-yellow-500">PORT</span>
        </h1>
      </div>

      <div className="flex bg-black/40 rounded-xl p-1 border border-white/5 mx-2 overflow-hidden">
        {[
          { id: 'containers', icon: 'fa-anchor', label: 'Порт' },
          { id: 'garage', icon: 'fa-warehouse', label: 'Гараж' },
          { id: 'races', icon: 'fa-flag-checkered', label: 'Гонки' }
        ].map((tab) => (
          <button 
            key={tab.id}
            onClick={() => onViewChange(tab.id as any)}
            className={`flex items-center gap-2 px-3 md:px-6 py-1.5 md:py-2 rounded-lg transition-all text-[11px] md:text-xs font-black uppercase tracking-widest ${
              currentView === tab.id ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20' : 'text-gray-500 hover:text-white'
            }`}
          >
            <i className={`fa-solid ${tab.icon}`}></i>
            <span className="hidden lg:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 bg-black/60 px-3 py-1.5 md:py-2 rounded-xl border border-white/10 shrink-0">
        <span className="text-sm md:text-xl font-black text-green-400 font-mono tracking-tighter">
          ${balance.toLocaleString()}
        </span>
        <button 
          onClick={onAddFunds}
          className="w-7 h-7 md:w-9 md:h-9 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black transition-all flex items-center justify-center active:scale-90 shadow-lg btn-shine"
        >
          <i className="fa-solid fa-plus text-xs md:text-base"></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
