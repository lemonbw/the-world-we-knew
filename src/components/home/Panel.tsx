type PanelProps = {
  section: string;
  setSection: (value: "Main" | "Chapters") => void;
}

export default function Panel({ section, setSection }: PanelProps) {

  return (
    <div className="flex relative border rounded-xl w-60 h-10 mt-7 overflow-hidden *:duration-500">
      <button className={`flex-1 text-2xl ${section === "Main" ? "bg-white text-black" : "bg-black text-white"}`} onClick={() => setSection("Main")}>Главная</button>
      <button className={`flex-1 text-2xl ${section === "Chapters" ? "bg-white text-black" : "bg-black text-white"}`} onClick={() => setSection("Chapters")}>Главы</button>

      <div className="absolute left-1/2 h-full w-[1.5px] bg-white"></div>
    </div >
  )
}
