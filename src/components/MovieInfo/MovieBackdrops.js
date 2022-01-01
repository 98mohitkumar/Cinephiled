import { NoDataText } from "../../styles/GlobalComponents";
import {
  BackdropsContainer,
  BackdropsImg,
  BackdropsImgContainer,
  BackdropsWrapper,
} from "./MovieDetailsStyles";

const MovieBackdrops = ({ backdrops }) => {
  return (
    <>
      <BackdropsContainer>
        {backdrops.length === 0 ? (
          <NoDataText className="fw-bold text-center my-5">
            No Backdrops Yet
          </NoDataText>
        ) : (
          <BackdropsWrapper>
            {backdrops.map((item, i) => (
              <BackdropsImgContainer key={i}>
                <BackdropsImg backdrop={item.file_path} />
              </BackdropsImgContainer>
            ))}
          </BackdropsWrapper>
        )}
      </BackdropsContainer>
    </>
  );
};

export default MovieBackdrops;
