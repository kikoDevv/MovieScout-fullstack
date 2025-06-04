"use client";
import Image from "next/image";
import "./MovieHighlight.css";

interface MovieHighlightProps {
	direction?: "left" | "right";
	noRotate?: boolean;
}

export default function MovieHighlight({
	direction = "left",
	noRotate = false,
}: MovieHighlightProps) {
	const movies = [
		{
			src: "/movieImages/Back-in-Action.jpg",
			alt: "Back in Action",
			title: "Back in Action",
		},
		{
			src: "/movieImages/smile2.jpg",
			alt: "Smile 2",
			title: "Smile 2",
		},
		{
			src: "/movieImages/dummamig4.jpg",
			alt: "Dumma Mig 4",
			title: "Dumma Mig 4",
		},
		{
			src: "/movieImages/breakingBad.jpg",
			alt: "Breaking Bad",
			title: "Breaking Bad",
		},
		{
			src: "/movieImages/vikings.jpg",
			alt: "Vikings",
			title: "Vikings",
		},
		{
			src: "/movieImages/mads.jpg",
			alt: "Vikings",
			title: "Vikings",
		},
		{
			src: "/movieImages/flightRisk.jpg",
			alt: "Vikings",
			title: "Vikings",
		},
	];

	return (
		<section className="py-4">
			<div className="relative w-full overflow-hidden">
				<div
					className={`flex ${
						noRotate
							? ""
							: direction === "left"
							? "highlights-slider-left"
							: "highlights-slider-right"
					}`}
				>
					{movies.map((movie, index) => (
						<div key={index} className="movie-highlight mx-2">
							<Image
								src={movie.src}
								alt={movie.alt}
								width={680}
								height={670}
								className="object-cover rounded-lg h-full min-w-90 max-h-38"
							/>
						</div>
					))}
					{/* Duplicate movies for infinite scroll effect */}
					{movies.map((movie, index) => (
						<div key={`dup-${index}`} className="movie-highlight mx-2">
							<Image
								src={movie.src}
								alt={movie.alt}
								width={680}
								height={670}
								className="object-cover rounded-lg h-full min-w-90 max-h-38"
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
