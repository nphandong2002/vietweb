import * as PIXI from 'pixi.js';
import path from 'path';

import { TexturePage, TextureRegion, WrapMode, TextureFilter, TextureFilterKey, ALPHA_MODES } from './pet-type';

const initTexturePage = {
  name: null,
  baseTexture: null,
  width: 0,
  height: 0,
  minFilter: TextureFilter.Nearest,
  magFilter: TextureFilter.Nearest,
  uWrap: WrapMode.ClampToEdge,
  vWrap: WrapMode.ClampToEdge,
};
const initTexture = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  offsetX: 0,
  offsetY: 0,
  originalWidth: 0,
  originalHeight: 0,
  rotate: 0,
  index: 0,
};
const initTextureRegion: TextureRegion = {
  page: null,
  name: null,
  texture: initTexture,
  index: 0,
};

class LineReader {
  index: number;
  lines: string[];

  constructor(text: string) {
    this.index = 0;
    this.lines = text.split(/\r\n|\r|\n/);
  }

  readLine(): string | null {
    return this.index >= this.lines.length ? null : this.lines[this.index++];
  }

  readEntry(values: string[]): number {
    if (!values) values = [];
    const line = this.readLine();
    if (!line) return 0;
    const words = line.split(' ');
    for (let i = 0; i < words.length; i++) {
      values[i] = words[i];
    }
    return words.length;
  }
}

export const loadAliat = (textureData: string) => {
  const pages: TexturePage[] = [];
  const regions: TextureRegion[] = [];
  const reader = new LineReader(textureData);
  let line: string = reader.readLine();
  const values: string[] = [];
  const parsePageData = () => {
    let page: TexturePage = null;
    for (;;) {
      if (!line) return;
      if (line.trim().length === 0) {
        page = null;
        line = reader.readLine();
      } else {
        if (!page) {
          page = initTexturePage;
          page.name = line.trim();
          let entry = reader.readEntry(values);
          while (entry !== 0) {
            switch (values[0]) {
              case 'size':
                page.width = parseInt(values[1]);
                page.height = parseInt(values[2]);
                break;
              case 'filter':
                page.minFilter = TextureFilter[values[1] as TextureFilterKey];
                page.magFilter = TextureFilter[values[2] as TextureFilterKey];
                break;
              case 'repeat':
                if (values[1].indexOf('x') !== -1) page.uWrap = WrapMode.Repeat;
                if (values[1].indexOf('y') !== -1) page.vWrap = WrapMode.Repeat;
                break;
              case 'pma':
                page.baseTexture.alphaMode = values[1] === 'true' ? ALPHA_MODES.PMA : ALPHA_MODES.UNPACK;
                break;
            }
            entry = reader.readEntry(values);
            page.baseTexture = PIXI.BaseTexture;
            switch (page.minFilter) {
              case TextureFilter.Linear:
                page.baseTexture.scaleMode = ScaleMode.LINEAR;
                break;
              case TextureFilter.Nearest:
                page.baseTexture.scaleMode = ScaleMode.NEAREST;
                break;
              default:
                page.baseTexture.mipmap = MipmapMode.POW2;
                if (page.minFilter === TextureFilter.MipMapNearestNearest) {
                  page.baseTexture.scaleMode = ScaleMode.NEAREST;
                } else {
                  page.baseTexture.scaleMode = ScaleMode.LINEAR;
                }
                break;
            }
            pages.push(page);
          }
        } else {
          let region = initTextureRegion;
          region.name = line.trim();
          region.page = page;
          region.texture = PIXI.Texture(region.page.baseTexture);
          let entry = reader.readEntry(values);
          while (entry !== 0) {
            switch (values[0]) {
              case 'xy':
                region.texture.frame.x = parseInt(values[1]);
                region.texture.frame.y = parseInt(values[2]);
                break;
              case 'size':
                region.texture.frame.width = parseInt(values[1]);
                region.texture.frame.height = parseInt(values[2]);
                break;
              case 'rotate':
                region.texture.rotate = values[1] === 'true' ? 6 : parseFloat(values[1]) / 45;
                break;
              case 'index':
                region.index = parseInt(values[1]);
                break;
            }
            entry = reader.readEntry(values);
          }
          this.regions.push(region);
        }
      }
    }
  };
};
