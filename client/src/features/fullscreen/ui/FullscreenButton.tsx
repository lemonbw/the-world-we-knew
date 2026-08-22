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
      className="material-icons mt-2 ml-7 w-10 text-[2.5rem]! transition-transform duration-400 hover:scale-110! xl:text-[3rem]!"
      onClick={onToggle}
    >
      {fullscreen ? 'fullscreen_exit' : 'fullscreen'}
    </button>
  );
};
