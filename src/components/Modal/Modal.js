import { AnimatePresence, motion } from "motion/react";
import { Fragment, useState } from "react";
import { createPortal } from "react-dom";

import { framerTabVariants } from "utils/helper";

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

const Modal = ({ children, isOpen, closeModal, width, align }) => {
  const closeOnClickedOutside = (e) => {
    if (e.target.classList.contains("modal-outer")) {
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
              variants={framerTabVariants}
              initial='hidden'
              animate='visible'
              exit='hidden'
              key='modal'
              className={`modal-outer fixed inset-0 z-[1000] flex justify-center overflow-y-auto bg-black bg-opacity-75 px-4 py-[10vh] backdrop-blur-[2px] backdrop-saturate-50 ${
                align || "items-start"
              }`}
              onClick={closeOnClickedOutside}>
              <div className={`overflow-hideen w-full rounded-xl border border-neutral-700 bg-[#121212] p-6 max-sm:p-4 ${width || "max-w-xl"}`}>
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.querySelector(".main-wrapper") || document.body
      )}
    </Fragment>
  );
};

export default Modal;
