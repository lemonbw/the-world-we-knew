type HamburgerProps = {
  hiddenHeader: boolean;
  hiddenNavigation: boolean;
  setHiddenNavigation: (value: boolean) => void;
}

export function Hamburger({ hiddenHeader, hiddenNavigation, setHiddenNavigation }: HamburgerProps) {
  const stickClassName: string = `relative block w-8 h-1.5 bg-white duration-300`;

  return (
    <button className="z-10 flex h-7 w-10 flex-col justify-between lg:hidden" onClick={() => setHiddenNavigation(!hiddenNavigation)}>
      <span className={`${stickClassName} ${!hiddenHeader && !hiddenNavigation ? "rotate-45 translate-y-[11px]" : ""}`}></span>
      <span className={`${stickClassName} ${!hiddenHeader && !hiddenNavigation ? "rotate-135" : ""}`}></span>
      <span className={`${stickClassName} ${!hiddenHeader && !hiddenNavigation ? "rotate-45 -translate-y-[11px]" : ""}`}></span>
    </button>
  )
}
