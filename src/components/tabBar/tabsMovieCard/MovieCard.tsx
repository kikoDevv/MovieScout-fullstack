import React from "react";
import Image from "next/image";
import { Movie } from "../../../types/movie";

interface MovieCardProps {
	movie: Movie;
	onClick?: (id: string) => void;
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
	return (
		<div
			className="relative overflow-hidden rounded-2xl w-full aspect-video cursor-pointer hover:scale-102 transition-transform duration-300"
			onClick={() => onClick && onClick(movie.id)}
		>
			<Image
				src={movie.backdropPath || movie.posterPath}
				alt={`${movie.title} poster`}
				width={1280}
				height={720}
				className="w-full h-full object-cover"
			/>
			<h1 className="absolute bottom-0 font-bold text-white sm:text-2xl font-sans p-4">
				{movie.title}
			</h1>
			<div className="absolute bottom-4 right-4 flex items-center gap-1">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 20 20"
					className="w-6 h-6 text-yellow-400"
				>
					<path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
				</svg>
				<span className="text-white font-semibold text-lg">
					{movie.rating.toFixed(1)}
				</span>
			</div>
		</div>
	);
}