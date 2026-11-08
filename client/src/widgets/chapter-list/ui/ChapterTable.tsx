import { getChapterTableLinkClasses } from '../lib/getChapterTableLinkClasses';
import { ChapterTableRow } from './ChapterTableRow';

type ChapterTableProps = {
  chapters: any[];
  emptyRowsCount: number;
  listPhase: number;
  direction: 'toRight' | 'toLeft' | 'toDown' | 'toUp';
};

export const ChapterTable = ({
  chapters,
  emptyRowsCount,
  listPhase,
  direction,
}: ChapterTableProps) => {
  const linkClasses = getChapterTableLinkClasses({
    listPhase,
    direction,
  });

  return (
    <table className="w-full table-fixed border-collapse bg-transparent text-[1.1rem] xl:text-[1.15rem]">
      <thead className="hidden border-b-2 lg:table-header-group">
        <tr className="bg-transparent text-[1.2rem] text-gray-800 xl:text-[1.25rem] dark:text-gray-200">
          <th className="py-2 text-left lg:w-[6rem] lg:px-4 xl:w-[7rem] xl:px-5 xl:py-3">
            Том
          </th>
          <th className="py-2 text-left lg:w-[7rem] lg:px-4 xl:w-[8rem] xl:px-5 xl:py-3">
            Глава
          </th>
          <th className="py-2 text-left lg:w-[16rem] lg:px-4 xl:w-[20rem] xl:px-5 xl:py-3">
            Название
          </th>
          <th className="py-2 text-left lg:w-[8rem] lg:px-4 xl:w-[9rem] xl:px-5 xl:py-3">
            Символы
          </th>
          <th className="py-2 text-left lg:w-[8rem] lg:px-4 xl:w-[9rem] xl:px-5 xl:py-3">
            Дата
          </th>
        </tr>
      </thead>

      <tbody>
        {chapters.map((c) => (
          <ChapterTableRow key={c.href} chapter={c} linkClasses={linkClasses} />
        ))}

        {Array.from({ length: emptyRowsCount }, (_, i) => (
          <tr key={`empty-${i}`} className="border-b-2 bg-transparent">
            <td colSpan={5} className="h-12 lg:h-[43.4px] xl:h-[51px]" />
          </tr>
        ))}
      </tbody>
    </table>
  );
};
