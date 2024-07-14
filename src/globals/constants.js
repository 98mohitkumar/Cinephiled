export const read_access_token = process.env.NEXT_PUBLIC_READ_ACCESS_TOKEN;

const baseUrlV3 = "https://api.themoviedb.org/3";
const baseUrlV4 = "https://api.themoviedb.org/4";
export const proxy = "https://corsproxy.scharde.workers.dev/?q=";

export const apiEndpoints = {
  auth: {
    requestToken: `${baseUrlV4}/auth/request_token`,

    accessToken: `${baseUrlV4}/auth/access_token`
  },
  user: {
    userInfo: ({ accountId }) => `${baseUrlV3}/account/${accountId}`,

    setFavorite: ({ accountId }) => `${baseUrlV3}/account/${accountId}/favorite`,

    getFavorites: ({ mediaType, accountId, pageQuery = 1 }) =>
      `${baseUrlV3}/account/${accountId}/favorite/${mediaType}?language=en-US&sort_by=created_at.desc&page=${pageQuery}`,

    addToWatchlist: ({ accountId }) => `${baseUrlV3}/account/${accountId}/watchlist`,

    getWatchlist: ({ mediaType, accountId, pageQuery = 1 }) =>
      `${baseUrlV3}/account/${accountId}/watchlist/${mediaType}?language=en-US&sort_by=created_at.desc&page=${pageQuery}`,

    setRating: ({ mediaType, mediaId }) => `${baseUrlV3}/${mediaType}/${mediaId}/rating`,

    getRated: ({ mediaType, accountId, pageQuery = 1 }) =>
      `${baseUrlV3}/account/${accountId}/rated/${mediaType}?language=en-US&sort_by=created_at.desc&page=${pageQuery}`,

    deleteRating: ({ mediaType, mediaId }) => `${baseUrlV3}/${mediaType}/${mediaId}/rating`,

    getRecommendations: ({ mediaType, accountId, pageQuery = 1 }) =>
      `${baseUrlV4}/account/${accountId}/${mediaType}/recommendations?page=${pageQuery}&language=en-US`,

    getCountryCode: (ip) => `https://ipwho.is/${ip}?fields=country_code`
  },
  search: {
    movieSearchWithYear: ({ query, year }) =>
      `${baseUrlV3}/search/movie?language=en-US&query=${query}&page=1&include_adult=false&year=${year}`,

    movieSearch: ({ query, pageQuery = 1 }) =>
      `${baseUrlV3}/search/movie?language=en-US&query=${query}&page=${pageQuery}&include_adult=false`,

    tvSearchWithYear: ({ query, year }) =>
      `${baseUrlV3}/search/tv?language=en-US&query=${query}&page=1&include_adult=false&first_air_date_year=${year}`,

    tvSearch: ({ query, pageQuery = 1 }) =>
      `${baseUrlV3}/search/tv?language=en-US&query=${query}&page=${pageQuery}&include_adult=false`,

    keywordSearch: ({ query, pageQuery = 1 }) =>
      `${baseUrlV3}/search/keyword?query=${query}&page=${pageQuery}`,

    personSearch: ({ query, pageQuery = 1 }) =>
      `${baseUrlV3}/search/person?language=en-US&query=${query}&page=${pageQuery}&include_adult=false`,

    collectionSearch: ({ query, pageQuery = 1 }) =>
      `${baseUrlV3}/search/collection?language=en-US&query=${query}&page=${pageQuery}&include_adult=false`
  },
  movie: {
    popularMovies: `${baseUrlV3}/movie/popular?language=en-US&page=1`,

    trendingMovies: `${baseUrlV3}/trending/movie/day?language=en-US&page=1`,

    movieDetails: (id) =>
      `${baseUrlV3}/movie/${id}?language=en-US&append_to_response=images,videos,credits,reviews,recommendations,external_ids&include_image_language=en,null`,

    movieGenre: ({ genreId, pageQuery = 1 }) =>
      `${baseUrlV3}/discover/movie?language=en-US&include_adult=false&page=${pageQuery}&with_genres=${genreId}`,

    getMovieCredits: ({ id }) =>
      `${baseUrlV3}/movie/${id}?language=en-US&append_to_response=credits`,

    movieGenreList: `${baseUrlV3}/genre/movie/list?language=en-US`,

    nowPlaying: ({ region }) => `${baseUrlV3}/movie/now_playing?page=1&region=${region}`
  },
  tv: {
    popularTV: `${baseUrlV3}/tv/popular?language=en-US&page=1`,

    trendingTV: `${baseUrlV3}/trending/tv/day?language=en-US&page=1`,

    tvDetails: (id) =>
      `${baseUrlV3}/tv/${id}?language=en-US&append_to_response=images,videos,aggregate_credits,reviews,recommendations,external_ids&include_image_language=en,null`,

    tvDetailsNoAppend: (id) => `${baseUrlV3}/tv/${id}?language=en-US`,

    tvSeasonDetails: ({ id, seasonNumber }) =>
      `${baseUrlV3}/tv/${id}/season/${seasonNumber}?language=en-US&append_to_response=aggregate_credits,images&include_image_language=en,null`,

    episodeDetails: ({ id, seasonNumber, episodeNumber }) =>
      `${baseUrlV3}/tv/${id}/season/${seasonNumber}/episode/${episodeNumber}?language=en-US&append_to_response=images,credits&include_image_language=en,null`,

    tvGenre: ({ genreId, pageQuery }) =>
      `${baseUrlV3}/discover/tv?language=en-US&include_adult=false&page=${pageQuery}&with_genres=${genreId}`,

    getTvCredits: ({ id }) =>
      `${baseUrlV3}/tv/${id}?language=en-US&append_to_response=aggregate_credits`,

    tvGenreList: `${baseUrlV3}/genre/tv/list?language=en-US`
  },
  keywords: {
    keywordDetails: (id) => `${baseUrlV3}/keyword/${id}/movies?language=en-US&include_adult=false`
  },
  person: {
    personDetails: (id) =>
      `${baseUrlV3}/person/${id}?language=en-US&append_to_response=combined_credits,external_ids,images`
  },
  watchProviders: {
    movieWatchProviders: ({ region }) =>
      `${baseUrlV3}/watch/providers/movie?language=en-US&watch_region=${region}`,

    tvWatchProviders: ({ region }) =>
      `${baseUrlV3}/watch/providers/tv?language=en-US&watch_region=${region}`,

    watchProviderMovies: ({ region, pageQuery, providerId }) =>
      `${baseUrlV3}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageQuery}&sort_by=popularity.desc&watch_region=${region}&with_watch_providers=${providerId}`,

    watchProviderTv: ({ region, pageQuery, providerId }) =>
      `${baseUrlV3}/discover/tv?include_adult=false&include_video=false&language=en-US&page=${pageQuery}&sort_by=popularity.desc&watch_region=${region}&with_watch_providers=${providerId}`,

    regions: `${baseUrlV3}/watch/providers/regions`
  },
  network: {
    networkDetails: (id) => `${baseUrlV3}/network/${id}?append_to_response=images`,

    networkMedia: ({ id, pageQuery = 1 }) =>
      `${baseUrlV3}/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${pageQuery}&sort_by=popularity.desc&with_networks=${id}`
  },
  lists: {
    getLists: ({ accountId, pageQuery = 1 }) =>
      `${baseUrlV4}/account/${accountId}/lists?page=${pageQuery}&sort_by=created_at.desc`,

    getListDetails: ({ id, pageQuery = 1 }) => `${baseUrlV4}/list/${id}?page=${pageQuery}`,

    createList: `${baseUrlV4}/list`,

    updateList: ({ id }) => `${baseUrlV4}/list/${id}`,

    listItems: ({ id }) => `${baseUrlV4}/list/${id}/items`,

    listItemStatus: ({ id, mediaId, mediaType }) =>
      `${baseUrlV4}/list/${id}/item_status?media_id=${mediaId}&media_type=${mediaType}`
  },
  collection: {
    collectionDetails: (id) => `${baseUrlV3}/collection/${id}?language=en-US`,
    collectionImages: (id) => `${baseUrlV3}/collection/${id}/images`
  },
  language: `${baseUrlV3}/configuration/languages`,
  cfWorker: `https://imdbtechnical.98mohitkumar.workers.dev?secret=${process.env.CF_WORKER_SECRET}`
};

export const blurPlaceholder =
  "data:image/webp;base64,UklGRgwCAABXRUJQVlA4WAoAAAAgAAAAAQAAAgAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggHgAAAJABAJ0BKgIAAwAHQJYlpAAC51m2AAD+5R4qGAAAAA==";

export const MAX_WIDTH = 2560;
