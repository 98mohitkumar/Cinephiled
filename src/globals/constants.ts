export const read_access_token = process.env.NEXT_PUBLIC_READ_ACCESS_TOKEN;

const baseUrlV3 = "https://api.themoviedb.org/3";
const baseUrlV4 = "https://api.themoviedb.org/4";

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

    getRated: ({ mediaType, accountId, pageQuery = 1 }: { mediaType: string; accountId: string; pageQuery?: number }) =>
      `${baseUrlV3}/account/${accountId}/rated/${mediaType}?language=en-US&sort_by=created_at.desc&page=${pageQuery}`,

    deleteRating: ({ mediaType, mediaId }: { mediaType: string; mediaId: string }) => `${baseUrlV3}/${mediaType}/${mediaId}/rating`,

    getRecommendations: ({ mediaType, accountId, pageQuery = 1 }: { mediaType: string; accountId: string; pageQuery?: number }) =>
      `${baseUrlV4}/account/${accountId}/${mediaType}/recommendations?page=${pageQuery}&language=en-US`,

    getCountryCode: (ip: string) => `https://ipwho.is/${ip}?fields=country_code`
  },
  search: {
    movieSearchWithYear: ({ query, year }: { query: string; year: string }) =>
      `${baseUrlV3}/search/movie?language=en-US&query=${query}&page=1&include_adult=false&year=${year}`,

    movieSearch: ({ query, pageQuery = 1 }: { query: string; pageQuery?: number }) =>
      `${baseUrlV3}/search/movie?language=en-US&query=${query}&page=${pageQuery}&include_adult=false`,

    tvSearchWithYear: ({ query, year }: { query: string; year: string }) =>
      `${baseUrlV3}/search/tv?language=en-US&query=${query}&page=1&include_adult=false&first_air_date_year=${year}`,

    tvSearch: ({ query, pageQuery = 1 }: { query: string; pageQuery?: number }) =>
      `${baseUrlV3}/search/tv?language=en-US&query=${query}&page=${pageQuery}&include_adult=false`,

    keywordSearch: ({ query, pageQuery = 1 }: { query: string; pageQuery?: number }) =>
      `${baseUrlV3}/search/keyword?query=${query}&page=${pageQuery}`,

    personSearch: ({ query, pageQuery = 1 }: { query: string; pageQuery?: number }) =>
      `${baseUrlV3}/search/person?language=en-US&query=${query}&page=${pageQuery}&include_adult=false`,

    collectionSearch: ({ query, pageQuery = 1 }: { query: string; pageQuery: number }) =>
      `${baseUrlV3}/search/collection?language=en-US&query=${query}&page=${pageQuery}&include_adult=false`
  },
  movie: {
    popularMovies: `${baseUrlV3}/movie/popular?language=en-US&page=1`,

    trendingMovies: `${baseUrlV3}/trending/movie/day?language=en-US&page=1`,

    movieDetails: (id: string) =>
      `${baseUrlV3}/movie/${id}?language=en-US&append_to_response=images,videos,credits,reviews,recommendations,external_ids&include_image_language=en,null`,

    movieGenre: ({ genreId, pageQuery = 1, sortBy = "popularity.desc" }: { genreId: string; pageQuery?: number; sortBy: string }) =>
      `${baseUrlV3}/discover/movie?language=en-US&include_adult=false&page=${pageQuery}&with_genres=${genreId}&sort_by=${sortBy}`,

    getMovieCredits: ({ id }: { id: string }) => `${baseUrlV3}/movie/${id}?language=en-US&append_to_response=credits`,

    movieGenreList: `${baseUrlV3}/genre/movie/list?language=en-US`,

    nowPlaying: ({ region, pageQuery = 1 }: { region: string; pageQuery: number }) =>
      `${baseUrlV3}/movie/now_playing?page=${pageQuery}&region=${region}`
  },
  tv: {
    popularTv: `${baseUrlV3}/tv/popular?language=en-US&page=1`,

    trendingTv: `${baseUrlV3}/trending/tv/day?language=en-US&page=1`,

    tvDetails: (id: string) =>
      `${baseUrlV3}/tv/${id}?language=en-US&append_to_response=images,videos,aggregate_credits,reviews,recommendations,external_ids&include_image_language=en,null`,

    tvDetailsNoAppend: (id: string) => `${baseUrlV3}/tv/${id}?language=en-US`,

    tvSeasonDetails: ({ id, seasonNumber }: { id: string; seasonNumber: number }) =>
      `${baseUrlV3}/tv/${id}/season/${seasonNumber}?language=en-US&append_to_response=aggregate_credits,images&include_image_language=en,null`,

    episodeDetails: ({ id, seasonNumber, episodeNumber }: { id: string; seasonNumber: number; episodeNumber: number }) =>
      `${baseUrlV3}/tv/${id}/season/${seasonNumber}/episode/${episodeNumber}?language=en-US&append_to_response=images,credits&include_image_language=en,null`,

    tvGenre: ({ genreId, pageQuery, sortBy = "popularity.desc" }: { genreId: string; pageQuery: number; sortBy: string }) =>
      `${baseUrlV3}/discover/tv?language=en-US&include_adult=false&page=${pageQuery}&with_genres=${genreId}
      &sort_by=${sortBy}`,

    getTvCredits: ({ id }: { id: string }) => `${baseUrlV3}/tv/${id}?language=en-US&append_to_response=aggregate_credits`,

    tvGenreList: `${baseUrlV3}/genre/tv/list?language=en-US`
  },
  keywords: {
    keywordDetails: (id: string) => `${baseUrlV3}/keyword/${id}/movies?language=en-US&include_adult=false`
  },
  person: {
    personDetails: (id: string) => `${baseUrlV3}/person/${id}?language=en-US&append_to_response=combined_credits,external_ids,images`
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
      `${baseUrlV3}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageQuery}&sort_by=${sortBy}&watch_region=${region}&with_watch_providers=${providerId}`,

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
    collectionImages: (id: string) => `${baseUrlV3}/collection/${id}/images`
  },
  language: `${baseUrlV3}/configuration/languages`,
  cfWorker: `https://imdbtechnical.98mohitkumar.workers.dev?secret=${process.env.CF_WORKER_SECRET}`
} as const;

export const blurPlaceholder =
  "data:image/webp;base64,UklGRgwCAABXRUJQVlA4WAoAAAAgAAAAAQAAAgAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggHgAAAJABAJ0BKgIAAwAHQJYlpAAC51m2AAD+5R4qGAAAAA==";

export const MAX_WIDTH = 2560;

export const sortOptions = {
  localOptions: [
    { key: "default", value: "Default" },
    { key: "rating.asc", value: "Rating Ascending" },
    { key: "rating.desc", value: "Rating Descending" },
    { key: "popularity.asc", value: "Popularity Ascending" },
    { key: "popularity.desc", value: "Popularity Descending" },
    { key: "release_date.asc", value: "Release Date Ascending" },
    { key: "release_date.desc", value: "Release Date Descending" }
  ],
  tmdbOptions: {
    movie: [
      { value: "vote_average.asc", label: "Rating Ascending" },
      { value: "vote_average.desc", label: "Rating Descending" },
      { value: "popularity.asc", label: "Popularity Ascending" },
      { value: "popularity.desc", label: "Popularity Descending", isDefault: true },
      { value: "primary_release_date.asc", label: "Release Date Ascending" },
      { value: "primary_release_date.desc", label: "Release Date Descending" }
    ],
    tv: [
      { value: "vote_average.asc", label: "Rating Ascending" },
      { value: "vote_average.desc", label: "Rating Descending" },
      { value: "popularity.asc", label: "Popularity Ascending" },
      { value: "popularity.desc", label: "Popularity Descending", isDefault: true },
      { value: "first_air_date.asc", label: "Release Date Ascending" },
      { value: "first_air_date.desc", label: "Release Date Descending" }
    ]
  },
  listOptions: [
    { name: "Original Ascending", value: "original_order.asc" },
    { name: "Original Descending", value: "original_order.desc" },
    { name: "Rating Ascending", value: "vote_average.asc" },
    { name: "Rating Descending", value: "vote_average.desc" },
    { name: "Release Date Ascending", value: "release_date.asc" },
    { name: "Release Date Descending", value: "release_date.desc" },
    { name: "Title (A-Z)", value: "title.asc" },
    { name: "Title (Z-A)", value: "title.desc" }
  ]
} as const;

export const mediaTypeTabList = [
  { key: "movies", title: `Movies` },
  { key: "tv", title: `TV Shows` }
] as const;
