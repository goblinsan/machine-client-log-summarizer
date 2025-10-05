const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Mapping of hex (lowercase, 3 or 6 char) to CSS variable name (without var() wrapper)
const mapping = {
  '#282c34': '--header-bg',
  '#61dafb': '--accent-2',
  '#4a9fc7': '--accent-variant',
  '#ccc': '--light-border',
  '#cccccc': '--light-border',
  '#f9f9f9': '--drop-bg',
  '#007bff': '--accent',
  '#f1f9ff': '--accent-bg-light',
  '#333': '--muted-dark',
  '#e9e9e9': '--file-list-bg',
  '#e5e7eb': '--border',
  '#fff3cd': '--warning-bg',
  '#ffeaa7': '--warning-border',
  '#856404': '--warning-text',
  '#f5f5f5': '--surface-light',
  '#0056b3': '--btn-hover',
  '#28a745': '--success',
  '#218838': '--success-dark',
  '#6c757d': '--muted-2',
  '#d4edda': '--success-bg',
  '#155724': '--success-text',
  '#f8d7da': '--error-bg',
  '#721c24': '--error-text',
  '#f8f9fa': '--surface-xlight',
  '#dc3545': '--danger',
  '#ffc107': '--warning',
  '#212529': '--text-contrast',
  '#17a2b8': '--info',
  '#343a40': '--dark',
  '#29b6f6': '--accent-variant-2',
  '#ff5252': '--danger-light',
  '#3a3d42': '--dark-variant',
  '#1e1e1e': '--blackish',
  '#d1ecf1': '--info-bg',
  '#0c5460': '--info-text',
  '#f2f2f2': '--alt-surface',
  '#e9ecef': '--muted-light-2',
  '#f4f4f4': '--surface-2',
  '#f0f0f0': '--surface-3',
  '#ffffff': '--card',
  '#fff': '--card',
  '#1f2937': '--text'
};

const cwd = path.resolve(__dirname, '..');
// include additional file types (css, scss, js, jsx, ts, tsx)
const srcGlob = path.join(cwd, 'src', '**', '*.{css,scss,js,jsx,ts,tsx,html}');

console.log('Scanning files:', srcGlob);
const files = glob.sync(srcGlob, { nodir: true });
console.log('Found', files.length, 'files');

function normalizeHex(h) {
  if (!h) return h;
  h = h.toLowerCase();
  if (/^#[0-9a-f]{3}$/.test(h)) {
    // expand short hex
    return '#' + h.slice(1).split('').map(c => c + c).join('');
  }
  return h;
}

// Build reverse map (normalized to 6-digit keys)
const normalizedMap = {};
Object.keys(mapping).forEach(k => {
  const n = normalizeHex(k);
  normalizedMap[n] = mapping[k];
});

// Collect variables that should exist in _base.scss
const varsToEnsure = {};
Object.entries(normalizedMap).forEach(([hex, varName]) => varsToEnsure[varName] = hex);

// Read _base.scss and append any missing vars
const basePath = path.join(cwd, 'src', 'styles', '_base.scss');
let baseContent = '';
try {
  baseContent = fs.readFileSync(basePath, 'utf8');
} catch (err) {
  console.error('Failed to read _base.scss:', basePath, err.message);
  process.exit(1);
}

// find existing variables in :root
const existingVars = {};
const varRegex = /--([a-z0-9\-]+)\s*:\s*([^;]+);/gi;
let m;
while ((m = varRegex.exec(baseContent)) !== null) {
  existingVars['--' + m[1]] = m[2].trim();
}

const toAppend = [];
Object.entries(varsToEnsure).forEach(([varName, hex]) => {
  if (!existingVars[varName]) {
    toAppend.push(`  ${varName}: ${hex};`);
  }
});

if (toAppend.length > 0) {
  // Insert before the closing '}' of the :root block. Find last :root
  const rootCloseIdx = baseContent.lastIndexOf('}');
  const insertPoint = rootCloseIdx;
  const appendBlock = '\n  /* Auto-added color tokens */\n' + toAppend.join('\n') + '\n';
  // naive append at end of file to keep safe
  baseContent = baseContent + '\n' + appendBlock;
  fs.writeFileSync(basePath, baseContent, 'utf8');
  console.log('Appended', toAppend.length, 'variables to', basePath);
} else {
  console.log('No new variables to append to', basePath);
}

// Now replace occurrences
const hexRegex = /#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})/g;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let replaced = 0;
  content = content.replace(hexRegex, (match) => {
    const normalized = normalizeHex(match);
    const varName = normalizedMap[normalized];
    if (varName) {
      replaced++;
      return `var(${varName})`;
    }
    return match;
  });
  if (replaced > 0) {
    // backup original file first
    const backupDir = path.join(cwd, 'scripts', '.color-replace-backup');
    if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });
    const rel = path.relative(cwd, file).replace(/[\\/]/g, '_');
    const backupPath = path.join(backupDir, rel + '.' + Date.now() + '.bak');
    fs.copyFileSync(file, backupPath);
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${replaced} colors in ${path.relative(cwd, file)}`);
  }
});

console.log('Done.');
