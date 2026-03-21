import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import { toast } from "sonner";

import { useCreateList } from "apiRoutes/user";
import Modal, { useModal } from "components/Modal/Modal";
import ListBaseForm from "components/pages/Lists/helpers/ListBaseForm";
import Button from "components/UI/Button";
import FlexBox from "components/UI/FlexBox";
import H4 from "components/UI/Typography/H4";
import { apiEndpoints } from "data/apiEndpoints";
import { ROUTES } from "data/global";
import { useUserContext } from "Store/UserContext";
import { fetchOptions, getNiceName, matches } from "utils/helper";

export const CreateList = () => {
  const router = useRouter();
  const { createList, isPending } = useCreateList();
  const { userInfo } = useUserContext();
  const { isModalVisible, openModal, closeModal } = useModal();

  const createListHandler = async (e) => {
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

      router.push(`/${ROUTES.lists}/${getNiceName({ id: listDetails.id, name: listDetails.name })}`);

      toast.success("List created successfully", { description: "List has been created successfully." });
    } else {
      toast.error("Error creating the list", {
        description: "An error occurred while creating the list. Please try again later."
      });
    }
  };

  const openModalHandler = () => {
    router.replace({ query: { create: "true" } }, undefined, { shallow: true });
  };

  const closeModalHandler = () => {
    router.replace({ query: {} }, undefined, { shallow: true });
  };

  const isModalOpen = matches(router.query?.create, "true");

  useEffect(() => {
    if (isModalOpen) {
      openModal();
    } else {
      closeModal();
    }

    return () => {};
  }, [closeModal, isModalOpen, openModal]);

  return (
    <Fragment>
      <Button onClick={openModalHandler} size='large'>
        Create List
      </Button>

      <Modal isOpen={isModalVisible} closeModal={closeModalHandler}>
        <H4 weight='semibold' className='mb-16'>
          Create List
        </H4>

        <ListBaseForm submitHandler={createListHandler}>
          <FlexBox className='gap-16'>
            <Button onClick={closeModalHandler} disabled={isPending} type='button' className='w-1/2' variant='outline'>
              Close
            </Button>

            <Button type='submit' disabled={isPending} className='w-1/2'>
              {isPending ? "Creating..." : "Create List"}
            </Button>
          </FlexBox>
        </ListBaseForm>
      </Modal>
    </Fragment>
  );
};
