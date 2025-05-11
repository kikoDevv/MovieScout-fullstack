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
			const windowHeight = window.innerHeight;

			let progress = 1 - rect.bottom / (windowHeight + rect.height);

			progress = Math.max(0, Math.min(1, progress));

			setScrollProgress(progress);
		};

		handleScroll();

		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const calculateTransform = () => {
		// These values can be adjusted to change the animation effect
		const rotateAmount =
			scrollProgress * 30 * animationIntensity - 15 * animationIntensity;
		const translateY = scrollProgress * -120 * animationIntensity;

		return `translateY(${translateY}px) rotate(${rotateAmount}deg)`;
	};

	return (
		<div ref={imageRef}>
			<div
				style={{
					transform: calculateTransform(),
					transition: "transform 0.1s ease-out",
				}}
			>
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
