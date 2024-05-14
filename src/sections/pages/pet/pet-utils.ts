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
    const line = this.readLine();
    if (!line) return 0;
    const parts = line.split(':');
    values.length = parts.length;
    for (let i = 0; i < parts.length; i++) {
      values[i] = parts[i].trim();
    }
    return parts.length;
  }
}

export const readConfig = (c: string) => {
  const lst = new LineReader(c);
  return lst;
};
