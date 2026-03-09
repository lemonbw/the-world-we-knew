"use client"
import Main from "@/src/shared/ui/Main"
import ChapterSelector from "@/src/features/reading/chapter-selector/ChapterSelector"
import { FontSelector, FontSizeSelector, AlignSelector } from "@/src/components/text"
import useFullscreen from "@/src/shared/hooks/useFullscreen"
import ReadingContent from "@/src/components/ReadingContent"
import { useReadingState } from "@/src/shared/hooks/reading/useReadingState"

export default function ReadingPage({ content }: { content: string }) {

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

  const { fullscreen, toggleFullscreen } = useFullscreen({
    readingSection,
  })

  const icon = fullscreen ? "fullscreen_exit" : "fullscreen"

  return (
    <Main>
      <section
        ref={readingSection}
        id="reading-section"
        className="flex flex-col w-[80vw] mx-auto mt-4 h-screen"
      >

        <div className="flex flex-none items-center gap-1 w-[70vw] h-10 mb-2 mt-4 ml-0.5">

          <ChapterSelector />

          <FontSelector
            currentFont={currentFont}
            setCurrentFont={setCurrentFont}
            query={fontQuery}
            setQuery={setFontQuery}
          />

          <FontSizeSelector
            currentSize={currentSize}
            setCurrentSize={setCurrentSize}
          />

          <AlignSelector
            currentAlign={currentAlign}
            setCurrentAlign={setCurrentAlign}
          />

          <button
            className="material-icons text-[2.2rem]! hover:text-[2.4rem]! transition-all duration-300 w-10 ml-1"
            onClick={toggleFullscreen}
          >
            {icon}
          </button>

        </div>

        <div className="flex-1 border rounded-2xl overflow-hidden">
          <div
            className="p-1 h-full overflow-y-auto select-text"
            style={{
              fontSize: `${currentSize}px`,
              fontFamily: currentFont,
              textAlign: currentAlign,
            }}
          >
            <ReadingContent className="p-1 h-full overflow-y-auto" content={content} />
          </div>

        </div>

      </section>
    </Main>
  )
}
