import Modal from "components/Modal/Modal";
import { Span } from "components/MovieInfo/MovieDetailsStyles";
import Toast, { useToast } from "components/Toast/Toast";
import { motion } from "framer-motion";
import { Fragment } from "react";
import { IoCopy } from "react-icons/io5";
import { copyToClipboard } from "src/utils/helper";
import { Button } from "styles/GlobalComponents";

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
              <label
                htmlFor='list-URL'
                className='block mb-2 text-base font-medium text-neutral-200'>
                URL
              </label>
              <div className='flex gap-3'>
                <input
                  type='text'
                  name='URL'
                  id='list-URL'
                  defaultValue={typeof window !== "undefined" ? window.location.href : ""}
                  readOnly
                  className='border text-base rounded-lg block w-full p-2.5 bg-neutral-700 border-neutral-500 placeholder-neutral-400 text-white focus:border'
                />

                <Button
                  as={motion.button}
                  whileTap={{ scale: 0.95 }}
                  className='mediaCTA w-[50px] shrink-0'
                  onClick={copyButtonHandler}>
                  <IoCopy size={20} />
                </Button>
              </div>
            </div>
          </div>

          <Button
            as={motion.button}
            whileTap={{ scale: 0.95 }}
            className='secondary w-full mt-3'
            onClick={closeModal}>
            Close
          </Button>
        </div>
      </Modal>
    </Fragment>
  );
};

export default ShareModal;
