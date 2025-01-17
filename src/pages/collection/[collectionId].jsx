import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

import { GenreTag, mediaDetailsWrapper } from "components/Shared/GlobalComponents";
import MediaHeroBackground from "components/Shared/MediaHeroBackground/MediaHeroBackground";
import MetaWrapper from "components/Shared/MetaWrapper";
import MediaImageTemplateGrid from "components/Templates/MediaImageTemplateGrid";
import MediaTemplateGrid from "components/Templates/MediaTemplateGrid";
import FlexBox from "components/UI/FlexBox";
import LayoutContainer from "components/UI/LayoutContainer";
import H1 from "components/UI/Typography/H1";
import H3 from "components/UI/Typography/H3";
import P from "components/UI/Typography/P";
import { apiEndpoints } from "data/apiEndpoints";
import { blurPlaceholder, siteInfo } from "data/global";
import { getSortedItems } from "utils/getSortedItems";
import { cn, fetchOptions, getCleanTitle, matches } from "utils/helper";
import { getTMDBImage } from "utils/imageHelper";

const LAYOUT_TYPES = {
  standard: "standard",
  poster: "poster",
  blank: "blank"
};

export const Collection = ({ collectionData, movieGenresData, collectionImagesData }) => {
  const { id, name, overview, backdrop_path, poster_path, parts } = collectionData;
  const allGenres = Array.from(new Set(parts.map((part) => part.genre_ids).flat()))
    .map((genreId) => movieGenresData.genres.find((genre) => matches(genre.id, genreId)))
    .splice(0, 5);

  const posters = collectionImagesData?.posters || [];
  const backdrops = collectionImagesData?.backdrops || [];

  const sortedByReleaseDate = getSortedItems({ items: parts, sortBy: "release_date" });

  let LAYOUT_TYPE = LAYOUT_TYPES.standard;

  if (backdrop_path) {
    LAYOUT_TYPE = LAYOUT_TYPES.standard;
  } else if (!backdrop_path && poster_path) {
    LAYOUT_TYPE = LAYOUT_TYPES.poster;
  } else {
    LAYOUT_TYPE = LAYOUT_TYPES.blank;
  }

  return (
    <Fragment>
      <MetaWrapper
        title={`${name} - Cinephiled`}
        description={overview}
        image={getTMDBImage({ type: "backdrop", path: backdrop_path, size: "w1280" })}
        url={`${siteInfo.url}/collection/${id}-${getCleanTitle(name)}`}
      />

      <section className='relative'>
        <MediaHeroBackground backdropPath={backdrop_path} posterPath={poster_path} alt='collection-backdrop' />
        <LayoutContainer
          className={cn("flex items-center gap-32 lg:py-4864", {
            "no-min-height py-2464 max-lg:flex-col max-lg:items-start": matches(LAYOUT_TYPE, LAYOUT_TYPES.poster),
            blank: matches(LAYOUT_TYPE, LAYOUT_TYPES.blank)
          })}
          css={mediaDetailsWrapper}>
          <div
            className={cn("relative hidden aspect-poster min-w-64", {
              block: matches(LAYOUT_TYPE, LAYOUT_TYPES.poster)
            })}>
            <Image
              src={getTMDBImage({ path: poster_path, type: "poster" })}
              alt={name}
              fill
              className='rounded-xl object-cover shadow-xl'
              placeholder='blur'
              blurDataURL={blurPlaceholder}
            />
          </div>

          <div
            className={cn("w-full max-w-full", {
              "lg:max-w-md xl:max-w-xl 2xl:max-w-2xl": matches(LAYOUT_TYPE, LAYOUT_TYPES.standard),
              "lg:max-w-2xl": matches(LAYOUT_TYPE, LAYOUT_TYPES.poster) || matches(LAYOUT_TYPE, LAYOUT_TYPES.blank)
            })}>
            <H1 className='mb-16 text-pretty'>{name}</H1>

            {allGenres.length > 0 ? (
              <FlexBox className='mb-16 flex-wrap items-center gap-10'>
                {allGenres.map((item) => (
                  <Link key={item.id} href={`/genre/${item.id.toString() + "-" + getCleanTitle(item.name)}/movies`} passHref>
                    <GenreTag>
                      <P weight='medium'>{item.name}</P>
                    </GenreTag>
                  </Link>
                ))}
              </FlexBox>
            ) : null}

            {overview ? <P size='large'>{overview}</P> : null}
          </div>
        </LayoutContainer>
      </section>

      {parts.length > 0 ? (
        <LayoutContainer className='py-3248'>
          <H3 className='mb-1620'>Movies</H3>

          <MediaTemplateGrid media={sortedByReleaseDate} mediaType='movie' />
        </LayoutContainer>
      ) : null}

      {posters?.length > 0 ? (
        <LayoutContainer className='py-3248'>
          <H3 className='mb-1620'>Posters</H3>
          <MediaImageTemplateGrid items={posters} type='posters' />
        </LayoutContainer>
      ) : null}

      {backdrops?.length > 0 ? (
        <LayoutContainer className='py-3248'>
          <H3 className='mb-1620'>Backdrops</H3>
          <MediaImageTemplateGrid items={backdrops} type='backdrops' />
        </LayoutContainer>
      ) : null}
    </Fragment>
  );
};

export const getServerSideProps = async ({ query }) => {
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

    return {
      props: { collectionData: collectionData, movieGenresData, collectionImagesData }
    };
  } catch {
    return {
      notFound: true
    };
  }
};

export default Collection;
