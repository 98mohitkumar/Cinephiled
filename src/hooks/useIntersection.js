import { useCallback, useEffect, useState } from 'react';

const useIntersection = (
  ref,
  rootMargin,
  options = { root: null, rootMargin: rootMargin ?? '0px', threshold: 1.0 }
) => {
  const [isVisible, setIsVisible] = useState(false);

  const callbackFunc = useCallback((entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunc, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [callbackFunc, options, ref]);

  return { isVisible };
};

export default useIntersection;
