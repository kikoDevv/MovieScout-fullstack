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
		<section className="py-6">
			<div className="relative overflow-hidden">
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
						<div
							key={index}
							className="mx-3 my-2 movie-highlight"
							style={{ minWidth: "180px" }}
						>
							<Image
								src={movie.src}
								alt={movie.alt}
								width={180}
								height={270}
								className="object-cover rounded-lg h-full"
							/>
						</div>
					))}
					{/* Duplicate movies for infinite scroll effect */}
					{movies.map((movie, index) => (
						<div
							key={`dup-${index}`}
							className="mx-3 my-2 movie-highlight"
							style={{ minWidth: "180px", minHeight: "100%" }}
						>
							<Image
								src={movie.src}
								alt={movie.alt}
								width={180}
								height={270}
								className="object-cover rounded-lg h-full"
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
