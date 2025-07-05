import { RefObject } from "react";

export const useDropDownPosition = (ref: RefObject<HTMLLIElement | null>) => {
  const getDropDownPosition = () => {
    if (!ref.current) return { top: 0, left: 0 };

    const rect = ref.current.getBoundingClientRect();
    const dropDownWidth = 240; //We will use (w-60 = 15rem = 240px)

    //Calculate initial Position
    let left = rect.left + window.scrollX;
    const top = rect.bottom + window.scrollY;

    // Check if dropdown is overflowing on left of viewport
    if (left + dropDownWidth > window.innerWidth)
      // Align to right instead
      left = rect.right + window.screenX - dropDownWidth;
    // if still overflowing
    if (left < 0) left = window.innerWidth - dropDownWidth - 16;

    if (left < 0) left = 16;

    return { top, left };
  };

  return { getDropDownPosition };
};
