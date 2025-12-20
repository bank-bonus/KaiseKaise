
import React from 'react';
import { Container, Rarity } from '../types';
import { RARITY_COLORS } from '../constants';

interface ContainerListProps {
  containers: Container[];
  onOpen: (c: Container) => void;
  level: number;
}

const ContainerList: React.FC<ContainerListProps> = ({ containers, onOpen, level }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 animate-fadeIn">
      {containers.map((c) => {
        const minLvl = c.minLevel || 1;
        const isLocked = level < minLvl;

        return (
          <div 
            key={c.id} 
            className={`group relative bg-[#0d1117] rounded-[32px] overflow-hidden border border-white/5 transition-all duration-500 shadow-2xl flex flex-col ${isLocked ? 'opacity-80' : 'hover:border-yellow-500/30'}`}
          >
            <div className="relative h-44 md:h-64 overflow-hidden">
              <img src={c.imageUrl} alt={c.name} className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ${isLocked ? 'grayscale blur-[2px]' : ''}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent"></div>
              
              {!isLocked && (
                <div className="absolute top-4 right-4 bg-yellow-500 text-black px-4 py-1.5 rounded-xl text-[10px] font-black shadow-lg">
                  ${c.price.toLocaleString()}
                </div>
              )}
              
              <div className="absolute bottom-4 left-6">
                <h3 className="text-2xl md:text-3xl font-black text-white italic tracking-tighter uppercase leading-none">{c.name}</h3>
              </div>

              {isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-[2px] z-20">
                  <div className="text-center p-6 transform scale-110">
                    <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-3 border border-yellow-500/30 shadow-[0_0_30px_rgba(234,179,8,0.2)]">
                      <i className="fa-solid fa-lock text-yellow-500 text-2xl"></i>
                    </div>
                    <p className="text-yellow-500 font-black uppercase text-sm tracking-widest">Уровень {minLvl}</p>
                    <p className="text-gray-500 font-bold uppercase text-[8px] mt-1 tracking-tighter">Требуется для доступа</p>
                  </div>
                </div>
              )}

              {c.isMystery && !isLocked && (
                 <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 w-8 h-8 rounded-lg flex items-center justify-center">
                    <i className="fa-solid fa-question text-yellow-500 text-xs animate-pulse"></i>
                 </div>
              )}
            </div>
            
            <div className="p-5 flex flex-col justify-between flex-grow">
               <div className="mb-6">
                 {c.isMystery ? (
                   <div className="flex flex-col gap-1">
                      <p className="text-yellow-500/50 text-[10px] font-bold uppercase tracking-widest">
                        Содержимое неизвестно
                      </p>
                      <p className="text-gray-600 text-[8px] font-medium uppercase italic">Рискните, чтобы узнать</p>
                   </div>
                 ) : (
                   <>
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest opacity-60">
                      Содержит: {c.cars.length} моделей
                    </p>
                    <div className="flex gap-1 mt-2">
                      {/* Fix: Explicitly cast the rarity variable 'r' to Rarity to avoid 'unknown' index type error */}
                      {Array.from(new Set(c.cars.map(car => car.rarity))).map(r => (
                        <div key={r as string} className="w-2 h-2 rounded-full" style={{ backgroundColor: RARITY_COLORS[r as Rarity] }}></div>
                      ))}
                    </div>
                   </>
                 )}
               </div>
               <button 
                 onClick={() => !isLocked && onOpen(c)}
                 disabled={isLocked}
                 className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl transition-all btn-shine ${isLocked ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-white hover:bg-yellow-500 text-black active:scale-95'}`}
               >
                 {isLocked ? `Заблокировано` : `Вскрыть за $${c.price.toLocaleString()}`}
               </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ContainerList;
