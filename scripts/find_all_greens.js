const fs = require('fs');
const path = require('path');

function walk(dir) {
  let res = [];
  fs.readdirSync(dir).forEach(f => {
    f = path.join(dir, f);
    if (fs.statSync(f).isDirectory()) {
      if (!f.includes('node_modules') && !f.includes('.next') && !f.includes('.git')) {
        res = res.concat(walk(f));
      }
    } else if (f.endsWith('.tsx') || f.endsWith('.ts') || f.endsWith('.css') || f.endsWith('.js') || f.endsWith('.mjs')) {
      res.push(f);
    }
  });
  return res;
}

const files = walk('src');
const greenPatterns = [
  /emerald/i,
  /\bgreen\b/i,
  /#059669/i,
  /#10b981/i,
  /#047857/i,
  /#065f46/i,
  /#064e3b/i,
  /#34d399/i,
  /#6ee7b7/i,
  /#a7f3d0/i,
  /#d1fae5/i,
  /#ecfdf5/i,
  /rgba\(\s*16\s*,\s*185\s*,\s*129/i,
  /rgba\(\s*5\s*,\s*150\s*,\s*105/i,
  /rgba\(\s*5\s*,\s*120\s*,\s*87/i,
];

const matchesPerFile = {};

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    for (const pattern of greenPatterns) {
      if (pattern.test(line)) {
        if (!matchesPerFile[file]) matchesPerFile[file] = [];
        matchesPerFile[file].push({ lineNum: idx + 1, line: line.trim() });
        break;
      }
    }
  });
});

console.log('Total files containing green references:', Object.keys(matchesPerFile).length);
for (const [file, items] of Object.entries(matchesPerFile)) {
  console.log(`\n${file} (${items.length} lines):`);
  items.slice(0, 10).forEach(i => console.log(`  Line ${i.lineNum}: ${i.line.slice(0, 120)}`));
  if (items.length > 10) console.log(`  ... and ${items.length - 10} more lines`);
}
