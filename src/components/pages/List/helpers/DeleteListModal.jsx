import { Trash } from "lucide-react";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { toast } from "sonner";

import { deleteList } from "apiEndpoints/user";
import Modal, { useModal } from "components/Modal/Modal";
import Button from "components/UI/Button";
import FlexBox from "components/UI/FlexBox";
import H4 from "components/UI/Typography/H4";
import P from "components/UI/Typography/P";
import { useListsContext } from "Store/ListsContext";

const DeleteListModal = ({ list }) => {
  const { openModal, isModalVisible, closeModal } = useModal();
  const router = useRouter();
  const { updateList } = useListsContext();

  const deleteListHandler = async () => {
    const { success } = await deleteList({ id: list.id });

    if (success) {
      updateList((prev) => prev.filter((item) => item.id !== list.id));
      closeModal();
      toast.success("List has been deleted successfully.");
      router.push("/lists");
    } else {
      closeModal();
      toast.error("An error occurred", {
        description: "An error occurred while deleting the list, please try again later."
      });
    }
  };

  return (
    <Fragment>
      <Button variant='danger' onClick={openModal} title='Delete List'>
        <Trash size={20} className='text-red-500' />
      </Button>

      <Modal closeModal={closeModal} isOpen={isModalVisible} width='max-w-lg'>
        <div>
          <H4 weight='semibold'>Delete List</H4>

          <div className='mt-16'>
            <P>
              Are you sure you want to delete <strong>{list.name}</strong>?
            </P>

            <FlexBox className='mt-16 gap-16'>
              <Button onClick={closeModal} type='button' className='w-1/2' variant='outline'>
                Close
              </Button>
              <Button variant='danger' onClick={deleteListHandler} type='button' className='w-1/2'>
                Delete
              </Button>
            </FlexBox>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default DeleteListModal;
