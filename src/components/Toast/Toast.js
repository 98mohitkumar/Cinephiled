import { AnimatePresence, motion } from "motion/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { ToastWrapper } from "./ToastStyles";

export const useToast = () => {
  const [toast, setToast] = useState({ message: "", isVisible: false });
  const timeoutRef = useRef(null);

  const showToast = ({ duration = 2000, message }) => {
    setToast({ message, isVisible: true });

    timeoutRef.current = setTimeout(() => {
      setToast({ message: "", isVisible: false });
    }, duration);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return {
    toastMessage: toast.message,
    isToastVisible: toast.isVisible,
    showToast
  };
};

const Toast = ({ children, isToastVisible }) => {
  if (typeof window === "undefined") return null;

  return (
    <Fragment>
      {createPortal(
        <AnimatePresence mode='wait'>
          {isToastVisible && (
            <ToastWrapper
              as={motion.div}
              initial={{ translateY: "100px" }}
              animate={{
                translateY: "-50px",
                transition: {
                  type: "tween",
                  duration: 0.6,
                  ease: [0.77, 0, 0.175, 1]
                }
              }}
              exit={{
                translateY: "100px",
                transition: {
                  type: "tween",
                  duration: 0.6,
                  ease: [0.77, 0, 0.175, 1]
                }
              }}>
              {children}
            </ToastWrapper>
          )}
        </AnimatePresence>,
        document.querySelector(".main-wrapper") || document.body
      )}
    </Fragment>
  );
};

export default Toast;
