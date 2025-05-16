import { FilterX } from "lucide-react";
import { useRouter } from "next/router";
import { useQueryStates, parseAsString, parseAsArrayOf, parseAsInteger, parseAsFloat } from "nuqs";
import { Fragment } from "react";

import { getCountryCode } from "apiRoutes/user";
import FilterPanel from "components/Shared/Discover/FilterPanel";
import MobileFilter from "components/Shared/Discover/MobileFilter";
import DominantColor from "components/Shared/DominantColor/DominantColor";
import MetaWrapper from "components/Shared/MetaWrapper";
import PlaceholderText from "components/Shared/PlaceholderText";
import MediaTemplateGrid from "components/Templates/MediaTemplateGrid";
import Button from "components/UI/Button";
import FlexBox from "components/UI/FlexBox";
import LayoutContainer from "components/UI/LayoutContainer";
import H2 from "components/UI/Typography/H2";
import { apiEndpoints } from "data/apiEndpoints";
import { ROUTES, siteInfo, sortOptions } from "data/global";
import useInfiniteQuery from "hooks/useInfiniteQuery";
import { fetchOptions, removeDuplicates } from "utils/helper";

// Default filter values
const DEFAULT_FILTERS = {
  releaseDate: ["", `${new Date().getFullYear()}-12-31`],
  voteAverage: [0, 10],
  minVoteCount: 0,
  runtime: [0, 300],
  sortBy: "popularity.desc",
  language: null,
  genres: [],
  originCountry: null
};

const TV = ({ initialTv, genres, languages, region, regions }) => {
  const router = useRouter();
  const [filterParams, setFilterParams] = useQueryStates(
    {
      release_date_min: parseAsString.withDefault(DEFAULT_FILTERS.releaseDate[0]),
      release_date_max: parseAsString.withDefault(DEFAULT_FILTERS.releaseDate[1]),
      vote_average_min: parseAsFloat.withDefault(DEFAULT_FILTERS.voteAverage[0]),
      vote_average_max: parseAsFloat.withDefault(DEFAULT_FILTERS.voteAverage[1]),
      vote_count_min: parseAsInteger.withDefault(DEFAULT_FILTERS.minVoteCount),
      runtime_min: parseAsInteger.withDefault(DEFAULT_FILTERS.runtime[0]),
      runtime_max: parseAsInteger.withDefault(DEFAULT_FILTERS.runtime[1]),
      sort_by: parseAsString.withDefault(DEFAULT_FILTERS.sortBy),
      language: parseAsString.withDefault(DEFAULT_FILTERS.language),
      genres: parseAsArrayOf(parseAsInteger).withDefault(DEFAULT_FILTERS.genres),
      originCountry: parseAsString.withDefault(DEFAULT_FILTERS.originCountry)
    },
    {
      shallow: false,
      throttleMs: 1000,
      history: "push"
    }
  );

  const filters = {
    releaseDate: [filterParams.release_date_min, filterParams.release_date_max],
    voteAverage: [filterParams.vote_average_min, filterParams.vote_average_max],
    minVoteCount: filterParams.vote_count_min,
    runtime: [filterParams.runtime_min, filterParams.runtime_max],
    sortBy: filterParams.sort_by,
    language: filterParams.language,
    genres: filterParams.genres,
    originCountry: filterParams.originCountry
  };

  // Update query parameters when filters change
  const handleFilterChange = (filterKey, value) => {
    switch (filterKey) {
      case "releaseDate":
        setFilterParams({
          release_date_min: value[0],
          release_date_max: value[1]
        });
        break;
      case "voteAverage":
        setFilterParams({
          vote_average_min: value[0],
          vote_average_max: value[1]
        });
        break;
      case "voteCount":
        setFilterParams({
          vote_count_min: value
        });
        break;
      case "runtime":
        setFilterParams({
          runtime_min: value[0],
          runtime_max: value[1]
        });
        break;
      case "sortBy":
        setFilterParams({ sort_by: value });
        break;
      case "language":
        setFilterParams({ language: value });
        break;
      case "genres":
        setFilterParams({ genres: value });
        break;
      case "originCountry":
        setFilterParams({ originCountry: value });
        break;
      default:
        break;
    }

    resetQueryState();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearFilters = () => {
    router.replace("/tv");
  };

  const { list, resetQueryState } = useInfiniteQuery({
    initialPage: 2,
    scrollAfterLoad: false,
    getEndpoint: ({ page }) =>
      apiEndpoints.discover.tv({
        pageQuery: page,
        sortBy: filterParams.sort_by,
        originalLanguage: filterParams.language,
        releaseDateMin: filterParams.release_date_min,
        releaseDateMax: filterParams.release_date_max,
        voteAverageMin: filterParams.vote_average_min,
        voteAverageMax: filterParams.vote_average_max,
        voteCountMin: filterParams.vote_count_min,
        runtimeMin: filterParams.runtime_min,
        runtimeMax: filterParams.runtime_max,
        withGenres: filterParams.genres,
        region,
        originCountry: filterParams.originCountry
      })
  });

  const { cleanedItems: tv } = removeDuplicates(initialTv.concat(list));

  return (
    <Fragment>
      <MetaWrapper
        title='Discover TV Shows - Cinephiled'
        description='Explore and discover tv shows with advanced filters'
        url={`${siteInfo.url}/${ROUTES.tv}`}
      />

      <LayoutContainer className='relative py-4864'>
        <DominantColor tint />

        <section className='relative z-10'>
          <H2 tag='h1' className='mb-4864 text-center text-neutral-100'>
            Discover TV Shows
          </H2>

          <MobileFilter
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={clearFilters}
            sortOptions={sortOptions.tmdbOptions.tv}
            languageOptions={languages}
            genreOptions={genres}
            regionOptions={regions}
          />

          <FlexBox className='items-start gap-1632'>
            <div className='sticky top-20 hidden max-w-80 xl:block'>
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={clearFilters}
                sortOptions={sortOptions.tmdbOptions.tv}
                languageOptions={languages}
                genreOptions={genres}
                regionOptions={regions}
              />
            </div>

            {/* Results */}
            <div className='w-full'>
              {tv?.length > 0 ? (
                <MediaTemplateGrid media={tv} mediaType='tv' gridConfig={{ xxs: 2, sm: 3, lg: 4, xl: "desktopAutoFillMedia" }} />
              ) : (
                <PlaceholderText height='large'>
                  No tv shows found with these filters.
                  <Button variant='outline' size='small' className='mx-auto mt-16 flex items-center gap-8' onClick={clearFilters}>
                    <FilterX size={16} />
                    Clear Filters
                  </Button>
                </PlaceholderText>
              )}
            </div>
          </FlexBox>
        </section>
      </LayoutContainer>
    </Fragment>
  );
};

export async function getServerSideProps(context) {
  try {
    const { query } = context;
    const ip = context.req.headers["x-forwarded-for"] || context.req.connection.remoteAddress;
    const region = await getCountryCode(ip);

    const releaseDateMin = query.release_date_min || DEFAULT_FILTERS.releaseDate[0];
    const releaseDateMax = query.release_date_max || DEFAULT_FILTERS.releaseDate[1];
    const voteAverageMin = query.vote_average_min || DEFAULT_FILTERS.voteAverage[0];
    const voteAverageMax = query.vote_average_max || DEFAULT_FILTERS.voteAverage[1];
    const voteCountMin = query.vote_count_min || DEFAULT_FILTERS.minVoteCount;
    const runtimeMin = query.runtime_min || DEFAULT_FILTERS.runtime[0];
    const runtimeMax = query.runtime_max || DEFAULT_FILTERS.runtime[1];
    const sortBy = query.sort_by || DEFAULT_FILTERS.sortBy;
    const language = query.language || DEFAULT_FILTERS.language;
    const genres = query.genres || "";
    const originCountry = query.originCountry || DEFAULT_FILTERS.originCountry;

    const endpoint = apiEndpoints.discover.tv({
      pageQuery: 1,
      sortBy,
      originalLanguage: language,
      releaseDateMin,
      releaseDateMax,
      voteAverageMin: Number(voteAverageMin),
      voteAverageMax: voteAverageMax,
      voteCountMin: voteCountMin,
      runtimeMin: runtimeMin,
      runtimeMax: runtimeMax,
      withGenres: genres,
      region,
      originCountry
    });

    const tvResponse = await fetch(endpoint, fetchOptions());
    const initialTv = await tvResponse.json();

    const genresResponse = await fetch(apiEndpoints.tv.tvGenreList, fetchOptions());
    const genresData = await genresResponse.json();

    const languagesResponse = await fetch(apiEndpoints.language, fetchOptions());
    const languagesData = await languagesResponse.json();

    const regionsResponse = await fetch(apiEndpoints.watchProviders.regions, fetchOptions());
    const regionsData = await regionsResponse.json();

    const languages = languagesData
      .sort((a, b) => a.english_name.localeCompare(b.english_name))
      .map((lang) => ({
        label: lang.english_name,
        value: lang.iso_639_1
      }));

    const regions = regionsData.results
      .map((region) => ({
        label: region.english_name,
        value: region.iso_3166_1
      }))
      .sort((a, b) => a.label.localeCompare(b.label));

    return {
      props: {
        initialTv: initialTv.results,
        genres: genresData.genres || [],
        languages: [{ label: "None Selected", value: null }].concat(languages),
        region, // this is for default watch region
        regions: [{ label: "None Selected", value: null }].concat(regions) // these are for origin country filter
      }
    };
  } catch (error) {
    console.error("Error fetching tv:", error);
    return {
      notFound: true
    };
  }
}

export default TV;
