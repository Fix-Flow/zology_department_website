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
  const filename = path.basename(file, path.extname(file));

  // Skip layout, error, loading, page if we want, but actually it's useful there too.
  // We'll use the parent directory name if the file is 'page' or 'layout'.
  let componentName = filename;
  if (filename === 'page' || filename === 'layout' || filename === 'loading') {
    componentName = path.basename(path.dirname(file)) + '_' + filename;
    // uppercase first letter
    componentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);
  }

  // Find the first occurrence of return ( <tag
  // Regex to match "return (" or "return " followed by a JSX tag like <div, <main, <section
  // We need to be careful not to match fragments <>
  
  // A simple regex to find the first HTML tag after "return"
  // Look for `return` followed by optional spaces, then optionally `(`, optional spaces, then `<` followed by word characters.
  const returnRegex = /return\s*\(?\s*<([a-z]+)(\s|>)/;
  
  const match = returnRegex.exec(content);
  if (match) {
    const tagName = match[1];
    // We only want to inject into standard HTML tags, not React components (which start with uppercase)
    if (tagName === tagName.toLowerCase() && tagName !== 'script' && tagName !== 'style') {
      const tagString = `<${tagName}`;
      // Check if it already has data-component
      if (!content.substring(match.index, match.index + 100).includes('data-component=')) {
        const replaceString = `<${tagName} data-component="${componentName}"`;
        // Replace only the first occurrence after 'return'
        const before = content.substring(0, match.index);
        const after = content.substring(match.index);
        const modifiedAfter = after.replace(tagString, replaceString);
        
        fs.writeFileSync(file, before + modifiedAfter);
        console.log(`Injected into ${componentName} (${path.basename(file)})`);
      }
    }
  } else {
    // If it's a fragment return <>, let's find the first standard HTML tag after return
    const afterReturnRegex = /return[\s\S]*?(<([a-z]+)[\s>])/;
    const match2 = afterReturnRegex.exec(content);
    if (match2) {
      const fullMatch = match2[1]; // e.g. "<div " or "<div>"
      const tagName = match2[2];
      if (!fullMatch.includes('data-component=')) {
         const replaceString = `<${tagName} data-component="${componentName}"${fullMatch.endsWith('>') ? '>' : ' '}`;
         const before = content.substring(0, match2.index);
         const after = content.substring(match2.index);
         const modifiedAfter = after.replace(fullMatch, replaceString);
         fs.writeFileSync(file, before + modifiedAfter);
         console.log(`Injected into ${componentName} (${path.basename(file)}) [Fallback]`);
      }
    }
  }
});

console.log("Injection complete.");
