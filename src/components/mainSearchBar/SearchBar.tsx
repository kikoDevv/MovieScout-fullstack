"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function SearchBar() {
	const [isSticky, setIsSticky] = useState(false);
	const sentinelRef = useRef<HTMLDivElement>(null);
	const searchSectionRef = useRef<HTMLElement>(null);
	const { scrollY } = useScroll();

	// Transform scroll value for border radios
	const borderRadius = useTransform(scrollY, [10, 600], [10, 30]);
	// Transform scroll value to width 480px to 320px of searchbar
	const width = useTransform(scrollY, [0, 600], [480, 320]);

	//Intersection Observer for sticky behavior
	useEffect(() => {
		const sentinel = sentinelRef.current;
		const searchSection = searchSectionRef.current;

		if (!sentinel || !searchSection) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) {
						setIsSticky(true);
					} else {
						setIsSticky(false);
					}
				});
			},
			{ threshold: 0.1 }
		);

		observer.observe(sentinel);

		return () => {
			observer.disconnect();
		};
	}, []);

	return (
		<>
			{/* Sentinel element that will trigger the sticky behavior */}
			<div ref={sentinelRef} className="absolute sentinel top-73"></div>

			{/* Search section that will become sticky */}
			<motion.section
				ref={searchSectionRef}
				className={`inline-flex whitespace-nowrap z-10 ${
					isSticky ? "fixed top-1.5" : "absolute top-75"
				}`}
				style={{
					left: "50%",
					transform: "translateX(-50%)",
					width,
				}}
			>
				<motion.div
					className="relative w-full mx-0 overflow-hidden"
					style={{ borderRadius }}
					transition={{ type: "spring", stiffness: 300, damping: 30 }}
				>
					<input
						type="text"
						placeholder="Search for movies"
						className="w-full px-4 py-3 pr-12 bg-white/90 backdrop-blur-sm focus:outline-none"
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
			</motion.section>
		</>
	);
}
