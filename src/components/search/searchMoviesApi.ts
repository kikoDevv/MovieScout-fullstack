import axios from "axios";

export interface SearchFilters {
  genre: string;
  year: string;
  language: string;
  sortBy: string;
  minRating: number;
  maxRating: number;
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  popularity: number;
}

export interface SearchResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
  page: number;
}

// Genre mapping for TMDB API
const genreMap: { [key: string]: number } = {
  'action': 28,
  'adventure': 12,
  'animation': 16,
  'comedy': 35,
  'crime': 80,
  'documentary': 99,
  'drama': 18,
  'family': 10751,
  'fantasy': 14,
  'history': 36,
  'horror': 27,
  'music': 10402,
  'mystery': 9648,
  'romance': 10749,
  'science fiction': 878,
  'thriller': 53,
  'war': 10752,
  'western': 37
};

/*------------------- Search movies by query -------------------*/
export const searchMovies = async (query: string, page: number = 1): Promise<SearchResponse> => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
      params: {
        query: query,
        language: 'en-US',
        page: page,
        include_adult: false
      },
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        accept: "application/json",
      },
    });

    console.log("Search results:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};

/*------------------- Discover movies with filters -------------------*/
export const discoverMovies = async (filters: SearchFilters, page: number = 1): Promise<SearchResponse> => {
  try {
    const params: Record<string, string | number | boolean> = {
      language: 'en-US',
      page: page,
      include_adult: false,
      sort_by: filters.sortBy || 'popularity.desc'
    };

    if (filters.genre && genreMap[filters.genre.toLowerCase()]) {
      params.with_genres = genreMap[filters.genre.toLowerCase()];
    }

    if (filters.year) {
      params.year = filters.year;
    }


    if (filters.language) {
      params.with_original_language = filters.language;
    }
    if (filters.minRating > 0) {
      params['vote_average.gte'] = filters.minRating;
    }
    if (filters.maxRating < 10) {
      params['vote_average.lte'] = filters.maxRating;
    }

    if (filters.minRating > 0 || filters.maxRating < 10) {
      params['vote_count.gte'] = 50;
    }

    const response = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
      params,
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        accept: "application/json",
      },
    });

    console.log("Discover results:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error discovering movies:", error);
    throw error;
  }
};

/*------------------- Combined search function -------------------*/
export const searchAndDiscoverMovies = async (
  query: string,
  filters: SearchFilters,
  page: number = 1
): Promise<SearchResponse> => {

  if (query.trim()) {
    return searchMovies(query, page);
  }

  
  return discoverMovies(filters, page);
};
