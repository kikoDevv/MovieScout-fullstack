import Image from "next/image";
import SearchBar from "@/components/mainSearchBar/SearchBar";
import AnimatedImage from "@/components/UI/spidermanImage";
import Companys from "@/components/companysLogo/Companys";

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
			<section className="relative mb-200">
				<Image
					src="/spidermanBackground.png"
					alt="Spiderman background not found!"
					width={300}
					height={300}
					unoptimized
					className="w-full"
				/>
				{/*-----------Spider image------------*/}
				<div className="absolute transform -translate-x-1/2 bottom-[10rem] left-[60%] z-2">
					<AnimatedImage
						src="/spiderman.png"
						alt="Spiderman logo not found"
						width={600}
						height={1200}
						className="w-3/5 md:w-2/5 lg:w-1/3"
						animationIntensity={1}
					/>
				</div>
				{/*---------company logos---------------*/}
				<div className="absolute bottom-10 w-full">
					<div className="py-2">
						<Companys direction="left" showTitle={false} />
					</div>
					<div className="pt-20">
						<Companys direction="right" showTitle={false} />
					</div>
				</div>
			</section>
		</main>
	);
}
