import { PetType, SizePet, workPet } from '../type-pet';
import { workNor } from './config-pet-nor';

export const getRandomWorkNor = () => {
  const i = Math.floor(Math.random() * workNor.length);
  return workNor[i];
};
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
  work: getRandomWorkNor(),
};

export const movePet = {
  'left': {
    x: -1,
    y: 0,
    transform: 0,
  }
}