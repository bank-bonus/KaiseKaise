
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
  
  const generateRandomCar = (cars: Car[]): Car => {
    const r = Math.random() * 100;
    let targetRarity: Rarity;
    if (r < 75) targetRarity = Rarity.COMMON;
    else if (r < 90) targetRarity = Rarity.PREMIUM;
    else if (r < 96) targetRarity = Rarity.LUXURY;
    else if (r < 99.5) targetRarity = Rarity.EXOTIC;
    else targetRarity = Rarity.HYPER;

    const possible = cars.filter(s => s.rarity === targetRarity);
    if (possible.length === 0) return cars[Math.floor(Math.random() * cars.length)];
    return possible[Math.floor(Math.random() * possible.length)];
  };

  // Важно: создаем список один раз при инициализации
  const winningIndex = 65; 
  const reelItems = useMemo(() => {
    const items = [];
    for (let i = 0; i < 70; i++) {
      items.push(generateRandomCar(targetContainer.cars));
    }
    return items;
  }, [targetContainer.cars]);

  const winningItem = reelItems[winningIndex];

  useEffect(() => {
    const itemWidth = 240;
    const itemMargin = 16;
    const totalItemWidth = itemWidth + itemMargin;
    const viewWidth = containerRef.current?.clientWidth || 1000;
    const centerOffset = viewWidth / 2;
    
    // Случайная точка остановки внутри карточки
    const randomShift = (Math.random() * (itemWidth - 60)) - (itemWidth / 2) + 30;
    const targetX = (winningIndex * totalItemWidth) - centerOffset + (totalItemWidth / 2) + randomShift;

    const startTimer = setTimeout(() => {
      setIsBlurry(true);
      setCurrentTranslate(targetX);
    }, 50);

    const blurTimer = setTimeout(() => setIsBlurry(false), 5500);
    const finishTimer = setTimeout(() => onFinished(winningItem), 7500);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(blurTimer);
      clearTimeout(finishTimer);
    };
  }, [winningItem, onFinished]);

  return (
    <div className="flex flex-col items-center justify-center py-10 animate-fadeIn" ref={containerRef}>
      <div className="text-center mb-12">
        <h2 className="text-5xl font-black text-white mb-2 tracking-tighter uppercase italic">
          ВСКРЫТИЕ <span className="text-yellow-500">{targetContainer.name}</span>
        </h2>
        <div className="flex items-center justify-center gap-3 text-gray-500 uppercase tracking-[0.5em] text-[10px] font-black">
          <div className="w-12 h-[1px] bg-white/10"></div>
          Сканирование груза...
          <div className="w-12 h-[1px] bg-white/10"></div>
        </div>
      </div>

      <div className="relative w-full max-w-[1200px] h-[320px] bg-[#0d1117]/60 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
        <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#05070a] to-transparent z-20"></div>
        <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-[#05070a] to-transparent z-20"></div>

        <div className="absolute left-1/2 top-0 bottom-0 w-[3px] bg-yellow-500 z-30 shadow-[0_0_30px_#eab308]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-3 bg-yellow-500 rounded-b-full"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-3 bg-yellow-500 rounded-t-full"></div>
        </div>

        <div 
          className={`flex items-center h-full transition-transform duration-[7000ms] ease-[cubic-bezier(0.1,0,0,1)] ${isBlurry ? 'blur-[1.5px]' : 'blur-0'}`}
          style={{ 
            transform: `translateX(-${currentTranslate}px)`,
            paddingLeft: '50%',
          }}
        >
          {reelItems.map((item, idx) => (
            <div 
              key={idx} 
              className={`flex-shrink-0 mx-2 w-[240px] h-[260px] bg-[#161b22] border-t border-white/5 rounded-2xl relative group transition-all duration-500 overflow-hidden ${idx === winningIndex && !isBlurry ? 'scale-105 border-yellow-500/50' : ''}`}
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 z-10" style={{ backgroundColor: RARITY_COLORS[item.rarity] }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              <div className="p-6 flex flex-col items-center justify-between h-full relative z-10">
                <span className="self-end text-[10px] font-black tracking-widest text-gray-500 uppercase">
                  {RARITY_LABELS[item.rarity]}
                </span>
                
                <img 
                  src={item.imageUrl} 
                  alt={item.model} 
                  className="w-full h-32 object-contain drop-shadow-2xl"
                />
                
                <div className="text-center w-full">
                  <p className="text-[10px] text-yellow-500 font-black uppercase tracking-widest mb-1">{item.brand}</p>
                  <p className="text-lg text-white font-black truncate leading-none italic">{item.model}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 flex flex-wrap justify-center gap-4 px-8 py-4 bg-black/40 rounded-2xl border border-white/5">
        {Object.entries(RARITY_COLORS).map(([rarity, color]) => (
          <div key={rarity} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full shadow-[0_0_10px_currentColor]" style={{ backgroundColor: color, color }}></div>
            <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{RARITY_LABELS[rarity as Rarity]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContainerOpening;
