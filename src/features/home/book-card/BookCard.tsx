import Image from "next/image"
import bookCover from "@/src/shared/assets/images/book-card/book-cover.jpg"

export default function BookCard() {

  return (
    <article className="flex justify-center mt-20 lg:mt-8">
      <div className="flex flex-col justify-center items-center text-center">
        <div className="relative w-40 h-46 lg:w-64 lg:h-80 border-2 border-white">
          <Image src={bookCover} alt="book cover" fill className="object-cover" />
        </div>
      </div>
    </article>
  )
}
