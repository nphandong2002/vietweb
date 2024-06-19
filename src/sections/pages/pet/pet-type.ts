import { Layer } from '@pixi/layers';
import { ISkeletonData, ISkeletonParser, TextureAtlas, BinaryInput } from '@pixi-spine/base';

import {
  SCALE_MODES,
  BaseTexture,
  Resource,
  WRAP_MODES,
  Texture,
  ALPHA_MODES,
  Application,
  Container,
  DisplayObject,
} from 'pixi.js';
export enum TextureFilter {
  Nearest = 9728,
  Linear = 9729,
  MipMapNearestNearest = 9984,
  MipMapLinearNearest = 9985,
  MipMapNearestLinear = 9986,
  MipMapLinearLinear = 9987,
}
export type TexturePage = {
  name: string | null;
  baseTexture: BaseTexture<Resource>;
  width: number;
  height: number;
  minFilter: SCALE_MODES;
  magFilter: SCALE_MODES;
  uWrap: WRAP_MODES;
  vWrap: WRAP_MODES;
  pma: ALPHA_MODES;
};

export type TextureRegion = {
  page: TexturePage | null;
  name: string | null;
  texture: Texture<Resource> | null;
  index: number;
};
export type TextTure = {
  x: number;
  y: number;
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
  originalWidth: number;
  originalHeight: number;
  rotate: number;
  index: number;
};

export type renderMaganerType = Partial<{
  pgWorld: Application;
  layer: Layer;
  pets: Container<DisplayObject>;
  resources: any;
  currzIndex: number;
}>;

export type resourcesType = {
  spineData: ISkeletonData;
  spineAtlas: TextureAtlas;
};
