
import React, { useState } from 'react';
import { GarageItem, Rarity } from '../types';
import { RARITY_COLORS } from '../constants';

interface GarageGridProps {
  garage: GarageItem[];
  onSell: (item: GarageItem) => void;
  onRepair: (item: GarageItem) => void;
}

const GarageGrid: React.FC<GarageGridProps> = ({ garage, onSell, onRepair }) => {
  const [filter, setFilter] = useState<Rarity | 'ALL'>('ALL');
  
  const filteredGarage = garage.filter(item => filter === 'ALL' || item.rarity === filter);
  const totalValue = garage.reduce((acc, curr) => acc + (curr.basePrice * curr.condition), 0);

  return (
    <div className="animate-fadeIn">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <i className="fa-solid fa-warehouse text-yellow-500 text-2xl"></i>
            <h2 className="text-5xl font-black text-white uppercase italic tracking-tighter">Private Garage</h2>
          </div>
          <div className="flex items-center gap-6 text-gray-500 font-bold uppercase tracking-widest text-[10px]">
            <span>{garage.length} VEHICLES</span>
            <div className="w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
            <span className="text-green-500">PORTFOLIO VALUE: ${totalValue.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {['ALL', ...Object.values(Rarity)].map((r) => (
            <button 
              key={r}
              onClick={() => setFilter(r as any)}
              className={`px-5 py-2 rounded-full text-[9px] font-black tracking-widest border transition-all ${
                filter === r 
                  ? 'bg-yellow-500 text-black border-yellow-500 shadow-lg shadow-yellow-500/20' 
                  : 'bg-black/40 text-gray-500 border-white/5 hover:text-white hover:border-white/20'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {filteredGarage.length === 0 ? (
        <div className="bg-[#0d1117] rounded-[40px] p-24 text-center border border-dashed border-white/5">
          <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8">
            <i className="fa-solid fa-car-rear text-4xl text-gray-700"></i>
          </div>
          <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-2">Garage Empty</h3>
          <p className="text-gray-600 font-medium uppercase tracking-widest text-xs">Acquire assets via terminal to expand your collection</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGarage.map((item) => {
            const currentVal = item.basePrice * item.condition;
            const repairCost = (1 - item.condition) * item.basePrice * 0.3;
            
            return (
              <div 
                key={item.instanceId}
                className="group relative bg-[#0d1117] rounded-3xl overflow-hidden border border-white/5 transition-all hover:-translate-y-2 hover:border-white/20 hover:shadow-2xl"
              >
                <div className="absolute top-0 left-0 right-0 h-1 z-10" style={{ backgroundColor: RARITY_COLORS[item.rarity] }}></div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-green-400 font-black text-sm font-mono tracking-tighter">${currentVal.toLocaleString()}</span>
                    <span className="px-2 py-0.5 rounded bg-black/40 text-[8px] font-black text-gray-400 tracking-widest uppercase">{item.rarity}</span>
                  </div>
                  
                  <div className="flex items-center justify-center h-32 mb-6 group-hover:scale-110 transition-transform duration-500">
                    <img 
                      src={item.imageUrl} 
                      alt={item.model} 
                      className="max-h-full max-w-full object-contain drop-shadow-2xl"
                    />
                  </div>

                  <div className="mb-6">
                    <p className="text-[10px] text-yellow-500 font-black uppercase tracking-widest mb-0.5 leading-none">{item.brand}</p>
                    <p className="text-xl text-white font-black italic tracking-tighter truncate leading-none mb-4">{item.model}</p>
                    
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[8px] font-black text-gray-600 uppercase tracking-widest">
                        <span>Condition</span>
                        <span>{(item.condition * 100).toFixed(0)}%</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 ${item.condition > 0.8 ? 'bg-green-500' : 'bg-orange-500'}`} 
                          style={{ width: `${item.condition * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => onRepair(item)}
                      disabled={item.condition >= 1}
                      className={`py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                        item.condition >= 1 
                          ? 'bg-white/5 text-gray-700 cursor-not-allowed' 
                          : 'bg-white hover:bg-yellow-500 text-black'
                      }`}
                      title={`Repair cost: $${repairCost.toLocaleString()}`}
                    >
                      {item.condition >= 1 ? 'Mint' : 'Repair'}
                    </button>
                    <button 
                      onClick={() => onSell(item)}
                      className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border border-red-500/10"
                    >
                      Sell
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GarageGrid;
