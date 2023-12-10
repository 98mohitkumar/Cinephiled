import { CastGrid, CastImg, CastWrapper } from "components/Cast/CastStyles";
import MetaWrapper from "components/MetaWrapper";
import { HeroInfoTitle, Span } from "components/MovieInfo/MovieDetailsStyles";
import { motion } from "framer-motion";
import { apiEndpoints } from "globals/constants";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { Error404, ModulesWrapper } from "styles/GlobalComponents";

const Cast = ({ movieData: { id, title, year, backdrop }, cast, error }) => {
  return (
    <Fragment>
      <MetaWrapper
        title={!error ? `${title} (${year}) - Cast - cinephiled` : "Not Found - Cinephiled"}
        description={`${title} cast`}
        image={`https://image.tmdb.org/t/p/w780${backdrop}`}
        url={`https://cinephiled.vercel.app/movies/${id}/cast`}
      />

      {error ? (
        <Error404>404</Error404>
      ) : (
        <ModulesWrapper>
          <div className='text-center my-6'>
            <HeroInfoTitle className='mb-4'>
              {title} ({year})
            </HeroInfoTitle>

            <h3 className='mb-0 text-xl md:text-2xl font-semibold'>{`Cast (${cast.length})`}</h3>
          </div>

          <CastGrid>
            {cast.map((item) => (
              <CastWrapper key={item.credit_id}>
                <Link href={`/person/${item.id}-${item.name.replace(/[' ', '/']/g, "-")}`} passHref>
                  <a>
                    <motion.div
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.1 }
                      }}
                      whileTap={{ scale: 0.95 }}>
                      <CastImg className='relative text-center'>
                        <Image
                          src={
                            item.profile_path
                              ? `https://image.tmdb.org/t/p/w276_and_h350_face${item.profile_path}`
                              : "/Images/DefaultAvatar.png"
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
                  <Span className='font-bold movieCastHead block'>{item.character}</Span>
                  <Span className='movieCastName block'>{item.name}</Span>
                </div>
              </CastWrapper>
            ))}
          </CastGrid>
        </ModulesWrapper>
      )}
    </Fragment>
  );
};

Cast.getInitialProps = async (ctx) => {
  try {
    const { id } = ctx.query;
    const res = await fetch(apiEndpoints.movie.getMovieCredits({ id }));

    const data = await res.json();

    const releaseYear = !data?.release_date ? "TBA" : new Date(data?.release_date).getFullYear();

    return {
      movieData: {
        title: data?.title,
        year: releaseYear,
        id: data?.id,
        backdrop: data?.backdrop
      },
      cast: data?.credits?.cast,
      error: false
    };
  } catch {
    return {
      movieData: {},
      cast: [],
      error: true
    };
  }
};

export default Cast;
