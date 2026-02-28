export default function Footer() {
  return (
    <footer className="w-full flex items-start justify-center h-21 *:mt-2">
      <p className="mr-4">© {new Date().getFullYear()} The World We Knew </p>
      <p className="font-bold mr-2">Social:</p>
      <ul className="flex flex-col flex-end text-left">
        <li><a href="mailto:leonblackwhite@proton.me">Mail</a></li>
        <li><a href="https://vk.com/theworldweknew">VK сообщество</a></li>
        <li><a href="https://www.youtube.com/@LeonBlackWhiteMusic">Youtube</a></li>
      </ul>
    </footer>)
}
