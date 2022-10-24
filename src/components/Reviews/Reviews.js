import { NoDataText } from '../../styles/GlobalComponents';
import {
  Review,
  ReviewAuthorImg,
  ReviewAuthorWrap,
  ReviewsContainer,
  ReviewsWrap
} from './ReviewsStyles';
import { Span } from '../MovieInfo/MovieDetailsStyles';
import { useMemo } from 'react';

const Reviews = ({ reviews }) => {
  const filtered = useMemo(
    () =>
      reviews.map((item) => ({
        ...item,
        content: item.content
          .replace(/\n|\r\n|\r/g, '<br/>')
          .replace(/(?:\*)(?:(?!\s))((?:(?!\*|\n).)+)(?:\*)/g, '<b>$1</b>')
          .replace(/(?:_)(?:(?!\s))((?:(?!\n|_).)+)(?:_)/g, '<i>$1</i>')
          .replace(/(?:~)(?:(?!\s))((?:(?!\n|~).)+)(?:~)/g, '<s>$1</s>')
          .replace(/(?:--)(?:(?!\s))((?:(?!\n|--).)+)(?:--)/g, '<u>$1</u>')
          .replace(/(?:```)(?:(?!\s))((?:(?!\n|```).)+)(?:```)/g, '<tt>$1</tt>')
      })),
    [reviews]
  );

  return (
    <>
      <ReviewsContainer>
        {filtered.length === 0 ? (
          <NoDataText className='fw-bold text-center my-5'>
            No Reviews Yet
          </NoDataText>
        ) : (
          filtered.map((item) => (
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

export default Reviews;