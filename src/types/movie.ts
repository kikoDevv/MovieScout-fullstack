export interface Movie {
	id: string;
	title: string;
	posterPath: string;
	backdropPath?: string;
	rating: number;
	mediaType?: string;
	overview?: string;
	releaseDate?: string; 
}
