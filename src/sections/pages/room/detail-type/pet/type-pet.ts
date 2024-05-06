import { PetLayer } from 'src/shared/types/canvas';

export enum workPet {
  Action1 = 'action1',
  Action2 = 'action2',
  Action3 = 'action3',
  Action4 = 'action4',
  Action5 = 'action5',
  Idle1 = 'idle1',
  Idle2 = 'idle2',
  Idle3 = 'idle3',
  Idle4 = 'idle4',
  Idle5 = 'idle5',
  Sleep1 = 'sleep1',
  Sleep2 = 'sleep2',
  Sleep3 = 'sleep3',
  Sleep4 = 'sleep4',
  Sleep5 = 'sleep5',
}

export enum PetType {
  Calico = 'calico',
  Glay = 'glay',
  Black = 'black',
  Tabby = 'tabby',
  White = 'white',
}

export type AnimationsPetType = {
  [Key in workPet]: Datum[];
};
export type AnimationsPetTypeOne = {
  name: string;
  data: Datum[];
};
export type Datum = {
  sprite: number;
  delay: number;
};

export type Playhead = {
  delay: number;
  script: Datum[];
  currentSprite: number;
  currentFrame: number;
};

export type PetStatus = {
  happiness: number;
  hunger: number;
  sleepy: number;
  loyalty: number;
};

export enum SizePet {
  SM,
  MD,
}
export type optionPet = Partial<PetLayer>;
