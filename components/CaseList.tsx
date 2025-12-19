
import React from 'react';
/* Import Container instead of deprecated Case type */
import { Container } from '../types';

interface CaseListProps {
  cases: Container[];
  onOpen: (c: Container) => void;
}

const CaseList: React.FC<CaseListProps> = ({ cases, onOpen }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-fadeIn">
      {cases.map((c) => (
        <div 
          key={c.id} 
          className="group relative bg-[#1c2331] rounded-2xl overflow-hidden border border-gray-800 transition-all hover:border-yellow-500/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col"
        >
          <div className="p-8 flex justify-center perspective-1000">
            <img 
              src={c.imageUrl} 
              alt={c.name}
              className="w-48 h-48 object-contain transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500"
            />
          </div>
          <div className="p-6 bg-[#242c3d] border-t border-gray-800 flex-grow flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{c.name}</h3>
              <p className="text-gray-400 text-sm mb-4">Contains high value assets</p>
            </div>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-2xl font-bold text-yellow-500">${c.price.toFixed(2)}</span>
              <button 
                onClick={() => onOpen(c)}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-lg font-bold transition-all active:scale-95 shadow-lg shadow-yellow-500/20"
              >
                OPEN CONTAINER
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CaseList;
