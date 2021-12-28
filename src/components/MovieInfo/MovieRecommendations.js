import {
  RecommendationsContainer,
  RecommendationsGrid,
  RecommendedImg,
  RecommendedWrapper,
} from "../../styles/GlobalComponents";

import Link from "next/link";
import { MoviesInfoTitle } from "../Popular/PopularStyles";

const MovieRecommendations = ({ movies }) => {
  movies.splice(15);
  return (
    <>
      <RecommendationsContainer>
        <RecommendationsGrid>
          {movies.map((item) => (
            <RecommendedWrapper key={item.id}>
              <Link href={"/movies/" + item.id} passHref>
                <RecommendedImg backdrop={item.backdrop_path} />
              </Link>
              <MoviesInfoTitle className="my-3 text-center">
                {item.title}
              </MoviesInfoTitle>
            </RecommendedWrapper>
          ))}
        </RecommendationsGrid>
      </RecommendationsContainer>
    </>
  );
};

export default MovieRecommendations;
