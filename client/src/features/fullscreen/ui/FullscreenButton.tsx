type FullscreenButtonProps = {
  fullscreen: boolean;
  onToggle: () => void;
};

export const FullscreenButton = ({
  fullscreen,
  onToggle,
}: FullscreenButtonProps) => {
  return (
    <button
      className="material-icons mt-2 ml-7 w-10 rounded-sm bg-white/95 text-[2.5rem]! transition-transform duration-400 hover:scale-110! dark:bg-black/95 xl:text-[3rem]!"
      onClick={onToggle}
    >
      {fullscreen ? 'fullscreen_exit' : 'fullscreen'}
    </button>
  );
};
