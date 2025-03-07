import { Settings } from "lucide-react";
import { Fragment } from "react";
import { toast } from "sonner";

import { useUpdateList } from "apiRoutes/user";
import Modal, { useModal } from "components/Modal/Modal";
import Button from "components/UI/Button";
import FlexBox from "components/UI/FlexBox";
import H4 from "components/UI/Typography/H4";
import useRefreshData from "hooks/useRefreshData";
import { useListsContext } from "Store/ListsContext";

import ListBaseForm from "./ListBaseForm";

const EditListModal = ({ list }) => {
  const { openModal, isModalVisible, closeModal } = useModal();
  const { revalidateData } = useRefreshData();
  const { updateList: updateListContext, lists } = useListsContext();
  const { updateList } = useUpdateList();

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const listData = {};

    for (const [key, value] of formData.entries()) {
      listData[key] = value;
    }

    listData["iso_3166_1"] = "US";
    listData["iso_639_1"] = "en";

    if (listData.name.trim().length === 0) {
      toast.error("Form validation failed", {
        description: "Please fill all the required fields."
      });
      return;
    }

    const { success } = await updateList({ id: list.id, listData });

    if (success) {
      closeModal();
      revalidateData();
      const editedList = lists.find((item) => item.id === list.id);

      // this is done so that the name of the list that appears in add to list modal is in sync
      if (listData.name !== editedList.name) {
        updateListContext((prev) => prev.map((item) => (item.id === list.id ? { ...item, name: listData.name } : item)));
      }

      // show success toast
      toast.success("List has been updated successfully.");
    } else {
      // show error toast
      toast.error("An error occurred", {
        description: "An error occurred while updating the list details, please try again later."
      });
    }
  };

  return (
    <Fragment>
      <Button onClick={openModal} title='Edit List Details'>
        <Settings size={20} />
      </Button>

      <Modal closeModal={closeModal} isOpen={isModalVisible}>
        <H4 weight='semibold' className='mb-16'>
          Edit List Details
        </H4>

        <ListBaseForm id={list?.id} submitHandler={formSubmitHandler}>
          <FlexBox className='gap-16'>
            <Button variant='outline' onClick={closeModal} type='button' className='w-1/2'>
              Close
            </Button>
            <Button type='submit' className='w-1/2'>
              Update
            </Button>
          </FlexBox>
        </ListBaseForm>
      </Modal>
    </Fragment>
  );
};

export default EditListModal;
