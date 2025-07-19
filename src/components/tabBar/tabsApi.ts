import axios from "axios";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  backdrop_path: string;
}

// List of all available categories
export const availableCategories = ["popular", "top_rated", "upcoming", "now_playing", "TV-shows", "kids"];

export const fetchMoviesByCategory = async (category: string = "popular"): Promise<Movie[]> => {
  if (category == "TV-shows") {
    const response = await axios.get(`https://api.themoviedb.org/3/trending/tv/week?language=en-US`, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_TMDB_API_KEY,
        accept: "application/json",
      },
    });
    return response.data.results;
  } else if (category == "kids") {
    const response = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
      params: {
        language: "en-US",
        sort_by: "popularity.desc",
        with_genres: "10751",
        page: "1",
      },
      headers: {
        Authorization: process.env.NEXT_PUBLIC_TMDB_API_KEY,
        accept: "application/json",
      },
    });
    return response.data.results;
  } else {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${category}`, {
      params: {
        language: "en-US",
        page: "1",
      },
      headers: {
        Authorization: process.env.NEXT_PUBLIC_TMDB_API_KEY,
        accept: "application/json",
      },
    });
    return response.data.results;
  }
};

// Function to prefetch all categories
export const prefetchAllCategories = async (queryClient: import('@tanstack/react-query').QueryClient) => {
  try {
    // Create an array of promises for all category fetches
    const fetchPromises = availableCategories.map(category => {
      // Prefetch each category and store in the cache
      return queryClient.prefetchQuery({
        queryKey: ["movies", category],
        queryFn: () => fetchMoviesByCategory(category),
        staleTime: 5 * 60 * 1000, // 5 minutes before considering the data stale
      });
    });

    // Wait for all prefetches to complete
    await Promise.all(fetchPromises);
    console.log("All categories prefetched successfully");
  } catch (error) {
    console.error("Error prefetching categories:", error);
  }
};
