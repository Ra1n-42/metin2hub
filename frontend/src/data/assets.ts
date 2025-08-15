export type CharacterClass = 'warrior' | 'ninja' | 'sura' | 'shaman' | 'lycan';
export const assetTypes = ['weapon', 'armor', 'map', 'mount', 'npc', 'effect', 'icon', 'pet', 'costumes', "metinstone", "boss"] as const;
type Gender = 'male' | 'female' ;

// AssetType will be: 'weapon' | 'armor' | 'map' | 'mount' | 'npc' | 'effect' | 'icon'| 'pet' | 'costumes'
type AssetType = typeof assetTypes[number];

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
  creator?: { name: string, avatar?: string, contact?: string, verified?: boolean},

  description?: string;
  descriptionHtml?: string;
}
export function getAssetById(id: number): Asset | null {
  const found = dummyAssets.find(asset => asset.id === id);
  return found ?? null;
}

export const dummyAssets: Asset[] = [
  {
    id: 1,
    name: "Admiral costumes (with test details)",
    type: "costumes",
    thumbnail: "https://i0.wp.com/plechito.com/wp-content/uploads/2020/03/costume_admiral.jpg?ssl=1",
    hoverImages: [
      "https://i0.wp.com/plechito.com/wp-content/uploads/elementor/thumbs/Bez-n%C3%A1zvu-4-nymmkwjuoavu9hu3znb9fnsz8grd9g6x7601bpcvls.png?w=1200&ssl=1",
      "https://i0.wp.com/plechito.com/wp-content/uploads/2022/10/mount1.jpg?ssl=1",
      "https://i0.wp.com/plechito.com/wp-content/uploads/2018/11/Santa_claus.jpg",
    ],
    fileUrl: "https://mega.nz/file/vlgXnYQB#8YL8rrh77GL7hI5rKhmVFwS0Ur8LGVG0AsFd94hPz1Q",
    creator: {name: "plechito", verified: true, avatar: "https://www.metin2downloads.to/cms/images/avatars/7b/76141-7bc97f64a421617ae3553fcd1b1b4652e0697518.png"},
    set: true,
    gender: ["male", "female"],
    classes: ['warrior', 'ninja', 'sura', 'shaman', 'lycan'],
    description: `**What's Included:**
    • Hair (Hats) are included
    • Icons are included
    • Password for .rar – **www.plechito.com**

    *High-quality textures and detailed modeling for all character classes.*`,
  },
  {
    id: 2,
    name: "Magic bird weapons",
    type: "weapon",
    thumbnail: "https://i0.wp.com/plechito.com/wp-content/uploads/elementor/thumbs/Bez-n%C3%A1zvu-4-nymmkwjuoavu9hu3znb9fnsz8grd9g6x7601bpcvls.png?w=1200&ssl=1",
    fileUrl: "https://mega.nz/file/vlgXnYQB#8YL8rrh77GL7hI5rKhmVFwS0Ur8LGVG0AsFd94hPz1Q",
    creator: {name: "plechito", verified: true, avatar: "https://www.metin2downloads.to/cms/images/avatars/7b/76141-7bc97f64a421617ae3553fcd1b1b4652e0697518.png"},
    set: true,
    classes: ['warrior', 'ninja', 'sura', 'shaman', 'lycan']
  },
  {
    id: 3,
    name: "The beyond horse",
    type: "mount",
    thumbnail: "https://i0.wp.com/plechito.com/wp-content/uploads/2022/10/mount1.jpg?ssl=1",
    fileUrl: "https://mega.nz/file/H85xnazT#MKbgOdPx3HdbdCN_iGT6yPJzGDnEYc9dj9AhHX_ex7I",
    creator: {name: "plechito", verified: true, avatar: "https://www.metin2downloads.to/cms/images/avatars/7b/76141-7bc97f64a421617ae3553fcd1b1b4652e0697518.png"},
  },
  {
    id: 4,
    name: "Santa claus",
    type: "npc",
    thumbnail: "https://i0.wp.com/plechito.com/wp-content/uploads/2018/11/Santa_claus.jpg",
    fileUrl: "https://mega.nz/file/f5RmmYCS#06hjMsrg5-Y5J5sLcbwZ5oFEPAzwcn_2Ar1JLcuhS8Y",
    creator: {name: "plechito", verified: true, avatar: "https://www.metin2downloads.to/cms/images/avatars/7b/76141-7bc97f64a421617ae3553fcd1b1b4652e0697518.png"},
  },
  {
    id: 5,
    name: "Blue death room",
    type: "map",
    thumbnail: "https://i0.wp.com/plechito.com/wp-content/uploads/2018/11/blue_death.png",
    fileUrl: "https://mega.nz/file/WkYTnKzR#cR6sj9toNxjOuIB9bYfFNTKG9t9HgX-SqJRMaQNHL0U",
    creator: {name: "plechito", verified: true, avatar: "https://www.metin2downloads.to/cms/images/avatars/7b/76141-7bc97f64a421617ae3553fcd1b1b4652e0697518.png"},
  },
  {
    id: 6,
    name: "Warrior Black Wind Suit",
    type: "armor",
    thumbnail: "https://metin2.download/picture/47jzB0bYT6BjrFsJSF92Re7iGmC9X1g5/.jpg",
    fileUrl: "https://mega.nz/file/Pls0GCyK#…JhspDD8yOmybt8l4QB3p7sGjQ",
    creator: {name: "Tatsumaru", verified: true, avatar: "https://www.metin2downloads.to/cms/images/avatars/f7/79962-f7ec13be781c262ed103c5e1b1b2a45bbe553abf.jpg"},
    classes: ["warrior"],
    gender: ["male"],
  },
  {
    id: 7,
    name: "Jiangshi's phoenix​",
    type: "pet",
    thumbnail: "https://i0.wp.com/plechito.com/wp-content/uploads/2023/10/pet15.jpg?ssl=1",
    fileUrl: "https://mega.nz/file/SgoFQCJR#0FExmP4UXBl4zVvPdpKZt9ppMPHKtYJ6P_Q7YdKN2CQ",
    creator: {name: "plechito", verified: true, avatar: "https://www.metin2downloads.to/cms/images/avatars/7b/76141-7bc97f64a421617ae3553fcd1b1b4652e0697518.png"},
    description: `Archive password – **www.plechito.com**

    This mystical pet features animated flames and particle effects.`,
  },
  {
    id: 8,
    name: "Royal phoenix costumes",
    type: "costumes",
    thumbnail: "https://i0.wp.com/plechito.com/wp-content/uploads/2021/10/costume_royal_phoenix.jpg?ssl=1",
    fileUrl: "https://mega.nz/file/64gxjaaR#-p5lpmN8GBUbySZ8zhcmWzGsRqlvlbwgeiRLn8UVkW8",
    creator: {name: "plechito", verified: true, avatar: "https://www.metin2downloads.to/cms/images/avatars/7b/76141-7bc97f64a421617ae3553fcd1b1b4652e0697518.png"},
    set: true,
    gender: ["male", "female"],
    classes: ['warrior', 'ninja', 'sura', 'shaman', 'lycan'],
  },
  {
    id: 9,
    name: "Ancient arena",
    type: "map",
    thumbnail: "https://i0.wp.com/plechito.com/wp-content/uploads/2025/04/map.jpg?ssl=1",
    creator: {name: "plechito", verified: true, avatar: "https://www.metin2downloads.to/cms/images/avatars/7b/76141-7bc97f64a421617ae3553fcd1b1b4652e0697518.png", contact:"https://discord.com/users/504640690190417920"},
    price: "30€",   
  },
  {
    id: 10,
    name: "Guild wars map 3",
    type: "map",
    thumbnail: "https://i0.wp.com/plechito.com/wp-content/uploads/2018/10/guild_wars_map3.png",
    creator: {name: "plechito", verified: true, avatar: "https://www.metin2downloads.to/cms/images/avatars/7b/76141-7bc97f64a421617ae3553fcd1b1b4652e0697518.png", contact:"https://discord.com/users/504640690190417920"},
    price: "30€",   
  },
  {
    id: 11,
    name: "Guild wars map 2",
    type: "map",
    thumbnail: "https://i0.wp.com/plechito.com/wp-content/uploads/2018/10/guild_wars_map2.png",
    creator: {name: "plechito", verified: true, avatar: "https://www.metin2downloads.to/cms/images/avatars/7b/76141-7bc97f64a421617ae3553fcd1b1b4652e0697518.png", contact:"https://discord.com/users/504640690190417920"},
    price: "20€",   
  },
  {
    id: 12,
    name: "Biogolist Icon Pack",
    type: "icon",
    set: true,
    fileUrl: "https://mega.nz/file/9g0HBJTD#5pBdsPGP_2s8deBRSe1A7L_iWQOaifFyePz2kwgYlHo",
    thumbnail: "https://metin2.download/picture/7CwBdxemZT2i7BeUWY655dF2a1JfhZrz/.png",
    creator: {name: "creatifyx", verified: false, avatar: "https://www.metin2downloads.to/cms/images/avatars/34/104570-347e09815fe04ce58b0f1b9b33d3237f2b5c4f74.png"},
  },
  {
    id: 13,
    name: "Fire Dragon Weapon Set",
    type: "weapon",
    set: true,
    fileUrl: "https://metin2.download/file/WPXp4pKf15CXwmT0S307aK5guv1MRHjv/",
    thumbnail: "https://metin2.download/picture/9QjlailLA4yVN00MrJEbH6Op1ki2yma5/.png",
    hoverImages: ["https://metin2.download/picture/bY0S043zX3ri8518L77NvoPwiCXa7G07/.gif", "https://metin2.download/picture/t85aAjZEqWUfCH9QKt0R3coz3mPI4gw8/.png"],
    creator: {name: "Zrye", verified: true, avatar: "https://metin2.dev/uploads/profile-photos/monthly_2025_07/Unbenannt-1.thumb.jpg.f4928dfaa7ff595bb845a16b22641876.jpg"},
    descriptionHtml: `
      <div class="creator-description">
        <h3 style="color: #ff6b35; margin-bottom: 10px;">🔥 Fire Dragon Arsenal</h3>
        <div style="background: linear-gradient(135deg, #ff9a56, #ff6b35); padding: 15px; border-radius: 10px; color: white; margin: 10px 0;">
          <strong>Special Features:</strong>
          <ul style="margin: 8px 0; padding-left: 20px;">
            <li>Animated flame effects</li>
            <li>Custom particle systems</li>
            <li>Enhanced weapon glow</li>
          </ul>
        </div>
        <p><em>Installation guide included in download package.</em></p>
      </div>`,
  },
  {
    id: 14,
    name: "Drop Effect",
    type: "effect",
    thumbnail: "https://realis3d.xyz/images/4ae5ace2-1b2a-4d88-922b-c373dcab4128.gif",
    fileUrl: "https://realis3d.xyz/product/67081f0952732bd598f97582",
    creator: {name: "Realis", verified: true, avatar: "https://www.metin2downloads.to/cms/images/avatars/ab/103971-ab61f108721c673234430036a5c3374851f1d8f0.png"},
  },
  {
    id: 15,
    name: "Molten Cerberus Mount",
    type: "mount",
    thumbnail: "https://realis3d.xyz/images/4abfeec8-6199-4524-8e62-f8d470a47adf.png",
    hoverImages: ["https://realis3d.xyz/images/f2a59d6b-3c11-449e-910a-651ee242bfd0.mp4","https://realis3d.xyz/images/b44e20bc-266d-47d3-942d-59a931f21c55.mp4"],
    fileUrl: "https://realis3d.xyz/product/6709435252732bd598f97589",
    creator: {name: "Realis", verified: true, avatar: "https://www.metin2downloads.to/cms/images/avatars/ab/103971-ab61f108721c673234430036a5c3374851f1d8f0.png"},
  },
  {
    id: 16,
    name: "Batty Hatty",
    type: "pet",
    thumbnail: "https://realis3d.xyz/images/b4bc3c62-6935-4237-8488-29f38d83eccc.png",
    hoverImages: ["https://realis3d.xyz/images/acfbc813-ae30-4bc0-8eeb-48ae395492b6.mp4", "https://realis3d.xyz/images/adb09caf-7ee2-4660-b99c-5371fd28eadc.mp4"],
    creator: {name: "Realis", verified: true, avatar: "https://www.metin2downloads.to/cms/images/avatars/ab/103971-ab61f108721c673234430036a5c3374851f1d8f0.png"},
    fileUrl: "https://realis3d.xyz/product/671a9cf85639084c2155bfea",
  },
  {
    id: 17,
    name: "Candle Wisp Pet",
    type: "pet",
    thumbnail: "https://realis3d.xyz/images/fdafe3c1-5423-46bb-9550-1018ead02780.png",
    hoverImages: ["https://realis3d.xyz/images/e969e748-1b89-4cfe-9c6c-9ccbc39898b3.mp4", "https://realis3d.xyz/images/d643cfce-e7c5-4fd8-8df6-d67840bd3465.mp4"],
    creator: {name: "Realis", verified: true, avatar: "https://www.metin2downloads.to/cms/images/avatars/ab/103971-ab61f108721c673234430036a5c3374851f1d8f0.png"},
    fileUrl: "https://realis3d.xyz/product/6709365952732bd598f97588",
  },
  {
    id: 18,
    name: "Light black steel armour",
    thumbnail: "https://i.imgur.com/t7NwAvy.jpg",
    hoverImages: ["https://i.imgur.com/D1qbedI.gif", "https://i.imgur.com/JOQbLMh.gif"],
    fileUrl: "https://mega.nz/file/GlsxBRZS#xYvcpg0khzf0iL_6LxjJqKoFOCaYJpKNAwLO5LulRLE",
    creator: {name: "Tatsumaru", verified: true, avatar: "https://www.metin2downloads.to/cms/images/avatars/f7/79962-f7ec13be781c262ed103c5e1b1b2a45bbe553abf.jpg"},
    type: "armor",
    gender: ["male"],
    classes: ["warrior"],
  },
  {
    id: 19,
    type: "armor",
    name:"Jotun-Thrym set",
    thumbnail: "https://i.imgur.com/k2ffU5V.png",
    fileUrl: "https://mega.nz/file/fp0CSRqT#GfVnqp_TJxUwjEyEK6WKzozG9AxF8_xtW6xZkPGqZvY",
    set: true,
    creator: {name: "Tatsumaru", verified: true, avatar: "https://www.metin2downloads.to/cms/images/avatars/f7/79962-f7ec13be781c262ed103c5e1b1b2a45bbe553abf.jpg"},
    gender: ["female", "male"],
    classes: ["warrior", "ninja", "sura", "shaman"],
  },
  {
    id: 20,
    type: "mount",
    name: "3 Rhinno mounts",
    thumbnail: "https://i0.wp.com/plechito.com/wp-content/uploads/2021/07/mounts_rhinno.jpg?ssl=1",
    fileUrl: "https://mega.nz/file/SowySBiJ#DUrYCt-_6YqguJ5oWETMGNobrqUS_RhWWVBfk8_UoGU",
    creator: {name: "plechito", verified: true, avatar: "https://www.metin2downloads.to/cms/images/avatars/7b/76141-7bc97f64a421617ae3553fcd1b1b4652e0697518.png", contact:"https://discord.com/users/504640690190417920"},
  },
  {
    id: 21,
    type: "boss",
    name: "Fish boss",
    thumbnail: "https://i0.wp.com/plechito.com/wp-content/uploads/elementor/thumbs/fishboss-o9n274m9rkjqwayy6nctikhqykij7t47g0jxxciyo0.jpg?w=1200&ssl=1",
    creator: {name: "plechito", verified: true, avatar: "https://www.metin2downloads.to/cms/images/avatars/7b/76141-7bc97f64a421617ae3553fcd1b1b4652e0697518.png", contact:"https://discord.com/users/504640690190417920"},
    fileUrl: "https://mega.nz/file/Gp52HaJK#5hwjChm6pvVcHWT5KckkM166N6j0jn-aC1gqR7lgh3Y",
  },
  {
    id: 22,
    type: "boss",
    name: "Underground troll boss",
    thumbnail: "https://i0.wp.com/plechito.com/wp-content/uploads/2019/06/duratus_trollboss.jpg?ssl=1",
    creator: {name: "plechito", verified: true, avatar: "https://www.metin2downloads.to/cms/images/avatars/7b/76141-7bc97f64a421617ae3553fcd1b1b4652e0697518.png", contact:"https://discord.com/users/504640690190417920"},
    fileUrl: "https://mega.nz/file/79QDiSYa#Lo_bLvUAQ2NLswrpXQh9HCbhHcjKyPxtrQ4800Y6jc8",
  },
  {
    id: 23,
    type: "boss",
    name: "Plant boss",
    thumbnail: "https://i0.wp.com/plechito.com/wp-content/uploads/elementor/thumbs/plant_boss3-o46ratlit6r8p98a09be4maeoio8trry7t81eq9am8.jpg?w=1200&ssl=1",
    creator: {name: "plechito", verified: true, avatar: "https://www.metin2downloads.to/cms/images/avatars/7b/76141-7bc97f64a421617ae3553fcd1b1b4652e0697518.png", contact:"https://discord.com/users/504640690190417920"},
    fileUrl: "https://mega.nz/file/28IQBSwL#61z4_Nq5H16e0yzkhbnhmwLCWbHTZS99NzLWeBpu7ew",
  },
  {
    id: 24,
    type: "metinstone",
    name:"Valentine stone",
    thumbnail: "https://i0.wp.com/plechito.com/wp-content/uploads/elementor/thumbs/metinstone1-o2728o600wszifcvku879mycgz6qd163ux6tnjnvuo.jpg?w=1200&ssl=1",
    creator: {name: "plechito", verified: true, avatar: "https://www.metin2downloads.to/cms/images/avatars/7b/76141-7bc97f64a421617ae3553fcd1b1b4652e0697518.png", contact:"https://discord.com/users/504640690190417920"},
    fileUrl: "https://mega.nz/file/z8QFhSKR#jGK4ehIgEhlJbkh_SHvpoME5WF3_e4p4YrVChy1nFCg",
  },
  {
    id: 25,
    type: "metinstone",
    name:"Crystal stone 1",
    thumbnail: "https://i0.wp.com/plechito.com/wp-content/uploads/elementor/thumbs/crystal_metin1-nymmxwnh7somvay629ngxdoj2co5qpt8zivubi2tj4.png?w=1200&ssl=1",
    creator: {name: "plechito", verified: true, avatar: "https://www.metin2downloads.to/cms/images/avatars/7b/76141-7bc97f64a421617ae3553fcd1b1b4652e0697518.png", contact:"https://discord.com/users/504640690190417920"},
    fileUrl: "https://mega.nz/file/XwQWiaAK#A0u9NPaqmfSX32CU46unbzOmMKQDx-A0_FijzMDVeME",
  },
  {
    id: 25,
    type: "boss",
    name:"Natural boss",
    thumbnail: "https://i0.wp.com/plechito.com/wp-content/uploads/elementor/thumbs/natural_boss_1-nymnxhthyzegft9795fytwdsqj9g663e7o2nfnb7y8.png?w=1200&ssl=1",
    creator: {name: "plechito", verified: true, avatar: "https://www.metin2downloads.to/cms/images/avatars/7b/76141-7bc97f64a421617ae3553fcd1b1b4652e0697518.png", contact:"https://discord.com/users/504640690190417920"},
    fileUrl: "https://mega.nz/file/W0Z2SI5J#F8rUm8__h15tuJVt5IGrTT9KgCwNTxCKJLPxcXiQGcI",
  },
  {
    id: 26,
    type: "map",
    name: "Mirage island",
    thumbnail: "https://plechito.com/wp-content/uploads/2023/05/map12.jpg",
    hoverImages: ["https://plechito.com/wp-content/uploads/2023/05/map14.jpg", "https://plechito.com/wp-content/uploads/2023/05/map21.jpg", "https://plechito.com/wp-content/uploads/2023/05/map22.jpg", "https://plechito.com/wp-content/uploads/2023/05/map27.jpg", "https://plechito.com/wp-content/uploads/2023/05/map_main.jpg", "https://plechito.com/wp-content/uploads/2023/05/map1.jpg", "https://plechito.com/wp-content/uploads/2023/05/map6.jpg", "https://i0.wp.com/plechito.com/wp-content/uploads/2023/05/map_atlas.jpg?fit=512%2C512&ssl=1"],
    creator: {name: "plechito", verified: true, avatar: "https://www.metin2downloads.to/cms/images/avatars/7b/76141-7bc97f64a421617ae3553fcd1b1b4652e0697518.png", contact:"https://discord.com/users/504640690190417920"},
    price: "230€",
    description: `**What's Included:**
    • Size of the map is 9×9
    • Map includes all monsters, bosses and stones (29 monsters, 4 main bosses, 4 low bosses, 5 stones)
    • Regen is included
    • Over 100 new objects, etc..
    • Logo must be implemented!`,
  },
];







export const groupedAssets = Object.fromEntries(
        assetTypes.map(type => [
            type.charAt(0).toUpperCase() + type.slice(1),
            dummyAssets.filter(asset => asset.type === type)
        ])
    );