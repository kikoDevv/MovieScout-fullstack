import Image from "next/image";
import SearchBar from "@/components/mainSearchBar/SearchBar";
import AnimatedImage from "@/components/UI/spidermanImage";
import Companys from "@/components/companysLogo/Companys";
import MovieHighlight from "@/components/movieHighlight/MovieHighlight";

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
						<h1 className="text-xl font-bold tracking-wider text-white uppercase md:text-2xl lg:text-3xl">
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
				{/*--------Background image with fade effect-------*/}
				<div className="relative hidden sm:block">
					<Image
						src="/spidermanBackground.png"
						alt="Spiderman background not found!"
						width={300}
						height={300}
						unoptimized
						className="w-full"
					/>
					{/* Fade overlay */}
					<div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent"></div>
				</div>
				{/*-----------Spider------------*/}
				<div className="absolute transform -translate-x-1/2 bottom-[10rem] left-[60%] z-2 hidden sm:block">
					<AnimatedImage
						src="/spiderman.png"
						alt="Spiderman logo not found"
						width={600}
						height={1200}
						className="w-3/5 md:w-2/5 lg:w-1/3"
						animationIntensity={1}
					/>
				</div>{" "}
				{/*---------company logos---------------*/}
				<div className="relative w-full sm:absolute sm:bottom-40">
					<div className="py-2 bg-amber-50 sm:bg-transparent">
						<Companys direction="left" showTitle={false} />
					</div>
				</div>
			</section>
			<div className="relative w-full my-12 mb-100">
				<div className="absolute top-[-150] max-w-full">
					<MovieHighlight
					direction="right"
					/>
				</div>
			</div>

			{/*---------Top Movies section---------------*/}
		</main>
	);
}
