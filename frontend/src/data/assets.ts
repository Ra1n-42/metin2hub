export type CharacterClass = 'warrior' | 'ninja' | 'sura' | 'shaman' | 'lycan';
type Gender = 'male' | 'female' ;
type AssetType = 'weapon' | 'armor' | 'map' | 'mount' | 'npc' | 'effect' | 'icon'| 'pet' | 'costumes';

// Angepasste Hilfsfunktion, die die neuen Typen nutzt
export const getCharacterImage = (
  charClass: CharacterClass,
  charGender?: Gender
): string => {
  if (charClass === 'lycan') {
    return `/class_images/lycan.png`;
  }

  if (charGender) {
    return `/class_images/${charClass}_${charGender.charAt(0)}.png`;
  }

  // Fallback, falls kein Geschlecht angegeben ist (z.B. ein Klassen-Icon)
  return `/class_images/${charClass}_m.png`;
};

export interface Asset {
  id: number;
  name: string;
  type: AssetType;
  fileUrl: string;
  creator?: { name: string, avatar?: string}
  previewUrl?: string;
  set?: boolean;
  classes?: CharacterClass[];
  gender?: Gender[];          
}


export const dummyAssets: Asset[] = [
  {
    id: 1,
    name: "Admiral costumes",
    type: "costumes",
    previewUrl: "https://i0.wp.com/plechito.com/wp-content/uploads/2020/03/costume_admiral.jpg?ssl=1",
    fileUrl: "https://mega.nz/file/vlgXnYQB#8YL8rrh77GL7hI5rKhmVFwS0Ur8LGVG0AsFd94hPz1Q",
    creator: {name: "plechito", avatar: "https://www.metin2downloads.to/cms/images/avatars/7b/76141-7bc97f64a421617ae3553fcd1b1b4652e0697518.png"},
    set: true,
    gender: ["male", "female"],
    classes: ['warrior', 'ninja', 'sura', 'shaman', 'lycan'],
  },
  {
    id: 2,
    name: "Magic bird weapons",
    type: "weapon",
    previewUrl: "https://i0.wp.com/plechito.com/wp-content/uploads/elementor/thumbs/Bez-n%C3%A1zvu-4-nymmkwjuoavu9hu3znb9fnsz8grd9g6x7601bpcvls.png?w=1200&ssl=1",
    fileUrl: "https://mega.nz/file/vlgXnYQB#8YL8rrh77GL7hI5rKhmVFwS0Ur8LGVG0AsFd94hPz1Q",
    creator: {name: "plechito", avatar: "https://www.metin2downloads.to/cms/images/avatars/7b/76141-7bc97f64a421617ae3553fcd1b1b4652e0697518.png"},
    set: true,
    classes: ['warrior', 'ninja', 'sura', 'shaman', 'lycan']
  },
  {
    id: 3,
    name: "The beyond horse",
    type: "mount",
    previewUrl: "https://i0.wp.com/plechito.com/wp-content/uploads/2022/10/mount1.jpg?ssl=1",
    fileUrl: "https://mega.nz/file/H85xnazT#MKbgOdPx3HdbdCN_iGT6yPJzGDnEYc9dj9AhHX_ex7I",
    creator: {name: "plechito", avatar: "https://www.metin2downloads.to/cms/images/avatars/7b/76141-7bc97f64a421617ae3553fcd1b1b4652e0697518.png"},
  },
];