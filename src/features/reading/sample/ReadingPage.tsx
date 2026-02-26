"use client";
import { useRef, useState } from "react";
import Main from "@/src/shared/ui/Main";
import ChapterSelector from "@/src/features/reading/chapter-selector/ChapterSelector"
import { FontSelector, FontSizeSelector, AlignSelector } from "@/src/components/text"
import useFullscreen from "@/src/shared/hooks/useFullscreen"

export default function ReadingPage({ content }: { content: string }) {

  const readingSection = useRef<HTMLElement | null>(null);

  const [currentSize, setCurrentSize] = useState(24);

  const [currentFont, setCurrentFont] = useState("system-ui");

  const [fontQuery, setFontQuery] = useState("")

  const [currentAlign, setCurrentAlign] = useState<"left" | "center" | "right" | "justify">("left")

  const { fullscreen, toggleFullscreen } = useFullscreen({
    readingSection,
  });

  const icon = fullscreen ? "fullscreen_exit" : "fullscreen";

  return (
    <Main>
      <section
        ref={readingSection}
        id="reading-section"
        className="flex flex-col h-[100vh] w-[80vw] overflow-y-auto mx-auto mt-4 p-3"
      >
        <div className="w-[70vw] h-10 flex flex-none justify-start gap-1 mb-2">
          <ChapterSelector></ChapterSelector>
          <button
            className="material-icons inline-block text-[2.2rem]! hover:text-[2.4rem]! ease-in-out duration-300 w-12"
            onClick={toggleFullscreen}
          >{icon}</button>
          <FontSelector currentFont={currentFont} setCurrentFont={setCurrentFont} query={fontQuery} setQuery={setFontQuery}></FontSelector>
          <FontSizeSelector currentSize={currentSize} setCurrentSize={setCurrentSize}></FontSizeSelector>
          <AlignSelector currentAlign={currentAlign} setCurrentAlign={setCurrentAlign}></AlignSelector>
        </div>
        <p style={{ fontSize: `${currentSize}px`, fontFamily: `${currentFont}`, userSelect: "text", textAlign: `${currentAlign}` }} >{content}</p>
      </section>
    </Main >
  )
}
