import { PetType, SizePet } from 'src/shared/types/canvas';

export const pathPet = {
  [PetType.Calico]: {
    [SizePet.MD]: 'calico/calico_1024x1024_8x8.png',
    [SizePet.SM]: 'calico/calico_512x512_8x8.png',
    header: 'calico_head_128x128.png',
  },
  [PetType.Glay]: {
    [SizePet.MD]: 'tabby/tabby_1024x1024_8x8.png',
    [SizePet.SM]: 'tabby/tabby_512x512_8x8.png',
    header: 'glay_head_128x128.png',
  },
  [PetType.Black]: {
    [SizePet.MD]: 'black/black_1024x1024_8x8.png',
    [SizePet.SM]: 'black/black_512x512_8x8.png',
    header: '  black_head_128x128.png',
  },
  [PetType.Tabby]: {
    [SizePet.MD]: 'glay/glay_1024x1024_8x8.png',
    [SizePet.SM]: 'glay/glay_512x512_8x8.png',
    header: ' tabby_head_128x128.png',
  },
  [PetType.White]: {
    [SizePet.MD]: 'white/white_1024x1024_8x8.png',
    [SizePet.SM]: 'white/white_512x512_8x8.png',
    header: ' white_head_128x128.png',
  },
};
