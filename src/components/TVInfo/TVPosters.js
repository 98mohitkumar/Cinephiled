import {
  PostersContainer,
  PostersImg,
  PostersWrapper,
} from "../MovieInfo/MovieDetailsStyles";

const TVPosters = ({ posters }) => {
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

export default TVPosters;
