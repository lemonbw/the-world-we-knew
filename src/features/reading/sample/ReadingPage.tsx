'use client';
import Main from '@/src/shared/ui/Main';
import { Toolbar } from '@/src/shared/ui/Toolbar'
import ReadingContent from '@/src/components/ReadingContent';
import ChapterSelector from '@/src/features/reading/chapter-selector/ChapterSelector';

export default function ReadingPage({ content }: { content: string }) {
  return (
    <Main>
      <Toolbar ChapterSelector={<ChapterSelector />}>
        <ReadingContent
          className="h-100vh overflow-y-auto p-1"
          content={content}
        />
      </Toolbar>
    </Main>
  );
}
