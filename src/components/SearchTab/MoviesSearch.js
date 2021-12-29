import {
  SearchResultsContainer,
  EmptySearch,
  QueryContainer,
  QueryImg,
  QueryTitle,
  QueryInfoWrapper,
  QueryRealeaseDate,
  QueryDescription,
} from "../../styles/GlobalComponents";
import Link from "next/link";

const MoviesSearch = ({ movieRes, movieReleaseDates }) => {
  return (
    <>
      <SearchResultsContainer>
        {movieRes.length === 0 ? (
          <EmptySearch className="display-5 text-center">
            No movie results for this query.
          </EmptySearch>
        ) : (
          movieRes.map((item, i) => (
            <Link key={item.id} href={"/movies/" + item.id} passHref>
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
          ))
        )}
      </SearchResultsContainer>
    </>
  );
};

export default MoviesSearch;
