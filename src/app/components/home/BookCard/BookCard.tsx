import Image from "next/image"
import Rating from "./Rating"

export default function BookCard() {

  return (
    <article className="flex justify-center mt-8">
      <div className="flex flex-col justify-center">
        <div className="relative w-64 h-80 border-2 border-white">
          <Image src="/MK.jpg" alt="book cover" layout="fill" className="object-cover" />
        </div>
        <Rating></Rating>
      </div>
    </article>
  )
}
