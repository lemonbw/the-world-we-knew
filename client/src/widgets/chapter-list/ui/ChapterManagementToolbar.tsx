'use client';
import { useState, useEffect } from 'react';
import {
  CreateChapterButton,
  DeleteSelectedChaptersButton,
  ToggleEditChaptersButton,
} from '@/src/features/chapter-management/';
import { getSuperuserStatus } from '@/src/entities/chapter/api/chapters';

export const ChapterManagementToolbar = () => {
  const [isSuperuser, setIsSuperuser] = useState(false);

  useEffect(() => {
    getSuperuserStatus()
      .then(({ isSuperuser }) => {
        setIsSuperuser(isSuperuser);
      })
      .catch(() => {
        setIsSuperuser(false);
      });
  }, []);

  if (!isSuperuser) {
    return null;
  }

  return (
    <div className="mx-auto mt-4 flex h-9 w-[min(94vw,22rem)] flex-row items-center justify-center rounded border-2 *:relative *:w-1/3 *:transition-colors *:duration-300 *:ease-in-out *:after:absolute *:after:top-0 *:after:right-0 *:after:h-full *:after:w-px *:after:bg-current *:last:after:hidden *:hover:bg-white *:hover:text-black lg:mt-3 lg:h-8 lg:w-80 xl:mt-3.5 xl:h-9 xl:w-88">
      <CreateChapterButton />
      <DeleteSelectedChaptersButton />
      <ToggleEditChaptersButton />
    </div>
  );
};
