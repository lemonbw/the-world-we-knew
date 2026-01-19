import { chapters } from "../../../content/chapters";
import { Chapter } from "./chapterTypes";

export default function ChapterSort(order: "asc" | "desc"): Chapter[] {
  return [...chapters].sort((a, b) =>
    order === "asc" ? a.index - b.index : b.index - a.index,
  );
}
