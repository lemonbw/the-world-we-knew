import { getAllChapters, getChapter } from "@/src/shared/lib/chapters";
import ReadingPage from "@/src/features/reading/sample/ReadingPage";
import { notFound } from "next/navigation";

export const dynamicParams = false;
export const dynamic = "force-static";

export function generateStaticParams() {
  const chapters = getAllChapters();
  return chapters.map((slug) => ({ slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const chapters = getAllChapters();

  if (!chapters.includes(slug)) {
    notFound();
  }

  const content = getChapter(slug);

  return <ReadingPage content={content} />;
}
