
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Container, Car, Rarity } from '../types';
import { RARITY_COLORS, RARITY_LABELS } from '../constants';

interface ContainerOpeningProps {
  targetContainer: Container;
  onFinished: (item: Car) => void;
}

const ContainerOpening: React.FC<ContainerOpeningProps> = ({ targetContainer, onFinished }) => {
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [isBlurry, setIsBlurry] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const WINNING_INDEX = 65; 

  const generateRandomCar = (cars: Car[]): Car => {
    const r = Math.random() * 1000;
    let targetRarity: Rarity;
    
    if (r < 890) targetRarity = Rarity.COMMON;     // 89%
    else if (r < 965) targetRarity = Rarity.PREMIUM; // 7.5%
    else if (r < 995) targetRarity = Rarity.LUXURY;  // 3%
    else if (r < 999) targetRarity = Rarity.EXOTIC;  // 0.4%
    else targetRarity = Rarity.HYPER;                // 0.1%

    const possible = cars.filter(s => s.rarity === targetRarity);
    if (possible.length === 0) return cars[Math.floor(Math.random() * cars.length)];
    return possible[Math.floor(Math.random() * possible.length)];
  };

  const reelItems = useMemo(() => {
    const items = [];
    for (let i = 0; i < 80; i++) {
      items.push(generateRandomCar(targetContainer.cars));
    }
    return items;
  }, [targetContainer.id]);

  const winningItem = reelItems[WINNING_INDEX];

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const cardWidth = isMobile ? 140 : 200;
    const cardMargin = isMobile ? 4 : 8;
    const totalItemWidth = cardWidth + (cardMargin * 2);
    
    const containerWidth = containerRef.current?.clientWidth || window.innerWidth;
    const centerOffset = containerWidth / 2;
    
    // Идеальная центровка выигрышного предмета
    const targetX = (WINNING_INDEX * totalItemWidth) + (totalItemWidth / 2) - centerOffset;

    const startTimer = setTimeout(() => {
      setIsBlurry(true);
      setCurrentTranslate(targetX);
    }, 100);

    const blurTimer = setTimeout(() => setIsBlurry(false), 5500);
    const finishTimer = setTimeout(() => onFinished(winningItem), 7500);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(blurTimer);
      clearTimeout(finishTimer);
    };
  }, [winningItem, onFinished]);

  return (
    <div className="flex flex-col items-center justify-center py-4 md:py-10 animate-fadeIn" ref={containerRef}>
      <div className="text-center mb-6 md:mb-10 px-4">
        <h2 className="text-2xl md:text-5xl font-black text-white italic uppercase tracking-tighter">
          ВСКРЫТИЕ <span className="text-yellow-500">{targetContainer.name}</span>
        </h2>
        <p className="text-[8px] md:text-xs text-gray-500 uppercase font-bold tracking-[0.4em] mt-1">Ожидание подтверждения груза...</p>
      </div>

      <div className="relative w-full h-[180px] md:h-[300px] bg-[#0d1117]/60 backdrop-blur-3xl border-y border-white/5 shadow-inner overflow-hidden">
        {/* Градиент по бокам */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-64 bg-gradient-to-r from-[#05070a] to-transparent z-20"></div>
        <div className="absolute inset-y-0 right-0 w-16 md:w-64 bg-gradient-to-l from-[#05070a] to-transparent z-20"></div>

        {/* Указатель (Цель) */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] md:w-[4px] bg-yellow-500 z-30 shadow-[0_0_20px_rgba(234,179,8,1)]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-2 md:w-8 md:h-4 bg-yellow-500 rounded-b-xl"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-2 md:w-8 md:h-4 bg-yellow-500 rounded-t-xl"></div>
        </div>

        <div 
          className={`flex items-center h-full transition-transform duration-[7000ms] ease-[cubic-bezier(0.1,0,0,0.99)] ${isBlurry ? 'blur-[1.5px]' : 'blur-0'}`}
          style={{ transform: `translateX(-${currentTranslate}px)` }}
        >
          {reelItems.map((item, idx) => (
            <div 
              key={idx} 
              className={`flex-shrink-0 mx-1 md:mx-2 w-[140px] md:w-[200px] h-[150px] md:h-[240px] bg-gradient-to-b from-[#1a1f2e] to-[#0d1117] border border-white/5 rounded-2xl relative transition-all duration-500 overflow-hidden ${idx === WINNING_INDEX && !isBlurry ? 'scale-105 border-yellow-500/50 opacity-100 shadow-2xl z-10' : 'opacity-40'}`}
            >
              <div className="absolute top-0 left-0 right-0 h-1 md:h-2" style={{ backgroundColor: RARITY_COLORS[item.rarity], boxShadow: `0 0 15px ${RARITY_COLORS[item.rarity]}66` }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              
              <div className="p-3 md:p-5 flex flex-col items-center justify-between h-full relative z-10">
                <span className="self-end text-[7px] md:text-[9px] font-black tracking-widest text-gray-400 uppercase">
                  {RARITY_LABELS[item.rarity]}
                </span>
                
                <img 
                  src={item.imageUrl} 
                  alt={item.model} 
                  className="w-full h-20 md:h-32 object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-110"
                />
                
                <div className="text-center w-full">
                  <p className="text-[7px] md:text-[9px] text-yellow-500 font-black uppercase mb-0.5">{item.brand}</p>
                  <p className="text-[10px] md:text-base text-white font-black truncate leading-none italic">{item.model}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3 md:gap-6 px-6 py-3 bg-white/5 rounded-2xl border border-white/5 opacity-60">
        {Object.entries(RARITY_COLORS).map(([rarity, color]) => (
          <div key={rarity} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full shadow-[0_0_10px_currentColor]" style={{ backgroundColor: color, color }}></div>
            <span className="text-[8px] md:text-[10px] font-black text-gray-300 uppercase tracking-widest">{RARITY_LABELS[rarity as Rarity]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContainerOpening;
