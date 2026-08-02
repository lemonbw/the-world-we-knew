'use client';
import { useState, useEffect } from 'react';
import ReadingContent from '../../reading/ui/ReadingContent';
import { Toolbar } from '../../toolbar/ui/Toolbar';

export const Overview = () => {
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
      <div className="mt-3 flex flex-row flex-wrap gap-2 p-1 *:rounded-sm *:border-2 *:px-1 *:duration-400 *:hover:bg-black *:hover:text-white *:dark:hover:bg-white *:dark:hover:text-black">
        {genres.map((genre) => (
          <span key={genre}>{genre}</span>
        ))}
      </div>
    </Toolbar>
  );
};
