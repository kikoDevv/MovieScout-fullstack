"use client";
import React, { useState } from "react";
import Image from "next/image";
import { getMovieInfo } from "./getHeadMovies";
import { useQuery } from "@tanstack/react-query";
import RatingStars from "../ratings/ratingStars";

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
    1087192, // Dragon
    552524, // Lion King
    1011477, // Karate Legend
    911430, // F1
    1175942,
    1151031,
    950387,
    1241982,
    950396,
  ] as const;

  const TRANSITION_DURATION = 700; // Increased for smoother feel
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

  /*--------- querys for movie gallery ----------*/
  const movieQuery0 = useQuery<MovieInfoResponse>({
    queryKey: ["movieInfo", visibleMovies[0]?.id],
    queryFn: () => getMovieInfo(visibleMovies[0]?.id),
    staleTime: STALE_TIME,
    enabled: !!visibleMovies[0]?.id,
  });

  const movieQuery1 = useQuery<MovieInfoResponse>({
    queryKey: ["movieInfo", visibleMovies[1]?.id],
    queryFn: () => getMovieInfo(visibleMovies[1]?.id),
    staleTime: STALE_TIME,
    enabled: !!visibleMovies[1]?.id,
  });

  const movieQuery2 = useQuery<MovieInfoResponse>({
    queryKey: ["movieInfo", visibleMovies[2]?.id],
    queryFn: () => getMovieInfo(visibleMovies[2]?.id),
    staleTime: STALE_TIME,
    enabled: !!visibleMovies[2]?.id,
  });

  const movieQuery3 = useQuery<MovieInfoResponse>({
    queryKey: ["movieInfo", visibleMovies[3]?.id],
    queryFn: () => getMovieInfo(visibleMovies[3]?.id),
    staleTime: STALE_TIME,
    enabled: !!visibleMovies[3]?.id,
  });

  const movieQuery4 = useQuery<MovieInfoResponse>({
    queryKey: ["movieInfo", visibleMovies[4]?.id],
    queryFn: () => getMovieInfo(visibleMovies[4]?.id),
    staleTime: STALE_TIME,
    enabled: !!visibleMovies[4]?.id,
  });
  console.log("--------------query data---------:", movieQuery4.data);

  const movieQueries = [movieQuery0, movieQuery1, movieQuery2, movieQuery3, movieQuery4];

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
    <section className="relative mt-30 mb-20">
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
                const baseClasses =
                  "absolute transition-all duration-700 ease-out will-change-transform transform-gpu backface-hidden";
                const baseContainer =
                  "relative overflow-hidden rounded-2xl shadow-lg transition-all duration-700 ease-out";

                const styles = {
                  0: {
                    // Center
                    card: `${baseClasses} z-20 cursor-pointer`,
                    container: `${baseContainer} w-220 h-[500px] scale-105 shadow-2xl`,
                  },
                  [-1]: {
                    // Left adjacent
                    card: `${baseClasses} z-10 -translate-x-112 translate-y-23 opacity-75 cursor-pointer`,
                    container: `${baseContainer} w-64 h-[350px] scale-95 shadow-xl`,
                  },
                  [1]: {
                    // Right adjacent
                    card: `${baseClasses} z-10 translate-x-112 translate-y-23 opacity-75 cursor-pointer`,
                    container: `${baseContainer} w-64 h-[350px] scale-95 shadow-xl`,
                  },
                  [-2]: {
                    // Far left
                    card: `${baseClasses} z-0 -translate-x-130 translate-y-33 opacity-40 cursor-pointer`,
                    container: `${baseContainer} w-92 h-[280px] scale-90 shadow-lg`,
                  },
                  [2]: {
                    // Far right
                    card: `${baseClasses} z-0 translate-x-145 translate-y-33 opacity-40 cursor-pointer`,
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
                      className="object-cover transition-all duration-700 ease-out"
                      quality={100}
                      priority={position === 0}
                    />
                    {/*----------------- Logo section -----------------*/}
                    {position === 0 && (
                      <div
                        key={`logo-${movie.id}`}
                        className={`absolute bottom-5 left-0 transition-all duration-500 ease-out w-full justify-items-center ${
                          !isTransitioning ? "opacity-100 translate-y-0 animate-fadeIn" : "opacity-0 translate-y-4"
                        }`}>
                        {/*--------- cast ----------*/}
                        <div className="flex w-fit">
                          <div className="grid justify-items-end">
                            <div className="flex gap-2 items-center">
                              <p className="font-mono text-md text-gray-300">{movieData?.cast[0]?.name}</p>
                              <p className="font-mono text-lg text-white">{movieData?.cast[0]?.character}</p>
                            </div>
                            <div className="flex gap-2 items-center">
                              <p className="font-mono text-md text-gray-300">{movieData?.cast[1]?.name}</p>
                              <p className="font-mono text-lg text-white">{movieData?.cast[1]?.character}</p>
                            </div>
                            <div className="flex gap-2 items-center">
                              <p className="font-mono text-md text-gray-300">{movieData?.cast[2]?.name}</p>
                              <p className="font-mono text-lg text-white">{movieData?.cast[2]?.character}</p>
                            </div>
                          </div>
                          {/*--------- logo ----------*/}
                          <div className="w-100 h-30">
                            <Image
                              className="w-full h-full"
                              src={`https://image.tmdb.org/t/p/w780${movieData?.movieLogo}`}
                              alt="Not found"
                              height={40}
                              width={400}
                            />
                          </div>

                          {/*--------- rating ----------*/}
                          <RatingStars rating={movieData?.movieData.vote_average} showIMDB showValue />
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

      {/*--------- Carousel Navigation - Arrows + Dots Combined ----------*/}
      <div className="flex justify-center mt-8">
        <div className="flex items-center gap-6 bg-black/30 backdrop-blur-sm px-1 py-1 rounded-full border border-white/10 w-fit">
          {/*--------- Previous Arrow ----------*/}
          <button
            onClick={prevSlide}
            className="w-10 h-10 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border border-slate-600/30 text-white rounded-full hover:scale-110 cursor-pointer transition-all duration-300 ease-out opacity-80 hover:opacity-100 shadow-lg group disabled:opacity-50"
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
                } disabled:opacity-50`}
                disabled={isTransitioning}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/*--------- Next Arrow ----------*/}
          <button
            onClick={nextSlide}
            className="w-10 h-10 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border border-slate-600/30 text-white rounded-full hover:scale-110 cursor-pointer transition-all duration-300 ease-out opacity-80 hover:opacity-100 shadow-lg group disabled:opacity-50"
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

        /* Additional smoothing for hardware acceleration */
        .transform-gpu {
          transform: translate3d(0, 0, 0);
        }

        /* Optimize for smooth animations */
        .backface-hidden {
          backface-visibility: hidden;
          perspective: 1000px;
        }

        .will-change-transform {
          will-change: transform, opacity, filter;
        }

        /* Smooth transition for all interactive elements */
        button,
        .cursor-pointer {
          transform: translate3d(0, 0, 0);
        }
      `}</style>
    </section>
  );
}
