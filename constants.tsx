
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
  // COMMON
  { id: 'c1', brand: 'Toyota', model: 'Corolla GR', rarity: Rarity.COMMON, basePrice: 25000, imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=400&auto=format&fit=crop' },
  { id: 'c2', brand: 'Honda', model: 'Civic Type R', rarity: Rarity.COMMON, basePrice: 32000, imageUrl: 'https://images.unsplash.com/photo-1605515298946-d062f2e9da53?q=80&w=400&auto=format&fit=crop' },
  { id: 'c3', brand: 'Volkswagen', model: 'Golf GTI', rarity: Rarity.COMMON, basePrice: 28000, imageUrl: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=400&auto=format&fit=crop' },
  { id: 'c4', brand: 'Mazda', model: 'MX-5 Miata', rarity: Rarity.COMMON, basePrice: 22000, imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=400&auto=format&fit=crop' },
  
  // PREMIUM
  { id: 'p1', brand: 'BMW', model: 'M4 Competition', rarity: Rarity.PREMIUM, basePrice: 85000, imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=400&auto=format&fit=crop' },
  { id: 'p2', brand: 'Audi', model: 'RS6 Avant', rarity: Rarity.PREMIUM, basePrice: 110000, imageUrl: 'https://images.unsplash.com/photo-1606148344602-0c9f13d80357?q=80&w=400&auto=format&fit=crop' },
  { id: 'p3', brand: 'Mercedes', model: 'C63 AMG', rarity: Rarity.PREMIUM, basePrice: 95000, imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=400&auto=format&fit=crop' },
  { id: 'p4', brand: 'Nissan', model: 'GT-R R35', rarity: Rarity.PREMIUM, basePrice: 120000, imageUrl: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=400&auto=format&fit=crop' },

  // LUXURY
  { id: 'l1', brand: 'Porsche', model: '911 GT3 RS', rarity: Rarity.LUXURY, basePrice: 225000, imageUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=400&auto=format&fit=crop' },
  { id: 'l2', brand: 'Mercedes', model: 'AMG GT Black Series', rarity: Rarity.LUXURY, basePrice: 325000, imageUrl: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=400&auto=format&fit=crop' },
  { id: 'l3', brand: 'Bentley', model: 'Continental GT', rarity: Rarity.LUXURY, basePrice: 250000, imageUrl: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?q=80&w=400&auto=format&fit=crop' },
  { id: 'l4', brand: 'Aston Martin', model: 'DB11', rarity: Rarity.LUXURY, basePrice: 210000, imageUrl: 'https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?q=80&w=400&auto=format&fit=crop' },

  // EXOTIC
  { id: 'e1', brand: 'Lamborghini', model: 'Aventador SVJ', rarity: Rarity.EXOTIC, basePrice: 550000, imageUrl: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=400&auto=format&fit=crop' },
  { id: 'e2', brand: 'Ferrari', model: 'SF90 Stradale', rarity: Rarity.EXOTIC, basePrice: 620000, imageUrl: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=400&auto=format&fit=crop' },
  { id: 'e3', brand: 'McLaren', model: '720S Spider', rarity: Rarity.EXOTIC, basePrice: 315000, imageUrl: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=400&auto=format&fit=crop' },
  { id: 'e4', brand: 'Ford', model: 'GT', rarity: Rarity.EXOTIC, basePrice: 500000, imageUrl: 'https://images.unsplash.com/photo-1589148625904-7106e0c607ce?q=80&w=400&auto=format&fit=crop' },

  // HYPER
  { id: 'h1', brand: 'Bugatti', model: 'Chiron Pur Sport', rarity: Rarity.HYPER, basePrice: 3500000, imageUrl: 'https://images.unsplash.com/photo-1600712242805-5f5d270b47e5?q=80&w=400&auto=format&fit=crop' },
  { id: 'h2', brand: 'Koenigsegg', model: 'Jesko Absolut', rarity: Rarity.HYPER, basePrice: 4200000, imageUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=400&auto=format&fit=crop' },
  { id: 'h3', brand: 'Pagani', model: 'Huayra BC', rarity: Rarity.HYPER, basePrice: 2800000, imageUrl: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=400&auto=format&fit=crop' },
  { id: 'h4', brand: 'Rimac', model: 'Nevera', rarity: Rarity.HYPER, basePrice: 2400000, imageUrl: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=400&auto=format&fit=crop' },
];

export const CONTAINERS: Container[] = [
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
