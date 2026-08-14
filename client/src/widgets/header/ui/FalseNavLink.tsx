'use client';
import { useState } from 'react';
import Image from 'next/image';

type FalseNavLinkProps = {
  src: string;
  alt: string;
  title: string;
  message: string;
  buttonClassName?: string;
  spanClassName?: string;
  imageClassName?: string;
};

export const FalseNavLink = ({
  src,
  alt,
  title,
  message,
  buttonClassName,
  spanClassName,
  imageClassName,
}: FalseNavLinkProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const toggleState = () => {
    setIsPressed(!isPressed);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => toggleState()}
        className={`${isPressed ? 'invisible' : ''} inset-0 ${buttonClassName} group relative`}
      >
        {title}
        <span
          className={`absolute bottom-0 left-0 hidden h-[2px] w-0 origin-left bg-black duration-300 group-hover:w-[102%] lg:inline dark:bg-white ${spanClassName}`}
        ></span>
      </button>
      <Image
        src={src}
        alt={alt}
        fill
        className={`${!isPressed ? 'pointer-events-none opacity-0' : ''} absolute inset-0 translate-y-[2.5px] object-contain ${imageClassName}`}
        onClick={toggleState}
      />
    </div>
  );
};
