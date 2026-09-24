import { MdEdit } from 'react-icons/md';

export const ToggleEditChaptersButton = () => {
  return (
    <button className="flex h-[95%] w-full flex-row items-center justify-center gap-1">
      <p className="h-full text-xl! font-bold">Edit</p>
      <MdEdit className="h-[95%] w-[25%]" />
    </button>
  );
};
