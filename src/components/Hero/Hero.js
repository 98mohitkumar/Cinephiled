import { AnimatePresence, motion } from "framer-motion";
import useGetSearchSuggestions from "hooks/useGetSearchSuggestions";
import { useRouter } from "next/router";
import { useState, useRef } from "react";
import { framerTabVariants } from "src/utils/helper";
import { Container } from "styles/GlobalComponents";
import { SearchCTA, Form, HeroDiv, UserInput } from "./HeroStyles";
import SearchSuggestion from "./searchSuggestion";

const Hero = ({ banner = null }) => {
  const userInputRef = useRef("");
  const router = useRouter();
  const [userInput, setUserInput] = useState("");
  const { searchSuggestions } = useGetSearchSuggestions(userInput);
  const searchInputUpdate = useRef(null);

  const inputChangeHandler = (e) => {
    clearTimeout(searchInputUpdate);

    searchInputUpdate.current = setTimeout(() => {
      setUserInput(e.target.value);
    }, 1000);
  };

  const searchHandler = async (event) => {
    event.preventDefault();

    if (userInput.length === 0 || userInput.trim().length === 0) {
      return;
    } else {
      router.push(`/search/${userInput.replaceAll(" ", "+")}`);
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
    <Container className='relative mb-auto'>
      {banner ? <div className='overflow-wrapper'>{banner}</div> : null}
      <HeroDiv searchModal={!banner}>
        <Form onSubmit={searchHandler}>
          <div className='mb-16 w-full relative'>
            <div className='pb-1.5 flex justify-between items-end border-animated'>
              <UserInput
                type='text'
                className='px-2 pt-[10px] heroSearchInput'
                placeholder='Search for a movie or tv show'
                id='inputData'
                ref={userInputRef}
                autoComplete='off'
                onChange={inputChangeHandler}
                onKeyDown={(e) => keyHandler(e, null, true)}
              />

              {userInput?.trim()?.length > 0 ? (
                <SearchCTA
                  as={motion.button}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{
                    scale: 1.1
                  }}
                  whileTap={{ scale: 0.9 }}
                  className='rounded-md text-base inline-block'
                  type='submit'>
                  Search
                </SearchCTA>
              ) : null}
            </div>

            <AnimatePresence exitBeforeEnter>
              {searchSuggestions?.length > 0 && (
                <motion.div
                  key='suggestions'
                  variants={framerTabVariants}
                  initial='hidden'
                  animate='visible'
                  exit='hidden'
                  transition={{ duration: 0.5 }}>
                  <div className='mt-2 suggestions'>
                    {searchSuggestions.map((item, index) => (
                      <SearchSuggestion
                        key={item.id}
                        type={item.type === "tv" ? "tv" : "movie"}
                        data={item}
                        className={`search-suggestion ${
                          index === 0 ? "first-suggestion-item" : ""
                        }`}
                        onKeyDown={(e) => keyHandler(e, index, false)}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Form>
      </HeroDiv>
    </Container>
  );
};

export default Hero;
