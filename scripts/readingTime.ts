const WORDS_PER_MINUTE = 225;
const CODE_LINES_PER_MINUTE = 40;

export function countWords(markdown: string): number {
  return stripToProse(markdown).split(/\s+/).filter(Boolean).length;
}

export function readingTime(markdown: string): number {
  const fences = markdown.match(/```[\s\S]*?```/g) ?? [];
  const codeLines = fences.reduce(
    (total, block) => total + Math.max(0, block.split("\n").length - 2),
    0
  );

  const words = countWords(markdown);

  return Math.max(
    1,
    Math.round(words / WORDS_PER_MINUTE + codeLines / CODE_LINES_PER_MINUTE)
  );
}

export function stripToProse(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`\n]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/^[#>\-*+|]+\s*/gm, " ")
    .replace(/[*_~]/g, " ");
}
