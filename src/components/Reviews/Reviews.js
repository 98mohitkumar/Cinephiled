import { Span } from 'components/MovieInfo/MovieDetailsStyles';
import ReactMarkdown from 'react-markdown';
import { NoDataText } from 'styles/GlobalComponents';
import {
  Review,
  ReviewAuthorImg,
  ReviewAuthorWrap,
  ReviewsContainer,
  ReviewsWrap
} from './ReviewsStyles';

const Reviews = ({ reviews }) => {
  return (
    <ReviewsContainer>
      {reviews.length === 0 ? (
        <NoDataText className='fw-bold text-center my-5'>
          No Reviews Yet
        </NoDataText>
      ) : (
        reviews.map((item) => (
          <ReviewsWrap key={item.id}>
            <ReviewAuthorWrap>
              <ReviewAuthorImg id={item.id} />
              <Span>{item.author}</Span>
            </ReviewAuthorWrap>

            <Review>
              <ReactMarkdown>{item.content}</ReactMarkdown>
            </Review>
          </ReviewsWrap>
        ))
      )}
    </ReviewsContainer>
  );
};

export default Reviews;
