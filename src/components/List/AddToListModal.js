import { getListItemStatus, updateListItems } from "api/user";
import Modal, { useModal } from "components/Modal/Modal";
import { Span } from "components/MovieInfo/MovieDetailsStyles";
import PlaceholderText from "components/PlaceholderText";
import Toast, { useToast } from "components/Toast/Toast";
import { motion } from "framer-motion";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { useListsContext } from "Store/ListsContext";
import { useUserContext } from "Store/UserContext";
import { Button } from "styles/GlobalComponents";

const ListSlice = ({ mediaId, list, mediaType, CTA }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getListItemStatus({ listId: list.id, mediaId, mediaType })
      .then((data) => {
        if (data.success) {
          setIsAdded(true);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [list.id, mediaId, mediaType]);

  const selectectionHandler = () => {
    setIsAdded((prev) => !prev);
    CTA({
      listId: list.id,
      action: isAdded ? "remove" : "add"
    });
  };

  return (
    <Fragment>
      <div
        className={`flex items-center justify-between flex-wrap gap-2 ps-4 pe-6 py-3 border-b border-neutral-600 last:border-b-0 cursor-pointer hover:bg-neutral-700 transition-colors ${
          loading ? "opacity-50 pointer-events-none" : ""
        }`}
        onClick={selectectionHandler}>
        {loading ? (
          <p className='font-semibold opacity-50'>Loading....</p>
        ) : (
          <Fragment>
            <p className='font-medium'>{list?.name}</p>
            {isAdded ? (
              <span className='text-red-500 text-base'>Remove</span>
            ) : (
              <span className='text-green-500 text-base'>Add</span>
            )}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

const AddToListModal = ({ mediaId, mediaType }) => {
  const { closeModal, isModalVisible, openModal } = useModal();
  const { isToastVisible, showToast, toastMessage } = useToast();
  const { lists } = useListsContext();
  const { userInfo } = useUserContext();
  const [selectedList, setSelectedList] = useState([]);
  const [isWaiting, setIsWaiting] = useState(false);

  const openModalHandler = () => {
    if (userInfo?.accountId) {
      openModal();
    } else {
      showToast({ message: "Please login first to use this feature" });
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
      showToast({ message: "List updated successfully" });
    } catch {
      setIsWaiting(false);
      closeModalHandler();
      showToast({ message: "Something went wrong, please try again later" });
    }
  };

  return (
    <Fragment>
      <Modal
        isOpen={isModalVisible}
        closeModal={isWaiting ? () => {} : closeModalHandler}
        width='max-w-lg'
        align='items-center'>
        <div className={isWaiting ? "pointer-events-none" : ""}>
          <h4 className='text-2xl mb-4 font-semibold'>Add to list</h4>

          {lists?.length > 0 ? (
            <div className='border border-neutral-700 max-h-72 overflow-y-auto rounded-lg'>
              {lists?.map((list) => (
                <ListSlice
                  key={list.id}
                  mediaId={mediaId}
                  list={list}
                  mediaType={mediaType}
                  CTA={listSelectionHandler}
                />
              ))}
            </div>
          ) : (
            <PlaceholderText>
              You don&apos;t have any lists yet.
              <Link href='/lists?create=true'>
                <p className='block text-lg underline text-cyan-400 hover:text-cyan-600 transition-colors'>
                  Create a list
                </p>
              </Link>
            </PlaceholderText>
          )}

          <div className='mt-6 flex gap-3'>
            <Button
              as={motion.button}
              whileTap={{ scale: 0.95 }}
              className='w-full secondary'
              onClick={closeModalHandler}
              loading={+isWaiting}
              type='button'>
              Close
            </Button>

            {lists?.length > 0 && (
              <Button
                as={motion.button}
                whileTap={{ scale: 0.95 }}
                className='w-full'
                onClick={saveListHandler}
                loading={+isWaiting}
                type='button'>
                Save
              </Button>
            )}
          </div>
        </div>
      </Modal>

      <Button
        className='w-full gap-3'
        as={motion.button}
        whileTap={{ scale: 0.95 }}
        onClick={openModalHandler}>
        <MdOutlineFormatListBulleted size={22} />
        <span className='font-semibold'>Add to list</span>
      </Button>

      <Toast isToastVisible={isToastVisible}>
        <Span className='toast-message'>{toastMessage}</Span>
      </Toast>
    </Fragment>
  );
};

export default AddToListModal;
