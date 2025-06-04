"use client";
import Image from "next/image";
import "./Companys.css";

interface CompanysProps {
	direction?: "left" | "right";
	noRotate?: boolean;
}

export default function Companys({
	direction = "left",
	noRotate = false,
}: CompanysProps) {
	const logos = [
		{ src: "/logos/disney.png", alt: "Disney logo" },
		{ src: "/logos/dreamworks.png", alt: "Dreamworks logo" },
		{ src: "/logos/hbo.png", alt: "HBO logo" },
		{ src: "/logos/legendary.png", alt: "Legendary logo" },
		{ src: "/logos/lucas.png", alt: "Lucas Films logo" },
		{ src: "/logos/marvel.png", alt: "Marvel logo" },
		{ src: "/logos/netflix.png", alt: "Netflix logo" },
		{ src: "/logos/paramount.png", alt: "Paramount logo" },
		{ src: "/logos/pixar.png", alt: "Pixar logo" },
		{ src: "/logos/prime.png", alt: "Prime Video logo" },
		{ src: "/logos/universal.png", alt: "Universal logo" },
		{ src: "/logos/warner.png", alt: "Warner Bros logo" },
	];

	return (
		<section className="py-6">
			<div className="relative overflow-hidden">
				<div
					className={`flex ${
						noRotate
							? ""
							: direction === "left"
							? "logos-slider-left"
							: "logos-slider-right"
					}`}
				>
					{logos.map((logo, index) => (
						<div
							key={index}
							className="mx-5 flex items-center justify-center min-w-[120px]"
						>
							<Image
								src={logo.src}
								alt={logo.alt}
								width={150}
								height={80}
								className="object-contain h-16 transition duration-300"
							/>
						</div>
					))}
					{/* Duplicate logos for infinite scroll effect */}
					{logos.map((logo, index) => (
						<div
							key={`dup-${index}`}
							className="mx-5 flex items-center justify-center min-w-[120px]"
						>
							<Image
								src={logo.src}
								alt={logo.alt}
								width={150}
								height={80}
								className="object-contain h-16 transition duration-300"
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
