import { getAllChapters, getChapter } from '@/src/entities/chapter/lib/storage';
import ReadingPage from '@/src/features/reading/templates/ReadingPage';
import { notFound } from 'next/navigation';

export const dynamicParams = false;
export const dynamic = 'force-static';

export function generateStaticParams() {
  const chapters = getAllChapters();
  return chapters.map((slug) => ({ slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const content = getChapter(slug);

  if (!content) {
    notFound();
  }

  return <ReadingPage content={content} />;
}
