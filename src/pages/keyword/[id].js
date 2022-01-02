import Head from "next/head";
import Footer from "../../components/Footer/Footer";
import Navigation from "../../components/Navigation/Navigation";
import {
  DetailsWrapper,
  Error404,
  SearchContainer,
  SearchResultsContainer,
  Wrapper,
} from "../../styles/GlobalComponents";
import { EmptySearch } from "../../styles/GlobalComponents";

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

  if (error === false) {
    results.forEach((item) =>
      item.release_date === "" || item.release_date === undefined
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
          {error === false ? `"${name}" - Movies` : "Not Found - Cinephiled"}
        </title>
      </Head>
      <Wrapper>
        <DetailsWrapper className="d-flex flex-column justify-content-between">
          <Navigation />
          {error ? (
            <Error404>404</Error404>
          ) : (
            <>
              <SearchContainer>
                <SearchResultsContainer>
                  {results.length === 0 ? (
                    <EmptySearch className="display-5 text-center">
                      No movie results for this keyword.
                    </EmptySearch>
                  ) : (
                    <>
                      <p className="fs-4">Results Matching : {name}</p>
                      {results.map((item, i) => (
                        <Link
                          key={item.id}
                          href={"/movies/" + item.id}
                          passHref
                        >
                          <QueryContainer>
                            <QueryImg poster={item.poster_path} />
                            <QueryInfoWrapper>
                              <div>
                                <QueryTitle>{item.title}</QueryTitle>
                                <QueryRealeaseDate>
                                  {movieReleaseDates[i]}
                                </QueryRealeaseDate>
                              </div>
                              <QueryDescription>
                                {item.overview}
                              </QueryDescription>
                            </QueryInfoWrapper>
                          </QueryContainer>
                        </Link>
                      ))}
                    </>
                  )}
                </SearchResultsContainer>
              </SearchContainer>
            </>
          )}
          <Footer />
        </DetailsWrapper>
      </Wrapper>
    </>
  );
};

Keyword.getInitialProps = async (ctx) => {
  const api_key = process.env.NEXT_PUBLIC_API_KEY;
  const keyword_id = ctx.query.id;

  const response = await fetch(
    `https://api.themoviedb.org/3/keyword/${keyword_id}/movies?api_key=${api_key}&language=en-US&include_adult=false`
  );

  const keywordName = await fetch(
    `https://api.themoviedb.org/3/keyword/${keyword_id}?api_key=${api_key}`
  );

  const error = response.ok ? false : true;

  if (error === true) {
    return { error };
  } else {
    const res = await response.json();
    const keywordRes = await keywordName.json();
    return { error, results: res.results, name: keywordRes.name };
  }
};
export default Keyword;
