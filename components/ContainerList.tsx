
import React from 'react';
import { Container } from '../types';

interface ContainerListProps {
  containers: Container[];
  onOpen: (c: Container) => void;
}

const ContainerList: React.FC<ContainerListProps> = ({ containers, onOpen }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
      {containers.map((c) => (
        <div 
          key={c.id} 
          className="group relative bg-[#0d1117] rounded-3xl overflow-hidden border border-white/5 transition-all hover:border-yellow-500/50 hover:shadow-[0_0_80px_rgba(234,179,8,0.15)] flex flex-col"
        >
          <div className="relative h-64 overflow-hidden">
            <img 
              src={c.imageUrl} 
              alt={c.name}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent"></div>
            <div className="absolute top-4 right-4 bg-yellow-500 text-black px-4 py-1 rounded-full text-xs font-black tracking-widest shadow-xl">
              ${c.price.toLocaleString()}
            </div>
          </div>
          
          <div className="p-8 pt-2 flex-grow flex flex-col justify-between">
            <div>
              <h3 className="text-3xl font-black text-white mb-2 italic tracking-tighter uppercase">{c.name}</h3>
              <p className="text-gray-500 text-sm font-medium mb-6 uppercase tracking-widest">Морской Фрахт • Высокая ценность</p>
            </div>
            
            <button 
              onClick={() => onOpen(c)}
              className="w-full bg-white hover:bg-yellow-500 text-black py-4 rounded-xl font-black transition-all active:scale-95 shadow-lg group-hover:shadow-yellow-500/20 uppercase tracking-[0.2em] text-xs"
            >
              Авторизовать вскрытие
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContainerList;
