import { PetType, SizePet } from '../type-pet';

export const initPet = {
  type: PetType.Calico,
  x: 0,
  y: 0,
  xp: 0,
  size: SizePet.SM,
  name: 'namePet',
  status: {
    happiness: 100,
    hunger: 100,
    sleepy: 100,
    loyalty: 100,
  },
  playhead: {
    delay: 50,
    script: [],
    currentSprite: 0,
    currentFrame: 0,
  },
};
