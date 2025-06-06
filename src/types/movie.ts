export interface Movie {
	id: string;
	title: string;
	posterPath: string;
	backdropPath: string;
	rating: number;
	mediaType: string;
	overview: string;
	releaseDate: string | undefined;
}

export interface TMDBMovieItem {
	id: number;
	title?: string;
	name?: string;
	poster_path: string | null;
	backdrop_path: string | null;
	vote_average: number;
	overview: string;
	release_date?: string;
	first_air_date?: string;
}

export interface TMDBResponse {
	results: TMDBMovieItem[];
}
