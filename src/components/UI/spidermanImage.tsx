"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface AnimatedImageProps {
	src: string;
	alt: string;
	width: number;
	height: number;
	className?: string;
	animationIntensity?: number;
}

export default function AnimatedImage({
	src,
	alt,
	width,
	height,
	className = "",
	animationIntensity = 1.0,
}: AnimatedImageProps) {
	const [scrollProgress, setScrollProgress] = useState(0);
	const imageRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleScroll = () => {
			if (!imageRef.current) return;
			const rect = imageRef.current.getBoundingClientRect();
			const progress = Math.max(
				0,
				Math.min(1, 1 - rect.bottom / (window.innerHeight + rect.height))
			);
			setScrollProgress(progress);
		};

		handleScroll();

		let rafId: number;
		const scrollListener = () => {
			if (rafId) {
				cancelAnimationFrame(rafId);
			}
			rafId = requestAnimationFrame(handleScroll);
		};

		window.addEventListener("scroll", scrollListener, { passive: true });

		return () => {
			window.removeEventListener("scroll", scrollListener);
			if (rafId) {
				cancelAnimationFrame(rafId);
			}
		};
	}, []);

	const translateY = scrollProgress * -250 * animationIntensity;


	const transformStyle = {
		transform: `translateY(${translateY}px)`,
		transition: "transform 0.1s ease-out",
	};

	return (
		<div ref={imageRef}>
			<div style={transformStyle}>
				<Image
					src={src}
					alt={alt}
					width={width}
					height={height}
					className={className}
				/>
			</div>
		</div>
	);
}
