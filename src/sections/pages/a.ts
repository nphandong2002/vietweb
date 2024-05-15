enum MipmapMode {
  OFF = 0,
  POW2 = 1,
  ON = 2,
  ON_MANUAL = 3,
}
enum ScaleMode {
  NEAREST = 0,
  LINEAR = 1,
}
enum TextureFilter {
  Nearest,
  Linear,
  MipMapNearestNearest,
}

enum WrapMode {
  ClampToEdge,
  Repeat,
}

class Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
  static readonly EMPTY = new Rectangle(0, 0, 0, 0);
  constructor(x = 0, y = 0, width = 0, height = 0) {
    this.x = Number(x);
    this.y = Number(y);
    this.width = Number(width);
    this.height = Number(height);
  }
  get left() {
    return this.x;
  }
  get right() {
    return this.x + this.width;
  }
  get top() {
    return this.y;
  }
  get bottom() {
    return this.y + this.height;
  }
  clone() {
    return new Rectangle(this.x, this.y, this.width, this.height);
  }
  copyFrom(rect: Rectangle) {
    this.x = rect.x;
    this.y = rect.y;
    this.width = rect.width;
    this.height = rect.height;
    return this;
  }
  copyTo(rect: Rectangle) {
    rect.x = this.x;
    rect.y = this.y;
    rect.width = this.width;
    rect.height = this.height;
    return rect;
  }
  contains(x: number, y: number) {
    return (
      this.width > 0 &&
      this.height > 0 &&
      x >= this.x &&
      x < this.x + this.width &&
      y >= this.y &&
      y < this.y + this.height
    );
  }
  intersects(rect: Rectangle, edge: any) {
    if (!edge) {
      const minX = this.x < rect.x ? rect.x : this.x;
      if (this.right > rect.right ? rect.right : this.right <= minX) return false;
      const minY = this.y < rect.y ? rect.y : this.y;
      return this.bottom > rect.bottom ? rect.bottom : this.bottom > minY;
    }
    const left = this.left,
      right = this.right,
      top = this.top,
      bottom = this.bottom;
    if (right <= left || bottom <= top) return false;
    const a = new Point(rect.left, rect.top),
      b = new Point(rect.left, rect.bottom),
      c = new Point(rect.right, rect.top),
      d = new Point(rect.right, rect.bottom);
    if (c.x <= a.x || b.y <= a.y) return false;
    const det = edge.a * edge.d - edge.b * edge.c;
    if (det === 0) return false;
    edge.apply(a, a);
    edge.apply(b, b);
    edge.apply(c, c);
    edge.apply(d, d);
    if (
      Math.max(a.x, b.x, c.x, d.x) <= left ||
      Math.min(a.x, b.x, c.x, d.x) >= right ||
      Math.max(a.y, b.y, c.y, d.y) <= top ||
      Math.min(a.y, b.y, c.y, d.y) >= bottom
    )
      return false;
    const max = Math.max,
      min = Math.min,
      bx = max(a.x, b.x, c.x, d.x),
      by = max(a.y, b.y, c.y, d.y),
      ax = min(a.x, b.x, c.x, d.x),
      ay = min(a.y, b.y, c.y, d.y);
    if (max(ax, ay) <= min(left, right) || min(bx, by) >= max(left, right)) return false;
    const num = det * (b.y - a.y),
      num2 = det * (a.x - b.x),
      num3 = num * left + num2 * top,
      num4 = num * right + num2 * bottom;
    if (
      max(num3, num4) <= min(num * d.x + num2 * d.y, num * c.x + num2 * c.y) ||
      min(num3, num4) >= max(num * d.x + num2 * d.y, num * c.x + num2 * c.y)
    )
      return false;
    const num5 = edge.a * (a.y - c.y) + edge.b * (c.x - a.x),
      num6 = edge.b * (b.y - d.y) + edge.a * (d.x - b.x),
      num7 = num5 * a.x + num6 * a.y,
      num8 = num5 * b.x + num6 * b.y;
    return (
      max(num3, num4) > min(num5 * c.x + num6 * c.y, num5 * d.x + num6 * d.y) &&
      min(num3, num4) < max(num5 * c.x + num6 * c.y, num5 * d.x + num6 * d.y)
    );
  }
  pad(x = 0, y = x) {
    this.x -= x;
    this.y -= y;
    this.width += 2 * x;
    this.height += 2 * y;
    return this;
  }
  fit(rect: Rectangle) {
    const rx1 = Math.max(this.x, rect.x),
      rx2 = Math.min(this.x + this.width, rect.x + rect.width),
      ry1 = Math.max(this.y, rect.y),
      ry2 = Math.min(this.y + this.height, rect.y + rect.height);
    this.x = rx1;
    this.width = Math.max(rx2 - rx1, 0);
    this.y = ry1;
    this.height = Math.max(ry2 - ry1, 0);
    return this;
  }
  ceil(x = 1, epsilon = 0.001) {
    const dx = Math.ceil((this.x + this.width - epsilon) * x) / x,
      dy = Math.ceil((this.y + this.height - epsilon) * x) / x;
    this.x = Math.floor((this.x + epsilon) * x) / x;
    this.y = Math.floor((this.y + epsilon) * x) / x;
    this.width = dx - this.x;
    this.height = dy - this.y;
    return this;
  }
  enlarge(rect: Rectangle) {
    const rx1 = Math.min(this.x, rect.x),
      rx2 = Math.max(this.x + this.width, rect.x + rect.width),
      ry1 = Math.min(this.y, rect.y),
      ry2 = Math.max(this.y + this.height, rect.y + rect.height);
    this.x = rx1;
    this.width = rx2 - rx1;
    this.y = ry1;
    this.height = ry2 - ry1;
    return this;
  }
  toString() {
    return `[@pixi/math:Rectangle x=${this.x} y=${this.y} width=${this.width} height=${this.height}]`;
  }
}

class SpineRegion {}

class TextureRegion {
  name: string;
  page: TexturePage;
  texture: any; // assuming some type of texture class
  index: number;
  constructor() {
    this.name = '';
    this.page = null;
    this.texture = null;
    this.index = 0;
  }
}

class TexturePage {
  baseTexture: any; // assuming some type of baseTexture class
  name: string;
  width: number;
  height: number;
  minFilter: TextureFilter;
  magFilter: TextureFilter;
  uWrap: WrapMode;
  vWrap: WrapMode;
  constructor() {
    this.baseTexture = null;
    this.name = '';
    this.width = 0;
    this.height = 0;
    this.minFilter = TextureFilter.Nearest;
    this.magFilter = TextureFilter.Nearest;
    this.uWrap = WrapMode.ClampToEdge;
    this.vWrap = WrapMode.ClampToEdge;
  }
  setFilters() {
    const baseTex = this.baseTexture;
    switch (this.minFilter) {
      case TextureFilter.Linear:
        baseTex.scaleMode = ScaleMode.LINEAR;
        break;
      case TextureFilter.Nearest:
        baseTex.scaleMode = ScaleMode.NEAREST;
        break;
      default:
        baseTex.mipmap = MipmapMode.POW2;
        this.minFilter === TextureFilter.MipMapNearestNearest
          ? (baseTex.scaleMode = ScaleMode.NEAREST)
          : (baseTex.scaleMode = ScaleMode.LINEAR);
        break;
    }
  }
}

class TextureLoader {}

class SpineAtlas {
  pages: TexturePage[];
  regions: TextureRegion[];
  constructor(jsonData: any, textureLoader: TextureLoader, callback: (atlas: SpineAtlas | null) => void) {
    this.pages = [];
    this.regions = [];
    if (jsonData) this.addSpineAtlas(jsonData, textureLoader, callback);
  }
  addTexture(name: string, texture: any) {
    const pages = this.pages;
    let page = null;
    for (let i = 0; i < pages.length; i++)
      if (pages[i].baseTexture === texture.baseTexture) {
        page = pages[i];
        break;
      }
    if (!page) {
      page = new TexturePage();
      page.name = 'texturePage';
      const baseTex = texture.baseTexture;
      page.width = baseTex.realWidth;
      page.height = baseTex.realHeight;
      page.baseTexture = baseTex;
      page.minFilter = TextureFilter.Nearest;
      page.magFilter = TextureFilter.Nearest;
      page.uWrap = WrapMode.ClampToEdge;
      page.vWrap = WrapMode.ClampToEdge;
      pages.push(page);
    }
    const region = new TextureRegion();
    region.name = name;
    region.page = page;
    region.texture = texture;
    region.index = -1;
    this.regions.push(region);
    return region;
  }
  addSpineAtlas(jsonData: any, textureLoader: TextureLoader, callback: (atlas: SpineAtlas | null) => void) {
    return this.load(jsonData, textureLoader, callback);
  }
  dispose() {
    for (let i = 0; i < this.pages.length; i++) this.pages[i].baseTexture.dispose();
  }
}
