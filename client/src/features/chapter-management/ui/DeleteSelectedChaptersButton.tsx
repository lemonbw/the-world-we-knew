import { MdDeleteForever } from 'react-icons/md';

export const DeleteSelectedChaptersButton = () => {
  return (
    <button className="flex h-[95%] w-full flex-row items-center justify-center gap-1">
      <p className="h-full text-xl! font-bold">Delete</p>
      <MdDeleteForever className="h-[95%] w-[25%]" />
    </button>
  );
};
