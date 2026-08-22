const fontRenderCache = new Map<string, boolean>();

let cachedCanvas: HTMLCanvasElement | null = null;
let cachedContext: CanvasRenderingContext2D | null = null;

export const isFontRendered = (font: string) => {
  if (typeof document === 'undefined') return false;

  const cached = fontRenderCache.get(font);
  if (cached !== undefined) return cached;

  if (!cachedCanvas) {
    cachedCanvas = document.createElement('canvas');
    cachedContext = cachedCanvas.getContext('2d');
  }
  const context = cachedContext;
  if (!context) return false;

  const text = 'mmmmmmmmmmlli';
  const fontSize = '72px';
  const baseFonts = ['monospace', 'serif', 'sans-serif'];

  const defaultWidths = baseFonts.map((base) => {
    context.font = `${fontSize} ${base}`;
    return context.measureText(text).width;
  });

  const result = baseFonts.some((base, i) => {
    context.font = `${fontSize} '${font}', ${base}`;
    const width = context.measureText(text).width;
    return width !== defaultWidths[i];
  });

  fontRenderCache.set(font, result);
  return result;
};
