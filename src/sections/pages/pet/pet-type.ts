export enum TextureFilter {
  Nearest = 9728,
  Linear = 9729,
  MipMapNearestNearest = 9984,
  MipMapLinearNearest = 9985,
  MipMapNearestLinear = 9986,
  MipMapLinearLinear = 9987,
}
export type TextureFilterKey = keyof typeof TextureFilter;
export enum WrapMode {
  Repeat = 10497,
  ClampToEdge = 33071,
  MirroredRepeat = 33648,
}

export enum ScaleMode {
  NEAREST = 0,
  LINEAR = 1,
}

export enum MipmapMode {
  OFF = 0,
  POW2 = 1,
  ON = 2,
  ON_MANUAL = 3,
}
export type TexturePage = {
  name: string | null;
  baseTexture: any;
  width: number;
  height: number;
  minFilter: TextureFilter;
  magFilter: TextureFilter;
  uWrap: WrapMode;
  vWrap: WrapMode;
};

export type TextureRegion = {
  page: TexturePage | null;
  name: string | null;
  texture: TextTure;
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
enum AlphaModeValue {
  NO_PREMULTIPLIED_ALPHA,
  PREMULTIPLY_ON_UPLOAD,
  PREMULTIPLIED_ALPHA,
}

export enum ALPHA_MODES {
  NPM = AlphaModeValue.NO_PREMULTIPLIED_ALPHA,
  UNPACK = AlphaModeValue.PREMULTIPLY_ON_UPLOAD,
  PMA = AlphaModeValue.PREMULTIPLIED_ALPHA,
}
