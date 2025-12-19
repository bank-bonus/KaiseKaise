
import React from 'react';
import { Container } from '../types';

interface ContainerListProps {
  containers: Container[];
  onOpen: (c: Container) => void;
}

const ContainerList: React.FC<ContainerListProps> = ({ containers, onOpen }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-fadeIn">
      {containers.map((c) => (
        <div 
          key={c.id} 
          className="group relative bg-[#0d1117]/80 rounded-[40px] overflow-hidden border border-white/5 transition-all duration-500 hover:border-yellow-500/40 hover:shadow-[0_40px_80px_rgba(0,0,0,0.8)] flex flex-col hover:-translate-y-4"
        >
          <div className="relative h-72 overflow-hidden">
            <img 
              src={c.imageUrl} 
              alt={c.name}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/20 to-transparent"></div>
            
            <div className="absolute top-6 right-6 bg-yellow-500 text-black px-6 py-2 rounded-2xl text-[10px] font-black tracking-[0.2em] shadow-[0_10px_20px_rgba(234,179,8,0.4)] border-2 border-white/10">
              ${c.price.toLocaleString()}
            </div>
            
            <div className="absolute bottom-6 left-8">
              <span className="text-yellow-500 text-[9px] font-black uppercase tracking-[0.5em] opacity-80 block mb-1">Морской Груз</span>
              <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none drop-shadow-lg">{c.name}</h3>
            </div>
          </div>
          
          <div className="p-8 pt-4 flex-grow flex flex-col justify-between bg-gradient-to-b from-[#0d1117] to-black">
            <p className="text-gray-500 text-[10px] font-bold mb-8 uppercase tracking-widest leading-relaxed opacity-60">
              Высокая вероятность бюджетных авто. <br/> Шанс на люкс — крайне низкий.
            </p>
            
            <button 
              onClick={() => onOpen(c)}
              className="w-full relative group/btn overflow-hidden bg-white hover:bg-yellow-500 text-black py-5 rounded-3xl font-black transition-all active:scale-95 shadow-2xl uppercase tracking-[0.3em] text-[11px] border-2 border-white/10"
            >
              <span className="relative z-10">Вскрыть контейнер</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContainerList;
