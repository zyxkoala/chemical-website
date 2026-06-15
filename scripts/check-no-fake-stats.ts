import { glob } from 'glob';
import { readFileSync } from 'node:fs';

const files = await glob('src/{content,messages,components,app}/**/*.{ts,tsx,json,md}', {
  ignore: ['src/content/legal/**'],
  absolute: false,
});

const patterns = [
  /\b(20\+|15\+|100% Customer)\b/,
  /\b(\d+)\+\s+(Years|Countries)\b/,
];

const hits: { file: string; line: number; match: string }[] = [];

for (const f of files) {
  const lines = readFileSync(f, 'utf8').split('\n');
  lines.forEach((l, i) => {
    for (const p of patterns) {
      const m = l.match(p);
      if (m) {
        hits.push({ file: f, line: i + 1, match: m[0] });
      }
    }
  });
}

if (hits.length > 0) {
  console.error(`\nFake stats detected (${hits.length}):\n`);
  for (const h of hits) {
    console.error(`  ${h.file}:${h.line}  "${h.match}"`);
  }
  process.exit(1);
}

console.log('OK: No fake stats found');
process.exit(0);
