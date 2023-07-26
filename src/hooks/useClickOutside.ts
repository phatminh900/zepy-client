import { useRef, useEffect } from "react";

const useClickOutside = (close: () => void, isCapturing = false) => {
  const ref = useRef<any | null>(null);
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      {
        const isHidden = ref?.current?.classList.contains("opacity-0");
        if (
          ref?.current &&
          !isHidden &&
          !ref.current.contains(e.target as HTMLElement)
        ) {
          close();
        }
      }
    }
    document.addEventListener("click", handleClickOutside, isCapturing);
    return () =>
      document.removeEventListener("click", handleClickOutside, isCapturing);
  }, [isCapturing, close]);
  return { ref };
};
export default useClickOutside;
