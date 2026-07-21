// Refresh the embedded offline fallback in which-brain.html from questions.json.
// Run this after editing questions.json if you want the single-file (offline) copy
// to stay in sync. The live GitHub Pages site does NOT need this — it fetches
// questions.json directly. Usage:  node build.js
const fs = require('fs');
const html = fs.readFileSync('which-brain.html', 'utf8');
const q = fs.readFileSync('questions.json', 'utf8').trim();
const s = html.indexOf('/* __QUESTIONS_FALLBACK__ */');
const e = html.indexOf('/* __END_FALLBACK__ */');
if (s < 0 || e < 0) { console.error('Fallback markers not found in which-brain.html'); process.exit(1); }
const out = html.slice(0, s) + `/* __QUESTIONS_FALLBACK__ */\nconst QUESTIONS_FALLBACK = ${q};\n` + html.slice(e);
fs.writeFileSync('which-brain.html', out);
console.log('Embedded fallback refreshed from questions.json.');
