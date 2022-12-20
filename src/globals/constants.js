const api_key = process.env.NEXT_PUBLIC_API_KEY;

const baseUrl = 'https://api.themoviedb.org/3';

export const apiEndpoints = {
  auth: {
    requestToken: `${baseUrl}/authentication/token/new?api_key=${api_key}`,
    validateToken: `${baseUrl}/authentication/token/validate_with_login?api_key=${api_key}`,
    generateSession: `${baseUrl}/authentication/session/new?api_key=${api_key}`,
    logout: `${baseUrl}/authentication/session?api_key=${api_key}`
  },
  user: {
    userInfo: (sessionId) =>
      `${baseUrl}/account?api_key=${api_key}&session_id=${sessionId}`,
    setFavorite: (accountId, sessionId) =>
      `${baseUrl}/account/${accountId}/favorite?api_key=${api_key}&session_id=${sessionId}`,
    getFavorites: (mediaType, accountId, sessionId, pageQuery = 1) =>
      `${baseUrl}/account/${accountId}/favorite/${mediaType}?api_key=${api_key}&session_id=${sessionId}&language=en-US&sort_by=created_at.desc&page=${pageQuery}`,
    addToWatchlist: (accountId, sessionId) =>
      `${baseUrl}/account/${accountId}/watchlist?api_key=${api_key}&session_id=${sessionId}`,
    getWatchlist: (mediaType, accountId, sessionId, pageQuery = 1) =>
      `${baseUrl}/account/${accountId}/watchlist/${mediaType}?api_key=${api_key}&session_id=${sessionId}&language=en-US&sort_by=created_at.desc&page=${pageQuery}`,
    setRating: (mediaType, mediaId, sessionId) =>
      `${baseUrl}/${mediaType}/${mediaId}/rating?api_key=${api_key}&session_id=${sessionId}`,
    getRated: (mediaType, accountId, sessionId, pageQuery = 1) =>
      `${baseUrl}/account/${accountId}/rated/${mediaType}?api_key=${api_key}&session_id=${sessionId}&language=en-US&sort_by=created_at.desc&page=${pageQuery}`,
    deleteRating: (mediaType, mediaId, sessionId) =>
      `${baseUrl}/${mediaType}/${mediaId}/rating?api_key=${api_key}&session_id=${sessionId}`,
    getRecommendations: (mediaType, accountId, pageQuery = 1) =>
      `https://api.themoviedb.org/4/account/${accountId}/${mediaType}/recommendations?api_key=${api_key}&page=${pageQuery}`
  },
  search: {
    movieSearchWithYear: (query, year) =>
      `${baseUrl}/search/movie?api_key=${api_key}&language=en-US&query=${query}&page=1&include_adult=false&year=${year}`,
    movieSearch: (query, pageQuery = 1) =>
      `${baseUrl}/search/movie?api_key=${api_key}&language=en-US&query=${query}&page=${pageQuery}&include_adult=false`,
    tvSearchWithYear: (query, year) =>
      `${baseUrl}/search/tv?api_key=${api_key}&language=en-US&query=${query}&page=1&include_adult=false&first_air_date_year=${year}`,
    tvSearch: (query, pageQuery = 1) =>
      `${baseUrl}/search/tv?api_key=${api_key}&language=en-US&query=${query}&page=${pageQuery}&include_adult=false`,
    keywordSearch: (query, pageQuery = 1) =>
      `${baseUrl}/search/keyword?api_key=${api_key}&query=${query}&page=${pageQuery}`
  },
  movie: {
    popularMovies: `${baseUrl}/movie/popular?api_key=${api_key}&language=en-US&page=1`,
    trendingMovies: `${baseUrl}/trending/movie/day?api_key=${api_key}`,
    movieDetails: (id) =>
      `${baseUrl}/movie/${id}?api_key=${api_key}&language=en-US&append_to_response=images,videos,credits,reviews,recommendations,external_ids&include_image_language=en,null`,
    movieGenre: (genreId, pageQuery = 1) =>
      `${baseUrl}/discover/movie?api_key=${api_key}&language=en-US&include_adult=false&page=${pageQuery}&with_genres=${genreId}`
  },
  tv: {
    popularTV: `${baseUrl}/tv/popular?api_key=${api_key}&language=en-US&page=1`,
    trendingTV: `${baseUrl}/trending/tv/day?api_key=${api_key}`,
    tvDetails: (id) =>
      `${baseUrl}/tv/${id}?api_key=${api_key}&language=en-US&append_to_response=images,videos,credits,reviews,recommendations,external_ids&include_image_language=en,null`,
    tvSeasonDetails: (id, seasonNumber) =>
      `${baseUrl}/tv/${id}/season/${seasonNumber}?api_key=${api_key}&language=en-US`,
    tvGenre: (genreId, pageQuery) =>
      `${baseUrl}/discover/tv?api_key=${api_key}&language=en-US&include_adult=false&page=${pageQuery}&with_genres=${genreId}`
  },
  keywords: {
    keywordDetails: (id) =>
      `${baseUrl}/keyword/${id}/movies?api_key=${api_key}&language=en-US&include_adult=false`
  },
  person: {
    personDetails: (id) =>
      `${baseUrl}/person/${id}?api_key=${api_key}&language=en-US&append_to_response=combined_credits`
  },
  language: `${baseUrl}/configuration/languages?api_key=${api_key}`
};
