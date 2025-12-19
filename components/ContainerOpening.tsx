
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
    
    if (r < 880) targetRarity = Rarity.COMMON;     
    else if (r < 960) targetRarity = Rarity.PREMIUM; 
    else if (r < 990) targetRarity = Rarity.LUXURY;  
    else if (r < 998) targetRarity = Rarity.EXOTIC;  
    else targetRarity = Rarity.HYPER;                

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
    // Адаптивная ширина карточки
    const isMobile = window.innerWidth < 768;
    const itemWidth = isMobile ? 160 : 220;
    const itemMargin = 8;
    const totalItemWidth = itemWidth + (itemMargin * 2);
    
    const containerWidth = containerRef.current?.clientWidth || window.innerWidth;
    const centerOffset = containerWidth / 2;
    
    // Точный расчет: сколько нужно прокрутить, чтобы WINNING_INDEX встал ровно по центру
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
    <div className="flex flex-col items-center justify-center py-4 md:py-10 animate-fadeIn overflow-hidden" ref={containerRef}>
      <div className="text-center mb-6 md:mb-12 px-4">
        <h2 className="text-3xl md:text-6xl font-black text-white mb-2 tracking-tighter uppercase italic drop-shadow-xl">
          СЕКТОР <span className="text-yellow-500">{targetContainer.name}</span>
        </h2>
        <div className="flex items-center justify-center gap-3 text-gray-500 uppercase tracking-widest text-[8px] md:text-[10px] font-black">
          <div className="w-8 md:w-16 h-[1px] bg-white/20"></div>
          СКАНИРОВАНИЕ...
          <div className="w-8 md:w-16 h-[1px] bg-white/20"></div>
        </div>
      </div>

      <div className="relative w-full h-[200px] md:h-[320px] bg-[#0d1117]/60 backdrop-blur-xl border-y border-white/10 shadow-2xl overflow-hidden">
        {/* Градиенты */}
        <div className="absolute inset-y-0 left-0 w-20 md:w-64 bg-gradient-to-r from-[#05070a] to-transparent z-20"></div>
        <div className="absolute inset-y-0 right-0 w-20 md:w-64 bg-gradient-to-l from-[#05070a] to-transparent z-20"></div>

        {/* Указатель */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] md:w-[4px] bg-yellow-500 z-30 shadow-[0_0_20px_#eab308]">
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-2 md:w-8 md:h-4 bg-yellow-500 rounded-b-lg"></div>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-2 md:w-8 md:h-4 bg-yellow-500 rounded-t-lg"></div>
        </div>

        <div 
          className={`flex items-center h-full transition-transform duration-[7000ms] ease-[cubic-bezier(0.1,0,0.01,1)] ${isBlurry ? 'blur-[1.5px]' : 'blur-0'}`}
          style={{ transform: `translateX(-${currentTranslate}px)` }}
        >
          {reelItems.map((item, idx) => (
            <div 
              key={idx} 
              className={`flex-shrink-0 mx-2 w-[160px] md:w-[220px] h-[160px] md:h-[260px] bg-gradient-to-b from-[#1a1f2e] to-[#0d1117] border border-white/5 rounded-2xl relative transition-all duration-500 overflow-hidden ${idx === WINNING_INDEX && !isBlurry ? 'scale-105 border-yellow-500/40 opacity-100 shadow-2xl' : 'opacity-40'}`}
            >
              <div className="absolute top-0 left-0 right-0 h-1 md:h-2 z-10" style={{ backgroundColor: RARITY_COLORS[item.rarity] }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              
              <div className="p-4 md:p-6 flex flex-col items-center justify-between h-full relative z-10">
                <span className="self-end text-[7px] md:text-[9px] font-black tracking-widest text-gray-400 uppercase">
                  {RARITY_LABELS[item.rarity]}
                </span>
                
                <img 
                  src={item.imageUrl} 
                  alt={item.model} 
                  className="w-full h-24 md:h-36 object-contain drop-shadow-2xl"
                />
                
                <div className="text-center w-full">
                  <p className="text-[7px] md:text-[9px] text-yellow-500 font-black uppercase mb-0.5">{item.brand}</p>
                  <p className="text-xs md:text-lg text-white font-black truncate leading-none italic">{item.model}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-3 md:gap-6 px-6 py-3 bg-white/5 rounded-2xl border border-white/10">
        {Object.entries(RARITY_COLORS).map(([rarity, color]) => (
          <div key={rarity} className="flex items-center gap-2 opacity-60">
            <div className="w-2 h-2 rounded-full shadow-[0_0_10px_currentColor]" style={{ backgroundColor: color, color }}></div>
            <span className="text-[7px] md:text-[9px] font-black text-gray-300 uppercase tracking-widest">{RARITY_LABELS[rarity as Rarity]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContainerOpening;
