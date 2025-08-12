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
  thumbnail: string;
  set?: boolean;
  hotVotes?: number,
  allViewer?: number,
  price?: string;
  fileUrl?: string;
  gender?: Gender[];
  hoverImages?: string[];
  classes?: CharacterClass[];
  creator?: { name: string, avatar?: string, contact?: string}
}
export function getAssetById(id: number): Asset | null {
  const found = dummyAssets.find(asset => asset.id === id);
  return found ?? null;
}

export const dummyAssets: Asset[] = [
  {
    id: 1,
    name: "Admiral costumes",
    type: "costumes",
    thumbnail: "https://i0.wp.com/plechito.com/wp-content/uploads/2020/03/costume_admiral.jpg?ssl=1",
    hoverImages: [
      "https://i0.wp.com/plechito.com/wp-content/uploads/elementor/thumbs/Bez-n%C3%A1zvu-4-nymmkwjuoavu9hu3znb9fnsz8grd9g6x7601bpcvls.png?w=1200&ssl=1",
      "https://i0.wp.com/plechito.com/wp-content/uploads/2022/10/mount1.jpg?ssl=1",
      "https://i0.wp.com/plechito.com/wp-content/uploads/2018/11/Santa_claus.jpg"
    ],
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
    thumbnail: "https://i0.wp.com/plechito.com/wp-content/uploads/elementor/thumbs/Bez-n%C3%A1zvu-4-nymmkwjuoavu9hu3znb9fnsz8grd9g6x7601bpcvls.png?w=1200&ssl=1",
    fileUrl: "https://mega.nz/file/vlgXnYQB#8YL8rrh77GL7hI5rKhmVFwS0Ur8LGVG0AsFd94hPz1Q",
    creator: {name: "plechito", avatar: "https://www.metin2downloads.to/cms/images/avatars/7b/76141-7bc97f64a421617ae3553fcd1b1b4652e0697518.png"},
    set: true,
    classes: ['warrior', 'ninja', 'sura', 'shaman', 'lycan']
  },
  {
    id: 3,
    name: "The beyond horse",
    type: "mount",
    thumbnail: "https://i0.wp.com/plechito.com/wp-content/uploads/2022/10/mount1.jpg?ssl=1",
    fileUrl: "https://mega.nz/file/H85xnazT#MKbgOdPx3HdbdCN_iGT6yPJzGDnEYc9dj9AhHX_ex7I",
    creator: {name: "plechito", avatar: "https://www.metin2downloads.to/cms/images/avatars/7b/76141-7bc97f64a421617ae3553fcd1b1b4652e0697518.png"},
  },
  {
    id: 4,
    name: "Santa claus",
    type: "npc",
    thumbnail: "https://i0.wp.com/plechito.com/wp-content/uploads/2018/11/Santa_claus.jpg",
    fileUrl: "https://mega.nz/file/f5RmmYCS#06hjMsrg5-Y5J5sLcbwZ5oFEPAzwcn_2Ar1JLcuhS8Y",
    creator: {name: "plechito", avatar: "https://www.metin2downloads.to/cms/images/avatars/7b/76141-7bc97f64a421617ae3553fcd1b1b4652e0697518.png"},
  },
  {
    id: 5,
    name: "Blue death room",
    type: "map",
    thumbnail: "https://i0.wp.com/plechito.com/wp-content/uploads/2018/11/blue_death.png",
    fileUrl: "https://mega.nz/file/WkYTnKzR#cR6sj9toNxjOuIB9bYfFNTKG9t9HgX-SqJRMaQNHL0U",
    creator: {name: "plechito", avatar: "https://www.metin2downloads.to/cms/images/avatars/7b/76141-7bc97f64a421617ae3553fcd1b1b4652e0697518.png"},
  },
  {
    id: 6,
    name: "Warrior Black Wind Suit",
    type: "armor",
    thumbnail: "https://metin2.download/picture/47jzB0bYT6BjrFsJSF92Re7iGmC9X1g5/.jpg",
    fileUrl: "https://mega.nz/file/Pls0GCyK#…JhspDD8yOmybt8l4QB3p7sGjQ",
    creator: {name: "Tatsumaru", avatar: "https://www.metin2downloads.to/cms/images/avatars/f7/79962-f7ec13be781c262ed103c5e1b1b2a45bbe553abf.jpg"},
    classes: ["warrior"],
    gender: ["male"],
  },
  {
    id: 7,
    name: "Jiangshi's phoenix​",
    type: "pet",
    thumbnail: "https://i0.wp.com/plechito.com/wp-content/uploads/2023/10/pet15.jpg?ssl=1",
    fileUrl: "https://mega.nz/file/SgoFQCJR#0FExmP4UXBl4zVvPdpKZt9ppMPHKtYJ6P_Q7YdKN2CQ",
    creator: {name: "plechito", avatar: "https://www.metin2downloads.to/cms/images/avatars/7b/76141-7bc97f64a421617ae3553fcd1b1b4652e0697518.png"},
  },
  {
    id: 8,
    name: "Royal phoenix costumes",
    type: "costumes",
    thumbnail: "https://i0.wp.com/plechito.com/wp-content/uploads/2021/10/costume_royal_phoenix.jpg?ssl=1",
    fileUrl: "https://mega.nz/file/64gxjaaR#-p5lpmN8GBUbySZ8zhcmWzGsRqlvlbwgeiRLn8UVkW8",
    creator: {name: "plechito", avatar: "https://www.metin2downloads.to/cms/images/avatars/7b/76141-7bc97f64a421617ae3553fcd1b1b4652e0697518.png"},
    set: true,
    gender: ["male", "female"],
    classes: ['warrior', 'ninja', 'sura', 'shaman', 'lycan'],
  },
  {
    id: 8,
    name: "Ancient arena",
    type: "map",
    thumbnail: "https://i0.wp.com/plechito.com/wp-content/uploads/2025/04/map.jpg?ssl=1",
    creator: {name: "plechito", avatar: "https://www.metin2downloads.to/cms/images/avatars/7b/76141-7bc97f64a421617ae3553fcd1b1b4652e0697518.png", contact:"https://discord.com/users/504640690190417920"},
    price: "30€",   
  },
  {
    id: 9,
    name: "Guild wars map 3",
    type: "map",
    thumbnail: "https://i0.wp.com/plechito.com/wp-content/uploads/2018/10/guild_wars_map3.png",
    creator: {name: "plechito", avatar: "https://www.metin2downloads.to/cms/images/avatars/7b/76141-7bc97f64a421617ae3553fcd1b1b4652e0697518.png", contact:"https://discord.com/users/504640690190417920"},
    price: "30€",   
  },
  {
    id: 10,
    name: "Guild wars map 2",
    type: "map",
    thumbnail: "https://i0.wp.com/plechito.com/wp-content/uploads/2018/10/guild_wars_map2.png",
    creator: {name: "plechito", avatar: "https://www.metin2downloads.to/cms/images/avatars/7b/76141-7bc97f64a421617ae3553fcd1b1b4652e0697518.png", contact:"https://discord.com/users/504640690190417920"},
    price: "20€",   
  },
];