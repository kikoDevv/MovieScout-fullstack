import React, { useEffect, useState } from "react";
import { Movie } from "../../../types/movie";
import MovieCard from "../tabsMovieCard/MovieCard";

const sampleMovies: Movie[] = [
	{
		id: "1",
		title: "Breaking Bad",
		posterPath: "/movieImages/breakingBad.jpg",
		rating: 4.9,
	},
	{
		id: "2",
		title: "Smile 2",
		posterPath: "/movieImages/smile2.jpg",
		rating: 4.2,
	},
	{
		id: "3",
		title: "Flight Risk",
		posterPath: "/movieImages/flightRisk.jpg",
		rating: 4.0,
	},
	{
		id: "4",
		title: "Back in Action",
		posterPath: "/movieImages/Back-in-Action.jpg",
		rating: 3.8,
	},
	{
		id: "5",
		title: "Vikings",
		posterPath: "/movieImages/vikings.jpg",
		rating: 4.5,
	},
];

export default function TabsMovies() {

	const [movies, setMovies] = useState<Movie[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {

		setMovies(sampleMovies);
		setLoading(false);
	}, []); 
	if (loading) {
		return (
			<div className="flex justify-center items-center w-full h-64">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
			</div>
		);
	}

	return (
		<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full bg-blue-700 p-5 sm:p-20 transition-all duration-300 ease-in-out">
			{movies.map((movie) => (
				<MovieCard key={movie.id} movie={movie} />
			))}
		</section>
	);
}
