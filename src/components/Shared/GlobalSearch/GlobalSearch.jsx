import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/router";
import { Fragment, useRef, useState } from "react";

import useGetSearchSuggestions from "hooks/useGetSearchSuggestions";
import { framerTabVariants, matches } from "utils/helper";

import { searchCTA, formStyles, userInput } from "./GlobalSearchStyles";
import SearchSuggestion from "./searchSuggestion";

const GlobalSearch = () => {
  const router = useRouter();
  const userInputRef = useRef("");
  const [query, setQuery] = useState("");
  const { searchSuggestions, loading } = useGetSearchSuggestions({
    query,
    includePeople: true
  });

  const searchInputTimeout = useRef(null);

  const isValidInput = query.length > 0 && query.trim().length > 0;

  const inputChangeHandler = (e) => {
    clearTimeout(searchInputTimeout);

    searchInputTimeout.current = setTimeout(() => {
      setQuery(e.target.value);
    }, 300);
  };

  const searchHandler = async (event) => {
    event.preventDefault();

    if (isValidInput) {
      router.push(`/search/${query.replaceAll(" ", "+")}`);
      userInputRef.current = "";
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
          {(searchSuggestions?.length > 0 || loading) && (
            <motion.div
              key='suggestions'
              variants={framerTabVariants}
              initial='hidden'
              animate='visible'
              exit='hidden'
              transition={{ duration: 0.325 }}>
              <div className='suggestions mt-8 drop-shadow-md'>
                {loading ? (
                  <div className='grid min-h-20 place-items-center'>
                    <span className='text-h6 font-medium text-neutral-700'>Loading Suggestions....</span>
                  </div>
                ) : (
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
