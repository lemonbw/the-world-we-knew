import { chapters } from "@/src/content/meta/chapters";

export default function ChapterSort(order: "asc" | "desc") {
  return [...chapters].sort((a, b) =>
    order === "asc" ? a.index - b.index : b.index - a.index,
  );
}
