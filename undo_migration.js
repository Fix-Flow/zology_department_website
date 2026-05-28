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
  if (file.endsWith('.module.css') || file.endsWith('.module.scss')) {
    const tsxFile = file.replace('.module.css', '.tsx').replace('.module.scss', '.tsx');
    if (fs.existsSync(tsxFile)) {
      let tsxContent = fs.readFileSync(tsxFile, 'utf8');
      const cssContent = fs.readFileSync(file, 'utf8');

      // Parse CSS
      const styleRegex = /\.style(\d+)\s*{\s*@apply\s+([^;]+);\s*}/g;
      let match;
      let matchesFound = 0;
      while ((match = styleRegex.exec(cssContent)) !== null) {
        const styleId = `style${match[1]}`;
        const tailwindClasses = match[2].trim();

        // Replace in TSX
        const searchStr = `className={styles.${styleId}}`;
        const replaceStr = `className="${tailwindClasses}"`;
        tsxContent = tsxContent.split(searchStr).join(replaceStr);
        matchesFound++;
      }

      if (matchesFound > 0) {
        // Remove import
        const importName = path.basename(file);
        const importRegex = new RegExp(`import styles from '\\.\\/${importName}';?\\n?`, 'g');
        tsxContent = tsxContent.replace(importRegex, '');

        fs.writeFileSync(tsxFile, tsxContent);
        console.log(`Reverted classes in ${path.basename(tsxFile)}`);
      }
      
      // Delete CSS file
      fs.unlinkSync(file);
      console.log(`Deleted ${path.basename(file)}`);
    } else {
      // Maybe it was .jsx or Client component
      // Let's check for client component naming if any
      const clientTsxFile = file.replace('.module.css', 'Client.tsx').replace('.module.scss', 'Client.tsx');
      if (fs.existsSync(clientTsxFile)) {
         // handle similarly if needed, but in our project they perfectly matched basename
      }
    }
  }
});

console.log("Undo complete.");
