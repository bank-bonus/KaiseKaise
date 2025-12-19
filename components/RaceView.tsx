
import React, { useState, useEffect } from 'react';
import { GarageItem, Rarity } from '../types';
import { RARITY_COLORS } from '../constants';

interface RaceViewProps {
  garage: GarageItem[];
  balance: number;
  onResult: (change: number) => void;
}

const RaceView: React.FC<RaceViewProps> = ({ garage, balance, onResult }) => {
  const [selectedCar, setSelectedCar] = useState<GarageItem | null>(null);
  const [bet, setBet] = useState<number>(1000);
  const [isRacing, setIsRacing] = useState(false);
  const [raceProgress, setRaceProgress] = useState(0);
  const [opponentProgress, setOpponentProgress] = useState(0);
  const [outcome, setOutcome] = useState<'WIN' | 'LOSS' | null>(null);

  const startRace = () => {
    if (!selectedCar || bet > balance || bet <= 0) return;
    
    setIsRacing(true);
    setOutcome(null);
    setRaceProgress(0);
    setOpponentProgress(0);

    // Жесткая математика гонок
    const baseWinChance = 0.30; // 30% базы

    const rarityBonuses: Record<Rarity, number> = {
      [Rarity.COMMON]: 0,
      [Rarity.PREMIUM]: 0.02,
      [Rarity.LUXURY]: 0.05,
      [Rarity.EXOTIC]: 0.10,
      [Rarity.HYPER]: 0.15,
    };

    const conditionBonus = selectedCar.condition * 0.05;
    const winChance = baseWinChance + rarityBonuses[selectedCar.rarity] + conditionBonus;
    const won = Math.random() < winChance;

    const duration = 3500;
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setRaceProgress(progress * 100);
      
      let oppShift;
      if (won) {
        oppShift = progress * (0.85 + Math.random() * 0.13);
      } else {
        oppShift = progress * (1.05 + Math.random() * 0.05);
      }
      setOpponentProgress(Math.min(oppShift * 100, 100));

      if (progress >= 1) {
        clearInterval(interval);
        setTimeout(() => {
          setIsRacing(false);
          setOutcome(won ? 'WIN' : 'LOSS');
          onResult(won ? bet : -bet);
        }, 500);
      }
    }, 50);
  };

  return (
    <div className="max-w-7xl mx-auto py-10 animate-fadeIn px-4">
      <div className="mb-14 text-center">
        <h2 className="text-7xl font-black text-white italic tracking-tighter uppercase mb-3 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
          ПОДПОЛЬНЫЙ <span className="text-yellow-500">ДРИФТ</span>
        </h2>
        <p className="text-gray-500 font-bold uppercase tracking-[0.5em] text-xs">Мир высоких скоростей и пустых кошельков</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        <div className="xl:col-span-1 bg-[#0d1117]/60 backdrop-blur-xl rounded-[40px] p-8 border border-white/10 flex flex-col shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black text-white uppercase italic">Ваш выбор</h3>
            <span className="px-3 py-1 bg-yellow-500 text-black text-[10px] font-black rounded-full uppercase tracking-widest">Гараж</span>
          </div>
          
          <div className="space-y-4 overflow-y-auto pr-3 custom-scrollbar flex-grow max-h-[500px]">
            {garage.map(car => (
              <div 
                key={car.instanceId}
                onClick={() => !isRacing && setSelectedCar(car)}
                className={`group p-5 rounded-[24px] border-2 transition-all cursor-pointer flex items-center gap-6 relative overflow-hidden ${
                  selectedCar?.instanceId === car.instanceId 
                    ? 'bg-yellow-500 border-yellow-400 text-black shadow-[0_15px_30px_rgba(234,179,8,0.2)]' 
                    : 'bg-white/5 border-white/5 text-white hover:border-white/20 hover:bg-white/10'
                }`}
              >
                <div className="w-24 h-14 flex items-center justify-center relative">
                   <div className="absolute inset-0 bg-black/20 rounded-xl group-hover:scale-110 transition-transform"></div>
                   <img src={car.imageUrl} alt={car.model} className="relative z-10 max-h-full max-w-full object-contain drop-shadow-lg" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-[10px] font-black uppercase leading-none mb-1 ${selectedCar?.instanceId === car.instanceId ? 'text-black/60' : 'text-gray-500'}`}>{car.brand}</p>
                  <p className="text-lg font-black italic truncate leading-none">{car.model}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className={`text-xs font-black font-mono ${selectedCar?.instanceId === car.instanceId ? 'text-black' : 'text-yellow-500'}`}>
                    {(car.condition * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
            ))}
            {garage.length === 0 && (
              <div className="text-center py-20 bg-black/20 rounded-3xl border border-dashed border-white/10">
                <p className="text-gray-500 text-xs font-black uppercase tracking-widest">У вас нет авто</p>
              </div>
            )}
          </div>
        </div>

        <div className="xl:col-span-2 space-y-10">
          <div className="bg-[#0d1117]/60 backdrop-blur-xl rounded-[40px] p-10 border border-white/10 shadow-2xl">
            <div className="flex flex-col md:flex-row items-stretch md:items-end gap-8 mb-12">
              <div className="flex-grow">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4 block">Ставка на заезд</label>
                <div className="relative group">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-yellow-500 font-black text-3xl opacity-50 group-hover:opacity-100 transition-opacity">$</span>
                  <input 
                    type="number" 
                    value={bet}
                    onChange={(e) => setBet(Math.max(0, Number(e.target.value)))}
                    disabled={isRacing}
                    className="w-full bg-black/60 border-2 border-white/10 rounded-[24px] pl-14 pr-8 py-6 text-4xl font-black text-white font-mono focus:outline-none focus:border-yellow-500 transition-all shadow-inner"
                  />
                </div>
              </div>
              <button 
                onClick={startRace}
                disabled={isRacing || !selectedCar || bet > balance || bet <= 0}
                className="group relative px-14 py-6 bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-800 disabled:text-gray-500 text-black font-black uppercase tracking-[0.2em] rounded-[24px] transition-all active:scale-95 shadow-[0_20px_50px_rgba(234,179,8,0.2)] overflow-hidden"
              >
                <span className="relative z-10">{isRacing ? 'ГАЗ В ПОЛ...' : 'В ГЕЙМ'}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>
            </div>

            <div className="space-y-16 bg-black/80 p-12 rounded-[32px] relative overflow-hidden border border-white/10">
               <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-white/10 border-dashed border-t-2 border-white/20"></div>
               
               {/* Оппонент */}
               <div className="relative h-16">
                  <div 
                    className="absolute top-0 transition-all duration-100 ease-linear flex flex-col items-center"
                    style={{ left: `${opponentProgress}%`, transform: 'translateX(-50%)' }}
                  >
                    <div className="w-20 h-10 bg-gray-900 rounded-lg flex items-center justify-center border border-white/5 mb-2">
                       <i className="fa-solid fa-car text-gray-600 text-3xl"></i>
                    </div>
                    <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Аноним</span>
                  </div>
               </div>

               {/* Игрок */}
               <div className="relative h-16">
                  <div 
                    className="absolute top-0 transition-all duration-100 ease-linear flex flex-col items-center"
                    style={{ left: `${raceProgress}%`, transform: 'translateX(-50%)' }}
                  >
                    {selectedCar ? (
                      <div className="relative group">
                        <div className="absolute inset-0 bg-yellow-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <img 
                          src={selectedCar.imageUrl} 
                          className="w-24 h-14 object-contain drop-shadow-[0_10px_10px_rgba(234,179,8,0.3)] mb-2 relative z-10" 
                        />
                      </div>
                    ) : (
                      <div className="w-20 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center border border-yellow-500/20 mb-2">
                        <i className="fa-solid fa-question text-yellow-500/30"></i>
                      </div>
                    )}
                    <span className="text-[8px] font-black text-yellow-500 uppercase tracking-widest bg-yellow-500/10 px-3 py-1 rounded-full">Вы</span>
                  </div>
               </div>

               <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-yellow-500/10 border-r-8 border-double border-white/20"></div>
            </div>
          </div>

          {outcome && (
            <div className={`p-14 rounded-[40px] border-4 text-center animate-fadeIn shadow-2xl relative overflow-hidden ${outcome === 'WIN' ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
              <div className="relative z-10">
                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-8 border-2 ${outcome === 'WIN' ? 'bg-green-500/20 border-green-500/50' : 'bg-red-500/20 border-red-500/50'}`}>
                  <i className={`fa-solid ${outcome === 'WIN' ? 'fa-trophy text-green-400' : 'fa-hand-middle-finger text-red-400'} text-5xl`}></i>
                </div>
                <h4 className={`text-7xl font-black italic uppercase mb-6 tracking-tighter ${outcome === 'WIN' ? 'text-green-400' : 'text-red-400'}`}>
                  {outcome === 'WIN' ? 'ДЖЕКПОТ!' : 'ВСЁ ПРАХОМ'}
                </h4>
                <p className="text-white text-2xl font-bold max-w-xl mx-auto opacity-90">
                  {outcome === 'WIN' 
                    ? `Твой банк пополнен на $${bet.toLocaleString()}! Так держать, чемпион.` 
                    : `Удача — штука переменчивая. Ты слил $${bet.toLocaleString()}.`}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RaceView;
