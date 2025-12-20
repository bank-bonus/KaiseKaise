
import React from 'react';
import { Container } from '../types';

interface ContainerListProps {
  containers: Container[];
  onOpen: (c: Container) => void;
  level: number;
}

const ContainerList: React.FC<ContainerListProps> = ({ containers, onOpen, level }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 animate-fadeIn">
      {containers.map((c, idx) => {
        const minLvl = idx * 5; // Условный порог уровня: 0, 5, 10...
        const isLocked = level < minLvl;

        return (
          <div 
            key={c.id} 
            className={`group relative bg-[#0d1117] rounded-[32px] overflow-hidden border border-white/5 transition-all duration-500 shadow-2xl flex flex-col ${isLocked ? 'grayscale opacity-60' : 'hover:border-yellow-500/30'}`}
          >
            <div className="relative h-44 md:h-64 overflow-hidden">
              <img src={c.imageUrl} alt={c.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent"></div>
              
              <div className="absolute top-4 right-4 bg-yellow-500 text-black px-4 py-1.5 rounded-xl text-[10px] font-black shadow-lg">
                ${c.price.toLocaleString()}
              </div>
              
              <div className="absolute bottom-4 left-6">
                <h3 className="text-2xl md:text-3xl font-black text-white italic tracking-tighter uppercase leading-none">{c.name}</h3>
              </div>

              {isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-20">
                  <div className="text-center">
                    <i className="fa-solid fa-lock text-yellow-500 text-4xl mb-2"></i>
                    <p className="text-white font-black uppercase text-xs">Нужен LVL {minLvl}</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-5 flex flex-col justify-between flex-grow">
               <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest opacity-60 mb-6">
                 Содержит: {c.cars.length} моделей <br/>Шанс на экзотику: {idx === 2 ? '5%' : '0.1%'}
               </p>
               <button 
                 onClick={() => !isLocked && onOpen(c)}
                 disabled={isLocked}
                 className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl transition-all btn-shine ${isLocked ? 'bg-gray-800 text-gray-500' : 'bg-white hover:bg-yellow-500 text-black active:scale-95'}`}
               >
                 {isLocked ? 'Доступ ограничен' : 'Вскрыть контейнер'}
               </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ContainerList;
