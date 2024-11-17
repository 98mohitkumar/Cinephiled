import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Fragment, useRef, useState } from "react";
import useGetListDetails from "./useGetListDetails";
import { getListItemStatus, updateListItems } from "apiEndpoints/user";
import Loading from "components/Loader/Loader";
import { CardsContainerGrid } from "components/MediaTemplate/TemplateStyles";
import { Span } from "components/MovieInfo/MovieDetailsStyles";
import PlaceholderText from "components/PlaceholderText";
import Toast, { useToast } from "components/Toast/Toast";
import { blurPlaceholder } from "globals/constants";
import useGetSearchSuggestions from "hooks/useGetSearchSuggestions";
import { Button } from "styles/GlobalComponents";
import { framerTabVariants, getReleaseDate } from "utils/helper";

const AddListItems = ({ id, CTAHandler }) => {
  const [query, setQuery] = useState("");
  const { searchSuggestions, loading: searchSuggestionsLoading } = useGetSearchSuggestions({
    query
  });
  const { error, listDetails, loading } = useGetListDetails({ id, order: "desc" });
  const { isToastVisible, showToast, toastMessage } = useToast();

  // local state for list items
  const [items, setItems] = useState([]);
  const searchInputTimeout = useRef(null);
  const inputRef = useRef(null);

  const inputChangeHandler = (e) => {
    clearTimeout(searchInputTimeout);

    searchInputTimeout.current = setTimeout(() => {
      setQuery(e.target.value);
    }, 1000);
  };

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
            <div>
              <div className='mb-8 flex items-center justify-between gap-4'>
                <h3 className='text-2xl font-semibold'>{listDetails.name}</h3>

                <div className='max-sm:hidden'>
                  <Button disabled={items?.length === 0} onClick={CTAHandler} className='disabled:cursor-not-allowed disabled:opacity-50'>
                    Continue
                  </Button>
                </div>
              </div>

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
                    className='text-base p-2.5 block w-full rounded-lg border border-neutral-500 bg-neutral-700
                    text-white placeholder-neutral-400 focus:border'
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
                              {searchSuggestions.map(({ id, title, name, poster_path, release_date, first_air_date, type }) => (
                                <div
                                  key={id}
                                  className='p-3 cursor-pointer overflow-hidden rounded-lg bg-neutral-700 transition-colors hover:bg-neutral-600'
                                  onClick={() =>
                                    itemsHandler({
                                      item: {
                                        id,
                                        poster_path,
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

              <div className='mt-3 block sm:hidden'>
                <Button disabled={items?.length === 0} onClick={CTAHandler} className='w-full disabled:cursor-not-allowed disabled:opacity-50'>
                  Continue
                </Button>
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

export default AddListItems;
