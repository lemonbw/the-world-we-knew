import { IoCreate } from 'react-icons/io5';

export const CreateChapterButton = () => {
  return (
    <button className="flex h-full w-full flex-row items-center justify-center gap-1">
      <p className="h-full text-xl! font-bold">Create</p>
      <IoCreate className="h-full w-[20%]" />
    </button>
  );
};
