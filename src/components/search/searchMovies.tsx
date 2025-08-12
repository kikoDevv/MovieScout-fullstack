"use client";
import React, { useState } from "react";
import { FaFilter, FaSearch, FaStar, FaCalendarAlt, FaGlobe, FaTags } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import { searchAndDiscoverMovies, SearchFilters, Movie } from "./searchMoviesApi";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface SearchMoviesProps {
  children?: React.ReactNode;
}

export default function SearchMovies({ children }: SearchMoviesProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTrigger, setSearchTrigger] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({
    genre: "",
    year: "",
    language: "",
    sortBy: "popularity.desc",
    minRating: 0,
    maxRating: 10,
  });

  const genres = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Music",
    "Mystery",
    "Romance",
    "Science Fiction",
    "Thriller",
    "War",
    "Western",
  ];

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "ja", name: "Japanese" },
    { code: "ko", name: "Korean" },
    { code: "zh", name: "Chinese" },
    { code: "hi", name: "Hindi" },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  // Search query with React Query
  const {
    data: searchResults,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movieSearch", searchTrigger, filters],
    queryFn: () => searchAndDiscoverMovies(searchTrigger, filters),
    enabled:
      !!searchTrigger ||
      Object.values(filters).some(
        (value) => value !== "" && value !== "popularity.desc" && !(value === 0 || value === 10)
      ),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handleFilterChange = (key: string, value: string | number) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      genre: "",
      year: "",
      language: "",
      sortBy: "popularity.desc",
      minRating: 0,
      maxRating: 10,
    });
    setSearchQuery("");
    setSearchTrigger("");
  };

  const handleSearch = () => {
    setSearchTrigger(searchQuery.trim());
  };

  const activeFiltersCount = Object.values(filters).filter(
    (value) => value !== "" && value !== "popularity.desc" && !(value === 0 || value === 10)
  ).length;

  const hasActiveSearch = !!searchTrigger || activeFiltersCount > 0;

  return (
    <section className="w-full py-2 sm:px-10 mb-50">
      {/*--------- Search Bar ----------*/}
      <div className="relative mb-1 mx-5 justify-self-center sm:min-w-120">
        <div className="flex items-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-xl sm:rounded-3xl overflow-hidden border border-gray-700/50 shadow-2xl backdrop-blur-sm h-9 mx-5 sm:mx-0 sm:h-12">
          <div className="flex-1 relative">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="w-full bg-transparent text-white placeholder-gray-400 pl-5 py-2 outline-none font-medium text-lg"
              placeholder="Search for movies, shows, actors..."
              type="search"
            />
          </div>

          {/*--------- Filter Toggle Button ----------*/}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`relative px-3 py-4 transition-all duration-300 ${
              isFilterOpen ? "bg-gradient-to-l from-blue-600 to-purple-500" : "bg-gray-700/50"
            } cursor-pointer`}>
            <FaFilter
              className={`transition-all duration-300 ${
                isFilterOpen ? "text-amber-300" : "text-gray-300 hover:text-amber-300"
              }`}
            />
            {activeFiltersCount > 0 && (
              <span className="absolute top-0.5 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>
          {/*--------- Search Button ----------*/}
          <button
            onClick={handleSearch}
            className="bg-gradient-to-r bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white opacity-80 hover:scale-104 hover:opacity-100 transition-all duration-300 cursor-pointer group">
            <FaSearch className="group-hover:text-yellow-300" />
          </button>
        </div>
      </div>

      {/*--------- Advanced Filters Panel ----------*/}
      <div
        className={`transition-all duration-500 ease-out overflow-hidden max-w-210 place-self-center mx-4 md:mx-0 ${
          isFilterOpen ? "max-h-screen opacity-100 mb-6" : "max-h-0 opacity-0"
        }`}>
        <div className="bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 rounded-2xl border border-gray-700/50 shadow-2xl backdrop-blur-sm">
          {/*--------- Filter Header ----------*/}
          <div className="flex items-center justify-between p-2 border-b border-gray-700/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg">
                <FaTags className="text-white text-lg" />
              </div>
              <h3 className="text-xl font-bold text-white">Advanced Filters</h3>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={clearFilters}
                className="text-gray-400 hover:text-red-400 font-medium transition-colors duration-200 cursor-pointer">
                Clear All
              </button>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="p-2 text-gray-400 hover:text-white transition-colors duration-200">
                <IoIosCloseCircleOutline className="text-2xl hover:scale-105 hover:rotate-135 transition-all duration-300 cursor-pointer hover:text-red-500" />
              </button>
            </div>
          </div>

          {/*--------- Filter Content ----------*/}
          <div className="p-6">
            <div className="flex flex-wrap items-center gap-4">
              {/*--------- Genre Filter ----------*/}
              <div className="flex items-center gap-1 border border-gray-600/50 rounded-xl px-1">
                <FaTags className="text-purple-400" />
                <select
                  value={filters.genre}
                  onChange={(e) => handleFilterChange("genre", e.target.value)}
                  className="w-fit min-w-32 bg-gray-800/50 px-1 py-2 text-white text-sm outline-none cursor-pointer">
                  <option value="">All Genres</option>
                  {genres.map((genre) => (
                    <option key={genre} value={genre.toLowerCase()}>
                      {genre}
                    </option>
                  ))}
                </select>
              </div>

              {/*--------- Release Year ----------*/}
              <div className="flex items-center gap-1 border border-gray-600/50 rounded-xl px-1">
                <FaCalendarAlt className="text-green-400" />
                <select
                  value={filters.year}
                  onChange={(e) => handleFilterChange("year", e.target.value)}
                  className="w-fit min-w-32 bg-gray-800/50 px-1 py-2 text-white text-sm outline-none cursor-pointer">
                  <option value="">Any Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {/*--------- Language ----------*/}
              <div className="flex items-center gap-1 border border-gray-600/50 rounded-xl px-1">
                <FaGlobe className="text-blue-400" />
                <select
                  value={filters.language}
                  onChange={(e) => handleFilterChange("language", e.target.value)}
                  className="w-fit min-w-32 bg-gray-800/50 px-1 py-2 text-white text-sm outline-none cursor-pointer">
                  <option value="">All Languages</option>
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              {/*--------- Rating From ----------*/}
              <div className="flex items-center gap-1 border border-gray-600/50 rounded-xl px-1">
                <FaStar className="text-yellow-400" />
                <select
                  value={filters.minRating}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    // Ensure min doesn't exceed current max
                    if (value > filters.maxRating) {
                      setFilters((prev) => ({ ...prev, minRating: value, maxRating: value }));
                    } else {
                      handleFilterChange("minRating", value);
                    }
                  }}
                  className="w-fit min-w-22 bg-gray-800/50 px-1 py-2 text-white text-sm outline-none cursor-pointer">
                  {Array.from({ length: 21 }, (_, i) => i * 0.5).map((rating) => (
                    <option key={rating} value={rating}>
                      {rating.toFixed(1)}+
                    </option>
                  ))}
                </select>
              </div>

              {/*--------- Rating To ----------*/}
              <div className="flex items-center gap-1 border border-gray-600/50 rounded-xl px-1">
                <FaStar className="text-yellow-400" />
                <select
                  value={filters.maxRating}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    // Ensure max isn't below current min
                    if (value < filters.minRating) {
                      setFilters((prev) => ({ ...prev, minRating: value, maxRating: value }));
                    } else {
                      handleFilterChange("maxRating", value);
                    }
                  }}
                  className="w-fit min-w-22 bg-gray-800/50 px-1 py-2 text-white text-sm outline-none cursor-pointer">
                  {Array.from({ length: 21 }, (_, i) => i * 0.5).map((rating) => (
                    <option key={rating} value={rating}>
                      {rating.toFixed(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*--------- Search Results ----------*/}
      {(searchTrigger || activeFiltersCount > 0) && (
        <div className="mt-8">
          {/*--------- Results Header ----------*/}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {searchTrigger ? `Search Results for "${searchTrigger}"` : "Filtered Results"}
              </h2>
              {searchResults && (
                <p className="text-gray-400 mt-1">Found {searchResults.total_results.toLocaleString()} movies</p>
              )}
            </div>
            {searchTrigger && (
              <button
                onClick={() => {
                  setSearchTrigger("");
                  setSearchQuery("");
                }}
                className="text-gray-400 hover:text-white transition-colors duration-200">
                Clear Search
              </button>
            )}
          </div>

          {/*--------- Loading State ----------*/}
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
          )}

          {/*--------- Error State ----------*/}
          {error && (
            <div className="text-center py-20">
              <p className="text-red-400 text-lg">Error loading movies. Please try again.</p>
            </div>
          )}

          {/*--------- Results Grid ----------*/}
          {searchResults && searchResults.results && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4 mx-2 sm:mx-0">
              {searchResults.results.map((movie: Movie) => (
                <Link
                  key={movie.id}
                  href={`/movie/${movie.id}`}
                  className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-xl overflow-hidden border border-gray-700/30 hover:border-purple-500/50 transition-all duration-300 hover:scale-103 hover:shadow-2xl">
                  <div className="aspect-[2/3] relative overflow-hidden">
                    {movie.poster_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-102"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                        <span className="text-gray-400">No Image</span>
                      </div>
                    )}

                    {/* Rating Badge */}
                    <div className="absolute top-2 right-2 bg-black/70 rounded-full px-2 py-1 flex items-center gap-1">
                      <span className="text-white text-xs font-semibold">
                        {movie.release_date ? new Date(movie.release_date).getFullYear() : "TBA"}
                      </span>
                      <div className="flex items-center">
                        <FaStar className="text-yellow-400 text-xs mb-0.5" />
                        <span className="text-white text-xs font-semibold">{movie.vote_average.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>

                  {/*--------- Movie Info ----------*/}
                  <div className="p-3">
                    <h3 className="text-white font-semibold text-sm line-clamp-2 group-hover:text-purple-300 transition-colors duration-200">
                      {movie.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/*--------- No Results ----------*/}
          {searchResults && searchResults.results.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No movies found. Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      )}

      {!hasActiveSearch && children}
    </section>
  );
}
