import axios from "axios";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  backdrop_path: string;
}

export const fetchMoviesByCategory = async (category: string = "popular"): Promise<Movie[]> => {
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
};