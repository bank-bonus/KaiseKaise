
import { Rarity, Container, Car } from './types';

export const RARITY_LABELS: Record<Rarity, string> = {
  [Rarity.COMMON]: 'Бюджетный',
  [Rarity.PREMIUM]: 'Премиум',
  [Rarity.LUXURY]: 'Люкс',
  [Rarity.EXOTIC]: 'Экзотика',
  [Rarity.HYPER]: 'Гиперкар',
};

export const RARITY_COLORS: Record<Rarity, string> = {
  [Rarity.COMMON]: '#94a3b8',
  [Rarity.PREMIUM]: '#3b82f6',
  [Rarity.LUXURY]: '#a855f7',
  [Rarity.EXOTIC]: '#ef4444',
  [Rarity.HYPER]: '#fbbf24',
};

const MOCK_CARS: Car[] = [
  // JUNK / COMMON
  { id: 'j1', brand: 'LADA', model: '2107 (Ржавая)', rarity: Rarity.COMMON, basePrice: 5000, imageUrl: 'https://images.unsplash.com/photo-1603534123541-d61005f52818?q=80&w=400&auto=format&fit=crop' },
  { id: 'j2', brand: 'Ford', model: 'F-150 1980', rarity: Rarity.COMMON, basePrice: 8500, imageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=400&auto=format&fit=crop' },
  { id: 'j3', brand: 'UAZ', model: 'Buhanka', rarity: Rarity.COMMON, basePrice: 4200, imageUrl: 'https://images.unsplash.com/photo-1519245659620-e859806a8d3b?q=80&w=400&auto=format&fit=crop' },
  
  // COMMON
  { id: 'c1', brand: 'Toyota', model: 'Corolla GR', rarity: Rarity.COMMON, basePrice: 25000, imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=400&auto=format&fit=crop' },
  { id: 'c2', brand: 'Honda', model: 'Civic Type R', rarity: Rarity.COMMON, basePrice: 32000, imageUrl: 'https://images.unsplash.com/photo-1605515298946-d062f2e9da53?q=80&w=400&auto=format&fit=crop' },
  { id: 'c3', brand: 'Volkswagen', model: 'Golf GTI', rarity: Rarity.COMMON, basePrice: 28000, imageUrl: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=400&auto=format&fit=crop' },
  
  // PREMIUM
  { id: 'p1', brand: 'BMW', model: 'M4 Competition', rarity: Rarity.PREMIUM, basePrice: 85000, imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=400&auto=format&fit=crop' },
  { id: 'p4', brand: 'Nissan', model: 'GT-R R35', rarity: Rarity.PREMIUM, basePrice: 120000, imageUrl: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=400&auto=format&fit=crop' },

  // LUXURY
  { id: 'l1', brand: 'Porsche', model: '911 GT3 RS', rarity: Rarity.LUXURY, basePrice: 225000, imageUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=400&auto=format&fit=crop' },

  // EXOTIC
  { id: 'e1', brand: 'Lamborghini', model: 'Aventador SVJ', rarity: Rarity.EXOTIC, basePrice: 550000, imageUrl: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=400&auto=format&fit=crop' },

  // HYPER
  { id: 'h1', brand: 'Bugatti', model: 'Chiron Pur Sport', rarity: Rarity.HYPER, basePrice: 3500000, imageUrl: 'https://images.unsplash.com/photo-1600712242805-5f5d270b47e5?q=80&w=400&auto=format&fit=crop' },
];

export const CONTAINERS: Container[] = [
  {
    id: 'cont_junkyard',
    name: 'Забытый Сарай',
    price: 800,
    minLevel: 1,
    isMystery: true,
    isJunkyard: true,
    imageUrl: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=300&auto=format&fit=crop',
    cars: MOCK_CARS.filter(c => ['j1', 'j2', 'j3', 'c1', 'c4'].includes(c.id) || c.rarity === Rarity.COMMON),
  },
  {
    id: 'cont_budget',
    name: 'Городской поток',
    price: 3500,
    minLevel: 1,
    imageUrl: 'https://images.unsplash.com/photo-1494412574743-01103cb5d56b?q=80&w=300&auto=format&fit=crop',
    cars: MOCK_CARS.filter(c => [Rarity.COMMON].includes(c.rarity)),
  },
  {
    id: 'cont_sport',
    name: 'Уличный трек',
    price: 25000,
    minLevel: 5,
    imageUrl: 'https://images.unsplash.com/photo-1542362567-b055002b91f4?q=80&w=300&auto=format&fit=crop',
    cars: MOCK_CARS.filter(c => [Rarity.COMMON, Rarity.PREMIUM].includes(c.rarity)),
  },
  {
    id: 'cont_exotic',
    name: 'Элита Монако',
    price: 120000,
    minLevel: 10,
    imageUrl: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=300&auto=format&fit=crop',
    cars: MOCK_CARS.filter(c => [Rarity.LUXURY, Rarity.EXOTIC].includes(c.rarity)),
  },
  {
    id: 'cont_hyper',
    name: 'Прототипы',
    price: 850000,
    minLevel: 18,
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=300&auto=format&fit=crop',
    cars: MOCK_CARS.filter(c => [Rarity.EXOTIC, Rarity.HYPER].includes(c.rarity)),
  },
  {
    id: 'cont_secret',
    name: 'Секретный Ангар',
    price: 2500000,
    minLevel: 30,
    imageUrl: 'https://images.unsplash.com/photo-1462396240927-52058a6a84ec?q=80&w=300&auto=format&fit=crop',
    cars: MOCK_CARS.filter(c => [Rarity.HYPER].includes(c.rarity)),
  }
];
