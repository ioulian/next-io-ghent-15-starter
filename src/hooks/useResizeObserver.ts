import { useEffect, useRef, useState } from "react";

// From: https://mantine.dev/hooks/use-resize-observer/

type ObserverRect = Omit<DOMRectReadOnly, "toJSON">;

const defaultState: ObserverRect = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};

/**
 * This will trigger a new "contentRect" every time the resize observer is triggered.
 * This is a better way to detect resize of an element,
 * as otherwise you'll need to add a lot of event listeners on window.
 */
const useResizeObserver = <T extends HTMLElement = HTMLElement>() => {
  const frameID = useRef(0);
  const ref = useRef<T>(null);

  const [rect, setRect] = useState<ObserverRect>(defaultState);

  const [observer] = useState(() =>
    typeof window !== "undefined" && typeof window.ResizeObserver !== "undefined"
      ? new window.ResizeObserver((entries) => {
          const entry = entries[0];

          if (entry) {
            cancelAnimationFrame(frameID.current);

            frameID.current = requestAnimationFrame(() => {
              if (ref.current) {
                setRect(entry.contentRect);
              }
            });
          }
        })
      : null,
  );

  // False positive

  useEffect(() => {
    if (ref.current) {
      observer?.observe(ref.current);
    }

    return () => {
      observer?.disconnect();

      if (frameID.current) {
        cancelAnimationFrame(frameID.current);
      }
    };
  }, [observer]);

  return [ref, rect] as const;
};

export default useResizeObserver;
