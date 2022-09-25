import Head from 'next/head';
import {
  Error404,
  SearchContainer,
  SearchResultsContainer,
} from '../../styles/GlobalComponents';
import { EmptySearch } from '../../styles/GlobalComponents';
import { motion } from 'framer-motion';

import Link from 'next/link';
import {
  QueryContainer,
  QueryImg,
  QueryInfoWrapper,
  QueryTitle,
  QueryReleaseDate,
  QueryDescription,
} from '../../styles/GlobalComponents';
import Image from 'next/image';

const Keyword = ({ error, results, name }) => {
  let movieReleaseDates = [];

  if (!error) {
    results.forEach((item) =>
      !item.release_date
        ? movieReleaseDates.push('TBA')
        : movieReleaseDates.push(
            new Date(item.release_date.toString()).toDateString().slice(4, -5) +
              ', ' +
              new Date(item.release_date.toString()).getFullYear()
          )
    );
  }
  return (
    <>
      <Head>
        <title>{!error ? `${name} - Movies` : 'Not Found - Cinephiled'}</title>
        <meta property='og:title' content={name} />
      </Head>
      {error ? (
        <Error404>404</Error404>
      ) : (
        <>
          <SearchContainer className='keywordResults'>
            <SearchResultsContainer>
              {results.length === 0 ? (
                <EmptySearch className='display-5 text-center'>
                  No movie results for this keyword.
                </EmptySearch>
              ) : (
                <>
                  <p className='fs-4'>Results Matching : {name}</p>
                  {results.map((item, i) => (
                    <motion.div whileTap={{ scale: 0.98 }} key={item.id}>
                      <Link
                        href={`/movies/${item.id}-${item.title.replace(
                          /[' ']/g,
                          '-'
                        )}`}
                        passHref
                        scroll={false}
                      >
                        <a>
                          <QueryContainer>
                            <QueryImg className='position-relative'>
                              <Image
                                src={
                                  item.poster_path
                                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                                    : '/Images/DefaultImage.png'
                                }
                                alt='movie-poster'
                                layout='fill'
                                objectFit='cover'
                              />
                            </QueryImg>
                            <QueryInfoWrapper>
                              <div>
                                <QueryTitle>{item.title}</QueryTitle>
                                <QueryReleaseDate>
                                  {movieReleaseDates[i]}
                                </QueryReleaseDate>
                              </div>
                              <QueryDescription>
                                {item.overview}
                              </QueryDescription>
                            </QueryInfoWrapper>
                          </QueryContainer>
                        </a>
                      </Link>
                    </motion.div>
                  ))}
                </>
              )}
            </SearchResultsContainer>
          </SearchContainer>
        </>
      )}
    </>
  );
};

Keyword.getInitialProps = async (ctx) => {
  try {
    const api_key = process.env.NEXT_PUBLIC_API_KEY;
    const keyword_id = ctx.query.id;

    const response = await fetch(
      `https://api.themoviedb.org/3/keyword/${keyword_id}/movies?api_key=${api_key}&language=en-US&include_adult=false`
    );

    const keywordName = await fetch(
      `https://api.themoviedb.org/3/keyword/${keyword_id}?api_key=${api_key}`
    );

    const error = response.ok ? false : true;

    if (error) {
      throw new Error();
    } else {
      const res = await response.json();
      const keywordRes = await keywordName.json();
      return { error, results: res.results, name: keywordRes.name };
    }
  } catch {
    return { error: true };
  }
};
export default Keyword;
