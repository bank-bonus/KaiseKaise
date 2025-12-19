
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Case, Skin, Rarity } from '../types';
import { RARITY_COLORS } from '../constants';

interface CaseOpeningProps {
  targetCase: Case;
  onFinished: (item: Skin) => void;
}

const CaseOpening: React.FC<CaseOpeningProps> = ({ targetCase, onFinished }) => {
  const [isSpinning, setIsSpinning] = useState(true);
  const reelRef = useRef<HTMLDivElement>(null);
  
  // Weights for rarity: BLUE (80%), PURPLE (15%), PINK (4%), RED (0.8%), GOLD (0.2%)
  const generateRandomSkin = (skins: Skin[]): Skin => {
    const r = Math.random() * 100;
    let targetRarity: Rarity;
    if (r < 80) targetRarity = Rarity.BLUE;
    else if (r < 95) targetRarity = Rarity.PURPLE;
    else if (r < 99) targetRarity = Rarity.PINK;
    else if (r < 99.8) targetRarity = Rarity.RED;
    else targetRarity = Rarity.GOLD;

    const possible = skins.filter(s => s.rarity === targetRarity);
    if (possible.length === 0) return skins[Math.floor(Math.random() * skins.length)];
    return possible[Math.floor(Math.random() * possible.length)];
  };

  // Generate 60 items for the reel
  const reelItems = useMemo(() => {
    const items = [];
    for (let i = 0; i < 60; i++) {
      items.push(generateRandomSkin(targetCase.skins));
    }
    return items;
  }, [targetCase.skins]);

  const winningIndex = 55; // Always win the 56th item
  const winningItem = reelItems[winningIndex];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSpinning(false);
      setTimeout(() => {
        onFinished(winningItem);
      }, 1000);
    }, 6500); // 6.5s spin

    return () => clearTimeout(timer);
  }, [winningItem, onFinished]);

  // Animation calculation
  const itemWidth = 180;
  const itemMargin = 12;
  const totalItemWidth = itemWidth + itemMargin;
  const centerOffset = 500 / 2; // Half of container width
  const translateX = (winningIndex * totalItemWidth) - centerOffset + (totalItemWidth / 2) + (Math.random() * 80 - 40);

  return (
    <div className="flex flex-col items-center justify-center py-16 animate-fadeIn">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-2">OPENING {targetCase.name.toUpperCase()}</h2>
        <p className="text-gray-400 font-medium tracking-widest">GOOD LUCK!</p>
      </div>

      <div className="relative w-full max-w-[1000px] h-[250px] bg-[#111827] rounded-xl overflow-hidden border border-gray-800 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        {/* Selection Marker */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-yellow-500 z-10 shadow-[0_0_15px_rgba(234,179,8,0.8)]"></div>
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-yellow-500 z-10"></div>
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-yellow-500 z-10"></div>

        {/* Reel Container */}
        <div 
          ref={reelRef}
          className="flex items-center h-full transition-transform duration-[6000ms] cubic-bezier(0.1, 0, 0.1, 1)"
          style={{ 
            transform: isSpinning ? `translateX(-${translateX}px)` : `translateX(-${translateX}px)`,
            paddingLeft: '50%'
          }}
        >
          {reelItems.map((item, idx) => (
            <div 
              key={idx} 
              className="flex-shrink-0 mx-[6px] w-[180px] h-[200px] bg-[#1c2331] border-b-4 relative group"
              style={{ borderBottomColor: RARITY_COLORS[item.rarity] }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="p-4 flex flex-col items-center justify-center h-full">
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="w-32 h-24 object-contain mb-3 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
                />
                <div className="text-center">
                  <p className="text-[10px] text-gray-400 font-bold uppercase">{item.weapon}</p>
                  <p className="text-xs text-white font-bold truncate max-w-full">{item.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
        <div className="w-3 h-3 rounded-full bg-pink-500"></div>
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
      </div>
    </div>
  );
};

export default CaseOpening;
