'use client';
import { Toolbar } from '../../toolbar/ui/Toolbar';
import ReadingContent from '../ui/ReadingContent';
import ChapterSelector from '@/src/features/chapter-selector/ui/ChapterSelector';

export default function ReadingPage({ content }: { content: string }) {
  return (
    <main className="flex flex-col items-center justify-center overflow-x-hidden bg-white dark:bg-[#010407]">
      <Toolbar ChapterSelector={<ChapterSelector />}>
        <ReadingContent
          className="h-[90vh] overflow-y-auto p-1"
          content={content}
        />
      </Toolbar>
    </main>
  );
}
