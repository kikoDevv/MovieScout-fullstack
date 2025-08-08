import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";
import { fetchMoviesByCategory } from "./tabsApi";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
interface kType {
  kategory: string;
}
interface Movie {
  id: number;
  title: string;
  vote_average: number;
  backdrop_path: string;
}

export default function Content({ kategory }: kType) {
  /*--------- managing states for fade effect ----------*/
  const [isVisible, setIsVisible] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(kategory);

  /*--------- managing fetched data using query ----------*/
  const {
    data: movies = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movies", currentCategory],
    queryFn: () => fetchMoviesByCategory(currentCategory),
  });

  /*--------- Effect to handle fade in/out when category changes ----------*/
  useEffect(() => {
    if (kategory !== currentCategory) {
      setIsVisible(false);
      const categoryChangeTimer = setTimeout(() => {
        setCurrentCategory(kategory);
      }, 300);

      const fadeInTimer = setTimeout(() => {
        setIsVisible(true);
      }, 600);

      return () => {
        clearTimeout(categoryChangeTimer);
        clearTimeout(fadeInTimer);
      };
    } else {
      setIsVisible(true);
    }
  }, [kategory, currentCategory]);

  console.log("data-------------------", movies);
  if (error) return <div>Some stupid shit happend fetching tab movies: {error.message}</div>;
  /*-------------------- Root ----------------------*/
  return (
    <section className="mb-20 mt-10">
      <div className="flex overflow-x-auto snap-x snap-mandatory sm:grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:mx-20 scrollbar-hide sm:p-3 px-10 py-1">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div key={`loading-${index}`} className="relative w-full py-30 rounded-2xl skeleton-tab-card">
                <span className="skeleton-tab-text absolute bottom-4 left-4 w-40 h-9 text rounded-xl"></span>
              </div>
            )) /*--------- when is loaded ----------*/
          : movies.slice(0, 6).map((movie: Movie) => (
              <Link key={movie.id} href={`/movie/${movie.id}`}>
                <div
                  className={`relative w-80 flex-shrink-0 snap-center mr-4 sm:w-fit sm:mr-0 cursor-pointer hover:scale-102 transition-all duration-400 ${
                    isVisible ? "opacity-100" : "opacity-0"
                  }`}>
                  <Image
                    className="rounded-2xl h-full w-full object-cover tab-content-fade"
                    src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                    alt={`${movie.title} backdrop image not found`}
                    unoptimized
                    width={1920}
                    height={1080}
                    priority
                    quality={100}
                  />
                  <h1 className="absolute bottom-2 left-4 font-bold text-white sm:text-2xl font-sans select-none text-shadow-lg/10">
                    {movie.title}
                  </h1>
                  <div className="flex absolute gap-1 bottom-2 right-4 select-none">
                    <FaStar className="text-yellow-500 text-2xl" />
                    <p className="text-white text-lg font-semibold">{movie.vote_average.toFixed(1)}</p>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </section>
  );
}
