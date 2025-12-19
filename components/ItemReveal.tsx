
import React, { useState } from 'react';
/* Updated to use GarageItem instead of deprecated InventoryItem */
import { GarageItem } from '../types';
import { RARITY_COLORS } from '../constants';

interface ItemRevealProps {
  item: GarageItem;
  onSell: () => void;
  onKeep: () => void;
}

const ItemReveal: React.FC<ItemRevealProps> = ({ item, onSell, onKeep }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Auto flip after a short delay
  React.useEffect(() => {
    const timer = setTimeout(() => setIsFlipped(true), 100);
    return () => clearTimeout(timer);
  }, []);

  /* Calculate market value based on condition */
  const currentPrice = item.basePrice * item.condition;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl animate-fadeIn">
      <div className="absolute top-10 left-10 flex flex-col">
        <span className="text-xs text-gray-500 font-bold uppercase tracking-[0.2em] mb-1">Status</span>
        <span className="text-2xl font-bold text-yellow-500 animate-pulse">ASSET ACQUIRED</span>
      </div>

      <div className="flex flex-col items-center max-w-lg w-full px-6">
        {/* 3D Card Effect */}
        <div className="perspective-1000 w-full mb-12">
          <div className={`relative w-full aspect-square preserve-3d transition-transform duration-1000 ${isFlipped ? 'rotate-y-180' : ''}`}>
            
            {/* Front Side (Case) */}
            <div className="absolute inset-0 backface-hidden flex items-center justify-center bg-[#1c2331] rounded-3xl border-2 border-gray-700">
               <div className="w-48 h-48 bg-yellow-500 rounded-full blur-[100px] opacity-20"></div>
               <i className="fa-solid fa-box-open text-9xl text-gray-800"></i>
            </div>

            {/* Back Side (The Prize) */}
            <div className={`absolute inset-0 backface-hidden rotate-y-180 flex flex-col items-center justify-center bg-[#1c2331] rounded-3xl border-4 overflow-hidden`} style={{ borderColor: RARITY_COLORS[item.rarity] }}>
               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80"></div>
               
               <div className="relative z-10 w-full flex flex-col items-center p-8">
                  <div 
                    className="w-64 h-64 mb-6 drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] flex items-center justify-center group"
                  >
                    <img 
                      src={item.imageUrl} 
                      alt={item.model} 
                      className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="text-center">
                    <h2 className="text-gray-400 text-lg font-bold uppercase tracking-widest mb-1">{item.brand}</h2>
                    <h1 className="text-4xl font-black text-white mb-2 leading-tight">{item.model}</h1>
                    <div className="flex items-center justify-center gap-2">
                      <span className="px-3 py-1 rounded-full text-[10px] font-black tracking-tighter" style={{ backgroundColor: RARITY_COLORS[item.rarity], color: 'white' }}>
                        {item.rarity}
                      </span>
                      <span className="text-2xl font-mono font-bold text-green-400">${currentPrice.toFixed(2)}</span>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 w-full">
          <button 
            onClick={onSell}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-xl transition-all active:scale-95 shadow-lg shadow-red-900/30 uppercase tracking-widest"
          >
            Sell for ${currentPrice.toFixed(2)}
          </button>
          <button 
            onClick={onKeep}
            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-black py-4 rounded-xl transition-all active:scale-95 shadow-lg shadow-yellow-900/30 uppercase tracking-widest"
          >
            Add to Garage
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemReveal;
