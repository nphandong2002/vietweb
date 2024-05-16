import { ALPHA_MODES, BaseTexture, SCALE_MODES, WRAP_MODES, Texture, Rectangle } from 'pixi.js';
import { TextTure, TexturePage, TextureRegion } from './pet-type';

const initTexture = (): TextTure => ({
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
});

export const loadAliat = async (textureData: string) => {
  return new Promise<{ pages: TexturePage[]; regions: TextureRegion[] }>((resolve) => {
    const pages: TexturePage[] = [];
    const regions: TextureRegion[] = [];

    let page: TexturePage | null = null;
    let texture: TextTure | null = null;
    let index = 0;
    const lines = textureData.split(/\r\n|\r|\n/);
    const readLine = () => (index >= lines.length ? null : lines[index++]);
    let line = readLine();

    for (;;) {
      if (line == null) break;
      if (line.trim().length === 0) {
        page = null;
        line = readLine();
      } else {
        if (page == null) {
          page = initTexturePage();
          page.name = line.trim();
          line = readLine();
          let entry = readEntry(line);
          while (entry.e !== 0) {
            const values = entry.values;
            switch (values[0]) {
              case 'size':
                page.width = parseInt(values[1]);
                page.height = parseInt(values[2]);
                break;
              case 'filter':
                page.minFilter = Ah(values[1]);
                page.magFilter = Ah(values[2]);
                break;
              case 'repeat':
                if (values[1].includes('x')) page.uWrap = WRAP_MODES.REPEAT;
                if (values[1].includes('y')) page.vWrap = WRAP_MODES.REPEAT;
                break;
              case 'pma':
                page.pma = values[1] === 'true' ? ALPHA_MODES.PMA : ALPHA_MODES.UNPACK;
                break;
            }
            line = readLine();
            entry = readEntry(line);
          }
          let baseTexture = new BaseTexture('/assets/pet/cat.png');
          if (!baseTexture.valid) baseTexture.setSize(page.width, page.height);
          if (page.pma) baseTexture.alphaMode = ALPHA_MODES.PMA;
          baseTexture.scaleMode = page.minFilter;
          if (!page.width || !page.height) {
            page.width = baseTexture.realWidth;
            page.height = baseTexture.realHeight;
          }
          page.baseTexture = baseTexture;
          pages.push(page);
        } else {
          texture = initTexture();
          let region = initTextureRegion();
          region.name = line.trim();
          region.page = page;
          line = readLine();
          let entry = readEntry(line);
          while (entry.e !== 0) {
            const values = entry.values;
            switch (values[0]) {
              case 'xy':
                texture.x = parseInt(values[1]);
                texture.y = parseInt(values[2]);
                break;
              case 'size':
                texture.width = parseInt(values[1]);
                texture.height = parseInt(values[2]);
                break;
              case 'rotate':
                texture.rotate = values[1] === 'true' ? 6 : parseFloat(values[1]) / 45;
                break;
              case 'index':
                texture.index = parseInt(values[1]);
                break;
            }
            line = readLine();
            entry = readEntry(line);
          }
          if (texture.originalHeight === 0 && texture.originalWidth === 0) {
            texture.originalWidth = texture.width;
            texture.originalHeight = texture.height;
          }
          const a = page.baseTexture.resolution;
          texture.x /= a;
          texture.y /= a;
          texture.width /= a;
          texture.height /= a;
          texture.originalWidth /= a;
          texture.originalHeight /= a;
          texture.offsetX /= a;
          texture.offsetY /= a;

          const c = texture.rotate % 4 !== 0;
          const u = new Rectangle(
            texture.x,
            texture.y,
            c ? texture.height : texture.width,
            c ? texture.width : texture.height,
          );
          const d = new Rectangle(0, 0, texture.originalWidth, texture.originalHeight);
          const p = new Rectangle(
            texture.offsetX,
            texture.originalHeight - texture.height - texture.offsetY,
            texture.width,
            texture.height,
          );
          region.texture = new Texture(page.baseTexture, u, d, p, texture.rotate);
          region.texture.updateUvs();
          regions.push(region);
        }
      }
    }

    resolve({ pages, regions });
  });
};

const initTexturePage = (): TexturePage => ({
  name: null,
  baseTexture: new BaseTexture('/assets/pet/cat.png'),
  width: 0,
  height: 0,
  minFilter: SCALE_MODES.NEAREST,
  magFilter: SCALE_MODES.NEAREST,
  uWrap: WRAP_MODES.CLAMP,
  vWrap: WRAP_MODES.CLAMP,
  pma: ALPHA_MODES.NO_PREMULTIPLIED_ALPHA,
});

const initTextureRegion = (): TextureRegion => ({
  page: null,
  name: null,
  texture: null,
  index: 0,
});

export const readEntry = (e: string | null) => {
  const values = Array(4).fill('');
  if (e == null) return { values, e: 0 };
  if (e.trim().length === 0) return { values, e: 0 };
  const s = e.indexOf(':');
  if (s === -1) return { values, e: 0 };
  values[0] = e.substr(0, s).trim();
  for (let r = 1, n = s + 1; ; r++) {
    const s = e.indexOf(',', n);
    if (s === -1) {
      values[r] = e.substr(n).trim();
      return { values, e: r };
    }
    values[r] = e.substr(n, s - n).trim();
    n = s + 1;
    if (r === 3) return { values, e: 0 };
  }
};

function Ah(t: string) {
  switch (t.toLowerCase()) {
    case 'nearest':
      return SCALE_MODES.NEAREST;
    case 'linear':
      return SCALE_MODES.LINEAR;
    default:
      throw new Error(`Unknown texture filter ${t}`);
  }
}
