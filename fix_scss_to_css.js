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

const files = walk(path.join(__dirname, 'src'));

files.forEach(file => {
  if (file.endsWith('.module.scss')) {
    const newPath = file.replace('.module.scss', '.module.css');
    fs.renameSync(file, newPath);
    console.log(`Renamed ${path.basename(file)} to ${path.basename(newPath)}`);
  } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('.module.scss')) {
      content = content.replace(/\.module\.scss/g, '.module.css');
      fs.writeFileSync(file, content);
      console.log(`Updated import in ${path.basename(file)}`);
    }
  }
});

console.log("Fix complete.");
