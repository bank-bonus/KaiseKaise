
import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import ContainerList from './components/ContainerList';
import ContainerOpening from './components/ContainerOpening';
import GarageGrid from './components/GarageGrid';
import CarReveal from './components/CarReveal';
import { Container, Car, GarageItem } from './types';
import { CONTAINERS } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<'containers' | 'garage'>('containers');
  const [balance, setBalance] = useState<number>(50000); 
  const [garage, setGarage] = useState<GarageItem[]>([]);
  const [selectedContainer, setSelectedContainer] = useState<Container | null>(null);
  const [isOpening, setIsOpening] = useState(false);
  const [wonCar, setWonCar] = useState<GarageItem | null>(null);
  const [ysdk, setYsdk] = useState<any>(null);
  const [player, setPlayer] = useState<any>(null);

  // Инициализация Яндекс SDK
  useEffect(() => {
    if ((window as any).YaGames) {
      (window as any).YaGames.init().then((sdk: any) => {
        setYsdk(sdk);
        sdk.getPlayer().then((_player: any) => {
          setPlayer(_player);
          // Загрузка данных из облака Яндекса
          _player.getData(['balance', 'garage']).then((data: any) => {
            if (data.balance !== undefined) setBalance(data.balance);
            if (data.garage !== undefined) setGarage(data.garage);
          });
        }).catch(() => {
          // Если игрок не авторизован, используем LocalStorage
          const savedBalance = localStorage.getItem('cp_balance');
          const savedGarage = localStorage.getItem('cp_garage');
          if (savedBalance) setBalance(parseFloat(savedBalance));
          if (savedGarage) setGarage(JSON.parse(savedGarage));
        });
        
        // Показ первой рекламы при запуске (опционально)
        sdk.adv.showFullscreenAdv();
      });
    }
  }, []);

  // Сохранение данных
  const saveData = useCallback((newBalance: number, newGarage: GarageItem[]) => {
    if (player) {
      player.setData({
        balance: newBalance,
        garage: newGarage
      });
    }
    localStorage.setItem('cp_balance', newBalance.toString());
    localStorage.setItem('cp_garage', JSON.stringify(newGarage));
  }, [player]);

  useEffect(() => {
    saveData(balance, garage);
  }, [balance, garage, saveData]);

  const handleOpenContainer = (c: Container) => {
    if (balance < c.price) {
      alert("Insufficient funds!");
      return;
    }
    setBalance(prev => prev - c.price);
    setSelectedContainer(c);
    setIsOpening(true);
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
    
    // Показ межстраничной рекламы после открытия (не всегда, чтобы не злить)
    if (ysdk && Math.random() > 0.5) {
      ysdk.adv.showFullscreenAdv();
    }
  };

  const handleSellCar = (item: GarageItem) => {
    const currentPrice = item.basePrice * item.condition;
    const newGarage = garage.filter(i => i.instanceId !== item.instanceId);
    setGarage(newGarage);
    setBalance(prev => prev + currentPrice);
    if (wonCar && wonCar.instanceId === item.instanceId) {
      setWonCar(null);
    }
  };

  const handleKeepCar = (item: GarageItem) => {
    setGarage(prev => [...prev, item]);
    setWonCar(null);
  };

  const handleRepairCar = (item: GarageItem) => {
    const repairCost = (1 - item.condition) * item.basePrice * 0.3;
    if (balance < repairCost) {
      alert("Not enough money for repairs!");
      return;
    }
    const newBalance = balance - repairCost;
    const newGarage = garage.map(car => 
      car.instanceId === item.instanceId ? { ...car, condition: 1.0 } : car
    );
    setBalance(newBalance);
    setGarage(newGarage);
  };

  // Пополнение баланса через Rewarded Video
  const handleAddFunds = () => {
    if (ysdk) {
      ysdk.adv.showRewardedVideo({
        callbacks: {
          onOpen: () => console.log('Video ad open.'),
          onRewarded: () => {
            setBalance(prev => prev + 25000); // Награда за просмотр
          },
          onClose: () => console.log('Video ad closed.'),
          onError: (e: any) => console.error('Error while open video ad:', e)
        }
      });
    } else {
      // Фолбэк если SDK не загружен
      setBalance(prev => prev + 10000);
    }
  };

  const switchView = (v: 'containers' | 'garage') => {
    if (view !== v && ysdk) {
      // Показ рекламы при переключении вкладок
      ysdk.adv.showFullscreenAdv();
    }
    setView(v);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#05070a]">
      <Navbar 
        balance={balance} 
        onViewChange={(v) => switchView(v as any)} 
        currentView={view as any} 
        onAddFunds={handleAddFunds}
      />

      <main className="flex-grow container mx-auto px-4 py-8">
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
        ) : (
          <GarageGrid garage={garage} onSell={handleSellCar} onRepair={handleRepairCar} />
        )}
      </main>

      <footer className="py-8 border-t border-white/5 text-center text-gray-600 text-xs uppercase tracking-[0.2em]">
        Elite Port Logistics &copy; 2024. Yandex Games Edition.
      </footer>
    </div>
  );
};

export default App;
