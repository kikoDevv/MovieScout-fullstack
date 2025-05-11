"use client";

import Image from "next/image";
import "./Companys.css";

const studiosUp = [
	{
		id: "universal",
		src: "/logos/universal.png",
		alt: "Universal Studios logo",
	},
	{ id: "warner", src: "/logos/warner.png", alt: "Warner Bros logo" },
	{ id: "paramount", src: "/logos/paramount.png", alt: "Paramount logo" },
	{ id: "prime", src: "/logos/prime.png", alt: "Prime Video logo" },
	{ id: "disney", src: "/logos/disney.png", alt: "Disney logo" },
	{ id: "dreamworks", src: "/logos/dreamworks.png", alt: "Dreamworks logo" },
	{ id: "pixa", src: "/logos/pixa.png", alt: "Pixar logo" },
	{ id: "hbo", src: "/logos/hbo.png", alt: "HBO logo" },
];

const studiosDown = [
	{ id: "netflix", src: "/logos/netflix.png", alt: "Netflix logo" },
	{ id: "marvel", src: "/logos/marvel.png", alt: "Marvel logo" },
	{ id: "lucas", src: "/logos/lucas.png", alt: "Lucasfilm logo" },
	{ id: "disney2", src: "/logos/disney.png", alt: "Disney logo" },
	{ id: "newcinema", src: "/logos/newcinema.png", alt: "New Cinema logo" },
	{ id: "paramount2", src: "/logos/paramount.png", alt: "Paramount logo" },
	{ id: "legendary", src: "/logos/legendary.png", alt: "Legendary logo" },
	{ id: "universal2", src: "/logos/universal.png", alt: "Universal logo" },
];

interface StudioLogo {
	id: string;
	src: string;
	alt: string;
}

const renderLogoImages = (studios: StudioLogo[], isFirstSet = false) => {
	return studios.map((studio) => (
		<Image
			key={`${isFirstSet ? "first" : "second"}-${studio.id}`}
			className="logo-item"
			src={studio.src}
			alt={studio.alt}
			width={150}
			height={90}
			style={{ objectFit: "contain" }}
			priority={isFirstSet}
		/>
	));
};

export default function Companys() {
	return (
		<section className="overflow-x-hidden">
			<div className="logo-container mx-auto w-[90%] md:w-[86%] h-[100px] mb-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
				<div className="logo-track">
					{renderLogoImages(studiosUp, true)}
					{renderLogoImages(studiosUp)}
					{renderLogoImages(studiosUp)}
				</div>
			</div>

			<div className="logo-container mx-auto w-[90%] md:w-[86%] h-[100px] [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
				<div className="logo-track-reverse">
					{renderLogoImages(studiosDown, true)}
					{renderLogoImages(studiosDown)}
					{renderLogoImages(studiosDown)}
				</div>
			</div>
		</section>
	);
}
