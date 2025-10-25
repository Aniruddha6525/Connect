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

const frontendSrc = path.join(__dirname,'..','connect-frontend-events','src');
const assetsDir = path.join(frontendSrc,'assets');

const pngs = fs.existsSync(assetsDir) ? fs.readdirSync(assetsDir).filter(f=>f.toLowerCase().endsWith('.png')) : [];
const srcFiles = walk(frontendSrc).filter(f=>!f.includes(`${path.sep}assets${path.sep}`));

const usage = {};
pngs.forEach(p => usage[p] = []);

srcFiles.forEach(f => {
  const ext = path.extname(f).toLowerCase();
  if(['.js','.jsx','.ts','.tsx','.html'].includes(ext)){
    const content = fs.readFileSync(f,'utf8');
    pngs.forEach(p => {
      if(content.includes(p) || content.includes(p.replace(/\s/g,''))) usage[p].push(f);
    });
  }
});

let report = [];
report.push('# Prepare-for-GitHub Report\n');
report.push('Generated: ' + new Date().toISOString() + '\n');
report.push('## PNG usage summary\n');
pngs.forEach(p => {
  const used = usage[p];
  report.push(`- ${p}: ${used.length>0?used.length+' references':'UNUSED'}`);
  report.push('\n');
  if(used.length>0){
    used.forEach(u => report.push(`  - ${path.relative(process.cwd(),u)}\n`));
  }
});

// List candidate unused files (big generated folders)
const candidates = [];
const backendGenerated = path.join(__dirname,'..','connect-backend','generated');
if(fs.existsSync(backendGenerated)) candidates.push(path.relative(process.cwd(),backendGenerated));

report.push('\n## Candidate directories to remove (review before delete)\n');
if(candidates.length===0) report.push('- None detected\n');
else candidates.forEach(c => report.push(`- ${c}\n`));

// Write report
const outPath = path.join(process.cwd(),'PREPARE_REPORT.md');
fs.writeFileSync(outPath, report.join('\n'));
console.log('PREPARE_REPORT.md generated at', outPath);
console.log('PNG usage:');
pngs.forEach(p => console.log(p, usage[p].length>0? 'used':'UNUSED'));
console.log('Next steps:');
console.log('- Review PREPARE_REPORT.md');
console.log('- Run the strip-comments script to remove frontend comments if you want: node scripts/strip_comments_frontend.js --apply');
