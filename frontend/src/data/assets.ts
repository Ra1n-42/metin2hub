type CharacterClass = 'Krieger' | 'Ninja' | 'Sura' | 'Schamane' | 'Lykaner';
type Gender = 'Männlich' | 'Weiblich' | 'Lykaner';

export interface Asset {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'map' | 'mount' | 'npc' | 'effect' | 'icon';
  fileUrl: string;
  previewUrl?: string;

  classes?: CharacterClass[]; // Optional: Für welche Klassen ist es gedacht
  gender?: Gender[];          // Optional: Für welche Geschlechter
}


export const dummyAssets: Asset[] = [
    {
        id: '1',
        name: 'Schlangen- großschwert',
        type: 'weapon',
        fileUrl: '/downloads/dragon_sword.gr2',
        previewUrl: 'https://de-wiki.metin2.gameforge.com/images/b/bf/Schlangengro%C3%9Fschwert_IG.png',
        classes: ['Krieger', 'Sura'],
        gender: ['Männlich', 'Weiblich']
    },
  {
    id: '2',
    name: 'Ork-Rüstung',
    type: 'armor',
    fileUrl: '/downloads/ork_armor.gr2',
    previewUrl: '/previews/ork_armor.png',
  },
  {
    id: '3',
    name: 'Feuerland',
    type: 'map',
    fileUrl: '/downloads/fireland.zip',
  },
];