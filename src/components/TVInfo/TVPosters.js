import { NoDataText } from "../../styles/GlobalComponents";
import {
  PostersContainer,
  PostersImg,
  PostersWrapper,
} from "../MovieInfo/MovieDetailsStyles";

const TVPosters = ({ posters }) => {
  return (
    <>
      <PostersContainer>
        {posters.length === 0 ? (
          <NoDataText className="display-3 fw-bold text-center my-5">
            No Posters Yet
          </NoDataText>
        ) : (
          <PostersWrapper>
            {posters.map((item, i) => (
              <PostersImg key={i} poster={item.file_path} />
            ))}
          </PostersWrapper>
        )}
      </PostersContainer>
    </>
  );
};

export default TVPosters;