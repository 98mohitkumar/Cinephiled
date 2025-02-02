export const blurPlaceholder =
  "data:image/webp;base64,UklGRgwCAABXRUJQVlA4WAoAAAAgAAAAAQAAAgAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggHgAAAJABAJ0BKgIAAwAHQJYlpAAC51m2AAD+5R4qGAAAAA==";

export const MAX_WIDTH = 2560;

export const sortOptions = {
  localOptions: [
    { value: "vote_average.asc", label: "Rating Ascending" },
    { value: "vote_average.desc", label: "Rating Descending" },
    { value: "popularity.asc", label: "Popularity Ascending" },
    { value: "popularity.desc", label: "Popularity Descending", isDefault: true },
    { value: "release_date.asc", label: "Release Date Ascending" },
    { value: "release_date.desc", label: "Release Date Descending" }
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
    { name: "Title (A-Z)", value: "title.asc", isDefault: true },
    { name: "Title (Z-A)", value: "title.desc" }
  ]
} as const;

export const ROUTES = {
  movies: "movies",
  tv: "tv",
  person: "person",
  collections: "collections",
  networks: "networks",
  lists: "lists",
  genres: "genres",
  keywords: "keywords",
  search: "search",
  watchProviders: "watch-providers",
  about: "about",
  explore: "explore",
  login: "login",
  profile: "profile"
} as const;

export const opacityMotionTransition = {
  variants: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  initial: "hidden",
  animate: "visible",
  exit: "hidden",
  transition: { duration: 0.325 }
} as const;

export const mediaTypeTabList = [
  { key: "movies", title: `Movies` },
  { key: "tv", title: `TV Shows` }
] as const;

export const siteInfo = {
  title: "Cinephiled",
  description:
    "Cinephiled - A progressive web app (PWA) to preview any movie or tv show with reviews, ratings, description and posters. Acting as a TMDB client, Cinephiled gives you access to login into your TMDB account and add movies or tv shows to your watchlist, set as favorites, rate and get personalized recommendations.",
  url: "https://cinephiled.vercel.app",
  image: "https://i.imgur.com/bnT3bYL.jpeg"
} as const;
