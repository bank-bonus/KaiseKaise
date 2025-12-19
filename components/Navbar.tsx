
import React from 'react';

interface NavbarProps {
  balance: number;
  onViewChange: (view: 'cases' | 'inventory') => void;
  currentView: 'cases' | 'inventory';
  onAddFunds: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ balance, onViewChange, currentView, onAddFunds }) => {
  return (
    <nav className="bg-[#111827] border-b border-gray-800 px-6 py-4 flex flex-wrap justify-between items-center sticky top-0 z-50 shadow-2xl">
      <div 
        className="flex items-center gap-3 cursor-pointer group"
        onClick={() => onViewChange('cases')}
      >
        <div className="w-10 h-10 bg-yellow-500 rounded flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-[0_0_15px_rgba(234,179,8,0.3)]">
          <i className="fa-solid fa-box-open text-black text-xl"></i>
        </div>
        <h1 className="text-2xl font-bold tracking-tighter text-white">
          GLOBAL<span className="text-yellow-500">STRIKE</span>
        </h1>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex bg-gray-900 rounded-lg p-1 border border-gray-800">
          <button 
            onClick={() => onViewChange('cases')}
            className={`px-4 py-1.5 rounded-md transition-all text-sm font-semibold ${
              currentView === 'cases' ? 'bg-gray-800 text-white shadow-lg' : 'text-gray-400 hover:text-white'
            }`}
          >
            STORE
          </button>
          <button 
            onClick={() => onViewChange('inventory')}
            className={`px-4 py-1.5 rounded-md transition-all text-sm font-semibold ${
              currentView === 'inventory' ? 'bg-gray-800 text-white shadow-lg' : 'text-gray-400 hover:text-white'
            }`}
          >
            INVENTORY
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-xs text-gray-500 uppercase font-bold tracking-widest">Balance</span>
            <span className="text-xl font-bold text-green-400 font-mono">
              ${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <button 
            onClick={onAddFunds}
            className="w-8 h-8 rounded-full bg-green-500/20 hover:bg-green-500/40 text-green-500 flex items-center justify-center transition-colors border border-green-500/30"
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
