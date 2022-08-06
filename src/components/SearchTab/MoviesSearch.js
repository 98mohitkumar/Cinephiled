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
import { motion } from "framer-motion";

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
            <motion.div whileTap={{ scale: 0.98 }} key={item.id}>
              <Link
                href={`/movies/${item.id}-${item.title.replace(
                  /[' ', '/']/g,
                  "-"
                )}`}
                passHref
                scroll={false}
              >
                <a>
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
                </a>
              </Link>
            </motion.div>
          ))
        )}
      </SearchResultsContainer>
    </>
  );
};

export default MoviesSearch;
