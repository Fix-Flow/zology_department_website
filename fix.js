const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
}

const files = walk('src/app/admin').filter(f => f.endsWith('.tsx'));
files.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  let init = c;
  
  c = c.replace(/<table className="w-full text-sm">/g, '<table className="w-full text-sm whitespace-nowrap">');
  
  if (c !== init) {
    fs.writeFileSync(f, c);
    console.log('Fixed table in:', f);
  }
});
