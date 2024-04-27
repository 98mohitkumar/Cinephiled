import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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
  return (
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
    </AnimatePresence>
  );
};

export default Toast;
