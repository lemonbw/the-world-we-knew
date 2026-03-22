import fs from 'fs';
import path from 'path';

const chaptersPath = path.join(process.cwd(), 'public/chapters');

export function getAllChapters() {
  return fs
    .readdirSync(chaptersPath)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace('.md', ''))
    .sort();
}

export function getChapter(slug: string) {
  const filePath = path.join(chaptersPath, `${slug}.md`);

  return fs.readFileSync(filePath, 'utf8');
}
