import { useState, useEffect } from "react";
import axios from "axios";


interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

interface GetTabMoviesProps {
  category?: string;
}

export default function GetTabMovies(props: GetTabMoviesProps = {}): Movie[] {
  const category = props?.category || "popular";
  const [data, setData] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
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

        setData(response.data.results);
        console.log("API ---fetching:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [category]);

  return data;
}
