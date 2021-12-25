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
        <BackdropsWrapper>
          {backdrops.map((item, i) => (
            <BackdropsImgContainer key={i}>
              <BackdropsImg backdrop={item.file_path} />
            </BackdropsImgContainer>
          ))}
        </BackdropsWrapper>
      </BackdropsContainer>
    </>
  );
};

export default MovieBackdrops;
