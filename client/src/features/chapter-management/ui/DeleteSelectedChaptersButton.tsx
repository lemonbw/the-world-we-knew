import { MdDeleteForever } from 'react-icons/md';

export const DeleteSelectedChaptersButton = () => {
  return (
    <button className="flex h-full w-full flex-row items-center justify-center gap-1">
      <p className="h-full text-xl! font-bold">Delete</p>
      <MdDeleteForever className="h-full w-[20%]" />
    </button>
  );
};
