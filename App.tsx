
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
  const [balance, setBalance] = useState<number>(50000); 
  const [garage, setGarage] = useState<GarageItem[]>([]);
  const [selectedContainer, setSelectedContainer] = useState<Container | null>(null);
  const [isOpening, setIsOpening] = useState(false);
  const [wonCar, setWonCar] = useState<GarageItem | null>(null);
  const [ysdk, setYsdk] = useState<any>(null);
  const [player, setPlayer] = useState<any>(null);

  useEffect(() => {
    if ((window as any).YaGames) {
      (window as any).YaGames.init().then((sdk: any) => {
        setYsdk(sdk);
        sdk.getPlayer().then((_player: any) => {
          setPlayer(_player);
          _player.getData(['balance', 'garage']).then((data: any) => {
            if (data.balance !== undefined) setBalance(data.balance);
            if (data.garage !== undefined) setGarage(data.garage);
          });
        }).catch(() => {
          const savedBalance = localStorage.getItem('cp_balance');
          const savedGarage = localStorage.getItem('cp_garage');
          if (savedBalance) setBalance(parseFloat(savedBalance));
          if (savedGarage) setGarage(JSON.parse(savedGarage));
        });
      });
    }
  }, []);

  const saveData = useCallback((newBalance: number, newGarage: GarageItem[]) => {
    if (player) {
      player.setData({ balance: newBalance, garage: newGarage });
    }
    localStorage.setItem('cp_balance', newBalance.toString());
    localStorage.setItem('cp_garage', JSON.stringify(newGarage));
  }, [player]);

  useEffect(() => {
    saveData(balance, garage);
  }, [balance, garage, saveData]);

  const handleOpenContainer = (c: Container) => {
    if (balance < c.price) {
      alert("Недостаточно средств!");
      return;
    }
    setBalance(prev => prev - c.price);
    setSelectedContainer(c);
    setIsOpening(true);
    document.body.classList.add('no-scroll');
  };

  const handleContainerFinished = (car: Car) => {
    const newCar: GarageItem = {
      ...car,
      instanceId: Math.random().toString(36).substr(2, 9),
      condition: Math.random() * 0.7 + 0.3,
      acquiredAt: Date.now(),
    };
    setWonCar(newCar);
    setIsOpening(false);
    document.body.classList.remove('no-scroll');
    
    if (ysdk && Math.random() > 0.4) {
      ysdk.adv.showFullscreenAdv();
    }
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
          onRewarded: () => setBalance(prev => prev + 25000),
        }
      });
    } else {
      setBalance(prev => prev + 10000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#05070a]">
      <Navbar 
        balance={balance} 
        onViewChange={(v) => setView(v as any)} 
        currentView={view} 
        onAddFunds={handleAddFunds}
      />

      <main className="flex-grow container mx-auto px-2 md:px-4 py-4 md:py-8">
        {selectedContainer && isOpening ? (
          <ContainerOpening 
            targetContainer={selectedContainer} 
            onFinished={handleContainerFinished} 
          />
        ) : wonCar ? (
          <CarReveal 
            item={wonCar} 
            onSell={() => handleSellCar(wonCar)} 
            onKeep={() => handleKeepCar(wonCar)} 
          />
        ) : view === 'containers' ? (
          <ContainerList containers={CONTAINERS} onOpen={handleOpenContainer} />
        ) : view === 'garage' ? (
          <GarageGrid garage={garage} onSell={handleSellCar} onRepair={handleRepairCar} />
        ) : (
          <RaceView 
            garage={garage} 
            balance={balance} 
            onResult={(res) => setBalance(prev => prev + res)}
            ysdk={ysdk}
          />
        )}
      </main>

      <footer className="py-6 border-t border-white/5 text-center text-gray-700 text-[10px] uppercase tracking-widest">
        Car Port Ops &copy; 2024. Яндекс Игры.
      </footer>
    </div>
  );
};

export default App;
