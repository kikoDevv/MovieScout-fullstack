"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export default function Page() {
  const [topMovies, setTopMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  {
    /*--------- scroll pased the header when page loads ----------*/
  }
  useEffect(() => {
    if (!isLoading && topMovies.length > 0) {
      setTimeout(() => {
        window.scrollTo({
          top: 220,
          behavior: "smooth",
        });
      });
    }
  }, [isLoading, topMovies]);

  {
    /*--------- get top movies ----------*/
  }
  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YWUwYTVkMzYzOTRhYmNiZmU4OTNlYmIzY2Q1MDRmOSIsIm5iZiI6MTc0MDkyODI4My4xNSwic3ViIjoiNjdjNDc1MWI3MDUzYjk1YTczYjRhMzg3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.qd5mRYNMIOkNb-SEhSgTpv_s3nWVx7W9twdpXc-gUzw",
            accept: "application/json",
          },
        });
        setTopMovies(res.data.results);
        console.log(res.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopMovies();
  }, []);

  /*---------------------------------- Root -----------------------------------------------*/

  return (
    <div>
      {/*--------- Header Images ----------*/}
      <section className="mb-100 w-full">
        <div className="relative">
          {isLoading ? (
            <h1 className="text-yellow-500">Data loading</h1>
          ) : (
            <Image
              className="w-full"
              src={`https://image.tmdb.org/t/p/original${topMovies[1].backdrop_path}`}
              alt="Movie picture not found"
              unoptimized
              width={500}
              height={500}
            />
          )}
          <section className="absolute bottom-40 left-40">
            <p className="text-2xl text-white w-200">
              This is a movie about balerina whitch is very good action movie, based on real story of a lonly girl
            </p>

            
          </section>
        </div>
      </section>
    </div>
  );
}
