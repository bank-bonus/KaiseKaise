
import React, { useState, useEffect } from 'react';
import { GarageItem, Rarity } from '../types';
import { RARITY_COLORS } from '../constants';

interface RaceViewProps {
  garage: GarageItem[];
  balance: number;
  onResult: (change: number) => void;
  ysdk?: any;
}

const RaceView: React.FC<RaceViewProps> = ({ garage, balance, onResult, ysdk }) => {
  const [selectedCar, setSelectedCar] = useState<GarageItem | null>(null);
  const [bet, setBet] = useState<number>(1000);
  const [isRacing, setIsRacing] = useState(false);
  const [raceProgress, setRaceProgress] = useState(0);
  const [opponentProgress, setOpponentProgress] = useState(0);
  const [outcome, setOutcome] = useState<'WIN' | 'LOSS' | null>(null);

  const startRace = (forFree: boolean = false) => {
    if (forFree) {
      if (!ysdk) { proceedWithRace(true); return; }
      ysdk.adv.showRewardedVideo({
        callbacks: { onRewarded: () => proceedWithRace(true), onError: () => alert('Реклама недоступна') }
      });
    } else {
      if (!selectedCar || bet > balance || bet <= 0) return;
      proceedWithRace(false);
    }
  };

  const proceedWithRace = (free: boolean) => {
    setIsRacing(true);
    setOutcome(null);
    setRaceProgress(0);
    setOpponentProgress(0);

    const winChance = 0.3 + (selectedCar!.rarity === Rarity.HYPER ? 0.2 : 0) + (selectedCar!.condition * 0.1);
    const won = Math.random() < winChance;
    const duration = 3000;
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setRaceProgress(progress * 100);
      setOpponentProgress(won ? progress * 85 : progress * 105);

      if (progress >= 1) {
        clearInterval(interval);
        setTimeout(() => {
          setIsRacing(false);
          setOutcome(won ? 'WIN' : 'LOSS');
          onResult(won ? (free ? 5000 : bet) : (free ? 0 : -bet));
        }, 500);
      }
    }, 50);
  };

  return (
    <div className="animate-fadeIn max-w-5xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Selection Area */}
        <div className="lg:w-1/3 bg-[#0d1117] rounded-3xl p-5 border border-white/5 flex flex-col h-[400px] md:h-[600px] shadow-2xl">
           <h3 className="text-lg font-black uppercase italic mb-4">Выбери авто для заезда</h3>
           <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-grow">
              {garage.map(car => (
                <div 
                  key={car.instanceId}
                  onClick={() => !isRacing && setSelectedCar(car)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-4 ${selectedCar?.instanceId === car.instanceId ? 'bg-yellow-500 border-yellow-400 text-black' : 'bg-white/5 border-white/5'}`}
                >
                  <img src={car.imageUrl} className="w-16 h-10 object-contain" />
                  <div className="min-w-0">
                    <p className="text-xs font-black truncate italic leading-none">{car.model}</p>
                    <p className="text-[10px] opacity-60 uppercase font-bold mt-1">{(car.condition * 100).toFixed(0)}% Состояние</p>
                  </div>
                </div>
              ))}
              {garage.length === 0 && <p className="text-gray-700 text-center py-10 uppercase text-[10px] font-black">Сначала купи авто</p>}
           </div>
        </div>

        {/* Action Area */}
        <div className="lg:w-2/3 space-y-4">
           <div className="bg-[#0d1117] rounded-[32px] p-6 md:p-10 border border-white/5 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col md:flex-row gap-4 mb-10">
                 <div className="flex-grow">
                   <label className="text-[10px] font-black text-gray-500 uppercase block mb-2">Ставка на победу</label>
                   <input type="number" value={bet} onChange={e => setBet(Number(e.target.value))} className="w-full bg-black/60 border border-white/10 rounded-xl px-5 py-4 text-3xl font-black text-yellow-500 focus:outline-none" />
                 </div>
                 <div className="flex gap-2">
                    <button onClick={() => startRace(false)} disabled={isRacing || !selectedCar} className="flex-1 px-8 bg-yellow-500 text-black font-black rounded-xl hover:bg-yellow-400 shadow-lg btn-shine uppercase text-xs">Старт</button>
                    <button onClick={() => startRace(true)} disabled={isRacing || !selectedCar} className="flex-1 px-8 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-500 shadow-lg uppercase text-xs"><i className="fa-solid fa-video"></i> Free</button>
                 </div>
              </div>

              {/* Race Track */}
              <div className="relative h-40 bg-black/40 rounded-3xl border border-white/5 p-6 overflow-hidden">
                 <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/10 border-dashed border-t border-white/20"></div>
                 {/* Player */}
                 <div className="absolute top-8 transition-all duration-100 ease-linear" style={{ left: `${raceProgress}%`, transform: 'translateX(-50%)' }}>
                   {selectedCar ? <img src={selectedCar.imageUrl} className="w-20 h-12 object-contain drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]" /> : <i className="fa-solid fa-car text-gray-800 text-4xl"></i>}
                 </div>
                 {/* Bot */}
                 <div className="absolute bottom-8 transition-all duration-100 ease-linear" style={{ left: `${opponentProgress}%`, transform: 'translateX(-50%)' }}>
                    <i className="fa-solid fa-car text-gray-700 text-3xl opacity-40"></i>
                 </div>
                 <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-r from-transparent to-yellow-500/20 border-r-4 border-double border-white/20"></div>
              </div>
           </div>
        </div>
      </div>

      {/* Outcome Modal Overlay */}
      {outcome && (
        <div className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 animate-fadeIn">
          <div className={`w-full max-w-md p-10 rounded-[40px] border-2 text-center shadow-[0_0_100px_rgba(0,0,0,0.5)] ${outcome === 'WIN' ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
             <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center border-2 ${outcome === 'WIN' ? 'bg-green-500/20 border-green-500' : 'bg-red-500/20 border-red-500'}`}>
                <i className={`fa-solid ${outcome === 'WIN' ? 'fa-trophy text-green-400' : 'fa-skull-crossbones text-red-400'} text-4xl`}></i>
             </div>
             <h2 className={`text-5xl font-black italic uppercase mb-2 ${outcome === 'WIN' ? 'text-green-400' : 'text-red-400'}`}>{outcome === 'WIN' ? 'ПОБЕДА!' : 'ПРОВАЛ'}</h2>
             <p className="text-white text-lg font-bold opacity-80 mb-8">{outcome === 'WIN' ? 'Вы забрали банк и получили +500 XP' : 'Удача была на стороне противника'}</p>
             <button onClick={() => setOutcome(null)} className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl active:scale-95">Продолжить</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RaceView;
