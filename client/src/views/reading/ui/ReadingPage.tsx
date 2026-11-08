'use client';

import { ChapterSelector } from '@/src/features/chapter-selector';
import { MarkdownRenderer } from '@/src/shared/ui/MarkdownRenderer';
import { Toolbar } from '@/src/widgets/toolbar';

type ReadingPageProps = {
  content: string;
};

export const ReadingPage = ({ content }: ReadingPageProps) => {
  return (
    <main className="flex flex-col items-center justify-center overflow-x-hidden">
      <Toolbar ChapterSelector={<ChapterSelector />}>
        <MarkdownRenderer
          className="h-full min-w-0 overflow-y-auto p-1"
          content={content}
        />
      </Toolbar>
    </main>
  );
};
