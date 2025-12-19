
import React, { useState, useEffect } from 'react';
import { GarageItem } from '../types';
import { RARITY_COLORS } from '../constants';

interface CarRevealProps {
  item: GarageItem;
  onSell: () => void;
  onKeep: () => void;
}

const CarReveal: React.FC<CarRevealProps> = ({ item, onSell, onKeep }) => {
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowStats(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const currentValuation = item.basePrice * item.condition;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#05070a]/95 backdrop-blur-3xl animate-fadeIn">
      <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center">
        <span className="text-yellow-500 font-black tracking-[0.5em] text-xs uppercase mb-2 block animate-pulse">Scanning Success</span>
        <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase">ASSET ACQUIRED</h2>
      </div>

      <div className="max-w-4xl w-full px-6 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 perspective-1000">
          <div className="relative group">
            <div className="absolute inset-0 bg-yellow-500 blur-[120px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <img 
              src={item.imageUrl} 
              alt={item.model} 
              className="relative z-10 w-full h-auto object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.8)] transform hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        <div className={`flex-1 transition-all duration-1000 transform ${showStats ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
          <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-md">
            <span className="px-3 py-1 rounded text-[10px] font-black text-white uppercase tracking-widest" style={{ backgroundColor: RARITY_COLORS[item.rarity] }}>
              {item.rarity}
            </span>
            <h3 className="text-yellow-500 text-xl font-black uppercase mt-4">{item.brand}</h3>
            <h1 className="text-4xl font-black text-white italic tracking-tighter mb-8">{item.model}</h1>
            
            <div className="space-y-6 mb-10">
              <div>
                <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                  <span>Structural Condition</span>
                  <span className={item.condition > 0.8 ? 'text-green-400' : 'text-orange-400'}>{(item.condition * 100).toFixed(0)}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${item.condition > 0.8 ? 'bg-green-500' : 'bg-orange-500'}`} 
                    style={{ width: `${item.condition * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex justify-between items-end border-t border-white/5 pt-6">
                <div>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Market Valuation</p>
                  <p className="text-4xl font-black text-green-400 font-mono tracking-tighter">${currentValuation.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                onClick={onKeep}
                className="w-full bg-white hover:bg-yellow-500 text-black py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all active:scale-95 shadow-xl"
              >
                Send to Garage
              </button>
              <button 
                onClick={onSell}
                className="w-full bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all border border-red-500/20 active:scale-95"
              >
                Immediate Liquidation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarReveal;
