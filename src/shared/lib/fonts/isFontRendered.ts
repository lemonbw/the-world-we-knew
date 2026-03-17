export function isFontRendered(font: string) {
  const text = 'mmmmmmmmmmlli';
  const fontSize = '72px';
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return false;

  const baseFonts = ['monospace', 'serif', 'sans-serif'];

  const defaultWidths = baseFonts.map((base) => {
    context.font = `${fontSize} ${base}`;
    return context.measureText(text).width;
  });

  return baseFonts.some((base, i) => {
    context.font = `${fontSize} '${font}', ${base}`;
    const width = context.measureText(text).width;
    return width !== defaultWidths[i];
  });
}
