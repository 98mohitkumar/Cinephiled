import Image from "next/image";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import { reviewStyles } from "components/Shared/GlobalComponents";
import FlexBox from "components/UI/FlexBox";
import H6 from "components/UI/Typography/H6";
import P from "components/UI/Typography/P";
import { getReleaseDate } from "utils/helper";

const MediaReviews = ({ reviews }) => {
  return (
    <div className='mx-auto max-w-screen-lg space-y-8'>
      {reviews.map((review) => (
        <div key={review.id} className='border-b border-neutral-600 pb-32 last:border-b-0'>
          <FlexBox className='items-start gap-16'>
            <Image
              src={`https://api.dicebear.com/6.x/bottts/svg?seed=${review.author}`}
              alt={review.author}
              width={50}
              height={50}
              className='aspect-square min-w-[50px] max-sm:hidden'
            />

            <div css={reviewStyles}>
              <FlexBox className='mb-16 items-center gap-16'>
                <Image
                  src={`https://api.dicebear.com/6.x/bottts/svg?seed=${review.author}`}
                  alt={review.author}
                  width={50}
                  height={50}
                  className='aspect-square min-w-[50px] above-sm:hidden'
                />

                <div>
                  <H6 className='mb-4'>{review.author}</H6>
                  <P size='small' weight='medium' className='text-neutral-400'>
                    {getReleaseDate(review.updated_at)}
                  </P>
                </div>
              </FlexBox>

              <div className='content-wrapper space-y-4'>
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{review.content}</ReactMarkdown>
              </div>
            </div>
          </FlexBox>
        </div>
      ))}
    </div>
  );
};

export default MediaReviews;
