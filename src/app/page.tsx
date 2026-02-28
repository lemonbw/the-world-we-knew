"use client"

import { useState } from "react";
import Main from "@/src/shared/ui/Main";
import BookCard from "@/src/features/home/book-card/BookCard";
import Panel from "@/src/components/home/Panel"
import ChapterList from "@/src/features/home/chapter-list/ChapterList";

export default function Home() {

  const [section, setSection] = useState<"Main" | "Chapters">("Main");

  return (
    <Main>
      <BookCard></BookCard>
      <Panel section={section} setSection={setSection} />
      {section === "Chapters" && <ChapterList />}
    </Main>
  );
}
