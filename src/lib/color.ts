import { Color } from 'src/shared/types/canvas';

function hexToRgb(color: string): string {
  color = color.slice(1);
  const re = new RegExp(`.{1,${color.length >= 6 ? 2 : 1}}`, 'g');
  let colors = color.match(re);
  let colorMatches: RegExpMatchArray | null = color.match(re);
  if (colorMatches && colorMatches[0].length === 1) {
    colorMatches = colorMatches.map((n) => n + n) as RegExpMatchArray;
  }
  return colors
    ? `rgb${colors.length === 4 ? 'a' : ''}(${colors
        .map((n, index) => {
          return index < 3
            ? parseInt(n, 16).toString()
            : (Math.round((parseInt(n, 16) / 255) * 1000) / 1000).toString();
        })
        .join(', ')})`
    : '';
}

function intToHex(int: number): string {
  const hex = int.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

interface ColorValue {
  type: string;
  values: (string | number)[];
  colorSpace?: string;
}

export function decomposeColor(colorValue: string | ColorValue): ColorValue {
  // Idempotent
  if (typeof colorValue != 'string') return colorValue;
  if (colorValue.charAt(0) === '#') {
    return decomposeColor(hexToRgb(colorValue));
  }
  const marker = colorValue.indexOf('(');
  const type = colorValue.substring(0, marker);
  if (['rgb', 'rgba', 'hsl', 'hsla', 'color'].indexOf(type) === -1) {
    throw new Error(
      `The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()`
    );
  }
  let values = colorValue.substring(marker + 1, colorValue.length - 1);
  let colorSpace;
  if (type === 'color') {
    let v = values.split(' ');
    colorSpace = v.shift();
    if (values.length === 4 && values[3].charAt(0) === '/') {
      v[3] = values[3].slice(1);
    }
    if (
      colorSpace &&
      ['srgb', 'display-p3', 'a98-rgb', 'prophoto-rgb', 'rec-2020'].indexOf(colorSpace) === -1
    )
      throw new Error('not support srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020');
    let vs = v.map((value) => parseFloat(value));
    return {
      type,
      values: vs,
      colorSpace,
    };
  }
  let v = values.split(',');
  let vs = v.map((value) => parseFloat(value));
  return {
    type,
    values: vs,
    colorSpace,
  };
}

function clamp(value: number, min: number = 0, max: number = 1): number {
  if (process.env.NODE_ENV !== 'production') {
    if (value < min || value > max) {
      console.error(`MUI: The value provided ${value} is out of range [${min}, ${max}].`);
    }
  }
  return Math.min(Math.max(min, value), max);
}

function recomposeColor(color: ColorValue): string {
  const { type, colorSpace } = color;
  let { values } = color;
  if (type.indexOf('rgb') !== -1) {
    // Only convert the first 3 values to int (i.e. not alpha)
    values = values.map((n, i) => (i < 3 ? parseInt(n as string, 10) : n));
  } else if (type.indexOf('hsl') !== -1) {
    values[1] = `${values[1]}%`;
    values[2] = `${values[2]}%`;
  }
  let v;
  if (type.indexOf('color') !== -1) {
    v = `${colorSpace} ${values.join(' ')}`;
  } else {
    v = `${values.join(', ')}`;
  }
  return `${type}(${v})`;
}

export const alpha = function alpha(color: string | ColorValue, value: number): string {
  color = decomposeColor(color);
  value = clamp(value);
  if (color.type === 'rgb' || color.type === 'hsl') {
    color.type += 'a';
  }
  if (color.type === 'color') {
    color.values[3] = `/${value}`;
  } else {
    color.values[3] = value;
  }
  return recomposeColor(color);
};

const COLORS = ['#DC2626', '#D97706', '#059669', '#7C3AED', '#DB2777'];
export function connectionIdToColor(connectionId: number): string {
  return COLORS[connectionId % COLORS.length];
}

export function colorToCss(color: Color) {
  return `#${color.r.toString(16).padStart(2, '0')}${color.g.toString(16).padStart(2, '0')}${color.b.toString(16).padStart(2, '0')}`;
}
