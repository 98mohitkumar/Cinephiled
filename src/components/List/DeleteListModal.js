import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { FaTrash } from "react-icons/fa";
import { deleteList } from "apiEndpoints/user";
import Modal, { useModal } from "components/Modal/Modal";
import { Span } from "components/MovieInfo/MovieDetailsStyles";
import Toast, { useToast } from "components/Toast/Toast";
import { useListsContext } from "Store/ListsContext";
import { Button } from "styles/GlobalComponents";

const DeleteListModal = ({ list }) => {
  const { openModal, isModalVisible, closeModal } = useModal();
  const { isToastVisible, showToast, toastMessage } = useToast();
  const router = useRouter();
  const { updateList } = useListsContext();

  const deleteListHandler = async () => {
    const { success } = await deleteList({ id: list.id });

    if (success) {
      updateList((prev) => prev.filter((item) => item.id !== list.id));
      closeModal();
      router.push("/lists");
    } else {
      closeModal();
      showToast({ message: "Error deleting the list, please try again later." });
    }
  };

  return (
    <Fragment>
      <Button as={motion.button} whileTap={{ scale: 0.95 }} className='danger' onClick={openModal}>
        <FaTrash size={18} />
      </Button>

      <Modal closeModal={closeModal} isOpen={isModalVisible} align='items-center' width='max-w-lg'>
        <div>
          <h4 className='text-2xl mb-4 font-semibold'>Delete List</h4>
          <p className='text-lg'>
            Are you sure you want to delete <span className='font-bold'>{list.name}</span>?
          </p>

          <div className='gap-3 mt-6 flex'>
            <Button as={motion.button} whileTap={{ scale: 0.95 }} className='secondary w-full' onClick={closeModal} type='button'>
              Close
            </Button>
            <Button as={motion.button} whileTap={{ scale: 0.95 }} className='danger w-full' onClick={deleteListHandler} type='button'>
              Delete
            </Button>
          </div>
        </div>
      </Modal>

      <Toast isToastVisible={isToastVisible}>
        <Span className='toast-message'>{toastMessage}</Span>
      </Toast>
    </Fragment>
  );
};

export default DeleteListModal;
