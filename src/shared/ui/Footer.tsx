export default function Footer() {
  return (
    <footer className="w-full flex items-center justify-center h-21 *:mt-2">
      <p className="mr-4">© {new Date().getFullYear()} The World We Knew </p>
      <div className="flexflex-col">
        <p className="font-bold -mb-1 text-center">Social</p>
        <ul className="flex gap-2 text-center">
          <li><a href="mailto:leonblackwhite@proton.me">Mail</a></li>
          <li><a href="https://vk.com/theworldweknew">VK сообщество</a></li>
          <li><a href="https://www.youtube.com/@LeonBlackWhiteMusic">Youtube</a></li>
        </ul>
      </div>
    </footer>)
}
