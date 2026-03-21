import { useQuery } from "@tanstack/react-query";

import { apiEndpoints } from "data/apiEndpoints";
import { fetchOptions } from "utils/helper";

export const getTechnicalDetails = async (id) => {
  const response = await fetch(
    apiEndpoints.cfWorker,
    fetchOptions({ method: "POST", headers: { "Content-Type": "application/json" }, body: { id } })
  );

  if (!response.ok) {
    return null;
  }

  return await response.json();
};

/**
 * TMDB paginated reviews: { id, page, results, total_pages, total_results }
 * @param {"movie" | "tv"} mediaType
 */
export const fetchMediaReviews = async ({ mediaType, mediaId, pageQuery, signal }) => {
  const id = String(mediaId);
  const endpoint = mediaType === "movie" ? apiEndpoints.movie.movieReviews({ id, pageQuery }) : apiEndpoints.tv.tvReviews({ id, pageQuery });

  const response = await fetch(endpoint, fetchOptions({ signal }));

  if (!response.ok) {
    throw new Error("Failed to fetch reviews");
  }

  return response.json();
};

/**
 * Paginated media reviews (TMDB). Uses SSR `initialReviews` for page 1 to avoid duplicate fetch on mount.
 * @param {{ mediaType: "movie" | "tv"; mediaId: string | number; page: number; initialReviews?: object | null }} params
 */
export const useMediaReviewsQuery = ({ mediaType, mediaId, page, initialReviews }) => {
  return useQuery({
    queryKey: ["mediaReviews", mediaType, String(mediaId), page],
    queryFn: ({ signal }) => fetchMediaReviews({ mediaType, mediaId, pageQuery: page, signal }),
    initialData: page === 1 && initialReviews ? initialReviews : undefined,
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5,
    enabled: Boolean(mediaId) && (mediaType === "movie" || mediaType === "tv")
  });
};
