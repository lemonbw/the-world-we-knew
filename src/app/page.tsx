import Main from "./components/Main";
import BookCard from "./components/home/BookCard/BookCard";
import ChapterList from "./components/ChapterList/ChapterList";

export default function Home() {
  return (
    <Main>
      <BookCard></BookCard>
      <ChapterList></ChapterList>
    </Main>
  );
}
