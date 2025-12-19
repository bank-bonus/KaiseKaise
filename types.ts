
export enum Rarity {
  BLUE = 'BLUE',       // Mil-Spec
  PURPLE = 'PURPLE',   // Restricted
  PINK = 'PINK',       // Classified
  RED = 'RED',         // Covert
  GOLD = 'GOLD'        // Special (Knife)
}

export interface Skin {
  id: string;
  name: string;
  weapon: string;
  rarity: Rarity;
  price: number;
  imageUrl: string;
}

export interface Case {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  skins: Skin[];
}

export interface InventoryItem extends Skin {
  instanceId: string;
  acquiredAt: number;
}

export interface AppState {
  balance: number;
  inventory: InventoryItem[];
  openedCases: number;
}
