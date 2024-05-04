import { PetType, SizePet, workPet, AnimationsPetType } from './type-pet';

export const workAction = [
  { name: workPet.Action1, run: 1 },
  { name: workPet.Action2, run: 1 },
  { name: workPet.Action3, run: 1 },
  { name: workPet.Action4, run: 1 },
  { name: workPet.Action5, run: 1 },
];
export const workIdle = [
  { name: workPet.Idle1, run: 8 },
  { name: workPet.Idle2, run: 8 },
  { name: workPet.Idle3, run: 8 },
  { name: workPet.Idle4, run: 8 },
  { name: workPet.Idle5, run: 8 },
];
export const workSleep = [
  { name: workPet.Sleep1, run: -1 },
  { name: workPet.Sleep2, run: -1 },
  { name: workPet.Sleep3, run: -1 },
  { name: workPet.Sleep4, run: -1 },
  { name: workPet.Sleep5, run: -1 },
];
export const animations: AnimationsPetType = [
  {
    name: workPet.Action1,
    data: [
      { sprite: 1, delay: 500 },
      { sprite: 2, delay: 200 },
      { sprite: 3, delay: 200 },
      { sprite: 4, delay: 500 },
    ],
  },
  {
    name: workPet.Idle1,
    data: [
      { sprite: 5, delay: 1000 },
      { sprite: 6, delay: 1000 },
      { sprite: 7, delay: 1000 },
      { sprite: 8, delay: 1000 },
    ],
  },
  {
    name: workPet.Idle2,
    data: [
      { sprite: 9, delay: 1000 },
      { sprite: 10, delay: 500 },
      { sprite: 11, delay: 500 },
      { sprite: 12, delay: 500 },
    ],
  },
  {
    name: workPet.Idle3,
    data: [
      { sprite: 13, delay: 1000 },
      { sprite: 14, delay: 500 },
      { sprite: 15, delay: 500 },
      { sprite: 16, delay: 500 },
    ],
  },
  {
    name: workPet.Sleep1,
    data: [
      { sprite: 17, delay: 1000 },
      { sprite: 18, delay: 1000 },
      { sprite: 19, delay: 1000 },
      { sprite: 20, delay: 1000 },
    ],
  },
  {
    name: workPet.Idle4,
    data: [
      { sprite: 21, delay: 1000 },
      { sprite: 22, delay: 1000 },
      { sprite: 23, delay: 1000 },
      { sprite: 24, delay: 1000 },
    ],
  },
  {
    name: workPet.Action2,
    data: [
      { sprite: 25, delay: 200 },
      { sprite: 26, delay: 400 },
      { sprite: 27, delay: 250 },
      { sprite: 28, delay: 250 },
      { sprite: 27, delay: 250 },
      { sprite: 26, delay: 400 },
      { sprite: 25, delay: 600 },
    ],
  },
  {
    name: workPet.Sleep2,
    data: [
      { sprite: 29, delay: 500 },
      { sprite: 30, delay: 500 },
      { sprite: 31, delay: 500 },
      { sprite: 32, delay: 500 },
    ],
  },
  {
    name: workPet.Action3,
    data: [
      { sprite: 33, delay: 350 },
      { sprite: 34, delay: 500 },
      { sprite: 35, delay: 500 },
      { sprite: 36, delay: 500 },
      { sprite: 35, delay: 500 },
      { sprite: 34, delay: 500 },
      { sprite: 33, delay: 350 },
    ],
  },
  {
    name: workPet.Sleep3,
    data: [
      { sprite: 37, delay: 800 },
      { sprite: 38, delay: 800 },
      { sprite: 39, delay: 800 },
      { sprite: 40, delay: 800 },
    ],
  },
  {
    name: workPet.Sleep4,
    data: [
      { sprite: 41, delay: 1000 },
      { sprite: 42, delay: 1000 },
      { sprite: 43, delay: 1000 },
      { sprite: 44, delay: 1000 },
    ],
  },
  {
    name: workPet.Sleep5,
    data: [
      { sprite: 45, delay: 700 },
      { sprite: 46, delay: 700 },
      { sprite: 47, delay: 700 },
      { sprite: 48, delay: 700 },
    ],
  },
  {
    name: workPet.Action4,
    data: [
      { sprite: 49, delay: 400 },
      { sprite: 50, delay: 400 },
      { sprite: 51, delay: 400 },
      { sprite: 52, delay: 500 },
      { sprite: 51, delay: 400 },
      { sprite: 50, delay: 400 },
      { sprite: 49, delay: 400 },
    ],
  },
  {
    name: workPet.Action5,
    data: [
      { sprite: 53, delay: 350 },
      { sprite: 54, delay: 350 },
      { sprite: 55, delay: 350 },
      { sprite: 56, delay: 500 },
      { sprite: 55, delay: 350 },
      { sprite: 54, delay: 350 },
      { sprite: 53, delay: 500 },
    ],
  },
  {
    name: workPet.Idle5,
    data: [
      { sprite: 61, delay: 500 },
      { sprite: 62, delay: 500 },
      { sprite: 63, delay: 500 },
      { sprite: 64, delay: 500 },
    ],
  },
];
export const configPetNor = {
  [PetType.Calico]: {
    name: PetType.Calico,
    [SizePet.MD]: '/assets/pet/calico/calico_1024x1024_8x8.png',
    [SizePet.SM]: '/assets/pet/calico/calico_512x512_8x8.png',
    header: '/assets/pet/heads/calico_head_128x128.png',
    cols: 8,
    rows: 8,
    spriteScriptCollection: animations,
  },
  [PetType.Glay]: {
    name: PetType.Glay,
    [SizePet.MD]: '/assets/pet/tabby/tabby_1024x1024_8x8.png',
    [SizePet.SM]: '/assets/pet/tabby/tabby_512x512_8x8.png',
    header: '/assets/pet/heads/glay_head_128x128.png',
    cols: 8,
    rows: 8,
    spriteScriptCollection: animations,
  },
  [PetType.Black]: {
    name: PetType.Black,
    [SizePet.MD]: '/assets/pet/black/black_1024x1024_8x8.png',
    [SizePet.SM]: '/assets/pet/black/black_512x512_8x8.png',
    header: '/assets/pet/heads/black_head_128x128.png',
    cols: 8,
    rows: 8,
    spriteScriptCollection: animations,
  },
  [PetType.Tabby]: {
    name: PetType.Tabby,
    [SizePet.MD]: '/assets/pet/glay/glay_1024x1024_8x8.png',
    [SizePet.SM]: '/assets/pet/glay/glay_512x512_8x8.png',
    header: '/assets/pet/heads/tabby_head_128x128.png',
    cols: 8,
    rows: 8,
    spriteScriptCollection: animations,
  },
  [PetType.White]: {
    name: PetType.White,
    [SizePet.MD]: '/assets/pet/white/white_1024x1024_8x8.png',
    [SizePet.SM]: '/assets/pet/white/white_512x512_8x8.png',
    header: '/assets/pet/heads/white_head_128x128.png',
    cols: 8,
    rows: 8,
    spriteScriptCollection: animations,
  },
};
