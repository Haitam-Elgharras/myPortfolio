const WORDS_PER_MINUTE = 225;
// Code is read line by line, not word by word, and much slower than prose.
// Without this a post that is 40% YAML and Java claims "2 min" and feels wrong.
const CODE_LINES_PER_MINUTE = 40;

export function countWords(markdown: string): number {
  return stripToProse(markdown).split(/\s+/).filter(Boolean).length;
}

export function readingTime(markdown: string): number {
  const fences = markdown.match(/```[\s\S]*?```/g) ?? [];
  const codeLines = fences.reduce(
    // -2 for the opening and closing fence lines themselves
    (total, block) => total + Math.max(0, block.split("\n").length - 2),
    0
  );

  const words = countWords(markdown);

  return Math.max(
    1,
    Math.round(words / WORDS_PER_MINUTE + codeLines / CODE_LINES_PER_MINUTE)
  );
}

/** Markdown reduced to the words a human actually reads. */
export function stripToProse(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, " ") // fenced code
    .replace(/`[^`\n]*`/g, " ") // inline code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ") // images contribute no words
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // keep link text, drop the URL
    .replace(/<[^>]+>/g, " ") // raw html tags
    .replace(/^[#>\-*+|]+\s*/gm, " ") // heading/quote/list/table markers
    .replace(/[*_~]/g, " ");
}
