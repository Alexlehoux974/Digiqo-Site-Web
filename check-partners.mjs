import { partnersData } from './lib/partners-data.ts';

console.log('Total partners:', partnersData.length);
console.log('\nFirst row (0-30):', partnersData.slice(0, 31).length, 'logos');
console.log('Second row (31-61):', partnersData.slice(31, 62).length, 'logos');
console.log('Third row (62-92):', partnersData.slice(62, 93).length, 'logos');

console.log('\nSample from third row:');
partnersData.slice(62, 70).forEach((p, i) => {
  console.log(`  [${62 + i}] ${p.name}`);
});

console.log('\nSearching for specific clients:');
const toFind = ['Dorcel', 'Emixem', 'Agence Centrale Or', '3M', 'Cavavin'];
toFind.forEach(name => {
  const index = partnersData.findIndex(p => p.name === name);
  if (index >= 0) {
    const row = index < 31 ? 'firstRow' : index < 62 ? 'secondRow' : 'thirdRow';
    console.log(`  "${name}" → index ${index} (${row})`);
  } else {
    console.log(`  "${name}" → NOT FOUND`);
  }
});
