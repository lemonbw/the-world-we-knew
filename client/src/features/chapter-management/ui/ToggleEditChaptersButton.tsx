import { MdEdit } from 'react-icons/md';

export const ToggleEditChaptersButton = () => {
  return (
    <button className="flex h-full w-full flex-row items-center justify-center gap-1">
      <p className="h-full text-xl! font-bold">Edit</p>
      <MdEdit className="h-full w-[20%]" />
    </button>
  );
};
