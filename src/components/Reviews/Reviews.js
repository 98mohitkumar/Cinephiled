import { Span } from "components/MovieInfo/MovieDetailsStyles";
import { Fragment } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { NoDataText } from "styles/GlobalComponents";
import { Review, ReviewAuthorImg, ReviewAuthorWrap, ReviewsWrap } from "./ReviewsStyles";

const Reviews = ({ reviews }) => {
  return (
    <Fragment>
      {reviews.length === 0 ? (
        <NoDataText className='font-bold text-center my-5'>No Reviews Yet</NoDataText>
      ) : (
        reviews.map((item) => (
          <ReviewsWrap key={item.id}>
            <ReviewAuthorWrap>
              <ReviewAuthorImg id={item.id} />
              <div>
                <Span className='font-bold'>{item.author}</Span>
                <Span className='text-sm opacity-80 block font-normal'>
                  {new Date(item.created_at).toLocaleString("en-US", {
                    month: "long"
                  })}{" "}
                  {new Date(item.updated_at).getDate()}, {new Date(item.updated_at).getFullYear()}
                </Span>
              </div>
            </ReviewAuthorWrap>

            <Review>
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>{item.content}</ReactMarkdown>
            </Review>
          </ReviewsWrap>
        ))
      )}
    </Fragment>
  );
};

export default Reviews;
