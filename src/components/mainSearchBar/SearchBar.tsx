"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function SearchBar() {
	const { scrollY } = useScroll();

	// Transform scroll value to border radius (0px to 30px)
	// We'll consider the search bar at "top" when scrollY is around 100-200px
	const borderRadius = useTransform(scrollY, [10, 600], [10, 30]);

	return (
		<section className="absolute top-75 w-full flex justify-center overflow-hidden">
			<motion.div
				className="relative max-w-md w-full mx-4 overflow-hidden"
				style={{ borderRadius }}
				transition={{ type: "spring", stiffness: 300, damping: 30 }}
			>
				<motion.input
					type="text"
					placeholder="Search for movies"
					className="w-full py-3 px-4 pr-12 bg-white/90 backdrop-blur-sm focus:outline-none focus:shadow-md transition-shadow"
					style={{ borderRadius }}
				/>
				<button className="absolute right-1.5 bottom-1.5 bg-blue-600 rounded-full p-2 text-white hover:bg-blue-900 transition-colors cursor-pointer">
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
			</motion.div>
		</section>
	);
}
