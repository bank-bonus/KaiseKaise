
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

    // Шанс победы: Базовый (50%) + бонус редкости + бонус состояния
    const rarityBonuses: Record<Rarity, number> = {
      [Rarity.COMMON]: 0,
      [Rarity.PREMIUM]: 0.05,
      [Rarity.LUXURY]: 0.1,
      [Rarity.EXOTIC]: 0.15,
      [Rarity.HYPER]: 0.2,
    };

    const winChance = 0.45 + rarityBonuses[selectedCar.rarity] + (selectedCar.condition * 0.1);
    const won = Math.random() < winChance;

    // Анимация гонки
    const duration = 3000;
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setRaceProgress(progress * 100);
      // Оппонент едет чуть по-другому
      const oppShift = won ? progress * 0.95 : progress * 1.05;
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
    <div className="max-w-6xl mx-auto py-10 animate-fadeIn">
      <div className="mb-12 text-center">
        <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase mb-2">НОЧНЫЕ ГОНКИ</h2>
        <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-xs">Выбирай машину, делай ставку и жми на газ</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Выбор авто */}
        <div className="lg:col-span-1 bg-[#0d1117] rounded-3xl p-6 border border-white/5">
          <h3 className="text-xl font-black text-white uppercase italic mb-6">Ваш Автопарк</h3>
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
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
                <div className="text-right">
                  <p className="text-[9px] font-black">{(car.condition * 100).toFixed(0)}%</p>
                </div>
              </div>
            ))}
            {garage.length === 0 && <p className="text-gray-600 text-center py-10 uppercase text-xs font-bold">Нет машин для гонок</p>}
          </div>
        </div>

        {/* Трасса и Ставка */}
        <div className="lg:col-span-2 space-y-8">
          {/* Ставка */}
          <div className="bg-[#0d1117] rounded-3xl p-8 border border-white/5">
            <div className="flex flex-wrap items-end gap-10 mb-8">
              <div className="flex-1">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3 block">Размер ставки ($)</label>
                <input 
                  type="number" 
                  value={bet}
                  onChange={(e) => setBet(Number(e.target.value))}
                  disabled={isRacing}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-2xl font-black text-yellow-500 font-mono focus:outline-none focus:border-yellow-500/50"
                />
              </div>
              <button 
                onClick={startRace}
                disabled={isRacing || !selectedCar || bet > balance || bet <= 0}
                className="px-12 py-5 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-800 disabled:text-gray-500 text-black font-black uppercase tracking-widest rounded-xl transition-all active:scale-95 shadow-xl shadow-yellow-500/10"
              >
                {isRacing ? 'В ПУТИ...' : 'СТАРТ'}
              </button>
            </div>

            {/* Визуализация гонки */}
            <div className="space-y-6 bg-black/60 p-10 rounded-2xl relative overflow-hidden">
               {/* Дорожная разметка */}
               <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-white/5 border-dashed border-t border-white/10"></div>
               
               {/* Оппонент */}
               <div className="relative h-12">
                  <div 
                    className="absolute top-0 transition-all duration-100 ease-linear flex items-center gap-4"
                    style={{ left: `${opponentProgress}%` }}
                  >
                    <i className="fa-solid fa-car text-gray-600 text-2xl"></i>
                    <span className="text-[8px] font-bold text-gray-600 uppercase">Оппонент</span>
                  </div>
               </div>

               {/* Игрок */}
               <div className="relative h-12">
                  <div 
                    className="absolute top-0 transition-all duration-100 ease-linear flex items-center gap-4"
                    style={{ left: `${raceProgress}%` }}
                  >
                    <img 
                      src={selectedCar?.imageUrl || ''} 
                      className={`w-12 h-8 object-contain ${!selectedCar && 'opacity-0'}`} 
                    />
                    <span className="text-[8px] font-bold text-yellow-500 uppercase">ВЫ</span>
                  </div>
               </div>

               {/* Финиш */}
               <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-r from-transparent to-yellow-500/20 border-r-2 border-dashed border-white/20"></div>
            </div>
          </div>

          {/* Результат */}
          {outcome && (
            <div className={`p-10 rounded-3xl border text-center animate-fadeIn ${outcome === 'WIN' ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
              <h4 className={`text-4xl font-black italic uppercase mb-2 ${outcome === 'WIN' ? 'text-green-400' : 'text-red-400'}`}>
                {outcome === 'WIN' ? 'ПОБЕДА!' : 'ПОРАЖЕНИЕ'}
              </h4>
              <p className="text-white text-lg font-bold">
                {outcome === 'WIN' ? `Вы выиграли $${bet.toLocaleString()}` : `Вы проиграли $${bet.toLocaleString()}`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RaceView;
