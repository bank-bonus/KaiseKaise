
import React from 'react';
import { Container } from '../types';

interface ContainerListProps {
  containers: Container[];
  onOpen: (c: Container) => void;
}

const ContainerList: React.FC<ContainerListProps> = ({ containers, onOpen }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8 animate-fadeIn pb-10 px-1">
      {containers.map((c) => (
        <div 
          key={c.id} 
          className="group relative bg-[#0d1117] rounded-[24px] md:rounded-[40px] overflow-hidden border border-white/5 transition-all duration-300 hover:border-yellow-500/30 flex flex-col shadow-2xl"
        >
          <div className="relative h-40 md:h-64 overflow-hidden">
            <img 
              src={c.imageUrl} 
              alt={c.name}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent"></div>
            
            <div className="absolute top-3 right-3 bg-yellow-500 text-black px-3 md:px-5 py-1 md:py-2 rounded-xl text-[10px] md:text-xs font-black tracking-widest shadow-xl btn-shine">
              ${c.price.toLocaleString()}
            </div>
            
            <div className="absolute bottom-3 left-5">
              <h3 className="text-xl md:text-3xl font-black text-white italic tracking-tighter uppercase leading-none">{c.name}</h3>
            </div>
          </div>
          
          <div className="p-4 md:p-6 flex flex-col justify-between bg-black/40">
            <p className="text-gray-500 text-[8px] md:text-[10px] font-bold mb-4 uppercase tracking-widest opacity-60">
              Высокий шанс на импортные бюджетные авто. <br/>Шанс на гиперкар: 0.1%
            </p>
            
            <button 
              onClick={() => onOpen(c)}
              className="w-full bg-white hover:bg-yellow-500 text-black py-3 md:py-4 rounded-xl font-black transition-all active:scale-95 shadow-xl uppercase tracking-widest text-[10px] md:text-xs border-b-4 border-gray-300 hover:border-yellow-600 btn-shine"
            >
              Вскрыть
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContainerList;
