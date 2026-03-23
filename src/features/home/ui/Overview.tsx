'use client';
import { useState, useEffect } from 'react';
import ReadingContent from '@/src/features/reading/ui/ReadingContent';
import { Toolbar } from '@/src/widgets/Toolbar'

export default function Description() {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch('/overview.md')
      .then((res) => res.text())
      .then(setContent);
  }, []);

  const genres = [
    'хоррор',
    'военная проза',
    'тёмное фэнтези',
    'научная фантастика',
    'романтика',
  ];


  return (
    <Toolbar>
      <ReadingContent className="p-1 select-text" content={content} />
      <div className="mt-3 flex flex-row flex-wrap gap-2 p-1 *:rounded-sm *:border *:px-1 *:duration-300 *:hover:bg-white *:hover:text-black">
        {genres.map((genre) => (
          <span key={genre}>{genre}</span>
        ))}
      </div>
    </Toolbar>
  )
}
