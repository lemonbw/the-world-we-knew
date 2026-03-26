import Image from 'next/image';
import bookCover from '@/src/shared/assets/images/book-card/book-cover.jpg';

export default function BookCard() {
  return (
    <article className="mt-20 flex justify-center lg:mt-8">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="relative h-46 w-40 border-2 border-white lg:h-80 lg:w-64">
          <Image
            src={bookCover}
            alt="book cover"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </article>
  );
}
