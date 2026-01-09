import Link from "next/link";

export default function ChapterList() {
  const chapters = [
    {
      tom: "1",
      glava: "1",
      title: "Начало конца",
      symbols: "5К",
      date: "2026.01.09",
      href: "/chapter/1",
    },
    {
      tom: "1",
      glava: "2",
      title: "Обыкновенные деньки",
      symbols: "5К",
      date: "2026.01.09",
      href: "/chapter/2",
    },
  ];

  return (
    <section className="w-[90%] mx-auto mt-4">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 dark:bg-black text-gray-800 dark:text-gray-200">
            <th className="px-4 py-2 text-left">Том</th>
            <th className="px-4 py-2 text-left">Глава</th>
            <th className="px-4 py-2 text-left">Название</th>
            <th className="px-4 py-2 text-left">Символы</th>
            <th className="px-4 py-2 text-left">Дата</th>
          </tr>
        </thead>
        <tbody>
          {chapters.map((c) => (
            <tr
              key={c.href}
              className="border-b bg-black hover:bg-gray-950 cursor-pointer"
            >
              <td className="px-4 py-2">
                <Link href={c.href} className="block w-full h-full">{c.tom}</Link>
              </td>
              <td className="px-4 py-2">
                <Link href={c.href} className="block w-full h-full">{c.glava}</Link>
              </td>
              <td className="px-4 py-2">
                <Link href={c.href} className="block w-full h-full">{c.title}</Link>
              </td>
              <td className="px-4 py-2">
                <Link href={c.href} className="block w-full h-full">{c.symbols}</Link>
              </td>
              <td className="px-4 py-2">
                <Link href={c.href} className="block w-full h-full">{c.date}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

