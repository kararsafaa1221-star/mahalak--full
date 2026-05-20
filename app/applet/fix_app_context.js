const fs = require('fs');

let f = fs.readFileSync('src/context/AppContext.tsx', 'utf8');
let lines = f.split('\n');

// Find the line that has empty `title: , message: ,`
let badIdx = lines.findIndex(l => l.includes("title: , message: ,"));
if (badIdx > -1) {
  let l = lines[badIdx];
  lines[badIdx] = l.replace(/title: , message: ,/g, "title: 'منتج جديد ✨', message: 'منتج جديد متوفر الآن',");
  fs.writeFileSync('src/context/AppContext.tsx', lines.join('\n'));
  console.log('Fixed line ' + badIdx);
} else {
  console.log('Not found');
}
