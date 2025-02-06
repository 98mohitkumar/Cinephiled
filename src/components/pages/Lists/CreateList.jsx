import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { toast } from "sonner";

import { createList } from "apiRoutes/user";
import Modal, { useModal } from "components/Modal/Modal";
import ListBaseForm from "components/pages/Lists/helpers/ListBaseForm";
import Button from "components/UI/Button";
import FlexBox from "components/UI/FlexBox";
import H4 from "components/UI/Typography/H4";
import { apiEndpoints } from "data/apiEndpoints";
import { ROUTES } from "data/global";
import { useListsContext } from "Store/ListsContext";
import { useUserContext } from "Store/UserContext";
import { fetchOptions, getNiceName } from "utils/helper";

export const CreateList = () => {
  const router = useRouter();
  const { userInfo } = useUserContext();
  const [submitting, setSubmitting] = useState(false);
  const { updateList } = useListsContext();
  const { isModalVisible, openModal, closeModal } = useModal();

  const createListHandler = async (e) => {
    e.preventDefault();
    setSubmitting(true);
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

    const { success, response } = await createList({ listData });

    if (success) {
      const data = await response.json();

      const res = await fetch(
        apiEndpoints.lists.getListDetails({ id: data?.id }),
        fetchOptions({
          token: userInfo.accessToken
        })
      );

      const listDetails = await res.json();
      updateList((prev) => [listDetails, ...prev]);

      router.push(`/${ROUTES.lists}/${getNiceName({ id: listDetails.id, name: listDetails.name })}`);

      toast.success("List created successfully", { description: "List has been created successfully." });
    } else {
      setSubmitting(false);
      toast.error("Error creating the list", {
        description: "An error occurred while creating the list. Please try again later."
      });
    }
  };

  return (
    <Fragment>
      <Button onClick={openModal} size='large'>
        Create List
      </Button>

      <Modal isOpen={isModalVisible} closeModal={closeModal}>
        <H4 weight='semibold' className='mb-16'>
          Create List
        </H4>

        <ListBaseForm submitHandler={createListHandler}>
          <FlexBox className='gap-16'>
            <Button onClick={closeModal} disabled={submitting} type='button' className='w-1/2' variant='outline'>
              Close
            </Button>

            <Button type='submit' disabled={submitting} className='w-1/2'>
              {submitting ? "Creating..." : "Create List"}
            </Button>
          </FlexBox>
        </ListBaseForm>
      </Modal>
    </Fragment>
  );
};
