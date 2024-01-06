import { Span } from "components/MovieInfo/MovieDetailsStyles";
import PlaceholderText from "components/PlaceholderText";
import { Fragment } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { getReleaseDate } from "src/utils/helper";
import { Review, ReviewAuthorImg, ReviewAuthorWrap, ReviewsWrap } from "./ReviewsStyles";

const Reviews = ({ reviews }) => {
  return (
    <Fragment>
      {reviews?.length > 0 ? (
        reviews.map((item) => (
          <ReviewsWrap key={item.id}>
            <ReviewAuthorWrap>
              <ReviewAuthorImg id={item.id} />
              <div>
                <Span className='font-bold'>{item.author}</Span>
                <Span className='text-sm opacity-80 block font-normal'>
                  {getReleaseDate(item.updated_at)}
                </Span>
              </div>
            </ReviewAuthorWrap>

            <Review>
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>{item.content}</ReactMarkdown>
            </Review>
          </ReviewsWrap>
        ))
      ) : (
        <PlaceholderText>No Reviews Yet</PlaceholderText>
      )}
    </Fragment>
  );
};

export default Reviews;
