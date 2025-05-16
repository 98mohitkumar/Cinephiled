export const read_access_token = process.env.NEXT_PUBLIC_READ_ACCESS_TOKEN;
export const CORS_PROXY = process.env.NEXT_PUBLIC_CORS_PROXY;

const baseUrlV3 = "https://api.themoviedb.org/3";
const baseUrlV4 = "https://api.themoviedb.org/4";

const imageLanguages = "en,null";

type discoverParams = {
  pageQuery: number;
  releaseDateMin: string;
  releaseDateMax: string;
  voteAverageMin: number;
  voteAverageMax: string | number;
  voteCountMin: string | number;
  sortBy: string;
  originalLanguage: string;
  runtimeMin?: string | number;
  runtimeMax?: string | number;
  withGenres?: string;
  region?: string;
  originCountry?: string;
};

export const apiEndpoints = {
  auth: {
    requestToken: `${baseUrlV4}/auth/request_token`,

    accessToken: `${baseUrlV4}/auth/access_token`
  },
  user: {
    userInfo: ({ accountId }: { accountId: string }) => `${baseUrlV3}/account/${accountId}`,

    setFavorite: ({ accountId }: { accountId: string }) => `${baseUrlV3}/account/${accountId}/favorite`,

    getFavorites: ({ mediaType, accountId, pageQuery = 1 }: { mediaType: string; accountId: string; pageQuery: number }) =>
      `${baseUrlV3}/account/${accountId}/favorite/${mediaType}?language=en-US&sort_by=created_at.desc&page=${pageQuery}`,

    addToWatchlist: ({ accountId }: { accountId: string }) => `${baseUrlV3}/account/${accountId}/watchlist`,

    getWatchlist: ({ mediaType, accountId, pageQuery = 1 }: { mediaType: string; accountId: string; pageQuery: number }) =>
      `${baseUrlV3}/account/${accountId}/watchlist/${mediaType}?language=en-US&sort_by=created_at.desc&page=${pageQuery}`,

    setRating: ({ mediaType, mediaId }: { mediaType: string; mediaId: string }) => `${baseUrlV3}/${mediaType}/${mediaId}/rating`,

    episodeRating: ({ seriesId, seasonNumber, episodeNumber }: { seriesId: string; seasonNumber: number; episodeNumber: number }) =>
      `${baseUrlV3}/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/rating`,

    getRated: ({ mediaType, accountId, pageQuery = 1 }: { mediaType: string; accountId: string; pageQuery?: number }) =>
      `${baseUrlV3}/account/${accountId}/rated/${mediaType}?language=en-US&sort_by=created_at.desc&page=${pageQuery}`,

    deleteRating: ({ mediaType, mediaId }: { mediaType: string; mediaId: string }) => `${baseUrlV3}/${mediaType}/${mediaId}/rating`,

    getRecommendations: ({ mediaType, accountId, pageQuery = 1 }: { mediaType: string; accountId: string; pageQuery?: number }) =>
      `${baseUrlV4}/account/${accountId}/${mediaType}/recommendations?page=${pageQuery}&language=en-US`,

    getCountryCode: (ip: string) => `https://ipwho.is/${ip}?fields=country_code`
  },
  search: {
    movieSearch: ({ query, pageQuery = 1, year = "" }: { query: string; pageQuery?: number; sortBy?: string; year?: string }) =>
      `${baseUrlV3}/search/movie?language=en-US&query=${query}&page=${pageQuery}&year=${year}&include_adult=false`,

    tvSearch: ({ query, pageQuery = 1, year = "" }: { query: string; pageQuery?: number; sortBy?: string; year?: string }) =>
      `${baseUrlV3}/search/tv?language=en-US&query=${query}&page=${pageQuery}&year=${year}&include_adult=false`,

    keywordSearch: ({ query, pageQuery = 1 }: { query: string; pageQuery?: number }) =>
      `${baseUrlV3}/search/keyword?query=${query}&page=${pageQuery}`,

    personSearch: ({ query, pageQuery = 1 }: { query: string; pageQuery?: number }) =>
      `${baseUrlV3}/search/person?language=en-US&query=${query}&page=${pageQuery}&include_adult=false`,

    collectionSearch: ({ query, pageQuery = 1 }: { query: string; pageQuery: number }) =>
      `${baseUrlV3}/search/collection?language=en-US&query=${query}&page=${pageQuery}&include_adult=false`,

    companySearch: ({ query, pageQuery = 1 }: { query: string; pageQuery: number }) =>
      `${baseUrlV3}/search/company?language=en-US&query=${query}&page=${pageQuery}&include_adult=false`
  },
  movie: {
    trendingMovies: ({ pageQuery = 1 }) => `${baseUrlV3}/trending/movie/day?language=en-US&page=${pageQuery}`,

    movieDetails: (id: string) =>
      `${baseUrlV3}/movie/${id}?language=en-US&append_to_response=keywords,images,videos,credits,reviews,recommendations,external_ids&include_image_language=${imageLanguages}`,

    movieGenre: ({ genreId, pageQuery = 1, sortBy = "popularity.desc" }: { genreId: string; pageQuery?: number; sortBy: string }) =>
      `${baseUrlV3}/discover/movie?language=en-US&include_adult=false&page=${pageQuery}&with_genres=${genreId}&sort_by=${sortBy}`,

    getMovieCredits: ({ id }: { id: string }) => `${baseUrlV3}/movie/${id}?language=en-US&append_to_response=credits`,

    movieGenreList: `${baseUrlV3}/genre/movie/list?language=en-US`,

    nowPlaying: ({ region, pageQuery = 1 }: { region: string; pageQuery: number }) =>
      `${baseUrlV3}/movie/now_playing?page=${pageQuery}&region=${region}`
  },
  tv: {
    trendingTv: ({ pageQuery = 1 }) => `${baseUrlV3}/trending/tv/day?language=en-US&page=${pageQuery}`,

    tvDetails: (id: string) =>
      `${baseUrlV3}/tv/${id}?language=en-US&append_to_response=keywords,images,videos,aggregate_credits,reviews,recommendations,external_ids&include_image_language=${imageLanguages}`,

    tvDetailsNoAppend: (id: string) => `${baseUrlV3}/tv/${id}?language=en-US`,

    tvSeasonDetails: ({ id, seasonNumber }: { id: string; seasonNumber: number }) =>
      `${baseUrlV3}/tv/${id}/season/${seasonNumber}?language=en-US&append_to_response=aggregate_credits,videos,images&include_image_language=${imageLanguages}`,

    episodeDetails: ({ id, seasonNumber, episodeNumber }: { id: string; seasonNumber: number; episodeNumber: number }) =>
      `${baseUrlV3}/tv/${id}/season/${seasonNumber}/episode/${episodeNumber}?language=en-US&append_to_response=images,credits&include_image_language=${imageLanguages}`,

    episodeAccountStates: ({ seriesId, seasonNumber, episodeNumber }: { seriesId: string; seasonNumber: number; episodeNumber: number }) =>
      `${baseUrlV3}/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/account_states`,

    tvGenre: ({ genreId, pageQuery, sortBy = "popularity.desc" }: { genreId: string; pageQuery: number; sortBy: string }) =>
      `${baseUrlV3}/discover/tv?language=en-US&include_adult=false&page=${pageQuery}&with_genres=${genreId}
      &sort_by=${sortBy}`,

    getTvCredits: ({ id }: { id: string }) => `${baseUrlV3}/tv/${id}?language=en-US&append_to_response=aggregate_credits`,

    tvGenreList: `${baseUrlV3}/genre/tv/list?language=en-US`
  },
  discover: {
    movies: ({
      pageQuery = 1,
      releaseDateMin = "",
      releaseDateMax = "",
      voteAverageMin = 0,
      voteAverageMax = "",
      voteCountMin = "",
      sortBy = "popularity.desc",
      originalLanguage = "",
      runtimeMin = "",
      runtimeMax = "",
      withGenres = "",
      originCountry
    }: discoverParams) =>
      `${baseUrlV3}/discover/movie?page=${pageQuery}&primary_release_date.gte=${releaseDateMin}&primary_release_date.lte=${releaseDateMax}&vote_average.gte=${Math.max(0, voteAverageMin - 0.01)}&vote_average.lte=${voteAverageMax}&vote_count.gte=${voteCountMin}&sort_by=${sortBy}&with_original_language=${originalLanguage || ""}${runtimeMin ? `&with_runtime.gte=${runtimeMin}` : ""}${runtimeMax ? `&with_runtime.lte=${runtimeMax}` : ""}${withGenres ? `&with_genres=${withGenres}` : ""}${originCountry ? `&with_origin_country=${originCountry}` : ""}&include_adult=false`,

    tv: ({
      pageQuery = 1,
      releaseDateMin = "",
      releaseDateMax = "",
      voteAverageMin = 0,
      voteAverageMax = "",
      voteCountMin = "",
      sortBy = "popularity.desc",
      originalLanguage = "",
      runtimeMin = "",
      runtimeMax = "",
      withGenres = "",
      region = "US",
      originCountry
    }: discoverParams) =>
      `${baseUrlV3}/discover/tv?page=${pageQuery}&first_air_date.gte=${releaseDateMin}&first_air_date.lte=${releaseDateMax}&vote_average.gte=${Math.max(0, voteAverageMin - 0.01)}&vote_average.lte=${voteAverageMax}&vote_count.gte=${voteCountMin}&sort_by=${sortBy}&with_original_language=${originalLanguage || ""}${runtimeMin ? `&with_runtime.gte=${runtimeMin}` : ""}${runtimeMax ? `&with_runtime.lte=${runtimeMax}` : ""}${withGenres ? `&with_genres=${withGenres}` : ""}&watch_region=${region}&with_watch_monetization_types=flatrate|free|ads|rent|buy${originCountry ? `&with_origin_country=${originCountry}` : ""}&include_adult=false`
  },
  keywords: {
    keywordMovies: ({ id, pageQuery = 1 }: { id: string; pageQuery: number }) =>
      `${baseUrlV3}/discover/movie?include_adult=false&language=en-US&page=${pageQuery}&with_keywords=${id}`,

    keywordTv: ({ id, pageQuery = 1 }: { id: string; pageQuery: number }) =>
      `${baseUrlV3}/discover/tv?include_adult=false&language=en-US&page=${pageQuery}&with_keywords=${id}`
  },
  person: {
    personDetails: (id: string) =>
      `${baseUrlV3}/person/${id}?language=en-US&append_to_response=combined_credits,external_ids,images,movie_credits,tv_credits`
  },
  watchProviders: {
    movieWatchProviders: ({ region }: { region: string }) => `${baseUrlV3}/watch/providers/movie?language=en-US&watch_region=${region}`,

    tvWatchProviders: ({ region }: { region: string }) => `${baseUrlV3}/watch/providers/tv?language=en-US&watch_region=${region}`,

    watchProviderMovies: ({
      region,
      pageQuery,
      providerId,
      sortBy = "popularity.desc"
    }: {
      region: string;
      pageQuery: number;
      providerId: string;
      sortBy: string;
    }) =>
      `${baseUrlV3}/discover/movie?include_adult=false&language=en-US&page=${pageQuery}&sort_by=${sortBy}&watch_region=${region}&with_watch_providers=${providerId}`,

    watchProviderTv: ({
      region,
      pageQuery,
      providerId,
      sortBy = "popularity.desc"
    }: {
      region: string;
      pageQuery: number;
      providerId: string;
      sortBy: string;
    }) =>
      `${baseUrlV3}/discover/tv?include_adult=false&include_video=false&language=en-US&page=${pageQuery}&sort_by=${sortBy}&watch_region=${region}&with_watch_providers=${providerId}`,

    regions: `${baseUrlV3}/watch/providers/regions`
  },
  network: {
    networkDetails: (id: string) => `${baseUrlV3}/network/${id}?append_to_response=images`,

    networkMedia: ({ id, pageQuery = 1, sortBy = "popularity.desc" }: { id: string; pageQuery?: number; sortBy: string }) =>
      `${baseUrlV3}/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${pageQuery}&sort_by=${sortBy}&with_networks=${id}`
  },
  company: {
    companyDetails: (id: string) => `${baseUrlV3}/company/${id}?append_to_response=images`,

    companyMovies: ({ id, pageQuery = 1 }: { id: string; pageQuery?: number; sortBy: string }) =>
      `${baseUrlV3}/discover/movie?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${pageQuery}&with_companies=${id}`,

    companyTv: ({ id, pageQuery = 1 }: { id: string; pageQuery?: number; sortBy: string }) =>
      `${baseUrlV3}/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${pageQuery}&with_companies=${id}`
  },
  lists: {
    getLists: ({ accountId, pageQuery = 1 }: { accountId: string; pageQuery?: number }) =>
      `${baseUrlV4}/account/${accountId}/lists?page=${pageQuery}`,

    getListDetails: ({ id, pageQuery = 1 }: { id: string; pageQuery?: number }) => `${baseUrlV4}/list/${id}?page=${pageQuery}`,

    createList: `${baseUrlV4}/list`,

    updateList: ({ id }: { id: string }) => `${baseUrlV4}/list/${id}`,

    listItems: ({ id }: { id: string }) => `${baseUrlV4}/list/${id}/items`,

    listItemStatus: ({ id, mediaId, mediaType }: { id: string; mediaId: string; mediaType: string }) =>
      `${baseUrlV4}/list/${id}/item_status?media_id=${mediaId}&media_type=${mediaType}`
  },
  collection: {
    collectionDetails: (id: string) => `${baseUrlV3}/collection/${id}?language=en-US`,
    collectionImages: (id: string) => `${baseUrlV3}/collection/${id}/images?include_image_language=${imageLanguages}`
  },
  popularPeople: ({ pageQuery = 1 }: { pageQuery: number }) => `${baseUrlV3}/person/popular?language=en-US&page=${pageQuery}`,
  language: `${baseUrlV3}/configuration/languages`,
  cfWorker: `https://imdbtechnical.98mohitkumar.workers.dev?secret=${process.env.CF_WORKER_SECRET}`
} as const;
