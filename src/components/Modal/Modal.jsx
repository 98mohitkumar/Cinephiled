import { AnimatePresence, motion } from "motion/react";
import { Fragment, useState } from "react";
import { createPortal } from "react-dom";

import { opacityMotionTransition } from "data/global";
import { cn } from "utils/helper";

export const useModal = () => {
  const [isModalVisible, setShowModal] = useState(false);

  const openModal = () => {
    document.body.style.overflow = "hidden";
    setShowModal(true);
  };

  const closeModal = () => {
    document.body.style.overflow = "auto";
    setShowModal(false);
  };

  return { isModalVisible, openModal, closeModal };
};

const Modal = ({ children, isOpen, closeModal, closeOnClickedOutside = true, className }) => {
  const closeOnClickedOutsideHandler = (e) => {
    if (e.target.classList.contains("modal-outer") && closeOnClickedOutside) {
      closeModal();
    }
  };

  if (typeof window === "undefined") {
    return null;
  }

  return (
    <Fragment>
      {createPortal(
        <AnimatePresence mode='wait'>
          {isOpen && (
            <motion.div
              {...opacityMotionTransition}
              key='modal'
              className={cn(
                "fixed inset-0 z-modal",
                "modal-outer px-16 py-48",
                "flex items-center justify-center",
                "overflow-y-auto bg-black bg-opacity-75 backdrop-blur-sm backdrop-saturate-50"
              )}
              onClick={closeOnClickedOutsideHandler}>
              <motion.div
                variants={{
                  hidden: {
                    scale: 0.9
                  },
                  visible: {
                    scale: 1
                  }
                }}
                className={cn("my-auto w-full max-w-xl p-1624", "rounded-xl border border-neutral-700 bg-black", className)}>
                {children}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.querySelector(".main-wrapper") || document.body
      )}
    </Fragment>
  );
};

export default Modal;
