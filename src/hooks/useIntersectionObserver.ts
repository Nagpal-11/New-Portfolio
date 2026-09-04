import { useEffect, useRef, useState, type RefObject } from 'react';

export interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  triggerOnce?: boolean;
  delay?: number;
  skip?: boolean;
}

/**
 * Custom hook that tracks when an element enters the viewport using the IntersectionObserver API.
 * 
 * @param options - Configuration options for the IntersectionObserver
 * @returns [ref, isInView, entry]
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
): [RefObject<T | null>, boolean, IntersectionObserverEntry | null] {
  const {
    threshold = 0.12,
    root = null,
    rootMargin = '0px 0px -60px 0px',
    triggerOnce = true,
    delay = 0,
    skip = false,
  } = options;

  const elementRef = useRef<T | null>(null);
  const [isInView, setIsInView] = useState<boolean>(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    if (skip || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const node = elementRef.current;
    if (!node) return;

    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const observer = new IntersectionObserver(
      ([observerEntry]) => {
        setEntry(observerEntry);

        if (observerEntry.isIntersecting) {
          if (delay > 0) {
            timeoutId = setTimeout(() => {
              setIsInView(true);
            }, delay);
          } else {
            setIsInView(true);
          }

          if (triggerOnce) {
            observer.unobserve(node);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    observer.observe(node);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, triggerOnce, delay, skip]);

  return [elementRef, isInView, entry];
}
