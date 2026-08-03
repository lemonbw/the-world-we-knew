type FullscreenButtonProps = {
  fullscreen: boolean;
  onToggle: () => void;
};

export function FullscreenButton({
  fullscreen,
  onToggle,
}: FullscreenButtonProps) {
  return (
    <button
      className="material-icons mt-2 ml-7 w-10 text-[2.5rem]! transition-all duration-300 hover:text-[2.7rem]!"
      onClick={onToggle}
    >
      {fullscreen ? 'fullscreen_exit' : 'fullscreen'}
    </button>
  );
}
