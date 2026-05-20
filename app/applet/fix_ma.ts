import * as fs from 'fs';

let ma = fs.readFileSync('src/views/Merchant/MerchantApp.tsx', 'utf8');

ma = ma.replace(/يعود للتجهيز\n returnReason: /g, '// يعود للتجهيز\n returnReason: ');
ma = ma.replace(/react-hooks\/exhaustive-depsps \},/g, 'react-hooks/exhaustive-deps\n},');
ma = ma.replace(/لوحة التحكم \(Dashboard\) \/\/ ==========================================/g, '// لوحة التحكم (Dashboard) // ==========================================');

// also check replacing any missing brackets or export ends
fs.writeFileSync('src/views/Merchant/MerchantApp.tsx', ma);
console.log('Fixed MA');
