'use client';

import { useEffect, useState } from 'react';
import { MarkdownRenderer } from '@/src/shared/ui/MarkdownRenderer';
import { Toolbar } from '@/src/widgets/toolbar';

export const HomePage = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch('/overview.md')
      .then((res) => res.text())
      .then(setContent);
  }, []);

  return (
    <Toolbar>
      <MarkdownRenderer className="p-1 select-text" content={content} />
    </Toolbar>
  );
};
