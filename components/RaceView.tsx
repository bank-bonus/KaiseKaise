
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
  const [isFreeRace, setIsFreeRace] = useState(false);

  const startRace = (forFree: boolean = false) => {
    if (forFree) {
      if (!ysdk) {
        proceedWithRace(true);
        return;
      }
      ysdk.adv.showRewardedVideo({
        callbacks: {
          onOpen: () => console.log('Ad opened'),
          onRewarded: () => {
            proceedWithRace(true);
          },
          onClose: () => console.log('Ad closed'),
          onError: (e: any) => alert('Реклама не загружена: ' + e)
        }
      });
    } else {
      if (!selectedCar || bet > balance || bet <= 0) return;
      proceedWithRace(false);
    }
  };

  const proceedWithRace = (free: boolean) => {
    if (!selectedCar) return;
    setIsRacing(true);
    setIsFreeRace(free);
    setOutcome(null);
    setRaceProgress(0);
    setOpponentProgress(0);

    // Жесткая математика шанса (база 25%)
    const baseWinChance = 0.25; 
    const rarityBonuses: Record<Rarity, number> = {
      [Rarity.COMMON]: 0,
      [Rarity.PREMIUM]: 0.05,
      [Rarity.LUXURY]: 0.10,
      [Rarity.EXOTIC]: 0.18,
      [Rarity.HYPER]: 0.28,
    };

    const winChance = baseWinChance + rarityBonuses[selectedCar.rarity] + (selectedCar.condition * 0.05);
    const won = Math.random() < winChance;

    const duration = 3000;
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setRaceProgress(progress * 100);
      
      const oppShift = won ? progress * (0.85 + Math.random() * 0.1) : progress * (1.05 + Math.random() * 0.05);
      setOpponentProgress(Math.min(oppShift * 100, 100));

      if (progress >= 1) {
        clearInterval(interval);
        setTimeout(() => {
          setIsRacing(false);
          setOutcome(won ? 'WIN' : 'LOSS');
          const prizePool = free ? 15000 : bet; 
          onResult(won ? prizePool : (free ? 0 : -bet));
        }, 500);
      }
    }, 50);
  };

  return (
    <div className="max-w-7xl mx-auto py-2 md:py-8 animate-fadeIn px-2 md:px-4">
      <div className="mb-6 text-center">
        <h2 className="text-3xl md:text-6xl font-black text-white italic tracking-tighter uppercase mb-1 drop-shadow-2xl">
          НОЧНОЙ <span className="text-yellow-500">ЗАЕЗД</span>
        </h2>
        <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-[8px] md:text-xs">Выиграй или потеряй всё</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-8">
        {/* Список авто */}
        <div className="lg:col-span-1 bg-[#0d1117]/80 backdrop-blur-xl rounded-[24px] p-4 border border-white/5 flex flex-col h-[300px] md:h-[550px] shadow-2xl">
          <h3 className="text-sm md:text-xl font-black text-white uppercase italic mb-4">Гараж</h3>
          <div className="space-y-2 overflow-y-auto pr-2 custom-scrollbar flex-grow">
            {garage.map(car => (
              <div 
                key={car.instanceId}
                onClick={() => !isRacing && setSelectedCar(car)}
                className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-3 relative overflow-hidden ${
                  selectedCar?.instanceId === car.instanceId 
                    ? 'bg-yellow-500 border-yellow-400 text-black shadow-lg' 
                    : 'bg-white/5 border-white/5 text-white hover:bg-white/10'
                }`}
              >
                <img src={car.imageUrl} className="w-12 h-8 object-contain" />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-black italic truncate leading-none">{car.model}</p>
                </div>
              </div>
            ))}
            {garage.length === 0 && <p className="text-gray-700 text-center py-10 uppercase text-[10px] font-black">Пусто</p>}
          </div>
        </div>

        {/* Трасса */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-[#0d1117]/80 backdrop-blur-xl rounded-[24px] p-5 md:p-8 border border-white/5 shadow-2xl">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-grow">
                <label className="text-[8px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 block">Ставка ($)</label>
                <input 
                  type="number" 
                  value={bet}
                  onChange={(e) => setBet(Math.max(0, Number(e.target.value)))}
                  disabled={isRacing}
                  className="w-full bg-black/50 border-2 border-white/10 rounded-xl px-4 py-3 text-xl md:text-3xl font-black text-yellow-500 font-mono focus:outline-none focus:border-yellow-500/40"
                />
              </div>
              <div className="flex flex-row md:flex-col gap-2 shrink-0">
                <button 
                  onClick={() => startRace(false)}
                  disabled={isRacing || !selectedCar || bet > balance || bet <= 0}
                  className="flex-1 px-8 py-3 bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-800 disabled:text-gray-500 text-black font-black uppercase tracking-widest rounded-xl transition-all shadow-xl active:scale-95 btn-shine"
                >
                  ГАЗ!
                </button>
                <button 
                  onClick={() => startRace(true)}
                  disabled={isRacing || !selectedCar}
                  className="flex-1 px-8 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 text-white font-black text-[10px] md:text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg animate-pulse"
                >
                  <i className="fa-solid fa-video mr-1"></i> FREE
                </button>
              </div>
            </div>

            <div className="space-y-12 bg-black/80 p-6 md:p-10 rounded-[32px] relative overflow-hidden border border-white/5">
               <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-white/10 border-dashed border-t border-white/20"></div>
               
               {/* Оппонент */}
               <div className="relative h-10">
                  <div className="absolute top-0 transition-all duration-100 ease-linear flex flex-col items-center" style={{ left: `${opponentProgress}%`, transform: 'translateX(-50%)' }}>
                    <i className="fa-solid fa-car text-gray-700 text-2xl mb-1"></i>
                    <span className="text-[6px] font-black text-gray-600 uppercase">Opponent</span>
                  </div>
               </div>

               {/* Игрок */}
               <div className="relative h-10">
                  <div className="absolute top-0 transition-all duration-100 ease-linear flex flex-col items-center" style={{ left: `${raceProgress}%`, transform: 'translateX(-50%)' }}>
                    {selectedCar ? <img src={selectedCar.imageUrl} className="w-12 md:w-20 h-8 md:h-12 object-contain drop-shadow-[0_0_15px_rgba(234,179,8,0.4)]" /> : <i className="fa-solid fa-car text-yellow-500 opacity-20 text-2xl"></i>}
                    <span className="text-[6px] font-black text-yellow-500 uppercase">You</span>
                  </div>
               </div>

               <div className="absolute right-0 top-0 bottom-0 w-4 md:w-8 bg-gradient-to-r from-transparent to-yellow-500/10 border-r-4 md:border-r-8 border-double border-white/20"></div>
            </div>
          </div>

          {outcome && (
            <div className={`p-6 md:p-10 rounded-[32px] border-2 text-center animate-fadeIn shadow-2xl ${outcome === 'WIN' ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
              <h4 className={`text-3xl md:text-6xl font-black italic uppercase mb-2 ${outcome === 'WIN' ? 'text-green-400' : 'text-red-400'}`}>
                {outcome === 'WIN' ? 'ФИНИШ!' : 'ПРОВАЛ'}
              </h4>
              <p className="text-white text-sm md:text-xl font-bold opacity-80">
                {outcome === 'WIN' 
                  ? `Выигрыш: $${(isFreeRace ? 15000 : bet).toLocaleString()}` 
                  : `Потеряно: $${(isFreeRace ? 0 : bet).toLocaleString()}`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RaceView;
