
import React, { useState, useEffect, useRef, useMemo } from 'react';
/* Updated imports to use current car-related types and correct Rarity enum */
import { Container, Car, Rarity } from '../types';
import { RARITY_COLORS } from '../constants';

interface CaseOpeningProps {
  targetCase: Container;
  onFinished: (item: Car) => void;
}

const CaseOpening: React.FC<CaseOpeningProps> = ({ targetCase, onFinished }) => {
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [isBlurry, setIsBlurry] = useState(false);
  const reelRef = useRef<HTMLDivElement>(null);
  
  /* Updated random generation logic to use Car rarities */
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

  const reelItems = useMemo(() => {
    const items = [];
    for (let i = 0; i < 70; i++) {
      /* Use targetCase.cars which is the correct property for Container */
      items.push(generateRandomCar(targetCase.cars));
    }
    return items;
  }, [targetCase.cars]);

  const winningIndex = 65; 
  const winningItem = reelItems[winningIndex];

  useEffect(() => {
    // Параметры анимации
    const itemWidth = 180;
    const itemMargin = 12;
    const totalItemWidth = itemWidth + itemMargin;
    const containerWidth = 1000;
    const centerOffset = containerWidth / 2;
    
    // Случайное смещение внутри карточки для реалистичности остановки
    const randomOffset = (Math.random() * (itemWidth - 20)) - (itemWidth / 2) + 10;
    const targetX = (winningIndex * totalItemWidth) - centerOffset + (totalItemWidth / 2) + randomOffset;

    // Запускаем вращение с небольшой задержкой для инициализации CSS
    const startTimer = setTimeout(() => {
      setIsBlurry(true);
      setCurrentTranslate(targetX);
    }, 100);

    // Убираем блюр к концу
    const blurTimer = setTimeout(() => {
      setIsBlurry(false);
    }, 5500);

    // Завершаем
    const finishTimer = setTimeout(() => {
      onFinished(winningItem);
    }, 7500);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(blurTimer);
      clearTimeout(finishTimer);
    };
  }, [winningItem, onFinished]);

  return (
    <div className="flex flex-col items-center justify-center py-10 animate-fadeIn">
      <div className="text-center mb-10 relative">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-1 bg-yellow-500 shadow-[0_0_20px_#eab308]"></div>
        <h2 className="text-5xl font-black text-white mb-2 tracking-tighter">
          UNBOXING <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">{targetCase.name.toUpperCase()}</span>
        </h2>
        <div className="flex items-center justify-center gap-2 text-gray-500 uppercase tracking-[0.4em] text-xs font-bold">
          <span className="w-8 h-[1px] bg-gray-800"></span>
          Fate is being decided
          <span className="w-8 h-[1px] bg-gray-800"></span>
        </div>
      </div>

      <div className="relative w-full max-w-[1000px] h-[280px] bg-[#0d1117]/80 backdrop-blur-md rounded-2xl overflow-hidden border border-white/5 shadow-[0_0_80px_rgba(0,0,0,0.8)]">
        {/* Боковые затемнения для фокуса на центре */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0d1117] to-transparent z-20"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0d1117] to-transparent z-20"></div>

        {/* Маркер выбора */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-yellow-500/80 z-30 shadow-[0_0_25px_#eab308]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-yellow-500 rotate-45 -translate-y-1/2 border-2 border-[#0d1117]"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-yellow-500 rotate-45 translate-y-1/2 border-2 border-[#0d1117]"></div>
        </div>

        {/* Контейнер барабана */}
        <div 
          ref={reelRef}
          className={`flex items-center h-full transition-transform duration-[7000ms] ease-[cubic-bezier(0.12,0,0.05,1)] ${isBlurry ? 'blur-[1px]' : 'blur-0'}`}
          style={{ 
            transform: `translateX(-${currentTranslate}px)`,
            paddingLeft: '50%',
            willChange: 'transform'
          }}
        >
          {reelItems.map((item, idx) => (
            <div 
              key={idx} 
              className={`flex-shrink-0 mx-[6px] w-[180px] h-[220px] bg-gradient-to-b from-[#1c2331] to-[#111827] border border-white/5 rounded-lg relative group transition-all duration-300 overflow-hidden ${idx === winningIndex && !isBlurry ? 'scale-105 shadow-[0_0_30px_rgba(255,255,255,0.1)]' : ''}`}
            >
              <div className={`absolute bottom-0 left-0 right-0 h-1 z-10`} style={{ backgroundColor: RARITY_COLORS[item.rarity] }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {/* Фоновое свечение редкости */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 blur-[40px] opacity-20" style={{ backgroundColor: RARITY_COLORS[item.rarity] }}></div>

              <div className="p-4 flex flex-col items-center justify-between h-full relative z-10">
                <div className="w-full flex justify-end">
                   <div className="w-2 h-2 rounded-full" style={{ backgroundColor: RARITY_COLORS[item.rarity] }}></div>
                </div>
                
                <img 
                  src={item.imageUrl} 
                  alt={item.model} 
                  className="w-36 h-28 object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)]"
                />
                
                <div className="text-center w-full bg-black/40 backdrop-blur-sm p-2 rounded-md border border-white/5">
                  <p className="text-[9px] text-gray-400 font-black uppercase tracking-tighter mb-0.5">{item.brand}</p>
                  <p className="text-[11px] text-white font-bold truncate leading-none">{item.model}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Вероятности (Легенда) */}
      <div className="mt-12 flex items-center gap-6 px-8 py-3 bg-[#111827]/50 rounded-full border border-white/5 backdrop-blur-sm">
        {Object.entries(RARITY_COLORS).map(([rarity, color]) => (
          <div key={rarity} className="flex items-center gap-2 group cursor-help">
            <div className="w-3 h-3 rounded-sm shadow-[0_0_10px_currentColor]" style={{ backgroundColor: color, color }}></div>
            <span className="text-[10px] font-black text-gray-500 group-hover:text-gray-300 transition-colors uppercase tracking-widest">{rarity}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseOpening;
