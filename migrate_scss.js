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
      if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(path.join(__dirname, 'src'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Skip if already has module.scss import to avoid messing up
  if (content.includes('.module.scss')) return;
  // Skip layout.tsx which often has critical html/body tags that don't need scss
  if (file.endsWith('layout.tsx')) return;

  const classNameRegex = /className="([^"]+)"/g;
  let match;
  const classMap = new Map();
  let classCounter = 1;

  let scssContent = '';
  let modifiedContent = content;

  // We will replace them one by one
  // Since we are replacing, we should do it carefully.
  // Actually, replacing all occurrences of a specific string is safer.
  let matchesFound = false;

  const replacements = [];

  while ((match = classNameRegex.exec(content)) !== null) {
    const fullMatch = match[0];
    const tailwindClasses = match[1].trim();
    
    // Skip empty or simple standard classes that might already be standard CSS
    if (!tailwindClasses || tailwindClasses === 'active' || tailwindClasses === 'container') continue;
    
    // Skip arbitrary values as they crash the SASS parser with @apply
    if (tailwindClasses.includes('[') || tailwindClasses.includes(']')) continue;

    if (!classMap.has(tailwindClasses)) {
      const generatedClass = `style${classCounter++}`;
      classMap.set(tailwindClasses, generatedClass);
      
      scssContent += `.${generatedClass} {\n  @apply ${tailwindClasses};\n}\n\n`;
    }
    
    const generatedClass = classMap.get(tailwindClasses);
    replacements.push({
      original: fullMatch,
      replacement: `className={styles.${generatedClass}}`
    });
    matchesFound = true;
  }

  if (matchesFound) {
    // Apply replacements
    replacements.forEach(r => {
      // Use split/join to replace all exact occurrences safely
      modifiedContent = modifiedContent.split(r.original).join(r.replacement);
    });

    // Inject import
    const filename = path.basename(file, path.extname(file));
    const scssFilename = `${filename}.module.scss`;
    const scssPath = path.join(path.dirname(file), scssFilename);

    const importStatement = `import styles from './${scssFilename}';\n`;
    
    // Find last import
    const importRegex = /^import\s+.*$/gm;
    let lastImportIndex = 0;
    let importMatch;
    while ((importMatch = importRegex.exec(modifiedContent)) !== null) {
      lastImportIndex = importMatch.index + importMatch[0].length;
    }

    if (lastImportIndex > 0) {
      modifiedContent = modifiedContent.slice(0, lastImportIndex) + '\n' + importStatement + modifiedContent.slice(lastImportIndex);
    } else {
      // If no imports (rare in React, but possible), put it at top but after 'use client' if exists
      if (modifiedContent.startsWith('"use client";') || modifiedContent.startsWith("'use client';")) {
        const lines = modifiedContent.split('\n');
        lines.splice(1, 0, '\n' + importStatement);
        modifiedContent = lines.join('\n');
      } else {
        modifiedContent = importStatement + '\n' + modifiedContent;
      }
    }

    // Write SCSS file
    fs.writeFileSync(scssPath, scssContent);
    
    // Write modified TSX
    fs.writeFileSync(file, modifiedContent);
    console.log(`Processed: ${path.relative(__dirname, file)} -> ${scssFilename}`);
  }
});

console.log("Migration complete!");
