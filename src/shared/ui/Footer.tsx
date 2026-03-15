export default function Footer() {
  return (
    <footer className="w-full flex items-center justify-center h-21 text-xs lg:text-lg *:mt-2">
      <p className="flex flex-row flex-wrap w-15 lg:w-60 mr-4">© {new Date().getFullYear()} The World We Knew </p>
      <div className="flex flex-col">
        <p className="font-bold lg:-mb-1 text-center">Social</p>
        <ul className="flex gap-2 text-center">
          <li><a href="mailto:leonblackwhite@proton.me">Mail</a></li>
          <li><a href="https://vk.com/theworldweknew">VK сообщество</a></li>
          <li><a href="https://www.youtube.com/@LeonBlackWhiteMusic">Youtube</a></li>
        </ul>
      </div>
    </footer>)
}
