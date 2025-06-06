import { NextResponse } from "next/server";
import { TMDBMovieItem, TMDBResponse } from "@/types/movie";

// TMDB API configurations
const TMDB_API_KEY = process.env.TMDB_KEY;
const TMDB_BASE_URL =
	process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3";

// Maps tab IDs to appropriate TMDB API endpoints
const getEndpointForTab = (tabId: string) => {
	switch (tabId) {
		case "movies":
			return `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`;
		case "tvshows":
			return `${TMDB_BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}`;
		case "children":
			return `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=16,10751&certification.lte=G`;
		case "newReleases":
			return `${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}`;
		case "comedy":
			return `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=35`;
		default:
			return `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`;
	}
};

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const tabId = searchParams.get("tab") || "movies";
	const limit = searchParams.get("limit") || "6";

	try {
		const endpoint = getEndpointForTab(tabId);
		const response = await fetch(endpoint);

		if (!response.ok) {
			throw new Error("Failed to fetch data from TMDB");
		}

		const data = (await response.json()) as TMDBResponse;
		const mediaType = tabId === "tvshows" ? "tv" : "movie";

		// Format the data before sending it to the client
		const formattedData = data.results
			.slice(0, parseInt(limit, 10))
			.map((item: TMDBMovieItem) => ({
				id: item.id.toString(),
				title:
					mediaType === "movie"
						? item.title || "Unknown Title"
						: item.name || "Unknown Title",
				posterPath: item.poster_path
					? `https://image.tmdb.org/t/p/w1280${item.poster_path}`
					: "/movieImages/dummamig4.jpg",
				backdropPath: item.backdrop_path
					? `https://image.tmdb.org/t/p/w1280${item.backdrop_path}`
					: "/movieImages/dummamig4.jpg",
				rating: item.vote_average,
				mediaType,
				overview: item.overview,
				releaseDate:
					mediaType === "movie" ? item.release_date : item.first_air_date,
			}));

		return NextResponse.json(formattedData);
	} catch (error) {
		console.error("Error fetching movies:", error);
		return NextResponse.json(
			{ error: "Failed to load content" },
			{ status: 500 }
		);
	}
}
