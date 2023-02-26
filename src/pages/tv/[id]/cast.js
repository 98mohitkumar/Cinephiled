import {
  CastContainer,
  CastGrid,
  CastImg,
  CastWrapper
} from 'components/Cast/CastStyles';
import MetaWrapper from 'components/MetaWrapper';
import { HeroInfoTitle, Span } from 'components/MovieInfo/MovieDetailsStyles';
import { motion } from 'framer-motion';
import { apiEndpoints } from 'globals/constants';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import { CastPageInfo, Error404 } from 'styles/GlobalComponents';

const Cast = ({ tvData: { id, title, year, backdrop }, cast, error }) => {
  return (
    <Fragment>
      <MetaWrapper
        title={
          !error
            ? `${title} (${year}) - Cast -- cinephiled`
            : 'Not Found - Cinephiled'
        }
        description={`${title} cast`}
        image={`https://image.tmdb.org/t/p/w780${backdrop}`}
        url={`https://cinephiled.vercel.app/tv/${id}/cast`}
      />

      {error ? (
        <Error404>404</Error404>
      ) : (
        <CastContainer className='mb-auto'>
          <CastGrid>
            <CastPageInfo>
              <HeroInfoTitle className='mb-4'>
                {title} ({year})
              </HeroInfoTitle>

              <h3 className='mb-0 cast-count'>{`Cast (${cast.length})`}</h3>
            </CastPageInfo>

            {cast.map((item) => (
              <CastWrapper key={item.id}>
                <Link
                  href={`/person/${item.id}-${item.name.replace(
                    /[' ']/g,
                    '-'
                  )}`}
                  passHref
                >
                  <a>
                    <motion.div
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.1 }
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <CastImg className='position-relative text-center'>
                        <Image
                          src={
                            item.profile_path
                              ? `https://image.tmdb.org/t/p/w276_and_h350_face${item.profile_path}`
                              : '/Images/DefaultAvatar.png'
                          }
                          alt='cast-image'
                          layout='fill'
                          objectFit='cover'
                          objectPosition='top'
                          placeholder='blur'
                          blurDataURL='data:image/webp;base64,UklGRgwCAABXRUJQVlA4WAoAAAAgAAAAAQAAAgAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggHgAAAJABAJ0BKgIAAwAHQJYlpAAC51m2AAD+5R4qGAAAAA=='
                        />
                      </CastImg>
                    </motion.div>
                  </a>
                </Link>

                <div className='mt-3'>
                  <Span className='fw-bold movieCastHead d-block'>
                    {item?.roles[0]?.character}
                  </Span>
                  <Span className='movieCastName d-block'>{item.name}</Span>
                  <Span className='movieCastName d-block episode-count'>
                    {item?.roles[0]?.episode_count} episodes
                  </Span>
                </div>
              </CastWrapper>
            ))}
          </CastGrid>
        </CastContainer>
      )}
    </Fragment>
  );
};

Cast.getInitialProps = async (ctx) => {
  try {
    const { id } = ctx.query;
    const res = await fetch(apiEndpoints.tv.getTvCredits({ id }));

    const data = await res.json();

    const releaseYear = data?.first_air_date
      ? new Date(data?.first_air_date).getFullYear()
      : 'TBA';

    return {
      tvData: {
        title: data?.name ?? '',
        year: releaseYear,
        backdrop: data?.backdrop_path,
        id: data?.id
      },
      cast: data?.aggregate_credits?.cast,
      error: false
    };
  } catch {
    return {
      tvData: {},
      cast: [],
      error: true
    };
  }
};

export default Cast;
