import { motion } from 'framer-motion';
import { useState, useCallback } from 'react';
import { ToastWrapper } from './ToastStyles';

export const useToast = () => {
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const removeToast = useCallback((duration = 2000) => {
    setTimeout(() => {
      setIsToastVisible(false);
    }, duration);
  }, []);

  const showToast = useCallback(() => {
    setIsToastVisible(true);
  }, []);

  return {
    isToastVisible,
    showToast,
    removeToast,
    toastMessage,
    setToastMessage
  };
};

const Toast = ({ children }) => {
  return (
    <ToastWrapper
      as={motion.div}
      initial={{ translateY: '100px' }}
      animate={{
        translateY: '-50px',
        transition: {
          type: 'tween',
          duration: 0.6,
          ease: [0.77, 0, 0.175, 1]
        }
      }}
      exit={{
        translateY: '100px',
        transition: {
          type: 'tween',
          duration: 0.6,
          ease: [0.77, 0, 0.175, 1]
        }
      }}
    >
      {children}
    </ToastWrapper>
  );
};

export default Toast;
