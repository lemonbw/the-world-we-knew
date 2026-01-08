import Image from "next/image"

export default function BookCard() {
  return (
    <article className="flex justify-center mt-8">
      <div className="relative w-64 h-80 border-2 border-white">
        <Image src="/MK.jpg" alt="book cover" layout="fill" className="object-cover" />
      </div>
    </article>
  )
}
