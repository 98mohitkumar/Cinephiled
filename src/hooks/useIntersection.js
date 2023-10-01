import { useCallback, useEffect, useState } from "react";

const useIntersection = (
  ref,
  rootMargin,
  options = { root: null, rootMargin: rootMargin ?? "0px", threshold: 1.0 }
) => {
  const [isVisible, setIsVisible] = useState(false);

  const callbackFunc = useCallback((entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  }, []);

  useEffect(() => {
    const refNode = ref.current;
    const observer = new IntersectionObserver(callbackFunc, options);

    if (refNode) {
      observer.observe(refNode);
    }

    return () => {
      if (refNode) {
        observer.unobserve(refNode);
      }
    };
  }, [callbackFunc, options, ref]);

  return { isVisible };
};

export default useIntersection;
