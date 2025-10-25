const fs = require('fs');
const path = require('path');

function walk(dir){
  const files = [];
  fs.readdirSync(dir).forEach(f => {
    const fp = path.join(dir,f);
    const stat = fs.statSync(fp);
    if(stat.isDirectory()) files.push(...walk(fp));
    else files.push(fp);
  });
  return files;
}

function stripComments(code){
  // Remove block comments /* */
  code = code.replace(/\/\*[\s\S]*?\*\//g,'');
  // Remove line comments // but preserve http:// occurrences
  code = code.replace(/(^|[^:\\])\/\/.*$/gm, '$1');
  return code;
}

const frontendSrc = path.join(__dirname,'..','connect-frontend-events','src');
if(!fs.existsSync(frontendSrc)){
  console.error('Frontend src not found at', frontendSrc);
  process.exit(1);
}
const files = walk(frontendSrc).filter(f => ['.js','.jsx','.ts','.tsx','.css','.html'].includes(path.extname(f)));

const apply = process.argv.includes('--apply');

files.forEach(f => {
  const orig = fs.readFileSync(f,'utf8');
  const stripped = stripComments(orig);
  if(orig !== stripped){
    console.log('Comments found in', path.relative(process.cwd(),f));
    if(apply){
      fs.writeFileSync(f,stripped,'utf8');
      console.log(' -> Stripped and saved');
    } else {
      console.log(' -> Run with --apply to overwrite file');
    }
  }
});

console.log('\nDone.');
console.log('Note: This script makes a best-effort removal of JS/TS/CSS/HTML comments.\nIt may remove todo-ish comments you wanted to keep. Review diffs before committing.');
