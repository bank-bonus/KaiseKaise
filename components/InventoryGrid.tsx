
import React, { useState } from 'react';
/* Updated to use GarageItem instead of deprecated InventoryItem */
import { GarageItem, Rarity } from '../types';
import { RARITY_COLORS } from '../constants';

interface InventoryGridProps {
  inventory: GarageItem[];
  onSell: (item: GarageItem) => void;
}

const InventoryGrid: React.FC<InventoryGridProps> = ({ inventory, onSell }) => {
  const [filter, setFilter] = useState<Rarity | 'ALL'>('ALL');
  
  const filteredInventory = inventory.filter(item => filter === 'ALL' || item.rarity === filter);

  /* Valuation accounts for base price and condition */
  const totalValue = inventory.reduce((acc, curr) => acc + (curr.basePrice * curr.condition), 0);

  return (
    <div className="animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
        <div>
          <h2 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter italic">Storage Unit</h2>
          <div className="flex items-center gap-4 text-gray-500 font-bold">
            <span>{inventory.length} ASSETS</span>
            <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
            <span className="text-green-500">EST. VALUE: ${totalValue.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {['ALL', ...Object.values(Rarity)].map((r) => (
            <button 
              key={r}
              onClick={() => setFilter(r as any)}
              className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest border transition-all ${
                filter === r 
                  ? 'bg-white text-black border-white' 
                  : 'bg-transparent text-gray-500 border-gray-800 hover:text-white hover:border-gray-600'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {filteredInventory.length === 0 ? (
        <div className="bg-[#111827] rounded-3xl p-20 text-center border border-dashed border-gray-800">
          <i className="fa-solid fa-ghost text-6xl text-gray-800 mb-6"></i>
          <h3 className="text-xl font-bold text-gray-600">No assets found in this section</h3>
          <p className="text-gray-700">Open some containers to fill your storage!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {filteredInventory.map((item) => {
            const currentPrice = item.basePrice * item.condition;
            return (
              <div 
                key={item.instanceId}
                className="group relative bg-[#1c2331] rounded-xl overflow-hidden border-b-4 transition-all hover:-translate-y-1 hover:shadow-2xl"
                style={{ borderBottomColor: RARITY_COLORS[item.rarity] }}
              >
                <div className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-green-500 font-bold text-xs font-mono">${currentPrice.toFixed(2)}</span>
                    <button 
                      onClick={() => onSell(item)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-red-500"
                      title="Quick Sell"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-center h-24 mb-4">
                    <img 
                      src={item.imageUrl} 
                      alt={item.model} 
                      className="max-h-full max-w-full object-contain drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]"
                    />
                  </div>

                  <div className="text-center overflow-hidden">
                    <p className="text-[10px] text-gray-500 font-bold uppercase truncate">{item.brand}</p>
                    <p className="text-sm text-white font-bold truncate">{item.model}</p>
                  </div>
                </div>

                <div className="absolute inset-0 bg-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default InventoryGrid;
