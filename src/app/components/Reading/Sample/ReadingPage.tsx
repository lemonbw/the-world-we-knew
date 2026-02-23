"use client";
import { useRef, useState, useEffect } from "react";
import Main from "@/src/app/components/Main";
import ChapterSelector from "@/src/app/components/Reading/ChapterSelector/ChapterSelector"
import FontSelector from "@/src/app/components/Reading/Fonts/FontSelector"
import FontSizeSelector from "@/src/app/components/Reading/Fonts/FontSizeSelector"
import AlignSelector from "@/src/app/components/Reading/Align/AlignSelector"

export default function ReadingPage({ content }: { content: string }) {

  const [currentChapter, setCurrentChapter] = useState("")

  const [chapterQuery, setChapterQuery] = useState("")

  const readingSection = useRef<HTMLElement | null>(null);

  const [currentSize, setCurrentSize] = useState(24);

  const [currentFont, setCurrentFont] = useState("system-ui");

  const [query, setQuery] = useState("")

  const [currentAlign, setCurrentAlign] = useState<"left" | "center" | "right" | "justify">("left")

  const [fullscreen, setFullscreen] = useState(false);

  const icon = fullscreen ? "fullscreen_exit" : "fullscreen";

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      readingSection.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handler = () =>
      setFullscreen(Boolean(document.fullscreenElement));

    document.addEventListener("fullscreenchange", handler);
    return () =>
      document.removeEventListener("fullscreenchange", handler);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement).isContentEditable) {
        return;
      }

      if (e.key.toLowerCase() === "f") {
        e.preventDefault();
        toggleFullScreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Main>
      <section
        ref={readingSection}
        id="reading-section"
        className="flex flex-col h-[100vh] w-[80vw] overflow-y-auto mx-auto mt-4 p-3"
      >
        <div className="w-[70vw] h-10 flex flex-none justify-start gap-1 mb-2">
          <ChapterSelector currentChapter={currentChapter} setCurrentChapter={setCurrentChapter} chapterQuery={chapterQuery} setChapterQuery={setChapterQuery}></ChapterSelector>
          <button
            className="material-icons inline-block text-[2.2rem]! hover:text-[2.4rem]! ease-in-out duration-300 w-12"
            onClick={toggleFullScreen}
          >{icon}</button>
          <FontSelector currentFont={currentFont} setCurrentFont={setCurrentFont} query={query} setQuery={setQuery}></FontSelector>
          <FontSizeSelector currentSize={currentSize} setCurrentSize={setCurrentSize}></FontSizeSelector>
          <AlignSelector currentAlign={currentAlign} setCurrentAlign={setCurrentAlign}></AlignSelector>
        </div>
        <p style={{ fontSize: `${currentSize}px`, fontFamily: `${currentFont}`, userSelect: "text", textAlign: `${currentAlign}` }} >{content}</p>
      </section>
    </Main >
  )
}
