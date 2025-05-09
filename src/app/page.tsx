import Image from "next/image";

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
				<section className="absolute top-75 w-full flex justify-center">
					<div className="relative max-w-md w-full mx-4">
						<input
							type="text"
							placeholder="Search for movies"
							className="w-full py-3 px-4 pr-12 rounded-xl bg-white/90 backdrop-blur-sm focus:outline-none focus:shadow-md transition-shadow"
						/>
						<button className="absolute right-1.5 bottom-1.5  bg-blue-600 rounded-full p-2 text-white hover:bg-blue-900 transition-colors cursor-pointer">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={2}
								stroke="currentColor"
								className="w-5 h-5"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
								/>
							</svg>
						</button>
					</div>
				</section>
			</div>
		</main>
	);
}
