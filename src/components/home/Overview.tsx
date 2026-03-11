"use client"
import { useState, useEffect } from "react"
import { useMedia } from "use-media"
import { FontSelector, FontSizeSelector, AlignSelector } from "@/src/components/text"
import useFullscreen from "@/src/shared/hooks/useFullscreen"
import ReadingContent from "@/src/components/ReadingContent"
import { useReadingState } from "@/src/shared/hooks/reading/useReadingState"

export default function Description() {

  const {
    readingSection,
    currentSize,
    setCurrentSize,
    currentFont,
    setCurrentFont,
    fontQuery,
    setFontQuery,
    currentAlign,
    setCurrentAlign,
  } = useReadingState()

  const [content, setContent] = useState("")

  useEffect(() => {
    fetch("/overview.md")
      .then((res) => res.text())
      .then(setContent)
  }, []);

  const isLarge = useMedia({ minWidth: 1024 });

  useEffect(() => {
    if (!isLarge) setCurrentSize(16)
    else setCurrentSize(20);
  }, [isLarge, setCurrentSize]);

  const { fullscreen, toggleFullscreen } = useFullscreen({
    readingSection,
  })

  const icon = fullscreen ? "fullscreen_exit" : "fullscreen"

  const genres = ["хоррор", "военная проза", "тёмное фэнтези", "научная фантастика", "романтика"]

  return (
    <section
      ref={readingSection}
      id="reading-section"
      className={`flex flex-col w-[80vw] mx-auto mt-4 h-[100vh] lg:h-[105vh]`}
    >
      <div className={`overflow-x-auto h-60 -mb-48 ${fullscreen ? "lg:mt-4" : ""}`}>
        <div className={`flex flex-none items-center gap-1 ${fullscreen ? "w-[100vw] lg:w-[70vw]" : "w-[80vw] lg:w-[70vw]"} h-10 mb-2 -ml-[0.225rem] lg:-ml-1`}>
          <FontSelector
            currentFont={currentFont}
            setCurrentFont={setCurrentFont}
            query={fontQuery}
            setQuery={setFontQuery}
          />
          <FontSizeSelector
            currentSize={currentSize}
            setCurrentSizeAction={setCurrentSize}
          />
          <AlignSelector
            currentAlign={currentAlign}
            setCurrentAlign={setCurrentAlign}
          />
          <button
            className="material-icons text-[2.5rem]! hover:text-[2.6rem]! transition-all duration-300 w-10 ml-7 mt-2"
            onClick={toggleFullscreen}
          >
            {icon}
          </button>

        </div>
      </div >
      <div className={`flex-1 border rounded-2xl overflow-hidden ${fullscreen ? "mb-4 lg:mb-0" : ""}`}>
        <div
          className="p-1 h-full overflow-y-auto"
          style={{
            fontSize: `${currentSize}px`,
            fontFamily: currentFont,
            textAlign: currentAlign,
          }}
        >
          <ReadingContent className="p-1 select-text" content={content} />
          <div className="flex flex-row gap-2 mt-3 p-1 *:hover:text-black *:hover:bg-white *:duration-300 *:px-1 *:border *:rounded-sm">
            {genres.map((genre) => (
              <span key={genre}>{genre}</span>
            ))}
          </div>
        </div>
      </div>
    </section >
  )
}
