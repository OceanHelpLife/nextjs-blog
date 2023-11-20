import fs from 'fs';
import path from 'path';

export default function getSortedReferencesData() {
  const filePath = path.join(process.cwd(), 'lib', 'references.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const references = JSON.parse(fileContents);
  return references.sort((a, b) => {
    return a.id < b.id ? -1 : 1;
  });
}