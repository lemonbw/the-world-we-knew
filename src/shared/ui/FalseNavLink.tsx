'use client'
import { useState } from "react";
import Image from "next/image";

type FalseNavLinkProps = {
  src: string,
  alt: string,
  title: string,
  message: string,
  buttonClassName?: string,
  spanClassName?: string,
  imageClassName?: string,
};

export function FalseNavLink({ src, alt, title, message, buttonClassName, spanClassName, imageClassName }: FalseNavLinkProps) {

  const [isPressed, setIsPressed] = useState(false);

  const toggleState = () => {
    setIsPressed(!isPressed);
    //  setTimeout(() => alert(message), 100)
  }

  return (
    <div className="relative inline-block">
      <button onClick={() => toggleState()}
        className={`${isPressed ? "invisible" : ""} inset-0 ${buttonClassName} group relative`}
      >
        {title}
        <span
          className={`hidden lg:inline absolute left-0 bottom-0 origin-left h-[2px] w-0 group-hover:w-[102%] bg-black dark:bg-white duration-300 ${spanClassName}`}
        ></span>
      </button>
      <Image src={src} alt={alt} fill className={`${!isPressed ? "opacity-0 pointer-events-none" : ""} absolute object-contain inset-0 translate-y-[2.5px] ${imageClassName}`} onClick={toggleState} />
    </div>
  )
}

