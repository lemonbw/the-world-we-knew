export function parseFontSize(
  input: string,
  min = 8,
  max = 120,
): number | null {
  const filtered = input.replace(/[^0-9+\-*/().]/g, "");
  try {
    const result = Function(`"use strict"; return (${filtered})`)();
    if (typeof result === "number" && isFinite(result)) {
      return Math.min(Math.max(result, min), max);
    }
    return null;
  } catch {
    return null;
  }
}
