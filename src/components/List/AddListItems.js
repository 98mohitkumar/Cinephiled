import { getListItemStatus, updateListItems } from "api/user";
import Loading from "components/Loading";
import { CardsContainerGrid } from "components/MediaTemplate/TemplateStyles";
import { Span } from "components/MovieInfo/MovieDetailsStyles";
import PlaceholderText from "components/PlaceholderText";
import Toast, { useToast } from "components/Toast/Toast";
import { AnimatePresence, motion } from "framer-motion";
import { blurPlaceholder } from "globals/constants";
import useGetSearchSuggestions from "hooks/useGetSearchSuggestions";
import Image from "next/image";
import { Fragment, useRef, useState } from "react";
import { framerTabVariants, getReleaseDate } from "src/utils/helper";
import { Button } from "styles/GlobalComponents";
import useGetListDetails from "./useGetListDetails";

const AddListItems = ({ id, CTAHandler }) => {
  const [query, setQuery] = useState("");
  const { searchSuggestions, loading: searchSuggestionsLoading } = useGetSearchSuggestions(query);
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
            <div className='text-lg font-medium text-red-600'>
              Something went wrong. Please try again later.
            </div>
          ) : (
            <div>
              <div className='flex gap-4 justify-between items-center mb-8'>
                <h3 className='text-2xl font-semibold'>{listDetails.name}</h3>

                <div className='max-sm:hidden'>
                  <Button
                    disabled={items?.length === 0}
                    onClick={CTAHandler}
                    className='disabled:opacity-50 disabled:cursor-not-allowed'>
                    Continue
                  </Button>
                </div>
              </div>

              <div className='relative flex-grow'>
                <div>
                  <div className='flex gap-3 justify-between items-stretch mb-2'>
                    <label
                      htmlFor='addItem'
                      className='block text-base font-medium text-neutral-200'>
                      Add Item
                    </label>

                    {query?.trim()?.length > 0 && (
                      <button
                        className='bg-neutral-200 rounded-xl text-sm font-semibold text-center text-neutral-800 px-3 min-h-full'
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
                    className='border text-base rounded-lg block w-full p-2.5 bg-neutral-700 border-neutral-500
                    placeholder-neutral-400 text-white focus:border'
                    onChange={inputChangeHandler}
                  />
                </div>

                <AnimatePresence mode='wait'>
                  {(searchSuggestionsLoading || searchSuggestions?.length > 0) && (
                    <motion.div
                      className='absolute top-full mt-2 left-0 right-0 z-10 bg-neutral-800 rounded-lg overflow-hidden shadow-lg'
                      key='suggestions'
                      variants={framerTabVariants}
                      initial='hidden'
                      animate='visible'
                      exit='hidden'
                      transition={{ duration: 0.5 }}>
                      {searchSuggestionsLoading ? (
                        <Loading />
                      ) : (
                        <Fragment>
                          {searchSuggestions.length > 0 ? (
                            <div className='grid grid-cols-[repeat(auto-fill,minmax(295px,1fr))] p-4 gap-4 max-h-[50vh] overflow-y-auto'>
                              {searchSuggestions.map(
                                ({
                                  id,
                                  title,
                                  name,
                                  poster_path,
                                  release_date,
                                  first_air_date,
                                  type
                                }) => (
                                  <div
                                    key={id}
                                    className='p-3 cursor-pointer bg-neutral-700 hover:bg-neutral-600 rounded-lg overflow-hidden transition-colors'
                                    onClick={() =>
                                      itemsHandler({
                                        item: {
                                          id,
                                          poster_path,
                                          media_type: type === "tv" ? "tv" : "movie"
                                        },
                                        action: "add"
                                      })
                                    }>
                                    <div className='flex items-start gap-3'>
                                      <div className='relative flex-shrink-0 aspect-[1/1.54] w-16 rounded-md overflow-hidden'>
                                        <Image
                                          src={
                                            poster_path
                                              ? `https://image.tmdb.org/t/p/w185${poster_path}`
                                              : "/Images/DefaultImage.png"
                                          }
                                          alt='poster'
                                          fill
                                          style={{ objectFit: "cover" }}
                                          placeholder='blur'
                                          blurDataURL={blurPlaceholder}
                                        />
                                      </div>
                                      <div className='flex-grow'>
                                        <p
                                          className={`text-sm font-medium mb-1 ${
                                            type === "tv" ? "text-green-500" : "text-sky-500"
                                          }`}>
                                          {type === "tv" ? "TV Show" : "Movie"}
                                        </p>

                                        <p className='text-[15px] font-medium text-neutral-200 line-clamp-2'>
                                          {title || name}
                                        </p>
                                        <p className='text-sm font-normal text-neutral-200'>
                                          {getReleaseDate(release_date || first_air_date)}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          ) : null}
                        </Fragment>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className='block sm:hidden mt-3'>
                <Button
                  disabled={items?.length === 0}
                  onClick={CTAHandler}
                  className='disabled:opacity-50 disabled:cursor-not-allowed w-full'>
                  Continue
                </Button>
              </div>

              <div className='mt-8'>
                {items?.length > 0 ? (
                  <CardsContainerGrid>
                    {items.map(({ id, poster_path, media_type }) => (
                      <div key={id} className='text-center w-full'>
                        <div className='relative flex-shrink-0 aspect-[1/1.54] w-full rounded-lg overflow-hidden'>
                          <Image
                            src={
                              poster_path
                                ? `https://image.tmdb.org/t/p/w300${poster_path}`
                                : "/Images/DefaultImage.png"
                            }
                            alt='poster'
                            fill
                            style={{ objectFit: "cover" }}
                            placeholder='blur'
                            blurDataURL={blurPlaceholder}
                          />
                        </div>

                        <Button
                          className='danger w-full mt-4'
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
