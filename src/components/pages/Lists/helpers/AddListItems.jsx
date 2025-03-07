import { CircleX, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useNavigationGuard } from "next-navigation-guard";
import { Fragment, useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { throttle } from "throttle-debounce";

import { useGetListItemStatus, useUpdateListItems } from "apiRoutes/user";
import { LoadingSpinner } from "components/Loader/Loader";
import Modal, { useModal } from "components/Modal/Modal";
import Button from "components/UI/Button";
import FlexBox from "components/UI/FlexBox";
import { Grid, GridCol } from "components/UI/Grid";
import Input, { InputLabel } from "components/UI/Input";
import H4 from "components/UI/Typography/H4";
import P from "components/UI/Typography/P";
import { blurPlaceholder, opacityMotionTransition } from "data/global";
import useGetSearchSuggestions from "hooks/useGetSearchSuggestions";
import useRefreshData from "hooks/useRefreshData";
import { cn, getReleaseDate, matches } from "utils/helper";
import { getTMDBImage } from "utils/imageHelper";

const AddListItems = ({ id }) => {
  // local state for list items
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const { revalidateData } = useRefreshData();
  const { openModal, closeModal, isModalVisible } = useModal();
  const { getListItemStatus } = useGetListItemStatus();
  const { updateListItems } = useUpdateListItems();

  useNavigationGuard({
    enabled: items.length > 0,
    confirm: () => window.confirm("You have unsaved changes. Are you sure you wish to leave this page?")
  });

  const { searchSuggestions, loading: searchSuggestionsLoading } = useGetSearchSuggestions({
    query
  });

  const isValidQuery = query?.trim()?.length > 0;

  const inputRef = useRef(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const throttledInputChangeHandler = useCallback(
    throttle(750, () => {
      setQuery(inputRef.current.value);
    }),
    []
  );

  // close input handler
  const closeInputHandler = () => {
    inputRef.current.value = "";
    inputRef.current.blur();
    setQuery("");
  };

  // close modal handler
  const closeModalHandler = () => {
    setItems([]);
    closeInputHandler();
    closeModal();
  };

  // check for existing items and add to the local list items state
  const addItemHandler = async (item) => {
    // check for existing item
    const statusRes = await getListItemStatus({
      listId: id,
      mediaId: item.id,
      mediaType: item.media_type
    });

    if (statusRes.success || items.some(({ id }) => id === item.id)) {
      toast.warning("Item already exists.", { description: "Item already added to the list." });
      return;
    }

    // add item to the list
    setItems((prevState) => [item, ...prevState]);
    toast.success("Item added.", { description: "Item has been added, please save your changes." });
  };

  // save items to the list handler
  const saveItemsHandler = async () => {
    const { success } = await updateListItems({
      id,
      method: "POST",
      itemsData: {
        items: items.map(({ media_type, id }) => ({ media_type, media_id: id }))
      }
    });

    if (success) {
      toast.success("Items Added Successfully!", { description: "Your selected items have been added to the list." });

      // close modal on success
      closeModalHandler();

      // revalidate data
      setTimeout(() => {
        revalidateData();
      }, 100);
    } else {
      toast.error("Error Occurred", { description: "There was an issue adding items to your list. Please try again later." });
    }
  };

  const removeItemHandler = (itemId) => {
    setItems((prevState) => prevState.filter(({ id }) => id !== itemId));
  };

  return (
    <Fragment>
      <Button className='flex items-center gap-8' onClick={openModal} weight='medium'>
        <Plus size={16} />
        Add Items
      </Button>

      <Modal isOpen={isModalVisible} closeOnClickedOutside={false} className='max-w-4xl'>
        <H4 weight='semibold' className='mb-16'>
          Add Items to List
        </H4>

        <div className='relative mb-24'>
          <div>
            <InputLabel htmlFor='addItem'>Search Item</InputLabel>
            <Input
              type='text'
              ref={inputRef}
              id='addItem'
              placeholder='Search for a movie or TV show'
              onChange={throttledInputChangeHandler}
              fullWidth
              suffix={
                isValidQuery ? (
                  <CircleX
                    className='text-neutral-100 transition-colors hover:text-neutral-400'
                    size='22px'
                    onClick={closeInputHandler}
                    role='button'
                  />
                ) : null
              }
            />
          </div>

          <AnimatePresence mode='wait'>
            {searchSuggestionsLoading || searchSuggestions?.length > 0 ? (
              <motion.div
                key='suggestions'
                className='absolute left-0 right-0 top-full z-10 mt-12 overflow-hidden rounded-lg bg-neutral-800 shadow-lg'
                {...opacityMotionTransition}>
                {searchSuggestionsLoading ? (
                  <div className='grid-center min-h-96'>
                    <LoadingSpinner />
                  </div>
                ) : (
                  <Fragment>
                    {searchSuggestions.length > 0 ? (
                      <Fragment>
                        <P className='text-balance py-8 text-center text-neutral-300'>
                          <b>Tip</b>: You can use the &#39;y:&#39; filter to narrow your results by year. Example: <b>&#39;Avatar y:2009&#39;</b>
                        </P>

                        <Grid
                          className='grid max-h-96 gap-12 overflow-y-auto p-12'
                          colConfig={{
                            sm: 2,
                            lg: 3
                          }}>
                          {searchSuggestions.map(({ id, title, name, poster_path, release_date, first_air_date, type }) => (
                            <div
                              key={id}
                              className='cursor-pointer overflow-hidden rounded-lg bg-neutral-700 p-12 transition-colors hover:bg-neutral-600'
                              onClick={() =>
                                addItemHandler({
                                  id,
                                  poster_path,
                                  media_type: type
                                })
                              }>
                              <FlexBox className='items-start gap-12'>
                                <div className='relative aspect-poster w-16 shrink-0'>
                                  <Image
                                    fill
                                    placeholder='blur'
                                    alt={`${title || name}-poster`}
                                    blurDataURL={blurPlaceholder}
                                    src={getTMDBImage({ type: "poster", path: poster_path, size: "w185" })}
                                    className='rounded-sm object-cover'
                                  />
                                </div>
                                <div className='grow'>
                                  <P weight='medium' size='small' className={cn("mb-4 text-cyan-500", { "text-green-500": matches(type, "tv") })}>
                                    {type === "tv" ? "TV Show" : "Movie"}
                                  </P>

                                  <P weight='medium' className='line-clamp-2'>
                                    {title || name}
                                  </P>
                                  <P weight='medium' size='small' className='text-neutral-300'>
                                    {getReleaseDate(release_date || first_air_date)}
                                  </P>
                                </div>
                              </FlexBox>
                            </div>
                          ))}
                        </Grid>
                      </Fragment>
                    ) : null}
                  </Fragment>
                )}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <div className='mb-24'>
          {items?.length > 0 ? (
            <Grid
              colConfig={{
                xxs: 2,
                sm: 3,
                md: 4
              }}
              className='min-h-96 items-start gap-16'>
              {items.map(({ id, title, name, poster_path, media_type }) => (
                <GridCol title={title || name} key={id}>
                  <div className='relative aspect-poster'>
                    <Image
                      src={getTMDBImage({ path: poster_path, type: "poster" })}
                      alt={title || name || `${media_type}-poster`}
                      fill
                      className='rounded-lg object-cover shadow-xl'
                      placeholder='blur'
                      blurDataURL={blurPlaceholder}
                    />
                  </div>

                  <Button fullWidth variant='danger' className='mt-12' onClick={() => removeItemHandler(id)}>
                    Remove
                  </Button>
                </GridCol>
              ))}
            </Grid>
          ) : (
            <div className='grid-center min-h-96 text-center'>
              <P className='text-balance text-neutral-300'>
                Search for a movie or TV show above to add items to your list.
                <span className='my-12 block' />
                <b>Tip</b>: You can use the &#39;y:&#39; filter to narrow your results by year. Example: <b>&#39;Avatar y:2009&#39;</b>
              </P>
            </div>
          )}
        </div>

        <FlexBox className='justify-end gap-16'>
          <Button variant='outline' onClick={closeModalHandler} type='button' title='Close add items modal'>
            Close
          </Button>
          <Button onClick={saveItemsHandler} disabled={matches(items.length, 0)} title='Save items to list'>
            Save Changes
          </Button>
        </FlexBox>
      </Modal>
    </Fragment>
  );
};

export default AddListItems;
