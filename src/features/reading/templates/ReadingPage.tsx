'use client';
import Main from '@/src/shared/ui/Main';
import { Toolbar } from '@/src/widgets/Toolbar'
import ReadingContent from '@/src/features/reading/ui/ReadingContent';
import ChapterSelector from '@/src/features/chapter-selector/ui/ChapterSelector';

export default function ReadingPage({ content }: { content: string }) {
  return (
    <Main>
      <Toolbar ChapterSelector={<ChapterSelector />}>
        <ReadingContent
          className="h-[90vh] overflow-y-auto p-1"
          content={content}
        />
      </Toolbar>
    </Main>
  );
}
