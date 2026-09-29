const fs = require('fs');
const path = require('path');

function walk(dir) {
  let res = [];
  fs.readdirSync(dir).forEach(f => {
    f = path.join(dir, f);
    if (fs.statSync(f).isDirectory()) {
      if (!f.includes('node_modules') && !f.includes('.next') && !f.includes('.git') && !f.includes('scratch')) {
        res = res.concat(walk(f));
      }
    } else if (f.endsWith('.tsx') || f.endsWith('.ts') || f.endsWith('.css') || f.endsWith('.js') || f.endsWith('.mjs')) {
      res.push(f);
    }
  });
  return res;
}

const files = walk('src');

// Detailed replacements mapping every green tone to #DC8B20 and its harmonious tones
const replacements = [
  // Selection
  { from: /selection:bg-emerald-[0-9]+/g, to: 'selection:bg-[#DC8B20]' },

  // Loader / Spinner specifics
  { from: /border-b-emerald-[0-9]+/g, to: 'border-b-[#DC8B20]' },
  { from: /border-t-emerald-[0-9]+/g, to: 'border-t-[#DC8B20]' },
  { from: /border-l-emerald-[0-9]+/g, to: 'border-l-[#f1b343]' },
  { from: /border-r-emerald-[0-9]+/g, to: 'border-r-[#f1b343]' },

  // Gradients
  { from: /from-emerald-950\/[0-9]+/g, to: 'from-[#2a1703]/95' },
  { from: /from-emerald-950/g, to: 'from-[#2a1703]' },
  { from: /via-emerald-900\/[0-9]+/g, to: 'via-[#422306]/60' },
  { from: /via-emerald-600/g, to: 'via-[#DC8B20]' },
  { from: /via-emerald-500\/[0-9]+/g, to: 'via-[#DC8B20]/20' },
  { from: /from-emerald-600/g, to: 'from-[#DC8B20]' },
  { from: /from-emerald-500\/[0-9]+/g, to: 'from-[#DC8B20]/15' },
  { from: /from-emerald-500/g, to: 'from-[#DC8B20]' },
  { from: /from-emerald-400/g, to: 'from-[#f1b343]' },
  { from: /to-emerald-800\/[0-9]+/g, to: 'to-[#774614]/40' },
  { from: /to-emerald-700/g, to: 'to-[#915514]' },
  { from: /to-emerald-600/g, to: 'to-[#DC8B20]' },
  { from: /to-emerald-500/g, to: 'to-[#DC8B20]' },
  { from: /to-emerald-400\/[0-9]+/g, to: 'to-[#DC8B20]/20' },
  { from: /to-emerald-400/g, to: 'to-[#f1b343]' },
  { from: /to-teal-600/g, to: 'to-[#f59e0b]' },
  { from: /to-teal-500/g, to: 'to-[#f59e0b]' },

  // Backgrounds with opacity
  { from: /bg-emerald-950\/[0-9]+/g, to: 'bg-[#2a1703]/80' },
  { from: /bg-emerald-950/g, to: 'bg-[#2a1703]' },
  { from: /bg-emerald-900\/[0-9]+/g, to: 'bg-[#422306]/80' },
  { from: /bg-emerald-900/g, to: 'bg-[#422306]' },
  { from: /bg-emerald-500\/[0-9]+/g, to: 'bg-[#DC8B20]/20' },
  { from: /bg-emerald-600\/[0-9]+/g, to: 'bg-[#DC8B20]/25' },
  { from: /bg-emerald-400\/[0-9]+/g, to: 'bg-[#DC8B20]/20' },
  { from: /bg-emerald-100\/[0-9]+/g, to: 'bg-[#DC8B20]/15' },
  { from: /bg-emerald-50\/[0-9]+/g, to: 'bg-[#DC8B20]/10' },

  // Standard Backgrounds
  { from: /bg-emerald-50\b/g, to: 'bg-[#DC8B20]/10' },
  { from: /bg-emerald-100\b/g, to: 'bg-[#DC8B20]/15' },
  { from: /bg-emerald-200\b/g, to: 'bg-[#DC8B20]/25' },
  { from: /bg-emerald-300\b/g, to: 'bg-[#f7cc74]' },
  { from: /bg-emerald-400\b/g, to: 'bg-[#f1b343]' },
  { from: /bg-emerald-500\b/g, to: 'bg-[#DC8B20]' },
  { from: /bg-emerald-600\b/g, to: 'bg-[#DC8B20]' },
  { from: /bg-emerald-700\b/g, to: 'bg-[#DC8B20]' },
  { from: /bg-emerald-800\b/g, to: 'bg-[#915514]' },

  // Text colors
  { from: /text-emerald-50\b/g, to: 'text-[#fef8ee]' },
  { from: /text-emerald-100\b/g, to: 'text-[#fdf0d5]' },
  { from: /text-emerald-200\b/g, to: 'text-[#fbe0aa]' },
  { from: /text-emerald-300\b/g, to: 'text-[#f7cc74]' },
  { from: /text-emerald-400\/[0-9]+/g, to: 'text-[#DC8B20]/80' },
  { from: /text-emerald-400\b/g, to: 'text-[#DC8B20]' },
  { from: /text-emerald-500\b/g, to: 'text-[#DC8B20]' },
  { from: /text-emerald-600\/[0-9]+/g, to: 'text-[#DC8B20]/80' },
  { from: /text-emerald-600\b/g, to: 'text-[#DC8B20]' },
  { from: /text-emerald-700\b/g, to: 'text-[#DC8B20]' },
  { from: /text-emerald-800\b/g, to: 'text-[#915514]' },
  { from: /text-emerald-900\b/g, to: 'text-[#774614]' },

  // Borders with opacity
  { from: /border-emerald-800\/[0-9]+/g, to: 'border-[#DC8B20]/40' },
  { from: /border-emerald-700\/[0-9]+/g, to: 'border-[#DC8B20]/40' },
  { from: /border-emerald-600\/[0-9]+/g, to: 'border-[#DC8B20]/40' },
  { from: /border-emerald-500\/[0-9]+/g, to: 'border-[#DC8B20]/40' },
  { from: /border-emerald-400\/[0-9]+/g, to: 'border-[#DC8B20]/40' },
  { from: /border-emerald-300\/[0-9]+/g, to: 'border-[#DC8B20]/30' },
  { from: /border-emerald-200\/[0-9]+/g, to: 'border-[#DC8B20]/25' },

  // Standard Borders
  { from: /border-emerald-50\b/g, to: 'border-[#DC8B20]/15' },
  { from: /border-emerald-100\b/g, to: 'border-[#DC8B20]/20' },
  { from: /border-emerald-200\b/g, to: 'border-[#DC8B20]/30' },
  { from: /border-emerald-300\b/g, to: 'border-[#DC8B20]/50' },
  { from: /border-emerald-400\b/g, to: 'border-[#DC8B20]' },
  { from: /border-emerald-500\b/g, to: 'border-[#DC8B20]' },
  { from: /border-emerald-600\b/g, to: 'border-[#DC8B20]' },
  { from: /border-emerald-700\b/g, to: 'border-[#DC8B20]' },
  { from: /border-emerald-800\b/g, to: 'border-[#DC8B20]' },

  // Rings & Shadows
  { from: /ring-emerald-[0-9]+/g, to: 'ring-[#DC8B20]' },
  { from: /shadow-emerald-[0-9]+\/[0-9]+/g, to: 'shadow-[#DC8B20]/25' },
  { from: /shadow-emerald-[0-9]+/g, to: 'shadow-[#DC8B20]/25' },

  // Generic green/teal classes
  { from: /text-teal-400/g, to: 'text-[#DC8B20]' },
  { from: /text-teal-700/g, to: 'text-[#DC8B20]' },
  { from: /border-teal-400/g, to: 'border-[#DC8B20]' },
  { from: /bg-teal-500/g, to: 'bg-[#DC8B20]' },
  { from: /bg-green-500/g, to: 'bg-[#DC8B20]' },
  { from: /bg-green-600/g, to: 'bg-[#DC8B20]' },
  { from: /text-green-500/g, to: 'text-[#DC8B20]' },
  { from: /text-green-600/g, to: 'text-[#DC8B20]' },
  { from: /text-green-700/g, to: 'text-[#DC8B20]' },

  // Hex and RGBA
  { from: /#059669/gi, to: '#DC8B20' },
  { from: /#10b981/gi, to: '#DC8B20' },
  { from: /#047857/gi, to: '#b56c12' },
  { from: /rgba\(\s*16\s*,\s*185\s*,\s*129/gi, to: 'rgba(220, 139, 32' },
  { from: /rgba\(\s*5\s*,\s*150\s*,\s*105/gi, to: 'rgba(220, 139, 32' },
  { from: /rgba\(\s*5\s*,\s*120\s*,\s*87/gi, to: 'rgba(220, 139, 32' },
];

let changedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  let original = content;

  for (const r of replacements) {
    content = content.replace(r.from, r.to);
  }

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf-8');
    changedCount++;
    console.log(`Updated ${file}`);
  }
});

console.log(`\nFinished: Replaced green colors across ${changedCount} files with #DC8B20.`);
