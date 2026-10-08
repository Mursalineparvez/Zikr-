const fs = require('fs');

// Read bundle
const bundle = fs.readFileSync('/tmp/bundle.js', 'utf8');

function extractArray(name, index) {
  let start = bundle.indexOf('[', index);
  let bracketCount = 0;
  let end = -1;
  for (let i = start; i < bundle.length; i++) {
    const char = bundle[i];
    if (char === '[') bracketCount++;
    else if (char === ']') {
      bracketCount--;
      if (bracketCount === 0) {
        end = i + 1;
        break;
      }
    }
  }
  const arrStr = bundle.substring(start, end);
  return eval(arrStr);
}

// Extract arrays
const mk = extractArray('mk', 580335);
const yk = extractArray('yk', 595331);
const b8 = extractArray('b8', 613995);

// Merge & sort by year
const allEvents = [...mk, ...yk, ...b8];
allEvents.sort((a, b) => {
  // Sort primarily by year
  if (a.y !== b.y) return a.y - b.y;
  // If years are identical, preserve order
  return 0;
});

console.log('Total extracted sorted events:', allEvents.length);

// Read original islamicHistoryData.ts
const origContent = fs.readFileSync('src/data/islamicHistoryData.ts', 'utf8');

// Find split points
const eventStartIdx = origContent.indexOf('export const ISLAMIC_HISTORY_EVENTS: HistoryEvent[]');
if (eventStartIdx === -1) {
  console.error('Could not find ISLAMIC_HISTORY_EVENTS split point!');
  process.exit(1);
}

const routeStartIdx = origContent.indexOf('export const ISLAMIC_HISTORY_ROUTES');
if (routeStartIdx === -1) {
  console.error('Could not find ISLAMIC_HISTORY_ROUTES split point!');
  process.exit(1);
}

const part1 = origContent.substring(0, eventStartIdx);
const part3 = origContent.substring(routeStartIdx);

// Build part2
let part2 = 'export const ISLAMIC_HISTORY_EVENTS: HistoryEvent[] = [\n';
for (let i = 0; i < allEvents.length; i++) {
  const ev = allEvents[i];
  // Format with indentation
  part2 += '  ' + JSON.stringify(ev, null, 2).replace(/\n/g, '\n  ');
  if (i < allEvents.length - 1) {
    part2 += ',\n';
  } else {
    part2 += '\n';
  }
}
part2 += '];\n\n';

const newContent = part1 + part2 + part3;
fs.writeFileSync('src/data/islamicHistoryData.ts', newContent, 'utf8');
console.log('Successfully updated src/data/islamicHistoryData.ts! Total events written:', allEvents.length);
