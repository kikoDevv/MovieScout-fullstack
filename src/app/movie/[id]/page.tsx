"use client";
import React, { useState, use } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import RatingStars from "@/components/ratings/ratingStars";
import CastSlider from "@/components/UI/CastSlider";
import { FaYoutube, FaHeart, FaBookmark, FaShare, FaClock, FaCalendar, FaGlobe, FaPlay } from "react-icons/fa";
import { getMovieDetails, getMovieCredits, getMovieVideos } from "../movieDetailsApi";
import Button from "@/components/UI/Button";
import { SignedOut, SignedIn, SignUpButton } from "@clerk/nextjs";

interface MovieDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function MovieDetailsPage({ params }: MovieDetailsPageProps) {
  const [activeTab, setActiveTab] = useState("cast");

  const resolvedParams = use(params);
  const movieId = parseInt(resolvedParams.id);

  /*--------- Fetch movie data using React Query ----------*/

  const { data: movieDetails, isLoading: detailsLoading } = useQuery({
    queryKey: ["movieDetails", movieId],
    queryFn: () => getMovieDetails(movieId),
  });

  const { data: movieCredits } = useQuery({
    queryKey: ["movieCredits", movieId],
    queryFn: () => getMovieCredits(movieId),
  });

  const { data: movieVideos } = useQuery({
    queryKey: ["movieVideos", movieId],
    queryFn: () => getMovieVideos(movieId),
  });

  /*--------- loading state ----------*/

  if (detailsLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-2xl">Loading movie details...</div>
      </div>
    );
  }
  if (!movieDetails) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-2xl text-red-400">Error loading movie details</div>
      </div>
    );
  }

  const director = movieCredits?.crew.find((person) => person.job === "Director");
  const writers = movieCredits?.crew.filter((person) => person.job === "Writer" || person.job === "Screenplay");
  const trailer = movieVideos?.results.find((video) => video.type === "Trailer" && video.site === "YouTube");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-black text-white mb-30">
      {/*--------- Hero Section with Backdrop ----------*/}
      <div className="relative w-full h-[90vh] overflow-hidden">
        <Image
          src={`https://image.tmdb.org/t/p/w1280${movieDetails.backdrop_path}`}
          alt={movieDetails.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        {/*--------- Movie Info Overlay ----------*/}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto flex flex-col lg:flex-row items-end gap-8">
            {/*--------- Poster ----------*/}
            <div className="flex-shrink-0">
              <div className="relative w-64 h-96 rounded-2xl overflow-hidden shadow-2xl hover:scale-102 transition-transform duration-300">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                  alt={movieDetails.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/*--------- Movie Details ----------*/}
            <div className="flex-1 space-y-4">
              <h1 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500">
                {movieDetails.title}
              </h1>
              <p className="text-lg text-gray-300 italic">{movieDetails.tagline}</p>

              <div className="flex items-center gap-6">
                <RatingStars rating={movieDetails.vote_average} showValue size="lg" showIMDB />
                <span className="text-gray-300">({movieDetails.vote_count.toLocaleString()} votes)</span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <FaCalendar className="text-purple-400" />
                  {formatDate(movieDetails.release_date)}
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-purple-400" />
                  {movieDetails.runtime} min
                </div>
                <div className="flex items-center gap-2">
                  <FaGlobe className="text-purple-400" />
                  {movieDetails.spoken_languages[0]?.name || "English"}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {movieDetails.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-full text-sm">
                    {genre.name}
                  </span>
                ))}
              </div>

              {/*--------- trailer Buttons ----------*/}
              <div className="flex items-center gap-4 pt-4">
                <Button
                  text="Watch Trailer"
                  icon={<FaYoutube />}
                  onClick={() => {
                    setActiveTab("videos");
                    document.getElementById("trailer-section")?.scrollIntoView({ behavior: "smooth" });
                  }}
                />
                {/*--------- Stream buttons  ----------*/}
                <SignedOut>
                  <SignUpButton mode="modal">
                    <Button text={"Stream now"} icon={<FaPlay />} />
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <Button
                    text={"Stream Movie"}
                    icon={<FaPlay />}
                    onClick={() => {
                      setActiveTab("stream");
                      document.getElementById("stream-section")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  />
                </SignedIn>

                <button className="p-3 bg-gray-800/80 hover:bg-gray-700/80 rounded-full transition-all duration-300 transform hover:scale-110 cursor-pointer">
                  <FaHeart className="text-white" />
                </button>
                <button className="p-3 bg-gray-800/80 hover:bg-gray-700/80 rounded-full transition-all duration-300 transform hover:scale-110 cursor-pointer">
                  <FaBookmark className="text-white" />
                </button>
                <button className="p-3 bg-gray-800/80 hover:bg-gray-700/80 rounded-full transition-all duration-300 transform hover:scale-110 cursor-pointer">
                  <FaShare className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*--------- Content Section ----------*/}
      <div className="container mx-auto px-8 py-12">
        {/*--------- Tab Navigation ----------*/}
        <div className="overflow-x-auto scrollbar-hide tab-backdrop inset-0 bg-black/30 backdrop-blur-md mx-2 rounded-full sm:w-fit sm:place-self-center">
          <div className="flex justify-center w-fit">
            <div className="max-w-4xl w-fit backdrop-blur-md">
              <div className="relative w-fit">
                <div className="flex items-center justify-center relative p-1">
                  <div className="flex space-x-1 sm:space-x-3 relative z-10">
                    {[
                      { id: "overview", label: "Overview" },
                      { id: "details", label: "Details" },
                      { id: "cast", label: "Cast & Crew" },
                      { id: "videos", label: "Trailer" },
                      { id: "stream", label: "Stream" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                            group relative px-4 py-2.5 rounded-full transition-all duration-200
                            flex items-center justify-center whitespace-nowrap hover:cursor-pointer
                            ${activeTab === tab.id ? "text-white" : "text-gray-300"}
                          `}>
                        {activeTab === tab.id && (
                          <motion.div
                            layoutId="movie-tab-indicator"
                            className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full"
                            transition={{
                              type: "spring",
                              bounce: 0.15,
                              duration: 0.5,
                            }}>
                            <div className="absolute inset-0 rounded-full opacity-20 blur-sm bg-purple-400"></div>
                          </motion.div>
                        )}

                        <span
                          className={`
                              relative z-10 font-medium tracking-wide flex items-center text-sm sm:text-base
                              transition-all duration-200 ease-out
                              ${
                                activeTab === tab.id
                                  ? "transform translate-y-0 text-shadow-glow"
                                  : "transform sm:group-hover:translate-y-[-2px]"
                              }
                            `}>
                          {tab.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="tab-glow"></div>
              </div>
            </div>
          </div>
        </div>

        {/*--------- Tab Content ----------*/}
        <div className="tab-content-fade text-center">
          {activeTab === "overview" && (
            <div className="space-y-8 mt-5 border border-gray-800 rounded-3xl p-6">
              <div>
                <h2 className="text-3xl font-bold mb-4">Synopsis</h2>
                <p className="text-gray-300 text-lg leading-relaxed text-center max-w-4xl mx-auto">
                  {movieDetails.overview}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div className="bg-gray-900/50 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-3 text-purple-400">Director</h3>
                  <p className="text-gray-300">{director?.name || "Not available"}</p>
                </div>
                <div className="bg-gray-900/50 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-3 text-purple-400">Writers</h3>
                  <p className="text-gray-300">{writers?.map((w) => w.name).join(", ") || "Not available"}</p>
                </div>
                <div className="bg-gray-900/50 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-3 text-purple-400">Status</h3>
                  <p className="text-gray-300">{movieDetails.status}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "cast" && (
            <div className="space-y-12 mt-5 border border-gray-800 rounded-3xl p-6">
              <div>
                <h2 className="text-3xl font-bold mb-8">Cast</h2>
                {movieCredits?.cast && movieCredits.cast.length > 0 ? (
                  <CastSlider cast={movieCredits.cast.slice(0, 20)} />
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    <p>No cast information available</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "details" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5 border border-gray-800 rounded-3xl p-6 max-w-6xl mx-auto">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Production Details</h2>
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-800">
                    <span className="text-gray-400">Budget</span>
                    <span className="font-semibold">{formatCurrency(movieDetails.budget)}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-800">
                    <span className="text-gray-400">Box Office</span>
                    <span className="font-semibold text-green-400">{formatCurrency(movieDetails.revenue)}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-800">
                    <span className="text-gray-400">Runtime</span>
                    <span className="font-semibold">{movieDetails.runtime} minutes</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-800">
                    <span className="text-gray-400">Language</span>
                    <span className="font-semibold">{movieDetails.spoken_languages[0]?.name || "English"}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-800">
                    <span className="text-gray-400">Release Date</span>
                    <span className="font-semibold">{formatDate(movieDetails.release_date)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl font-bold mb-6">Statistics</h2>
                <div className="bg-gray-900/50 rounded-xl p-6 space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-400 mb-2">
                      {movieDetails.vote_average.toFixed(1)}/10
                    </div>
                    <p className="text-gray-400">User Rating</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-pink-400 mb-2">
                      {movieDetails.vote_count.toLocaleString()}
                    </div>
                    <p className="text-gray-400">Total Votes</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-400 mb-2">
                      {movieDetails.budget > 0
                        ? (Math.round((movieDetails.revenue / movieDetails.budget) * 100) / 100).toFixed(1) + "x"
                        : "N/A"}
                    </div>
                    <p className="text-gray-400">ROI Multiplier</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "videos" && (
            <div className="space-y-8 max-w-6xl mx-auto mt-10">
              <div id="trailer-section">
                <h2 className="text-3xl font-bold mb-6">Official Trailer</h2>
                {trailer ? (
                  <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
                    <iframe
                      src={`https://www.youtube.com/embed/${trailer.key}?rel=0&modestbranding=1&showinfo=0`}
                      title={`${movieDetails.title} - Official Trailer`}
                      className="w-full h-full rounded-xl"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="text-center py-20 text-gray-400">
                    <p>No trailer available</p>
                  </div>
                )}
              </div>
            </div>
          )}
          {/*--------- stream section ----------*/}
          {activeTab === "stream" && (
            <div className=" max-w-6xl mx-auto mt-10">
              <div id="stream-section">
                <h2 className="text-3xl font-bold mb-6">Watch Movie Free</h2>
                <div className="relative aspect-video bg-gray-900 rounded-xl h-fit shadow-2xl overflow-hidden">
                  <SignedIn>
                    <iframe
                      src={`https://vidsrc.icu/embed/movie/${movieId}`}
                      title={`${movieDetails.title} - Stream`}
                      className="w-full h-full rounded-xl"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      scrolling="no"
                      frameBorder="0"
                      style={{
                        border: "none",
                        overflow: "hidden",
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                      }}
                    />
                  </SignedIn>

                  <SignedOut>
                    <SignUpButton mode="modal">
                      <div>
                        <Image
                          src={`https://image.tmdb.org/t/p/w1280${movieDetails.backdrop_path}`}
                          alt={movieDetails.title}
                          fill
                          className="object-cover"
                          priority
                        />
                        <FaPlay className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 size-15 text-red-500 cursor-pointer hover:scale-105 transition-all duration-200 hover:text-white" />
                      </div>
                    </SignUpButton>
                  </SignedOut>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-gray-400 text-sm">
                    ⚡ Streaming powered by VidSrc and used here for educational purposes only • VPN recommended when
                    streaming ⚡
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbars in iframes */
        iframe {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
        }

        iframe::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }

        /* Prevent iframe content from scrolling */
        iframe body {
          overflow: hidden !important;
        }

        .text-shadow-glow {
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
        }

        .tab-backdrop {
          background-color: #1d1e20;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        @keyframes pulse {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            opacity: 0.2;
          }
          100% {
            opacity: 0;
            transform: scale(1.2);
          }
        }

        @media (max-width: 640px) {
          .tabs-container {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
          }
        }

        button:has(div) span {
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
}
