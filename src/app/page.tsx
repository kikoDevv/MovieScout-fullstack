import Image from "next/image";
import SearchBar from "@/components/mainSearchBar/SearchBar";
import AnimatedImage from "@/components/UI/AnimatedImage";

export default function Home() {
	return (
		<main>
			{/*---------------Seat section-------------*/}
			<div className="relative w-full">
				<Image
					src="/seat.jpg"
					alt="Seat image"
					width={300}
					height={300}
					unoptimized
					className="w-full"
				/>
				<div className="absolute w-full text-center" style={{ top: "10%" }}>
					<div className="px-6 py-4">
						<h1 className="text-white font-bold tracking-wider uppercase text-xl md:text-2xl lg:text-3xl">
							<span className="block">Immerse yourself in the cinematic</span>
							<span className="block">universe</span>
						</h1>
					</div>
				</div>
				{/*------------Search bar section-----------*/}
				<SearchBar />
			</div>
			{/*------------Spiderman poster section----------*/}
			<section className="relative">
				<Image
					src="/spidermanBackground.png"
					alt="Spiderman background not found!"
					width={300}
					height={300}
					unoptimized
					className="w-full"
				/>
				<div className="absolute top-100 left-3/5 transform -translate-x-1/2">
					<AnimatedImage
						src="/spiderman.png"
						alt="Spiderman logo"
						width={400}
						height={800}
						className="w-1/2 md:w-1/3 lg:w-1/4"
						animationIntensity={1.5}
					/>
				</div>
			</section>
			<div className="h-100"></div>
		</main>
	);
}
