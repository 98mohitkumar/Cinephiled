import Backdrops from "components/Backdrops/Backdrops";
import DominantColor from "components/DominantColor/DominantColor";
import MoviesTemplate from "components/MediaTemplate/MoviesTemplate";
import MetaWrapper from "components/MetaWrapper";
import {
  GenreWrap,
  Gradient,
  HeroInfoTitle,
  HeroInfoWrapper,
  Overview,
  RatingWrapper,
  Rounded,
  Span
} from "components/MovieInfo/MovieDetailsStyles";
import Posters from "components/Posters/Posters";
import { apiEndpoints, blurPlaceholder } from "globals/constants";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { fetchOptions, getCleanTitle, getRating } from "src/utils/helper";
import {
  DetailsHeroWrap,
  Error404,
  HeroBg,
  HeroBgContainer,
  HeroDetailsContainer,
  HeroImg,
  HeroImgWrapper,
  ModulesWrapper
} from "styles/GlobalComponents";

export const Collection = ({ collectionData, error, movieGenresData, collectionImagesData }) => {
  const { id, name, overview, backdrop_path, poster_path, parts } = collectionData;

  const allGenres = Array.from(new Set(parts.map((part) => part.genre_ids).flat()))
    .map((genreId) => movieGenresData.genres.find((genre) => genre.id === genreId))
    .splice(0, 5);

  const validRatedParts = parts.filter(
    (part) => !Number.isNaN(part.vote_average) && part.vote_average > 0
  );

  const averageRating =
    validRatedParts.length > 0
      ? validRatedParts.reduce((acc, part) => acc + part.vote_average, 0) / validRatedParts.length
      : null;

  const posters = collectionImagesData?.posters || [];
  const backdrops = collectionImagesData?.backdrops || [];

  return (
    <Fragment>
      <MetaWrapper
        title={error ? "Not Found - Cinephiled" : `${name} - Cinephiled`}
        image={`https://image.tmdb.org/t/p/w780${backdrop_path}`}
        description={overview}
        url={`https://cinephiled.vercel.app/collection/${id}-${getCleanTitle(name)}`}
      />

      {error ? (
        <Error404>404</Error404>
      ) : (
        <Fragment>
          <HeroDetailsContainer className='relative mb-auto'>
            <HeroBgContainer className='absolute'>
              <HeroBg className='absolute text-center'>
                <Image
                  src={
                    backdrop_path
                      ? `https://image.tmdb.org/t/p/w1280${backdrop_path}`
                      : "/Images/Hex.webp"
                  }
                  alt='movie-backdrop'
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              </HeroBg>

              {/* color gradient overlay */}
              <DominantColor image={poster_path} />
            </HeroBgContainer>

            <DetailsHeroWrap>
              <HeroImgWrapper>
                <HeroImg className='relative text-center'>
                  <Image
                    src={
                      poster_path
                        ? `https://image.tmdb.org/t/p/w500${poster_path}`
                        : "/Images/DefaultImage.png"
                    }
                    alt='movie-poster'
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                    placeholder='blur'
                    blurDataURL={blurPlaceholder}
                  />
                </HeroImg>
              </HeroImgWrapper>

              <Gradient />

              <HeroInfoWrapper className='max-w-5xl'>
                <HeroInfoTitle className='mb-2'>{name}</HeroInfoTitle>

                {allGenres.length > 0 ? (
                  <div className='my-3'>
                    <GenreWrap className='font-bold'>
                      {allGenres.map((item, i) => (
                        <Link
                          key={item.id}
                          href={`/genre/${
                            item.id.toString() + "-" + item.name.replaceAll(" ", "-")
                          }/movies`}
                          passHref>
                          <Rounded className={allGenres.length == i + 1 ? "sep" : ""}>
                            {item.name}
                          </Rounded>
                        </Link>
                      ))}
                    </GenreWrap>
                  </div>
                ) : null}

                {overview ? <Overview className='font-normal my-4'>{overview}</Overview> : null}

                <RatingWrapper>
                  <Fragment>
                    <Span className='text-[calc(1.525rem_+_3.3vw)] xl:text-6xl font-bold'>
                      {getRating(averageRating)}
                    </Span>
                    <span> / 10</span>
                  </Fragment>
                </RatingWrapper>

                <div className='mt-4'>
                  <span className='font-semibold'>Number of movies:</span>{" "}
                  <span>{parts.length}</span>
                </div>
              </HeroInfoWrapper>
            </DetailsHeroWrap>
          </HeroDetailsContainer>

          <section className='relative'>
            <DominantColor image={backdrop_path} tint isUsingBackdrop />

            <div className='relative z-10'>
              {parts.length > 0 ? (
                <ModulesWrapper>
                  <section className='mt-8'>
                    <span className='text-[calc(1.325rem_+_.9vw)] lg:text-[2rem] leading-8 mb-5 md:mb-8 font-semibold block'>
                      Movies ({parts.length})
                    </span>

                    <MoviesTemplate movies={parts} />
                  </section>
                </ModulesWrapper>
              ) : null}

              {backdrops?.length > 0 ? (
                <Fragment>
                  <ModulesWrapper>
                    <section className='mt-12'>
                      <span className='text-[calc(1.325rem_+_.9vw)] lg:text-[2rem] leading-8 mb-5 md:mb-8 font-semibold block'>
                        Backdrops ({backdrops.length})
                      </span>
                      <Backdrops backdrops={backdrops} />
                    </section>
                  </ModulesWrapper>
                </Fragment>
              ) : null}

              {posters?.length > 0 ? (
                <ModulesWrapper>
                  <section className='mt-12'>
                    <span className='text-[calc(1.325rem_+_.9vw)] lg:text-[2rem] leading-8 mb-5 md:mb-8 font-semibold block'>
                      Posters ({posters?.length})
                    </span>
                  </section>

                  <Posters posters={posters} />
                </ModulesWrapper>
              ) : null}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

Collection.getInitialProps = async ({ query }) => {
  try {
    const collectionId = query.collectionId;
    const [collectionRes, movieGenresRes, collectionImagesRes] = await Promise.all([
      fetch(apiEndpoints.collection.collectionDetails(collectionId), fetchOptions()),
      fetch(apiEndpoints.movie.movieGenreList, fetchOptions()),
      fetch(apiEndpoints.collection.collectionImages(collectionId), fetchOptions())
    ]);

    if (!collectionRes.ok || !movieGenresRes.ok) {
      throw new Error("Failed to fetch");
    }

    const [collectionData, movieGenresData, collectionImagesData] = await Promise.all([
      collectionRes.json(),
      movieGenresRes.json(),
      collectionImagesRes.json()
    ]);

    return { collectionData: collectionData, error: false, movieGenresData, collectionImagesData };
  } catch {
    return { error: true };
  }
};

export default Collection;
