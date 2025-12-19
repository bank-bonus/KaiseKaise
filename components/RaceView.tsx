
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

    // Новая математика шанса победы (более сложная)
    // Базовый шанс теперь 38%
    const baseWinChance = 0.38;

    // Бонусы от редкости (уменьшены)
    const rarityBonuses: Record<Rarity, number> = {
      [Rarity.COMMON]: 0,
      [Rarity.PREMIUM]: 0.03,
      [Rarity.LUXURY]: 0.07,
      [Rarity.EXOTIC]: 0.12,
      [Rarity.HYPER]: 0.18,
    };

    // Бонус от состояния (макс +5%)
    const conditionBonus = selectedCar.condition * 0.05;

    // Итоговый шанс (максимум около 61% для идеального гиперкара)
    const winChance = baseWinChance + rarityBonuses[selectedCar.rarity] + conditionBonus;
    
    const won = Math.random() < winChance;

    // Анимация гонки
    const duration = 3000;
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setRaceProgress(progress * 100);
      
      // Логика движения оппонента для интриги
      let oppProgress;
      if (won) {
        // Если игрок выиграл, оппонент чуть отстает в конце
        oppProgress = progress * (0.9 + Math.random() * 0.08);
      } else {
        // Если игрок проиграл, оппонент вырывается вперед
        oppProgress = progress * (1.02 + Math.random() * 0.05);
      }
      
      setOpponentProgress(Math.min(oppProgress * 100, 100));

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
    <div className="max-w-6xl mx-auto py-10 animate-fadeIn">
      <div className="mb-12 text-center">
        <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase mb-2">ПОДПОЛЬНЫЕ ГОНКИ</h2>
        <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-xs">Рискни капиталом ради славы. Шансы на твоей стороне... или нет.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-1 bg-[#0d1117] rounded-3xl p-6 border border-white/5 flex flex-col">
          <h3 className="text-xl font-black text-white uppercase italic mb-6">Выбор автомобиля</h3>
          <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-grow" style={{ maxHeight: '450px' }}>
            {garage.map(car => (
              <div 
                key={car.instanceId}
                onClick={() => !isRacing && setSelectedCar(car)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
                  selectedCar?.instanceId === car.instanceId ? 'bg-yellow-500 border-yellow-500 text-black' : 'bg-white/5 border-white/5 text-white hover:border-white/20'
                }`}
              >
                <img src={car.imageUrl} alt={car.model} className="w-16 h-10 object-contain" />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-black uppercase opacity-60 leading-none">{car.brand}</p>
                  <p className="text-sm font-black italic truncate leading-none mt-1">{car.model}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[9px] font-black">{(car.condition * 100).toFixed(0)}% HP</div>
                </div>
              </div>
            ))}
            {garage.length === 0 && <p className="text-gray-600 text-center py-10 uppercase text-xs font-bold">Гараж пуст</p>}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[#0d1117] rounded-3xl p-8 border border-white/5">
            <div className="flex flex-col md:flex-row items-stretch md:items-end gap-6 mb-10">
              <div className="flex-grow">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3 block">Ваша ставка ($)</label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-yellow-500 font-black text-xl">$</span>
                  <input 
                    type="number" 
                    value={bet}
                    onChange={(e) => setBet(Math.max(0, Number(e.target.value)))}
                    disabled={isRacing}
                    className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-5 py-4 text-2xl font-black text-white font-mono focus:outline-none focus:border-yellow-500/50"
                  />
                </div>
              </div>
              <button 
                onClick={startRace}
                disabled={isRacing || !selectedCar || bet > balance || bet <= 0}
                className="px-12 py-4 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-800 disabled:text-gray-500 text-black font-black uppercase tracking-widest rounded-xl transition-all active:scale-95 shadow-xl shadow-yellow-500/10 min-w-[200px]"
              >
                {isRacing ? 'ГОНКА...' : 'В ПУТЬ'}
              </button>
            </div>

            <div className="space-y-12 bg-black/60 p-10 rounded-2xl relative overflow-hidden border border-white/5">
               <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-white/5 border-dashed border-t border-white/10"></div>
               
               <div className="relative h-14">
                  <div 
                    className="absolute top-0 transition-all duration-100 ease-linear flex flex-col items-center"
                    style={{ left: `${opponentProgress}%`, transform: 'translateX(-50%)' }}
                  >
                    <i className="fa-solid fa-car text-gray-700 text-3xl mb-1"></i>
                    <span className="text-[8px] font-bold text-gray-600 uppercase bg-black/50 px-2 py-0.5 rounded">Враг</span>
                  </div>
               </div>

               <div className="relative h-14">
                  <div 
                    className="absolute top-0 transition-all duration-100 ease-linear flex flex-col items-center"
                    style={{ left: `${raceProgress}%`, transform: 'translateX(-50%)' }}
                  >
                    {selectedCar ? (
                      <img 
                        src={selectedCar.imageUrl} 
                        className="w-16 h-10 object-contain drop-shadow-[0_0_10px_rgba(234,179,8,0.3)] mb-1" 
                      />
                    ) : (
                      <div className="w-16 h-10 border border-white/10 rounded flex items-center justify-center mb-1">
                        <i className="fa-solid fa-question text-gray-800"></i>
                      </div>
                    )}
                    <span className="text-[8px] font-bold text-yellow-500 uppercase bg-black/50 px-2 py-0.5 rounded">ВЫ</span>
                  </div>
               </div>

               <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-r from-transparent to-yellow-500/10 border-r-4 border-double border-white/20"></div>
               <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/20"></div>
            </div>
          </div>

          {outcome && (
            <div className={`p-12 rounded-3xl border text-center animate-fadeIn shadow-2xl ${outcome === 'WIN' ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 bg-white/5 border border-white/10">
                <i className={`fa-solid ${outcome === 'WIN' ? 'fa-trophy text-yellow-500' : 'fa-skull text-red-500'} text-3xl`}></i>
              </div>
              <h4 className={`text-5xl font-black italic uppercase mb-4 ${outcome === 'WIN' ? 'text-green-400' : 'text-red-400'}`}>
                {outcome === 'WIN' ? 'ВЫИГРЫШ!' : 'ПРОИГРЫШ'}
              </h4>
              <p className="text-white/80 text-xl font-medium max-w-md mx-auto">
                {outcome === 'WIN' 
                  ? `Поздравляем! Ваш баланс пополнен на $${bet.toLocaleString()}` 
                  : `Увы, удача была не на вашей стороне. Списано $${bet.toLocaleString()}`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RaceView;
