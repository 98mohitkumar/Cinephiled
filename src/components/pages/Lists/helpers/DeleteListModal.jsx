import { Trash } from "lucide-react";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { toast } from "sonner";

import { useDeleteList } from "apiRoutes/user";
import Modal, { useModal } from "components/Modal/Modal";
import Button from "components/UI/Button";
import FlexBox from "components/UI/FlexBox";
import H4 from "components/UI/Typography/H4";
import P from "components/UI/Typography/P";

const DeleteListModal = ({ list }) => {
  const { openModal, isModalVisible, closeModal } = useModal();
  const router = useRouter();
  const { deleteList, isPending } = useDeleteList();

  const deleteListHandler = async () => {
    const { success } = await deleteList({ id: list.id });

    if (success) {
      closeModal();
      toast.success("List has been deleted successfully.");
      router.push("/lists", undefined, { shallow: false });
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

      <Modal closeModal={isPending ? () => {} : closeModal} isOpen={isModalVisible} className='max-w-lg'>
        <H4 weight='semibold'>Delete List</H4>

        <P className='my-16'>
          Are you sure you want to delete <strong>{list.name}</strong>? This action cannot be undone.
        </P>

        <FlexBox className=' gap-16'>
          <Button onClick={closeModal} disabled={isPending} type='button' className='w-1/2' variant='outline'>
            Close
          </Button>
          <Button variant='danger' onClick={deleteListHandler} disabled={isPending} type='button' className='w-1/2'>
            {isPending ? "Deleting…" : "Delete"}
          </Button>
        </FlexBox>
      </Modal>
    </Fragment>
  );
};

export default DeleteListModal;
