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

const TVSearch = ({ tvRes, tvReleaseDates }) => {
  return (
    <>
      <SearchResultsContainer>
        {tvRes.length === 0 ? (
          <EmptySearch className="display-5 text-center">
            No TV show results for this query.
          </EmptySearch>
        ) : (
          tvRes.map((item, i) => (
            <Link key={item.id} href={"/tv/" + item.id} passHref>
              <QueryContainer>
                <QueryImg poster={item.poster_path} />
                <QueryInfoWrapper>
                  <div>
                    <QueryTitle>{item.name}</QueryTitle>
                    <QueryRealeaseDate>{tvReleaseDates[i]}</QueryRealeaseDate>
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

export default TVSearch;
