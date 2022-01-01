import { NoDataText } from "../../styles/GlobalComponents";
import {
  Review,
  ReviewAuthorImg,
  ReviewAuthorWrap,
  ReviewsContainer,
  ReviewsWrap,
  Span,
} from "./MovieDetailsStyles";

const MovieReviews = ({ reviews }) => {
  const filtered = [];
  const movieReviews = reviews;
  movieReviews.forEach((item) =>
    filtered.push(
      item.content
        .replace(/\n|\r\n|\r/g, "<br/>")
        .replace(/(?:\*)(?:(?!\s))((?:(?!\*|\n).)+)(?:\*)/g, "<b>$1</b>")
        .replace(/(?:_)(?:(?!\s))((?:(?!\n|_).)+)(?:_)/g, "<i>$1</i>")
        .replace(/(?:~)(?:(?!\s))((?:(?!\n|~).)+)(?:~)/g, "<s>$1</s>")
        .replace(/(?:--)(?:(?!\s))((?:(?!\n|--).)+)(?:--)/g, "<u>$1</u>")
        .replace(/(?:```)(?:(?!\s))((?:(?!\n|```).)+)(?:```)/g, "<tt>$1</tt>")
    )
  );

  filtered.forEach((item, i) => (movieReviews[i].content = item));
  return (
    <>
      <ReviewsContainer>
        {movieReviews.length === 0 ? (
          <NoDataText className="fw-bold text-center my-5">
            No Reviews Yet
          </NoDataText>
        ) : (
          movieReviews.map((item) => (
            <ReviewsWrap key={item.id}>
              <ReviewAuthorWrap>
                <ReviewAuthorImg id={item.id} />
                <Span>{item.author}</Span>
              </ReviewAuthorWrap>

              <Review dangerouslySetInnerHTML={{ __html: item.content }} />
            </ReviewsWrap>
          ))
        )}
      </ReviewsContainer>
    </>
  );
};

export default MovieReviews;
