import { motion } from "framer-motion";
import { useState } from "react";
import { ToastWrapper } from "./ToastStyles";

export const useToast = () => {
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = ({ duration } = { duration: 2000 }) => {
    setIsToastVisible(true);

    setTimeout(() => {
      setIsToastVisible(false);
    }, duration);
  };

  return {
    isToastVisible,
    showToast,
    toastMessage,
    setToastMessage
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
