
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
  
  // Константа индекса победы
  const WINNING_INDEX = 65; 

  const generateRandomCar = (cars: Car[]): Car => {
    const r = Math.random() * 1000; // Используем тысячные для точности
    let targetRarity: Rarity;
    
    if (r < 850) targetRarity = Rarity.COMMON;     // 85%
    else if (r < 950) targetRarity = Rarity.PREMIUM; // 10%
    else if (r < 990) targetRarity = Rarity.LUXURY;  // 4%
    else if (r < 999) targetRarity = Rarity.EXOTIC;  // 0.9%
    else targetRarity = Rarity.HYPER;                // 0.1%

    const possible = cars.filter(s => s.rarity === targetRarity);
    if (possible.length === 0) return cars[Math.floor(Math.random() * cars.length)];
    return possible[Math.floor(Math.random() * possible.length)];
  };

  // Генерируем барабан ОДИН раз при монтировании
  const reelItems = useMemo(() => {
    const items = [];
    for (let i = 0; i < 80; i++) {
      items.push(generateRandomCar(targetContainer.cars));
    }
    return items;
  }, [targetContainer.id]); // Перегенерировать только если сменился контейнер

  const winningItem = reelItems[WINNING_INDEX];

  useEffect(() => {
    const itemWidth = 240;
    const itemMargin = 16;
    const totalItemWidth = itemWidth + itemMargin;
    const viewWidth = containerRef.current?.clientWidth || 1000;
    const centerOffset = viewWidth / 2;
    
    // Точная остановка в центре WINNING_INDEX
    // Добавляем небольшой рандомный сдвиг внутри карточки (не меняющий результат)
    const randomInCardShift = (Math.random() * 100) - 50; 
    const targetX = (WINNING_INDEX * totalItemWidth) - centerOffset + (totalItemWidth / 2) + randomInCardShift;

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
    <div className="flex flex-col items-center justify-center py-10 animate-fadeIn" ref={containerRef}>
      <div className="text-center mb-12">
        <h2 className="text-6xl font-black text-white mb-3 tracking-tighter uppercase italic drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
          ЛОГИСТИКА <span className="text-yellow-500">{targetContainer.name}</span>
        </h2>
        <div className="flex items-center justify-center gap-4 text-gray-500 uppercase tracking-[0.6em] text-[10px] font-black">
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent to-white/20"></div>
          Идентификация груза
          <div className="w-16 h-[2px] bg-gradient-to-l from-transparent to-white/20"></div>
        </div>
      </div>

      <div className="relative w-full max-w-[1200px] h-[340px] bg-[#0d1117]/40 backdrop-blur-3xl rounded-[40px] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)]">
        {/* Градиенты по бокам */}
        <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-[#05070a] to-transparent z-20"></div>
        <div className="absolute inset-y-0 right-0 w-64 bg-gradient-to-l from-[#05070a] to-transparent z-20"></div>

        {/* Центральный прицел */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[4px] bg-yellow-500 z-30 shadow-[0_0_40px_rgba(234,179,8,0.8)]">
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-4 bg-yellow-500 rounded-b-xl border-2 border-[#0d1117]"></div>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-4 bg-yellow-500 rounded-t-xl border-2 border-[#0d1117]"></div>
        </div>

        <div 
          className={`flex items-center h-full transition-transform duration-[7000ms] ease-[cubic-bezier(0.1,0,0.01,1)] ${isBlurry ? 'blur-[2px]' : 'blur-0'}`}
          style={{ 
            transform: `translateX(-${currentTranslate}px)`,
            paddingLeft: '50%',
          }}
        >
          {reelItems.map((item, idx) => (
            <div 
              key={idx} 
              className={`flex-shrink-0 mx-2 w-[240px] h-[280px] bg-gradient-to-b from-[#1a1f2e] to-[#0d1117] border border-white/5 rounded-3xl relative group transition-all duration-500 overflow-hidden ${idx === WINNING_INDEX && !isBlurry ? 'scale-105 border-yellow-500/50 shadow-[0_0_50px_rgba(234,179,8,0.15)] opacity-100' : 'opacity-40'}`}
            >
              <div className="absolute top-0 left-0 right-0 h-2 z-10" style={{ backgroundColor: RARITY_COLORS[item.rarity], boxShadow: `0 0 20px ${RARITY_COLORS[item.rarity]}` }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
              
              <div className="p-8 flex flex-col items-center justify-between h-full relative z-10">
                <span className="self-end text-[10px] font-black tracking-widest text-gray-400 uppercase">
                  {RARITY_LABELS[item.rarity]}
                </span>
                
                <img 
                  src={item.imageUrl} 
                  alt={item.model} 
                  className="w-full h-36 object-contain drop-shadow-[0_25px_25px_rgba(0,0,0,0.8)] transition-transform duration-700 group-hover:scale-110"
                />
                
                <div className="text-center w-full">
                  <p className="text-[10px] text-yellow-500 font-black uppercase tracking-widest mb-1 opacity-80">{item.brand}</p>
                  <p className="text-xl text-white font-black truncate leading-none italic tracking-tighter">{item.model}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14 flex flex-wrap justify-center gap-6 px-10 py-5 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
        {Object.entries(RARITY_COLORS).map(([rarity, color]) => (
          <div key={rarity} className="flex items-center gap-2 group transition-opacity hover:opacity-100 opacity-60">
            <div className="w-3 h-3 rounded-full shadow-[0_0_15px_currentColor]" style={{ backgroundColor: color, color }}></div>
            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{RARITY_LABELS[rarity as Rarity]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContainerOpening;
