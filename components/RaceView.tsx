
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
        // Fallback если нет SDK
        proceedWithRace(true);
        return;
      }
      ysdk.adv.showRewardedVideo({
        callbacks: {
          onRewarded: () => {
            proceedWithRace(true);
          },
          onError: () => alert('Ошибка при загрузке рекламы')
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

    const baseWinChance = 0.28; 
    const rarityBonuses: Record<Rarity, number> = {
      [Rarity.COMMON]: 0,
      [Rarity.PREMIUM]: 0.03,
      [Rarity.LUXURY]: 0.06,
      [Rarity.EXOTIC]: 0.12,
      [Rarity.HYPER]: 0.20,
    };

    const winChance = baseWinChance + rarityBonuses[selectedCar.rarity] + (selectedCar.condition * 0.05);
    const won = Math.random() < winChance;

    const duration = 3500;
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setRaceProgress(progress * 100);
      
      const oppShift = won ? progress * (0.88 + Math.random() * 0.1) : progress * (1.04 + Math.random() * 0.04);
      setOpponentProgress(Math.min(oppShift * 100, 100));

      if (progress >= 1) {
        clearInterval(interval);
        setTimeout(() => {
          setIsRacing(false);
          setOutcome(won ? 'WIN' : 'LOSS');
          // Если гонка за рекламу, выигрыш фиксирован или равен ставке (бесплатно)
          const prize = free ? 10000 : bet; 
          onResult(won ? prize : (free ? 0 : -bet));
        }, 500);
      }
    }, 50);
  };

  return (
    <div className="max-w-6xl mx-auto py-4 md:py-10 animate-fadeIn px-2 md:px-4">
      <div className="mb-8 text-center">
        <h2 className="text-4xl md:text-7xl font-black text-white italic tracking-tighter uppercase mb-2">ПОЛУНОЧНЫЙ <span className="text-yellow-500">ГОНЩИК</span></h2>
        <p className="text-gray-500 font-bold uppercase tracking-widest text-[8px] md:text-[10px]">Побеждай или уходи ни с чем</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
        {/* Гараж для выбора */}
        <div className="lg:col-span-1 bg-[#0d1117]/80 backdrop-blur-xl rounded-3xl p-5 border border-white/5 flex flex-col h-[400px] md:h-[600px] shadow-2xl">
          <h3 className="text-lg md:text-xl font-black text-white uppercase italic mb-4">Выбери болид</h3>
          <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-grow">
            {garage.map(car => (
              <div 
                key={car.instanceId}
                onClick={() => !isRacing && setSelectedCar(car)}
                className={`p-3 md:p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-4 ${
                  selectedCar?.instanceId === car.instanceId 
                    ? 'bg-yellow-500 border-yellow-400 text-black shadow-lg scale-[0.98]' 
                    : 'bg-white/5 border-white/5 text-white hover:bg-white/10'
                }`}
              >
                <img src={car.imageUrl} className="w-14 h-10 object-contain" />
                <div className="flex-1 min-w-0">
                  <p className="text-[8px] font-black uppercase opacity-60 truncate">{car.brand}</p>
                  <p className="text-sm font-black italic truncate leading-none">{car.model}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Трасса и управление */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0d1117]/80 backdrop-blur-xl rounded-3xl p-6 md:p-10 border border-white/5 shadow-2xl">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-grow">
                <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2 block">Ваша ставка</label>
                <input 
                  type="number" 
                  value={bet}
                  onChange={(e) => setBet(Math.max(0, Number(e.target.value)))}
                  disabled={isRacing}
                  className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-4 text-xl md:text-3xl font-black text-yellow-500 font-mono focus:outline-none focus:border-yellow-500/40"
                />
              </div>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => startRace(false)}
                  disabled={isRacing || !selectedCar || bet > balance || bet <= 0}
                  className="px-10 py-4 md:py-5 bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-800 disabled:text-gray-500 text-black font-black uppercase tracking-widest rounded-2xl transition-all active:scale-95 shadow-lg"
                >
                  СТАРТ
                </button>
                <button 
                  onClick={() => startRace(true)}
                  disabled={isRacing || !selectedCar}
                  className="px-10 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-video"></i> БЕСПЛАТНО
                </button>
              </div>
            </div>

            {/* Визуализация */}
            <div className="space-y-10 bg-black/60 p-8 md:p-12 rounded-[32px] relative overflow-hidden border border-white/10">
               <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-white/10 border-dashed border-t border-white/20"></div>
               
               <div className="relative h-12">
                  <div className="absolute top-0 transition-all duration-100 ease-linear flex flex-col items-center" style={{ left: `${opponentProgress}%`, transform: 'translateX(-50%)' }}>
                    <i className="fa-solid fa-car text-gray-700 text-3xl"></i>
                    <span className="text-[7px] font-black text-gray-600">BOT</span>
                  </div>
               </div>

               <div className="relative h-12">
                  <div className="absolute top-0 transition-all duration-100 ease-linear flex flex-col items-center" style={{ left: `${raceProgress}%`, transform: 'translateX(-50%)' }}>
                    {selectedCar ? <img src={selectedCar.imageUrl} className="w-16 h-10 object-contain drop-shadow-[0_0_10px_#eab30866]" /> : <div className="w-16 h-10 border border-white/5"></div>}
                    <span className="text-[7px] font-black text-yellow-500">YOU</span>
                  </div>
               </div>
            </div>
          </div>

          {outcome && (
            <div className={`p-8 md:p-12 rounded-[40px] border-2 text-center animate-fadeIn ${outcome === 'WIN' ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
              <h4 className={`text-4xl md:text-7xl font-black italic uppercase mb-2 ${outcome === 'WIN' ? 'text-green-400' : 'text-red-400'}`}>
                {outcome === 'WIN' ? 'ФИНИШ!' : 'ПРОИГРЫШ'}
              </h4>
              <p className="text-white text-lg font-bold opacity-80">
                {outcome === 'WIN' 
                  ? `Твой выигрыш составил $${(isFreeRace ? 10000 : bet).toLocaleString()}` 
                  : isFreeRace ? 'Попробуй еще раз!' : `Ты потерял $${bet.toLocaleString()}`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RaceView;
