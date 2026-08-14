import fs from 'fs';
import path from 'path';

const chaptersPath = path.join(process.cwd(), 'public/chapters');

export const getAllChapters = () => {
  return fs
    .readdirSync(chaptersPath)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace('.md', ''))
    .sort();
};

export const getChapter = (slug: string) => {
  const filePath = path.join(chaptersPath, `${slug}.md`);

  return fs.readFileSync(filePath, 'utf8');
};
