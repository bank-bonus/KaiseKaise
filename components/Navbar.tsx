
import React from 'react';

interface NavbarProps {
  balance: number;
  onViewChange: (view: 'cases' | 'inventory') => void;
  currentView: 'cases' | 'inventory';
  onAddFunds: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ balance, onViewChange, currentView, onAddFunds }) => {
  return (
    <nav className="bg-[#0d1117]/80 backdrop-blur-xl border-b border-white/5 px-8 py-4 flex flex-wrap justify-between items-center sticky top-0 z-50 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      <div 
        className="flex items-center gap-4 cursor-pointer group"
        onClick={() => onViewChange('cases')}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-yellow-500 rounded blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center transform group-hover:rotate-[15deg] transition-all duration-500 shadow-xl relative z-10">
            <i className="fa-solid fa-bolt-lightning text-black text-2xl"></i>
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-white leading-none">
            GLOBAL<span className="text-yellow-500 italic">STRIKE</span>
          </h1>
          <p className="text-[10px] font-bold text-gray-500 tracking-[0.3em] uppercase">Elite Case Sim</p>
        </div>
      </div>

      <div className="flex items-center gap-10">
        <div className="flex bg-black/40 rounded-xl p-1.5 border border-white/5 shadow-inner">
          <button 
            onClick={() => onViewChange('cases')}
            className={`px-6 py-2 rounded-lg transition-all text-xs font-black tracking-widest uppercase ${
              currentView === 'cases' ? 'bg-yellow-500 text-black shadow-[0_0_20px_rgba(234,179,8,0.3)]' : 'text-gray-500 hover:text-white'
            }`}
          >
            <i className="fa-solid fa-cart-shopping mr-2"></i> Store
          </button>
          <button 
            onClick={() => onViewChange('inventory')}
            className={`px-6 py-2 rounded-lg transition-all text-xs font-black tracking-widest uppercase ${
              currentView === 'inventory' ? 'bg-yellow-500 text-black shadow-[0_0_20px_rgba(234,179,8,0.3)]' : 'text-gray-500 hover:text-white'
            }`}
          >
            <i className="fa-solid fa-shield-halved mr-2"></i> Storage
          </button>
        </div>

        <div className="flex items-center gap-5 bg-black/40 px-5 py-2 rounded-2xl border border-white/5">
          <div className="flex flex-col items-end">
            <span className="text-[9px] text-gray-500 uppercase font-black tracking-widest leading-none mb-1">Available Funds</span>
            <span className="text-2xl font-black text-green-400 font-mono tracking-tighter leading-none">
              ${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <button 
            onClick={onAddFunds}
            className="group relative w-10 h-10 rounded-xl bg-green-500/10 hover:bg-green-500 transition-all duration-300 flex items-center justify-center border border-green-500/30"
          >
            <i className="fa-solid fa-plus text-green-500 group-hover:text-black transition-colors"></i>
            <div className="absolute inset-0 rounded-xl bg-green-500 blur-lg opacity-0 group-hover:opacity-30 transition-opacity"></div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
