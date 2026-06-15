import { glob } from 'glob';
import { readFileSync } from 'node:fs';

const files = await glob('src/{content,messages}/**/*.{ts,json,md}', { absolute: false });
const hits: { file: string; line: number; text: string }[] = [];

for (const f of files) {
  const lines = readFileSync(f, 'utf8').split('\n');
  lines.forEach((l, i) => {
    if (l.includes('[PLACEHOLDER]')) {
      hits.push({ file: f, line: i + 1, text: l.trim().slice(0, 80) });
    }
  });
}

if (hits.length > 0) {
  console.log(`Found ${hits.length} placeholder(s):\n`);
  for (const h of hits) {
    console.log(`  ${h.file}:${h.line}  ${h.text}`);
  }
}

process.exit(0);
