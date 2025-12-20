
export enum Rarity {
  COMMON = 'COMMON',     
  PREMIUM = 'PREMIUM',   
  LUXURY = 'LUXURY',     
  EXOTIC = 'EXOTIC',     
  HYPER = 'HYPER'        
}

export interface Car {
  id: string;
  brand: string;
  model: string;
  rarity: Rarity;
  basePrice: number;
  imageUrl: string;
}

export interface Container {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  cars: Car[];
  minLevel?: number; // Минимальный уровень для открытия
}

export interface GarageItem extends Car {
  instanceId: string;
  condition: number; 
  acquiredAt: number;
}

export interface AppState {
  balance: number;
  garage: GarageItem[];
  level: number;
  xp: number;
}
