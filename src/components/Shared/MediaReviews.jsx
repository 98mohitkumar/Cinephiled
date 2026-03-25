import { Star } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import { useMediaReviewsQuery } from "apiRoutes/user";
import { reviewStyles } from "components/Shared/GlobalComponents";
import Pagination from "components/Shared/Pagination";
import FlexBox from "components/UI/FlexBox";
import H6 from "components/UI/Typography/H6";
import P from "components/UI/Typography/P";
import { DICEBEAR_URL } from "data/global";
import { getReleaseDate } from "utils/helper";

const MediaReviews = ({ mediaType, mediaId, initialReviews }) => {
  const [page, setPage] = useState(1);
  const sectionRef = useRef(null);

  const { data, isFetching } = useMediaReviewsQuery({
    mediaType,
    mediaId,
    page,
    initialReviews
  });

  const reviews = data || initialReviews;
  const reviewsData = reviews?.results || [];
  const totalPages = reviews?.total_pages || 0;
  const currentPage = reviews?.page || page;

  const handlePageChange = (nextPage) => {
    setPage(nextPage);
    requestAnimationFrame(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <div ref={sectionRef} className='mx-auto max-w-screen-lg scroll-mt-44 space-y-12'>
      <div className='space-y-8'>
        {reviewsData.map(({ id, author, author_details, updated_at, content }) => (
          <div key={id} className='border-b border-neutral-600 px-16 pb-32 last:border-b-0'>
            <div css={reviewStyles}>
              <FlexBox className='mb-16 items-center gap-16'>
                <Image
                  src={`${DICEBEAR_URL}/bottts/svg?seed=${encodeURIComponent(author)}`}
                  alt={author}
                  width={50}
                  height={50}
                  className='aspect-square min-w-[50px]'
                />

                <div>
                  <H6 className='mb-2'>{author_details?.name || author}</H6>

                  <FlexBox className='items-center gap-6'>
                    {author_details?.rating && (
                      <div className='flex h-5 items-center gap-4 rounded-2xl bg-neutral-700 px-8'>
                        <Star size={12} fill='gold' stroke='gold' />
                        <P size='small' weight='medium' className='leading-none text-neutral-300'>
                          {author_details?.rating}
                        </P>
                      </div>
                    )}
                    <P size='small' weight='medium' className='text-neutral-300'>
                      {getReleaseDate(updated_at)}
                    </P>
                  </FlexBox>
                </div>
              </FlexBox>

              <div className='space-y-4 break-words'>
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} isLoading={isFetching} />
    </div>
  );
};

export default MediaReviews;
