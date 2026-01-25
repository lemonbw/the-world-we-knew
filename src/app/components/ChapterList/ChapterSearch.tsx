import { chapters } from "@/src/content/chapters"

export default function ChapterSearch({
  query,
  setQuery
}: {
  query: string
  setQuery: (value: string) => void
}) {

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const result = chapters.filter(ch => ch.title.includes(query))
      console.log(result)
    }
  }

  return (
    <div className="flex justify-center">
      <input
        type="search"
        name="chapter-title"
        placeholder="Input title of chapter"
        autoComplete="on"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={handleKeyDown}
        className="text-center w-80 border-[0.1rem] rounded-[0.5rem] outline-none mt-2 h-8 focus:border-[0.2rem] focus:p-3"
      />
    </div>
  )
}
