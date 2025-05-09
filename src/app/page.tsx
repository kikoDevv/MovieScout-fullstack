import Image from "next/image";

export default function Home() {
	return (
		<main>
			<div className="relative w-full">
				{/* Container with relative positioning */}
				<Image
					src="/seat.jpg"
					alt="Seat image"
					width={300}
					height={300}
					unoptimized
					className="w-full"
				/>

				{/* Text overlay instead of SVG */}
				<div className="absolute w-full text-center" style={{ top: "20%" }}>
					<div className="px-6 py-4">
						<h1 className="text-white font-bold tracking-wider uppercase text-xl md:text-2xl lg:text-3xl">
							<span className="block">Immerse yourself in the cinematic</span>
							<span className="block">universe</span>
						</h1>
					</div>
				</div>
			</div>
		</main>
	);
}
