import Head from "next/head";
import {
  Error404,
  SearchContainer,
  SearchResultsContainer,
} from "../../styles/GlobalComponents";
import { EmptySearch } from "../../styles/GlobalComponents";
import { motion } from "framer-motion";

import Link from "next/link";
import {
  QueryContainer,
  QueryImg,
  QueryInfoWrapper,
  QueryTitle,
  QueryRealeaseDate,
  QueryDescription,
} from "../../styles/GlobalComponents";

const Keyword = ({ error, results, name }) => {
  let movieReleaseDates = [];

  if (!error) {
    results.forEach((item) =>
      !item.release_date
        ? movieReleaseDates.push("TBA")
        : movieReleaseDates.push(
            new Date(item.release_date.toString()).toDateString().slice(4, -5) +
              ", " +
              new Date(item.release_date.toString()).getFullYear()
          )
    );
  }
  return (
    <>
      <Head>
        <title>
          {!error ? `"${name}" - Movies` : "Not Found - Cinephiled"}
        </title>
        <meta property="og:image" content="https://i.imgur.com/Jtl3tJG.png" />
        <meta property="og:title" content={name}></meta>
      </Head>
      {error ? (
        <Error404>404</Error404>
      ) : (
        <>
          <SearchContainer className="keywordResults">
            <SearchResultsContainer>
              {results.length === 0 ? (
                <EmptySearch className="display-5 text-center">
                  No movie results for this keyword.
                </EmptySearch>
              ) : (
                <>
                  <p className="fs-4">Results Matching : {name}</p>
                  {results.map((item, i) => (
                    <motion.div whileTap={{ scale: 0.98 }} key={item.id}>
                      <Link href={"/movies/" + item.id} passHref scroll={false}>
                        <QueryContainer>
                          <QueryImg poster={item.poster_path} />
                          <QueryInfoWrapper>
                            <div>
                              <QueryTitle>{item.title}</QueryTitle>
                              <QueryRealeaseDate>
                                {movieReleaseDates[i]}
                              </QueryRealeaseDate>
                            </div>
                            <QueryDescription>{item.overview}</QueryDescription>
                          </QueryInfoWrapper>
                        </QueryContainer>
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
