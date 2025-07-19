import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import { fetchMoviesByCategory } from "./tabsApi";
import { useQuery } from "@tanstack/react-query";
interface kType {
  kategory: string;
}
interface Movie {
  id: number;
  title: string;
  vote_average: number;
  backdrop_path: string;
}

const ls = false;
export default function Content({ kategory }: kType) {
  /*--------- managing fetched data using query ----------*/
  const {
    data: movies = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movies", kategory],
    queryFn: () => fetchMoviesByCategory(kategory),
  });

  console.log("data-------------------", movies);
  if (error) return <div>Some stupid shit happend fetching tab movies: {error.message}</div>;
  /*-------------------- Root ----------------------*/
  return (
    <section>
      <div className="flex overflow-x-auto snap-x snap-mandatory sm:grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:mx-20 scrollbar-hide sm:p-3 px-10 py-1">
        {!ls
          ? Array.from({ length: 6 }).map((_, index) => (
              <div key={`loading-${index}`} className="relative w-full py-30 rounded-2xl skeleton-tab-card">
                <span className="skeleton-tab-text absolute bottom-4 left-4 w-40 h-9 text rounded-xl"></span>
              </div>
            ))
          : /*--------- when is loaded ----------*/
            movies.slice(0, 6).map((movie: Movie) => (
              <div
                key={movie.id}
                className="relative w-80 flex-shrink-0 snap-center mr-4 sm:w-fit sm:mr-0 cursor-pointer hover:scale-103 transition-transform duration-400 ease-out">
                <Image
                  className="rounded-2xl h-full w-full object-cover"
                  src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                  alt={`${movie.title} backdrop image not found`}
                  unoptimized
                  width={1920}
                  height={1080}
                  priority
                  quality={100}
                />
                <h1 className="absolute bottom-1 left-3 font-bold text-white sm:text-2xl font-sans select-none text-shadow-lg/10">
                  {movie.title}
                </h1>
                <div className="flex absolute gap-1 bottom-4 right-4 select-none">
                  <FaStar className="text-yellow-500 text-2xl" />
                  <p className="text-white text-lg font-semibold">{movie.vote_average.toFixed(1)}</p>
                </div>
              </div>
            ))}
      </div>
    </section>
  );
}
