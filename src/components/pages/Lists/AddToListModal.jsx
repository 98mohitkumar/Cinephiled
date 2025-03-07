import { List } from "lucide-react";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { toast } from "sonner";

import { useGetListItemStatus, useUpdateListItems } from "apiRoutes/user";
import Modal, { useModal } from "components/Modal/Modal";
import { suggestLogin } from "components/Shared/UserActions";
import Button from "components/UI/Button";
import FlexBox from "components/UI/FlexBox";
import H4 from "components/UI/Typography/H4";
import P from "components/UI/Typography/P";
import { useListsContext } from "Store/ListsContext";
import { useUserContext } from "Store/UserContext";
import { cn } from "utils/helper";

const ListSlice = ({ mediaId, list, mediaType, CTA }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [loading, setLoading] = useState(true);
  const { getListItemStatus } = useGetListItemStatus();

  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();
    getListItemStatus({ signal: abortController.signal, listId: list.id, mediaId, mediaType })
      .then((data) => {
        setIsAdded(data.success);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      abortController.abort("unmounted");
      setIsAdded(false);
      setLoading(false);
    };
  }, [getListItemStatus, list.id, mediaId, mediaType]);

  const selectectionHandler = () => {
    setIsAdded((prev) => !prev);
    CTA({
      listId: list.id,
      action: isAdded ? "remove" : "add"
    });
  };

  return (
    <Fragment>
      <FlexBox
        className={cn(
          "cursor-pointer flex-wrap items-center justify-between gap-8 border-b border-neutral-600 py-12 pe-24 ps-16 transition-colors last:border-b-0 hover:bg-neutral-800",
          loading ? "pointer-events-none opacity-50" : ""
        )}
        onClick={selectectionHandler}>
        {loading ? (
          <P weight='semibold' className='opacity-50'>
            Loading....
          </P>
        ) : (
          <Fragment>
            <P size='medium'>{list?.name}</P>
            <P tag='span' className={cn(isAdded ? "text-red-500" : "text-green-500")}>
              {isAdded ? "Remove" : "Add"}
            </P>
          </Fragment>
        )}
      </FlexBox>
    </Fragment>
  );
};

const AddToListModal = ({ mediaId, mediaType }) => {
  const { closeModal, isModalVisible, openModal } = useModal();
  const { lists } = useListsContext();
  const { userInfo } = useUserContext();
  const [selectedList, setSelectedList] = useState([]);
  const [isWaiting, setIsWaiting] = useState(false);

  const { updateListItems } = useUpdateListItems();

  const openModalHandler = () => {
    if (userInfo?.accountId) {
      openModal();
    } else {
      suggestLogin();
    }
  };

  const listSelectionHandler = ({ listId, action }) => {
    if (selectedList.includes(listId)) {
      setSelectedList((prev) => prev.filter((id) => id !== listId));
    } else {
      setSelectedList((prev) => [...prev, { listId, action }]);
    }
  };

  const closeModalHandler = () => {
    closeModal();
    setSelectedList([]);
  };

  const saveListHandler = async () => {
    if (!selectedList.length) {
      closeModalHandler();
      return;
    }

    setIsWaiting(true);

    const addToList = selectedList.filter((list) => list.action === "add");
    const removeFromList = selectedList.filter((list) => list.action === "remove");

    try {
      if (addToList.length) {
        const res = await Promise.all(
          addToList.map((list) =>
            updateListItems({
              id: list.listId,
              method: "POST",
              itemsData: {
                items: [{ media_type: mediaType, media_id: mediaId }]
              }
            })
          )
        );

        if (res.some((item) => !item.success)) {
          throw new Error("Something went wrong, please try again later");
        }
      }

      if (removeFromList.length) {
        const res = await Promise.all(
          removeFromList.map((list) =>
            updateListItems({
              id: list.listId,
              method: "DELETE",
              itemsData: {
                items: [{ media_type: mediaType, media_id: mediaId }]
              }
            })
          )
        );

        if (res.some((item) => !item.success)) {
          throw new Error("Something went wrong, please try again later");
        }
      }

      setIsWaiting(false);
      closeModalHandler();
      toast.success("List updated successfully");
    } catch {
      setIsWaiting(false);
      closeModalHandler();
      toast.error("Something went wrong, please try again later");
    }
  };

  return (
    <Fragment>
      <Modal isOpen={isModalVisible} closeModal={isWaiting ? () => {} : closeModalHandler} className='max-w-lg'>
        <div className={cn(isWaiting && "pointer-events-none")}>
          <H4 weight='semibold' className='mb-16'>
            Trailer
          </H4>

          {lists?.length > 0 ? (
            <div className='max-h-72 overflow-y-auto rounded-lg border border-neutral-700'>
              {lists?.map((list) => (
                <ListSlice key={list.id} mediaId={mediaId} list={list} mediaType={mediaType} CTA={listSelectionHandler} />
              ))}
            </div>
          ) : (
            <div className='grid place-items-center gap-8 py-12'>
              <P size='large' weight='semibold'>
                You don&apos;t have any lists yet.
              </P>
              <Link href='/lists?create=true'>
                <P className='text-cyan-400 underline transition-colors hover:text-cyan-500'>Create a list</P>
              </Link>
            </div>
          )}

          <FlexBox className='mt-16 gap-16'>
            <Button onClick={closeModal} disabled={isWaiting} type='button' className='w-1/2' variant='outline'>
              Close
            </Button>

            <Button type='submit' disabled={isWaiting} className='w-1/2' onClick={saveListHandler}>
              {isWaiting ? "Saving..." : "Save"}
            </Button>
          </FlexBox>
        </div>
      </Modal>

      <Button onClick={openModalHandler} shape='pill' size='small' title='Add to custom list' className='flex items-center gap-6' weight='semibold'>
        <List size={16} />
        Add to lists
      </Button>
    </Fragment>
  );
};

export default AddToListModal;
