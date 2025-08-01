"use client";
import React, { useState } from "react";
import Image from "next/image";
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
  const MOVIE_IDS = [
    76600, // Avatar
    603692, // John Wick
    1087192, // Dragon
    1071585, // Megan
    552524, // Lion King
    1011477, // Karate Legend
    541671, // Ballerina
    911430, // F1
  ] as const;

  const TRANSITION_DURATION = 500;
  const STALE_TIME = 5 * 60 * 1000; // 5 minutes

  const [currentIndex, setCurrentIndex] = useState(2);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const getVisibleMovies = () => {
    return Array.from({ length: 5 }, (_, i) => {
      const position = i - 2; // -2, -1, 0, 1, 2
      const index = (currentIndex + position + MOVIE_IDS.length) % MOVIE_IDS.length;
      return {
        id: MOVIE_IDS[index],
        index,
        position,
      };
    });
  };

  const visibleMovies = getVisibleMovies();

  const movieQueries = visibleMovies.map((movie) =>
    useQuery<MovieInfoResponse>({
      queryKey: ["movieInfo", movie.id],
      queryFn: () => getMovieInfo(movie.id),
      staleTime: STALE_TIME,
    })
  );

  const handleSlideChange = (newIndex: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(newIndex);
    setTimeout(() => setIsTransitioning(false), TRANSITION_DURATION);
  };

  const nextSlide = () => handleSlideChange((currentIndex + 1) % MOVIE_IDS.length);
  const prevSlide = () => handleSlideChange((currentIndex - 1 + MOVIE_IDS.length) % MOVIE_IDS.length);
  const goToSlide = (index: number) => {
    if (index !== currentIndex) handleSlideChange(index);
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
      {/*--------- Main Gallery Container ----------*/}
      <div className="relative mx-auto px-6">
        {/* Gallery */}
        <div className="relative">
          {/*--------- Movie Cards Container ----------*/}
          <div className="relative h-[500px] flex items-center justify-center mb-8">
            {visibleMovies.map((movie, idx) => {
              const movieData = movieQueries[idx]?.data;
              const position = movie.position;

              {
                /*--------- Calculate positioning and styling based on position ----------*/
              }
              const getCardStyles = (pos: number) => {
                const baseClasses = "absolute transition-all duration-500 ease-in-out cursor-pointer transform-gpu";
                const baseContainer = "relative overflow-hidden rounded-2xl shadow-lg";

                const styles = {
                  0: {
                    // Center
                    card: `${baseClasses} z-20`,
                    container: `${baseContainer} relative w-220 h-[450px] scale-105 shadow-2xl`,
                  },
                  [-1]: {
                    // Left adjacent
                    card: `${baseClasses} z-10 -translate-x-112 translate-y-16 opacity-75`,
                    container: `${baseContainer} w-64 h-[350px] scale-95 shadow-xl`,
                  },
                  [1]: {
                    // Right adjacent
                    card: `${baseClasses} z-10 translate-x-112 translate-y-16 opacity-75`,
                    container: `${baseContainer} w-64 h-[350px] scale-95 shadow-xl`,
                  },
                  [-2]: {
                    // Far left
                    card: `${baseClasses} z-0 -translate-x-130 translate-y-25 opacity-40`,
                    container: `${baseContainer} w-92 h-[280px] scale-90 shadow-lg`,
                  },
                  [2]: {
                    // Far right
                    card: `${baseClasses} z-0 translate-x-145 translate-y-25 opacity-40`,
                    container: `${baseContainer} w-62 h-[280px] scale-90 shadow-lg`,
                  },
                };
                return styles[pos as keyof typeof styles];
              };

              const cardStyles = getCardStyles(position);

              return (
                <div
                  key={movie.id}
                  className={cardStyles.card}
                  onClick={() => position !== 0 && goToSlide(movie.index)}>
                  <div className={cardStyles.container}>
                    <Image
                      src={
                        movieData?.movieData.backdrop_path
                          ? `https://image.tmdb.org/t/p/w780${movieData.movieData.backdrop_path}`
                          : "/karate.webp"
                      }
                      alt={movieData?.movieData.title || "Movie"}
                      fill
                      className="object-cover"
                      quality={100}
                    />
                    {position === 0 && (
                      <div className="absolute bottom-5 left-47">
                        <Image
                          className="bg-red-500"
                          src={"/l1.webp"}
                          alt="Not found"
                          width={500}
                          height={300}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/*--------- Carousel Navigation - Arrows + Dots Combined ----------*/}
      <div className="flex justify-center mt-8">
        <div className="flex items-center gap-6 bg-black/30 backdrop-blur-sm px-1 py-1 rounded-full border border-white/10 w-fit">
          {/*--------- Previous Arrow ----------*/}
          <button
            onClick={prevSlide}
            className="w-10 h-10 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border border-slate-600/30 text-white rounded-full hover:scale-110 cursor-pointer transition-all duration-300 ease-out opacity-80 hover:opacity-100 shadow-lg group"
            disabled={isTransitioning}
            aria-label="Previous movie">
            <div className="flex items-center justify-center w-full h-full group-hover:text-purple-300 transition-colors duration-300">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="mr-0.5">
                <path d="M15.41 16.59L10.83 12L15.41 7.41L14 6l-6 6 6 6l1.41-1.41z" />
              </svg>
            </div>
          </button>

          {/*--------- Dots ----------*/}
          <div className="flex gap-3">
            {MOVIE_IDS.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer transform ${
                  index === currentIndex
                    ? "bg-gradient-to-br from-purple-400 to-purple-500 scale-140 shadow-lg shadow-purple-500/60"
                    : "bg-white/40 hover:bg-white/70 hover:scale-125"
                }`}
                disabled={isTransitioning}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/*--------- Next Arrow ----------*/}
          <button
            onClick={nextSlide}
            className="w-10 h-10 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border border-slate-600/30 text-white rounded-full hover:scale-110 cursor-pointer transition-all duration-300 ease-out opacity-80 hover:opacity-100 shadow-lg group"
            disabled={isTransitioning}
            aria-label="Next movie">
            <div className="flex items-center justify-center w-full h-full group-hover:text-purple-300 transition-colors duration-300">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
                <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6l-1.41-1.41z" />
              </svg>
            </div>
          </button>
        </div>
      </div>

      <style jsx>{`
        .border-3 {
          border-width: 3px;
        }
      `}</style>
    </section>
  );
}
