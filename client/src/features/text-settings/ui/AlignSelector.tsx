type AlignSelectorProps = {
  currentAlign: 'left' | 'center' | 'right' | 'justify';
  setCurrentAlign: (align: 'left' | 'center' | 'right' | 'justify') => void;
};

const ALIGNMENTS = [
  { align: 'left', icon: 'format_align_left' },
  { align: 'center', icon: 'format_align_center' },
  { align: 'right', icon: 'format_align_right' },
  { align: 'justify', icon: 'format_align_justify' },
] as const;

export const AlignSelector = ({
  currentAlign,
  setCurrentAlign,
}: AlignSelectorProps) => {
  return (
    <div className="mt-2 flex w-30 gap-1 *:w-10 *:rounded-sm *:border-1 *:border-white *:text-[2rem]! *:duration-300 *:hover:border-black/10 xl:w-37 xl:*:w-15 xl:*:text-[2.5rem]! *:dark:border-black *:dark:hover:border-white/10">
      {ALIGNMENTS.map(({ align, icon }) => (
        <button
          key={align}
          className={`material-icons bg-white/95 dark:bg-black/95 ${
            currentAlign === align
              ? 'opacity-100 shadow-[inset_0_0_0_1.5px_currentColor]'
              : 'opacity-50 hover:opacity-80'
          }`}
          onClick={() => setCurrentAlign(align)}
        >
          {icon}
        </button>
      ))}
    </div>
  );
};
