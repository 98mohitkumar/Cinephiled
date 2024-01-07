import { updateList } from "api/user";
import Modal, { useModal } from "components/Modal/Modal";
import { Span } from "components/MovieInfo/MovieDetailsStyles";
import Toast, { useToast } from "components/Toast/Toast";
import { motion } from "framer-motion";
import { Fragment } from "react";
import { useListsContext } from "Store/ListsContext";
import { Button } from "styles/GlobalComponents";
import CreateListForm from "./CreateListForm";
import useRevalidateList from "./useRevalidateList";

const EditListModal = ({ list }) => {
  const { openModal, isModalVisible, closeModal } = useModal();
  const { isToastVisible, showToast, toastMessage } = useToast();
  const { revalidateData } = useRevalidateList();
  const { updateList: updateListContext, lists } = useListsContext();

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const listData = {};

    for (const [key, value] of formData.entries()) {
      listData[key] = value;
    }

    listData["iso_3166_1"] = "US";
    listData["iso_639_1"] = "en";

    const { success } = await updateList({ id: list.id, listData });

    if (!success) {
      closeModal();
      showToast({ message: "Error updating the list details, please try again later." });
    } else {
      closeModal();
      revalidateData();
      const editedList = lists.find((item) => item.id === list.id);

      if (listData.name !== editedList.name) {
        updateListContext((prev) =>
          prev.map((item) => (item.id === list.id ? { ...item, name: listData.name } : item))
        );
      }
      showToast({ message: "List updated successfully." });
    }
  };

  return (
    <Fragment>
      <Button as={motion.button} whileTap={{ scale: 0.95 }} onClick={openModal}>
        Edit
      </Button>

      <Modal closeModal={closeModal} isOpen={isModalVisible} align='items-center'>
        <div>
          <h4 className='text-2xl mb-4 font-semibold'>Edit List</h4>
          <CreateListForm id={list?.id} submitHandler={formSubmitHandler}>
            <div className='mt-6 flex gap-3'>
              <Button
                as={motion.button}
                whileTap={{ scale: 0.95 }}
                className='w-full secondary'
                onClick={closeModal}
                type='button'>
                Close
              </Button>
              <Button
                as={motion.button}
                whileTap={{ scale: 0.95 }}
                className='w-full'
                type='submit'>
                Save
              </Button>
            </div>
          </CreateListForm>
        </div>
      </Modal>

      <Toast isToastVisible={isToastVisible}>
        <Span className='toast-message'>{toastMessage}</Span>
      </Toast>
    </Fragment>
  );
};

export default EditListModal;
