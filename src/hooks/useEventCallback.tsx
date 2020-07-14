/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef } from "react";

export default function useEventCallback(
  fn: (v?: any) => void,
  dependencies: any
): (v?: any) => void {
  const ref = useRef((v?: any): void => {
    throw new Error("Cannot call an event handler while rendering.");
  });

  useEffect(() => {
    ref.current = fn;
  }, [fn, ...dependencies]);

  return useCallback(
    (v?: any) => {
      const fn = ref.current;
      return fn(v);
    },
    [ref]
  );
}
