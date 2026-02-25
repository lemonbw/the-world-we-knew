type AlignSelectorProps = {
  currentAlign: "left" | "center" | "right" | "justify";
  setCurrentAlign: (align: "left" | "center" | "right" | "justify") => void;
}

export default function AlignSelector({ currentAlign, setCurrentAlign }: AlignSelectorProps) {
  return (
    <div className="flex gap-1 *:text-[1.7rem]! mt-1 *:hover:border-1 *:border-white/10 *:rounded-sm *:duration-300 *:w-8 w-50">
      <button className={`material-icons ${currentAlign === "left" ? "bg-white/10" : ""}`} onClick={() => setCurrentAlign("left")}>format_align_left</button>
      <button className={`material-icons ${currentAlign === "center" ? "bg-white/10" : ""}`} onClick={() => setCurrentAlign("center")}>format_align_center</button>
      <button className={`material-icons ${currentAlign === "right" ? "bg-white/10" : ""}`} onClick={() => setCurrentAlign("right")}>format_align_right</button>
      <button className={`material-icons ${currentAlign === "justify" ? "bg-white/10" : ""}`} onClick={() => setCurrentAlign("justify")}>format_align_justify</button>
    </div>
  )
}
