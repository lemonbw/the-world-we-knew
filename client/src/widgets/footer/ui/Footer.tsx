export const Footer = () => {
  return (
    <footer className="flex h-21 w-full items-center justify-center text-xs *:mt-2 lg:text-lg">
      <p className="mr-4 flex w-15 flex-row flex-wrap lg:w-60">
        © {new Date().getFullYear()} The World We Knew{' '}
      </p>
      <div className="flex flex-col">
        <p className="text-center font-bold lg:-mb-1">Social</p>
        <ul className="flex gap-2 text-center">
          <li>
            <a href="mailto:leonblackwhite@proton.me">Mail</a>
          </li>
          <li>
            <a href="https://vk.com/theworldweknew">VK сообщество</a>
          </li>
          <li>
            <a href="https://www.youtube.com/@LeonBlackWhiteMusic">Youtube</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
