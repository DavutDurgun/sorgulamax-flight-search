"use client";

import { useEffect } from "react";

/**
 * useOutsideClick
 * elementRef: React ref (container)
 * handler: callback when clicked outside
 */
export default function useOutsideClick(
  elementRef: React.RefObject<HTMLElement | null>,
  handler: () => void
) {
  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      const el = elementRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) {
        handler();
      }
    }

    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [elementRef, handler]);
}
