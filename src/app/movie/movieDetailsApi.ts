import axios from "axios";

export interface MovieDetails {
  id: number;
  title: string;
  tagline: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  runtime: number;
  genres: { id: number; name: string }[];
  vote_average: number;
  vote_count: number;
  budget: number;
  revenue: number;
  spoken_languages: { iso_639_1: string; name: string }[];
  status: string;
}

export interface MovieCredits {
  cast: {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
  }[];
  crew: {
    id: number;
    name: string;
    job: string;
    profile_path: string | null;
  }[];
}

export interface MovieVideos {
  results: {
    id: string;
    key: string;
    name: string;
    type: string;
    site: string;
  }[];
}

/*------------------- Fetch movie details -------------------*/
export const getMovieDetails = async (movieId: number): Promise<MovieDetails> => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

/*------------------- Fetch movie credits cast and crew -------------------*/
export const getMovieCredits = async (movieId: number): Promise<MovieCredits> => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie credits:", error);
    throw error;
  }
};

/*------------------- Fetch movie videos trailers teasers -------------------*/
export const getMovieVideos = async (movieId: number): Promise<MovieVideos> => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie videos:", error);
    throw error;
  }
};
