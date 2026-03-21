import { useQueryClient } from "@tanstack/react-query";
import { List } from "lucide-react";
import Link from "next/link";
import { Fragment, useMemo, useState } from "react";
import { toast } from "sonner";

import { useAccountListsInfiniteQuery, listItemStatusQueryKey, useListItemStatusQuery, useUpdateListItems } from "apiRoutes/user";
import Modal, { useModal } from "components/Modal/Modal";
import { suggestLogin } from "components/Shared/UserActions";
import Button from "components/UI/Button";
import FlexBox from "components/UI/FlexBox";
import H4 from "components/UI/Typography/H4";
import P from "components/UI/Typography/P";
import { useUserContext } from "Store/UserContext";
import { cn } from "utils/helper";

const ListSlice = ({ mediaId, list, mediaType, CTA }) => {
  const { data, isPending } = useListItemStatusQuery({
    listId: list.id,
    mediaId,
    mediaType
  });
  const [optimistic, setOptimistic] = useState(null);

  const serverAdded = data?.success ?? false;
  const isAdded = optimistic !== null ? optimistic : serverAdded;
  const loading = isPending;

  const selectectionHandler = () => {
    CTA({
      listId: list.id,
      action: isAdded ? "remove" : "add"
    });
    setOptimistic(!isAdded);
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
  const { userInfo } = useUserContext();
  const [selectedList, setSelectedList] = useState([]);
  const [isWaiting, setIsWaiting] = useState(false);

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, isPending } = useAccountListsInfiniteQuery({
    enabled: Boolean(isModalVisible)
  });

  const lists = useMemo(() => data?.pages?.flatMap((p) => p.results ?? []) ?? [], [data?.pages]);

  const { updateListItems } = useUpdateListItems();
  const queryClient = useQueryClient();

  const openModalHandler = () => {
    if (userInfo?.accountId) {
      openModal();
    } else {
      suggestLogin();
    }
  };

  const listSelectionHandler = ({ listId, action }) => {
    setSelectedList((prev) => {
      const idx = prev.findIndex((item) => item.listId === listId);
      if (idx >= 0) {
        return prev.filter((_, i) => i !== idx);
      }
      return [...prev, { listId, action }];
    });
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
    const listsToRefresh = [...selectedList];

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

      for (const { listId } of listsToRefresh) {
        queryClient.invalidateQueries({ queryKey: listItemStatusQueryKey(listId, mediaId, mediaType) });
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

  const showListsLoading = isPending || (isFetching && lists.length === 0);
  const hasAList = lists.length > 0;
  const showEmpty = !showListsLoading && !hasAList;

  return (
    <Fragment>
      <Modal isOpen={isModalVisible} closeModal={isWaiting ? () => {} : closeModalHandler} className='max-w-lg'>
        <div className={cn(isWaiting && "pointer-events-none")}>
          <H4 weight='semibold' className='mb-16'>
            Add to lists
          </H4>

          {showListsLoading ? (
            <div className='grid place-items-center py-12'>
              <P size='large' weight='semibold' className='text-neutral-400'>
                Loading lists…
              </P>
            </div>
          ) : hasAList ? (
            <div className='flex flex-col gap-12'>
              <div className='max-h-72 overflow-y-auto rounded-lg border border-neutral-700'>
                {lists.map((list) => (
                  <ListSlice key={list.id} mediaId={mediaId} list={list} mediaType={mediaType} CTA={listSelectionHandler} />
                ))}
              </div>
              {hasNextPage ? (
                <P
                  tag='a'
                  href='#'
                  disabled={isFetchingNextPage}
                  className='w-full text-center text-accentPrimary underline'
                  onClick={(e) => (e.preventDefault(), fetchNextPage())}>
                  {isFetchingNextPage ? "Loading…" : "Load more lists"}
                </P>
              ) : null}
            </div>
          ) : showEmpty ? (
            <div className='grid place-items-center gap-8 py-12'>
              <P size='large' weight='semibold'>
                You don&apos;t have any lists yet.
              </P>
              <Link href='/lists?create=true'>
                <P className='text-cyan-400 underline transition-colors hover:text-cyan-500'>Create a list</P>
              </Link>
            </div>
          ) : null}

          <FlexBox className='mt-16 gap-16'>
            <Button onClick={closeModalHandler} disabled={isWaiting} type='button' className={cn(hasAList ? "w-1/2" : "w-full")} variant='outline'>
              Close
            </Button>

            {hasAList && (
              <Button type='submit' className='w-1/2' onClick={saveListHandler} disabled={isWaiting || !selectedList.length}>
                {isWaiting ? "Saving..." : "Save"}
              </Button>
            )}
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
