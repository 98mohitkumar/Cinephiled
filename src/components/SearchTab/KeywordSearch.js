import {
  EmptySearch,
  SearchResultsContainer,
} from "../../styles/GlobalComponents";
import { Keyword } from "./SearchTabStyles";
import Link from "next/link";

const KeywordSearch = ({ keywords }) => {
  return (
    <>
      {keywords.length === 0 ? (
        <EmptySearch className="display-5 text-center">
          No Keywords for this query.
        </EmptySearch>
      ) : (
        <SearchResultsContainer>
          {keywords.map((item) => (
            <Link key={item.id} href={`/keyword/${item.id}`} passHref>
              <Keyword>{item.name}</Keyword>
            </Link>
          ))}
        </SearchResultsContainer>
      )}
    </>
  );
};

export default KeywordSearch;
