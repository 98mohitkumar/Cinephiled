import { motion } from "motion/react";
import { Fragment } from "react";
import { IoCopy } from "react-icons/io5";

import Modal from "components/Modal/Modal";
import { Span } from "components/MovieInfo/MovieDetailsStyles";
import Toast, { useToast } from "components/Toast/Toast";
import { Button } from "styles/GlobalComponents";
import { copyToClipboard } from "utils/helper";

const ShareModal = ({ title, url, isModalOpen, closeModal }) => {
  const { isToastVisible, showToast, toastMessage } = useToast();

  const copyButtonHandler = () => {
    copyToClipboard({ nodeId: "list-URL", text: url })
      .then(() => {
        closeModal();
        showToast({ message: "Copied to clipboard!" });
      })
      .catch(() => {
        closeModal();
        showToast({ message: "Copying to clipboard is not supported." });
      });
  };

  return (
    <Fragment>
      <Toast isToastVisible={isToastVisible}>
        <Span className='toast-message'>{toastMessage}</Span>
      </Toast>

      <Modal closeModal={closeModal} isOpen={isModalOpen} align='items-center' width='max-w-lg'>
        <div>
          <h4 className='text-xl mb-4 font-semibold'>Share {title}</h4>

          <div className='mt-6'>
            <div>
              <label htmlFor='list-URL' className='text-base mb-2 block font-medium text-neutral-200'>
                URL
              </label>
              <div className='gap-3 flex'>
                <input
                  type='text'
                  name='URL'
                  id='list-URL'
                  defaultValue={typeof window !== "undefined" ? window.location.href : ""}
                  readOnly
                  className='text-base p-2.5 block w-full rounded-lg border border-neutral-500 bg-neutral-700 text-white placeholder-neutral-400 focus:border'
                />

                <Button as={motion.button} whileTap={{ scale: 0.95 }} className='mediaCTA w-[50px] shrink-0' onClick={copyButtonHandler}>
                  <IoCopy size={20} />
                </Button>
              </div>
            </div>
          </div>

          <Button as={motion.button} whileTap={{ scale: 0.95 }} className='secondary mt-3 w-full' onClick={closeModal}>
            Close
          </Button>
        </div>
      </Modal>
    </Fragment>
  );
};

export default ShareModal;
