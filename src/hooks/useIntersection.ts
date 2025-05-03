import { useCallback, useEffect, useState } from "react";

const useIntersection = ({
  ref,
  selector,
  rootMargin,
  options = { root: null, rootMargin: rootMargin ?? "0px", threshold: 1.0 }
}: {
  ref?: React.RefObject<HTMLElement>;
  selector?: string;
  rootMargin?: string;
  options?: IntersectionObserverInit;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const callbackFunc = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  }, []);

  useEffect(() => {
    const refNode = ref?.current || document.querySelector(selector as string);
    const observer = new IntersectionObserver(callbackFunc, options);

    if (refNode) {
      observer.observe(refNode);
    }

    return () => {
      if (refNode) {
        observer.unobserve(refNode);
      }
    };
  }, [callbackFunc, options, ref, selector]);

  return { isVisible };
};

export default useIntersection;
