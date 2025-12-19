
export enum Rarity {
  COMMON = 'COMMON',     // Budget cars
  PREMIUM = 'PREMIUM',   // High-end brands
  LUXURY = 'LUXURY',     // Sport/Luxury
  EXOTIC = 'EXOTIC',     // Supercars
  HYPER = 'HYPER'        // Rare collector items
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
}

export interface GarageItem extends Car {
  instanceId: string;
  condition: number; // 0.0 to 1.0
  acquiredAt: number;
}

export interface AppState {
  balance: number;
  garage: GarageItem[];
}
