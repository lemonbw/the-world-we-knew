import Main from "@/src/shared/ui/Main";
import BookCard from "@/src/features/home/book-card/BookCard";
import ChapterList from "@/src/features/home/chapter-list/ChapterList";

export default function Home() {
  return (
    <Main>
      <BookCard></BookCard>
      <ChapterList></ChapterList>
    </Main>
  );
}
