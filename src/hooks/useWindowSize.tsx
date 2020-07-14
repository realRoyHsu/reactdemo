import { useEffect, useState } from "react";

export interface Size {
  scrollWidth: number;
  scrollHeight: number;
  offsetWidth: number;
  offsetHeight: number;
}

export default function useWindowSize(): Size {
  const getWindowSize = (): Size => {
    const { scrollWidth, scrollHeight, offsetWidth, offsetHeight } =
      document.body || document.documentElement;
    return {
      scrollWidth,
      scrollHeight,
      offsetWidth,
      offsetHeight,
    };
  };
  const [size, setSize] = useState(getWindowSize());

  useEffect(() => {
    const onResize = (): void => {
      setSize(getWindowSize());
    };
    onResize();

    window.addEventListener("resize", onResize);
    return (): void => {
      window.removeEventListener("resize", onResize);
    };
  }, []);
  console.log(size, "1");
  return size;
}
