import { motion } from "framer-motion";
import { useState } from "react";
import { ToastWrapper } from "./ToastStyles";

export const useToast = () => {
  const [toast, setToast] = useState({ message: "", isVisible: false });

  const showToast = ({ duration = 2000, message }) => {
    setToast({ message, isVisible: true });

    setTimeout(() => {
      setToast({ message: "", isVisible: false });
    }, duration);
  };

  return {
    toastMessage: toast.message,
    isToastVisible: toast.isVisible,
    showToast
  };
};

const Toast = ({ children }) => {
  return (
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
  );
};

export default Toast;
