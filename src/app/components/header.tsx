import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-[#010407] border-b border-white">
      <div className="h-[5vh] mt-4 flex items-center justify-center">
        <h1 className="text-white lg:text-3xl font-bold">The World We Knew</h1>
      </div>
      <div className="flex justify-between mt-3 w-full mb-4">
        <div className="flex gap-24 ml-45 lg:text-[1.5rem]">
          <Link href="/" className="px-2 py-[1px] text-white rounded border">Главная</Link>
          <Link href="/archive" className="px-2 py-[1px] text-white rounded border">Архив</Link>
        </div>

        <div className="flex gap-24 mr-45 lg:text-[1.5rem]">
          <Link href="/map" className="px-2 py-[1px] text-white rounded border">Карта</Link>
          <Link href="/news" className="px-2 py-[1px] text-white rounded border">Новости</Link>
        </div>
      </div>
    </header>

  )
}
