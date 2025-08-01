"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import RatingStars from "../ratings/ratingStars";
import Button from "../UI/Button";
import { FaPlay, FaChevronLeft, FaChevronRight } from "react-icons/fa";
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
    76600,    // avatar
    603692,   // john wick
    1087192,  // dragon
    1071585,  // megan
    552524,   // lio
    1011477,  // karate legend
    541671,   // balerina
    911430,   // f1
  ];

  const [currentIndex, setCurrentIndex] = useState(2);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Get visible movies (5 total: 2 left, center, 2 right)
  const getVisibleMovies = () => {
    const movies = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + IDs.length) % IDs.length;
      movies.push({
        id: IDs[index],
        index: index,
        position: i
      });
    }
    return movies;
  };

  const visibleMovies = getVisibleMovies();
  const centerMovie = visibleMovies[2];

  // Fetch data for all visible movies
  const movieQueries = visibleMovies.map(movie =>
    useQuery<MovieInfoResponse>({
      queryKey: ["movieInfo", movie.id],
      queryFn: () => getMovieInfo(movie.id),
      staleTime: 5 * 60 * 1000,
    })
  );

  const centerMovieData = movieQueries[2]?.data;

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % IDs.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + IDs.length) % IDs.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  if (movieQueries[2]?.isLoading) {
    return (
      <div className="relative h-[90vh] flex justify-center items-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-3 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 text-lg">Loading Movie Gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="relative min-h-[90vh] py-12">
      {/* Main Gallery Container */}
      <div className="relative mx-auto px-6">

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-40 w-10 h-10 bg-white/90 backdrop-blur-sm shadow-md border border-slate-200 text-slate-600 rounded-full hover:bg-white hover:scale-105 transition-all duration-200 flex items-center justify-center group disabled:opacity-50"
          disabled={isTransitioning}
        >
          <FaChevronLeft className="w-3 h-3 group-hover:text-purple-600 transition-colors" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-40 w-10 h-10 bg-white/90 backdrop-blur-sm shadow-md border border-slate-200 text-slate-600 rounded-full hover:bg-white hover:scale-105 transition-all duration-200 flex items-center justify-center group disabled:opacity-50"
          disabled={isTransitioning}
        >
          <FaChevronRight className="w-3 h-3 group-hover:text-purple-600 transition-colors" />
        </button>

        {/* Gallery with Details Combined */}
        <div className="relative">

          {/*--------- Movie Cards Container ----------*/}
          <div className="relative h-[500px] flex items-center justify-center mb-8">
            {visibleMovies.map((movie, idx) => {
              const movieData = movieQueries[idx]?.data;
              const position = movie.position;

              // Calculate positioning and styling based on position
              let cardClasses = "absolute transition-all duration-500 ease-in-out cursor-pointer transform-gpu";
              let containerClasses = "relative overflow-hidden rounded-2xl shadow-lg bg-white";

              if (position === 0) { // Center card
                cardClasses += " z-20";
                containerClasses += " w-120 h-[450px] scale-105";
              } else if (position === -1) { // Left adjacent
                cardClasses += " z-10 -translate-x-72 -translate-y-6 opacity-75";
                containerClasses += " w-64 h-[350px] scale-95";
              } else if (position === 1) { // Right adjacent
                cardClasses += " z-10 translate-x-72 -translate-y-6 opacity-75";
                containerClasses += " w-64 h-[350px] scale-95";
              } else if (position === -2) { // Far left
                cardClasses += " z-0 -translate-x-96 -translate-y-12 opacity-40";
                containerClasses += " w-52 h-[280px] scale-90";
              } else if (position === 2) { // Far right
                cardClasses += " z-0 translate-x-96 -translate-y-12 opacity-40";
                containerClasses += " w-52 h-[280px] scale-90";
              }

              return (
                <div
                  key={movie.id}
                  className={cardClasses}
                  onClick={() => position !== 0 && goToSlide(movie.index)}
                >
                  <div className={containerClasses}>
                    {/*--------- movie poster ----------*/}
                    <div className="relative w-full h-3/5">
                      <Image
                        src={movieData?.movieData.backdrop_path
                          ? `https://image.tmdb.org/t/p/w780${movieData.movieData.backdrop_path}`
                          : '/karate.webp'
                        }
                        alt={movieData?.movieData.title || "Movie"}
                        fill
                        className="object-cover"
                        unoptimized
                        quality={position === 0 ? 100 : 70}
                      />
                      {position !== 0 && (
                        <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors duration-300"></div>
                      )}
                    </div>

                    {/*--------- Movie Info ----------*/}
                    <div className={`p-4 h-2/5 ${position === 0 ? 'space-y-3' : 'space-y-2'}`}>
                      <h3 className={`font-bold text-slate-800 line-clamp-2 ${
                        position === 0 ? 'text-lg' : 'text-base'
                      }`}>
                        {movieData?.movieData.title || 'Loading...'}
                      </h3>

                      {position === 0 && movieData && (
                        <div className="space-y-2">
                          <RatingStars
                            rating={movieData.movieData.vote_average}
                            showValue
                            size="sm"
                          />
                          <div className="flex flex-wrap gap-1">
                            {movieData.movieData.genres.slice(0, 2).map((genre) => (
                              <span
                                key={genre.id}
                                className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                              >
                                {genre.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {position !== 0 && (
                        <p className="text-slate-500 text-sm">
                          {movieData?.movieData.genres[0]?.name || 'Movie'}
                        </p>
                      )}
                    </div>

                    {/*--------- Hover overlay for non-center cards ----------*/}
                    {position !== 0 && (
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
                        <div className="bg-white/90 px-3 py-1 rounded-full text-purple-700 text-sm font-medium">
                          View Details
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/*--------- Carousel Indicators ----------*/}
      <div className="flex justify-center mt-8">
        <div className="flex gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-slate-200">
          {IDs.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-purple-500 scale-125 shadow-sm shadow-purple-500/30'
                  : 'bg-slate-300 hover:bg-slate-400 hover:scale-110'
              }`}
              disabled={isTransitioning}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .border-3 {
          border-width: 3px;
        }
      `}</style>
    </section>
  );
}