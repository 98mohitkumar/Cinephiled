import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { Container } from '../../styles/GlobalComponents';
import { Banner, Button, Form, HeroDiv, UserInput } from './HeroStyles';
import { AnimatePresence, motion } from 'framer-motion';
import SearchSuggestion from './searchSuggestion';

const Hero = ({ searchModal }) => {
  const name = useRef('');
  const Router = useRouter();
  const [userInput, setUserInput] = useState('');
  const [showButton, setShowButton] = useState(false);

  const [movieSuggestions, setMovieSuggestions] = useState([]);
  const [tvSuggestions, setTvSuggestions] = useState([]);

  const searchInputUpdate = useRef(null);

  const inputChangeHandler = useCallback((e) => {
    clearTimeout(searchInputUpdate);

    searchInputUpdate.current = setTimeout(() => {
      setUserInput(e.target.value);
    }, 500);
  }, []);

  useEffect(() => {
    if (userInput.length === 0 || userInput.trim().length === 0) {
      setShowButton(false);
      setMovieSuggestions([]);
      setTvSuggestions([]);
    } else {
      // fetch for suggestions
      const fetchSuggestions = async () => {
        const api_key = process.env.NEXT_PUBLIC_API_KEY;
        let searchQuery = userInput;

        let year = '';
        if (searchQuery.includes('"') || searchQuery.includes("'")) {
          searchQuery = searchQuery.replace(/(^['"]|['"]$)/g, '');
        }

        if (searchQuery.includes('y:')) {
          year = searchQuery.slice(-4);
          searchQuery = searchQuery.slice(0, searchQuery.length - 7);
        }

        if (year !== '') {
          const movieResponse = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${searchQuery}&page=1&include_adult=false&year=${year}`
          );

          const tvResponse = await fetch(
            `https://api.themoviedb.org/3/search/tv?api_key=${api_key}&language=en-US&query=${searchQuery}&page=1&include_adult=false&first_air_date_year=${year}`
          );

          const error = movieResponse.ok && tvResponse.ok ? false : true;

          if (error) {
            throw new Error();
          } else {
            const movieRes = await movieResponse.json();
            const tvRes = await tvResponse.json();
            return {
              movieRes: movieResponse.ok ? movieRes.results.splice(0, 10) : [],
              tvRes: tvResponse.ok ? tvRes.results.splice(0, 10) : []
            };
          }
        } else {
          const movieResponse = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${searchQuery}&page=1&include_adult=false`
          );

          const tvResponse = await fetch(
            `https://api.themoviedb.org/3/search/tv?api_key=${api_key}&language=en-US&query=${searchQuery}&page=1&include_adult=false`
          );

          const error = movieResponse.ok && tvResponse.ok ? false : true;

          if (error) {
            throw new Error();
          } else {
            const movieRes = await movieResponse.json();
            const tvRes = await tvResponse.json();
            return {
              movieRes: movieResponse.ok ? movieRes.results.splice(0, 10) : [],
              tvRes: tvResponse.ok ? tvRes.results.splice(0, 10) : []
            };
          }
        }
      };

      fetchSuggestions()
        .then(({ movieRes, tvRes }) => {
          setMovieSuggestions(movieRes);
          setTvSuggestions(tvRes);
        })
        .catch(() => {
          setMovieSuggestions([]);
          setTvSuggestions([]);
        });

      setShowButton(true);
    }
  }, [userInput]);

  const dbSearchHandler = async (event) => {
    event.preventDefault();
    const searchQuery = userInput;

    if (
      searchQuery === undefined ||
      searchQuery.length === 0 ||
      searchQuery.trim().length === 0
    ) {
      return;
    } else {
      Router.push(`/search/${searchQuery.replace(/[' ', '/']/g, '+')}`);
      name.current.value = '';
      event.target.blur();
    }
  };

  tvSuggestions.forEach((item) => (item.type = 'tv'));

  const sortedSuggestion = useMemo(
    () =>
      movieSuggestions
        .concat(tvSuggestions)
        ?.sort((item, nextItem) => nextItem?.popularity - item?.popularity),
    [movieSuggestions, tvSuggestions]
  );

  return (
    <Container
      className='d-flex justify-content-center align-items-center position-relative'
      searchModal={searchModal}
    >
      {!searchModal && <Banner />}
      <HeroDiv searchModal={searchModal}>
        <Form onSubmit={dbSearchHandler}>
          <div className='wrapper w-100 position-relative'>
            <div className='pb-2 d-flex justify-content-center align-items-end border-animated'>
              <UserInput
                type='text'
                className='form-control pb-1 heroSearchInput'
                placeholder='Search for a movie or tv show'
                id='inputData'
                ref={name}
                autoComplete='off'
                onChange={inputChangeHandler}
              />

              {showButton && (
                <motion.div
                  whileHover={{
                    scale: 1.05
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    show={showButton}
                    className='btn d-block'
                    type='submit'
                  >
                    Search
                  </Button>
                </motion.div>
              )}
            </div>

            <AnimatePresence exitBeforeEnter>
              {sortedSuggestion.length !== 0 && (
                <motion.div
                  key='suggestions'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className='mt-2 suggestions'>
                    {sortedSuggestion.map((item) => (
                      <SearchSuggestion
                        key={item.id}
                        type={item.type === 'tv' ? 'tv' : 'movie'}
                        data={item}
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
