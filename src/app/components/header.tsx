export default function Header() {
  return (
    <header className="w-full bg-[#010407] border-b border-white">
      <div className="h-[5vh] mt-6 flex items-center justify-center">
        <h1 className="text-white lg:text-3xl font-bold">The World We Knew</h1>
      </div>
      <div className="flex justify-between mt-4 w-full mb-4">
        <div className="flex gap-24 ml-45 lg:text-[1.5rem]">
          <button className="px-2 py-[1px] text-white rounded border">Главная</button>
          <button className="px-2 py-[1px] text-white rounded border">Архив</button>
        </div>

        <div className="flex gap-24 mr-45 lg:text-[1.5rem]">
          <button className="px-2 py-[1px] text-white rounded border">Карта</button>
          <button className="px-2 py-[1px] text-white rounded border">Новости</button>
        </div>
      </div>
    </header>

  )
}
