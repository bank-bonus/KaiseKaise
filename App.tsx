
import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import CaseList from './components/CaseList';
import CaseOpening from './components/CaseOpening';
import InventoryGrid from './components/InventoryGrid';
import ItemReveal from './components/ItemReveal';
import { Case, Skin, InventoryItem, Rarity } from './types';
import { CASES } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<'cases' | 'inventory'>('cases');
  const [balance, setBalance] = useState<number>(1000); // Initial balance $1000
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [isOpening, setIsOpening] = useState(false);
  const [wonItem, setWonItem] = useState<InventoryItem | null>(null);

  // Load from local storage
  useEffect(() => {
    const savedBalance = localStorage.getItem('gs_balance');
    const savedInventory = localStorage.getItem('gs_inventory');
    if (savedBalance) setBalance(parseFloat(savedBalance));
    if (savedInventory) setInventory(JSON.parse(savedInventory));
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('gs_balance', balance.toString());
    localStorage.setItem('gs_inventory', JSON.stringify(inventory));
  }, [balance, inventory]);

  const handleOpenCase = (c: Case) => {
    if (balance < c.price) {
      alert("Insufficient balance!");
      return;
    }
    setBalance(prev => prev - c.price);
    setSelectedCase(c);
    setIsOpening(true);
  };

  const handleCaseFinished = (item: Skin) => {
    const newItem: InventoryItem = {
      ...item,
      instanceId: Math.random().toString(36).substr(2, 9),
      acquiredAt: Date.now(),
    };
    setWonItem(newItem);
    setIsOpening(false);
  };

  const handleSellItem = (item: InventoryItem) => {
    setInventory(prev => prev.filter(i => i.instanceId !== item.instanceId));
    setBalance(prev => prev + item.price);
    if (wonItem && wonItem.instanceId === item.instanceId) {
      setWonItem(null);
    }
  };

  const handleKeepItem = (item: InventoryItem) => {
    setInventory(prev => [...prev, item]);
    setWonItem(null);
  };

  const addFunds = () => {
    setBalance(prev => prev + 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0e14]">
      <Navbar 
        balance={balance} 
        onViewChange={setView} 
        currentView={view} 
        onAddFunds={addFunds}
      />

      <main className="flex-grow container mx-auto px-4 py-8">
        {selectedCase && isOpening ? (
          <CaseOpening 
            targetCase={selectedCase} 
            onFinished={handleCaseFinished} 
          />
        ) : wonItem ? (
          <ItemReveal 
            item={wonItem} 
            onSell={() => handleSellItem(wonItem)} 
            onKeep={() => handleKeepItem(wonItem)} 
          />
        ) : view === 'cases' ? (
          <CaseList cases={CASES} onOpen={handleOpenCase} />
        ) : (
          <InventoryGrid inventory={inventory} onSell={handleSellItem} />
        )}
      </main>

      <footer className="py-4 border-t border-gray-800 text-center text-gray-500 text-sm">
        Global Strike: Case Simulator &copy; 2024. All weapon images are mock placeholders.
      </footer>
    </div>
  );
};

export default App;
