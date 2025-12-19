
import React from 'react';

interface NavbarProps {
  balance: number;
  onViewChange: (view: 'containers' | 'garage' | 'races') => void;
  currentView: 'containers' | 'garage' | 'races';
  onAddFunds: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ balance, onViewChange, currentView, onAddFunds }) => {
  return (
    <nav className="bg-[#0d1117]/80 backdrop-blur-xl border-b border-white/5 px-4 md:px-8 py-4 flex flex-wrap justify-between items-center sticky top-0 z-50 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      <div 
        className="flex items-center gap-4 cursor-pointer group"
        onClick={() => onViewChange('containers')}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-yellow-500 rounded blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center transform group-hover:rotate-[15deg] transition-all duration-500 shadow-xl relative z-10">
            <i className="fa-solid fa-car text-black text-xl md:text-2xl"></i>
          </div>
        </div>
        <div className="hidden sm:block">
          <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-white leading-none">
            CAR<span className="text-yellow-500 italic">TYCOON</span>
          </h1>
          <p className="text-[10px] font-bold text-gray-500 tracking-[0.3em] uppercase">Симулятор Экспорта</p>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-6">
        <div className="flex bg-black/40 rounded-xl p-1 border border-white/5 shadow-inner">
          <button 
            onClick={() => onViewChange('containers')}
            className={`px-3 md:px-5 py-2 rounded-lg transition-all text-[10px] md:text-xs font-black tracking-widest uppercase ${
              currentView === 'containers' ? 'bg-yellow-500 text-black shadow-[0_0_20px_rgba(234,179,8,0.3)]' : 'text-gray-500 hover:text-white'
            }`}
          >
            Порт
          </button>
          <button 
            onClick={() => onViewChange('garage')}
            className={`px-3 md:px-5 py-2 rounded-lg transition-all text-[10px] md:text-xs font-black tracking-widest uppercase ${
              currentView === 'garage' ? 'bg-yellow-500 text-black shadow-[0_0_20px_rgba(234,179,8,0.3)]' : 'text-gray-500 hover:text-white'
            }`}
          >
            Гараж
          </button>
          <button 
            onClick={() => onViewChange('races')}
            className={`px-3 md:px-5 py-2 rounded-lg transition-all text-[10px] md:text-xs font-black tracking-widest uppercase ${
              currentView === 'races' ? 'bg-yellow-500 text-black shadow-[0_0_20px_rgba(234,179,8,0.3)]' : 'text-gray-500 hover:text-white'
            }`}
          >
            Гонки
          </button>
        </div>

        <div className="flex items-center gap-3 md:gap-5 bg-black/40 px-3 md:px-5 py-2 rounded-2xl border border-white/5">
          <div className="flex flex-col items-end">
            <span className="text-[8px] text-gray-500 uppercase font-black tracking-widest leading-none mb-1">Баланс</span>
            <span className="text-lg md:text-2xl font-black text-green-400 font-mono tracking-tighter leading-none">
              ${balance.toLocaleString()}
            </span>
          </div>
          <button 
            onClick={onAddFunds}
            className="group relative w-8 h-8 md:w-10 md:h-10 rounded-xl bg-yellow-500/10 hover:bg-yellow-500 transition-all duration-300 flex items-center justify-center border border-yellow-500/30"
          >
            <i className="fa-solid fa-video text-yellow-500 group-hover:text-black transition-colors"></i>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
