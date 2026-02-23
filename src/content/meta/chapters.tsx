export const chapters: {
  volume: number;
  chapter: number;
  index: number;
  title: string;
  symbols: string;
  date: Date;
  slug: string;
  href: string;
  searchIndex?: string;
}[] = [
    {
      volume: 1,
      chapter: 1,
      index: 0,
      title: "Начало конца",
      symbols: "5К",
      date: new Date("2026-01-09"),
      slug: "01-the-beginning-of-the-end",
      href: "",
    },
    {
      volume: 1,
      chapter: 2,
      index: 1,
      title: "Обыкновенные деньки",
      symbols: "5К",
      date: new Date("2026-01-10"),
      slug: "02-the-ordinary-days",
      href: "",
    },
    ...Array.from({ length: 500 }, (_, i) => ({
      volume: 1,
      chapter: i + 3,
      index: i + 2,
      title: "PlaceHolder",
      symbols: "5К",
      date: new Date("2026-01-09"),
      slug: `/chapter/${i + 3}`,
      href: "",
    })),
  ];

chapters.forEach(ch => {
  ch.href = `/reading/${ch.slug}`;
  ch.searchIndex = `${ch.chapter}, ${ch.title}, ${ch.date.toLocaleDateString("ru-RU")}`.toLowerCase();
});

