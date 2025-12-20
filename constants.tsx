
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
  // --- JUNK / COMMON ---
  { id: 'j1', brand: 'LADA', model: '2107 (Ржавая)', rarity: Rarity.COMMON, basePrice: 4500, imageUrl: 'https://images.unsplash.com/photo-1603534123541-d61005f52818?q=80&w=400&auto=format&fit=crop' },
  { id: 'j2', brand: 'Ford', model: 'F-150 1980 (Битый)', rarity: Rarity.COMMON, basePrice: 8500, imageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=400&auto=format&fit=crop' },
  { id: 'j3', brand: 'UAZ', model: 'Buhanka', rarity: Rarity.COMMON, basePrice: 4200, imageUrl: 'https://images.unsplash.com/photo-1519245659620-e859806a8d3b?q=80&w=400&auto=format&fit=crop' },
  { id: 'j4', brand: 'Volkswagen', model: 'Golf MK2', rarity: Rarity.COMMON, basePrice: 3200, imageUrl: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=400&auto=format&fit=crop' },
  { id: 'j5', brand: 'ZAZ', model: '968M', rarity: Rarity.COMMON, basePrice: 1500, imageUrl: 'https://images.unsplash.com/photo-1566232392379-afd9298e6a46?q=80&w=400&auto=format&fit=crop' },
  
  // --- COMMON (Normal condition) ---
  { id: 'c1', brand: 'Toyota', model: 'Corolla GR', rarity: Rarity.COMMON, basePrice: 25000, imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=400&auto=format&fit=crop' },
  { id: 'c2', brand: 'Honda', model: 'Civic Type R', rarity: Rarity.COMMON, basePrice: 32000, imageUrl: 'https://images.unsplash.com/photo-1605515298946-d062f2e9da53?q=80&w=400&auto=format&fit=crop' },
  { id: 'c3', brand: 'Mazda', model: 'MX-5 Miata', rarity: Rarity.COMMON, basePrice: 22000, imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=400&auto=format&fit=crop' },

  // --- PREMIUM ---
  { id: 'p1', brand: 'BMW', model: 'M4 Competition', rarity: Rarity.PREMIUM, basePrice: 85000, imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=400&auto=format&fit=crop' },
  { id: 'p2', brand: 'Audi', model: 'RS6 Avant', rarity: Rarity.PREMIUM, basePrice: 115000, imageUrl: 'https://images.unsplash.com/photo-1606148344602-0c9f13d80357?q=80&w=400&auto=format&fit=crop' },
  { id: 'p3', brand: 'Mercedes', model: 'C63 AMG', rarity: Rarity.PREMIUM, basePrice: 95000, imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=400&auto=format&fit=crop' },

  // --- LUXURY ---
  { id: 'l1', brand: 'Porsche', model: '911 GT3 RS', rarity: Rarity.LUXURY, basePrice: 225000, imageUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=400&auto=format&fit=crop' },
  { id: 'l2', brand: 'Bentley', model: 'Continental GT', rarity: Rarity.LUXURY, basePrice: 280000, imageUrl: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=400&auto=format&fit=crop' },

  // --- EXOTIC ---
  { id: 'e1', brand: 'Lamborghini', model: 'Aventador SVJ', rarity: Rarity.EXOTIC, basePrice: 550000, imageUrl: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=400&auto=format&fit=crop' },
  { id: 'e2', brand: 'Ferrari', model: 'SF90 Stradale', rarity: Rarity.EXOTIC, basePrice: 620000, imageUrl: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=400&auto=format&fit=crop' },

  // --- HYPER ---
  { id: 'h1', brand: 'Bugatti', model: 'Chiron Pur Sport', rarity: Rarity.HYPER, basePrice: 3500000, imageUrl: 'https://images.unsplash.com/photo-1600712242805-5f5d270b47e5?q=80&w=400&auto=format&fit=crop' },
  { id: 'h2', brand: 'Koenigsegg', model: 'Jesko Absolut', rarity: Rarity.HYPER, basePrice: 4100000, imageUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=400&auto=format&fit=crop' },
];

export const CONTAINERS: Container[] = [
  {
    id: 'cont_junkyard',
    name: 'Забытый Сарай',
    price: 800,
    minLevel: 1,
    isJunkyard: true,
    imageUrl: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=300&auto=format&fit=crop',
    cars: MOCK_CARS.filter(c => c.id.startsWith('j')),
  },
  {
    id: 'cont_mystery',
    name: 'Гаражная Находка',
    price: 2500,
    minLevel: 2,
    isMystery: true,
    imageUrl: 'https://images.unsplash.com/photo-1517524006039-e8d44da3a702?q=80&w=300&auto=format&fit=crop',
    cars: MOCK_CARS.filter(c => [Rarity.COMMON, Rarity.PREMIUM, Rarity.LUXURY].includes(c.rarity)),
  },
  {
    id: 'cont_budget',
    name: 'Городской поток',
    price: 3500,
    minLevel: 1,
    imageUrl: 'https://images.unsplash.com/photo-1494412574743-01103cb5d56b?q=80&w=300&auto=format&fit=crop',
    cars: MOCK_CARS.filter(c => c.rarity === Rarity.COMMON && !c.id.startsWith('j')),
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
    price: 150000,
    minLevel: 10,
    imageUrl: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=300&auto=format&fit=crop',
    cars: MOCK_CARS.filter(c => [Rarity.LUXURY, Rarity.EXOTIC].includes(c.rarity)),
  },
  {
    id: 'cont_hyper',
    name: 'Прототипы',
    price: 950000,
    minLevel: 20,
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=300&auto=format&fit=crop',
    cars: MOCK_CARS.filter(c => [Rarity.EXOTIC, Rarity.HYPER].includes(c.rarity)),
  }
];
