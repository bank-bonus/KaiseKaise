
import { Rarity, Case, Skin } from './types';

export const RARITY_COLORS: Record<Rarity, string> = {
  [Rarity.BLUE]: '#4b69ff',
  [Rarity.PURPLE]: '#8847ff',
  [Rarity.PINK]: '#d32ee6',
  [Rarity.RED]: '#eb4b4b',
  [Rarity.GOLD]: '#ffae39',
};

const MOCK_SKINS: Skin[] = [
  // BLUE
  { id: 'b1', weapon: 'Glock-18', name: 'Candy Apple', rarity: Rarity.BLUE, price: 0.5, imageUrl: 'https://picsum.photos/seed/glock1/300/200' },
  { id: 'b2', weapon: 'USP-S', name: 'Cyrex', rarity: Rarity.BLUE, price: 1.2, imageUrl: 'https://picsum.photos/seed/usps1/300/200' },
  { id: 'b3', weapon: 'MP9', name: 'Ruby Poison Dart', rarity: Rarity.BLUE, price: 0.8, imageUrl: 'https://picsum.photos/seed/mp91/300/200' },
  // PURPLE
  { id: 'p1', weapon: 'AK-47', name: 'Blue Laminate', rarity: Rarity.PURPLE, price: 5.5, imageUrl: 'https://picsum.photos/seed/ak471/300/200' },
  { id: 'p2', weapon: 'M4A4', name: 'Evil Daimyo', rarity: Rarity.PURPLE, price: 4.2, imageUrl: 'https://picsum.photos/seed/m4a41/300/200' },
  { id: 'p3', weapon: 'AWP', name: 'PAW', rarity: Rarity.PURPLE, price: 6.8, imageUrl: 'https://picsum.photos/seed/awp1/300/200' },
  // PINK
  { id: 'pi1', weapon: 'AK-47', name: 'Redline', rarity: Rarity.PINK, price: 25.0, imageUrl: 'https://picsum.photos/seed/ak472/300/200' },
  { id: 'pi2', weapon: 'M4A1-S', name: 'Hyper Beast', rarity: Rarity.PINK, price: 32.0, imageUrl: 'https://picsum.photos/seed/m4a1s1/300/200' },
  { id: 'pi3', weapon: 'AWP', name: 'Asiimov', rarity: Rarity.PINK, price: 120.0, imageUrl: 'https://picsum.photos/seed/awp2/300/200' },
  // RED
  { id: 'r1', weapon: 'M4A4', name: 'Howl', rarity: Rarity.RED, price: 5500.0, imageUrl: 'https://picsum.photos/seed/m4a42/300/200' },
  { id: 'r2', weapon: 'AK-47', name: 'Fire Serpent', rarity: Rarity.RED, price: 1200.0, imageUrl: 'https://picsum.photos/seed/ak473/300/200' },
  { id: 'r3', weapon: 'AWP', name: 'Dragon Lore', rarity: Rarity.RED, price: 15000.0, imageUrl: 'https://picsum.photos/seed/awp3/300/200' },
  // GOLD
  { id: 'g1', weapon: 'Karambit', name: 'Doppler', rarity: Rarity.GOLD, price: 800.0, imageUrl: 'https://picsum.photos/seed/knife1/300/200' },
  { id: 'g2', weapon: 'M9 Bayonet', name: 'Gamma Doppler', rarity: Rarity.GOLD, price: 1200.0, imageUrl: 'https://picsum.photos/seed/knife2/300/200' },
];

export const CASES: Case[] = [
  {
    id: 'case_chroma',
    name: 'Chroma Case',
    price: 2.5,
    imageUrl: 'https://picsum.photos/seed/case1/200/200',
    skins: MOCK_SKINS,
  },
  {
    id: 'case_gamma',
    name: 'Gamma Case',
    price: 3.5,
    imageUrl: 'https://picsum.photos/seed/case2/200/200',
    skins: MOCK_SKINS.slice(3),
  },
  {
    id: 'case_wildfire',
    name: 'Wildfire Case',
    price: 1.5,
    imageUrl: 'https://picsum.photos/seed/case3/200/200',
    skins: MOCK_SKINS.filter(s => s.rarity !== Rarity.GOLD),
  }
];
