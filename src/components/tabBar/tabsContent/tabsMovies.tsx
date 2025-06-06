import React, { useEffect, useState } from "react";
import { Movie } from "../../../types/movie";
import MovieCard from "../tabsMovieCard/MovieCard";

const TMDB_API_KEY =
	process.env.NEXT_PUBLIC_TMDB_KEY || process.env.TMDB_KEY || "";
const TMDB_BASE_URL =
	process.env.NEXT_PUBLIC_TMDB_BASE_URL || "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL =
	process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL ||
	"https://image.tmdb.org/t/p/w1280";

/*--------- TMDB response type ----------*/
interface TMDBMovie {
	id: number;
	title?: string;
	name?: string;
	backdrop_path: string | null;
	poster_path: string | null;
	vote_average: number;
	overview: string;
	release_date?: string;
	first_air_date?: string;
}

const formatMovieData = (
	data: TMDBMovie[],
	mediaType: "movie" | "tv" = "movie"
): Movie[] => {
	return data.map((item) => ({
		id: item.id.toString(),
		title:
			mediaType === "movie"
				? item.title || "Unknown Title"
				: item.name || "Unknown Title",
		posterPath: item.poster_path
			? `${TMDB_IMAGE_BASE_URL}${item.poster_path}`
			: "/movieImages/dummamig4.jpg",
		backdropPath: item.backdrop_path
			? `${TMDB_IMAGE_BASE_URL}${item.backdrop_path}`
			: "/movieImages/dummamig4.jpg",
		rating: item.vote_average,
		mediaType,
		overview: item.overview,
		releaseDate:
			mediaType === "movie" ? item.release_date : item.first_air_date,
	}));
};

interface TabsMoviesProps {
	activeTab: string;
}

export default function TabsMovies({ activeTab }: TabsMoviesProps) {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	/*--------- Maps tab IDs to appropriate TMDB API endpoints ----------*/
	const getEndpointForTab = (tabId: string) => {
		switch (tabId) {
			case "movies":
				return `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`;
			case "tvshows":
				return `${TMDB_BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}`;
			case "children":
				return `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=16,10751&certification.lte=G`;
			case "Upcoming":
				return `${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}`;
			case "comedy":
				return `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=35`;
			default:
				return `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`;
		}
	};

	useEffect(() => {
		const fetchMovies = async () => {
			setLoading(true);
			setError(null);

			try {
				const endpoint = getEndpointForTab(activeTab);
				const response = await fetch(endpoint);

				if (!response.ok) {
					throw new Error("Failed to fetch data from TMDB");
				}

				const data = await response.json();
				const mediaType = activeTab === "tvshows" ? "tv" : "movie";
				const formattedData = formatMovieData(
					data.results.slice(0, 6),
					mediaType
				);

				setMovies(formattedData);
			} catch (err) {
				console.error("Error fetching data:", err);
				setError("Failed to load content. Please try again later.");
			} finally {
				setLoading(false);
			}
		};

		fetchMovies();
	}, [activeTab]);

	if (loading) {
		return (
			<div className="flex justify-center items-center w-full h-64">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex justify-center items-center w-full h-64 text-white">
				<p>{error}</p>
			</div>
		);
	}

	return (
		<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full p-5 sm:p-20 transition-all duration-300 ease-in-out">
			{movies.map((movie) => (
				<MovieCard key={movie.id} movie={movie} />
			))}
		</section>
	);
}