
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ContainerList from './components/ContainerList';
import ContainerOpening from './components/ContainerOpening';
import GarageGrid from './components/GarageGrid';
import CarReveal from './components/CarReveal';
import { Container, Car, GarageItem, Rarity } from './types';
import { CONTAINERS } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<'containers' | 'garage'>('containers');
  const [balance, setBalance] = useState<number>(50000); 
  const [garage, setGarage] = useState<GarageItem[]>([]);
  const [selectedContainer, setSelectedContainer] = useState<Container | null>(null);
  const [isOpening, setIsOpening] = useState(false);
  const [wonCar, setWonCar] = useState<GarageItem | null>(null);

  useEffect(() => {
    const savedBalance = localStorage.getItem('cp_balance');
    const savedGarage = localStorage.getItem('cp_garage');
    if (savedBalance) setBalance(parseFloat(savedBalance));
    if (savedGarage) setGarage(JSON.parse(savedGarage));
  }, []);

  useEffect(() => {
    localStorage.setItem('cp_balance', balance.toString());
    localStorage.setItem('cp_garage', JSON.stringify(garage));
  }, [balance, garage]);

  const handleOpenContainer = (c: Container) => {
    if (balance < c.price) {
      alert("Insufficient funds to open this container!");
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
      condition: Math.random() * 0.7 + 0.3, // 30% to 100% condition
      acquiredAt: Date.now(),
    };
    setWonCar(newCar);
    setIsOpening(false);
  };

  const handleSellCar = (item: GarageItem) => {
    const currentPrice = item.basePrice * item.condition;
    setGarage(prev => prev.filter(i => i.instanceId !== item.instanceId));
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
    setBalance(prev => prev - repairCost);
    setGarage(prev => prev.map(car => 
      car.instanceId === item.instanceId ? { ...car, condition: 1.0 } : car
    ));
  };

  const addFunds = () => setBalance(prev => prev + 10000);

  return (
    <div className="min-h-screen flex flex-col bg-[#05070a]">
      <Navbar 
        balance={balance} 
        onViewChange={(v) => setView(v as any)} 
        currentView={view as any} 
        onAddFunds={addFunds}
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
        Elite Port Logistics &copy; 2024. All assets simulated for educational purposes.
      </footer>
    </div>
  );
};

export default App;
