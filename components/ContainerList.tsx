
import React from 'react';
import { Container } from '../types';

interface ContainerListProps {
  containers: Container[];
  onOpen: (c: Container) => void;
}

const ContainerList: React.FC<ContainerListProps> = ({ containers, onOpen }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10 animate-fadeIn">
      {containers.map((c) => (
        <div 
          key={c.id} 
          className="group relative bg-[#0d1117] rounded-3xl md:rounded-[40px] overflow-hidden border border-white/5 transition-all duration-300 hover:border-yellow-500/30 flex flex-col shadow-xl"
        >
          <div className="relative h-48 md:h-72 overflow-hidden">
            <img 
              src={c.imageUrl} 
              alt={c.name}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent"></div>
            
            <div className="absolute top-4 right-4 bg-yellow-500 text-black px-4 py-1.5 rounded-xl text-[9px] md:text-[11px] font-black tracking-widest shadow-lg">
              ${c.price.toLocaleString()}
            </div>
            
            <div className="absolute bottom-4 left-6">
              <h3 className="text-2xl md:text-4xl font-black text-white italic tracking-tighter uppercase leading-none drop-shadow-md">{c.name}</h3>
            </div>
          </div>
          
          <div className="p-5 md:p-8 flex flex-col justify-between bg-black/40">
            <p className="text-gray-500 text-[9px] md:text-[11px] font-bold mb-6 uppercase tracking-widest opacity-60">
              Высокий шанс на импортные бюджетные авто. <br/>Шанс на гиперкар: 0.1%
            </p>
            
            <button 
              onClick={() => onOpen(c)}
              className="w-full bg-white hover:bg-yellow-500 text-black py-4 md:py-5 rounded-2xl font-black transition-all active:scale-95 shadow-xl uppercase tracking-widest text-[10px] md:text-[12px] border-b-4 border-gray-300 hover:border-yellow-600"
            >
              Вскрыть сейчас
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContainerList;
