import { glob } from 'glob';
import { readFileSync } from 'node:fs';

const files = await glob('src/{components,app}/**/*.tsx', { absolute: false });
const hits: { file: string; line: number }[] = [];

for (const f of files) {
  const lines = readFileSync(f, 'utf8').split('\n');
  lines.forEach((l, i) => {
    if (/<form\b/.test(l)) {
      hits.push({ file: f, line: i + 1 });
    }
  });
}

if (hits.length > 0) {
  console.error(`\n<form> tag detected (${hits.length}):\n`);
  for (const h of hits) {
    console.error(`  ${h.file}:${h.line}`);
  }
  console.error('\nV0.1 does not allow forms. Remove them or push to V0.2.\n');
  process.exit(1);
}

console.log('OK: No <form> tags found');
process.exit(0);
