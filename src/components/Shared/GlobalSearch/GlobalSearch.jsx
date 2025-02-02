import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/router";
import { Fragment, useCallback, useRef, useState } from "react";
import { debounce } from "throttle-debounce";

import { LoadingSpinner } from "components/Loader/Loader";
import P from "components/UI/Typography/P";
import { ROUTES, opacityMotionTransition } from "data/global";
import useGetSearchSuggestions from "hooks/useGetSearchSuggestions";
import { matches } from "utils/helper";

import { searchCTA, formStyles, userInput } from "./GlobalSearchStyles";
import SearchSuggestion from "./searchSuggestion";

const GlobalSearch = () => {
  const router = useRouter();
  const userInputRef = useRef("");
  const [query, setQuery] = useState("");
  const { searchSuggestions, loading: isFetching } = useGetSearchSuggestions({
    query,
    includePeople: true
  });

  const isValidInput = query.length > 0 && query.trim().length > 0;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const inputChangeHandler = useCallback(
    debounce(500, () => {
      setQuery(userInputRef.current.value);
    }),
    []
  );

  const searchHandler = async (event) => {
    event.preventDefault();

    if (isValidInput) {
      router.push(`/${ROUTES.search}/${query.replaceAll(" ", "+")}`);
      userInputRef.current.value = "";
    }
  };

  const keyHandler = (e, currentIndex, onSearchInput = false) => {
    const isArrowUp = e.code === "ArrowUp";
    const isArrowDown = e.code === "ArrowDown";

    if (isArrowUp || (isArrowDown && !onSearchInput)) {
      e.preventDefault();

      const suggestionItems = document.querySelectorAll(".suggestions .search-suggestion");
      const totalItems = suggestionItems.length;

      if (totalItems === 0) return;

      let nextIndex = currentIndex;

      if (isArrowUp) {
        nextIndex = (currentIndex - 1 + totalItems) % totalItems;
      } else if (isArrowDown) {
        nextIndex = (currentIndex + 1) % totalItems;
      }

      suggestionItems[nextIndex].focus();
    } else if (onSearchInput && isArrowDown) {
      const firstSuggestionEl = document.querySelector(".first-suggestion-item");
      e.preventDefault();
      firstSuggestionEl?.focus();
    }

    e.stopPropagation();
  };

  return (
    <form css={formStyles} onSubmit={searchHandler} className='flex items-center justify-center gap-16 px-20'>
      <div className='relative mb-64 w-full'>
        <div className='border-animated flex items-end justify-between pb-6'>
          <input
            type='text'
            css={userInput}
            className='heroSearchInput px-8 pt-10 text-h5'
            placeholder='Search for a movie or tv show'
            id='inputData'
            ref={userInputRef}
            autoComplete='off'
            onChange={inputChangeHandler}
            onKeyDown={(e) => keyHandler(e, null, true)}
          />

          {isValidInput ? (
            <motion.button
              css={searchCTA}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{
                scale: 1.05
              }}
              whileTap={{ scale: 0.95 }}
              className='rounded-lg px-1620 py-8 text-p font-semibold'
              type='submit'>
              Search
            </motion.button>
          ) : null}
        </div>

        <AnimatePresence mode='wait'>
          {isValidInput && (
            <motion.div key='suggestions' {...opacityMotionTransition}>
              <div className='suggestions mt-8 drop-shadow-md'>
                {isFetching ? (
                  <div className='grid-center min-h-48'>
                    <LoadingSpinner className='text-neutral-900' />
                  </div>
                ) : searchSuggestions.length > 0 ? (
                  <Fragment>
                    {searchSuggestions.map((item, index) => (
                      <SearchSuggestion
                        key={item.id}
                        type={item.type}
                        data={item}
                        className={`search-suggestion ${matches(index, 0) ? "first-suggestion-item" : ""}`}
                        onKeyDown={(e) => keyHandler(e, index, false)}
                      />
                    ))}
                  </Fragment>
                ) : (
                  <div className='grid-center min-h-48'>
                    <P className='text-black' size='large' weight='medium'>
                      No results found
                    </P>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
};

export default GlobalSearch;
