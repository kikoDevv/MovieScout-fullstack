"use client";
import React from "react";
import Image from "next/image";
import RatingStars from "../ratings/ratingStars";
import Button from "../UI/Button";
import { FaPlay } from "react-icons/fa";
import { RiMovie2Fill } from "react-icons/ri";
import { getMovieInfo } from "./getHeadMovies";
import { useQuery } from "@tanstack/react-query";

interface MovieData {
  title: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  overview: string;
}
interface CastMember {
  cast_id: number;
  name: string;
  character: string;
  profile_path?: string | null;
}
interface MovieInfoResponse {
  movieData: MovieData;
  movieLogo: string | null;
  cast: CastMember[];
}

export default function HeaderMovies() {
  const movieId = 447365;

  /*--------- use query to manage APIs ----------*/
  const {
    data: movieData,
    isLoading,
    error,
  } = useQuery<MovieInfoResponse>({
    queryKey: ["movieInfo", movieId],
    queryFn: () => getMovieInfo(movieId),
  });
  console.log("query data---->>", movieData);

  if (isLoading) {
    return <div className="flex justify-center items-center h-96">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-96 text-red-500">Error loading movie data</div>;
  }

  return (
    <section className="mb-100">
      <div className="relative">
        {/*--------- main image ----------*/}
        <Image
          className="max-h-[90vh]"
          src={
            movieData?.movieData.backdrop_path
              ? `https://image.tmdb.org/t/p/original${movieData.movieData.backdrop_path}`
              : `/karate.webp`
          }
          alt={movieData?.movieData.title || "Movie backdrop"}
          unoptimized
          priority
          quality={100}
          height={1000}
          width={2800}
        />
        {/*--------- info section ----------*/}
        <section className="grid absolute bottom-1 left-1/2 transform -translate-x-1/2 w-full justify-center gap-10">
          {/*--------- cast and crew ----------*/}
          <div className="flex gap-10">
            <div className="grid h-fit place-self-center">
              {movieData?.cast.slice(0, 3).map((member) => (
                <div key={member.cast_id} className="h-fit justify-items-end">
                  <p className="text-white font-bold font-mono text-lg text-shadow-lg/50">{member.name}</p>
                  <p className="text-gray-500 text-shadow-lg/50">{member.character}</p>
                </div>
              ))}
            </div>
            {/*--------- logo ----------*/}
            <div className="max-w-170">
              <Image
                className="w-fit h-fit"
                src={`https://image.tmdb.org/t/p/original${movieData?.movieLogo}`}
                alt="Movie logo"
                unoptimized
                priority
                quality={100}
                height={1000}
                width={1800}
              />
            </div>
            {/*--------- rating ----------*/}
            <RatingStars rating={movieData?.movieData.vote_average} showValue showIMDB size="lg" />
          </div>
          {/*--------- buttons group ----------*/}
          <div className="flex gap-10 justify-center">
            <Button text={"Watch Trailer"} icon={<RiMovie2Fill />} />

            <Button text={"Stream Movie"} icon={<FaPlay />} />
          </div>
        </section>
      </div>
    </section>
  );
}
