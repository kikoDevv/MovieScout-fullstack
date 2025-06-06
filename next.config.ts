import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		formats: ["image/avif", "image/webp"],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "image.tmdb.org",
				pathname: "/**",
			},
		],
		minimumCacheTTL: 60,
		dangerouslyAllowSVG: false,
	},
	env: {
		TMDB_KEY: process.env.TMDB_KEY,
		TMDB_BASE_URL: process.env.TMDB_BASE_URL,
		TMDB_IMAGE_BASE_URL: process.env.TMDB_IMAGE_BASE_URL,
	},
};

export default nextConfig;
