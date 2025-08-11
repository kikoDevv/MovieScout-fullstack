"use client";
import React, { useState } from "react";
import { FaFilter, FaSearch, FaTimes, FaStar, FaCalendarAlt, FaGlobe, FaTags, FaSort } from "react-icons/fa";

export default function SearchMovies() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
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

  const sortOptions = [
    { value: "popularity.desc", label: "Most Popular" },
    { value: "vote_average.desc", label: "Highest Rated" },
    { value: "release_date.desc", label: "Latest Release" },
    { value: "title.asc", label: "A-Z" },
    { value: "vote_count.desc", label: "Most Reviewed" },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

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
  };

  const handleSearch = () => {
    {/*--------- handle search ----------*/}
  };

  const activeFiltersCount = Object.values(filters).filter(
    (value) => value !== "" && value !== "popularity.desc" && !(value === 0 || value === 10)
  ).length;

  return (
    <section className="w-full max-w-4xl mx-auto px-4">
      {/*--------- Search Bar ----------*/}
      <div className="relative mb-6">
        <div className="flex items-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700/50 shadow-2xl backdrop-blur-sm">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="w-full bg-transparent text-white placeholder-gray-400 pl-12 pr-4 py-4 outline-none font-medium text-lg"
              placeholder="Search for movies, shows, actors..."
              type="search"
            />
          </div>

          {/*--------- Filter Toggle Button ----------*/}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`relative px-6 py-4 transition-all duration-300 ${
              isFilterOpen
                ? "bg-gradient-to-r from-purple-600 to-blue-600"
                : "bg-gray-700/50 hover:bg-gradient-to-r hover:from-purple-600/50 hover:to-blue-600/50"
            } border-l border-gray-600/50`}>
            <FaFilter
              className={`text-lg transition-all duration-300 ${
                isFilterOpen ? "text-white" : "text-gray-300 hover:text-white"
              }`}
            />
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/*--------- Search Button ----------*/}
          <button
            onClick={handleSearch}
            className="px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl">
            <FaSearch className="text-lg" />
          </button>
        </div>
      </div>

      {/*--------- Advanced Filters Panel ----------*/}
      <div
        className={`transition-all duration-500 ease-out overflow-hidden ${
          isFilterOpen ? "max-h-screen opacity-100 mb-6" : "max-h-0 opacity-0"
        }`}>
        <div className="bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 rounded-2xl border border-gray-700/50 shadow-2xl backdrop-blur-sm">
          {/*--------- Filter Header ----------*/}
          <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg">
                <FaTags className="text-white text-lg" />
              </div>
              <h3 className="text-xl font-bold text-white">Advanced Filters</h3>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={clearFilters}
                className="text-gray-400 hover:text-red-400 font-medium transition-colors duration-200">
                Clear All
              </button>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="p-2 text-gray-400 hover:text-white transition-colors duration-200">
                <FaTimes />
              </button>
            </div>
          </div>

          {/*--------- Filter Content ----------*/}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/*--------- Genre Filter ----------*/}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-300">
                  <FaTags className="text-purple-400" />
                  Genre
                </label>
                <select
                  value={filters.genre}
                  onChange={(e) => handleFilterChange("genre", e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 outline-none">
                  <option value="">All Genres</option>
                  {genres.map((genre) => (
                    <option key={genre} value={genre.toLowerCase()}>
                      {genre}
                    </option>
                  ))}
                </select>
              </div>

              {/*--------- Release Year ----------*/}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-300">
                  <FaCalendarAlt className="text-green-400" />
                  Release Year
                </label>
                <select
                  value={filters.year}
                  onChange={(e) => handleFilterChange("year", e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 outline-none">
                  <option value="">Any Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {/*--------- Language ----------*/}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-300">
                  <FaGlobe className="text-blue-400" />
                  Language
                </label>
                <select
                  value={filters.language}
                  onChange={(e) => handleFilterChange("language", e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 outline-none">
                  <option value="">All Languages</option>
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              {/*--------- Sort By ----------*/}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-300">
                  <FaSort className="text-orange-400" />
                  Sort By
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 outline-none">
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/*--------- Rating Range ----------*/}
              <div className="space-y-3 md:col-span-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-300">
                  <FaStar className="text-yellow-400" />
                  Rating Range
                </label>
                <div className="flex items-center gap-6">
                  <div className="flex-1">
                    <div className="flex justify-between text-xs text-gray-400 mb-2">
                      <span>Min: {filters.minRating}/10</span>
                      <span>Max: {filters.maxRating}/10</span>
                    </div>
                    <div className="flex gap-4">
                      <input
                        type="range"
                        min="0"
                        max="10"
                        step="0.5"
                        value={filters.minRating}
                        onChange={(e) => handleFilterChange("minRating", parseFloat(e.target.value))}
                        className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
                      />
                      <input
                        type="range"
                        min="0"
                        max="10"
                        step="0.5"
                        value={filters.maxRating}
                        onChange={(e) => handleFilterChange("maxRating", parseFloat(e.target.value))}
                        className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/*--------- Buttons ----------*/}
            <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-700/50">
              <button
                onClick={() => setIsFilterOpen(false)}
                className="px-6 py-3 text-gray-400 hover:text-white transition-colors duration-200 font-medium">
                Cancel
              </button>
              <button
                onClick={() => {
                  handleSearch();
                  setIsFilterOpen(false);
                }}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/*--------- Custom Slider Styles ----------*/}
      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: linear-gradient(45deg, #9333ea, #4f46e5);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }

        .slider-thumb::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: linear-gradient(45deg, #9333ea, #4f46e5);
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </section>
  );
}
