type AlignSelectorProps = {
  currentAlign: 'left' | 'center' | 'right' | 'justify';
  setCurrentAlign: (align: 'left' | 'center' | 'right' | 'justify') => void;
};

export function AlignSelector({
  currentAlign,
  setCurrentAlign,
}: AlignSelectorProps) {
  return (
    <div className="mt-2 flex w-30 gap-1 *:w-10 *:rounded-sm *:border-1 *:border-black *:text-[2rem]! *:duration-300 *:hover:border-white/10">
      <button
        className={`material-icons ${currentAlign === 'left' ? 'bg-white/10' : ''}`}
        onClick={() => setCurrentAlign('left')}
      >
        format_align_left
      </button>
      <button
        className={`material-icons ${currentAlign === 'center' ? 'bg-white/10' : ''}`}
        onClick={() => setCurrentAlign('center')}
      >
        format_align_center
      </button>
      <button
        className={`material-icons ${currentAlign === 'right' ? 'bg-white/10' : ''}`}
        onClick={() => setCurrentAlign('right')}
      >
        format_align_right
      </button>
      <button
        className={`material-icons ${currentAlign === 'justify' ? 'bg-white/10' : ''}`}
        onClick={() => setCurrentAlign('justify')}
      >
        format_align_justify
      </button>
    </div>
  );
}
