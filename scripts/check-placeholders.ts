import { glob } from 'glob';
import { readFileSync } from 'node:fs';

/**
 * Strip product objects marked with `placeholder: true` from products.ts source.
 * Uses brace counting to find the enclosing `{ ... }` block of each match.
 */
function stripPlaceholderProducts(src: string): string {
  const out: string[] = [];
  let i = 0;
  while (i < src.length) {
    const next = src.indexOf('placeholder: true', i);
    if (next === -1) {
      out.push(src.slice(i));
      break;
    }
    let start = next;
    let depth = 0;
    while (start > 0) {
      const ch = src[start];
      if (ch === '}') depth++;
      else if (ch === '{') {
        if (depth === 0) break;
        depth--;
      }
      start--;
    }
    let end = next;
    depth = 0;
    while (end < src.length) {
      const ch = src[end];
      if (ch === '{') depth++;
      else if (ch === '}') {
        depth--;
        if (depth === 0) { end++; break; }
      }
      end++;
    }
    out.push(src.slice(i, start));
    i = end;
  }
  return out.join('');
}

const files = await glob('src/{content,messages}/**/*.{ts,json,md}', { absolute: false });
const hits: { file: string; line: number; text: string }[] = [];

for (const f of files) {
  let content = readFileSync(f, 'utf8');
  if (f.replace(/\\/g, '/').endsWith('src/content/products.ts')) {
    content = stripPlaceholderProducts(content);
  }
  const lines = content.split('\n');
  lines.forEach((l, i) => {
    if (l.includes('[PLACEHOLDER]')) {
      hits.push({ file: f, line: i + 1, text: l.trim().slice(0, 80) });
    }
  });
}

if (hits.length > 0) {
  console.error(`Found ${hits.length} placeholder(s):\n`);
  for (const h of hits) {
    console.error(`  ${h.file}:${h.line}  ${h.text}`);
  }
  process.exit(1);
}

process.exit(0);
