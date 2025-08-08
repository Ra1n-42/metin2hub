type CharacterClass = 'Krieger' | 'Ninja' | 'Sura' | 'Schamane' | 'Lykaner';
type Gender = 'Männlich' | 'Weiblich' | 'Lykaner';

export interface Asset {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'map' | 'mount' | 'npc' | 'effect' | 'icon'| 'pet' | 'costumes';
  fileUrl: string;
  previewUrl?: string;

  classes?: CharacterClass[]; // Optional: Für welche Klassen ist es gedacht
  gender?: Gender[];          // Optional: Für welche Geschlechter
}


export const dummyAssets: Asset[] = [
    {
    id: '1',
    name: 'Schlangen-Großschwert',
    type: 'weapon',
    fileUrl: 'https://mega.nz/file/schlangen_grossschwert.gr2',
    previewUrl: 'https://de-wiki.metin2.gameforge.com/images/b/bf/Schlangengro%C3%9Fschwert_IG.png',
    classes: ['Krieger'],
    gender: ['Männlich', 'Weiblich'],
  },
  {
    id: '2',
    name: 'Ork-Rüstung',
    type: 'armor',
    fileUrl: 'https://mega.nz/file/ork_armor.gr2',
    previewUrl: 'https://example.com/previews/ork_armor.png',
    classes: ['Krieger', 'Ninja'],
    gender: ['Männlich'],
  },
  {
    id: '3',
    name: 'Feuerland',
    type: 'map',
    fileUrl: 'https://mega.nz/file/fireland.zip',
    previewUrl: 'https://example.com/previews/fireland.jpg',
  },
  {
    id: '4',
    name: 'Mondlicht-Dolch',
    type: 'weapon',
    fileUrl: 'https://mega.nz/file/mondlicht_dolch.gr2',
    previewUrl: 'https://example.com/previews/mondlicht_dolch.png',
    classes: ['Ninja', 'Sura'],
    gender: ['Männlich', 'Weiblich'],
  },
  {
    id: '5',
    name: 'Drachenrüstung',
    type: 'armor',
    fileUrl: 'https://mega.nz/file/drachenruestung.gr2',
    previewUrl: 'https://example.com/previews/drachenruestung.png',
    classes: ['Krieger', 'Sura'],
    gender: ['Weiblich'],
  },
  {
    id: '6',
    name: 'Dämonenturm',
    type: 'map',
    fileUrl: 'https://mega.nz/file/daemonturm.zip',
    previewUrl: 'https://example.com/previews/daemonturm.jpg',
  },
  {
    id: '7',
    name: 'Ork-NPC',
    type: 'npc',
    fileUrl: 'https://mega.nz/file/ork_npc.gr2',
    previewUrl: 'https://example.com/previews/ork_npc.png',
  },
  {
    id: '8',
    name: 'Giftbogen',
    type: 'weapon',
    fileUrl: 'https://mega.nz/file/giftbogen.gr2',
    previewUrl: 'https://example.com/previews/giftbogen.png',
    classes: ['Ninja'],
    gender: ['Männlich', 'Weiblich'],
  },
  {
    id: '9',
    name: 'Wüstenstadt',
    type: 'map',
    fileUrl: 'https://mega.nz/file/wuestenstadt.zip',
    previewUrl: 'https://example.com/previews/wuestenstadt.jpg',
  },
  {
    id: '10',
    name: 'Feuerdrache',
    type: 'npc',
    fileUrl: 'https://mega.nz/file/feuerdrache.gr2',
    previewUrl: 'https://example.com/previews/feuerdrache.png',
  },
  {
    id: '11',
    name: 'Feuerdrache',
    type: 'npc',
    fileUrl: 'https://mega.nz/file/feuerdrache.gr2',
    previewUrl: 'https://example.com/previews/feuerdrache.png',
  },
  {
    id: '12',
    name: 'Feuerdrache',
    type: 'npc',
    fileUrl: 'https://mega.nz/file/feuerdrache.gr2',
    previewUrl: 'https://example.com/previews/feuerdrache.png',
  },
  {
    id: '13',
    name: 'Feuerdrache',
    type: 'npc',
    fileUrl: 'https://mega.nz/file/feuerdrache.gr2',
    previewUrl: 'https://example.com/previews/feuerdrache.png',
  },
  {
    id: '14',
    name: 'Feuerdrache',
    type: 'npc',
    fileUrl: 'https://mega.nz/file/feuerdrache.gr2',
    previewUrl: 'https://example.com/previews/feuerdrache.png',
  },
  {
    id: '15',
    name: 'Fantasy cat pet',
    type: 'pet',
    fileUrl: 'https://mega.nz/file/feuerdrache.gr2',
    previewUrl: 'https://i0.wp.com/plechito.com/wp-content/uploads/2019/08/fantasy_cat_pet.jpg?ssl=1',
  },
  {
    id: '16',
    name: "Jiangshi's phoenix​",
    type: 'pet',
    fileUrl: '',
    previewUrl: 'https://i0.wp.com/plechito.com/wp-content/uploads/2023/10/pet15.jpg?ssl=1',
  },
  {
    id: '17',
    name: "The beyond horse​",
    type: 'mount',
    fileUrl: '',
    previewUrl: 'https://i0.wp.com/plechito.com/wp-content/uploads/2022/10/mount1.jpg?ssl=1',
  },
  {
    id: '18',
    name: "Gold dragon costumes​",
    type: 'costumes',
    fileUrl: '',
    previewUrl: 'https://i0.wp.com/plechito.com/wp-content/uploads/2019/12/gold_dragon_costumes.jpg?ssl=1',
  },

  {
    id: '19',
    name: 'Feuerdrache',
    type: 'npc',
    fileUrl: 'https://mega.nz/file/feuerdrache.gr2',
    previewUrl: 'https://example.com/previews/feuerdrache.png',
  },
  {
    id: '20',
    name: 'Feuerdrache',
    type: 'npc',
    fileUrl: 'https://mega.nz/file/feuerdrache.gr2',
    previewUrl: 'https://example.com/previews/feuerdrache.png',
  },
  {
    id: '21',
    name: 'Fantasy cat pet',
    type: 'pet',
    fileUrl: 'https://mega.nz/file/feuerdrache.gr2',
    previewUrl: 'https://i0.wp.com/plechito.com/wp-content/uploads/2019/08/fantasy_cat_pet.jpg?ssl=1',
  },
  {
    id: '22',
    name: "Jiangshi's phoenix​",
    type: 'pet',
    fileUrl: '',
    previewUrl: 'https://i0.wp.com/plechito.com/wp-content/uploads/2023/10/pet15.jpg?ssl=1',
  },
  {
    id: '23',
    name: "The beyond horse​",
    type: 'mount',
    fileUrl: '',
    previewUrl: 'https://i0.wp.com/plechito.com/wp-content/uploads/2022/10/mount1.jpg?ssl=1',
  },
  {
    id: '24',
    name: "Gold dragon costumes​",
    type: 'costumes',
    fileUrl: '',
    previewUrl: 'https://i0.wp.com/plechito.com/wp-content/uploads/2019/12/gold_dragon_costumes.jpg?ssl=1',
  },
  {
    id: '25',
    name: 'Feuerdrache',
    type: 'npc',
    fileUrl: 'https://mega.nz/file/feuerdrache.gr2',
    previewUrl: 'https://example.com/previews/feuerdrache.png',
  },
  {
    id: '26',
    name: 'Feuerdrache',
    type: 'npc',
    fileUrl: 'https://mega.nz/file/feuerdrache.gr2',
    previewUrl: 'https://example.com/previews/feuerdrache.png',
  },
  {
    id: '27',
    name: 'Feuerdrache',
    type: 'npc',
    fileUrl: 'https://mega.nz/file/feuerdrache.gr2',
    previewUrl: 'https://example.com/previews/feuerdrache.png',
  },
  {
    id: '28',
    name: 'Feuerdrache',
    type: 'npc',
    fileUrl: 'https://mega.nz/file/feuerdrache.gr2',
    previewUrl: 'https://example.com/previews/feuerdrache.png',
  },
  {
    id: '29',
    name: 'Feuerdrache',
    type: 'npc',
    fileUrl: 'https://mega.nz/file/feuerdrache.gr2',
    previewUrl: 'https://example.com/previews/feuerdrache.png',
  },
  {
    id: '30',
    name: 'Feuerdrache',
    type: 'npc',
    fileUrl: 'https://mega.nz/file/feuerdrache.gr2',
    previewUrl: 'https://example.com/previews/feuerdrache.png',
  },
];