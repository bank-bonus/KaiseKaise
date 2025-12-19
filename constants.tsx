
import { Rarity, Container, Car } from './types';

export const RARITY_COLORS: Record<Rarity, string> = {
  [Rarity.COMMON]: '#94a3b8',
  [Rarity.PREMIUM]: '#3b82f6',
  [Rarity.LUXURY]: '#a855f7',
  [Rarity.EXOTIC]: '#ef4444',
  [Rarity.HYPER]: '#fbbf24',
};

const MOCK_CARS: Car[] = [
  // COMMON
  { id: 'c1', brand: 'Toyota', model: 'Corolla GR', rarity: Rarity.COMMON, basePrice: 25000, imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=400&auto=format&fit=crop' },
  { id: 'c2', brand: 'Honda', model: 'Civic Type R', rarity: Rarity.COMMON, basePrice: 32000, imageUrl: 'https://images.unsplash.com/photo-1605515298946-d062f2e9da53?q=80&w=400&auto=format&fit=crop' },
  // PREMIUM
  { id: 'p1', brand: 'BMW', model: 'M4 Competition', rarity: Rarity.PREMIUM, basePrice: 85000, imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=400&auto=format&fit=crop' },
  { id: 'p2', brand: 'Audi', model: 'RS6 Avant', rarity: Rarity.PREMIUM, basePrice: 110000, imageUrl: 'https://images.unsplash.com/photo-1606148344602-0c9f13d80357?q=80&w=400&auto=format&fit=crop' },
  // LUXURY
  { id: 'l1', brand: 'Porsche', model: '911 GT3 RS', rarity: Rarity.LUXURY, basePrice: 225000, imageUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=400&auto=format&fit=crop' },
  { id: 'l2', brand: 'Mercedes', model: 'AMG GT', rarity: Rarity.LUXURY, basePrice: 180000, imageUrl: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=400&auto=format&fit=crop' },
  // EXOTIC
  { id: 'e1', brand: 'Lamborghini', model: 'Aventador SVJ', rarity: Rarity.EXOTIC, basePrice: 550000, imageUrl: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=400&auto=format&fit=crop' },
  { id: 'e2', brand: 'Ferrari', model: 'SF90 Stradale', rarity: Rarity.EXOTIC, basePrice: 620000, imageUrl: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=400&auto=format&fit=crop' },
  // HYPER
  { id: 'h1', brand: 'Bugatti', model: 'Chiron Pur Sport', rarity: Rarity.HYPER, basePrice: 3500000, imageUrl: 'https://images.unsplash.com/photo-1600712242805-5f5d270b47e5?q=80&w=400&auto=format&fit=crop' },
  { id: 'h2', brand: 'Koenigsegg', model: 'Jesko Absolut', rarity: Rarity.HYPER, basePrice: 4200000, imageUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=400&auto=format&fit=crop' },
];

export const CONTAINERS: Container[] = [
  {
    id: 'cont_budget',
    name: 'Import Terminal',
    price: 5000,
    imageUrl: 'https://images.unsplash.com/photo-1494412574743-01103cb5d56b?q=80&w=300&auto=format&fit=crop',
    cars: MOCK_CARS.filter(c => [Rarity.COMMON, Rarity.PREMIUM].includes(c.rarity)),
  },
  {
    id: 'cont_exotic',
    name: 'Luxury Vault',
    price: 50000,
    imageUrl: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=300&auto=format&fit=crop',
    cars: MOCK_CARS.filter(c => [Rarity.LUXURY, Rarity.EXOTIC, Rarity.HYPER].includes(c.rarity)),
  },
  {
    id: 'cont_hyper',
    name: 'Collector’s Reserve',
    price: 500000,
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=300&auto=format&fit=crop',
    cars: MOCK_CARS.filter(c => [Rarity.EXOTIC, Rarity.HYPER].includes(c.rarity)),
  }
];
