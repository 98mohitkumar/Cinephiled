import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useState } from "react";
import { createPortal } from "react-dom";
import { framerTabVariants } from "src/utils/helper";

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
              className={`fixed inset-0 z-[1000] bg-black bg-opacity-75 backdrop-blur-[2px] backdrop-saturate-50 flex justify-center modal-outer overflow-y-auto py-[10vh] px-4 ${
                align || "items-start"
              }`}
              onClick={closeOnClickedOutside}>
              <div
                className={`rounded-xl overflow-hideen max-sm:p-4 p-6 bg-[#121212] border border-neutral-700 w-full ${
                  width || "max-w-xl"
                }`}>
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document?.body
      )}
    </Fragment>
  );
};

export default Modal;
