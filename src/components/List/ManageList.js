import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import useGetListDetails from "./useGetListDetails";
import useRevalidateList from "./useRevalidateList";
import { getListItemStatus, updateList, updateListItems } from "apiEndpoints/user";
import Loading from "components/Loading";
import { CardsContainerGrid } from "components/MediaTemplate/TemplateStyles";
import { Span } from "components/MovieInfo/MovieDetailsStyles";
import PlaceholderText from "components/PlaceholderText";
import Toast, { useToast } from "components/Toast/Toast";
import { blurPlaceholder, apiEndpoints } from "globals/constants";
import useGetSearchSuggestions from "hooks/useGetSearchSuggestions";
import useInfiniteQuery from "hooks/useInfiniteQuery";
import { Button } from "styles/GlobalComponents";
import { framerTabVariants, getReleaseDate } from "utils/helper";

const ManageList = ({ id }) => {
  const [query, setQuery] = useState("");
  const { revalidateData: revalidateWithQuery } = useRevalidateList({ withQuery: true });
  const { revalidateData } = useRevalidateList({ withQuery: false });
  const { searchSuggestions, loading: searchSuggestionsLoading } = useGetSearchSuggestions({
    query
  });
  const { error, listDetails, loading } = useGetListDetails({ id, order: "desc" });
  const { isToastVisible, showToast, toastMessage } = useToast();
  const [updateCover, setUpdateCover] = useState(false);
  const [selectedCover, setSelectedCover] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);

  // local state for list items
  const [items, setItems] = useState([]);

  const { list: infiniteQueryListMedia } = useInfiniteQuery({
    initialPage: 2,
    useUserToken: true,
    getEndpoint: ({ page }) =>
      `${apiEndpoints.lists.getListDetails({
        id,
        pageQuery: page
      })}&sort_by=original_order.desc`
  });

  const searchInputTimeout = useRef(null);
  const inputRef = useRef(null);

  const inputChangeHandler = (e) => {
    clearTimeout(searchInputTimeout);

    searchInputTimeout.current = setTimeout(() => {
      setQuery(e.target.value);
    }, 1000);
  };

  useEffect(() => {
    if (listDetails?.results?.length > 0) {
      setItems(listDetails.results.concat(infiniteQueryListMedia));
    }
  }, [listDetails.results, infiniteQueryListMedia]);

  useEffect(() => {
    setSelectedCover(listDetails.backdrop_path || null);
  }, [listDetails.backdrop_path]);

  const itemsHandler = async ({ item, action = "add" }) => {
    if (action === "add") {
      // check for existing item
      const statusRes = await getListItemStatus({
        listId: id,
        mediaId: item.id,
        mediaType: item.media_type
      });

      if (statusRes.success) {
        showToast({
          message: "Item already added to the list."
        });
        return;
      }

      // add item to the list
      const { success } = await updateListItems({
        id,
        method: "POST",
        itemsData: {
          items: [{ media_type: item.media_type, media_id: item.id }]
        }
      });

      if (!success) {
        showToast({
          message: "Error adding item to the list, please try again later."
        });
      } else {
        setItems((prevState) => [item, ...prevState]);
        showToast({
          message: "Item added to the list."
        });
      }
    } else {
      // remove item from the list
      const { success } = await updateListItems({
        id,
        method: "DELETE",
        itemsData: {
          items: [{ media_type: item.media_type, media_id: item.id }]
        }
      });

      if (!success) {
        showToast({
          message: "Error removing item from the list, please try again later."
        });
      } else {
        setItems((prevState) => prevState.filter((i) => i.id !== item.id));
        showToast({
          message: "Item removed from the list."
        });
      }
    }
  };

  const coverClickHandler = async (cover) => {
    setIsWaiting(true);
    const { success } = await updateList({ id, listData: { backdrop_path: cover } });

    if (!success) {
      showToast({ message: "Error updating the list details, please try again later." });
      setIsWaiting(false);
      return;
    }

    setSelectedCover(cover);
    showToast({ message: "List cover added successfully." });
    setIsWaiting(false);
    revalidateWithQuery();
  };

  const closeInputHandler = () => {
    inputRef.current.value = "";
    inputRef.current.blur();
    setQuery("");
  };

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          {error ? (
            <div className='text-lg font-medium text-red-600'>Something went wrong. Please try again later.</div>
          ) : (
            <div className='relative mb-8'>
              {isWaiting ? (
                <div className='bg-gray-900/50 fixed inset-0 z-50 grid place-items-center'>
                  <Loading />
                </div>
              ) : null}

              <div className='mb-8 flex flex-wrap items-center justify-between gap-4'>
                <h3 className='text-3xl font-semibold'>{listDetails.name}</h3>

                <div className='gap-3 flex items-center max-sm:w-full'>
                  <Button
                    as={motion.button}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setUpdateCover((prev) => !prev)}
                    className='w-full'
                    loading={+isWaiting}>
                    Update {updateCover ? "Items" : "Cover"}
                  </Button>

                  <Button
                    as={motion.button}
                    whileTap={{ scale: 0.95 }}
                    disabled={items?.length === 0}
                    onClick={revalidateData}
                    className='w-full disabled:cursor-not-allowed disabled:opacity-50'
                    loading={+isWaiting}>
                    Done
                  </Button>
                </div>
              </div>

              <AnimatePresence mode='wait'>
                {updateCover ? (
                  <motion.section
                    key={`updateCover-${updateCover}`}
                    variants={framerTabVariants}
                    initial='hidden'
                    animate='visible'
                    exit='hidden'
                    className={isWaiting ? "blur-sm brightness-[25%]" : ""}>
                    <h4 className='mb-4 font-medium'>Select a cover for your list</h4>

                    {items.length > 0 ? (
                      <div className='grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4'>
                        {items.map(({ id, backdrop_path, title, name }) => (
                          <div key={id}>
                            <div
                              className={`relative aspect-[1.68] cursor-pointer overflow-hidden rounded-lg transition-colors hover:grayscale-0 ${
                                selectedCover === backdrop_path ? "ring-green-700 ring-2 grayscale-0" : "ring-0 grayscale"
                              }`}
                              onClick={() => coverClickHandler(backdrop_path)}>
                              <Image
                                src={backdrop_path ? `https://image.tmdb.org/t/p/w500${backdrop_path}` : "/Images/DefaultBackdrop.png"}
                                alt='backdrop'
                                fill
                                style={{ objectFit: "cover" }}
                                placeholder='blur'
                                blurDataURL={blurPlaceholder}
                              />

                              {selectedCover === backdrop_path && (
                                <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                                  <span className='text-green-500 text-xl font-semibold'>Selected</span>
                                </div>
                              )}
                            </div>
                            <p className='text-lg mt-2 text-center font-medium'>{title || name}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <PlaceholderText height='large'>There are no items added to this list yet.</PlaceholderText>
                    )}
                  </motion.section>
                ) : (
                  <motion.section key={`updateCover-${updateCover}`} variants={framerTabVariants} initial='hidden' animate='visible' exit='hidden'>
                    <div className='relative flex-grow'>
                      <div>
                        <div className='gap-3 mb-2 flex items-stretch justify-between'>
                          <label htmlFor='addItem' className='text-base block font-medium text-neutral-200'>
                            Search Item
                          </label>

                          {query?.trim()?.length > 0 && (
                            <button
                              className='text-sm px-3 min-h-full rounded-xl bg-neutral-200 text-center font-semibold text-neutral-800'
                              onClick={closeInputHandler}>
                              Close
                            </button>
                          )}
                        </div>
                        <input
                          type='text'
                          ref={inputRef}
                          id='addItem'
                          placeholder='Search for a movie or TV show'
                          className='text-base p-2.5 block w-full rounded-lg border border-neutral-500 bg-neutral-700 text-white placeholder-neutral-400 focus:border'
                          onChange={inputChangeHandler}
                        />
                      </div>

                      <AnimatePresence mode='wait'>
                        {(searchSuggestionsLoading || searchSuggestions?.length > 0) && (
                          <motion.div
                            className='absolute left-0 right-0 top-full z-10 mt-2 overflow-hidden rounded-lg bg-neutral-800 shadow-lg'
                            key='suggestions'
                            variants={framerTabVariants}
                            initial='hidden'
                            animate='visible'
                            exit='hidden'
                            transition={{ duration: 0.325 }}>
                            {searchSuggestionsLoading ? (
                              <Loading />
                            ) : (
                              <Fragment>
                                {searchSuggestions.length > 0 ? (
                                  <div className='grid max-h-[50vh] grid-cols-[repeat(auto-fill,minmax(295px,1fr))] gap-4 overflow-y-auto p-4'>
                                    {searchSuggestions.map(({ id, title, name, poster_path, release_date, first_air_date, backdrop_path, type }) => (
                                      <div
                                        key={id}
                                        className='p-3 cursor-pointer overflow-hidden rounded-lg bg-neutral-700 transition-colors hover:bg-neutral-600'
                                        onClick={() =>
                                          itemsHandler({
                                            item: {
                                              id,
                                              poster_path,
                                              backdrop_path,
                                              media_type: type
                                            },
                                            action: "add"
                                          })
                                        }>
                                        <div className='gap-3 flex items-start'>
                                          <div className='relative aspect-[1/1.54] w-16 flex-shrink-0 overflow-hidden rounded-md'>
                                            <Image
                                              src={poster_path ? `https://image.tmdb.org/t/p/w185${poster_path}` : "/Images/DefaultImage.png"}
                                              alt='poster'
                                              fill
                                              style={{ objectFit: "cover" }}
                                              placeholder='blur'
                                              blurDataURL={blurPlaceholder}
                                            />
                                          </div>
                                          <div className='flex-grow'>
                                            <p className={`text-sm mb-1 font-medium ${type === "tv" ? "text-green-500" : "text-sky-500"}`}>
                                              {type === "tv" ? "TV Show" : "Movie"}
                                            </p>

                                            <p className='line-clamp-2 text-[15px] font-medium text-neutral-200'>{title || name}</p>
                                            <p className='text-sm font-normal text-neutral-200'>{getReleaseDate(release_date || first_air_date)}</p>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                ) : null}
                              </Fragment>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className='mt-8'>
                      {items?.length > 0 ? (
                        <CardsContainerGrid>
                          {items.map(({ id, poster_path, media_type }) => (
                            <div key={id} className='w-full text-center'>
                              <div className='relative aspect-[1/1.54] w-full flex-shrink-0 overflow-hidden rounded-lg'>
                                <Image
                                  src={poster_path ? `https://image.tmdb.org/t/p/w300${poster_path}` : "/Images/DefaultImage.png"}
                                  alt='poster'
                                  fill
                                  style={{ objectFit: "cover" }}
                                  placeholder='blur'
                                  blurDataURL={blurPlaceholder}
                                />
                              </div>

                              <Button
                                as={motion.button}
                                whileTap={{ scale: 0.95 }}
                                className='danger mt-4 w-full'
                                onClick={() =>
                                  itemsHandler({
                                    item: { id, media_type },
                                    action: "remove"
                                  })
                                }>
                                Remove
                              </Button>
                            </div>
                          ))}
                        </CardsContainerGrid>
                      ) : (
                        <PlaceholderText height='large'>
                          There are no items added to this list. <br /> Add items to continue.
                        </PlaceholderText>
                      )}
                    </div>
                  </motion.section>
                )}
              </AnimatePresence>
            </div>
          )}

          <Toast isToastVisible={isToastVisible}>
            <Span className='toast-message'>{toastMessage}</Span>
          </Toast>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ManageList;
