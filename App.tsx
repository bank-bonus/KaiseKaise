
import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import ContainerList from './components/ContainerList';
import ContainerOpening from './components/ContainerOpening';
import GarageGrid from './components/GarageGrid';
import CarReveal from './components/CarReveal';
import RaceView from './components/RaceView';
import { Container, Car, GarageItem } from './types';
import { CONTAINERS } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<'containers' | 'garage' | 'races'>('containers');
  const [balance, setBalance] = useState<number>(10000); 
  const [garage, setGarage] = useState<GarageItem[]>([]);
  const [level, setLevel] = useState<number>(1);
  const [xp, setXp] = useState<number>(0);
  
  const [selectedContainer, setSelectedContainer] = useState<Container | null>(null);
  const [isOpening, setIsOpening] = useState(false);
  const [wonCar, setWonCar] = useState<GarageItem | null>(null);
  const [ysdk, setYsdk] = useState<any>(null);
  const [player, setPlayer] = useState<any>(null);

  const xpToNextLevel = level * 1000;

  useEffect(() => {
    if ((window as any).YaGames) {
      (window as any).YaGames.init().then((sdk: any) => {
        setYsdk(sdk);
        sdk.getPlayer().then((_player: any) => {
          setPlayer(_player);
          _player.getData(['balance', 'garage', 'level', 'xp']).then((data: any) => {
            if (data.balance !== undefined) setBalance(data.balance);
            if (data.garage !== undefined) setGarage(data.garage);
            if (data.level !== undefined) setLevel(data.level);
            if (data.xp !== undefined) setXp(data.xp);
          });
        });
      });
    }
  }, []);

  const addXp = useCallback((amount: number) => {
    setXp(prev => {
      let newXp = prev + amount;
      let newLevel = level;
      const targetXp = level * 1000;
      
      if (newXp >= targetXp) {
        newXp -= targetXp;
        newLevel += 1;
        setLevel(newLevel);
        setBalance(b => b + (newLevel * 5000)); // Бонус за уровень
      }
      return newXp;
    });
  }, [level]);

  const saveData = useCallback((newBalance: number, newGarage: GarageItem[], l: number, x: number) => {
    if (player) {
      player.setData({ balance: newBalance, garage: newGarage, level: l, xp: x });
    }
    localStorage.setItem('cp_data', JSON.stringify({ balance: newBalance, garage: newGarage, level: l, xp: x }));
  }, [player]);

  useEffect(() => {
    saveData(balance, garage, level, xp);
  }, [balance, garage, level, xp, saveData]);

  const handleOpenContainer = (c: Container) => {
    if (balance < c.price) return alert("Недостаточно средств!");
    setBalance(prev => prev - c.price);
    setSelectedContainer(c);
    setIsOpening(true);
    addXp(150);
  };

  const handleContainerFinished = (car: Car) => {
    const newCar: GarageItem = {
      ...car,
      instanceId: Math.random().toString(36).substr(2, 9),
      condition: Math.random() * 0.5 + 0.5,
      acquiredAt: Date.now(),
    };
    setWonCar(newCar);
    setIsOpening(false);
  };

  const handleSellCar = (item: GarageItem) => {
    const currentPrice = item.basePrice * item.condition;
    setGarage(prev => prev.filter(i => i.instanceId !== item.instanceId));
    setBalance(prev => prev + currentPrice);
    if (wonCar && wonCar.instanceId === item.instanceId) setWonCar(null);
  };

  const handleKeepCar = (item: GarageItem) => {
    setGarage(prev => [...prev, item]);
    setWonCar(null);
  };

  const handleRepairCar = (item: GarageItem) => {
    const repairCost = (1 - item.condition) * item.basePrice * 0.25;
    if (balance < repairCost) return alert("Недостаточно денег!");
    setBalance(prev => prev - repairCost);
    setGarage(prev => prev.map(car => car.instanceId === item.instanceId ? { ...car, condition: 1.0 } : car));
  };

  const handleAddFunds = () => {
    if (ysdk) {
      ysdk.adv.showRewardedVideo({
        callbacks: {
          onRewarded: () => {
            setBalance(prev => prev + 25000);
            addXp(300);
          },
        }
      });
    } else {
      setBalance(prev => prev + 10000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#05070a] text-white">
      <Navbar 
        balance={balance} 
        level={level}
        xp={xp}
        xpToNext={xpToNextLevel}
        onViewChange={(v) => setView(v as any)} 
        currentView={view} 
        onAddFunds={handleAddFunds}
      />

      <main className="flex-grow w-full max-w-6xl mx-auto px-4 py-6 overflow-x-hidden">
        {selectedContainer && isOpening ? (
          <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4">
             <div className="w-full max-w-4xl">
               <ContainerOpening 
                 targetContainer={selectedContainer} 
                 onFinished={handleContainerFinished} 
               />
             </div>
          </div>
        ) : wonCar ? (
          <CarReveal 
            item={wonCar} 
            onSell={() => handleSellCar(wonCar)} 
            onKeep={() => handleKeepCar(wonCar)} 
          />
        ) : view === 'containers' ? (
          <ContainerList containers={CONTAINERS} onOpen={handleOpenContainer} level={level} />
        ) : view === 'garage' ? (
          <GarageGrid garage={garage} onSell={handleSellCar} onRepair={handleRepairCar} />
        ) : (
          <RaceView 
            garage={garage} 
            balance={balance} 
            onResult={(res) => {
              setBalance(prev => prev + res);
              if (res > 0) addXp(500);
            }}
            ysdk={ysdk}
          />
        )}
      </main>

      <footer className="py-4 border-t border-white/5 text-center text-gray-700 text-[10px] uppercase tracking-widest">
        CAR PORT • EXPEDITION OPS • 2024
      </footer>
    </div>
  );
};

export default App;
