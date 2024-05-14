enum TextureFilter {
  Nearest = 9728,
  Linear = 9729,
  MipMapNearestNearest = 9984,
  MipMapLinearNearest = 9985,
  MipMapNearestLinear = 9986,
  MipMapLinearLinear = 9987,
}

enum WrapMode {
  Repeat = 10497,
  ClampToEdge = 33071,
  MirroredRepeat = 33648,
}

enum ScaleMode {
  NEAREST = 0,
  LINEAR = 1,
}

enum MipmapMode {
  OFF = 0,
  POW2 = 1,
  ON = 2,
  ON_MANUAL = 3,
}

class TextureRegion {
  page: TexturePage;
  name: string;
  texture: Texture;
  index: number;

  constructor() {
    this.page = null;
    this.name = null;
    this.texture = null;
    this.index = 0;
  }
}

class TexturePage {
  name: string;
  baseTexture: PIXI.BaseTexture;
  width: number;
  height: number;
  minFilter: TextureFilter;
  magFilter: TextureFilter;
  uWrap: WrapMode;
  vWrap: WrapMode;

  constructor() {
    this.name = null;
    this.baseTexture = null;
    this.width = 0;
    this.height = 0;
    this.minFilter = TextureFilter.Nearest;
    this.magFilter = TextureFilter.Nearest;
    this.uWrap = WrapMode.ClampToEdge;
    this.vWrap = WrapMode.ClampToEdge;
  }

  setFilters() {
    const t = this.baseTexture;
    switch (this.minFilter) {
      case TextureFilter.Linear:
        t.scaleMode = ScaleMode.LINEAR;
        break;
      case TextureFilter.Nearest:
        t.scaleMode = ScaleMode.NEAREST;
        break;
      default:
        t.mipmap = MipmapMode.POW2;
        if (this.minFilter === TextureFilter.MipMapNearestNearest) {
          t.scaleMode = ScaleMode.NEAREST;
        } else {
          t.scaleMode = ScaleMode.LINEAR;
        }
        break;
    }
  }
}

class TextureAtlas {
  pages: TexturePage[];
  regions: TextureRegion[];

  constructor(
    textureData: string,
    textureLoader: (page: TexturePage, callback: (texture: PIXI.BaseTexture) => void) => void,
    onComplete?: (atlas: TextureAtlas) => void,
  ) {
    this.pages = [];
    this.regions = [];
    if (textureData) {
      this.load(textureData, textureLoader, onComplete);
    }
  }

  addTexture(name: string, texture: PIXI.Texture): TextureRegion {
    let page = this.pages.find((p) => p.baseTexture === texture.baseTexture);
    if (!page) {
      page = new TexturePage();
      page.name = 'texturePage';
      const baseTexture = texture.baseTexture;
      page.width = baseTexture.realWidth;
      page.height = baseTexture.realHeight;
      page.baseTexture = baseTexture;
      page.minFilter = TextureFilter.Nearest;
      page.magFilter = TextureFilter.Nearest;
      page.uWrap = WrapMode.ClampToEdge;
      page.vWrap = WrapMode.ClampToEdge;
      this.pages.push(page);
    }
    const region = new TextureRegion();
    region.name = name;
    region.page = page;
    region.texture = texture;
    region.index = -1;
    this.regions.push(region);
    return region;
  }

  private load(
    textureData: string,
    textureLoader: (page: TexturePage, callback: (texture: PIXI.BaseTexture) => void) => void,
    onComplete?: (atlas: TextureAtlas) => void,
  ): void {
    const reader = new LineReader(textureData);
    let line: string;
    const values: string[] = [];

    const parsePageData = () => {
      let page: TexturePage = null;
      for (;;) {
        if (!line) return onComplete && onComplete(this);
        if (line.trim().length === 0) {
          page = null;
          line = reader.readLine();
        } else {
          if (!page) {
            page = new TexturePage();
            page.name = line.trim();
            let entry = reader.readEntry(values);
            while (entry !== 0) {
              switch (values[0]) {
                case 'size':
                  page.width = parseInt(values[1]);
                  page.height = parseInt(values[2]);
                  break;
                case 'filter':
                  page.minFilter = TextureFilter[values[1]];
                  page.magFilter = TextureFilter[values[2]];
                  break;
                case 'repeat':
                  if (values[1].indexOf('x') !== -1) page.uWrap = WrapMode.Repeat;
                  if (values[1].indexOf('y') !== -1) page.vWrap = WrapMode.Repeat;
                  break;
                case 'pma':
                  page.baseTexture.alphaMode = values[1] === 'true' ? PIXI.ALPHA_MODES.PMA : PIXI.ALPHA_MODES.UNPACK;
                  break;
              }
              entry = reader.readEntry(values);
            }
            this.pages.push(page);
            textureLoader(page, (texture) => {
              if (!texture) {
                const index = this.pages.indexOf(page);
                if (index !== -1) this.pages.splice(index, 1);
                onComplete && onComplete(null);
              } else {
                page.baseTexture = texture;
                page.setFilters();
                parsePageData();
              }
            });
            break;
          } else {
            const region = new TextureRegion();
            region.name = line.trim();
            region.page = page;
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

    parsePageData();
  }

  findRegion(name: string): TextureRegion {
    return this.regions.find((region) => region.name === name);
  }

  dispose(): void {
    for (const page of this.pages) {
      page.baseTexture.destroy();
    }
  }
}

class LineReader {
  index: number;
  lines: string[];

  constructor(text: string) {
    this.index = 0;
    this.lines = text.split(/\r\n|\r|\n/);
  }

  readLine(): string {
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
