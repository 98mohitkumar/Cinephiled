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
import { siteInfo } from "data/global";
import { getSortedItems } from "utils/getSortedItems";
import { fetchOptions, getCleanTitle } from "utils/helper";
import { getTMDBImage } from "utils/imageHelper";

export const Collection = ({ collectionData, movieGenresData, collectionImagesData }) => {
  const { id, name, overview, backdrop_path, poster_path, parts } = collectionData;
  const allGenres = Array.from(new Set(parts.map((part) => part.genre_ids).flat()))
    .map((genreId) => movieGenresData.genres.find((genre) => genre.id === genreId))
    .splice(0, 5);

  const posters = collectionImagesData?.posters || [];
  const backdrops = collectionImagesData?.backdrops || [];

  const sortedByReleaseDate = getSortedItems({ items: parts, sortBy: "release_date" });

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
        <LayoutContainer className='flex items-center lg:py-4864' css={mediaDetailsWrapper}>
          <div className='w-full max-w-full lg:max-w-md xl:max-w-xl 2xl:max-w-2xl'>
            <H1 className='mb-16'>{name}</H1>

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
