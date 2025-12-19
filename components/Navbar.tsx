
import React from 'react';

interface NavbarProps {
  balance: number;
  onViewChange: (view: 'containers' | 'garage' | 'races') => void;
  currentView: 'containers' | 'garage' | 'races';
  onAddFunds: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ balance, onViewChange, currentView, onAddFunds }) => {
  return (
    <nav className="bg-[#0d1117]/90 backdrop-blur-xl border-b border-white/10 px-3 md:px-12 py-3 md:py-5 flex flex-wrap justify-between items-center sticky top-0 z-50 shadow-2xl">
      <div 
        className="flex items-center gap-3 cursor-pointer group scale-90 md:scale-100"
        onClick={() => onViewChange('containers')}
      >
        <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-all">
          <i className="fa-solid fa-car-side text-black text-xl md:text-3xl"></i>
        </div>
        <div className="hidden sm:block">
          <h1 className="text-xl md:text-3xl font-black tracking-tighter text-white uppercase italic">
            CAR<span className="text-yellow-500">PORT</span>
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-8">
        <div className="flex bg-black/40 rounded-xl p-1 border border-white/5">
          {[
            { id: 'containers', icon: 'fa-anchor' },
            { id: 'garage', icon: 'fa-warehouse' },
            { id: 'races', icon: 'fa-flag-checkered' }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => onViewChange(tab.id as any)}
              className={`px-3 md:px-6 py-2 rounded-lg transition-all text-[14px] md:text-xs font-black uppercase tracking-widest ${
                currentView === tab.id ? 'bg-yellow-500 text-black shadow-lg' : 'text-gray-500'
              }`}
            >
              <i className={`fa-solid ${tab.icon} md:mr-2`}></i>
              <span className="hidden md:inline">{tab.id === 'containers' ? 'Порт' : tab.id === 'garage' ? 'Гараж' : 'Гонки'}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 bg-black/60 px-3 md:px-5 py-2 rounded-xl border border-white/10">
          <span className="text-sm md:text-2xl font-black text-green-400 font-mono tracking-tighter">
            ${balance.toLocaleString()}
          </span>
          <button 
            onClick={onAddFunds}
            className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-yellow-500/20 hover:bg-yellow-500 text-yellow-500 hover:text-black transition-all flex items-center justify-center active:scale-90"
          >
            <i className="fa-solid fa-plus text-xs md:text-base"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
