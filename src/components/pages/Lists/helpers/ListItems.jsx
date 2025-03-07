import { CircleX, EllipsisVertical } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useNavigationGuard } from "next-navigation-guard";
import { Fragment, useState } from "react";
import { toast } from "sonner";

import { useUpdateList, useUpdateListItems } from "apiRoutes/user";
import Modal, { useModal } from "components/Modal/Modal";
import MediaTemplateGrid from "components/Templates/MediaTemplateGrid";
import Button from "components/UI/Button";
import FlexBox from "components/UI/FlexBox";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "components/UI/Popover";
import H4 from "components/UI/Typography/H4";
import H6 from "components/UI/Typography/H6";
import P from "components/UI/Typography/P";
import { apiEndpoints } from "data/apiEndpoints";
import { opacityMotionTransition } from "data/global";
import useInfiniteQuery from "hooks/useInfiniteQuery";
import useRefreshData from "hooks/useRefreshData";
import { useUserContext } from "Store/UserContext";
import { cn, getReleaseDate, matches } from "utils/helper";

const ListItems = ({ listItems, id, userCanEditList }) => {
  const { revalidateData } = useRefreshData();
  const { updateList } = useUpdateList();
  const { updateListItems } = useUpdateListItems();
  const [itemsToRemove, setItemsToRemove] = useState([]);
  const {
    userInfo: { accountId }
  } = useUserContext();
  const { openModal, closeModal, isModalVisible } = useModal();
  const { list: infiniteQueryListMedia, resetQueryState } = useInfiniteQuery({
    initialPage: 2,
    useUserToken: true,
    getEndpoint: ({ page }) =>
      apiEndpoints.lists.getListDetails({
        id,
        accountId,
        pageQuery: page
      })
  });

  useNavigationGuard({
    enabled: itemsToRemove.length > 0,
    confirm: () => window.confirm("You have unsaved changes. Are you sure you wish to leave this page?")
  });

  const refreshData = () => {
    setTimeout(() => {
      resetQueryState();
      revalidateData();
    }, 500);
  };

  // items local state handler
  const itemsLocalStateHandler = ({ item, action = "add" }) => {
    if (matches(action, "add")) {
      setItemsToRemove((prev) => [item, ...prev]);
    } else {
      setItemsToRemove((prev) => {
        const items = prev.filter((media) => media.id !== item.id);

        if (matches(items.length, 0)) {
          closeModal();
        }

        return items;
      });
    }
  };

  // remove item from list request handler
  const removeItemsRequestHandler = async () => {
    const { success } = await updateListItems({
      id,
      method: "DELETE",
      itemsData: {
        items: itemsToRemove.map((item) => ({ media_type: item.media_type, media_id: item.id }))
      }
    });

    if (success) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      toast.success("Items Removed Successfully", { description: "The selected items have been successfully removed from your list." });
      closeModal();
      setItemsToRemove([]);
      refreshData();
    } else {
      toast.error("Removal Failed", {
        description: "There was an issue removing the items from your list. Please try again later."
      });
    }
  };

  // update backdrops handler
  const updateBackdropsHandler = async (backdrop) => {
    const { success } = await updateList({ id, listData: { backdrop_path: backdrop } });

    if (success) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      toast.success("Success!", { description: "List cover added successfully." });
      closeModal();
      setItemsToRemove([]);
      refreshData();
    } else {
      toast.error("An error occured", { description: "Error updating the list details, please try again later." });
    }
  };

  const renderList = listItems.concat(infiniteQueryListMedia).filter((item) => !itemsToRemove.some((media) => media.id === item.id));

  return (
    <Fragment>
      <MediaTemplateGrid media={renderList} gridType='poster'>
        {({ id, title, name, release_date, first_air_date, media_type, backdrop_path }) => (
          <div className={cn("mt-2024", { "mt-2432": userCanEditList })}>
            <FlexBox className='items-start justify-between gap-16'>
              <H6 weight='medium' className='line-clamp-2 text-pretty'>
                {title || name}
              </H6>

              {userCanEditList ? (
                <Popover modal>
                  <PopoverTrigger className='grid-center mt-2 aspect-square w-8 shrink-0 rounded-full border border-transparent bg-neutral-700 transition-colors aria-expanded:border-neutral-100 can-hover:bg-neutral-600'>
                    <EllipsisVertical size={16} />
                  </PopoverTrigger>

                  <PopoverContent align='end' className='text-center'>
                    <PopoverClose
                      className='block w-full'
                      onClick={() => itemsLocalStateHandler({ item: { id, media_type, name: title || name }, action: "add" })}>
                      <P
                        className='border-b border-neutral-600 px-16 py-10 text-red-500 transition-colors can-hover:bg-red-950/75'
                        weight='medium'
                        size='small-to-p'>
                        Remove from list
                      </P>
                    </PopoverClose>

                    <PopoverClose className='block w-full' onClick={() => updateBackdropsHandler(backdrop_path)}>
                      <P className='px-16 py-10 text-neutral-200 transition-colors can-hover:bg-neutral-700' weight='medium' size='small-to-p'>
                        Use as cover image
                      </P>
                    </PopoverClose>
                  </PopoverContent>
                </Popover>
              ) : null}
            </FlexBox>
            <P className='text-neutral-400' weight='medium' size='small-to-p'>
              {getReleaseDate(release_date || first_air_date)}
            </P>
          </div>
        )}
      </MediaTemplateGrid>

      <AnimatePresence mode='wait'>
        {itemsToRemove?.length > 0 && (
          <motion.div
            {...opacityMotionTransition}
            className='grid-center fixed bottom-0 left-0 right-0 z-100 w-full bg-gradient-to-t from-neutral-950 to-transparent py-48'>
            <Button variant='danger' size='large' onClick={openModal}>
              Remove {itemsToRemove.length} Items
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <Modal isOpen={isModalVisible} onClose={closeModal}>
        <H4 weight='semibold' className='mb-16'>
          Remove List Items
        </H4>

        <P weight='medium' size='small-to-p'>
          Are you sure you want to remove these items from your list? This action cannot be undone.
        </P>

        {itemsToRemove.length > 0 ? (
          <div className='mt-16 overflow-hidden rounded-lg border border-neutral-600 bg-neutral-800'>
            {itemsToRemove.map((item) => (
              <FlexBox key={item.id} className='items-center justify-between gap-24 border-b border-neutral-600 px-16 py-12 last:border-b-0'>
                <P weight='medium' className='line-clamp-2 text-neutral-300'>
                  {item.title || item.name}
                </P>

                <CircleX size={20} role='button' onClick={() => itemsLocalStateHandler({ item, action: "remove" })} />
              </FlexBox>
            ))}
          </div>
        ) : null}

        <FlexBox className='mt-24 gap-16'>
          <Button variant='outline' onClick={closeModal} className='w-1/2' title='Close modal'>
            Close
          </Button>
          <Button variant='danger' onClick={removeItemsRequestHandler} className='w-1/2' title='Remove items from list'>
            Remove
          </Button>
        </FlexBox>
      </Modal>
    </Fragment>
  );
};

export default ListItems;
