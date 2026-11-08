export function splitLines(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function splitParagraphs(value: string): string[] {
  return value
    .split(/\n\s*\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}
