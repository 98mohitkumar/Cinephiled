import {
  PostersContainer,
  PostersImg,
  PostersWrapper,
} from "./MovieDetailsStyles";

const MoviePosters = ({ posters }) => {
  return (
    <>
      <PostersContainer>
        <PostersWrapper>
          {posters.map((item, i) => (
            <PostersImg key={i} poster={item.file_path} />
          ))}
        </PostersWrapper>
      </PostersContainer>
    </>
  );
};

export default MoviePosters;
