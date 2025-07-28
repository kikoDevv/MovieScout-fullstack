"use client";
import React from "react";
import Image from "next/image";
import RatingStars from "../ratings/ratingStars";
import Button from "../UI/Button";
import styles from "./headerMovies.module.css";
import { FaPlay } from "react-icons/fa";
import { RiMovie2Fill } from "react-icons/ri";
import { getMovieInfo } from "./getHeadMovies";
import { useQuery } from "@tanstack/react-query";

interface Genre {
  id: number;
  name: string;
}
interface MovieData {
  title: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  genres: Genre[];
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
  const IDs = [
    // avatar
    76600,
    // john wick
    603692,
    // dragun
    1087192,
    // megan
    1071585,
    // lio
    552524,
    // karate legend
    1011477,
    // balerina
    541671,
    // f1
    911430,

  ];
  const movieId = IDs[Math.floor(Math.random() * IDs.length)];
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
    <section className="mb-10">
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
            <div className={`grid h-fit place-self-center ${styles.slideRightAnimation}`}>
              {movieData?.cast.slice(0, 3).map((member) => (
                <div key={member.cast_id} className="flex h-fit gap-5 justify-end select-none">
                  <p className="text-gray-500 text-shadow-lg/50">{member.name}</p>
                  <p className="text-white font-bold font-mono text-md text-shadow-lg/50">{member.character}</p>
                </div>
              ))}
            </div>
            {/*--------- logo ----------*/}
            <div className="max-w-170">
              <Image
                className={`w-fit h-fit ${styles.fadeUpAnimation}`}
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
            <div className={`grid h-fit place-self-center ${styles.slideLeftAnimation}`}>
              <div>
                <RatingStars rating={movieData?.movieData.vote_average} showValue showIMDB size="md" />
              </div>
              <div>
                {movieData?.movieData.genres.map((genre) => (
                  <p key={genre.id} className="font-mono text-white text-shadow-lg/50">
                    {genre.name}
                  </p>
                ))}
              </div>
            </div>
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
