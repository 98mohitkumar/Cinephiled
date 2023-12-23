const api_key = process.env.NEXT_PUBLIC_API_KEY;

const baseUrlV3 = "https://api.themoviedb.org/3";
const baseUrlV4 = "https://api.themoviedb.org/4";
export const proxy = "https://corsproxy.scharde.workers.dev/?q=";

export const apiEndpoints = {
  auth: {
    requestToken: `${baseUrlV4}/auth/request_token`,

    accessToken: `${baseUrlV4}/auth/access_token`,

    generateSession: `${baseUrlV3}/authentication/session/convert/4`,

    logout: `${baseUrlV3}/authentication/session?api_key=${api_key}`
  },
  user: {
    userInfo: ({ sessionId }) => `${baseUrlV3}/account?api_key=${api_key}&session_id=${sessionId}`,

    setFavorite: ({ accountId, sessionId }) =>
      `${baseUrlV3}/account/${accountId}/favorite?api_key=${api_key}&session_id=${sessionId}`,

    getFavorites: ({ mediaType, accountId, sessionId, pageQuery = 1 }) =>
      `${baseUrlV3}/account/${accountId}/favorite/${mediaType}?api_key=${api_key}&session_id=${sessionId}&language=en-US&sort_by=created_at.desc&page=${pageQuery}`,

    addToWatchlist: ({ accountId, sessionId }) =>
      `${baseUrlV3}/account/${accountId}/watchlist?api_key=${api_key}&session_id=${sessionId}`,

    getWatchlist: ({ mediaType, accountId, sessionId, pageQuery = 1 }) =>
      `${baseUrlV3}/account/${accountId}/watchlist/${mediaType}?api_key=${api_key}&session_id=${sessionId}&language=en-US&sort_by=created_at.desc&page=${pageQuery}`,

    setRating: ({ mediaType, mediaId, sessionId }) =>
      `${baseUrlV3}/${mediaType}/${mediaId}/rating?api_key=${api_key}&session_id=${sessionId}`,

    getRated: ({ mediaType, accountId, sessionId, pageQuery = 1 }) =>
      `${baseUrlV3}/account/${accountId}/rated/${mediaType}?api_key=${api_key}&session_id=${sessionId}&language=en-US&sort_by=created_at.desc&page=${pageQuery}`,

    deleteRating: ({ mediaType, mediaId, sessionId }) =>
      `${baseUrlV3}/${mediaType}/${mediaId}/rating?api_key=${api_key}&session_id=${sessionId}`,

    getRecommendations: ({ mediaType, accountId, pageQuery = 1 }) =>
      `${baseUrlV4}/account/${accountId}/${mediaType}/recommendations?page=${pageQuery}&language=en-US`,

    getCountryCode: `https://ipwho.is?fields=country_code`
  },
  search: {
    movieSearchWithYear: ({ query, year }) =>
      `${baseUrlV3}/search/movie?api_key=${api_key}&language=en-US&query=${query}&page=1&include_adult=false&year=${year}`,

    movieSearch: ({ query, pageQuery = 1 }) =>
      `${baseUrlV3}/search/movie?api_key=${api_key}&language=en-US&query=${query}&page=${pageQuery}&include_adult=false`,

    tvSearchWithYear: ({ query, year }) =>
      `${baseUrlV3}/search/tv?api_key=${api_key}&language=en-US&query=${query}&page=1&include_adult=false&first_air_date_year=${year}`,

    tvSearch: ({ query, pageQuery = 1 }) =>
      `${baseUrlV3}/search/tv?api_key=${api_key}&language=en-US&query=${query}&page=${pageQuery}&include_adult=false`,

    keywordSearch: ({ query, pageQuery = 1 }) =>
      `${baseUrlV3}/search/keyword?api_key=${api_key}&query=${query}&page=${pageQuery}`
  },
  movie: {
    popularMovies: `${baseUrlV3}/movie/popular?api_key=${api_key}&language=en-US&page=1`,

    trendingMovies: `${baseUrlV3}/trending/movie/day?api_key=${api_key}`,

    movieDetails: (id) =>
      `${baseUrlV3}/movie/${id}?api_key=${api_key}&language=en-US&append_to_response=images,videos,credits,reviews,recommendations,external_ids&include_image_language=en,null`,

    movieGenre: ({ genreId, pageQuery = 1 }) =>
      `${baseUrlV3}/discover/movie?api_key=${api_key}&language=en-US&include_adult=false&page=${pageQuery}&with_genres=${genreId}`,

    getMovieCredits: ({ id }) =>
      `${baseUrlV3}/movie/${id}?api_key=${api_key}&language=en-US&append_to_response=credits`,

    movieGenreList: `${baseUrlV3}/genre/movie/list?api_key=${api_key}&language=en-US`,

    nowPlaying: ({ region }) =>
      `${baseUrlV3}/movie/now_playing?api_key=${api_key}&page=1&region=${region}`
  },
  tv: {
    popularTV: `${baseUrlV3}/tv/popular?api_key=${api_key}&language=en-US&page=1`,

    trendingTV: `${baseUrlV3}/trending/tv/day?api_key=${api_key}`,

    tvDetails: (id) =>
      `${baseUrlV3}/tv/${id}?api_key=${api_key}&language=en-US&append_to_response=images,videos,aggregate_credits,reviews,recommendations,external_ids&include_image_language=en,null`,

    tvDetailsNoAppend: (id) => `${baseUrlV3}/tv/${id}?api_key=${api_key}&language=en-US`,

    tvSeasonDetails: ({ id, seasonNumber }) =>
      `${baseUrlV3}/tv/${id}/season/${seasonNumber}?api_key=${api_key}&language=en-US&append_to_response=aggregate_credits,images&include_image_language=en,null`,

    episodeDetails: ({ id, seasonNumber, episodeNumber }) =>
      `${baseUrlV3}/tv/${id}/season/${seasonNumber}/episode/${episodeNumber}?api_key=${api_key}&language=en-US&append_to_response=images,credits&include_image_language=en,null`,

    tvGenre: ({ genreId, pageQuery }) =>
      `${baseUrlV3}/discover/tv?api_key=${api_key}&language=en-US&include_adult=false&page=${pageQuery}&with_genres=${genreId}`,

    getTvCredits: ({ id }) =>
      `${baseUrlV3}/tv/${id}?api_key=${api_key}&language=en-US&append_to_response=aggregate_credits`,

    tvGenreList: `${baseUrlV3}/genre/tv/list?api_key=${api_key}&language=en-US`
  },
  keywords: {
    keywordDetails: (id) =>
      `${baseUrlV3}/keyword/${id}/movies?api_key=${api_key}&language=en-US&include_adult=false`
  },
  person: {
    personDetails: (id) =>
      `${baseUrlV3}/person/${id}?api_key=${api_key}&language=en-US&append_to_response=combined_credits,external_ids,images`
  },
  providers: {
    watchProviders: ({ region }) =>
      `${baseUrlV3}/watch/providers/movie?language=en-US&watch_region=${region}&api_key=${api_key}`
  },
  network: {
    networkDetails: (id) =>
      `${baseUrlV3}/network/${id}?api_key=${api_key}&append_to_response=images`,
    networkMedia: ({ id, pageQuery = 1 }) =>
      `${baseUrlV3}/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${pageQuery}&sort_by=popularity.desc&with_networks=${id}&api_key=${api_key}`
  },
  language: `${baseUrlV3}/configuration/languages?api_key=${api_key}`
};

export const blurPlaceholder =
  "data:image/webp;base64,UklGRgwCAABXRUJQVlA4WAoAAAAgAAAAAQAAAgAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggHgAAAJABAJ0BKgIAAwAHQJYlpAAC51m2AAD+5R4qGAAAAA==";
