const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory() && !file.includes('node_modules') && !file.includes('.git')) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
      const content = fs.readFileSync(file, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, index) => {
        if (line.includes('hover:bg-') && !line.includes('hover:text-')) {
          results.push({ file, line: index + 1, content: line.trim() });
        }
      });
    }
  });
  return results;
}

const res = walk('./src');
res.forEach(r => {
  const shortPath = r.file.split('src')[1];
  console.log(`${shortPath}:${r.line} - ${r.content}`);
});
